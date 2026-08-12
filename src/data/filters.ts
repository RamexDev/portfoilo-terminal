import type { Project } from '../types';

export interface FilterDef {
  id: string;
  label: string;
  getOptions: (projects: Project[]) => string[];
  match: (project: Project, value: string) => boolean;
}

export const filters: FilterDef[] = [
  {
    id: 'tech',
    label: 'Technology',
    getOptions: (projects) => {
      const set = new Set<string>();
      projects.forEach((p) => p.tags.forEach((t) => set.add(t)));
      return Array.from(set).sort();
    },
    match: (project, value) => project.tags.includes(value),
  },
];
