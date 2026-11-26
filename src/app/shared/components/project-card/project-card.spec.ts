import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Project } from '../../../core/models/project';
import { ProjectCard } from './project-card';

const sample: Project = {
  id: 'demo',
  title: 'Demo project',
  description: 'A typed demo project',
  url: 'https://example.com/demo',
  tags: ['Angular', 'TypeScript'],
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

  it('renders the project title, description and every tag', () => {
    const element = fixture.nativeElement as HTMLElement;

    expect(element.querySelector('h3')?.textContent).toContain(sample.title);
    expect(element.textContent).toContain(sample.description);
    expect(Array.from(element.querySelectorAll('li')).map((item) => item.textContent?.trim())).toEqual(
      sample.tags,
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

  it('reserves media space and omits the link when no media or URL is available', async () => {
    const pending: Project = {
      id: 'pending',
      title: 'Pending project',
      description: 'Project slot',
      tags: ['Angular'],
    };
    const pendingFixture = TestBed.createComponent(ProjectCard);
    pendingFixture.componentRef.setInput('project', pending);
    await pendingFixture.whenStable();
    const element = pendingFixture.nativeElement as HTMLElement;

    expect(element.querySelector('.media-placeholder')).not.toBeNull();
    expect(element.querySelector('a')).toBeNull();
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
