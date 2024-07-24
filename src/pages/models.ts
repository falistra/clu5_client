export interface IDomanda {
  autore: string;
  id: string;
  livello: string;
  peso: string;
  tag: string;
  tecnica: string;
}
export interface RispostaDomandaSceltaSingola {
  hash: string;
  tipo?: string;
  _: string;
}

export interface T_DomandaSceltaSingola {
  $: { id: number; lingua?: number; id_vdb: number; hash?: string };
  prologo: string;
  testo: string;
  risposte: {
    tipoopzioni?: string;
    risposta: Array<RispostaDomandaSceltaSingola>;
  };
  immagine?: { url: string };
  rispostaData?: string;
}

export interface T_DomandaSceltaMultipla {
  $: { id?: number; lingua: string; risposteCorrette: string };
  prologo: string;
  testo: string;
  immagine?: { url: string };
  audio?: { $: { nrMaxRipetizioni: string; url: string } };
  risposte: {
    $?: { tipoopzioni?: string };
    risposta: Array<{ $: { hash: string }; _: string }>;
  };
  rispostaData?: Array<{ $: { hash: string }; _: string }>;
}

export interface T_DomandaComprensioneTesto {
  $: { id: number; lingua: string };
  prologo: string;
  testo_comprensione: string;
  domande: { domandasceltasingola: Array<T_DomandaSceltaSingola> };
  immagine?: { url: string };
}

export interface T_DomandaRiordino {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  risposte: { risposta: Array<{ ordine: number; _: string }> };
}

export interface T_DomandaScritturaLibera {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
}

export interface T_DomandaRiempimentoTesto {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  risposte: { risposta: Array<{ hash: string; _: string }> };
  rispostaData?: Array<{ hash: string; _: string }>;
}

export interface T_DomandaRiempimentoTestoLibero {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  rispostaData: { [Key: string]: string };
}

export interface T_DomandaRiempimentoLibero {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  immagine?: { url: string };
  rispostaData?: Array<string>;
}

export interface T_DomandaOutputStudente {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  risposte: { tipoCheck: string; risposta: Array<string> };
  rispostaData: string;
}

export interface T_DomandaAbbinamentoMultiplo {
  $: { id: number };
  prologo: string;
  testo: string;
  coppie: { $: { tipoopzioni: string; tipoorientamento: string } };
  partiFisse: {
    item: Array<{
      $: { hash: string };
      _: string;
      rispostaData?: Array<{ $: { hash: string }; _: string }>;
    }>;
  };
  partiMobili: {
    item: Array<{ $: { hash: string }; _: string; disponibile?: boolean }>;
  };
}

export interface T_DomandaAbbinamentoSingolo {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  coppie: { $: { tipoopzioni: string; tipoorientamento: string } };
  partiFisse: {
    item: Array<{
      $: { hash: string };
      _: string;
      rispostaData?: { $: { hash: string }; _: string };
    }>;
  };
  partiMobili: {
    item: Array<{ $: { hash: string }; _: string; disponibile?: boolean }>;
  };
}

export interface T_DomandaWordPool {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  pools: {
    pool: Array<{
      $: { hash: string };
      _: string;
      rispostaData?: Array<{ $: { hash: string }; _: string }>;
    }>;
  };
  words: {
    word: Array<{ $: { hash: string }; _: string; disponibile?: boolean }>;
  };
}

export interface Buco {
  index: number;
  isSlot: boolean;
  slotIndex: number;
  content: string;
}

export interface T_Token {
  index: number;
  isSlot: boolean;
  slotIndex: number;
  content: string;
  size?: number;
}
