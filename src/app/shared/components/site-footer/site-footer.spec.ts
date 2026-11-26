import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteFooter } from './site-footer';

describe('SiteFooter', () => {
  let fixture: ComponentFixture<SiteFooter>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteFooter],
    }).compileComponents();

    fixture = TestBed.createComponent(SiteFooter);
    await fixture.whenStable();
  });

  it('renders a footer with the portfolio signature', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('footer')).not.toBeNull();
    expect(element.textContent).toContain('AndresDev');
  });
});
