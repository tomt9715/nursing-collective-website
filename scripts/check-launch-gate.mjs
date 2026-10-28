import assert from 'node:assert/strict';
import { onRequest } from '../functions/_middleware.js';
const call = (host, enabled) => onRequest({
 request: new Request(`https://${host}/pricing`),
 env: { SITE_PASSWORD: 'disposable-test-only', PUBLIC_SITE_ENABLED: enabled },
 next: () => new Response('released')
});
for (const host of ['thenursingcollective.pro','www.thenursingcollective.pro','learn.thenursingcollective.pro']) {
 assert.equal(await (await call(host,'1')).text(),'released');
 assert.equal((await call(host,undefined)).status,401);
 assert.equal((await call(host,'0')).status,401);
}
assert.equal((await call('preview-simple-study-dashboa.florencebot-website.pages.dev','1')).status,401);
console.log('PASS: explicit launch switch opens production hosts only; default and previews retain gate.');
