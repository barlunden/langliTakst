import { renderers } from './renderers.mjs';
import { s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CvSoi7hX.mjs';
import { manifest } from './manifest_BObS0Ypa.mjs';
import { createExports } from '@astrojs/netlify/ssr-function.js';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/priser.astro.mjs');
const _page1 = () => import('./pages/tjenester/byggkontroll.astro.mjs');
const _page2 = () => import('./pages/tjenester/energi.astro.mjs');
const _page3 = () => import('./pages/tjenester/kjopogsalg.astro.mjs');
const _page4 = () => import('./pages/tjenester/takst.astro.mjs');
const _page5 = () => import('./pages/tjenester.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["src/pages/priser.astro", _page0],
    ["src/pages/tjenester/byggkontroll.astro", _page1],
    ["src/pages/tjenester/energi.astro", _page2],
    ["src/pages/tjenester/kjopogsalg.astro", _page3],
    ["src/pages/tjenester/takst.astro", _page4],
    ["src/pages/tjenester.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "f42f71c2-8369-4f31-8068-fb17d3d8322a"
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
