/**
 * Site-wide password gate + waitlist (Cloudflare Pages middleware).
 *
 * Runs at the edge on EVERY request, before any file is served. Without a
 * valid gate cookie the visitor gets a "coming soon" page — the real pages,
 * CSS and JS are never sent, so the site can't be read by typing a URL
 * directly or by viewing source.
 *
 * The coming-soon page also captures waitlist emails into a Resend audience —
 * the same Resend account that already sends the app's transactional mail, so
 * the launch broadcast goes out from a domain that's already verified. Signup
 * is handled server-side here, so there's no CORS hop and no client-side JS.
 *
 * Environment variables (Cloudflare Pages -> Settings -> Environment variables):
 *   SITE_PASSWORD       required — the password that unlocks the site
 *   RESEND_API_KEY      optional — enables the waitlist (same key the backend uses)
 *   RESEND_AUDIENCE_ID  optional — ONLY for older Resend accounts that scope
 *                       contacts to a named audience. Newer accounts have a
 *                       single default audience and don't need this.
 *
 * To take the gate down at launch: delete this file and push. Nothing else
 * references it.
 */

const COOKIE = 'tnc_gate';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** Compare without leaking content via early exit. */
function safeEqual(a, b) {
    if (typeof a !== 'string' || typeof b !== 'string' || a.length !== b.length) return false;
    let diff = 0;
    for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
    return diff === 0;
}

/** The cookie stores a hash, never the password itself. */
async function tokenFor(password) {
    const bytes = new TextEncoder().encode(`tnc-gate:v1:${password}`);
    const digest = await crypto.subtle.digest('SHA-256', bytes);
    return Array.from(new Uint8Array(digest), b => b.toString(16).padStart(2, '0')).join('');
}

function readCookie(request, name) {
    const header = request.headers.get('Cookie') || '';
    for (const part of header.split(';')) {
        const eq = part.indexOf('=');
        if (eq === -1) continue;
        if (part.slice(0, eq).trim() === name) return part.slice(eq + 1).trim();
    }
    return null;
}

function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, c => (
        { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]
    ));
}

function looksLikeEmail(email) {
    return typeof email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

/**
 * Confirm the signup right away. Without this, someone joins and then hears
 * nothing until launch — by which point the launch email reads as cold spam.
 * Sent from the same verified sender the backend already uses.
 */
async function sendConfirmation(email, env) {
    const key = env.RESEND_API_KEY;
    if (!key) return;

    const name = env.MAIL_FROM_NAME || 'The Nursing Collective';
    const address = env.MAIL_FROM_ADDRESS || 'support@thenursingcollective.pro';

    const text = [
        "You're on the list.",
        '',
        "Thanks for signing up for The Nursing Collective — a study partner built to get you",
        'through nursing school, not another NCLEX cram tool.',
        '',
        "We're still building. We'll email you once, when we open up. That's it — no drip",
        "campaign, no spam, nothing you didn't ask for.",
        '',
        '— Tom, founder (and nursing student)',
    ].join('\n');

    const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;
  font-size:16px;line-height:1.6;color:#2b2621;max-width:520px;margin:0 auto;padding:24px">
  <h1 style="font-size:22px;font-weight:600;margin:0 0 16px">You're on the list.</h1>
  <p style="margin:0 0 16px">Thanks for signing up for <strong>The Nursing Collective</strong> — a study
  partner built to get you <em>through</em> nursing school, not another NCLEX cram tool.</p>
  <p style="margin:0 0 16px">We're still building. We'll email you <strong>once</strong>, when we open up.
  That's it — no drip campaign, no spam, nothing you didn't ask for.</p>
  <p style="margin:0 0 4px">— Tom</p>
  <p style="margin:0;color:#6a6157;font-size:14px">Founder (and nursing student)</p>
  <hr style="border:none;border-top:1px solid #e8e2d8;margin:24px 0">
  <p style="margin:0;color:#8a8073;font-size:12px">You're getting this because you joined the waitlist at
  thenursingcollective.pro. Not you? Ignore this email and you'll hear nothing more.</p>
</div>`;

    await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${key}`,
        },
        body: JSON.stringify({
            from: `${name} <${address}>`,
            to: [email],
            subject: "You're on the list — The Nursing Collective",
            text,
            html,
        }),
    });
}

