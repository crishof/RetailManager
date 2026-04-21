
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    "chunk-3ZEGNQ6B.js"
  ]
},
  assets: {
    'index.csr.html': {size: 749, hash: 'fe91afe76a3203a2d665f783da713833d4fc5a88ff957b3ff7bf14834538dc32', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1289, hash: 'ebbfd83ff153bb0e595ff77fa785c6cb11485c7fafe761a46312bddf18514e8c', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}
  },
};
