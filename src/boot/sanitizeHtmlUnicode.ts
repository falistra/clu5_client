import { boot } from 'quasar/wrappers';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  /* { app, router, ... } */
  app.config.globalProperties.$sanitizeUnicode = (html: string): string =>
    html.replace(/\%u(\d+)/g, '&#x$1;');

  app.config.globalProperties.$appName = 'CLU 5';
});
