// Run from the website root: node scripts/check-session-renewal.cjs
const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const { JSDOM } = require('jsdom');
const jwt = exp => `header.${Buffer.from(JSON.stringify({ exp })).toString('base64url')}.signature`;

function setup(fetcher) {
    const dom = new JSDOM('<main></main>');
    const values = { accessToken: jwt(Date.now() / 1000 - 60), user: '{}' };
    const location = { hostname: 'preview.example', href: '', reload() {} };
    const ctx = {
        document: dom.window.document,
        window: { location, addEventListener() {} },
        localStorage: {
            getItem: key => values[key] || null,
            setItem: (key, value) => { values[key] = value; },
            removeItem: key => { delete values[key]; }
        },
        fetch: fetcher, atob, URL, URLSearchParams, Date, setTimeout, clearTimeout,
        console: { log() {}, warn() {}, error() {}, info() {} }
    };
    vm.createContext(ctx);
    vm.runInContext(fs.readFileSync('api-service.js', 'utf8'), ctx);
    return { ctx, values, dom, location };
}

async function check() {
    let renewCalls = 0;
    let finish;
    let renewed = false;
    const next = jwt(Date.now() / 1000 + 900);
    const app = setup(async url => {
        if (url.endsWith('/auth/refresh')) {
            renewCalls++;
            return new Promise(resolve => {
                finish = () => {
                    renewed = true;
                    resolve({ ok: true, status: 200, json: async () => ({ access_token: next }) });
                };
            });
        }
        return { ok: renewed, status: renewed ? 200 : 401, json: async () => ({ user: { id: 1 } }) };
    });
    const guard = app.ctx.requireAuth();
    const nav = app.ctx.ensureValidToken();
    const request = app.ctx.apiCall('/user/profile');
    await new Promise(resolve => setTimeout(resolve, 5));
    assert.equal(renewCalls, 1);
    finish();
    assert.equal(await guard, true);
    assert.equal(await nav, true);
    await request;
    assert.equal(app.values.accessToken, next);
    app.dom.window.close();
    console.log('PASS: pre-warm, navigation, auth guard and a 401 retry share one refresh.');

    for (const mode of ['network', 'server', 'invalid']) {
        const app = setup(async () => {
            if (mode === 'network') throw Error('offline');
            return { ok: false, status: mode === 'server' ? 503 : 401, json: async () => ({ error: 'test failure' }) };
        });
        assert.equal(await app.ctx.requireAuth(), false);
        await new Promise(resolve => setTimeout(resolve, 10));
        if (mode === 'invalid') {
            assert(!app.values.accessToken);
            assert.equal(app.location.href, 'login.html');
        } else {
            assert(app.values.accessToken);
            assert.equal(app.location.href, '');
            assert(app.dom.window.document.getElementById('session-reconnect-message'));
            app.ctx.fetch = async () => ({ ok: true, status: 200, json: async () => ({ access_token: next }) });
            assert.equal(await app.ctx.requireAuth(), true);
        }
        app.dom.window.close();
        console.log('PASS:', mode === 'invalid' ? 'invalid sessions still require login' : `${mode} failure preserves login and can recover`);
    }
}
check().catch(error => { console.error(error); process.exitCode = 1; });
