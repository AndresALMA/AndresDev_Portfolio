import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { skills } from '../../../core/data/skills';
import { Skill } from '../../../core/models/skill';

@Component({
  selector: 'app-skills-carousel',
  templateUrl: './skills-carousel.html',
  styleUrl: './skills-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsCarousel {
  readonly slides: readonly Skill[] = [...skills, ...skills];
  readonly paused = signal(false);
  readonly trackClass = computed(
    () =>
      `flex w-max animate-logo-scroll hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none${
        this.paused() ? ' [animation-play-state:paused]' : ''
      }`,
  );

  private readonly abbreviations: Readonly<Record<string, string>> = {
    mockito: 'Mo',
    jacoco: 'JC',
    websocket: 'WS',
  };

  toggle(): void {
    this.paused.update((value) => !value);
  }

  abbreviation(skill: Skill): string {
    return this.abbreviations[skill.id] ?? skill.name.slice(0, 2);
  }
}
