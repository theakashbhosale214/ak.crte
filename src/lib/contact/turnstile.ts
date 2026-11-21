import "server-only";

/**
 * Optional Cloudflare Turnstile check. Active only when TURNSTILE_SECRET_KEY
 * (server) and NEXT_PUBLIC_TURNSTILE_SITE_KEY (widget) are both set.
 */
export async function verifyTurnstile(token: string | null, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY?.trim();
  if (!secret) return { ok: true, skipped: true } as const;
  if (!token) return { ok: false } as const;

  try {
    const body = new URLSearchParams({ secret, response: token });
    if (ip !== "unknown") body.set("remoteip", ip);
    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body,
      signal: AbortSignal.timeout(8000),
      cache: "no-store",
    });
    const data = (await response.json()) as { success?: boolean };
    return { ok: data.success === true } as const;
  } catch (error) {
    console.error("[contact] Turnstile verification failed:", error);
    return { ok: false } as const;
  }
}
