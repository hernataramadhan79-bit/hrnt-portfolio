'use client';

import React from 'react';
import Image from 'next/image';
import { Cpu, Layers, Database, X, Filter } from 'lucide-react';
import { projects } from '../../constants';

export interface TechItem {
  name: string;
  matchKeywords: string[];
  icon: string;
  role: string;
}

export interface EngineeringCluster {
  id: 'systems' | 'web' | 'data';
  title: string;
  subtitle: string;
  icon: React.ElementType;
  items: TechItem[];
}

export const ENGINEERING_CLUSTERS: EngineeringCluster[] = [
  {
    id: 'systems',
    title: 'Systems & Native',
    subtitle: 'Memory-safe desktop runtimes, binary inspection & OS automation',
    icon: Cpu,
    items: [
      { name: 'Rust', matchKeywords: ['Rust'], icon: '/icons/rust.svg', role: 'Native Systems & Memory Safety' },
      { name: 'Tauri', matchKeywords: ['Tauri'], icon: '/icons/tauri.svg', role: 'Lean Desktop Runtime (<35MB RAM)' },
      { name: 'Linux', matchKeywords: ['Linux', 'Tauri', 'Rust'], icon: '/icons/linux.svg', role: 'POSIX Runtime & Shell Automation' },
    ],
  },
  {
    id: 'web',
    title: 'Reactive Web & UI',
    subtitle: 'Server components, static type safety, 60 FPS 3D canvas & design systems',
    icon: Layers,
    items: [
      { name: 'Next.js', matchKeywords: ['Next.js'], icon: '/icons/nextjs.svg', role: 'App Router & Hybrid SSR' },
      { name: 'React', matchKeywords: ['React'], icon: '/icons/react.svg', role: 'Concurrent UI & RSC' },
      { name: 'TypeScript', matchKeywords: ['TypeScript', 'React', 'Next.js'], icon: '/icons/typescript.svg', role: 'Strict Type Contracts' },
      { name: 'Node.js', matchKeywords: ['Node.js', 'Next.js'], icon: '/icons/nodejs.svg', role: 'Async Server Runtime' },
      { name: 'Tailwind', matchKeywords: ['Tailwind'], icon: '/icons/tailwind.svg', role: 'Tonal Design System Tokens' },
      { name: 'Vite', matchKeywords: ['Vite'], icon: '/icons/vite.svg', role: 'Sub-second Bundling' },
      { name: 'Three.js', matchKeywords: ['Three.js'], icon: '/icons/threejs.svg', role: 'Isometric 3D WebGL / R3F' },
      { name: 'Vue.js', matchKeywords: ['Vue', 'React'], icon: '/icons/vuejs.svg', role: 'Reactive Component Views' },
      { name: 'HTML5', matchKeywords: ['Web App', 'React'], icon: '/icons/html5.svg', role: 'Semantic DOM & Accessibility' },
      { name: 'Figma', matchKeywords: ['Tailwind', 'React'], icon: '/icons/figma.svg', role: 'Concentric UI Systems' },
    ],
  },
  {
    id: 'data',
    title: 'Data, Cloud & Quality',
    subtitle: 'ACID relational persistence, real-time sync, containers & automated verification',
    icon: Database,
    items: [
      { name: 'PostgreSQL', matchKeywords: ['PostgreSQL', 'SQLite'], icon: '/icons/postgresql.svg', role: 'ACID Relational Storage' },
      { name: 'Supabase', matchKeywords: ['Supabase'], icon: '/icons/supabase.svg', role: 'Row-Level Security & Postgres' },
      { name: 'Prisma', matchKeywords: ['PostgreSQL', 'Supabase'], icon: '/icons/prisma.svg', role: 'Type-Safe Schema ORM' },
      { name: 'Redis', matchKeywords: ['Firebase', 'RAG-Lite'], icon: '/icons/redis.svg', role: 'In-Memory Telemetry Cache' },
      { name: 'Firebase', matchKeywords: ['Firebase'], icon: '/icons/firebase.svg', role: 'Realtime DB & Auth' },
      { name: 'Docker', matchKeywords: ['Next.js', 'PostgreSQL'], icon: '/icons/docker.svg', role: 'Containerized Deployments' },
      { name: 'GraphQL', matchKeywords: ['React', 'Next.js'], icon: '/icons/graphql.svg', role: 'Typed Graph Queries' },
      { name: 'Git', matchKeywords: ['React', 'Rust'], icon: '/icons/git.svg', role: 'Version Control & Releases' },
      { name: 'Jest', matchKeywords: ['TypeScript', 'React'], icon: '/icons/jest.svg', role: 'Automated Unit Testing' },
    ],
  },
];

