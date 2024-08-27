import { boot } from 'quasar/wrappers';
// import dataXML from './data';
import xml2js from 'xml2js';
import { api } from 'boot/axios';
import { useSessioneStore } from 'stores/sessione';

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async () => {
  /* { app, router, ... } */

  const script = await api
    .get('http://localhost/clu4/test/script/?idUser=2&idSess=20')
    .then((response) => {
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

  const sessioneStore = useSessioneStore();
  sessioneStore.script = await xml2js
    .parseStringPromise(script, {
      explicitArray: false,
      trim: true,
    })
    .then(function (result) {
      return result;
    })
    .catch(function (err) {
      console.error(err);
    });

  //  console.log(sessioneStore.script.test.stazioni.stazione[0].$.ID);
  // console.log(
  //   sessioneStore.script.test.stazioni.stazione[0].altrimenti?.azione.$.vai_a
  // );
  // console.log(
  //   sessioneStore.script.test.stazioni.stazione[0].caso?.[0].azione.$.vai_a
  // );

  // console.log(
  //   sessioneStore.script.test.stazioni.stazione[0].insieme_domande.domande[0].$
  //     .tecnica
  // );

  console.log(sessioneStore.script.test.stazioni.stazione[0]);

  // ===============================================================================
  const parms = {
    idUser: '2',
    idSession: '20',
    idTest: '756',
    idStazione: 'A2',
    lingua: '1',
    set_query:
      '[{"peso":"1","quantita":"2","parms":{"livello":{"type":"Literal","value":2,"raw":"2"},"tecnica":{"type":"Literal","value":7,"raw":"7"},"tag":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"Literal","value":4,"raw":"4"},"right":{"type":"Literal","value":5,"raw":"5"}},"right":{"type":"Literal","value":6,"raw":"6"}},"right":{"type":"Literal","value":7,"raw":"7"}},"right":{"type":"Literal","value":8,"raw":"8"}},"right":{"type":"Literal","value":9,"raw":"9"}},"right":{"type":"Literal","value":10,"raw":"10"}},"right":{"type":"Literal","value":11,"raw":"11"}},"right":{"type":"Literal","value":12,"raw":"12"}},"right":{"type":"Literal","value":17,"raw":"17"}},"right":{"type":"Literal","value":18,"raw":"18"}},"right":{"type":"Literal","value":19,"raw":"19"}},"right":{"type":"Literal","value":20,"raw":"20"}},"right":{"type":"Literal","value":21,"raw":"21"}},"right":{"type":"Literal","value":22,"raw":"22"}},"right":{"type":"Literal","value":23,"raw":"23"}},"right":{"type":"Literal","value":24,"raw":"24"}},"right":{"type":"Literal","value":25,"raw":"25"}},"specializzazione":{"type":"Literal","value":1,"raw":"1"}}},{"peso":"0.5","quantita":"8","parms":{"livello":{"type":"Literal","value":2,"raw":"2"},"tecnica":{"type":"Literal","value":1,"raw":"1"},"tag":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"BinaryExpression","operator":",","left":{"type":"Literal","value":4,"raw":"4"},"right":{"type":"Literal","value":5,"raw":"5"}},"right":{"type":"Literal","value":6,"raw":"6"}},"right":{"type":"Literal","value":7,"raw":"7"}},"right":{"type":"Literal","value":8,"raw":"8"}},"right":{"type":"Literal","value":9,"raw":"9"}},"right":{"type":"Literal","value":10,"raw":"10"}},"right":{"type":"Literal","value":11,"raw":"11"}},"right":{"type":"Literal","value":12,"raw":"12"}},"right":{"type":"Literal","value":17,"raw":"17"}},"right":{"type":"Literal","value":18,"raw":"18"}},"right":{"type":"Literal","value":19,"raw":"19"}},"right":{"type":"Literal","value":20,"raw":"20"}},"right":{"type":"Literal","value":21,"raw":"21"}},"right":{"type":"Literal","value":22,"raw":"22"}},"right":{"type":"Literal","value":23,"raw":"23"}},"right":{"type":"Literal","value":24,"raw":"24"}},"right":{"type":"Literal","value":25,"raw":"25"}},"right":{"type":"Literal","value":26,"raw":"26"}},"specializzazione":{"type":"Literal","value":1,"raw":"1"}}},{"peso":"1","quantita":"1","parms":{"livello":{"type":"Literal","value":2,"raw":"2"},"tecnica":{"type":"Literal","value":5,"raw":"5"},"tag":{"type":"Literal","value":28,"raw":"28"},"specializzazione":{"type":"Literal","value":1,"raw":"1"}}},{"peso":"1","quantita":"3","parms":{"livello":{"type":"Literal","value":2,"raw":"2"},"tecnica":{"type":"Literal","value":1,"raw":"1"},"tag":{"type":"Literal","value":1,"raw":"1"},"specializzazione":{"type":"Literal","value":1,"raw":"1"}}},{"peso":"5","quantita":"1","parms":{"livello":{"type":"Literal","value":2,"raw":"2"},"tecnica":{"type":"Literal","value":2,"raw":"2"},"tag":{"type":"Literal","value":1,"raw":"1"},"specializzazione":{"type":"Literal","value":1,"raw":"1"}}}]',
    domande_gia_poste: '[]',
  };
  const domande = await api
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

  const jsonDomande = await xml2js
    .parseStringPromise(domande, {
      explicitArray: false,
      trim: true,
    })
    .then(function (result) {
      return result;
    })
    .catch(function (err) {
      console.error(err);
    });

  sessioneStore.domande = (jsonDomande.insiemi_domande.domande as Array<object>)
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
});
