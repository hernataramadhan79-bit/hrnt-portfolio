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

// GitHub Telemetry Types
export interface GitHubRepoItem {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at?: string;
}

export interface GitHubTelemetryData {
  profile: {
    repos: number;
    followers: number;
    totalContributions: number;
    stars: number;
  };
  topRepos: GitHubRepoItem[];
  contributions: Array<Array<{ date: string; count: number }>>;
}

// WakaTime Telemetry Types
export interface WakaTimeLanguage {
  name: string;
  percent: number;
  color: string;
}

export interface WakaTimeTelemetryData {
  languages: WakaTimeLanguage[];
  totalTime: string;
  dailyAverage: string;
  bestDay: string;
  optimizationFactor: string;
  isLoaded: boolean;
}

// Firestore REST Types
export interface FirestoreCommentDoc {
  id: string;
  name: string;
  userId: string;
  userImage: string;
  message: string;
  createdAt: string;
}

export interface FirestoreRawDoc {
  name?: string;
  createTime?: string;
  fields?: {
    name?: { stringValue?: string };
    userId?: { stringValue?: string };
    userImage?: { stringValue?: string };
    message?: { stringValue?: string };
    createdAt?: { timestampValue?: string };
  };
}