export type IconName =
  | 'react'
  | 'typescript'
  | 'nodejs'
  | 'nextjs'
  | 'tailwind'
  | 'postgresql'
  | 'mongodb'
  | 'git'
  | 'python'
  | 'django'
  | 'flask'
  | 'html'
  | 'css'
  | 'javascript'
  | 'arrowDown'
  | 'arrowUp'
  | 'arrowLeft'
  | 'arrowRight'
  | 'menu'
  | 'x'
  | 'externalLink'
  | 'gitBranch2'
  | 'calendar'
  | 'building'
  | 'certificate'
  | 'github'
  | 'linkedin'
  | 'twitter'
  | 'telegram'
  | 'upwork'
  | 'mail'
  | 'phone'
  | 'mapPin'
  | 'printer'
  | 'download'
  | 'cv'
  | 'eye'
  | 'eyeOff'
  | 'edit'
  | 'check'
  | 'graduationCap'
  | 'briefcase'
  | 'award'
  | 'user'
  | 'chevronRight'
  | 'share';

export interface Project {
  title: string;
  slug: string;
  description: string;
  tags: string[];
  year: number;
  thumbnail: string;
  gradient: string;
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
  role: string;
  techStack: string[];
  galleryImages?: string[];
}

export interface CaseStudy {
  title: string;
  slug: string;
  overview: string;
  challenge: string;
  process: string;
  solution: string;
  outcome: string;
  technologies: string[];
  timeline: string;
  thumbnail: string;
  gradient: string;
  previousProject: string | null;
  nextProject: string | null;
}

export interface Social {
  name: string;
  url: string;
  label: string;
  iconName: IconName;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface TechItem {
  name: string;
  iconName: IconName;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
}

export interface Certificate {
  title: string;
  issuer: string;
  date: string;
  url?: string;
  description?: string;
}

export interface Experience {
  company: string;
  position: string;
  startDate: string;
  endDate: string | 'Present';
  description: string;
  technologies: string[];
}

export interface Education {
  institution: string;
  degree: string;
  location: string;
  gpa?: string;
  startDate: string;
  endDate: string;
  description?: string;
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

