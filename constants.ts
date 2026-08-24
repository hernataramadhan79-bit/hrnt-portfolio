import { Skill, Project, Certificate, GalleryItem } from './types';
import { Code, GitBranch, Sparkles, PenTool, Server, Database, Wifi, Cloud } from 'lucide-react';

export const innerSkills: Skill[] = [
  { name: 'React', icon: '/icons/react.svg', color: '#61DAFB' },
  { name: 'Next.js', icon: '/icons/nextjs.svg', color: '#FFFFFF' },
  { name: 'TypeScript', icon: '/icons/typescript.svg', color: '#3178C6' },
  { name: 'Tailwind', icon: '/icons/tailwind.svg', color: '#38B2AC' },
  { name: 'Node.js', icon: '/icons/nodejs.svg', color: '#339933' },
  { name: 'Figma', icon: '/icons/figma.svg', color: '#F24E1E' },
];

export const outerSkills: Skill[] = [
  { name: 'PostgreSQL', icon: '/icons/postgresql.svg', color: '#336791' },
  { name: 'HTML5', icon: '/icons/html5.svg', color: '#E34F26' },
  { name: 'Docker', icon: '/icons/docker.svg', color: '#2496ED' },
  { name: 'Git', icon: '/icons/git.svg', color: '#F05032' },
  { name: 'GraphQL', icon: '/icons/graphql.svg', color: '#E10098' },
  { name: 'Vue.js', icon: '/icons/vuejs.svg', color: '#4FC08D' },
  { name: 'Jest', icon: '/icons/jest.svg', color: '#C21325' },
  { name: 'Vite', icon: '/icons/vite.svg', color: '#646CFF' },
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
    id: 7,
    title: 'BangunCity — 3D Isometric City Builder & Management Simulation',
    category: 'Web App',
    image: '/banguncity.webp',
    gallery: ['/banguncity.webp'],
    tags: ['React 19', 'Three.js / R3F', 'Zustand', 'Tailwind'],
    link: 'https://banguncity.vercel.app/',
    githubUrl: 'https://github.com/hernataramadhan79-bit/BangunCity_cityBuildGame',
    description: 'An interactive 3D isometric city-building and urban management simulation game featuring real-time economic progression, 6-pillar civic happiness index (IKR), and multi-era expansion.',
    problem: 'Conventional web city simulations frequently suffer from rigid grid constraints, superficial economic models, and a lack of socio-cultural civic indicators beyond pure treasury revenue.',
    approach: 'Architected with Three.js and React Three Fiber with dynamic directional lighting and shadow rendering, Zustand with Immer for performant immutable state management, and an expandable grid algorithm supporting 12x12 up to 128x128 tiles with 8 analytic overlay maps.',
    outcome: 'Delivered a high-performance 3D browser simulation complete with 6 civilization eras, 4x4 megaprojects, district autonomy policies, interactive disaster crises, and custom audio dynamics.',
    highlights: [
      'High-performance 3D isometric graphics via Three.js & React Three Fiber with dynamic daylight and weather cycles',
      'Comprehensive 6-pillar Indeks Kebahagiaan Rakyat (IKR) tracking civic welfare, education, healthcare, and harmony',
      'Multi-directional infinite grid expansion system scaling from 12x12 up to 128x128 tiles without layout shifts',
      '8 real-time analytical map overlays including traffic congestion, air pollution, land value, and emergency coverage',
    ],
    metrics: [
      { label: 'Grid Scale', value: '128x128 Tiles', detail: 'Multi-directional infinite tile expansion' },
      { label: 'Rendering', value: '60 FPS 3D', detail: 'Optimized Three.js / R3F render pipeline' },
      { label: 'Civic Metric', value: '6 IKR Pillars', detail: 'Multi-variable social welfare simulation' },
    ],
  },
  {
    id: 8,
    title: 'Huktif — Student Legal Education & AI Advisory Platform',
    category: 'Web App',
    image: '/huktif.webp',
    gallery: ['/huktif.webp'],
    tags: ['Next.js 16', 'Groq LLaMA', 'RAG-Lite', 'Tailwind'],
    link: 'https://huktif.vercel.app/',
    githubUrl: 'https://github.com/hernataramadhan79-bit/huktifAI_app',
    description: 'A specialized legal education and AI consultation web platform for university students in Indonesia, featuring fast RAG-Lite contextual legal assistance powered by Groq Cloud LLaMA 3.3.',
    problem: 'University students regularly face complex legal dilemmas (cyber law, campus sexual harassment prevention, internship labor contracts) with limited access to immediate, structured, and credible legal guidance.',
    approach: 'Engineered a hybrid architecture with Next.js 16 App Router and an Express.js API server, implementing a lightweight keyword-based RAG algorithm indexing Indonesian statutory law with streaming inference via Groq LLaMA 3.3.',
    outcome: 'Created an intuitive legal literacy platform providing sub-second AI advisory responses with verified statute citations, 4 structured educational curriculum pillars, and direct directories to campus emergency task forces and legal aid (LBH).',
    highlights: [
      'RAG-Lite contextual retrieval referencing official Indonesian statutes (UU ITE, TPKS, Narkotika, Ketenagakerjaan)',
      'Sub-400ms streaming legal advisory chat powered by Groq Cloud LLaMA 3.3 inference',
      'Emergency directory with direct routing to campus Satgas TPKS and regional Legal Aid (LBH) organizations',
      'Accessibility-focused responsive interface with clean typography, dark/light themes, and structured legal articles',
    ],
    metrics: [
      { label: 'Inference Speed', value: '< 400ms', detail: 'Groq Cloud LPU real-time streaming' },
      { label: 'Core Pillars', value: '4 Modules', detail: 'Cyber Law, TPKS, Labor, Anti-Narcotics' },
      { label: 'Statute Linking', value: '100% Verified', detail: 'Direct reference to Indonesian legislation' },
    ],
  },
  {
    id: 9,
    title: 'SortiQ — Content-Aware Desktop File Organizer',
    category: 'Desktop App',
    image: '/sortiq.webp',
    gallery: ['/sortiq.webp'],
    tags: ['Tauri v2', 'Rust', 'TypeScript', 'Tailwind'],
    link: 'https://github.com/hernataramadhan79-bit/SortiQ/releases',
    githubUrl: 'https://github.com/hernataramadhan79-bit/SortiQ',
    description: 'A high-performance native desktop file organizer that inspects true binary content (magic bytes) rather than misleading extensions to safely categorize and sort files. Built with Tauri v2 and Rust.',
    problem: 'File extensions are frequently misleading, incorrect, or corrupted (.docx masked as .zip, mismatched audio/image files), leading to broken workflows and misclassified files in conventional organizers.',
    approach: 'Built a native Rust backend utilizing the infer crate to inspect initial binary magic bytes before falling back to MIME heuristics, combined with a prioritized YAML rule engine and an atomic transaction log.',
    outcome: 'A cross-platform native desktop utility (< 15MB installer) that sorts thousands of files per second with zero misidentification, dry-run simulation mode, and 100% non-destructive 1-click rollback support.',
    highlights: [
      'True binary MIME detection using Rust magic byte analysis (infer crate) with extension and UTF-8 fallbacks',
      'Customizable top-down rule evaluation engine with instant one-click presets and dry-run preview',
      'Audit log transaction tracking (sortiq.log) providing 100% non-destructive instant undo capability',
      'Native desktop efficiency (< 30MB RAM footprint, < 15MB installer) powered by Tauri v2 and Rust',
    ],
    metrics: [
      { label: 'Detection Basis', value: 'Magic Bytes', detail: 'Binary header inspection vs filename' },
      { label: 'Memory Footprint', value: '< 30 MB', detail: 'Ultra-lean Rust backend execution' },
      { label: 'Package Size', value: '< 15 MB', detail: 'Compact Tauri v2 installer package' },
    ],
  },
  {
    id: 6,
    title: 'MyBoard Lite — Real-time Cloud POS & Inventory System',
    category: 'Web App',
    image: '/myboard.webp',
    gallery: ['/myboard.webp'],
    tags: ['Vite', 'Tailwind', 'Firebase'],
    link: 'https://myboard-lite.vercel.app/',
    githubUrl: 'https://github.com/hernataramadhan79-bit',
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
    metrics: [
      { label: 'Sync Latency', value: '< 200ms', detail: 'Sub-second real-time database sync' },
      { label: 'Resilience', value: '100% Offline', detail: 'Optimistic updates with local persistence' },
      { label: 'Platform Support', value: 'Multi-Device', detail: 'Tablet POS terminals & mobile web' },
    ],
  },
  {
    id: 1,
    title: 'Sakuku — Personal Finance & Expense Tracker',
    category: 'Web App',
    image: '/sakukuimg.webp',
    gallery: ['/sakukuimg.webp'],
    tags: ['React', 'Tailwind'],
    link: 'https://sakuku-wallet.vercel.app/',
    githubUrl: 'https://github.com/hernataramadhan79-bit',
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
    metrics: [
      { label: 'Auth Friction', value: '0 sec', detail: 'Instant access without registration barrier' },
      { label: 'Client Privacy', value: '100% Local', detail: 'Zero server footprint with local persistence' },
      { label: 'Load Time', value: '< 0.8s', detail: 'Ultra-lightweight bundle & instant render' },
    ],
  },
  {
    id: 3,
    title: 'Oryon AI — Contextual AI Assistant & Code Generator',
    category: 'Web App',
    image: '/oryonaiimg.webp',
    gallery: ['/oryonaiimg.webp'],
    tags: ['React', 'Gemini API'],
    link: 'https://oryon-ai-three.vercel.app/',
    githubUrl: 'https://github.com/hernataramadhan79-bit',
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
    metrics: [
      { label: 'Context Window', value: 'Multi-turn', detail: 'Stateful conversation memory retention' },
      { label: 'Perceived Latency', value: '< 300ms', detail: 'Streamed markdown & code rendering' },
      { label: 'Syntax Formats', value: '20+ Langs', detail: 'Syntax-highlighted code block generator' },
    ],
  },
  {
    id: 4,
    title: 'Renova — Car Rental & Fleet Management System',
    category: 'Web App',
    image: '/renovaimg.webp',
    gallery: ['/renovaimg.webp'],
    tags: ['React', 'Supabase', 'PostgreSQL'],
    link: 'https://renovamobil.vercel.app/',
    githubUrl: 'https://github.com/hernataramadhan79-bit',
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
    metrics: [
      { label: 'Data Security', value: 'Supabase RLS', detail: 'Row Level Security user-isolated queries' },
      { label: 'Fleet Sync', value: 'Live Updates', detail: 'Zero double-booking conflict prevention' },
      { label: 'Digital Automation', value: '100% Online', detail: 'Replaced manual spreadsheet operations' },
    ],
  },
  {
    id: 5,
    title: 'RSUD Dolopo — Hospital Healthcare & Patient Queue Portal',
    category: 'Web App',
    image: '/rsdolopoimg.webp',
    gallery: ['/rsdolopoimg.webp'],
    tags: ['React', 'Firebase', 'PostgreSQL'],
    link: 'https://rsuddoloponew.netlify.app/',
    githubUrl: 'https://github.com/hernataramadhan79-bit',
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
    metrics: [
      { label: 'Queue Sync', value: 'Real-time', detail: 'Live cross-department status updates' },
      { label: 'Accessibility', value: 'WCAG High Contrast', detail: 'Designed for non-technical & elderly users' },
      { label: 'Mobile Readiness', value: '100% Responsive', detail: 'Optimized for instant smartphone access' },
    ],
  },
  {
    id: 2,
    title: 'OryonWeb — Digital Agency & Creative Portfolio',
    category: 'Web App',
    image: '/owgimg.webp',
    gallery: ['/owgimg.webp'],
    tags: ['React', 'Tailwind'],
    link: 'https://oryonweb.com/',
    githubUrl: 'https://github.com/hernataramadhan79-bit',
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
    metrics: [
      { label: 'Lighthouse Score', value: '98 / 100', detail: 'Optimized LCP, CLS, and FID metrics' },
      { label: 'Payload Reduction', value: '-45%', detail: 'Automated WebP responsive image pipeline' },
      { label: 'SEO Structure', value: 'JSON-LD', detail: 'Schema.org semantic rich snippets' },
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
    role: 'Full-Stack Software Engineer',
    company: 'Freelance & Independent Consulting',
    period: '2023 - Present',
    description: 'Architecting bespoke web applications and performant digital solutions for clients, specializing in Next.js, React, TypeScript, PostgreSQL, and scalable API systems.',
    tags: ['Next.js', 'React', 'TypeScript', 'PostgreSQL', 'Tailwind']
  },
  {
    type: 'edu',
    role: 'B.S. in Computer Science / Informatics',
    company: 'Universitas PGRI Madiun',
    period: '2025 - Present',
    description: 'Pursuing academic studies in Computer Science with a strong emphasis on algorithms, distributed web architecture, database systems, and software engineering principles.',
    tags: ['Algorithms', 'Data Structures', 'Web Architecture']
  },
  {
    type: 'work',
    role: 'Sales Executive & Media Producer',
    company: 'PT. Indraco (Suncity Waterpark)',
    period: '2025 (Contract)',
    description: 'Spearheaded digital promotional media and executed customer acquisition strategies to enhance brand presence and customer engagement.',
    tags: ['Brand Strategy', 'Media Production', 'Growth']
  },
  {
    type: 'work',
    role: 'Digital Media & Technical Designer',
    company: 'AA Victory Digital Printing',
    period: '2025 (Contract)',
    description: 'Managed technical pre-press workflows, color management, and high-precision visual asset production for commercial formats.',
    tags: ['Asset Management', 'Graphic Production', 'Workflow']
  },
  {
    type: 'edu',
    role: 'Vocational Diploma in Visual Design',
    company: 'SMKN 1 Wonoasri',
    period: '2022 - 2025',
    description: 'Specialized in Visual Communication Design, establishing a rigorous foundation in design tokens, composition, typography, and human-computer interface aesthetics.',
    tags: ['UI Design', 'Typography', 'Visual Aesthetics']
  }
];

// Web3Forms Configuration — key loaded from .env.local (NEXT_PUBLIC_WEB3FORMS_KEY)
export const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? '';
