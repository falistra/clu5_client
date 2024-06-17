import { defineStore } from 'pinia';

export const useSessioneStore = defineStore('sessione', {
  state: () => ({
    counter: 0,
    domande: <[string, unknown][]>[],
  }),
  // getters: {
  //   doubleCount: (state) => state.counter * 2,
  // },
  actions: {
    increment() {
      if (this.domande.length > this.counter) this.counter++;
    },
    decrement() {
      if (this.counter > 0) this.counter--;
    },
  },
});
