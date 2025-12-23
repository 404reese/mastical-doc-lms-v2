import { NextResponse } from 'next/server';

// INR countries
const INR_COUNTRIES = ['IN', 'LK', 'NP'];

// dev override - returns 'IN' in development, null in production
const getDevOverride = () => process.env.NODE_ENV === 'development' ? 'IN' : null;

// rate limit
const GLOBAL_RATE_LIMIT = 40;
const RATE_WINDOW = 60 * 1000; // 1 minute in milliseconds
const CACHE_DURATION = 24 * 60 * 60; // 24 hours in seconds

// Global rate limit state (shared across all requests)
let globalRateLimit = {
    count: 0,
    resetTime: Date.now() + RATE_WINDOW,
};

function checkGlobalRateLimit(): { allowed: boolean; resetIn: number } {
    const now = Date.now();

    // window reset ->>>
    if (now > globalRateLimit.resetTime) {
        globalRateLimit = {
            count: 1,
            resetTime: now + RATE_WINDOW,
        };
        return { allowed: true, resetIn: RATE_WINDOW };
    }

    // exceed check <<<-
    if (globalRateLimit.count >= GLOBAL_RATE_LIMIT) {
        return { allowed: false, resetIn: globalRateLimit.resetTime - now };
    }

    globalRateLimit.count++;
    return { allowed: true, resetIn: globalRateLimit.resetTime - now };
}

export async function GET(request: Request) {
    // dev override - skip API call in development
    const devOverride = getDevOverride();
    if (devOverride) {
        const currency = INR_COUNTRIES.includes(devOverride) ? 'INR' : 'USD';
        return NextResponse.json({
            countryCode: devOverride,
            country: 'India',
            city: 'Development',
            currency,
            isDefault: false,
            isDev: true,
        });
    }

    try {
        // Get IP from headers (works behind proxies/load balancers)
        const forwardedFor = request.headers.get('x-forwarded-for');
        const realIp = request.headers.get('x-real-ip');
        let ip = forwardedFor?.split(',')[0]?.trim() || realIp || '';

        // Check if IP is localhost/private - if so, let ip-api auto-detect
        const isLocalIp = !ip ||
            ip === '127.0.0.1' ||
            ip === '::1' ||
            ip.startsWith('192.168.') ||
            ip.startsWith('10.') ||
            ip.startsWith('172.16.') ||
            ip === 'localhost';

        // Check global rate limit before calling ip-api
        const rateCheck = checkGlobalRateLimit();
        if (!rateCheck.allowed) {
            // USD fallback
            return NextResponse.json(
                {
                    countryCode: '',
                    country: '',
                    city: '',
                    currency: 'USD',
                    isDefault: true,
                    rateLimited: true,
                },
                {
                    headers: {
                        'Cache-Control': `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION}`,
                        'Retry-After': Math.ceil(rateCheck.resetIn / 1000).toString(),
                    },
                }
            );
        }

        const apiUrl = isLocalIp
            ? 'http://ip-api.com/json/?fields=status,city,country,countryCode'
            : `http://ip-api.com/json/${ip}?fields=status,city,country,countryCode`;

        const geoResponse = await fetch(apiUrl);

        if (!geoResponse.ok) {
            throw new Error('Geolocation service failed');
        }

        const geoData = await geoResponse.json();
        const countryCode = geoData.countryCode || '';
        const country = geoData.country || '';
        const city = geoData.city || '';

        const currency = INR_COUNTRIES.includes(countryCode) ? 'INR' : 'USD';

        // 24-hour cache
        return NextResponse.json(
            {
                countryCode,
                country,
                city,
                currency,
                isDefault: false,
            },
            {
                headers: {
                    // Cache for 24 hours on client and CDN
                    'Cache-Control': `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION}`,
                },
            }
        );
    } catch (error) {
        console.error('Geo detection error:', error);
        // Default to USD on error, still cache to prevent repeated failed requests
        return NextResponse.json(
            {
                countryCode: '',
                country: '',
                city: '',
                currency: 'USD',
                isDefault: true,
            },
            {
                headers: {
                    'Cache-Control': `public, max-age=${CACHE_DURATION}, s-maxage=${CACHE_DURATION}, stale-while-revalidate=${CACHE_DURATION}`,
                },
            }
        );
    }
}
