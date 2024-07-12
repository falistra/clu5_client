import { defineStore } from 'pinia';
// import { IDomanda } from 'pages/models';

export const useI18nStore = defineStore('i18n', {
  state: () => ({
    caratteri: {
      IT: 'aiuo',
      UK: '',
    },
  }),
});
