import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';
import { previewSessionProxy } from '../lib/staging-session-proxy.js';
if (!globalThis.crypto) globalThis.crypto = webcrypto;
const origin = 'https://preview-test.florencebot-website.pages.dev';
const call = (path, init = {}, send) => previewSessionProxy({ request: new Request(origin + '/staging-api' + path, init), env: { CF_PAGES_BRANCH: 'preview/test' } }, send);
const json = (body, headers = {}) => Response.json(body, { headers });

const start = await call('/auth/oauth/google?return_url=https://evil.example', {}, async (url, init) => {
    const parsed = new URL(url);
    assert.equal(parsed.origin, 'https://staging-backend-production-365a.up.railway.app');
    assert.equal(parsed.searchParams.get('return_url'), origin);
    assert.match(parsed.searchParams.get('preview_challenge'), /^[A-Za-z0-9_-]{43}$/);
    assert.equal(init.redirect, 'manual');
    return json({ authorization_url: 'https://accounts.google.com/' });
});
const verifierCookie = start.headers.get('set-cookie');
assert.match(verifierCookie, /HttpOnly; Secure; SameSite=Lax/);
const verifier = verifierCookie.split(';')[0];
const complete = await call('/oauth/complete?code=opaque-code', { headers: { Cookie: verifier } }, async (url, init) => {
    assert.equal(url, 'https://staging-backend-production-365a.up.railway.app/auth/preview-exchange');
    const body = JSON.parse(init.body);
    assert.equal(body.code, 'opaque-code');
    assert.equal(body.verifier, verifier.split('=')[1]);
    assert.equal(init.headers.Origin, origin);
    return json({ access_token: 'test-access' }, { 'Set-Cookie': 'tnc_staging_refresh=test-refresh; Secure; HttpOnly; Path=/auth; SameSite=None; Max-Age=604800' });
});
assert.equal(complete.status, 303);
assert.match(complete.headers.get('location'), /^https:\/\/preview-test\.florencebot-website\.pages\.dev\/auth-callback\?/);
assert.match(complete.headers.get('set-cookie'), /__Secure-tnc_preview_refresh=test-refresh; Path=\/staging-api\/auth; HttpOnly; Secure; SameSite=Lax/);
assert.equal(complete.headers.get('cache-control'), 'no-store');

const renewed = await call('/auth/refresh', {
    method: 'POST', headers: { Origin: origin, Cookie: '__Secure-tnc_preview_refresh=test-refresh; tnc_gate=private-gate; unrelated=private' }
}, async (url, init) => {
    assert.equal(init.headers.get('cookie'), 'tnc_staging_refresh=test-refresh');
    return json({ access_token: 'renewed' });
});
assert.equal(renewed.status, 200);
const loggedOut = await call('/auth/logout', { method: 'POST', headers: { Origin: origin } }, async () => json({}, {
    'Set-Cookie': 'tnc_staging_refresh=; Max-Age=0; Path=/auth; Secure; HttpOnly; SameSite=None'
}));
assert.match(loggedOut.headers.get('set-cookie'), /__Secure-tnc_preview_refresh=;.*Max-Age=0/);
for (const headers of [{}, { Origin: 'https://evil.example' }]) {
    assert.equal((await call('/auth/refresh', { method: 'POST', headers }, () => { throw Error('must not call upstream'); })).status, 403);
}
assert.equal((await call('/oauth/complete?code=stolen', {}, () => { throw Error('must not exchange'); })).status, 401);
assert.equal((await call('/user/profile', {}, async () => new Response(null, { status: 302, headers: { Location: 'https://evil.example' } }))).status, 502);
assert.equal((await call('/user/profile', {}, async () => { throw Error('offline'); })).status, 503);
assert.equal((await previewSessionProxy({ request: new Request('https://thenursingcollective.pro/staging-api/auth/refresh') }, () => { throw Error('production must not proxy'); })).status, 404);
console.log('PASS: first-party cookies, browser-bound OAuth handoff, renewal/logout, origin checks, credential isolation, redirect blocking and production isolation.');
