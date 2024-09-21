import jsep from 'jsep';
import xml2js from 'xml2js';
import { api } from 'boot/axios';
import { useSessioneStore } from 'stores/sessione';
import {
  Script_Stazione,
  Domanda,
  QueryParms,
  punteggiDomandeStazione,
  IRisposta2Server,
} from 'stores/models';

import { Test } from 'stores/Test';

import {
  // T_DomandaSceltaSingola,
  IDomanda,
  // T_DomandaSceltaSingola_risposta2Server,
} from 'src/pages/models';

export const Stazione = class {
  script: Script_Stazione;
  test: InstanceType<typeof Test>;
  set_query: object;
  punteggioStazione: number | undefined;
  punteggiDomande: punteggiDomandeStazione['punteggiDomande'] | undefined;

  constructor(
    scriptStazione: Script_Stazione,
    test: InstanceType<typeof Test>
  ) {
    this.test = test;
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

  async richiediDomandeServer() {
    const parms = {
      idUser: this.test.script.test.$.idUser,
      idSession: this.test.script.test.$.sessionId,
      idTest: this.test.script.test.$.id,
      idStazione: this.script.$.ID,
      lingua: this.test.script.test.prologo.$.lingua,
      set_query: JSON.stringify(this.set_query),
      domande_gia_poste: JSON.stringify(this.test.DOMANDE_GIA_POSTE),
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

  async richiediPunteggio() {
    const sessioneStore = useSessioneStore();
    const test = sessioneStore.test.script.test;

    const risposte = sessioneStore.domande
      .map((D) => {
        const script = D[1] as IRisposta2Server; // T_DomandaSceltaSingola;
        const domanda = D[2] as IDomanda;
        return {
          id: domanda.id,
          risposta: script.risposta2Server,
        };
      })
      .reduce(
        function (map, obj) {
          if (map) if (obj) map[obj.id] = obj.risposta;
          return map;
        },
        {} as {
          [Key: string]: IRisposta2Server['risposta2Server'] | undefined;
        }
      );

    const parms = {
      idUser: test.$.idUser,
      idSession: test.$.sessionId,
      idTest: test.$.id,
      idStazione: this.script.$.ID,
      lingua: test.prologo.$.lingua,
      risposte: JSON.stringify(risposte),
      risposteComplessive: JSON.stringify(risposte),
    };

    const punteggiDomandeServer = await api
      .post('http://localhost/clu4/test/punteggio/', new URLSearchParams(parms))
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
    // this.punteggioStazione =

    this.punteggioStazione = (
      punteggiDomandeServer as punteggiDomandeStazione
    ).punteggioTotale;
    this.punteggiDomande = (
      punteggiDomandeServer as punteggiDomandeStazione
    ).punteggiDomande;

    // this.passaStazione();
    // await this.test.stazione_corrente.richiediDomandeServer(
    //   this.test.DOMANDE_GIA_POSTE
    // );
  }

  passaStazione() {
    const caso = this.script.caso?.find((caso) => {
      let condizione = caso.$.condizione;
      if (condizione) {
        condizione = condizione.replace(/eq/g, '==');
        condizione = condizione.replace(/le/g, '<=');
        condizione = condizione.replace(/lt/g, '<');
        condizione = condizione.replace(/ge/g, '>=');
        condizione = condizione.replace(/gt/g, '>');
        const condizioni = condizione.split(',');
        const arrayCondizioni = [];
        for (let c = 0; c < condizioni.length; c++) {
          arrayCondizioni.push(
            `( ${this.punteggioStazione} ${condizioni[c]} )`
          );
        }
        condizione = `( ${arrayCondizioni.join(' && ')} )`;
        return eval(condizione);
      }
      // else {
      //   let espressione = caso.$.se;
      //   const parse_tree = jsep(espressione)
      //   const valore = evalExp.do_eval(test, parse_tree)
      //   if (valore) {
      //     return casoCorrente
      //   }
      // }
    });
    const azione = caso ? caso.azione : this.script.altrimenti?.azione;
    if (azione?.$.vai_a == 'uscita') {
      console.log('uscita');
    } else {
      const script_nuova_stazione_corrente =
        this.test.script.test.stazioni.stazione.find(
          (stazione) => stazione.$.ID == azione?.$.vai_a
        );

      if (script_nuova_stazione_corrente)
        this.test.stazione_corrente = new Stazione(
          script_nuova_stazione_corrente,
          this.test
        );
    }
  }
};
