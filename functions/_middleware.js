/**
 * Site-wide password gate + waitlist (Cloudflare Pages middleware).
 *
 * Runs at the edge on EVERY request, before any file is served. Without a
 * valid gate cookie the visitor gets a "coming soon" page — the real pages,
 * CSS and JS are never sent, so the site can't be read by typing a URL
 * directly or by viewing source.
 *
 * The coming-soon page also captures waitlist emails into the same Mailchimp
 * audience the newsletter worker uses. Signup is handled server-side here, so
 * there's no CORS hop and no client-side JS.
 *
 * Environment variables (Cloudflare Pages -> Settings -> Environment variables):
 *   SITE_PASSWORD          required — the password that unlocks the site
 *   MAILCHIMP_API_KEY      optional — enables the waitlist (same key the worker uses)
 *   MAILCHIMP_AUDIENCE_ID  optional — defaults to the existing audience
 *
 * To take the gate down at launch: delete this file and push. Nothing else
 * references it.
 */

const COOKIE = 'tnc_gate';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days
const DEFAULT_AUDIENCE = '32d9dab1cd';

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

/** Subscribe to the same Mailchimp audience the newsletter worker uses. */
async function joinWaitlist(email, env) {
    const key = env.MAILCHIMP_API_KEY;
    if (!key) return { ok: false, message: "The waitlist isn't set up yet. Try again soon." };

    const dc = key.split('-')[1];
    if (!dc) return { ok: false, message: "The waitlist isn't set up correctly. Try again soon." };

    const audience = env.MAILCHIMP_AUDIENCE_ID || DEFAULT_AUDIENCE;

    let res;
    try {
        res = await fetch(`https://${dc}.api.mailchimp.com/3.0/lists/${audience}/members`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Basic ${btoa(`anystring:${key}`)}`,
            },
            body: JSON.stringify({ email_address: email, status: 'subscribed' }),
        });
    } catch {
        return { ok: false, message: "Couldn't reach the waitlist just now. Try again in a moment." };
    }

    if (res.ok) return { ok: true, message: "You're on the list. We'll email you when we open up." };

    let detail = {};
    try { detail = await res.json(); } catch { /* non-JSON error body */ }

    // Already subscribed is a success from the visitor's point of view.
    if (detail.title === 'Member Exists') {
        return { ok: true, message: "You're already on the list. We'll be in touch." };
    }
    if (detail.title === 'Invalid Resource') {
        return { ok: false, message: 'That email address was rejected. Try another one.' };
    }
    return { ok: false, message: "Couldn't add you just now. Try again in a moment." };
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
        return gatePage(503, {
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
            return gatePage(result.ok ? 200 : 502, result.ok
                ? { success: result.message }
                : { error: result.message, email });
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

    return gatePage(401);
}
