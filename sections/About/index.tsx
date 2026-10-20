'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { experiences } from '../../constants';

export default function About({ embedded = false }: { embedded?: boolean }) {
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'work' | 'edu'>('all');

  const filteredExperiences = experiences.filter((exp) => {
    if (timelineFilter === 'all') return true;
    return exp.type === timelineFilter;
  });

  const content = (
    <div id="about" className="bento-inner p-4 sm:p-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
        <div className="flex items-center gap-2">
          <Briefcase size={15} className="text-[var(--accent-pixel)]" />
          <h3 className="text-sm font-bold text-[#F1F5F9]">
            Career &amp; Academic Timeline
          </h3>
        </div>

        <div className="flex items-center gap-1 bg-[var(--surface-1)] p-1 rounded-full self-start sm:self-auto">
          {[
            { id: 'all', label: `All (${experiences.length})` },
            { id: 'work', label: 'Engineering & Work (3)' },
            { id: 'edu', label: 'Academic (2)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setTimelineFilter(tab.id as 'all' | 'work' | 'edu')}
              className={`px-2.5 py-1 text-[11px] font-medium rounded-full transition-colors tabular-nums ${
                timelineFilter === tab.id
                  ? 'bg-[var(--surface-pill)] text-[#F1F5F9] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[#F1F5F9]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
        <AnimatePresence mode="popLayout">
          {filteredExperiences.map((exp) => (
            <motion.div
              key={`${exp.role}-${exp.period}`}
              layout="position"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="p-3.5 rounded-[14px] bg-[var(--surface-1)] space-y-2.5"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted)] mb-1 tabular-nums">
                  <span>{exp.period}</span>
                  <span className="inline-flex items-center gap-1 text-[var(--accent-pixel)]">
                    {exp.type === 'work' ? <Briefcase size={11} /> : <GraduationCap size={11} />}
                    <span>{exp.type === 'work' ? 'Work' : 'Academic'}</span>
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#F1F5F9] leading-snug">
                  {exp.role}
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)] mt-0.5">{exp.company}</p>
              </div>
              <div className="flex flex-wrap gap-1 mt-2.5">
                {exp.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono text-[var(--text-secondary)] bg-[var(--surface-2)] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );

  if (embedded) {
    return content;
  }

  return (
    <section className="w-full max-w-[1280px] mx-auto py-6 px-4 sm:px-6 lg:px-8">
      <div className="bento-outer">{content}</div>
    </section>
  );
}
