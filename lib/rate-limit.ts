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
    // 1. Cloudflare edge IP (tamper-proof behind Cloudflare reverse proxy)
    const cfIp = request.headers.get('cf-connecting-ip');
    if (cfIp && isValidIp(cfIp.trim())) {
        return cfIp.trim();
    }

    // 2. Vercel edge IP
    const vercelIp = request.headers.get('x-vercel-ip');
    if (vercelIp && isValidIp(vercelIp.trim())) {
        return vercelIp.trim();
    }

    // 3. X-Real-IP
    const realIp = request.headers.get('x-real-ip');
    if (realIp && isValidIp(realIp.trim())) {
        return realIp.trim();
    }

    // 4. X-Forwarded-For fallback (take rightmost untampered hop or first valid)
    const forwarded = request.headers.get('x-forwarded-for');
    if (forwarded) {
        const ips = forwarded.split(',').map((p) => p.trim());
        const validIp = ips.find(isValidIp);
        if (validIp) return validIp;
    }

    return '127.0.0.1';
}

function isValidIp(ip: string): boolean {
    // IPv4 pattern
    const ipv4 = /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
    // IPv6 pattern
    const ipv6 = /^[0-9a-fA-F:]+$/;
    return (ipv4.test(ip) || ipv6.test(ip)) && ip.length <= 45;
}