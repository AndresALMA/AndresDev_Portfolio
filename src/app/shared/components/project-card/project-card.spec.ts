import { ComponentFixture, TestBed } from '@angular/core/testing';

import { skillById } from '../../../core/data/skills';
import { Project } from '../../../core/models/project';
import { ProjectCard } from './project-card';

const sample: Project = {
  id: 'demo',
  title: 'Demo project',
  description: 'A typed demo project',
  evidence: 'Modeled the schema in PostgreSQL.',
  tech: ['angular', 'typescript', 'postgres'],
  pending: ['[PLACEHOLDER] project URL'],
  url: 'https://example.com/demo',
  imageUrl: 'https://example.com/demo.png',
};

describe('ProjectCard', () => {
  let fixture: ComponentFixture<ProjectCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectCard],
    }).compileComponents();

    fixture = TestBed.createComponent(ProjectCard);
    fixture.componentRef.setInput('project', sample);
    await fixture.whenStable();
  });

  it('renders the title, description, evidence and one badge per technology id', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h3')?.textContent).toContain(sample.title);
    expect(element.textContent).toContain(sample.description);
    expect(element.textContent).toContain(sample.evidence);
    expect(Array.from(element.querySelectorAll('[data-tech] li')).map((item) => item.textContent?.trim())).toEqual(
      sample.tech.map((id) => skillById.get(id)?.name),
    );
  });

  it('renders a real external link with a safe target and rel', () => {
    const link = (fixture.nativeElement as HTMLElement).querySelector('a');

    expect(link?.getAttribute('href')).toBe(sample.url);
    expect(link?.getAttribute('target')).toBe('_blank');
    expect(link?.getAttribute('rel')).toContain('noopener');
    expect(link?.getAttribute('rel')).toContain('noreferrer');
  });

  it('gives the image a non-empty alt text', () => {
    const image = (fixture.nativeElement as HTMLElement).querySelector('img');

    expect(image?.getAttribute('alt')).toBe(`Screenshot of ${sample.title}`);
  });

  it('uses a link text that names the project', () => {
    const link = (fixture.nativeElement as HTMLElement).querySelector('a');

    expect(link?.textContent).toContain(sample.title);
  });

  it('highlights every pending field so missing information is visible', () => {
    const element = fixture.nativeElement as HTMLElement;
    const pending = element.querySelector('[data-pending]');

    expect(pending?.textContent).toContain('[PLACEHOLDER] project URL');
    expect(pending?.className).toContain('amber');
    expect(pending?.querySelectorAll('li').length).toBe(1);
  });

  it('reserves media space and omits the link when no media or URL is available', async () => {
    const pending: Project = {
      id: 'pending',
      title: 'Pending project',
      description: 'Project slot',
      evidence: 'Evidence for the pending project.',
      tech: [],
      pending: [],
    };
    const pendingFixture = TestBed.createComponent(ProjectCard);
    pendingFixture.componentRef.setInput('project', pending);
    await pendingFixture.whenStable();
    const element = pendingFixture.nativeElement as HTMLElement;

    expect(element.querySelector('.media-placeholder')).not.toBeNull();
    expect(element.querySelector('a')).toBeNull();
    expect(element.querySelector('[data-pending]')).toBeNull();
  });

  it('renders a video when the project provides one', async () => {
    const withVideo: Project = {
      ...sample,
      imageUrl: undefined,
      videoUrl: 'https://example.com/demo.mp4',
    };
    const videoFixture = TestBed.createComponent(ProjectCard);
    videoFixture.componentRef.setInput('project', withVideo);
    await videoFixture.whenStable();
    const element = videoFixture.nativeElement as HTMLElement;

    expect(element.querySelector('video')?.getAttribute('src')).toBe(withVideo.videoUrl);
    expect(element.querySelector('.media-placeholder')).toBeNull();
  });
});
