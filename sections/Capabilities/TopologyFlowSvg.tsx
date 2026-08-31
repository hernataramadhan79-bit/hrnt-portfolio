'use client';

import React from 'react';

interface TopologyFlowSvgProps {
  activeTierId: 'web' | 'desktop' | 'backend' | 'data';
  onSelectTier: (tierId: 'web' | 'desktop' | 'backend' | 'data') => void;
}

export const TopologyFlowSvg: React.FC<TopologyFlowSvgProps> = ({
  activeTierId,
  onSelectTier,
}) => {
  return (
    <div className="hidden sm:flex my-5 relative items-center justify-center bg-[#07080c]/60 rounded-2xl p-4 border border-white/5">
      <svg
        className="w-full h-full min-h-[220px] max-h-[270px]"
        viewBox="0 0 760 280"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#22d3ee" stopOpacity="1" />
            <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.3" />
          </linearGradient>
          <linearGradient id="activeGlow" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#0284c7" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Connecting Pipeline Paths with Live Signal Pulse */}
        <path
          d="M 165 140 L 240 140"
          fill="none"
          stroke={activeTierId === 'web' || activeTierId === 'desktop' ? '#22d3ee' : 'rgba(255,255,255,0.15)'}
          strokeWidth="2.5"
          strokeDasharray={activeTierId === 'web' || activeTierId === 'desktop' ? '6 4' : 'none'}
          className={activeTierId === 'web' || activeTierId === 'desktop' ? 'flow-line' : ''}
        />
        <path
          d="M 395 140 C 460 140 460 66 520 66"
          fill="none"
          stroke={activeTierId === 'backend' || activeTierId === 'desktop' ? '#38bdf8' : 'rgba(255,255,255,0.15)'}
          strokeWidth="2.5"
          strokeDasharray={activeTierId === 'backend' || activeTierId === 'desktop' ? '6 4' : 'none'}
          className={activeTierId === 'backend' || activeTierId === 'desktop' ? 'flow-line' : ''}
        />
        <path
          d="M 395 140 C 460 140 460 214 520 214"
          fill="none"
          stroke={activeTierId === 'data' || activeTierId === 'backend' ? '#22d3ee' : 'rgba(255,255,255,0.15)'}
          strokeWidth="2.5"
          strokeDasharray={activeTierId === 'data' || activeTierId === 'backend' ? '6 4' : 'none'}
          className={activeTierId === 'data' || activeTierId === 'backend' ? 'flow-line' : ''}
        />

        {/* Node 1: Web & UI */}
        <g
          transform="translate(20, 104)"
          onClick={() => onSelectTier('web')}
          className="cursor-pointer group/node"
        >
          <rect
            width="145"
            height="72"
            rx="14"
            fill={activeTierId === 'web' ? 'url(#activeGlow)' : 'rgba(255,255,255,0.03)'}
            stroke={activeTierId === 'web' ? '#22d3ee' : 'rgba(255,255,255,0.12)'}
            strokeWidth={activeTierId === 'web' ? '2' : '1'}
            className="transition-colors duration-200 group-hover/node:stroke-cyan-400 group-hover/node:fill-white/[0.07]"
          />
          <circle cx="22" cy="24" r="3.5" fill={activeTierId === 'web' ? '#22d3ee' : '#8e9192'} />
          <text x="32" y="27" fill={activeTierId === 'web' ? '#22d3ee' : '#8e9192'} className="text-[10px] font-mono font-bold">
            01 WEB
          </text>
          <text x="20" y="47" fill="#ffffff" className="text-[11px] font-bold">
            Web &amp; UI
          </text>
          <text x="20" y="61" fill="#8e9192" className="text-[9px] font-mono">
            React 19 • Next.js
          </text>
        </g>

        {/* Node 2: Native Desktop & Systems */}
        <g
          transform="translate(240, 104)"
          onClick={() => onSelectTier('desktop')}
          className="cursor-pointer group/node"
        >
          <rect
            width="155"
            height="72"
            rx="14"
            fill={activeTierId === 'desktop' ? 'url(#activeGlow)' : 'rgba(255,255,255,0.03)'}
            stroke={activeTierId === 'desktop' ? '#22d3ee' : 'rgba(255,255,255,0.12)'}
            strokeWidth={activeTierId === 'desktop' ? '2' : '1'}
            className="transition-colors duration-200 group-hover/node:stroke-cyan-400 group-hover/node:fill-white/[0.07]"
          />
          <circle cx="22" cy="24" r="3.5" fill={activeTierId === 'desktop' ? '#22d3ee' : '#8e9192'} />
          <text x="32" y="27" fill={activeTierId === 'desktop' ? '#22d3ee' : '#8e9192'} className="text-[10px] font-mono font-bold">
            02 DESKTOP
          </text>
          <text x="20" y="47" fill="#ffffff" className="text-[11px] font-bold">
            Desktop &amp; Systems
          </text>
          <text x="20" y="61" fill="#8e9192" className="text-[9px] font-mono">
            Tauri v2 • Rust
          </text>
        </g>

        {/* Node 3: Backend & AI */}
        <g
          transform="translate(520, 30)"
          onClick={() => onSelectTier('backend')}
          className="cursor-pointer group/node"
        >
          <rect
            width="215"
            height="72"
            rx="14"
            fill={activeTierId === 'backend' ? 'url(#activeGlow)' : 'rgba(255,255,255,0.03)'}
            stroke={activeTierId === 'backend' ? '#38bdf8' : 'rgba(255,255,255,0.12)'}
            strokeWidth={activeTierId === 'backend' ? '2' : '1'}
            className="transition-colors duration-200 group-hover/node:stroke-sky-400 group-hover/node:fill-white/[0.07]"
          />
          <circle cx="22" cy="24" r="3.5" fill={activeTierId === 'backend' ? '#38bdf8' : '#8e9192'} />
          <text x="32" y="27" fill={activeTierId === 'backend' ? '#38bdf8' : '#8e9192'} className="text-[10px] font-mono font-bold">
            03 SERVER &amp; AI
          </text>
          <text x="20" y="47" fill="#ffffff" className="text-[11px] font-bold">
            Backend APIs &amp; AI
          </text>
          <text x="20" y="61" fill="#8e9192" className="text-[9px] font-mono">
            Node.js • Groq LLaMA
          </text>
        </g>

        {/* Node 4: Persistence & Sync */}
        <g
          transform="translate(520, 178)"
          onClick={() => onSelectTier('data')}
          className="cursor-pointer group/node"
        >
          <rect
            width="215"
            height="72"
            rx="14"
            fill={activeTierId === 'data' ? 'url(#activeGlow)' : 'rgba(255,255,255,0.03)'}
            stroke={activeTierId === 'data' ? '#22d3ee' : 'rgba(255,255,255,0.12)'}
            strokeWidth={activeTierId === 'data' ? '2' : '1'}
            className="transition-colors duration-200 group-hover/node:stroke-cyan-400 group-hover/node:fill-white/[0.07]"
          />
          <circle cx="22" cy="24" r="3.5" fill={activeTierId === 'data' ? '#22d3ee' : '#8e9192'} />
          <text x="32" y="27" fill={activeTierId === 'data' ? '#22d3ee' : '#8e9192'} className="text-[10px] font-mono font-bold">
            04 PERSISTENCE
          </text>
          <text x="20" y="47" fill="#ffffff" className="text-[11px] font-bold">
            Persistence &amp; Sync
          </text>
          <text x="20" y="61" fill="#8e9192" className="text-[9px] font-mono">
            PostgreSQL • Firebase
          </text>
        </g>
      </svg>
    </div>
  );
};
