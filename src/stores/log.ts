import { defineStore } from 'pinia';
import moment from 'moment';

export const useLogStore = defineStore('log', {
  state: () => ({
    testiScritturaLibera: {} as {
      [signed_user: string]: {
        [idDomanda: string]: { value?: string; date?: moment.Moment };
      };
    },
  }),
  persist: true,
});
