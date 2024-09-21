export interface IDomanda {
  autore: string;
  id: string;
  livello: string;
  peso: string;
  tag: string;
  tecnica: string;
}
export interface RispostaDomandaSceltaSingola {
  $: { hash: string; tipo?: string };
  _: string;
}

export interface Audio {
  $: { nrMaxRipetizioni: string; url: string; nrmaxripetizioni: string };
  ascolti_rimanenti?: number;
}

export interface Video {
  $: { nrMaxRipetizioni: string; url: string; nrmaxripetizioni: string };
  ascolti_rimanenti?: number;
}

export interface T_DomandaSceltaSingola_risposta2Server {
  specie: number;
  peso: string;
  risposte: string;
}

export interface T_DomandaSceltaSingola {
  $: { id: number; lingua?: number; id_vdb: number; hash?: string };
  prologo: string;
  testo: string;
  risposte: {
    $?: { tipoopzioni?: string };
    risposta: Array<RispostaDomandaSceltaSingola>;
  };
  immagine?: { $: { url: string } };
  audio?: Audio;
  video?: Video;
  rispostaData?: string;
  risposta2Server?: T_DomandaSceltaSingola_risposta2Server;
}

export interface T_DomandaSceltaMultipla {
  $: { id?: number; lingua: string; risposteCorrette: string };
  prologo: string;
  testo: string;
  immagine?: { url: string };
  audio?: Audio;
  risposte: {
    $?: { tipoopzioni?: string };
    risposta: Array<{ $: { hash: string }; _: string }>;
  };
  rispostaData?: Array<{ $: { hash: string }; _: string }>;
  ascolti_rimanenti?: number;
}

export interface T_DomandaComprensioneTesto_risposta2Server {
  specie: number;
  peso: string;
  risposte: { [Key: string]: string };
}

export interface T_DomandaComprensioneTesto {
  $: { id: number; lingua: string };
  prologo: string;
  testo_comprensione: string;
  domande: { domandasceltasingola: Array<T_DomandaSceltaSingola> };
  risposta2Server?: T_DomandaComprensioneTesto_risposta2Server;
}

export interface T_DomandaRiordino_risposta2Server {
  specie: number;
  peso: string;
  risposte: string[];
}

export interface T_DomandaRiordino {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  audio?: Audio;
  video?: Video;
  risposte: { risposta: Array<{ ordine: number; _: string; label: string }> };
  rispostaData?: {
    risposta: Array<{ ordine: number; _: string; label: string }>;
  };
  risposta2Server?: T_DomandaRiordino_risposta2Server;
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
  immagine?: { url: string };
  risposte: {
    risposta: Array<{ hash: string; _: string; disponibile?: boolean }>;
  };
  rispostaData: { [Key: string]: { hash: string; _: string } };
}

export interface T_DomandaRiempimentoTestoLibero {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  immagine?: { url: string };
  rispostaData: { [Key: string]: string };
}

export interface T_DomandaRiempimentoLibero {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  immagine?: { url: string };
  rispostaData: { [Key: string]: string };
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
      label: string;
      rispostaData?: Array<{
        $: { hash: string };
        _: string;
        label: string;
      }>;
    }>;
  };
  partiMobili: {
    item: Array<{
      $: { hash: string };
      _: string;
      label: string;
      disponibile?: boolean;
    }>;
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
      label: string;
      rispostaData?: {
        $: { hash: string };
        _: string;
        label: string;
      };
    }>;
  };
  partiMobili: {
    item: Array<{
      $: { hash: string };
      _: string;
      label: string;
      disponibile?: boolean;
    }>;
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
      label: string;
      rispostaData?: Array<{
        $: { hash: string };
        _: string;
        label: string;
      }>;
    }>;
  };
  words: {
    word: Array<{
      $: { hash: string };
      _: string;
      label: string;
      disponibile?: boolean;
    }>;
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
  slotIndex: string;
  content: string;
}
