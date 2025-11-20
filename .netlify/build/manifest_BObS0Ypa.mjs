import '@astrojs/internal-helpers/path';
import 'kleur/colors';
import { o as NOOP_MIDDLEWARE_HEADER, p as decodeKey } from './chunks/astro/server_CWIJjN-V.mjs';
import 'clsx';
import 'cookie';
import 'es-module-lexer';
import 'html-escaper';

const NOOP_MIDDLEWARE_FN = async (_ctx, next) => {
  const response = await next();
  response.headers.set(NOOP_MIDDLEWARE_HEADER, "true");
  return response;
};

const codeToStatusMap = {
  // Implemented from tRPC error code table
  // https://trpc.io/docs/server/error-handling#error-codes
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  TIMEOUT: 405,
  CONFLICT: 409,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TOO_LARGE: 413,
  UNSUPPORTED_MEDIA_TYPE: 415,
  UNPROCESSABLE_CONTENT: 422,
  TOO_MANY_REQUESTS: 429,
  CLIENT_CLOSED_REQUEST: 499,
  INTERNAL_SERVER_ERROR: 500
};
Object.entries(codeToStatusMap).reduce(
  // reverse the key-value pairs
  (acc, [key, value]) => ({ ...acc, [value]: key }),
  {}
);

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/agejanbarlund/WebDev/langliTakst/","cacheDir":"file:///Users/agejanbarlund/WebDev/langliTakst/node_modules/.astro/","outDir":"file:///Users/agejanbarlund/WebDev/langliTakst/dist/","srcDir":"file:///Users/agejanbarlund/WebDev/langliTakst/src/","publicDir":"file:///Users/agejanbarlund/WebDev/langliTakst/public/","buildClientDir":"file:///Users/agejanbarlund/WebDev/langliTakst/dist/","buildServerDir":"file:///Users/agejanbarlund/WebDev/langliTakst/.netlify/build/","adapterName":"@astrojs/netlify","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"priser/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/priser","isIndex":false,"type":"page","pattern":"^\\/priser\\/?$","segments":[[{"content":"priser","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/priser.astro","pathname":"/priser","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tjenester/byggkontroll/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tjenester/byggkontroll","isIndex":false,"type":"page","pattern":"^\\/tjenester\\/byggkontroll\\/?$","segments":[[{"content":"tjenester","dynamic":false,"spread":false}],[{"content":"byggkontroll","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tjenester/byggkontroll.astro","pathname":"/tjenester/byggkontroll","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tjenester/energi/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tjenester/energi","isIndex":false,"type":"page","pattern":"^\\/tjenester\\/energi\\/?$","segments":[[{"content":"tjenester","dynamic":false,"spread":false}],[{"content":"energi","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tjenester/energi.astro","pathname":"/tjenester/energi","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tjenester/kjopogsalg/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tjenester/kjopogsalg","isIndex":false,"type":"page","pattern":"^\\/tjenester\\/kjopogsalg\\/?$","segments":[[{"content":"tjenester","dynamic":false,"spread":false}],[{"content":"kjopogsalg","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tjenester/kjopogsalg.astro","pathname":"/tjenester/kjopogsalg","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tjenester/takst/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tjenester/takst","isIndex":false,"type":"page","pattern":"^\\/tjenester\\/takst\\/?$","segments":[[{"content":"tjenester","dynamic":false,"spread":false}],[{"content":"takst","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tjenester/takst.astro","pathname":"/tjenester/takst","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"tjenester/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/tjenester","isIndex":false,"type":"page","pattern":"^\\/tjenester\\/?$","segments":[[{"content":"tjenester","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/tjenester.astro","pathname":"/tjenester","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/agejanbarlund/WebDev/langliTakst/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/agejanbarlund/WebDev/langliTakst/src/pages/priser.astro",{"propagation":"none","containsHead":true}],["/Users/agejanbarlund/WebDev/langliTakst/src/pages/tjenester.astro",{"propagation":"none","containsHead":true}],["/Users/agejanbarlund/WebDev/langliTakst/src/pages/tjenester/byggkontroll.astro",{"propagation":"none","containsHead":true}],["/Users/agejanbarlund/WebDev/langliTakst/src/pages/tjenester/energi.astro",{"propagation":"none","containsHead":true}],["/Users/agejanbarlund/WebDev/langliTakst/src/pages/tjenester/kjopogsalg.astro",{"propagation":"none","containsHead":true}],["/Users/agejanbarlund/WebDev/langliTakst/src/pages/tjenester/takst.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/priser@_@astro":"pages/priser.astro.mjs","\u0000@astro-page:src/pages/tjenester/byggkontroll@_@astro":"pages/tjenester/byggkontroll.astro.mjs","\u0000@astro-page:src/pages/tjenester/energi@_@astro":"pages/tjenester/energi.astro.mjs","\u0000@astro-page:src/pages/tjenester/kjopogsalg@_@astro":"pages/tjenester/kjopogsalg.astro.mjs","\u0000@astro-page:src/pages/tjenester/takst@_@astro":"pages/tjenester/takst.astro.mjs","\u0000@astro-page:src/pages/tjenester@_@astro":"pages/tjenester.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_BObS0Ypa.mjs","/Users/agejanbarlund/WebDev/langliTakst/node_modules/unstorage/drivers/fs-lite.mjs":"chunks/fs-lite_COtHaKzy.mjs","/Users/agejanbarlund/WebDev/langliTakst/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_BmhBPUCK.mjs","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/hus.DqMXDcjr.jpg","/_astro/open-sans-cyrillic-ext-wght-normal.f7eF65bT.woff2","/_astro/open-sans-greek-wght-normal.CtQ6sbau.woff2","/_astro/open-sans-cyrillic-wght-normal.Cw00GhOR.woff2","/_astro/open-sans-hebrew-wght-normal.DrVQLkKb.woff2","/_astro/open-sans-vietnamese-wght-normal.0eckKRMD.woff2","/_astro/open-sans-symbols-wght-normal.C2QAFfGS.woff2","/_astro/open-sans-latin-ext-wght-normal.CrpOxvfM.woff2","/_astro/open-sans-latin-wght-normal.CYuRH5ug.woff2","/_astro/open-sans-greek-ext-wght-normal.Cs5KUPhG.woff2","/_astro/open-sans-math-wght-normal.cwLdES2L.woff2","/_astro/ansatt1.LXF-BOpt.jpg","/_astro/ansatt2.BeKZ8Uz1.jpg","/_astro/phone.C-DSh890.svg","/_astro/ansatt3.-IcFWPav.jpg","/_astro/mail.DgR_w4_T.svg","/_astro/bmtf100.gGaK9aej.png","/_astro/image001.CalXsym9.png","/_astro/index.BYFo_9pw.css","/_astro/index.B0t3y4Np.css","/favicon.svg","/logo.png","/icons/banknotes.svg","/icons/doc-chart.svg","/icons/flood.svg","/icons/gavel.svg","/icons/home-energy.svg","/icons/home-modern.svg","/icons/home.svg","/icons/home2.svg","/icons/industry.svg","/icons/magnify.svg","/icons/plot.svg","/icons/question.svg","/icons/shield.svg","/icons/solar-energy.svg","/icons/storefront.svg","/icons/tape-measure.svg","/images/langlitakst.png","/priser/index.html","/tjenester/byggkontroll/index.html","/tjenester/energi/index.html","/tjenester/kjopogsalg/index.html","/tjenester/takst/index.html","/tjenester/index.html","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"WTd167/NKg3SY9YUaS739m4mewLPrYPDfulVqEEWl28=","sessionConfig":{"driver":"fs-lite","options":{"base":"/Users/agejanbarlund/WebDev/langliTakst/node_modules/.astro/sessions"}}});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = () => import('./chunks/fs-lite_COtHaKzy.mjs');

export { manifest };
