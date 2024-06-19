// export interface Todo {
//   id: number;
//   content: string;
// }

// export interface Meta {
//   totalCount: number;
// }

export interface T_DomandaSceltaSingola {
  $?: { id: number };
  prologo: string;
  testo: string;
  risposte: { risposta: Array<{ corretta: number; _: string }> };
  immagine?: { url: string };
}

export interface T_DomandaSceltaMultipla {
  $?: { id?: number; maxrisposte: number };
  prologo: string;
  testo: string;
  risposte: { risposta: Array<{ corretta: number; _: string }> };
  immagine?: { url: string };
}

export interface T_DomandaComprensioneTesto {
  $?: { id: number };
  prologo: string;
  testo_comprensione: string;
  domande: { domandasceltasingola: Array<T_DomandaSceltaSingola> };
  immagine?: { url: string };
}

export interface T_DomandaRiordino {
  $: { id: number };
  prologo: string;
  testo: string;
  risposte: { risposta: Array<{ ordine: number; _: string }> };
}

export interface T_DomandaScritturaLibera {
  $: { id: number };
  prologo: string;
  testo: string;
}

export interface T_DomandaRiempimentoTesto {
  $?: { id: number };
  prologo: string;
  testo: string;
  risposte: { risposta: Array<{ ordine: number; _: string }> };
}

export interface T_DomandaRiempimentoTestoLibero {
  $?: { id: number };
  prologo: string;
  testo: string;
  risposte: { risposta: Array<{ ordine: number; _: string }> };
}

export interface T_DomandaRiempimentoLibero {
  $?: { id: number };
  prologo: string;
  testo: string;
  immagine?: { url: string };
}

export interface T_DomandaOutputStudente {
  $?: { id: number };
  prologo: string;
  testo: string;
  risposte: { tipoCheck: string; risposta: Array<string> };
}

export interface T_DomandaAbbinamentoMultiplo {
  $?: { id: number };
  prologo: string;
  testo: string;
  coppie: { coppia: Array<{ fissa?: string; mobile: string }> };
}

export interface T_DomandaAbbinamentoSingolo {
  $?: { id: number };
  prologo: string;
  testo: string;
  coppie: { coppia: Array<{ fissa?: string; mobile: string }> };
}

export interface T_DomandaWordPool {
  $?: { id: number };
  prologo: string;
  testo: string;
  wordpools: { wordpool: Array<{ pool: string; words: string }> };
}
