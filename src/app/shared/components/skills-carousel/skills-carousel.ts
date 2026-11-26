import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';

import { skillAbbreviation, skills } from '../../../core/data/skills';
import { Skill, SkillArea, SkillTier } from '../../../core/models/skill';

interface AreaGroup {
  readonly area: SkillArea;
  readonly label: string;
  readonly slides: readonly Skill[];
}

interface TierGroup {
  readonly tier: SkillTier;
  readonly title: string;
  readonly areas: readonly AreaGroup[];
}

const areaLabels: Readonly<Record<SkillArea, string>> = {
  languages: 'Lenguajes',
  frontend: 'Frontend',
  backend: 'Backend',
  data: 'Bases de Datos',
  tools: 'DevOps / Herramientas',
};

const tierLabels: Readonly<Record<SkillTier, string>> = {
  principal: 'Stack principal',
  exploring: 'Conocimientos en / Explorando',
};

@Component({
  selector: 'app-skills-carousel',
  templateUrl: './skills-carousel.html',
  styleUrl: './skills-carousel.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsCarousel {
  readonly groups: readonly TierGroup[] = (['principal', 'exploring'] as const)
    .map((tier) => ({
      tier,
      title: tierLabels[tier],
      areas: (Object.keys(areaLabels) as readonly SkillArea[])
        .map((area) => {
          const matching = skills.filter((skill) => skill.tier === tier && skill.area === area);
          return { area, label: areaLabels[area], slides: [...matching, ...matching] };
        })
        .filter((group) => group.slides.length > 0),
    }))
    .filter((group) => group.areas.length > 0);

  readonly paused = signal(false);

  readonly trackClass = computed(
    () =>
      `flex w-max animate-logo-scroll hover:[animation-play-state:paused] focus-within:[animation-play-state:paused] motion-reduce:animate-none${
        this.paused() ? ' [animation-play-state:paused]' : ''
      }`,
  );

  readonly skillAbbreviation = skillAbbreviation;

  toggle(): void {
    this.paused.update((value) => !value);
  }
}
