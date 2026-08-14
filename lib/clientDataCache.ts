// Client-Side Shared Cache & In-Flight Request Deduplication
// Mencegah request berulang saat pengguna berpindah-pindah tab

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL_MS = 5 * 60 * 1000; // 5 menit client-side TTL

let githubCache: CacheEntry<any> | null = null;
let githubInFlightPromise: Promise<any> | null = null;

let wakatimeCache: CacheEntry<any> | null = null;
let wakatimeInFlightPromise: Promise<any> | null = null;

/**
 * Mengambil data GitHub dengan in-memory cache dan in-flight deduplication.
 * Jika data sudah ada di cache dan belum expired (< 5 menit), langsung kembalikan data instan (0ms).
 */
export async function fetchGithubData(): Promise<any> {
  const now = Date.now();

  // 1. Cek in-memory cache
  if (githubCache && (now - githubCache.timestamp < CACHE_TTL_MS)) {
    return githubCache.data;
  }

  // 2. Cek in-flight request (jika ada request yang sedang berjalan, pakai promise yang sama)
  if (githubInFlightPromise) {
    return githubInFlightPromise;
  }

  // 3. Buat request baru
  githubInFlightPromise = (async () => {
    try {
      const res = await fetch('/api/github');
      if (!res.ok) throw new Error(`GitHub API returned status ${res.status}`);
      const data = await res.json();
      
      githubCache = {
        data,
        timestamp: Date.now(),
      };
      return data;
    } catch (err) {
      console.warn('fetchGithubData failed, returning fallback or cached data if available:', err);
      if (githubCache) return githubCache.data;
      throw err;
    } finally {
      githubInFlightPromise = null;
    }
  })();

  return githubInFlightPromise;
}

/**
 * Mengambil data WakaTime dengan in-memory cache dan in-flight deduplication.
 * Jika data sudah ada di cache dan belum expired (< 5 menit), langsung kembalikan data instan (0ms).
 */
export async function fetchWakaTimeData(): Promise<any> {
  const now = Date.now();

  // 1. Cek in-memory cache
  if (wakatimeCache && (now - wakatimeCache.timestamp < CACHE_TTL_MS)) {
    return wakatimeCache.data;
  }

  // 2. Cek in-flight request
  if (wakatimeInFlightPromise) {
    return wakatimeInFlightPromise;
  }

  // 3. Buat request baru
  wakatimeInFlightPromise = (async () => {
    try {
      const res = await fetch('/api/wakatime');
      if (!res.ok) throw new Error(`WakaTime API returned status ${res.status}`);
      const data = await res.json();
      
      wakatimeCache = {
        data,
        timestamp: Date.now(),
      };
      return data;
    } catch (err) {
      console.warn('fetchWakaTimeData failed, returning fallback or cached data if available:', err);
      if (wakatimeCache) return wakatimeCache.data;
      throw err;
    } finally {
      wakatimeInFlightPromise = null;
    }
  })();

  return wakatimeInFlightPromise;
}
