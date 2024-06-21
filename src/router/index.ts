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
// import { IDomanda } from 'pages/models';

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

  Router.beforeEach(async (to, from) => {
    console.log(to);
    console.log(from);

    if (to.path == '/') {
      const sessioneStore = useSessioneStore();

      const jsonScript = await xml2js
        .parseStringPromise(dataXML.script, {
          explicitArray: false,
          trim: true,
        })
        .then(function (result) {
          return result;
        })
        .catch(function (err) {
          console.error(err);
        });

      sessioneStore.domande = (
        jsonScript.insiemi_domande.domande as Array<object>
      )
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
      // return { tipo, script, props: d[0][1] as object } as IDomanda;
      const domanda = sessioneStore.domande[0] as [string, object, object];
      return { path: `${domanda[0]}/0` };
    }
  });

  return Router;
});
