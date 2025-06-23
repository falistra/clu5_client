import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';

import xml2js from 'xml2js';
import jsep from 'jsep';
import { api } from 'boot/axios';
// import moment from 'moment';

import { Test } from 'stores/Test';
import { Loading } from 'quasar';

import { useSessioneStore } from 'stores/sessione';
import { Script, Ilog_STAZIONI } from 'stores/models';

// import { parseFromString } from 'dom-parser';
// import { useRouter } from 'vue-router';

export default boot(async ({ router, urlPath }) => {
  /* { app, router, ... } */

  const sessioneStore = useSessioneStore();

  if (urlPath.startsWith('/clu5-simulazione'))
    sessioneStore.tipoSesssione = 'simulazione';
  else sessioneStore.tipoSesssione = 'test';

  switch (sessioneStore.tipoSesssione) {
    case 'test':
      if (process.env.DEV) {
        const el = { label: 'test 5', value: { idUser: 2, idSess: 75 } };
        Cookies.set('idUtente', el.value.idUser.toString());
        Cookies.set('idSessione', el.value.idSess.toString());
        Cookies.set('sessione', 'Test');
      }

      const allCookies = Cookies.getAll();

      if (allCookies.idUtente !== undefined) {
        Loading.show({
          message: 'Attendere, prego...',
        });
        const script = await api
          .get(
            `/test/script/?idUser=${allCookies.idUtente}&idSess=${allCookies.idSessione}`
          )
          .then((response) => {
            return response.data;
          })
          .catch((errore) => {
            console.log(errore);
            const erroreJSON = errore.toJSON();
            console.log(erroreJSON);
            Loading.hide();
            sessioneStore.IN_ERRORE = true;
            sessioneStore.errore = {
              idUser: allCookies.idUtente,
              idSess: allCookies.idSessione,
              errore: errore.response.data,
            };
          });
        Cookies.set('idUtente', '', { expires: -1 });
        Cookies.set('idSessione', '', { expires: -1 });
        Cookies.set('sessione', '', { expires: -1 });
        Cookies.remove('idUtente');
        Cookies.remove('idSessione');
        Cookies.remove('sessione');

        if (script) {
          const xmlDoc = new DOMParser().parseFromString(script, 'text/xml');
          const tagsToRemove = xmlDoc.getElementsByTagName(
            'situazionePrecedente'
          ) as HTMLCollection;
          if (tagsToRemove.length > 0) {
            if (tagsToRemove[0] && tagsToRemove[0].parentNode) {
              tagsToRemove[0].parentNode.removeChild(tagsToRemove[0]);
            }
          }
          const scriptXML = new XMLSerializer().serializeToString(xmlDoc);

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
            (scriptJSON as Script).test.stazioni.stazione.forEach(
              (stazione) => {
                let casi = stazione.caso || [];
                if (casi && !Array.isArray(casi)) {
                  casi = [casi]; // Assicura che caso sia sempre un array
                }

                casi.forEach((caso) => {
                  const espressione = caso.$.se;
                  if (espressione) {
                    try {
                      jsep(espressione);
                    } catch (error) {
                      const errorMessage = `Stazione "${stazione.$.ID}", condizione 'se=' : Errore nel parsing dell'espressione: ${espressione}. ${error}`;

                      sessioneStore.IN_ERRORE = true;
                      sessioneStore.errore = {
                        idUser: (scriptJSON as Script).test.$.idUser,
                        idSess: (scriptJSON as Script).test.$.sessionId,
                        errore: errorMessage,
                      };
                      router.replace('/erroreServer');
                      return;
                    }
                  }
                });
              }
            );

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
              Object.entries(sessioneStore.log_STAZIONI).forEach(
                ([id_stazione, stazione]) => {
                  sessioneStore.punteggiStazioni[id_stazione] =
                    stazione.punteggioStazione;
                  sessioneStore.DOMANDE_GIA_POSTE =
                    sessioneStore.DOMANDE_GIA_POSTE.concat(
                      Array.from(
                        Object.keys(stazione.domandeStato || []).map(
                          (idDomanda) => parseInt(idDomanda)
                        )
                      )
                    );
                }
              );
              // Notify.create({
              //   message: t('ripresaTest'),
              //   color: 'negative',
              //   position: 'bottom',
              // });
              sessioneStore.numero_stazione_corrente =
                Object.entries(sessioneStore.log_STAZIONI).length + 1;
            } else {
              sessioneStore.numero_stazione_corrente = 1;
            }
            sessioneStore.descrizioneSessione =
              scriptJSON.test.$.descrizione_sessione;
            const test = new Test(scriptJSON, scriptXML, storia_precedente);

            sessioneStore.test = test;
            sessioneStore.lingua = test.LINGUA;
            sessioneStore.numero_stazioni = (
              scriptJSON as Script
            ).test.stazioni.stazione.length;

            const esitoPositivo =
              await test.stazione_corrente.richiediDomandeServer();

            Loading.hide();
            if (!esitoPositivo) {
              router.replace('/erroreServer');
              return;
            }
          }
        }
        sessioneStore.sessioneAttiva = true;
      } else {
        sessioneStore.sessioneAttiva = false;
      }

      break;
    case 'simulazione':
      sessioneStore.sessioneAttiva = true;
      const match = urlPath.match(/id\=(\d+)/);
      const idDomanda = match ? match[1] : undefined;

      if (idDomanda !== undefined) {
        sessioneStore.tipoSesssione = 'simulazione';
        Loading.show({
          message: 'Attendere, prego...',
        });
        const domandaXML = await api
          .get('/test/simulazione/domanda', {
            params: { idDomanda },
          })
          .then((response) => {
            // const txt = document.createElement('textarea');
            // txt.innerHTML = response.data;
            // return txt.value;
            return response.data;
          })
          .catch((errore) => {
            Loading.hide();
            sessioneStore.errore = {
              idDomanda,
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
                idDomanda,
                errore,
              };
            });

          if (jsonDomanda) {
            const domande = [jsonDomanda];
            sessioneStore.domande = (domande as Array<object>)
              .map((value) => {
                const domande = (value as { sql: string; domanda: object })
                  .domanda;
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
        break;
      }
  }
  sessioneStore.counter = 0;
});
