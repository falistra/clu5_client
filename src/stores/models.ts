export type QueryParms = {
  peso: string;
  quantita: string;
  parms: object;
};

export type Domanda = {
  $: {
    tecnica?: string;
    livello?: string;
    peso_unitario: string;
    quantita: string;
    specializzazione?: string;
    tag?: string;
    id?: string;
  };
};

export type Script_Stazione = {
  $: {
    ID: string;
    countdown: string;
    iniziale: string;
    numero_ordine: string;
  };
  altrimenti?: {
    azione: {
      $: {
        stato_acquisito: string;
        vai_a: string;
      };
    };
  };
  caso?: {
    $: {
      condizione: string;
      se: string;
    };
    azione: {
      $: {
        stato_acquisito: string;
        vai_a: string;
      };
    };
  }[];
  insieme_domande: {
    domande: Domanda[];
  };
};

export type Script = {
  test: {
    $: {
      descrizione: string;
      id: string;
      idUser: string;
      serverTime: string;
      sessionId: string;
      signed_userId: string;
    };
    prologo: {
      $: {
        autore: string;
        corso_di_laurea: string;
        data_revisione: string;
        lingua: string;
      };
    };
    studente: {
      $: {
        cognome: string;
        nome: string;
      };
    };
    stazioni: {
      stazione: Script_Stazione[];
    };
  };
};

export type punteggiDomandeStazione = {
  punteggioTotale: number;
  punteggiDomande: { [id: number]: { domanda: string; punteggio: number } };
};

export type TRisposte =
  | string // Scelta Singola 1, Output Test 9, Scrittura Libera 10
  | { [Key: string]: string } // Cmprensione Testo 2, Abbinamento Singolo 5, Riempimento Testo 7
  | string[] // Riordino 4
  | { [Key: string]: string[] }; // Abbinamento multiplo 6, Word Pool 8

export interface IRisposta2Server {
  risposta2Server: {
    specie: number;
    peso: string;
    risposte: TRisposte;
  };
}
