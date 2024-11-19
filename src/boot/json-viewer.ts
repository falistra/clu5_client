import { boot } from 'quasar/wrappers'

import { JsonViewer } from 'vue3-json-viewer'
import 'vue3-json-viewer/dist/index.css'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files

export default boot(async ({ app } /* { app, router, ... } */) => {
  app.component('JsonViewer', JsonViewer)
  // something to do
})
