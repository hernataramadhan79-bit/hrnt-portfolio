import { Skill, Project, Certificate } from './types';
import { Code, GitBranch, Sparkles, PenTool, Server, Database, Wifi, Cloud } from 'lucide-react';

export const innerSkills: Skill[] = [
  { name: 'React', icon: 'https://cdn.simpleicons.org/react/61DAFB', color: '#61DAFB' },
  { name: 'Next.js', icon: 'https://cdn.simpleicons.org/nextdotjs/white', color: '#FFFFFF' },
  { name: 'TypeScript', icon: 'https://cdn.simpleicons.org/typescript/3178C6', color: '#3178C6' },
  { name: 'Tailwind', icon: 'https://cdn.simpleicons.org/tailwindcss/38B2AC', color: '#38B2AC' },
  { name: 'Node.js', icon: 'https://cdn.simpleicons.org/nodedotjs/339933', color: '#339933' },
  { name: 'Figma', icon: 'https://cdn.simpleicons.org/figma/F24E1E', color: '#F24E1E' },
];

export const outerSkills: Skill[] = [
  { name: 'PostgreSQL', icon: 'https://cdn.simpleicons.org/postgresql/4169E1', color: '#336791' },
  { name: 'HTML', icon: 'https://cdn.simpleicons.org/html5/E34F26', color: '#E34F26' },
  { name: 'Docker', icon: 'https://cdn.simpleicons.org/docker/2496ED', color: '#2496ED' },
  { name: 'Git', icon: 'https://cdn.simpleicons.org/git/F05032', color: '#F05032' },
  { name: 'GraphQL', icon: 'https://cdn.simpleicons.org/graphql/E10098', color: '#E10098' },
  { name: 'Vue.js', icon: 'https://cdn.simpleicons.org/vuedotjs/4FC08D', color: '#4FC08D' },
  { name: 'Jest', icon: 'https://cdn.simpleicons.org/jest/C21325', color: '#C21325' },
  { name: 'Vite', icon: 'https://cdn.simpleicons.org/vite/646CFF', color: '#646CFF' },
];

export const detailedSkills = {
  frontend: [
    { name: 'React Ecosystem', level: 98, icon: Code, color: 'text-cyan-400', barColor: 'bg-cyan-400', tags: ['Virtual DOM', 'Next.js 15', 'Server Components'] },
    { name: 'State Management', level: 96, icon: GitBranch, color: 'text-purple-400', barColor: 'bg-purple-400', tags: ['Zustand', 'Redux Toolkit', 'TanStack Query'] },
    { name: 'Visual Engineering', level: 94, icon: Sparkles, color: 'text-pink-400', barColor: 'bg-pink-400', tags: ['Three.js', 'Framer Motion', 'GSAP'] },
    { name: 'Advanced Styling', level: 98, icon: PenTool, color: 'text-blue-400', barColor: 'bg-blue-400', tags: ['Tailwind', 'PostCSS', 'Design Tokens'] }
  ],
  backend: [
    { name: 'Server Architecture', level: 95, icon: Server, color: 'text-indigo-400', barColor: 'bg-indigo-400', tags: ['Node.js', 'NestJS', 'Microservices'] },
    { name: 'Database Design', level: 92, icon: Database, color: 'text-blue-400', barColor: 'bg-blue-400', tags: ['PostgreSQL', 'Prisma', 'Redis'] },
    { name: 'API Protocols', level: 96, icon: Wifi, color: 'text-rose-400', barColor: 'bg-rose-400', tags: ['GraphQL', 'tRPC', 'gRPC'] },
    { name: 'DevOps & Cloud', level: 88, icon: Cloud, color: 'text-sky-400', barColor: 'bg-sky-400', tags: ['Docker', 'AWS', 'Vercel'] }
  ]
};

export const projects: Project[] = [
  { id: 1, title: 'E-Commerce Dashboard', category: 'Web App', image: 'https://picsum.photos/600/400?random=1', tags: ['React', 'Tailwind', 'Recharts'] },
  { id: 2, title: 'AI Content Generator', category: 'SaaS Platform', image: 'https://picsum.photos/600/400?random=2', tags: ['Next.js', 'OpenAI', 'Stripe'] },
  { id: 3, title: 'Crypto Wallet', category: 'Mobile App', image: 'https://picsum.photos/600/400?random=3', tags: ['React Native', 'Web3.js'] },
  { id: 4, title: 'Travel Journal', category: 'Social Media', image: 'https://picsum.photos/600/400?random=4', tags: ['Vue', 'Firebase', 'Mapbox'] },
];

export const certificates: Certificate[] = [
  { id: 1, title: 'Meta Frontend Developer', issuer: 'Meta', date: '2023', image: '', credentialLink: '#' },
  { id: 2, title: 'AWS Certified Architect', issuer: 'AWS', date: '2022', image: '', credentialLink: '#' },
  { id: 3, title: 'Google UX Design', issuer: 'Google', date: '2022', image: '', credentialLink: '#' },
  { id: 4, title: 'Advanced React Patterns', issuer: 'Frontend Masters', date: '2021', image: '', credentialLink: '#' }
];

export const experience = [
  { year: '2022 - Present', role: 'Senior Fullstack Dev', company: 'TechCorp Inc.', description: 'Frontend architecture & cloud strategies.' },
  { year: '2020 - 2022', role: 'Fullstack Developer', company: 'Creative Agency', description: 'Interactive platforms & UI libraries.' },
];