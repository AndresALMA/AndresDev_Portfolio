import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { Home } from './home';

describe('Home', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('renders a semantic hero with a link to the projects page', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('section')).not.toBeNull();
    expect(element.querySelector('h1')?.textContent).toContain('Andres');
    expect(element.querySelector('a[href="/projects"]')).not.toBeNull();
  });

  it('describes the frontend and backend practice areas', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';

    expect(text).toContain('Angular');
    expect(text).toContain('TypeScript');
  });

  it('uses one main heading and a descriptive projects link', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('h1').length).toBe(1);
    expect(element.querySelector('a[href="/projects"]')?.textContent?.trim()).toContain('project portfolio');
  });

  it('reserves a highlighted slot for the future profile photo in the hero', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const photo = element.querySelector('[data-profile-photo]');

    expect(photo?.hasAttribute('data-placeholder')).toBe(true);
    expect(photo?.textContent).toContain('[PLACEHOLDER]');
    expect(photo?.textContent).toContain('profile photo');
  });

  it('renders the methodology and project knowledge cards with pending fields', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const text = element.textContent ?? '';

    expect(element.querySelectorAll('[data-methodology]').length).toBe(5);
    expect(text).toContain('Scrum');
    expect(text).toContain('Project management');
    expect(text).toContain('Feasibility and viability');
    expect(text).toContain('Cost estimation');
    expect(text).toContain('PMBOK guides');
    expect(element.querySelectorAll('[data-methodology] [data-pending] li').length).toBeGreaterThanOrEqual(5);
  });

  it('places the methodology section before the software logo carousel', async () => {
    const fixture = TestBed.createComponent(Home);
    await fixture.whenStable();
    const element = fixture.nativeElement as HTMLElement;
    const methodology = element.querySelector('[data-methodology]');
    const carousel = element.querySelector('app-skills-carousel');

    expect(methodology).not.toBeNull();
    expect(carousel).not.toBeNull();
    expect(methodology!.compareDocumentPosition(carousel!) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
  });
});
