import { ComponentFixture, TestBed } from '@angular/core/testing';

import { skills } from '../../../core/data/skills';
import { SkillsCarousel } from './skills-carousel';

describe('SkillsCarousel', () => {
  let fixture: ComponentFixture<SkillsCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsCarousel],
    }).compileComponents();

    fixture = TestBed.createComponent(SkillsCarousel);
    await fixture.whenStable();
  });

  it('duplicates the catalog for a seamless loop', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelectorAll('li').length).toBe(skills.length * 2);
    expect(element.querySelector('ul')?.className).toContain('animate-logo-scroll');
  });

  it('renders local logos with accessible names and text tiles for the rest', () => {
    const element = fixture.nativeElement as HTMLElement;
    const images = Array.from(element.querySelectorAll('img'));
    const withLogo = skills.filter((skill) => skill.logo);

    expect(images.length).toBe(withLogo.length * 2);
    expect(images.every((image) => image.getAttribute('src')?.startsWith('/logos/'))).toBe(true);
    expect(images.every((image) => (image.getAttribute('alt') ?? '').endsWith(' logo'))).toBe(true);
    expect(element.textContent).toContain('Mockito');
    expect(element.textContent).toContain('JaCoCo');
    expect(element.textContent).toContain('WebSocket');
  });

  it('separates the two tiers under labelled category tracks', () => {
    const element = fixture.nativeElement as HTMLElement;
    const text = element.textContent ?? '';

    expect(text).toContain('Stack principal');
    expect(text).toContain('Conocimientos en / Explorando');
    expect(text).toContain('Lenguajes');
    expect(text).toContain('Bases de Datos');
    expect(text).toContain('DevOps / Herramientas');
    expect(element.querySelectorAll('h3').length).toBeGreaterThan(1);
  });

  it('toggles the pause control with an explicit pressed state', async () => {
    const element = fixture.nativeElement as HTMLElement;
    const button = element.querySelector('button');

    expect(button?.getAttribute('aria-pressed')).toBe('false');
    expect(button?.getAttribute('aria-label')).toBe('Pause logo carousel');

    button?.click();
    await fixture.whenStable();

    expect(button?.getAttribute('aria-pressed')).toBe('true');
    expect(button?.getAttribute('aria-label')).toBe('Resume logo carousel');
    expect(element.querySelector('ul')?.className).toContain('[animation-play-state:paused]');
  });
});
