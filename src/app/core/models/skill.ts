export type SkillArea = 'languages' | 'frontend' | 'backend' | 'data' | 'tools';

export type SkillTier = 'principal' | 'exploring';

export interface Skill {
  readonly id: string;
  readonly name: string;
  readonly area: SkillArea;
  readonly tier: SkillTier;
  readonly logo?: string;
  readonly projects?: readonly string[];
}
