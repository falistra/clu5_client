import { defineStore } from 'pinia';

export const useLogStore = defineStore('log', {
  state: () => ({
    testiScritturaLibera: {} as {
      [signed_user: string]: { [idDomanda: string]: string };
    },
  }),
  persist: true,
});
