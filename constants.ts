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
    { name: 'React Ecosystem', proficiency: 'Expert' as const, icon: Code, color: 'text-cyan-400', barColor: 'bg-cyan-400', tags: ['Virtual DOM', 'Next.js 15', 'Server Components'], description: 'Building modern, high-performance, and scalable web applications leveraging React and Next.js.' },
    { name: 'State Management', proficiency: 'Advanced' as const, icon: GitBranch, color: 'text-purple-400', barColor: 'bg-purple-400', tags: ['Zustand', 'Redux Toolkit', 'TanStack Query'], description: 'Efficiently managing complex application states and robust data fetching workflows.' },
    { name: 'Visual Engineering', proficiency: 'Expert' as const, icon: Sparkles, color: 'text-pink-400', barColor: 'bg-pink-400', tags: ['Figma', 'Framer Motion', 'GSAP'], description: 'Crafting immersive web experiences with interactive UI and advanced fluid animations.' },
    { name: 'Advanced Styling', proficiency: 'Expert' as const, icon: PenTool, color: 'text-blue-400', barColor: 'bg-blue-400', tags: ['Tailwind', 'PostCSS', 'Design Tokens'], description: 'Designing refined, highly responsive user interfaces utilizing modern utility-first CSS and design systems.' }
  ],
  backend: [
    { name: 'Server Architecture', proficiency: 'Advanced' as const, icon: Server, color: 'text-indigo-400', barColor: 'bg-indigo-400', tags: ['Node.js', 'NestJS', 'Microservices'], description: 'Architecting scalable, enterprise-grade RESTful APIs and modern microservice infrastructures.' },
    { name: 'Database Design', proficiency: 'Advanced' as const, icon: Database, color: 'text-blue-400', barColor: 'bg-blue-400', tags: ['PostgreSQL', 'Prisma', 'Redis'], description: 'Structuring, querying, and optimizing high-performance relational databases and in-memory data stores.' },
    { name: 'API Protocols', proficiency: 'Advanced' as const, icon: Wifi, color: 'text-rose-400', barColor: 'bg-rose-400', tags: ['GraphQL', 'tRPC', 'gRPC'], description: 'Developing rapid, type-safe, and secure API communication protocols bridging client and server architectures.' },
    { name: 'DevOps & Cloud', proficiency: 'Proficient' as const, icon: Cloud, color: 'text-sky-400', barColor: 'bg-sky-400', tags: ['Docker', 'AWS', 'Vercel'], description: 'Orchestrating containerized deployments, cloud infrastructure modeling, and continuous integration pipelines.' }
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
    description: 'An intuitive Point of Sale (POS) and inventory management platform for real-time transaction monitoring and daily sales analytics. Engineered with Vite, Tailwind CSS, and Firebase Realtime Database.',
    problem: 'Small businesses needed an affordable, cloud-based POS solution with real-time inventory sync — without the complexity of enterprise systems.',
    approach: 'Built a single-page POS with Firebase Realtime Database for sub-second transaction sync across devices. Chose Vite for fast HMR during development and optimal production bundle size.',
    outcome: 'Delivered a fully functional POS system with real-time inventory tracking, daily sales analytics dashboard, and multi-device support — all in a single browser tab.',
    highlights: [
      'Real-time transaction sync via Firebase Realtime Database (< 200ms latency)',
      'Offline-resilient UI with optimistic updates and Firebase persistence',
      'Daily & weekly sales analytics with visual chart breakdowns',
      'Responsive layout optimized for tablet POS terminals',
    ],
  },
  {
    id: 1,
    title: 'Sakuku — Personal Finance & Expense Tracker',
    category: 'Web App',
    image: '/sakukuimg.webp',
    tags: ['React', 'Tailwind'],
    link: 'https://sakuku-wallet.vercel.app/',
    description: 'A modern digital wallet and expense tracking application featuring real-time visual analytics, transaction monitoring, and budget management built with React and Tailwind CSS.',
    problem: 'Users needed a clean, zero-friction way to track personal expenses with visual breakdowns — without requiring account registration.',
    approach: 'Implemented client-side state management with React hooks and localStorage persistence. Focused on fast, intuitive data entry flow and responsive chart rendering.',
    outcome: 'A privacy-first finance tracker with no backend required — all data stored locally, with instant budget visualization and category breakdown.',
    highlights: [
      'Multi-category transaction logging with color-coded visual analytics',
      'Budget limit alerts with real-time spending progress indicators',
      'Monthly summary view with income vs. expense breakdown',
      'Zero-account friction: works entirely client-side with localStorage',
    ],
  },
  {
    id: 2,
    title: 'OryonWeb — Digital Agency & Creative Portfolio',
    category: 'Web App',
    image: '/owgimg.webp',
    tags: ['React', 'Tailwind'],
    link: 'https://oryonweb.com/',
    description: 'A high-performance digital agency web application and creative showcase engineered with optimized Core Web Vitals, modular architecture, and comprehensive technical SEO.',
    problem: 'A digital agency needed a production-grade website that could showcase their portfolio while achieving strong Core Web Vitals scores to rank competitively on search.',
    approach: 'Architected with performance-first principles: lazy-loaded sections, optimized image pipeline with WebP, semantic HTML structure for SEO, and modular component system for easy content updates.',
    outcome: 'Achieved strong Lighthouse scores with optimized LCP, CLS, and FID. Structured with comprehensive technical SEO including JSON-LD schema and dynamic meta tags.',
    highlights: [
      'Performance-first architecture with lazy loading and WebP image optimization',
      'Comprehensive SEO: sitemap, robots.txt, Open Graph, JSON-LD structured data',
      'Modular component system enabling rapid content updates without code changes',
      'Fully responsive across mobile, tablet, and desktop viewports',
    ],
  },
  {
    id: 3,
    title: 'Oryon AI — Contextual AI Assistant & Code Generator',
    category: 'Web App',
    image: '/oryonaiimg.webp',
    tags: ['React', 'Gemini API'],
    link: 'https://oryon-ai-three.vercel.app/',
    description: 'An intelligent conversational platform powered by Google Gemini API with contextual reasoning, structured code generation capabilities, and a responsive futuristic user interface.',
    problem: 'Developers needed a contextual AI assistant that could maintain conversation history, generate structured code blocks, and provide a polished UI beyond standard chatbot implementations.',
    approach: 'Integrated Google Gemini API with conversation context management in React state. Implemented custom markdown rendering for code blocks with syntax highlighting and copy-to-clipboard functionality.',
    outcome: 'A production-ready AI assistant with persistent conversation context, formatted code output, and a futuristic UI optimized for developer workflows.',
    highlights: [
      'Google Gemini API integration with full conversation context management',
      'Structured code generation with syntax-highlighted, copy-ready output',
      'Custom markdown renderer for AI responses with code block formatting',
      'Streaming response display for perceived low-latency interaction',
    ],
  },
  {
    id: 4,
    title: 'Renova — Car Rental & Fleet Management System',
    category: 'Web App',
    image: '/renovaimg.webp',
    tags: ['React', 'Supabase', 'PostgreSQL'],
    link: 'https://renovamobil.vercel.app/',
    description: 'A robust vehicle rental management platform and interactive digital showroom featuring secure authentication, fleet tracking, and Supabase PostgreSQL integration.',
    problem: 'A vehicle rental business needed a digital platform to manage their fleet, handle customer bookings, and provide an interactive showroom — replacing manual spreadsheet-based tracking.',
    approach: 'Built on Supabase for PostgreSQL + auth in one platform. Implemented Row Level Security (RLS) policies to ensure users only access their own booking data. Fleet management dashboard with real-time availability status.',
    outcome: 'Full-stack rental management system with secure auth, fleet tracking, and booking management — replacing manual processes with an automated digital workflow.',
    highlights: [
      'Supabase Auth with Row Level Security for user-scoped data isolation',
      'Real-time fleet availability tracking with booking conflict prevention',
      'Interactive vehicle showroom with filtering by category and availability',
      'Booking management dashboard for admin with status tracking',
    ],
  },
  {
    id: 5,
    title: 'RSUD Dolopo — Hospital Healthcare & Patient Queue Portal',
    category: 'Web App',
    image: '/rsdolopoimg.webp',
    tags: ['React', 'Firebase', 'PostgreSQL'],
    link: 'https://rsuddoloponew.netlify.app/',
    description: 'A responsive healthcare portal and patient queuing management system designed for seamless public access to medical information, integrated with Firebase and PostgreSQL.',
    problem: 'A regional hospital needed a public-facing digital portal to reduce physical queue congestion, provide accessible medical information, and streamline patient registration.',
    approach: 'Implemented Firebase for real-time queue state management across departments, with PostgreSQL for structured patient data. Designed for accessibility with high-contrast UI and simple navigation for non-technical users.',
    outcome: "A deployed healthcare portal serving the hospital's public patients with digital queue registration, department information, and real-time queue status updates.",
    highlights: [
      'Firebase Realtime Database for live patient queue status across departments',
      'PostgreSQL integration for structured patient records and appointment data',
      'Accessibility-first UI design for elderly and non-technical users',
      'Mobile-optimized for patients accessing via smartphone',
    ],
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
