import { defineStore } from 'pinia';

export const useLogStore = defineStore('log', {
  state: () => ({
    domande: {} as { [key: string]: string | number },
  }),
});
