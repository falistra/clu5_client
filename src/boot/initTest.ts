import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';

import xml2js from 'xml2js';
import { api } from 'boot/axios';
import moment from 'moment';

import { Test } from 'stores/Test';
import { Loading, Notify } from 'quasar';

import { useSessioneStore } from 'stores/sessione';
import { useLogStore } from 'stores/log';
import { Script, Ilog_STAZIONI } from 'stores/models';

// import { parseFromString } from 'dom-parser';
// import { useRouter } from 'vue-router';

export default boot(async ({ router }) => {
  /* { app, router, ... } */

  let allCookies = Cookies.getAll();

  const sessioneStore = useSessioneStore();
  const log = useLogStore();

  const testiScritturaLibera: {
    [signed_user: string]: {
      [idDomanda: string]: { value?: string; date?: moment.Moment };
    };
  } = {};
  const ieri = moment().add(-1, 'days');
  Object.entries(log.testiScritturaLibera).forEach(([signed_user, domande]) => {
    const domandeFiltrate: {
      [idDomanda: string]: { value?: string; date?: moment.Moment };
    } = {};
    Object.entries(domande).forEach(([idDomanda, { value, date }]) => {
      const date_obj = moment(date);
      if (date_obj > ieri) domandeFiltrate[idDomanda] = { value, date };
    });
    if (domandeFiltrate) testiScritturaLibera[signed_user] = domandeFiltrate;
  });
  log.testiScritturaLibera = testiScritturaLibera;

  Loading.show({
    message: 'Attendere, prego...',
  });

  if (!Cookies.has('simulazione')) {
    if (!(Cookies.has('idUtente') && Cookies.has('idSessione'))) {
      const options = process.env.DEV
        ? [
            // { label: 'test 1', value: { idUser: 2, idSess: 19 } },
            { label: 'test 2', value: { idUser: 2, idSess: 27 } }, // test 760
            { label: 'test 3', value: { idUser: 2, idSess: 93 } },
            { label: 'test 4', value: { idUser: 2, idSess: 108 } }, // test 793
            { label: 'test 5', value: { idUser: 2, idSess: 75 } },
          ]
        : [
            { label: 'test 1', value: { idUser: 1, idSess: 1 } },
            { label: 'test 2', value: { idUser: 1, idSess: 2 } },
            { label: 'test 3', value: { idUser: 1, idSess: 3 } },
            { label: 'test 4', value: { idUser: 1, idSess: 6 } },
          ];
      const el = options[3]; // options[Math.floor(Math.random() * options.length)]; // options[2];
      Cookies.set('idUtente', el.value.idUser.toString());
      Cookies.set('idSessione', el.value.idSess.toString());
    }

    allCookies = Cookies.getAll();
    const script = await api
      .get(
        `/test/script/?idUser=${allCookies.idUtente}&idSess=${allCookies.idSessione}`
      )
      .then((response) => {
        Cookies.set('idUtente', '', { expires: -1 });
        Cookies.set('idSessione', '', { expires: -1 });
        return response.data;
      })
      .catch((errore) => {
        console.log(errore.response.data);
        Loading.hide();
        sessioneStore.errore = {
          idUser: allCookies.idUtente,
          idSess: allCookies.idSessione,
          errore: errore.response.data,
        };
        Cookies.set('idUtente', '', { expires: -1 });
        Cookies.set('idSessione', '', { expires: -1 });
      });
    if (script) {
      const scriptJSON = await xml2js
        .parseStringPromise(script, {
          explicitArray: false,
          trim: true,
        })
        .then(function (result) {
          // nel caso ci sia una sola stazione => va trasformato da object in [object] : Array
          if (!Array.isArray(result.test.stazioni.stazione)) {
            result.test.stazioni.stazione = [result.test.stazioni.stazione];
          }
          return result;
        })
        .catch(function (errore) {
          Loading.hide();
          sessioneStore.errore = {
            idUser: allCookies.idUtente,
            idSess: allCookies.idSessione,
            errore,
          };
        });
      if (scriptJSON) {
        let storia_precedente: string[] = [];
        if ((scriptJSON as Script).test.situazionePrecedente) {
          sessioneStore.sessioneInterrotta = true;
          const stazioniPrecedenti: {
            log_STAZIONI: Ilog_STAZIONI;
            storia: string[];
          } = JSON.parse(
            (scriptJSON as Script).test.situazionePrecedente?.$
              .risposteDateFinora || ''
          );
          // sessioneStore.log_stazioni = stazioniPrecedenti;
          sessioneStore.log_STAZIONI = stazioniPrecedenti.log_STAZIONI;
          storia_precedente = stazioniPrecedenti.storia;
          Object.entries(sessioneStore.log_stazioni).forEach(
            ([id_stazione, stazione]) => {
              sessioneStore.punteggiStazioni[id_stazione] =
                stazione.punteggioStazione;
              sessioneStore.DOMANDE_GIA_POSTE =
                sessioneStore.DOMANDE_GIA_POSTE.concat(
                  Array.from(
                    Object.keys(stazione.risposte || []).map((idDomanda) =>
                      parseInt(idDomanda)
                    )
                  )
                );
            }
          );
          Notify.create({
            message: 'Test precedentemente interrotto; ora ripreso.',
            color: 'negative',
            position: 'bottom',
          });
        }

        const test = new Test(scriptJSON, script, storia_precedente);

        sessioneStore.test = test;
        sessioneStore.lingua = test.LINGUA;

        const esitoPositivo =
          await test.stazione_corrente.richiediDomandeServer();
        Loading.hide();
        if (!esitoPositivo) {
          router.push('/erroreServer');
          return;
        }
      }
    }
  } else {
    const domandaXML = await api
      .get('/test/simulazione/domanda', {
        params: { idDomanda: allCookies.simulazione },
      })
      .then((response) => {
        return response.data;
      })
      .catch((errore) => {
        Loading.hide();
        sessioneStore.errore = {
          idDomanda: allCookies.simulazione,
          errore,
        };
      });
    if (domandaXML) {
      // const xmlDoc = parseFromString(domandaXML);
      // const xmlDomande_ = xmlDoc.getElementsByTagName('domanda');
      // const xmlDomande = xmlDomande_.reduce(
      //   (a, d) => ({ ...a, [d.getAttribute('id')]: d.innerHTML }),
      //   {}
      // );

      const jsonDomanda = await xml2js
        .parseStringPromise(domandaXML, {
          explicitArray: false,
          trim: true,
        })
        .then(function (result) {
          return result;
        })
        .catch(function (errore) {
          Loading.hide();
          sessioneStore.errore = {
            idDomanda: allCookies.simulazione,
            errore,
          };
        });

      if (jsonDomanda) {
        const domande = [jsonDomanda];

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
            return [
              tipo as string,
              script as object,
              d[0][1],
              index + 1,
              'XML',
            ] as [string, object, object, number, string];
          });
        Loading.hide();
      }
    }
  }
  sessioneStore.counter = 0;
});
