'use client';

import React from 'react';

/**
 * Zen Dark Skeleton loaders
 * Designed with subtle carbon and cyan sheen gradients to match the Zen Dark aesthetic.
 */

export function ForumSkeleton() {
  return (
    <section className="w-full max-w-[1400px] mx-auto pt-24 pb-20 px-4 sm:px-6 lg:px-8 animate-in fade-in duration-200">
      {/* Header Skeleton */}
      <div className="mb-10 space-y-3">
        <div className="skeleton-box h-4 w-36 rounded-md" />
        <div className="skeleton-box h-10 w-72 sm:w-96 rounded-xl" />
        <div className="skeleton-box h-4 w-full max-w-lg rounded-md" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column Skeleton (Span 5) */}
        <div className="lg:col-span-5">
          <div className="glass-card p-6 sm:p-8 space-y-6 border-neutral-800/80">
            <div className="flex items-center gap-4">
              <div className="skeleton-box w-14 h-14 rounded-full shrink-0" />
              <div className="space-y-2 flex-1">
                <div className="skeleton-box h-5 w-32 rounded-md" />
                <div className="skeleton-box h-3 w-48 rounded-md" />
              </div>
            </div>

            <div className="space-y-3 pt-2">
              <div className="skeleton-box h-11 w-full rounded-xl" />
              <div className="skeleton-box h-11 w-full rounded-xl" />
            </div>

            <div className="pt-4 border-t border-neutral-800/80 flex items-center justify-between">
              <div className="skeleton-box h-3 w-28 rounded-md" />
              <div className="skeleton-box h-3 w-24 rounded-md" />
            </div>
          </div>
        </div>

        {/* Right Column Skeleton (Span 7) */}
        <div className="lg:col-span-7">
          <div className="glass-card p-6 sm:p-8 space-y-4 border-neutral-800/80">
            <div className="flex items-center justify-between border-b border-neutral-800 pb-4">
              <div className="skeleton-box h-5 w-40 rounded-md" />
              <div className="skeleton-box h-4 w-20 rounded-md" />
            </div>

            <CommentListSkeleton count={3} />
          </div>
        </div>
      </div>
    </section>
  );
}

export function CommentListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3.5">
      {Array.from({ length: count }).map((_, idx) => (
        <div
          key={idx}
          className="p-4 rounded-2xl bg-neutral-900/40 border border-neutral-800/60 space-y-3"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="skeleton-box w-8 h-8 rounded-full shrink-0" />
              <div className="space-y-1.5">
                <div className="skeleton-box h-3.5 w-28 rounded-md" />
                <div className="skeleton-box h-2.5 w-16 rounded-md" />
              </div>
            </div>
            <div className="skeleton-box h-3 w-14 rounded-md" />
          </div>

          <div className="space-y-1.5 pl-11">
            <div className="skeleton-box h-3 w-full rounded-md" />
            <div className="skeleton-box h-3 w-4/5 rounded-md" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* 4 KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="glass-card p-5 space-y-3 border-neutral-800/80">
            <div className="flex items-center justify-between">
              <div className="skeleton-box h-3 w-20 rounded-md" />
              <div className="skeleton-box w-5 h-5 rounded-md" />
            </div>
            <div className="skeleton-box h-8 w-24 rounded-lg" />
            <div className="skeleton-box h-2.5 w-32 rounded-md" />
          </div>
        ))}
      </div>

      {/* Contribution Calendar Card Skeleton */}
      <div className="glass-card p-6 space-y-4 border-neutral-800/80">
        <div className="flex items-center justify-between">
          <div className="skeleton-box h-5 w-48 rounded-md" />
          <div className="skeleton-box h-4 w-28 rounded-md" />
        </div>
        <div className="skeleton-box h-36 w-full rounded-2xl" />
      </div>
    </div>
  );
}

