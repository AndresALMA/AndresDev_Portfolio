import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { Project } from '../models/project';
import { ProjectCatalog } from './project-catalog';

const sample: Project = {
  id: 'demo',
  title: 'Demo',
  description: 'A typed demo project',
  evidence: 'Modeled the schema in PostgreSQL.',
  tech: ['angular'],
  pending: [],
  url: 'https://example.com/demo',
};

describe('ProjectCatalog', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
  });

  afterEach(() => {
    TestBed.inject(HttpTestingController).verify();
  });

  it('starts with an empty catalog that can be rendered safely', () => {
    const service = TestBed.inject(ProjectCatalog);

    expect(service.projects()).toEqual([]);
  });

  it('reflects projects loaded later without changing component structure', () => {
    const service = TestBed.inject(ProjectCatalog);

    service.setProjects([sample]);

    expect(service.projects().map((project) => project.id)).toEqual(['demo']);
  });

  it('tracks loading and ready states around the catalog request', () => {
    const service = TestBed.inject(ProjectCatalog);
    const controller = TestBed.inject(HttpTestingController);

    service.load().subscribe();

    expect(service.status()).toBe('loading');
    expect(service.error()).toBeNull();

    const request = controller.expectOne('projects.json');
    expect(request.request.method).toBe('GET');
    request.flush([sample]);

    expect(service.status()).toBe('ready');
    expect(service.error()).toBeNull();
    expect(service.projects()).toEqual([sample]);
  });

  it('reports an explicit validation error for an invalid catalog payload', () => {
    const service = TestBed.inject(ProjectCatalog);
    const controller = TestBed.inject(HttpTestingController);

    service.load().subscribe();

    const request = controller.expectOne('projects.json');
    request.flush({ unexpected: true });

    expect(service.status()).toBe('failed');
    expect(service.error()?.code).toBe('catalog-invalid');
    expect(service.error()?.message).toContain('array');
    expect(service.projects()).toEqual([]);
  });

  it('tracks a failed request as a typed error', () => {
    const service = TestBed.inject(ProjectCatalog);
    const controller = TestBed.inject(HttpTestingController);

    service.load().subscribe();

    const request = controller.expectOne('projects.json');
    request.flush(null, { status: 503, statusText: 'Service Unavailable' });

    expect(service.status()).toBe('failed');
    expect(service.error()).toEqual({
      code: 'catalog-load-failed',
      message: 'Projects could not be loaded.',
    });
    expect(service.projects()).toEqual([]);
  });
});
