'use client';

import React, { useState } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Briefcase, GraduationCap } from 'lucide-react';
import { experiences } from '../../constants';
import { effect, spatial } from '../../lib/motion';

export default function About({ embedded = false }: { embedded?: boolean }) {
  const [timelineFilter, setTimelineFilter] = useState<'all' | 'work' | 'edu'>('all');

  const filteredExperiences = experiences.filter((exp) => {
    if (timelineFilter === 'all') return true;
    return exp.type === timelineFilter;
  });

  const content = (
    <div id="about" className="bento-inner p-4 h-full flex flex-col justify-between overflow-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2 px-1 shrink-0">
        <div className="flex items-center gap-2">
          <Briefcase size={15} className="text-[var(--accent-pixel)]" />
          <h3 className="text-sm font-bold text-[#F1F5F9]">
            Career &amp; Academic Timeline
          </h3>
        </div>

        <div className="relative isolate flex items-center gap-1 bg-[var(--surface-1)] p-1 rounded-full self-start sm:self-auto">
          {[
            { id: 'all', label: `All (${experiences.length})` },
            { id: 'work', label: 'Engineering & Work (3)' },
            { id: 'edu', label: 'Academic (2)' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              aria-pressed={timelineFilter === tab.id}
              onClick={() => setTimelineFilter(tab.id as 'all' | 'work' | 'edu')}
              className={`relative px-2.5 py-1 text-[11px] font-medium rounded-full transition-colors tabular-nums cursor-pointer ${
                timelineFilter === tab.id
                  ? 'text-[#F1F5F9] font-semibold'
                  : 'text-[var(--text-secondary)] hover:text-[#F1F5F9]'
              }`}
            >
              {timelineFilter === tab.id && (
                <m.span
                  layoutId="timelineFilterPill"
                  transition={spatial.default}
                  className="absolute inset-0 rounded-full bg-[var(--surface-pill)] -z-10"
                />
              )}
              <span className="relative">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="relative grid grid-cols-1 sm:grid-cols-2 gap-2 flex-1 overflow-hidden content-start">
        {/* Entries that stay slide to their new cells; the others fade through */}
        <AnimatePresence mode="popLayout" initial={false}>
          {filteredExperiences.map((exp) => (
            <m.div
              key={`${exp.role}-${exp.period}`}
              layout="position"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1, transition: { ...effect.default, delay: 0.08 } }}
              exit={{ opacity: 0, scale: 0.96, transition: effect.fast }}
              transition={spatial.default}
              className="p-2.5 rounded-[12px] bg-[var(--surface-1)] flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-[11px] text-[var(--text-muted)] mb-1 tabular-nums">
                  <span>{exp.period}</span>
                  <span className="inline-flex items-center gap-1 text-[var(--accent-pixel)]">
                    {exp.type === 'work' ? <Briefcase size={11} /> : <GraduationCap size={11} />}
                    <span>{exp.type === 'work' ? 'Work' : 'Academic'}</span>
                  </span>
                </div>
                <h4 className="text-xs sm:text-sm font-bold text-[#F1F5F9] leading-tight truncate">
                  {exp.role}
                </h4>
                <p className="text-[11px] text-[var(--text-secondary)] truncate mt-0.5">{exp.company}</p>
              </div>
              <div className="flex flex-wrap gap-1 mt-1.5">
                {exp.tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-medium text-[var(--text-secondary)] bg-[var(--surface-2)] px-2 py-0.5 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </m.div>
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
      <div className="bento-outer h-[420px]">{content}</div>
    </section>
  );
}
