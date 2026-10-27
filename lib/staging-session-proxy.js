// Preview-only first-party gateway. Never choose an upstream from user input.
const UPSTREAM = 'https://staging-backend-production-365a.up.railway.app';
const PREFIX = '/staging-api';
const SESSION = '__Secure-tnc_preview_refresh';
const VERIFIER = '__Secure-tnc_preview_oauth';
const cookieValue = (request, name) => (request.headers.get('Cookie') || '').split(';').map(v => v.trim()).find(v => v.startsWith(`${name}=`))?.slice(name.length + 1) || '';
const cookie = (name, value, age, path = `${PREFIX}/auth`) => `${name}=${value}; Path=${path}; HttpOnly; Secure; SameSite=Lax; Max-Age=${age}`;
const failure = (status, message) => Response.json({ error: message }, { status, headers: { 'Cache-Control': 'no-store' } });
const encode = bytes => btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');

function responseHeaders(upstream) {
    const headers = new Headers({ 'Cache-Control': 'no-store', 'Referrer-Policy': 'no-referrer', 'X-Content-Type-Options': 'nosniff' });
    headers.set('Content-Type', upstream.headers.get('Content-Type') || 'application/json');
    // Only the staging refresh cookie is allowed onto the preview host.
    const setCookie = upstream.headers.get('Set-Cookie');
    if (setCookie?.startsWith('tnc_staging_refresh=')) {
        const value = setCookie.split(';')[0].slice('tnc_staging_refresh='.length);
        const age = /(?:^|;)\s*Max-Age=(\d+)/i.exec(setCookie)?.[1];
        if (/^[A-Za-z0-9_.-]*$/.test(value) && age) headers.append('Set-Cookie', cookie(SESSION, value, age));
    }
    return headers;
}

export async function previewSessionProxy({ request, env = {} }, send = fetch) {
    const url = new URL(request.url);
    if (!url.hostname.endsWith('.florencebot-website.pages.dev') || env.CF_PAGES_BRANCH === 'main') return failure(404, 'Not found');
    const path = url.pathname.slice(PREFIX.length);
    if (!url.pathname.startsWith(`${PREFIX}/`) || path.includes('\\') || path.startsWith('//')) return failure(400, 'Invalid path');
    if (!['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'].includes(request.method)) return failure(405, 'Method not allowed');
    if (!['GET', 'HEAD'].includes(request.method) && request.headers.get('Origin') !== url.origin) return failure(403, 'Untrusted session origin');
    const upstreamURL = new URL(UPSTREAM);
    upstreamURL.pathname = path;
    upstreamURL.search = url.search;
    const headers = new Headers({ Origin: url.origin });
    for (const name of ['Content-Type', 'Authorization', 'Accept']) {
        if (request.headers.has(name)) headers.set(name, request.headers.get(name));
    }
    const session = cookieValue(request, SESSION);
    if (session && /^[A-Za-z0-9_.-]+$/.test(session)) headers.set('Cookie', `tnc_staging_refresh=${session}`);
    let verifier;
    const oauthStart = /^\/auth\/oauth\/(google|discord)$/.test(path) && request.method === 'GET';
    if (oauthStart) {
        if (request.headers.get('Sec-Fetch-Site') === 'cross-site') return failure(403, 'Untrusted sign-in origin');
        verifier = encode(crypto.getRandomValues(new Uint8Array(32)));
        const challenge = encode(new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(verifier))));
        upstreamURL.searchParams.set('return_url', url.origin);
        upstreamURL.searchParams.set('preview_challenge', challenge);
    }
    try {
        if (path === '/oauth/complete') {
            if (request.method !== 'GET') return failure(405, 'Method not allowed');
            const proof = cookieValue(request, VERIFIER);
            const code = url.searchParams.get('code');
            if (!/^[A-Za-z0-9_-]{43}$/.test(proof) || !code || code.length > 128) return failure(401, 'Sign-in expired. Please try again.');
            const exchange = await send(`${UPSTREAM}/auth/preview-exchange`, {
                method: 'POST', headers: { Origin: url.origin, 'Content-Type': 'application/json' },
                body: JSON.stringify({ code, verifier: proof }), redirect: 'manual'
            });
            if (!exchange.ok) return failure(exchange.status >= 500 ? 503 : 401, 'Sign-in could not be completed. Please try again.');
            const data = await exchange.json();
            const resultHeaders = responseHeaders(exchange);
            if (!data.access_token || !resultHeaders.has('Set-Cookie')) return failure(502, 'Sign-in could not be completed.');
            resultHeaders.set('Location', `${url.origin}/auth-callback?${new URLSearchParams({ access_token: data.access_token })}`);
            resultHeaders.append('Set-Cookie', cookie(VERIFIER, '', 0, PREFIX));
            return new Response(null, { status: 303, headers: resultHeaders });
        }
        const upstream = await send(upstreamURL, {
            method: request.method, headers, redirect: 'manual',
            body: ['GET', 'HEAD'].includes(request.method) ? undefined : request.body
        });
        // Do not follow redirects or expose an upstream cookie on any other host.
        if (upstream.status >= 300 && upstream.status < 400) return failure(502, 'Unexpected staging response');
        const resultHeaders = responseHeaders(upstream);
        if (verifier && upstream.ok) resultHeaders.append('Set-Cookie', cookie(VERIFIER, verifier, 600, PREFIX));
        return new Response(upstream.body, { status: upstream.status, headers: resultHeaders });
    } catch {
        return failure(503, 'Unable to reconnect. Please try again.');
    }
}
