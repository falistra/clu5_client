import { defineStore } from 'pinia';
// import { IDomanda } from 'pages/models';

export const useSessioneStore = defineStore('sessione', {
  state: () => ({
    counter: 0,
    domande: <[string, unknown, unknown][]>[],
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
