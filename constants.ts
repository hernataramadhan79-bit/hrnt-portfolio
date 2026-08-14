import { Skill, Project, Certificate, GalleryItem } from './types';
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
    { name: 'React Ecosystem', level: 98, icon: Code, color: 'text-cyan-400', barColor: 'bg-cyan-400', tags: ['Virtual DOM', 'Next.js 15', 'Server Components'], description: 'Building modern, high-performance, and scalable web applications leveraging React and Next.js.' },
    { name: 'State Management', level: 80, icon: GitBranch, color: 'text-purple-400', barColor: 'bg-purple-400', tags: ['Zustand', 'Redux Toolkit', 'TanStack Query'], description: 'Efficiently managing complex application states and robust data fetching workflows.' },
    { name: 'Visual Engineering', level: 90, icon: Sparkles, color: 'text-pink-400', barColor: 'bg-pink-400', tags: ['Figma', 'Framer Motion', 'GSAP'], description: 'Crafting immersive web experiences with interactive UI and advanced fluid animations.' },
    { name: 'Advanced Styling', level: 98, icon: PenTool, color: 'text-blue-400', barColor: 'bg-blue-400', tags: ['Tailwind', 'PostCSS', 'Design Tokens'], description: 'Designing refined, highly responsive user interfaces utilizing modern utility-first CSS and design systems.' }
  ],
  backend: [
    { name: 'Server Architecture', level: 85, icon: Server, color: 'text-indigo-400', barColor: 'bg-indigo-400', tags: ['Node.js', 'NestJS', 'Microservices'], description: 'Architecting scalable, enterprise-grade RESTful APIs and modern microservice infrastructures.' },
    { name: 'Database Design', level: 80, icon: Database, color: 'text-blue-400', barColor: 'bg-blue-400', tags: ['PostgreSQL', 'Prisma', 'Redis'], description: 'Structuring, querying, and optimizing high-performance relational databases and in-memory data stores.' },
    { name: 'API Protocols', level: 85, icon: Wifi, color: 'text-rose-400', barColor: 'bg-rose-400', tags: ['GraphQL', 'tRPC', 'gRPC'], description: 'Developing rapid, type-safe, and secure API communication protocols bridging client and server architectures.' },
    { name: 'DevOps & Cloud', level: 75, icon: Cloud, color: 'text-sky-400', barColor: 'bg-sky-400', tags: ['Docker', 'AWS', 'Vercel'], description: 'Orchestrating containerized deployments, cloud infrastructure modeling, and continuous integration pipelines.' }
  ]
};

export const projects: Project[] = [
  {
    id: 6,
    title: 'MyBoard Lite — Real-time Cloud POS & Inventory System',
    category: 'Web App',
    image: '/myboard.webp',
    tags: ['Vite', 'Tailwind', 'Firebase'],
    link: 'https://myboard-lite.vercel.app/',
    description: 'An intuitive Point of Sale (POS) and inventory management platform for real-time transaction monitoring and daily sales analytics. Engineered with Vite, Tailwind CSS, and Firebase Realtime Database.'
  },
  {
    id: 1,
    title: 'Sakuku — Personal Finance & Expense Tracker',
    category: 'Web App',
    image: '/sakukuimg.webp',
    tags: ['React', 'Tailwind'],
    link: 'https://sakuku-wallet.vercel.app/',
    description: 'A modern digital wallet and expense tracking application featuring real-time visual analytics, transaction monitoring, and budget management built with React and Tailwind CSS.'
  },
  {
    id: 2,
    title: 'OryonWeb — Digital Agency & Creative Portfolio',
    category: 'Web App',
    image: '/owgimg.webp',
    tags: ['React', 'Tailwind'],
    link: 'https://oryonweb.com/',
    description: 'A high-performance digital agency web application and creative showcase engineered with optimized Core Web Vitals, modular architecture, and comprehensive technical SEO.'
  },
  {
    id: 3,
    title: 'Oryon AI — Contextual AI Assistant & Code Generator',
    category: 'Web App',
    image: '/oryonaiimg.webp',
    tags: ['React', 'Gemini API'],
    link: 'https://oryon-ai-three.vercel.app/',
    description: 'An intelligent conversational platform powered by Google Gemini API with contextual reasoning, structured code generation capabilities, and a responsive futuristic user interface.'
  },
  {
    id: 4,
    title: 'Renova — Car Rental & Fleet Management System',
    category: 'Web App',
    image: '/renovaimg.webp',
    tags: ['React', 'Supabase', 'PostgreSQL'],
    link: 'https://renovamobil.vercel.app/',
    description: 'A robust vehicle rental management platform and interactive digital showroom featuring secure authentication, fleet tracking, and Supabase PostgreSQL integration.'
  },
  {
    id: 5,
    title: 'RSUD Dolopo — Hospital Healthcare & Patient Queue Portal',
    category: 'Web App',
    image: '/rsdolopoimg.webp',
    tags: ['React', 'Firebase', 'PostgreSQL'],
    link: 'https://rsuddoloponew.netlify.app/',
    description: 'A responsive healthcare portal and patient queuing management system designed for seamless public access to medical information, integrated with Firebase and PostgreSQL.'
  },
];

