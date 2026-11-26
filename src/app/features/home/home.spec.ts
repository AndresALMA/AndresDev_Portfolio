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
});
