import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  sectionId: string;
}

export interface ProjectMetric {
  label: string;
  value: string;
  detail?: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  tags: string[];
  link: string;
  githubUrl?: string;
  gallery?: string[];
  description?: string;
  // Case study fields
  problem?: string;
  approach?: string;
  outcome?: string;
  highlights?: string[];
  metrics?: ProjectMetric[];
}

export interface Certificate {
  id: number;
  title: string;
  issuer: string;
  date: string;
  image: string;
  certificateImage: string;
  credentialLink: string;
}

export interface Skill {
  name: string;
  icon: string; // URL string for CDN-hosted skill icons
  color: string;
}

export type SkillProficiency = 'Expert' | 'Advanced' | 'Proficient';

export interface DetailedSkill {
  name: string;
  proficiency: SkillProficiency;
  icon: LucideIcon;
  color: string;
  barColor: string;
  tags: string[];
  description: string;
}

export interface GalleryItem {
  id: number;
  image: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
}