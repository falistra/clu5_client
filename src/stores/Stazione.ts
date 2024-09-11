import jsep from 'jsep';
import xml2js from 'xml2js';
import { api } from 'boot/axios';
import { useSessioneStore } from 'stores/sessione';
import { Script, Script_Stazione, Domanda, QueryParms } from 'stores/models';
export const Stazione = class {
  script: Script_Stazione;
  set_query: object;

  constructor(scriptStazione: Script_Stazione) {
    this.script = scriptStazione;
    // this.ID_STAZIONE_CORRENTE = this.script.$.ID;
    const domande = this.script.insieme_domande.domande;

    this.set_query = (Array.isArray(domande) ? domande : [domande]).map(
      (domanda) => this.setQuery(domanda)
    );
    // console.log(this.set_query);
  }

  setQuery(domanda: Domanda): object {
    const parms: { [Key: string]: jsep.Expression } = {};
    const casted_object = <{ [Key: string]: string }>domanda.$;
    const parms_keys: string[] = [
      'livello',
      'tecnica',
      'tag',
      'specializzazione',
      'autore',
      'id',
    ];

    jsep.addBinaryOp(',', 16); // "OR"

    for (const k in casted_object) {
      if (parms_keys.indexOf(k) > -1) parms[k] = jsep(casted_object[k]);
    }

    const query: QueryParms = {
      peso: domanda.$.peso_unitario,
      quantita: domanda.$.quantita,
      parms,
    };
    return query;
  }

  async richiediDomandeServer(scriptTest: Script, DOMANDE_GIA_POSTE: string[]) {
    const parms = {
      idUser: scriptTest.test.$.idUser,
      idSession: scriptTest.test.$.sessionId,
      idTest: scriptTest.test.$.id,
      idStazione: this.script.$.ID,
      lingua: scriptTest.test.prologo.$.lingua,
      set_query: JSON.stringify(this.set_query),
      domande_gia_poste: JSON.stringify(DOMANDE_GIA_POSTE),
    };

    // console.log(parms);

    const domandeXML = await api
      .post('http://localhost/clu4/test/domande/', new URLSearchParams(parms))
      .then((response) => {
        return response.data;
      })
      .catch((errore) => {
        console.log(errore);
        // $q.notify({
        //   color: 'negative',
        //   position: 'top',
        //   message: 'Loading failed',
        //   icon: 'report_problem',
        // });
      });
    // console.log(domande);

    const jsonDomande = await xml2js
      .parseStringPromise(domandeXML, {
        explicitArray: false,
        trim: true,
      })
      .then(function (result) {
        return result;
      })
      .catch(function (err) {
        console.error(err);
      });
    const sessioneStore = useSessioneStore();

    const domande: Array<object> = Array.isArray(
      jsonDomande.insiemi_domande.domande
    )
      ? jsonDomande.insiemi_domande.domande
      : [jsonDomande.insiemi_domande.domande];
    sessioneStore.domande = (domande as Array<object>)
      .map((value) => {
        const domande = (value as { sql: string; domanda: object }).domanda;
        return Array.isArray(domande) ? domande : [domande]; // quando c'e' una sola domanda non e' un array
      })
      .reduce((accumulator, value) => accumulator.concat(value), []) // flat
      .map((domanda) => {
        const d = Object.entries(domanda);
        const tipo = d[1][0];
        const script = domanda[tipo] as object;
        return [tipo as string, script as object, d[0][1]] as [
          string,
          object,
          object
        ];
      });
  }
};
