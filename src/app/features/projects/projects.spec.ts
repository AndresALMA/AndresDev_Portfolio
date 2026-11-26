import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { Project, ProjectCatalogError, ProjectCatalogStatus } from '../../core/models/project';
import { ProjectCatalog } from '../../core/services/project-catalog';
import { Projects } from './projects';

const sample: Project = {
  id: 'demo',
  title: 'Demo project',
  description: 'A typed demo project',
  evidence: 'Modeled the schema in PostgreSQL.',
  tech: ['angular'],
  pending: [],
  url: 'https://example.com/demo',
};

async function render(
  projects: readonly Project[],
  status: ProjectCatalogStatus = 'ready',
  error: ProjectCatalogError | null = null,
) {
  await TestBed.configureTestingModule({
    imports: [Projects],
    providers: [
      {
        provide: ProjectCatalog,
        useValue: {
          projects: signal(projects),
          status: signal(status),
          error: signal(error),
          load: () => of([]),
        },
      },
    ],
  }).compileComponents();

  const fixture = TestBed.createComponent(Projects);
  await fixture.whenStable();
  return fixture.nativeElement as HTMLElement;
}

describe('Projects', () => {
  it('renders a clear empty state while no repositories are loaded', async () => {
    const element = await render([]);

    expect(element.querySelector('app-project-card')).toBeNull();
    expect(element.textContent).toContain('No projects published yet');
  });

  it('renders one project card per catalog entry', async () => {
    const element = await render([sample, { ...sample, id: 'second', title: 'Second project' }]);

    expect(element.querySelectorAll('app-project-card').length).toBe(2);
  });

  it('announces catalog progress accessibly', async () => {
    const element = await render([], 'loading');
    const statusElement = element.querySelector('[role="status"]');

    expect(statusElement?.textContent).toContain('Loading projects');
    expect(statusElement?.getAttribute('aria-live')).toBe('polite');
    expect(element.querySelectorAll('app-project-card').length).toBe(0);
  });

  it('announces a failed request with an alert', async () => {
    const error: ProjectCatalogError = {
      code: 'catalog-load-failed',
      message: 'Projects could not be loaded.',
    };
    const element = await render([], 'failed', error);
    const alert = element.querySelector('[role="alert"]');

    expect(alert?.textContent).toContain('Error loading projects.');
    expect(alert?.textContent).toContain(error.message);
    expect(element.querySelectorAll('app-project-card').length).toBe(0);
  });

  it('shows an explicit validation message when the catalog payload is invalid', async () => {
    const error: ProjectCatalogError = {
      code: 'catalog-invalid',
      message: 'Project at index 0 has an invalid title.',
    };
    const element = await render([], 'failed', error);

    expect(element.querySelector('[role="alert"]')?.textContent).toContain(error.message);
  });

  it('uses one main heading', async () => {
    const element = await render([sample]);

    expect(element.querySelectorAll('h1').length).toBe(1);
  });
});
