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
    };
    azione: {
      $: {
        stato_acquisito: string;
        vai_a: string;
      };
    };
  };
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
