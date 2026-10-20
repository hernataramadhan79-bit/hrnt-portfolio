'use client';

import React from 'react';

/**
 * Concentric Tonal Skeleton Loaders (CLS = 0)
 * Matches the rounded-[28px] Bento outer cards, rounded-[16px] inner containers,
 * and rounded-full Pixel pills.
 */

export function ForumSkeleton() {
  return (
    <div className="bento-outer h-full flex flex-col justify-between space-y-3 min-h-[540px]">
      <div className="bento-inner p-4 sm:p-5 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="skeleton-box w-9 h-9 rounded-full shrink-0" />
          <div className="space-y-1.5">
            <div className="skeleton-box h-4 w-48 rounded-full" />
            <div className="skeleton-box h-3 w-64 rounded-full" />
          </div>
        </div>
        <div className="skeleton-box h-6 w-28 rounded-full hidden sm:block" />
      </div>

      <div className="bento-inner p-4 sm:p-5 flex-1">
        <CommentListSkeleton count={3} />
      </div>

      <div className="bento-inner p-3 sm:p-4">
        <div className="skeleton-box h-16 w-full rounded-[16px]" />
      </div>
    </div>
  );
}

export function CommentListSkeleton({ count = 3 }: { count?: number }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className="flex items-end gap-2.5">
          <div className="skeleton-box w-8 h-8 rounded-full shrink-0" />
          <div className="flex-1 p-4 rounded-[22px] rounded-bl-[6px] bg-[var(--surface-1)] space-y-2">
            <div className="flex items-center justify-between">
              <div className="skeleton-box h-3.5 w-28 rounded-full" />
              <div className="skeleton-box h-3 w-16 rounded-full" />
            </div>
            <div className="skeleton-box h-3 w-full rounded-full" />
            <div className="skeleton-box h-3 w-3/4 rounded-full" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function StatsSkeleton() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="bento-inner p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="skeleton-box h-3 w-20 rounded-full" />
              <div className="skeleton-box w-4 h-4 rounded-full" />
            </div>
            <div className="skeleton-box h-8 w-24 rounded-[12px]" />
            <div className="skeleton-box h-2.5 w-28 rounded-full" />
          </div>
        ))}
      </div>

      <div className="bento-inner p-5 space-y-4">
        <div className="flex items-center justify-between">
          <div className="skeleton-box h-5 w-48 rounded-full" />
          <div className="skeleton-box h-6 w-28 rounded-full" />
        </div>
        <div className="skeleton-box h-32 w-full rounded-[16px]" />
      </div>
    </div>
  );
}
