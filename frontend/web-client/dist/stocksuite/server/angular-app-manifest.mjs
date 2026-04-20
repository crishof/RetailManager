
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
    'index.csr.html': {size: 792, hash: '66ffc8e6dfd6897d39170027ddcc20fbb5c004510ef54057a068e1b522c3471a', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 1332, hash: 'da6a3a952bb4e6f625295ada2a311f8500fcdacfe2696dd0cd9314eb361128d8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)}
  },
};
