import { boot } from 'quasar/wrappers';

const common_api = {
  sanitizeUnicode: (testo: string) => {
    try {
      const testoZ = testo
        // .replace(/\?;/g, '?')
        // .replace(/&nbsp;/g, ' ')
        .replace(/\%u([a-zA-Z0-9]{4})/g, '&#x$1;')
        .replace('[object Object]', '')
        .replace(/<p> \n<\/p>/g, '<BR/>')
        .replace(
          /<ul>/g,
          '<ul style="list-style-type:disc; margin-left: 20px !important;">'
        );
      // .replace(/;;;/g, '');
      return testoZ;
    } catch {
      return '';
    }
  },
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

  throttle: <T extends unknown[]>(
    callback: (...args: T) => void,
    delay: number
  ) => {
    let isWaiting = false;

    return (...args: T) => {
      if (isWaiting) {
        return;
      }

      callback(...args);
      isWaiting = true;

      setTimeout(() => {
        isWaiting = false;
      }, delay);
    };
  },
};

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  app.config.globalProperties.$common_api = common_api;
  // something to do
});

export { common_api };
