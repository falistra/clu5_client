import { defineStore } from 'pinia';
import { Test } from 'stores/Test';

export const useSessioneStore = defineStore('sessione', {
  state: () => ({
    counter: 0,
    domande: <[string, unknown, unknown][]>[],
    lingua: <string>'2',
    test: null as unknown as InstanceType<typeof Test>,
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
