import '@testing-library/jest-dom';

// Mock IntersectionObserver for jsdom environment
global.IntersectionObserver = class IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin: string = '';
  readonly thresholds: ReadonlyArray<number> = [];

  constructor(
    private callback: IntersectionObserverCallback,
    private options?: IntersectionObserverInit
  ) {}

  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
  takeRecords = (): IntersectionObserverEntry[] => [];
};

// Mock ResizeObserver for jsdom environment (Pressable measures its height)
global.ResizeObserver = class ResizeObserver {
  constructor(private callback: ResizeObserverCallback) {}
  observe = () => {};
  unobserve = () => {};
  disconnect = () => {};
};

// Mock window.scrollTo
window.scrollTo = () => {};