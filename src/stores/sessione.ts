import { defineStore } from 'pinia';
import { Test } from './Test';
import { IRisposte, Ilog_STAZIONI } from './models';

export const useSessioneStore = defineStore('sessione', {
  state: () => ({
    descrizioneSessione: '',
    counter: 0,
    domande: <[string, unknown, unknown, number, string][]>[],
    IN_ERRORE: false,
    errore: {},
    lingua: <string>'2',
    numero_stazione_corrente: 1,
    numero_stazioni: 0,
    countdown_stazione_corrente: (<number | undefined>0) as number | undefined,
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
    IN_ASCOLTO_URL: '',
    IN_VISIONE: false,
    IN_VISIONE_URL: '',
    MEDIA_AUDIO: <{ [Key: string]: HTMLAudioElement }>{},
    MEDIA_AUDIO_DURATA: <{ [Key: string]: number }>{},
    MEDIA_VIDEO: <{ [Key: string]: HTMLVideoElement }>{},
    MEDIA_VIDEO_DURATA: <{ [Key: string]: number }>{},
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
