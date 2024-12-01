import jsep from 'jsep';
import xml2js from 'xml2js';
import { api } from '../boot/axios';
import { useSessioneStore } from './sessione';
import {
  Script_Stazione,
  Domanda,
  QueryParms,
  punteggiDomandeStazione,
  IRisposta2Server,
  TLogRisposte,
  TRisposte,
  IDomande,
} from './models';

import { Test } from './Test';

import { IDomanda } from '../pages/models';

import moment from 'moment';

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

    const sessioneStore = useSessioneStore();
    sessioneStore.log_stazioni[this.script.$.ID] = {
      inizio: this.test.ServerTime().format(),
    };

    sessioneStore.log_STAZIONI[this.script.$.ID] = {
      inizio: this.test.ServerTime().format(),
    };

    this.test.STORIA.push(
      `${this.test.ServerTime()} = Inizio stazione ${this.script.$.ID}`
    );

    this.set_query = (Array.isArray(domande) ? domande : [domande]).map(
      (domanda) => this.setQuery(domanda)
    );
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

    // <insiemi_domande><domande><sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
    // FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
    // WHERE domande.attiva = 1 AND domande.lingua = '1' AND (domande.id NOT IN (2883, 6681, 8299)) AND domande.specie = 2 AND domande.livello = 4 AND domande.tipo = 1 AND domande.specializzazione = 40 ORDER BY rand()
    //  LIMIT 2</sql></domande><errore><msg>NON CI SONO SUFFICIENTI DOMANDE CHE SODDISFANO LA RICHIESTA : RICHIESTE 2 - FORNITE 0. CONTATTARE IL SUPERVISORE</msg><sql>SELECT domande.id, domande.specie, domande.data, "tipiDomanda".descrizione AS tipo, autori.descrizione AS autore, livelli.descrizione AS livello
    // FROM domande JOIN "tipiDomanda" ON domande.tipo = "tipiDomanda".id JOIN autori ON domande.autore = autori.id JOIN livelli ON domande.livello = livelli.id
    // WHERE domande.attiva = 1 AND domande.lingua = '1' AND (domande.id NOT IN (2883, 6681, 8299)) AND domande.specie = 2 AND domande.livello = 4 AND domande.tipo = 1 AND domande.specializzazione = 40 ORDER BY rand()
    //  LIMIT 2</sql><parametri>{"peso": "5", "quantita": "2", "parms": {"tecnica": {"type": "Literal", "value": 2, "raw": "2"}, "livello": {"type": "Literal", "value": 4, "raw": "4"},

    const domandeXML = await api
      .post('/test/domande/', new URLSearchParams(parms))
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

    const sessioneStore = useSessioneStore();

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

    if ('errore' in jsonDomande.insiemi_domande) {
      sessioneStore.errore = jsonDomande.insiemi_domande.errore;
      return false;
    } else {
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
        .map((domanda, index) => {
          const d = Object.entries(domanda);
          const tipo = d[1][0];
          const script = domanda[tipo] as object;
          return [tipo as string, script as object, d[0][1], index + 1] as [
            string,
            object,
            object,
            number
          ];
        });
      return true;
    }
  }

  checkRisposte(): { tipo: string; indice: number }[] {
    const checkRispostaNonData = (risposte: TRisposte): boolean => {
      if (risposte === null) return false;
      if (typeof risposte === 'undefined') return false;
      if (
        typeof risposte === 'object' &&
        !Array.isArray(risposte) &&
        risposte !== null
      ) {
        return Object.keys(risposte).length > 0;
      }
      return risposte.length > 0;
    };

    const sessioneStore = useSessioneStore();
    sessioneStore.log_STAZIONI[this.script.$.ID].domandeStato =
      sessioneStore.domande.reduce((Map, D) => {
        const domanda = D[2] as IDomanda;
        const script = D[1] as IRisposta2Server;
        if (!(typeof script.risposta2Server === 'undefined')) {
          Map[domanda.id] = checkRispostaNonData(
            script.risposta2Server.risposte
          )
            ? 'Risposto'
            : 'Non risposto';
        } else Map[domanda.id] = 'Non risposto';
        return Map;
      }, {} as { [Key: string]: string });

    const domandeSenzaRisposta = sessioneStore.domande.filter((D) => {
      const script = D[1] as IRisposta2Server;
      if (typeof script.risposta2Server === 'undefined') return true;
      else return !checkRispostaNonData(script.risposta2Server.risposte);
    });

    return domandeSenzaRisposta.map((D) => ({ tipo: D[0], indice: D[3] }));
  }

  async richiediPunteggio() {
    const sessioneStore = useSessioneStore();
    const test = sessioneStore.test.script.test;

    sessioneStore.risposte = sessioneStore.domande
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
      risposte: JSON.stringify(sessioneStore.risposte),
      risposteComplessive: JSON.stringify(sessioneStore.risposte),
    };

    const punteggiDomandeServer = await api
      .post('/test/punteggio/', new URLSearchParams(parms))
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

    this.punteggioStazione = (
      punteggiDomandeServer as punteggiDomandeStazione
    ).punteggioTotale;
    this.punteggiDomande = (
      punteggiDomandeServer as punteggiDomandeStazione
    ).punteggiDomande;
    this.test.STORIA.push(
      `${this.test.ServerTime()} = Ricevuto+dal+server+punteggio ${
        this.punteggioStazione
      }`
    );
  }

  async passaStazione() {
    this.test.STORIA.push(
      `${this.test.ServerTime()} = Passaggio a nuova stazione`
    );
    if (this.script.caso && !Array.isArray(this.script.caso)) {
      this.script.caso = [this.script.caso];
    }
    this.test.STORIA.push(`${this.test.ServerTime()} = Valutazione casi`);

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
        this.test.STORIA.push(
          `${this.test.ServerTime()} = Valutazione+caso : ${condizione}`
        );

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
    this.test.LIVELLO_ACQUISITO = azione?.$.stato_acquisito || ' ';
    this.test.STATO_ACQUISITO = azione?.$.esito_acuisito || '';
    const sessioneStore = useSessioneStore();

    const test = sessioneStore.test;
    const id_stazione = this.script.$.ID;
    const domande = sessioneStore.domande;
    test.DOMANDE_GIA_POSTE = test.DOMANDE_GIA_POSTE.concat(
      domande.map((D) => {
        const domanda = D[2] as IDomanda;
        return parseInt(domanda.id);
      })
    );

    sessioneStore.punteggiStazioni[id_stazione] = this.punteggioStazione;
    sessioneStore.log_stazioni[id_stazione].risposte = sessioneStore.risposte;
    const fine = moment();
    const durata = moment
      .duration(fine.diff(sessioneStore.log_stazioni[id_stazione].inizio))
      .asSeconds();
    sessioneStore.log_stazioni[id_stazione].durata = durata;
    sessioneStore.log_stazioni[id_stazione].fine = fine.format();
    sessioneStore.log_stazioni[id_stazione].punteggioStazione =
      this.punteggioStazione;

    sessioneStore.log_STAZIONI[id_stazione].durata = durata;
    sessioneStore.log_STAZIONI[id_stazione].fine = fine.format();
    sessioneStore.log_STAZIONI[id_stazione].punteggioStazione =
      this.punteggioStazione;

    sessioneStore.log_STAZIONI[id_stazione].domandeOrdine =
      sessioneStore.domande.reduce((Map, D) => {
        const domanda = D[2] as IDomanda;
        Map[domanda.id] = D[3];
        return Map;
      }, {} as { [Key: string]: number });

    sessioneStore.log_STAZIONI[id_stazione].domande =
      sessioneStore.domande.reduce((Map, D) => {
        const domanda = D[2] as IDomanda;
        const script_domanda = D[1] as {
          testo: string;
          logRisposta?: TLogRisposte;
        };

        Map[domanda.id] = {
          tecnica: parseInt(domanda.tecnica),
          peso: domanda.peso,
          testo: script_domanda.testo,
          RISPOSTE: script_domanda.logRisposta,
          punteggioOttenuto: this.punteggiDomande
            ? domanda.id in this.punteggiDomande
              ? this.punteggiDomande?.[domanda.id].punteggio
              : 0
            : 0,
        };
        return Map;
      }, {} as IDomande);

    if (azione?.$.vai_a == 'uscita') {
      this.test.STORIA.push(
        `${this.test.ServerTime()} = Raggiunta+condizione+di+uscita`
      );
      await this.uscita();
      sessioneStore.testCompletato = true;
    } else {
      const script_nuova_stazione_corrente =
        this.test.script.test.stazioni.stazione.find(
          (stazione) => stazione.$.ID == azione?.$.vai_a
        );

      this.test.STORIA.push(
        `${this.test.ServerTime()} = Passaggio a nuova stazione ${
          script_nuova_stazione_corrente?.$.ID
        }`
      );

      const parms = {
        idUser: test.ID_USER,
        idSession: test.ID_SESSION,
        idTest: test.ID_TEST,
        stazioneProssima: script_nuova_stazione_corrente?.$.ID || '',
        risposteComplessive: JSON.stringify(sessioneStore.log_stazioni),
        punteggiStazioni: JSON.stringify(sessioneStore.punteggiStazioni),
      };

      await api
        .post('/test/stazione/', new URLSearchParams(parms))
        .then((response) => {
          return response.data;
        })
        .catch((errore) => {
          console.log(errore);
        });

      if (script_nuova_stazione_corrente) {
        this.test.stazione_corrente = new Stazione(
          script_nuova_stazione_corrente,
          this.test
        );
        sessioneStore.numero_stazione_corrente += 1;
      }
    }
  }

  async uscita() {
    const sessioneStore = useSessioneStore();
    const test = sessioneStore.test;
    const fineTest = moment();
    const testTime = moment
      .duration(fineTest.diff(test.inizioTest))
      .asSeconds();

    const parms = {
      idUser: test.ID_USER,
      idSession: test.ID_SESSION,
      idTest: test.ID_TEST,
      lingua: test.LINGUA,
      livello: test.LIVELLO_ACQUISITO,
      esitoUscita: test.STATO_ACQUISITO || '_',
      testTime: testTime.toString(),
      log: JSON.stringify({
        inizioTest: test.inizioTest.format(),
        serverTime: test.serverTime.format(),
        clientTime: test.clientTime.format(),
        ID_TEST: test.ID_TEST,
        ID_SESSION: test.ID_SESSION,
        ID_SIGNED_USER: test.script.test.$.signed_userId,
        ID_USER: test.ID_USER,
        LINGUA: test.LINGUA,
        SCRIPT: test.SCRIPT,
        STORIA: test.STORIA,
        RISPOSTE: { STAZIONI: sessioneStore.log_STAZIONI },
        fineTest: fineTest.format(),
        testTime,
        esito_acquisito: test.LIVELLO_ACQUISITO,
        statoUscita: test.STATO_ACQUISITO,
      }),
    };

    await api
      .post('/test/test/', new URLSearchParams(parms))
      .then((response) => {
        sessioneStore.logTest = response.data;
        // return response.data;
      })
      .catch((errore) => {
        console.log(errore);
      });
    this.test.STORIA.push(`${this.test.ServerTime()} = Invio test completo`);
  }
};
