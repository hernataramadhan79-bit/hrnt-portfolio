'use client';

import { useEffect, useState } from 'react';

/**
 * Tracks a CSS media query. The first value is read straight from the window,
 * so only use it in components that mount after hydration (dialogs, sheets)
 * or where a server/client difference is harmless.
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(
    () => typeof window !== 'undefined' && window.matchMedia(query).matches
  );

  useEffect(() => {
    const list = window.matchMedia(query);
    const update = () => setMatches(list.matches);
    update();
    list.addEventListener('change', update);
    return () => list.removeEventListener('change', update);
  }, [query]);

  return matches;
}
