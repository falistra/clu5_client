import { defineStore } from 'pinia';
import { Test } from './Test';
import { IRisposte, IDomande } from './models';

export const useSessioneStore = defineStore('sessione', {
  state: () => ({
    counter: 0,
    domande: <[string, unknown, unknown, number, string][]>[],
    errore: {},
    lingua: <string>'2',
    numero_stazione_corrente: 1,
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
    log_STAZIONI: <
      {
        [Key: string]: {
          inizio?: string;
          domandeStato?: { [Key: string]: string };
          domandeOrdine?: { [Key: string]: number };
          domande?: IDomande;
          fine?: string;
          durata?: number;
          punteggioStazione?: number;
        };
      }
    >{},
    testCompletato: false,
    logTest: {},
  }),
  actions: {
    increment() {
      if (this.domande.length > this.counter) this.counter++;
    },
    decrement() {
      if (this.counter > 0) this.counter--;
    },
  },
});
