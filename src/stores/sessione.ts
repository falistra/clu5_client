import { defineStore } from 'pinia';
import { Test } from './Test';
import { IRisposte, Ilog_STAZIONI } from './models';

export const useSessioneStore = defineStore('sessione', {
  state: () => ({
    counter: 0,
    domande: <[string, unknown, unknown, number, string][]>[],
    errore: {},
    lingua: <string>'2',
    numero_stazione_corrente: 1,
    id_stazione_corrente: '',
    test: null as unknown as InstanceType<typeof Test>,
    risposte: <IRisposte>{},
    punteggiStazioni: <{ [Key: string]: number | undefined }>{},
    log_stazioni: <
      {
        [Key: string]: {
          inizio: string;
          risposte?: IRisposte;
          fine?: string;
          durata?: number;
          punteggioStazione?: number;
        };
      }
    >{},
    log_STAZIONI: <Ilog_STAZIONI>{},
    testCompletato: false,
    logTest: {},
    DOMANDE_GIA_POSTE: <number[]>[],
    sessioneInterrotta: false,
    IN_ASCOLTO: false,
    IN_VISIONE: false,
  }),
  // persist: { pick: ['counter'] },
  actions: {
    increment() {
      if (this.domande.length > this.counter) this.counter++;
    },
    decrement() {
      if (this.counter > 0) this.counter--;
    },
  },
});
