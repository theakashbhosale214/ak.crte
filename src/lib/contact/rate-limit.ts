import "server-only";

/**
 * Best-effort sliding-window rate limiter, kept in memory per server
 * instance. It stops casual abuse; on multi-instance or serverless hosting,
 * back it with a shared store (e.g. Redis / Vercel KV) for a hard limit.
 */
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, number[]>();

export function isRateLimited(key: string, now = Date.now()) {
  const recent = (hits.get(key) ?? []).filter((time) => now - time < WINDOW_MS);
  if (recent.length >= MAX_REQUESTS) {
    hits.set(key, recent);
    return true;
  }
  recent.push(now);
  hits.set(key, recent);

  // Keep memory bounded.
  if (hits.size > 5000) {
    for (const [entry, times] of hits) {
      if (times.every((time) => now - time >= WINDOW_MS)) hits.delete(entry);
    }
  }
  return false;
}
