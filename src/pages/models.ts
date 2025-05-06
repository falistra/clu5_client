import { TLogRisposte } from '../stores/models';

export interface IDomanda {
  autore: string;
  id: string;
  livello: string;
  peso: string;
  tag: string;
  tecnica: string;
  lingua?: string;
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

export interface Immagine {
  $: { url: string };
}

interface I_risposta2Server {
  specie: number;
  peso: string;
}

export interface T_DomandaSceltaSingola_risposta2Server
  extends I_risposta2Server {
  risposte: string;
}

export interface I_Domanda_ParteComune {
  prologo: string;
  testo: string;
  immagine?: Immagine;
  audio?: Audio;
  video?: Video;
}

export interface T_DomandaSceltaSingola extends I_Domanda_ParteComune {
  $: { id: number; lingua?: number; id_vdb: number; hash?: string };
  risposte: {
    $?: { tipoopzioni?: string };
    risposta: Array<RispostaDomandaSceltaSingola>;
  };
  rispostaData?: string;
  risposta2Server?: T_DomandaSceltaSingola_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaSceltaMultipla_risposta2Server
  extends I_risposta2Server {
  risposte: string[];
}

export interface T_DomandaSceltaMultipla extends I_Domanda_ParteComune {
  $: { id?: number; lingua: string; risposteCorrette: string };
  risposte: {
    $?: { tipoopzioni?: string };
    risposta: Array<{ $: { hash: string }; _: string }>;
  };
  rispostaData?: Array<{ $: { hash: string }; _: string }>;
  risposta2Server?: T_DomandaSceltaMultipla_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaComprensioneTesto_risposta2Server
  extends I_risposta2Server {
  risposte: { [Key: string]: string };
}

export interface T_DomandaComprensioneTesto {
  $: { id: number; lingua: string };
  prologo: string;
  testo_comprensione: string;
  domande: { domandasceltasingola: Array<T_DomandaSceltaSingola> };
  risposta2Server?: T_DomandaComprensioneTesto_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaRiordino_risposta2Server extends I_risposta2Server {
  risposte: string[];
}

export interface T_DomandaRiordino {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  audio?: Audio;
  video?: Video;
  risposte: {
    risposta: Array<{
      $: { hash: string };
      ordine: number;
      _: string;
      label: string;
    }>;
  };
  rispostaData?: {
    risposta: Array<{
      $: { hash: string };
      ordine: number;
      _: string;
      label: string;
    }>;
  };
  risposta2Server?: T_DomandaRiordino_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaScritturaLibera_risposta2Server
  extends I_risposta2Server {
  risposte: string;
}

export interface T_DomandaScritturaLibera extends I_Domanda_ParteComune {
  $: { id: number; lingua: string };
  rispostaData: string;
  risposta2Server?: T_DomandaScritturaLibera_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaRiempimentoTesto_risposta2Server
  extends I_risposta2Server {
  risposte: { [Key: string]: string };
}

export interface T_DomandaRiempimentoTesto {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string | { _: string; $: { ampiezza: string } };
  immagine?: Immagine;
  audio?: Audio;
  video?: Video;
  risposte: {
    risposta: Array<{ $: { hash: string }; _: string; disponibile?: boolean }>;
  };
  rispostaData: { [Key: string]: { hash: string; _: string } };
  risposta2Server?: T_DomandaRiempimentoTesto_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaRiempimentoTestoLibero_risposta2Server
  extends I_risposta2Server {
  risposte: { [Key: string]: string };
}

export interface T_DomandaRiempimentoTestoLibero extends I_Domanda_ParteComune {
  $: { id: number; lingua: string };
  rispostaData: { [Key: string]: string };
  risposta2Server?: T_DomandaRiempimentoTestoLibero_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaRiempimentoLibero_risposta2Server
  extends I_risposta2Server {
  risposte: { [Key: string]: string };
}

export interface T_DomandaRiempimentoLibero extends I_Domanda_ParteComune {
  $: { id: number; lingua: string };
  rispostaData: { [Key: string]: string };
  risposta2Server?: T_DomandaRiempimentoLibero_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaOutputStudente_risposta2Server
  extends I_risposta2Server {
  risposte: string;
}

export interface T_DomandaOutputStudente {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  audio?: Audio;
  video?: Video;
  risposte: { tipoCheck: string; risposta: Array<string> };
  rispostaData: string;
  risposta2Server?: T_DomandaOutputStudente_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaAbbinamentoMultiplo_risposta2Server
  extends I_risposta2Server {
  risposte: { [Key: string]: string[] };
}

export interface T_DomandaAbbinamentoMultiplo {
  $: { id: number };
  prologo: string;
  testo: string;
  audio?: Audio;
  video?: Video;
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
  risposta2Server?: T_DomandaAbbinamentoMultiplo_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaAbbinamentoSingolo_risposta2Server
  extends I_risposta2Server {
  risposte: { [Key: string]: string | undefined };
}

export interface T_DomandaAbbinamentoSingolo {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  audio?: Audio;
  video?: Video;
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
  risposta2Server?: T_DomandaAbbinamentoSingolo_risposta2Server;
  logRisposta?: TLogRisposte;
}

export interface T_DomandaWordPool_risposta2Server extends I_risposta2Server {
  risposte: { [Key: string]: string[] };
}

export interface T_DomandaWordPool {
  $: { id: number; lingua: string };
  prologo: string;
  testo: string;
  audio?: Audio;
  video?: Video;
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
  risposta2Server?: T_DomandaWordPool_risposta2Server;
  logRisposta?: TLogRisposte;
}

// export interface T_Token {
//   index: number;
//   isSlot: boolean;
//   slotIndex: string;
//   content: string;
//   hash: string;
//   l?: number;
// }
