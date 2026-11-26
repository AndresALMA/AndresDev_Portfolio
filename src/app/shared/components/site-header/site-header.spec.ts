import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { SiteHeader } from './site-header';

describe('SiteHeader', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteHeader],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('exposes navigation to home and projects', async () => {
    const fixture = TestBed.createComponent(SiteHeader);
    await fixture.whenStable();
    const links = Array.from((fixture.nativeElement as HTMLElement).querySelectorAll('nav a'));

    expect(links.map((link) => link.getAttribute('href'))).toEqual(['/', '/projects']);
  });

  it('labels the brand link for assistive technology', async () => {
    const fixture = TestBed.createComponent(SiteHeader);
    await fixture.whenStable();
    const brand = (fixture.nativeElement as HTMLElement).querySelector('header a');

    expect(brand?.getAttribute('aria-label')).toBe('AndresDev, home');
  });
});
