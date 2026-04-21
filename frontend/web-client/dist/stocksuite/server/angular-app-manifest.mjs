
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: false,
  baseHref: '/',
  locale: undefined,
  routes: undefined,
  entryPointToBrowserMapping: {
  "node_modules/@angular/animations/fesm2022/browser.mjs": [
    "chunk-SNRWXTEE.js"
  ]
},
  assets: {
    'index.csr.html': {size: 749, hash: '316a737e6a7152fdf1f96db0d1ab9027d0124014d1f66f118a5d6cc8ef961f06', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1289, hash: '0ba78f069cb4d366087000610f5a96f4f1c7c445a7353a928e9f718ae1887a3a', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}
  },
};
