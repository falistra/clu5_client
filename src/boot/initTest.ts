import { boot } from 'quasar/wrappers';
import { Cookies } from 'quasar';

import xml2js from 'xml2js';
import { api } from 'boot/axios';

import { Test } from 'stores/Test';
import { Loading } from 'quasar';

import { useSessioneStore } from 'stores/sessione';
// import { useRouter } from 'vue-router';

export default boot(async (/* { router } */) => {
  /* { app, router, ... } */

  let allCookies = Cookies.getAll();

  const sessioneStore = useSessioneStore();
  Loading.show({
    message: 'Attendere, prego...',
  });

  if (!Cookies.has('simulazione')) {
    if (!(Cookies.has('idUtente') && Cookies.has('idSessione'))) {
      const options = [
        { label: 'test 1', value: { idUser: 2, idSess: 19 } },
        { label: 'test 2', value: { idUser: 2, idSess: 27 } },
        { label: 'test 3', value: { idUser: 2, idSess: 349 } },
        { label: 'test 4', value: { idUser: 2, idSess: 194 } },
        { label: 'test 5', value: { idUser: 2, idSess: 203 } },
        { label: 'test 6', value: { idUser: 2, idSess: 241 } },
        { label: 'test 7', value: { idUser: 2, idSess: 249 } },
        { label: 'test 8', value: { idUser: 2, idSess: 268 } },
        { label: 'test 9', value: { idUser: 2, idSess: 261 } },
        { label: 'test 10', value: { idUser: 2, idSess: 324 } },
      ];
      const el = options[Math.floor(Math.random() * options.length)];
      Cookies.set('idUtente', el.value.idUser.toString());
      Cookies.set('idSessione', el.value.idSess.toString());
    }
    allCookies = Cookies.getAll();
    const script = await api
      .get(
        `/test/script/?idUser=${allCookies.idUtente}&idSess=${allCookies.idSessione}`
      )
      .then((response) => {
        // Notify.create({
        //   message: 'Dati ricevuti dal server',
        //   color: 'green-6',
        // });

        Cookies.set('idUtente', '', { expires: -1 });
        Cookies.set('idSessione', '', { expires: -1 });

        return response.data;
      })
      .catch(() => {
        // $q.notify({
        //   color: 'negative',
        //   position: 'top',
        //   message: 'Loading failed',
        //   icon: 'report_problem',
        // });
      });

    const test = new Test(
      await xml2js
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
        .catch(function (err) {
          console.error(err);
        }),
      script
    );

    sessioneStore.test = test;
    sessioneStore.lingua = test.LINGUA;

    await test.stazione_corrente.richiediDomandeServer();
    Loading.hide();
  } else {
    const domandaXML = await api
      .get('/test/simulazione/domanda', {
        params: { idDomanda: allCookies.simulazione },
      })
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

    const jsonDomanda = await xml2js
      .parseStringPromise(domandaXML, {
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
    console.log(jsonDomanda);

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
        return [tipo as string, script as object, d[0][1], index + 1] as [
          string,
          object,
          object,
          number
        ];
      });
    Loading.hide();
  }

  sessioneStore.counter = 0;
});
