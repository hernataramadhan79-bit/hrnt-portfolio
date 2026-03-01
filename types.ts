import { LucideIcon } from 'lucide-react';

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  sectionId: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  image: string;
  tags: string[];
  link: string;
  description?: string;
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
  icon: string; // Changed to string for Logo URLs
  color: string;
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