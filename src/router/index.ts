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

      const d = (jsonScript.insiemi_domande.domande as Array<object>)
        .map((value) => {
          const domande = (value as { sql: string; domanda: object }).domanda;
          return Array.isArray(domande) ? domande : [domande]; // quando c'e' una sola domanda non e' un array
        })
        .reduce((accumulator, value) => accumulator.concat(value), []) // flat
        .map((domanda) => {
          const d = Object.entries(domanda);
          const tipo = d[1][0];
          const script_domanda = domanda[tipo];
          return { tipo, script: script_domanda, proprieta: d[0][1] };
        });

      console.log(d);

      // const domande = [];
      // script.forEach((element: Array<object>) => {
      //   element.domanda.array.forEach((element) => {
      //     domande.push(element);
      //   });
      // });
      // console.log(script);

      const jsonData = await xml2js
        .parseStringPromise(dataXML.xmlData, {
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
      console.log(sessioneStore.domande);
      return { path: sessioneStore.domande[0][0] };
    }
  });

  return Router;
});
