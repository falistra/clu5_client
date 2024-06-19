import { route } from 'quasar/wrappers';
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router';

import routes from './routes';
import xml2js from 'xml2js';
import { useSessioneStore } from 'stores/sessione';

import dataXML from './data';

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Router instance.
 */

export default route(function (/* { store, ssrContext } */) {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === 'history'
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  Router.beforeEach(async (to) => {
    if (to.path == '/') {
      const xmlData = `
      <Domande>
      ${dataXML.DomandaSceltaSingola}
      ${dataXML.DomandaRiordino}
      ${dataXML.DomandaScritturaLibera}
      ${dataXML.DomandaComprensioneTesto}
      ${dataXML.DomandaSceltaMultipla}

      ${dataXML.DomandaRiempimentoTesto}
      ${dataXML.DomandaRiempimentoTestoLibero}
      ${dataXML.DomandaRiempimentoLibero}
      ${dataXML.DomandaOutputStudente}
      ${dataXML.DomandaAbbinamentoMultiplo}
      ${dataXML.DomandaAbbinamentoSingolo}
      ${dataXML.DomandaWordPool}
      </Domande>
      `;

      const jsonData = await xml2js
        .parseStringPromise(xmlData, {
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
      sessioneStore.domande = Object.entries(jsonData.Domande);
      return { path: sessioneStore.domande[0][0] };
    }
  });

  return Router;
});
