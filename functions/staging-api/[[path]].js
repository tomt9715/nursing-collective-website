import { previewSessionProxy } from '../../lib/staging-session-proxy.js';
export const onRequest = context => previewSessionProxy(context);
