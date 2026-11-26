export type SkillArea = 'frontend' | 'backend' | 'data';

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly area: SkillArea;
  readonly logo?: string;
}
