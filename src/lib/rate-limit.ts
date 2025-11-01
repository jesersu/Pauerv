/**
 * Simple in-memory rate limiting utility
 *
 * NOTE: This is a basic implementation suitable for single-server deployments.
 * For production with multiple servers, consider using Upstash Redis:
 *
 * 1. Create account at https://upstash.com
 * 2. Create Redis database
 * 3. Add to .env.local:
 *    UPSTASH_REDIS_REST_URL=your_url
 *    UPSTASH_REDIS_REST_TOKEN=your_token
 * 4. Uncomment the Upstash implementation below
 */

// Simple in-memory store for rate limiting
const requests = new Map<string, number[]>()

interface RateLimitResult {
  success: boolean
  limit: number
  remaining: number
  reset: number
}

/**
 * Checks if a request should be rate limited
 *
 * @param identifier - Unique identifier (usually IP address)
 * @param limit - Maximum number of requests allowed
 * @param windowMs - Time window in milliseconds
 * @returns Rate limit result with success status
 */
export function checkRateLimit(
  identifier: string,
  limit: number = 5,
  windowMs: number = 60 * 60 * 1000 // 1 hour default
): RateLimitResult {
  const now = Date.now()
  const userRequests = requests.get(identifier) || []

  // Filter out old requests outside the time window
  const recentRequests = userRequests.filter(time => now - time < windowMs)

  // Calculate remaining requests and reset time
  const remaining = Math.max(0, limit - recentRequests.length)
  const oldestRequest = recentRequests[0] || now
  const reset = oldestRequest + windowMs

  if (recentRequests.length >= limit) {
    // Store back the recent requests (cleanup)
    requests.set(identifier, recentRequests)

    return {
      success: false,
      limit,
      remaining: 0,
      reset,
    }
  }

  // Add current request timestamp
  recentRequests.push(now)
  requests.set(identifier, recentRequests)

  // Cleanup old entries periodically (every 1000 requests)
  if (requests.size > 1000) {
    cleanupOldEntries(windowMs)
  }

  return {
    success: true,
    limit,
    remaining: remaining - 1,
    reset,
  }
}

/**
 * Cleans up old entries from the rate limit store
 * @param windowMs - Time window to keep
 */
function cleanupOldEntries(windowMs: number): void {
  const now = Date.now()

  for (const [identifier, timestamps] of requests.entries()) {
    const recentRequests = timestamps.filter(time => now - time < windowMs)

    if (recentRequests.length === 0) {
      requests.delete(identifier)
    } else {
      requests.set(identifier, recentRequests)
    }
  }
}

/*
 * UPSTASH REDIS IMPLEMENTATION (Production-ready)
 *
 * Uncomment this section after setting up Upstash:
 *
 * import { Ratelimit } from '@upstash/ratelimit'
 * import { Redis } from '@upstash/redis'
 *
 * // Create a new ratelimiter that allows 5 requests per hour
 * export const ratelimit = new Ratelimit({
 *   redis: Redis.fromEnv(),
 *   limiter: Ratelimit.slidingWindow(5, '1 h'),
 *   analytics: true,
 *   prefix: 'pauerv:ratelimit',
 * })
 *
 * // Usage in API route:
 * const { success, limit, remaining, reset } = await ratelimit.limit(identifier)
 */
