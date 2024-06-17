export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

export interface T_DomandaSceltaSingola {
  $: { id: number };
  Testo: string;
  Risposte: { Risposta: Array<string> };
}
