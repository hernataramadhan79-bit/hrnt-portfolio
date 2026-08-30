// Client-Side Shared Cache & In-Flight Request Deduplication
// Persistent LocalStorage SWR Strategy untuk Mengeliminasi Loading Delay (0ms Instant Hydration)

interface CacheEntry<T> {
  data: T;
  timestamp: number;
}

const CACHE_TTL_MS = 10 * 60 * 1000; // 10 menit client-side freshness TTL
const STORAGE_KEY_GH = 'hrnt_gh_telemetry_cache_v1';
const STORAGE_KEY_WT = 'hrnt_wt_telemetry_cache_v2';

let githubCache: CacheEntry<any> | null = null;
let githubInFlightPromise: Promise<any> | null = null;

let wakatimeCache: CacheEntry<any> | null = null;
let wakatimeInFlightPromise: Promise<any> | null = null;

/**
 * Mengambil data GitHub yang tersimpan secara sinkron dari memory atau localStorage.
 * Menjamin render pertama instan (0.00ms) tanpa menunggu network request.
 */
export function getStoredGithubData(): any | null {
  if (githubCache) return githubCache.data;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_GH);
      if (raw) {
        const parsed: CacheEntry<any> = JSON.parse(raw);
        githubCache = parsed;
        return parsed.data;
      }
    } catch {}
  }
  return null;
}

/**
 * Mengambil data WakaTime yang tersimpan secara sinkron dari memory atau localStorage.
 * Menjamin render pertama instan (0.00ms) tanpa menunggu network request.
 */
export function getStoredWakaTimeData(): any | null {
  if (wakatimeCache) return wakatimeCache.data;
  if (typeof window !== 'undefined') {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_WT);
      if (raw) {
        const parsed: CacheEntry<any> = JSON.parse(raw);
        wakatimeCache = parsed;
        return parsed.data;
      }
    } catch {}
  }
  return null;
}

/**
 * Mengambil data GitHub dengan strategi Stale-While-Revalidate (SWR).
 * Jika ada data di cache (memory / localStorage), data instan langsung dikembalikan,
 * sementara request latar belakang berjalan diam-diam tanpa memicu loading spinner.
 */
export async function fetchGithubData(): Promise<any> {
  const cached = getStoredGithubData();
  const now = Date.now();

  // Jika cache masih segar (< 10 menit), kembalikan langsung (0ms)
  if (githubCache && now - githubCache.timestamp < CACHE_TTL_MS) {
    return githubCache.data;
  }

  // Jika sudah ada request yang sedang berjalan, gabungkan ke promise yang sama
  if (githubInFlightPromise) {
    return githubInFlightPromise;
  }

  // Buat request latar belakang baru
  githubInFlightPromise = (async () => {
    try {
      const res = await fetch('/api/github');
      if (!res.ok) throw new Error(`GitHub API returned status ${res.status}`);
      const data = await res.json();

      const entry: CacheEntry<any> = {
        data,
        timestamp: Date.now(),
      };
      githubCache = entry;

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY_GH, JSON.stringify(entry));
        } catch {}
      }

      return data;
    } catch (err) {
      console.warn('fetchGithubData failed, returning cached fallback data:', err);
      if (cached) return cached;
      throw err;
    } finally {
      githubInFlightPromise = null;
    }
  })();

  // Jika ada cached data sebelumnya, kembalikan instan (Stale-While-Revalidate)
  return cached || githubInFlightPromise;
}

/**
 * Mengambil data WakaTime dengan strategi Stale-While-Revalidate (SWR).
 * Jika ada data di cache (memory / localStorage), data instan langsung dikembalikan,
 * sementara request latar belakang berjalan diam-diam tanpa memicu loading spinner.
 */
export async function fetchWakaTimeData(): Promise<any> {
  const cached = getStoredWakaTimeData();
  const now = Date.now();

  // Jika cache masih segar (< 10 menit), kembalikan langsung (0ms)
  if (wakatimeCache && now - wakatimeCache.timestamp < CACHE_TTL_MS) {
    return wakatimeCache.data;
  }

  // Jika sudah ada request yang sedang berjalan, gabungkan ke promise yang sama
  if (wakatimeInFlightPromise) {
    return wakatimeInFlightPromise;
  }

  // Buat request latar belakang baru
  wakatimeInFlightPromise = (async () => {
    try {
      const res = await fetch('/api/wakatime');
      if (!res.ok) throw new Error(`WakaTime API returned status ${res.status}`);
      const data = await res.json();

      const entry: CacheEntry<any> = {
        data,
        timestamp: Date.now(),
      };
      wakatimeCache = entry;

      if (typeof window !== 'undefined') {
        try {
          localStorage.setItem(STORAGE_KEY_WT, JSON.stringify(entry));
        } catch {}
      }

      return data;
    } catch (err) {
      console.warn('fetchWakaTimeData failed, returning cached fallback data:', err);
      if (cached) return cached;
      throw err;
    } finally {
      wakatimeInFlightPromise = null;
    }
  })();

  // Jika ada cached data sebelumnya, kembalikan instan (Stale-While-Revalidate)
  return cached || wakatimeInFlightPromise;
}