export const certificates: Certificate[] = [
  {
    id: 1,
    title: 'Learn The Basics Of Web Programming',
    issuer: 'Dicoding',
    date: '2025',
    image: '/dicodinglogo.jpg',
    certificateImage: '/sertifikat1.webp',
    credentialLink: '/sertifikat1.webp'
  },
  {
    id: 2,
    title: 'Photography Expertise Level III KKNI',
    issuer: 'LESKOFI',
    date: '2025',
    image: '/logoleskofi.webp',
    certificateImage: '/sertifikat2.jpg',
    credentialLink: '/sertifikat2.jpg'
  },
  {
    id: 3,
    title: 'Learning AI Basics',
    issuer: 'Dicoding',
    date: '2025',
    image: '/dicodinglogo.jpg',
    certificateImage: '/sertifikat3.webp',
    credentialLink: '/sertifikat3.webp'
  },
];

export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    image: '/galeri1.webp',
    title: 'UPTPTKK Photography Cohort Session',
    description: 'A collaborative group photo session with the UPTPTKK Acceleration Class (MJC Photography Cohort 1), celebrating creative collaboration and fostering professional networking in digital media.',
    date: 'December 2025',
    location: 'Surabaya, ID',
    category: 'Education'
  },
  {
    id: 2,
    image: '/gallery2.webp',
    title: 'Mentorship Session at UPTPTKK',
    description: 'A valuable mentorship session and documentation with industry experts in the MJC Photography Acceleration Class, gaining hands-on professional insights and creative media production techniques.',
    date: 'December 2025',
    location: 'Surabaya, ID',
    category: 'Education'
  },
];

export const experiences = [
  {
    type: 'work',
    role: 'Fullstack Freelancer',
    company: 'Self-Employed',
    period: '2023 - Present',
    description: 'Providing bespoke digital solutions for local and international clients, focusing on React, Next.js, and high-performance infrastructure.',
    tags: ['React', 'Next.js', 'PostgreSQL', 'UI/UX']
  },
  {
    type: 'edu',
    role: 'University Student',
    company: 'University of PGRI Madiun',
    period: '2025 - Present',
    description: 'Pursuing academic excellence in Computer Science, deepening knowledge in distributed systems and software orchestration.',
    tags: ['Algorithms', 'Logic', 'Architecture']
  },
  {
    type: 'work',
    role: 'Sales Executive & Content Creator',
    company: 'PT. Indraco (Suncity Waterpark)',
    period: '2025 (3 Months)',
    description: 'Executed sales strategies and managed creative content production to enhance brand presence and customer engagement.',
    tags: ['Marketing', 'Content Creation', 'Sales']
  },
  {
    type: 'work',
    role: 'Operator & Graphic Designer',
    company: 'AA Victory Digital Printing',
    period: '2025 (3 Months)',
    description: 'Managed high-scale printing production and technical design workflows, ensuring precision in large-format media output.',
    tags: ['Printing', 'Graphic Design', 'Production']
  },
  {
    type: 'edu',
    role: 'High School Graduate',
    company: 'SMKN 1 Wonoasri',
    period: '2022 - 2025',
    description: 'Specialized in Visual Communication Design, establishing a robust foundation in design principles, digital media, and creative aesthetics.',
    tags: ['Design', 'Visual Arts', 'Multimedia']
  }
];

// Web3Forms Configuration — key loaded from .env.local (NEXT_PUBLIC_WEB3FORMS_KEY)
export const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';

// Mock Real-time Stats for Library Section
export const wakaTimeStats = {
  languages: [
    { name: 'TypeScript', percent: 84.2, color: '#3178C6' },
    { name: 'React', percent: 72.5, color: '#61DAFB' },
    { name: 'JavaScript', percent: 35.8, color: '#F7DF1E' },
    { name: 'CSS/Tailwind', percent: 28.4, color: '#38B2AC' },
    { name: 'Node.js', percent: 15.2, color: '#339933' },
    { name: 'Others', percent: 5.4, color: '#94a3b8' },
  ],
  totalTime: '1,248 hrs 32 mins',
  dailyAverage: '4 hrs 12 mins',
  bestDay: '8 hrs 45 mins'
};

export const githubStats = {
  totalContributions: 1452,
  thisWeek: 42,
  bestDay: 68,
  dailyAverage: 4,
  stars: 124,
  repos: 45,
  followers: 86
};
