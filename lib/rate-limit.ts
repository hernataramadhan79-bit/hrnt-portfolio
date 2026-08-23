const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const WINDOW_MS = 60 * 1000;
const DEFAULT_MAX_REQUESTS = 100;
const MAX_MAP_SIZE = 1000; // Prevent infinite growth

function cleanupMap() {
    if (rateLimitMap.size > MAX_MAP_SIZE) {
        const now = Date.now();
        for (const [key, record] of rateLimitMap.entries()) {
            if (now > record.resetTime) {
                rateLimitMap.delete(key);
            }
        }
    }
}

export interface RateLimitResult {
    allowed: boolean;
    remaining: number;
    resetTime: number;
    retryAfter?: number;
}

export function checkRateLimit(
    ip: string,
    maxRequests: number = DEFAULT_MAX_REQUESTS,
    windowMs: number = WINDOW_MS
): RateLimitResult {
    const now = Date.now();
    cleanupMap();

    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        const resetTime = now + windowMs;
        rateLimitMap.set(ip, { count: 1, resetTime });
        return { allowed: true, remaining: maxRequests - 1, resetTime };
    }

    if (record.count >= maxRequests) {
        const retryAfter = Math.max(1, Math.ceil((record.resetTime - now) / 1000));
        return { allowed: false, remaining: 0, resetTime: record.resetTime, retryAfter };
    }

    record.count++;
    return {
        allowed: true,
        remaining: Math.max(0, maxRequests - record.count),
        resetTime: record.resetTime,
    };
}

export function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    const realIp = request.headers.get('x-real-ip');
    if (realIp) {
        return realIp.trim();
    }
    return '127.0.0.1';
}