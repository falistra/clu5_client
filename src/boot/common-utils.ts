import { boot } from 'quasar/wrappers';

const common_api = {
  sanitizeUnicode: (testo: string) => testo.replace(/\%u(\d+)/g, '&#x$1;'),
  sanitazeBR: (testo: string) => testo.replace(/\&lt;br\&gt;/g, ''),
  thumbStyle: {
    right: '4px',
    borderRadius: '5px',
    backgroundColor: '#027be3',
    width: '10px',
    opacity: '0.75',
  },
  barStyle: {
    right: '2px',
    borderRadius: '9px',
    backgroundColor: '#027be3',
    width: '10px',
    opacity: '0.2',
  },
};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$common_api = common_api;
  // something to do
});

export { common_api };