export function countMatchingProjects(keywords: string[]): number {
  return projects.filter((p) =>
    keywords.some(
      (kw) =>
        p.tags.some((t) => t.toLowerCase().includes(kw.toLowerCase())) ||
        p.category.toLowerCase().includes(kw.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(kw.toLowerCase()))
    )
  ).length;
}

interface CapabilitiesProps {
  selectedTechFilter?: string | null;
  onSelectTechFilter?: (techName: string | null) => void;
  embedded?: boolean;
}

export default function Capabilities({
  selectedTechFilter = null,
  onSelectTechFilter,
  embedded = false,
}: CapabilitiesProps) {
  const handleToggleTech = (techName: string) => {
    if (!onSelectTechFilter) return;
    if (selectedTechFilter === techName) {
      onSelectTechFilter(null);
    } else {
      onSelectTechFilter(techName);
      const workEl = document.getElementById('work');
      if (workEl) {
        workEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  const innerContent = (
    <div id="capabilities" className="bento-outer">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-2 pt-1 pb-3">
        <div>
          <h3 className="text-lg sm:text-xl font-extrabold text-[#F1F5F9] tracking-tight">
            Engineering Stack &amp; Tooling
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            Select any technology pill to inspect matching production projects.
          </p>
        </div>

        {selectedTechFilter ? (
          <button
            onClick={() => onSelectTechFilter?.(null)}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--accent-pixel)] text-[var(--on-accent-pixel)] text-xs font-bold self-start sm:self-auto transition-transform active:scale-95"
          >
            <Filter size={12} />
            <span>Filtering Zone 02 by: {selectedTechFilter}</span>
            <X size={13} />
          </button>
        ) : (
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[var(--surface-2)] text-xs text-[var(--text-secondary)] tabular-nums self-start sm:self-auto">
            <span>22 Production Tools</span>
          </div>
        )}
      </div>

      {/* 3 Functional Clusters Bento Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-3">
        {ENGINEERING_CLUSTERS.map((cluster) => {
          const Icon = cluster.icon;
          const colSpan =
            cluster.id === 'systems'
              ? 'lg:col-span-3'
              : cluster.id === 'web'
              ? 'lg:col-span-5'
              : 'lg:col-span-4';

          return (
            <div
              key={cluster.id}
              className={`${colSpan} bento-inner p-4 flex flex-col justify-between gap-3`}
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-[var(--surface-3)] flex items-center justify-center text-[var(--accent-pixel)]">
                      <Icon size={14} />
                    </div>
                    <h4 className="text-sm font-bold text-[#F1F5F9]">{cluster.title}</h4>
                  </div>
                  <span className="text-[11px] text-[var(--text-muted)] tabular-nums">
                    {cluster.items.length} tools
                  </span>
                </div>
                <p className="text-[11px] text-[var(--text-secondary)] leading-relaxed mb-3">
                  {cluster.subtitle}
                </p>

                {/* Interactive Technology Pills */}
                <div className="flex flex-wrap gap-1.5">
                  {cluster.items.map((tech) => {
                    const isSelected = selectedTechFilter === tech.name;
                    const matchCount = countMatchingProjects(tech.matchKeywords);

                    return (
                      <button
                        key={tech.name}
                        type="button"
                        onClick={() => handleToggleTech(tech.name)}
                        title={`${tech.role} (${matchCount} matching projects)`}
                        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-full text-xs font-medium transition-all duration-200 active:scale-95 cursor-pointer ${
                          isSelected
                            ? 'bg-[var(--accent-pixel)] text-[var(--on-accent-pixel)] font-bold'
                            : 'bg-[var(--surface-1)] hover:bg-[var(--surface-pill)] text-[#F1F5F9]'
                        }`}
                      >
                        <Image
                          src={tech.icon}
                          alt={tech.name}
                          width={14}
                          height={14}
                          className="w-3.5 h-3.5 object-contain shrink-0"
                        />
                        <span>{tech.name}</span>
                        <span
                          className={`text-[10px] font-medium px-1.5 py-0.2 rounded-full tabular-nums ${
                            isSelected
                              ? 'bg-[#081226]/20 text-[var(--on-accent-pixel)]'
                              : 'bg-[var(--surface-2)] text-[var(--text-muted)]'
                          }`}
                        >
                          {matchCount}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  if (embedded) {
    return innerContent;
  }

  return (
    <section className="w-full max-w-[1280px] mx-auto py-6 px-4 sm:px-6 lg:px-8">
      {innerContent}
    </section>
  );
}
