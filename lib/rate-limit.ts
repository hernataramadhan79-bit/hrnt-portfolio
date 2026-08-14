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

export function checkRateLimit(
    ip: string,
    maxRequests: number = DEFAULT_MAX_REQUESTS,
    windowMs: number = WINDOW_MS
): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    cleanupMap();

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + windowMs });
        return { allowed: true };
    }

    if (record.count >= maxRequests) {
        const retryAfter = Math.ceil((record.resetTime - now) / 1000);
        return { allowed: false, retryAfter };
    }

    record.count++;
    return { allowed: true };
}

export function getClientIp(request: Request): string {
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        return forwarded.split(',')[0].trim();
    }
    return '127.0.0.1';
}