/**
 * Add the address as a Resend contact (same Resend account the backend uses).
 *
 * Newer Resend accounts have a single default audience and take contacts at
 * POST /contacts with no audience in the path. Older accounts scope contacts
 * to an audience. Set RESEND_AUDIENCE_ID only if you're on the older model.
 */
async function joinWaitlist(email, env) {
    const key = env.RESEND_API_KEY;
    if (!key) {
        return { ok: false, message: "The waitlist isn't set up yet. Try again soon." };
    }

    const audience = env.RESEND_AUDIENCE_ID;
    const endpoint = audience
        ? `https://api.resend.com/audiences/${audience}/contacts`
        : 'https://api.resend.com/contacts';

    let res;
    try {
        res = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${key}`,
            },
            body: JSON.stringify({ email, unsubscribed: false }),
        });
    } catch {
        return { ok: false, message: "Couldn't reach the waitlist just now. Try again in a moment." };
    }

    if (res.ok) {
        // Best-effort: a failed confirmation must not fail the signup — they're
        // already on the list, and telling them otherwise would be a lie.
        await sendConfirmation(email, env).catch(() => {});
        return { ok: true, duplicate: false };
    }

    let detail = {};
    try { detail = await res.json(); } catch { /* non-JSON error body */ }
    const reason = String(detail.message || detail.name || '');

    // Surfaces in Cloudflare's Function logs. No secrets, just the rejection.
    console.error(`Resend contact create failed: ${res.status} ${reason}`);

    // Signing up twice is a success from the visitor's point of view.
    if (/already exists|already registered/i.test(reason)) {
        return { ok: true, duplicate: true };
    }
    if (/invalid/i.test(reason)) {
        return { ok: false, message: 'That email address was rejected. Try another one.' };
    }
    if (res.status === 401 || res.status === 403) {
        return { ok: false, message: "The waitlist key was rejected. (Check RESEND_API_KEY.)" };
    }
    return { ok: false, message: `Couldn't add you just now (${res.status}). Try again in a moment.` };
}

function gatePage(status, { error = '', notice = '', success = '', email = '' } = {}) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>The Nursing Collective — Coming soon</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@400;500&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{min-height:100vh;display:flex;align-items:center;justify-content:center;
       padding:24px;background:#faf7f2;color:#2b2621;
       font-family:'Outfit',system-ui,sans-serif;line-height:1.6;
       -webkit-font-smoothing:antialiased}
  .card{width:100%;max-width:440px;background:#fff;border:0.5px solid rgba(58,44,26,0.11);
        border-radius:16px;padding:40px 34px;box-shadow:0 6px 20px rgba(58,44,26,0.11)}
  .brand{font-family:'DM Serif Display',serif;font-size:24px;line-height:1.15;
         letter-spacing:.01em;margin-bottom:22px;text-align:center}
  .brand span{color:#0e9a8f}
  h1{font-family:'DM Serif Display',serif;font-size:26px;font-weight:400;margin-bottom:8px}
  .lede{font-size:15px;color:#6a6157;margin-bottom:22px}
  form{display:flex;flex-direction:column;gap:10px}
  label{font-size:13px;font-weight:500;color:#2b2621}
  input{width:100%;height:44px;padding:0 14px;font:inherit;font-size:15px;color:#2b2621;
        background:#faf7f2;border:0.5px solid rgba(58,44,26,0.17);border-radius:9px;outline:none}
  input:focus{border-color:#0e9a8f;box-shadow:0 0 0 3px rgba(14,154,143,0.12)}
  button{height:44px;font:inherit;font-size:15px;font-weight:500;color:#fff;background:#0e9a8f;
         border:none;border-radius:9px;cursor:pointer}
  button:hover{background:#0b7d74}
  .fine{font-size:12.5px;color:#8a8073;margin-top:10px}
  .msg{font-size:14px;border-radius:9px;padding:11px 13px;margin-bottom:18px}
  .ok{color:#2fa866;background:rgba(47,168,102,0.07);border:0.5px solid rgba(47,168,102,0.35)}
  .err{color:#d64545;background:rgba(214,69,69,0.07);border:0.5px solid rgba(214,69,69,0.35)}
  .note{color:#c9791a;background:rgba(201,121,26,0.07);border:0.5px solid rgba(201,121,26,0.35)}
  details{margin-top:26px;padding-top:18px;border-top:0.5px solid rgba(58,44,26,0.11)}
  summary{font-size:13px;color:#8a8073;cursor:pointer;list-style:none}
  summary::-webkit-details-marker{display:none}
  summary:hover{color:#0e9a8f}
  details form{margin-top:12px}
</style>
</head>
<body>
  <main class="card">
    <div class="brand">THE NURSING<br><span>COLLECTIVE</span></div>

    ${notice ? `<div class="msg note">${escapeHtml(notice)}</div>` : ''}
    ${success ? `<div class="msg ok">${escapeHtml(success)}</div>` : ''}
    ${error ? `<div class="msg err">${escapeHtml(error)}</div>` : ''}

    <h1>Coming soon</h1>
    <p class="lede">A study partner built to get you <em>through</em> nursing school — not another NCLEX cram tool. We're putting the finishing touches on it.</p>

    <form method="POST" autocomplete="on">
      <label for="email">Get an email when we open up</label>
      <input id="email" type="email" name="email" placeholder="you@school.edu"
             value="${escapeHtml(email)}" autocomplete="email" required>
      <button type="submit">Join the waitlist</button>
    </form>
    <p class="fine">No spam. One email when we launch, then nothing you didn't ask for.</p>

    <details>
      <summary>Have a password?</summary>
      <form method="POST" autocomplete="off">
        <input type="password" name="password" placeholder="Password" aria-label="Password" required>
        <button type="submit">Enter site</button>
      </form>
    </details>
  </main>
</body>
</html>`;

    return new Response(html, {
        status,
        headers: {
            'Content-Type': 'text/html; charset=utf-8',
            'Cache-Control': 'no-store, must-revalidate',
            'X-Robots-Tag': 'noindex, nofollow',
            // Self-contained page: allow its inline <style> and the Google font.
            'Content-Security-Policy':
                "default-src 'none'; style-src 'unsafe-inline' https://fonts.googleapis.com; " +
                "font-src https://fonts.gstatic.com; form-action 'self'; base-uri 'none'",
        },
    });
}

export async function onRequest(context) {
    const { request, env, next } = context;
    const password = env.SITE_PASSWORD;

    // Fail CLOSED: if the password isn't configured, nobody gets in.
    // (Safer than accidentally leaving the whole site open.)
    if (!password) {
        // 200, not 5xx — Cloudflare would replace a 5xx with its own error page.
        return gatePage(200, {
            notice: 'Gate is not configured yet — set SITE_PASSWORD in the Cloudflare Pages environment variables.',
        });
    }

    const expected = await tokenFor(password);

    // Already unlocked — serve the real site.
    if (safeEqual(readCookie(request, COOKIE) || '', expected)) {
        return next();
    }

    if (request.method === 'POST') {
        let form;
        try {
            form = await request.formData();
        } catch {
            return gatePage(400, { error: 'Something went wrong. Try again.' });
        }

        // Waitlist signup.
        if (form.has('email')) {
            const email = String(form.get('email') || '').trim();
            if (!looksLikeEmail(email)) {
                return gatePage(400, { error: 'That doesn\'t look like a valid email address.', email });
            }

            const result = await joinWaitlist(email, env);

            // POST/redirect/GET on success, so refreshing the confirmation
            // reloads a clean page instead of re-submitting the form.
            if (result.ok) {
                const url = new URL(request.url);
                url.searchParams.set('joined', result.duplicate ? 'already' : '1');
                return new Response(null, {
                    status: 303,
                    headers: {
                        Location: url.pathname + url.search,
                        'Cache-Control': 'no-store',
                    },
                });
            }

            // Errors render in place so the typed address isn't lost. Always
            // 200: Cloudflare replaces a 5xx from a Function with its own
            // "Bad gateway" page, which would swallow the message below.
            return gatePage(200, { error: result.message, email });
        }

        // Password unlock.
        const submitted = String(form.get('password') || '');
        if (safeEqual(submitted, password)) {
            return new Response(null, {
                status: 303,
                headers: {
                    Location: new URL(request.url).pathname || '/',
                    'Set-Cookie': `${COOKIE}=${expected}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${MAX_AGE}`,
                    'Cache-Control': 'no-store',
                },
            });
        }
        return gatePage(401, { error: 'Incorrect password. Try again.' });
    }

    // Landing back here after a successful signup (see the 303 above).
    const joined = new URL(request.url).searchParams.get('joined');
    if (joined === '1') {
        return gatePage(200, {
            success: "You're on the list. Check your inbox — we just sent a confirmation.",
        });
    }
    if (joined === 'already') {
        return gatePage(200, { success: "You're already on the list. We'll be in touch." });
    }

    return gatePage(401);
}
