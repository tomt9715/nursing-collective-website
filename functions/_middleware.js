/**
 * Site-wide password gate (Cloudflare Pages middleware).
 *
 * Runs at the edge on EVERY request, before any file is served. Without a
 * valid gate cookie the visitor gets a "coming soon" page — the real pages,
 * CSS and JS are never sent, so the site can't be read by typing a URL
 * directly or by viewing source.
 *
 * Setup: set SITE_PASSWORD in the Cloudflare Pages environment variables
 * (Settings -> Environment variables, for BOTH Production and Preview).
 *
 * To take the gate down at launch: delete this file (and the functions/
 * directory if it's empty) and push. Nothing else references it.
 */

const COOKIE = 'tnc_gate';
const MAX_AGE = 60 * 60 * 24 * 30; // 30 days

/** Compare without leaking length/content via early exit. */
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

function gateResponse(status, { error = '', notice = '' } = {}) {
    const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>The Nursing Collective</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=DM+Serif+Display&family=Outfit:wght@400;500&display=swap" rel="stylesheet">
<style>
  *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
  body{min-height:100vh;display:flex;align-items:center;justify-content:center;
       padding:24px;background:#faf7f2;color:#2b2621;
       font-family:'Outfit',system-ui,sans-serif;line-height:1.6;
       -webkit-font-smoothing:antialiased}
  .card{width:100%;max-width:420px;background:#fff;border:0.5px solid rgba(58,44,26,0.11);
        border-radius:16px;padding:40px 32px;text-align:center;
        box-shadow:0 6px 20px rgba(58,44,26,0.11)}
  .brand{font-family:'DM Serif Display',serif;font-size:26px;line-height:1.2;margin-bottom:20px}
  .brand span{color:#0e9a8f}
  h1{font-family:'DM Serif Display',serif;font-size:24px;font-weight:400;margin-bottom:10px}
  p{font-size:15px;color:#6a6157;margin-bottom:24px}
  form{display:flex;flex-direction:column;gap:10px}
  input{width:100%;height:44px;padding:0 14px;font:inherit;font-size:15px;color:#2b2621;
        background:#faf7f2;border:0.5px solid rgba(58,44,26,0.17);border-radius:9px;outline:none}
  input:focus{border-color:#0e9a8f;box-shadow:0 0 0 3px rgba(14,154,143,0.12)}
  button{height:44px;font:inherit;font-size:15px;font-weight:500;color:#fff;background:#0e9a8f;
         border:none;border-radius:9px;cursor:pointer}
  button:hover{background:#0b7d74}
  .msg{font-size:14px;border-radius:9px;padding:10px 12px;margin-bottom:18px}
  .err{color:#d64545;background:rgba(214,69,69,0.07);border:0.5px solid rgba(214,69,69,0.35)}
  .note{color:#c9791a;background:rgba(201,121,26,0.07);border:0.5px solid rgba(201,121,26,0.35)}
</style>
</head>
<body>
  <main class="card">
    <div class="brand">THE NURSING<br><span>COLLECTIVE</span></div>
    <h1>Coming soon</h1>
    <p>We're putting the finishing touches on things. Check back shortly.</p>
    ${notice ? `<div class="msg note">${escapeHtml(notice)}</div>` : ''}
    ${error ? `<div class="msg err">${escapeHtml(error)}</div>` : ''}
    <form method="POST" autocomplete="off">
      <input type="password" name="password" placeholder="Password" aria-label="Password" autofocus required>
      <button type="submit">Enter</button>
    </form>
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
        return gateResponse(503, {
            notice: 'Gate is not configured yet — set SITE_PASSWORD in the Cloudflare Pages environment variables.',
        });
    }

    const expected = await tokenFor(password);

    // Already unlocked.
    if (safeEqual(readCookie(request, COOKIE) || '', expected)) {
        return next();
    }

    // Password submitted.
    if (request.method === 'POST') {
        let submitted = '';
        try {
            const form = await request.formData();
            submitted = String(form.get('password') || '');
        } catch {
            // Fall through to the error page below.
        }

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

        return gateResponse(401, { error: 'Incorrect password. Try again.' });
    }

    return gateResponse(401);
}
