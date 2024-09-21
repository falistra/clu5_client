import { boot } from 'quasar/wrappers';
import xml2js from 'xml2js';
import { api } from 'boot/axios';
import { useSessioneStore } from 'stores/sessione';
import { Test } from 'stores/Test';
import { Notify } from 'quasar';

export default boot(async () => {
  /* { app, router, ... } */

  const script = await api
    .get('http://localhost/clu4/test/script/?idUser=2&idSess=20')
    .then((response) => {
      Notify.create({
        message: 'Dati ricevuti dal server',
        color: 'green-6',
      });
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

  const test = new Test(
    await xml2js
      .parseStringPromise(script, {
        explicitArray: false,
        trim: true,
      })
      .then(function (result) {
        return result;
      })
      .catch(function (err) {
        console.error(err);
      })
  );

  sessioneStore.test = test;

  await test.stazione_corrente.richiediDomandeServer();
});
