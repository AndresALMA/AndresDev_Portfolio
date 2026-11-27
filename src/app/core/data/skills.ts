import { Skill } from '../models/skill';

export const skills: readonly Skill[] = [
  { id: 'typescript', name: 'TypeScript', area: 'languages', tier: 'principal', logo: 'typescript.svg', projects: ['tcg-pokemon', 'skingraph', 'portfolio'] },
  { id: 'java', name: 'Java 21', area: 'languages', tier: 'principal', logo: 'java.svg', projects: ['tcg-pokemon'] },
  { id: 'csharp', name: 'C#', area: 'languages', tier: 'exploring' },
  { id: 'angular', name: 'Angular 21', area: 'frontend', tier: 'principal', logo: 'angular.svg', projects: ['tcg-pokemon', 'portfolio'] },
  { id: 'tailwind', name: 'Tailwind CSS', area: 'frontend', tier: 'principal', logo: 'tailwindcss.svg', projects: ['tcg-pokemon', 'skingraph', 'portfolio'] },
  { id: 'rxjs', name: 'RxJS', area: 'frontend', tier: 'principal', logo: 'rxjs.svg', projects: ['tcg-pokemon', 'portfolio'] },
  { id: 'zod', name: 'Zod', area: 'frontend', tier: 'principal', logo: 'zod.svg', projects: ['tcg-pokemon'] },
  { id: 'gsap', name: 'GSAP', area: 'frontend', tier: 'exploring', projects: ['tcg-pokemon'] },
  { id: 'next', name: 'Next.js', area: 'frontend', tier: 'exploring', logo: 'nextjs.svg', projects: ['skingraph'] },
  { id: 'react', name: 'React', area: 'frontend', tier: 'exploring', logo: 'react.svg', projects: ['skingraph'] },
  { id: 'shadcn', name: 'shadcn/ui', area: 'frontend', tier: 'exploring', projects: ['skingraph'] },
  { id: 'framer-motion', name: 'Framer Motion', area: 'frontend', tier: 'exploring', projects: ['skingraph'] },
  { id: 'three', name: 'Three.js', area: 'frontend', tier: 'exploring', projects: ['skingraph'] },
  { id: 'spring', name: 'Spring Boot', area: 'backend', tier: 'principal', logo: 'springboot.svg', projects: ['tcg-pokemon'] },
  { id: 'jpa', name: 'JPA / Hibernate', area: 'backend', tier: 'principal', logo: 'hibernate.svg', projects: ['tcg-pokemon'] },
  { id: 'websocket', name: 'WebSocket', area: 'backend', tier: 'principal', projects: ['tcg-pokemon'] },
  { id: 'springdoc', name: 'springdoc-openapi', area: 'backend', tier: 'exploring', projects: ['tcg-pokemon'] },
  { id: 'postgres', name: 'PostgreSQL', area: 'data', tier: 'principal', logo: 'postgresql.svg', projects: ['tcg-pokemon'] },
  { id: 'advanced-sql', name: 'Consultas SQL avanzadas', area: 'data', tier: 'principal' },
  { id: 'flyway', name: 'Flyway', area: 'data', tier: 'principal', logo: 'flyway.svg', projects: ['tcg-pokemon'] },
  { id: 'neo4j', name: 'Neo4j', area: 'data', tier: 'principal', logo: 'neo4j.svg', projects: ['skingraph'] },
  { id: 'h2', name: 'H2', area: 'data', tier: 'exploring', logo: 'h2.svg', projects: ['tcg-pokemon'] },
  { id: 'cytoscape', name: 'Cytoscape', area: 'data', tier: 'exploring', logo: 'cytoscape.svg' },
  { id: 'mongodb', name: 'MongoDB', area: 'data', tier: 'exploring', logo: 'mongodb.svg' },
  { id: 'redis', name: 'Redis', area: 'data', tier: 'exploring', logo: 'redis.svg' },
  { id: 'cassandra', name: 'Cassandra', area: 'data', tier: 'exploring' },
  { id: 'git', name: 'Git', area: 'tools', tier: 'principal', logo: 'git.svg', projects: ['tcg-pokemon', 'skingraph', 'portfolio'] },
  { id: 'github', name: 'GitHub', area: 'tools', tier: 'principal', logo: 'github.svg', projects: ['portfolio'] },
  { id: 'npm', name: 'npm', area: 'tools', tier: 'principal', logo: 'npm.svg', projects: ['portfolio'] },
  { id: 'intellij', name: 'IntelliJ IDEA', area: 'tools', tier: 'principal' },
  { id: 'node', name: 'Node.js', area: 'tools', tier: 'principal', logo: 'nodejs.svg', projects: ['portfolio'] },
  { id: 'vercel', name: 'Vercel', area: 'tools', tier: 'principal', logo: 'vercel.svg', projects: ['portfolio'] },
  { id: 'vitest', name: 'Vitest', area: 'tools', tier: 'principal', logo: 'vitest.svg', projects: ['portfolio'] },
  { id: 'maven', name: 'Maven', area: 'tools', tier: 'principal', logo: 'maven.svg', projects: ['tcg-pokemon'] },
  { id: 'junit', name: 'JUnit 5', area: 'tools', tier: 'principal', logo: 'junit.svg', projects: ['tcg-pokemon'] },
  { id: 'mockito', name: 'Mockito', area: 'tools', tier: 'exploring', projects: [] },
  { id: 'vscode', name: 'Visual Studio Code', area: 'tools', tier: 'exploring' },
  { id: 'jacoco', name: 'JaCoCo', area: 'tools', tier: 'principal', projects: ['tcg-pokemon'] },
  { id: 'playwright', name: 'Playwright', area: 'tools', tier: 'principal', projects: ['tcg-pokemon', 'skingraph'] },
  { id: 'docker', name: 'Docker', area: 'tools', tier: 'exploring', projects: ['tcg-pokemon'] },
  { id: 'testcontainers', name: 'Testcontainers', area: 'tools', tier: 'exploring', projects: ['tcg-pokemon'] },
];

export const skillById: ReadonlyMap<string, Skill> = new Map(skills.map((skill) => [skill.id, skill]));

const abbreviations: Readonly<Record<string, string>> = {
  mockito: 'Mo',
  jacoco: 'JC',
  websocket: 'WS',
  gsap: 'Gs',
  shadcn: 'Sh',
  'framer-motion': 'Fm',
  three: '3D',
  springdoc: 'Oa',
  'advanced-sql': 'SQ',
  intellij: 'IJ',
  vscode: 'VS',
  playwright: 'Pl',
  docker: 'Dk',
  testcontainers: 'Tc',
};

export function skillAbbreviation(skill: Skill): string {
  return abbreviations[skill.id] ?? skill.name.slice(0, 2);
}
