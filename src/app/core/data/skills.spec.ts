import { skills } from './skills';

describe('skills catalog', () => {
  it('assigns every skill to one of the five evidenced areas and one tier', () => {
    const areas = ['languages', 'frontend', 'backend', 'data', 'tools'];
    const tiers = ['principal', 'exploring'];

    for (const skill of skills) {
      expect(areas).toContain(skill.area);
      expect(tiers).toContain(skill.tier);
    }
  });

  it('keeps skill ids unique', () => {
    const ids = skills.map((skill) => skill.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it('links skills only to known project ids', () => {
    const knownProjects = ['tcg-pokemon', 'skingraph', 'portfolio'];

    for (const skill of skills) {
      for (const projectId of skill.projects ?? []) {
        expect(knownProjects).toContain(projectId);
      }
    }
  });
});
