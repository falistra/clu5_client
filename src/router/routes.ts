import { RouteRecordRaw } from 'vue-router';
// import DomandaSceltaSingola from '../pages/DomandaSceltaSingola.vue';
// import DomandaRiordino from '../pages/DomandaRiordino.vue';
// import DomandaScritturaLibera from '../pages/DomandaScritturaLibera.vue';
// import DomandaComprensioneTesto from '../pages/DomandaComprensioneTesto.vue';
// import DomandaSceltaMultipla from '../pages/DomandaSceltaMultipla.vue';
// import DomandaRiempimentoLibero from '../pages/DomandaRiempimentoLibero.vue';
// import DomandaRiempimentoTesto from '../pages/DomandaRiempimentoTesto.vue';
// import DomandaRiempimentoTestoLibero from '../pages/DomandaRiempimentoTestoLibero.vue';
// import DomandaOutputStudente from '../pages/DomandaOutputStudente.vue';
// import DomandaAbbinamentoMultiplo from '../pages/DomandaAbbinamentoMultiplo.vue';
// import DomandaAbbinamentoSingolo from '../pages/DomandaAbbinamentoSingolo.vue';
// import DomandaWordPool from '../pages/DomandaWordPool.vue';

const routes: RouteRecordRaw[] = [
  {
    path: '/fineTest',
    component: () => import('../layouts/EndLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/EndTest.vue'),
      },
    ],
  },
  {
    path: '/fineTestFuori',
    component: () => import('../pages/FineTestFuori.vue'),
  },
  {
    path: '/esc',
    component: () => import('../pages/PremutoEsc.vue'),
  },
  {
    path: '/testNonDisponibile',
    component: () => import('../pages/TestNonDisponibile.vue'),
  },
  {
    path: '/erroreServer',
    component: () => import('../layouts/ErrorLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('../pages/ErroreServer.vue'),
      },
    ],
  },

  {
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: 'esc',
        component: () => import('../pages/PremutoEsc.vue'),
      },
      {
        path: 'domandasceltasingola/:st/:id',
        name: 'domandasceltasingola',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaSceltaSingola.vue'),
      },
      {
        path: 'domandariordino/:st/:id',
        name: 'domandariordino',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiordino.vue'),
      },
      {
        path: 'domandascritturalibera/:st/:id',
        name: 'domandascritturalibera',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaScritturaLibera.vue'),
      },
      {
        path: 'domandacomprensionetesto/:st/:id',
        name: 'domandacomprensionetesto',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaComprensioneTesto.vue'),
      },
      {
        path: 'domandasceltamultipla/:st/:id',
        name: 'domandasceltamultipla',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaSceltaMultipla.vue'),
      },

      {
        path: 'domandariempimentotesto/:st/:id',
        name: 'domandariempimentotesto',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoTesto.vue'),
      },
      {
        path: 'domandariempimentotestolibero/:st/:id',
        name: 'domandariempimentotestolibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoTestoLibero.vue'),
      },
      {
        path: 'domandariempimentotestoLibero/:st/:id',
        name: 'domandariempimentotestoLibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoTestoLibero.vue'),
      },
      {
        path: 'domandariempimentolibero/:st/:id',
        name: 'domandariempimentolibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoLibero.vue'),
      },
      {
        path: 'domandaRiempimentoLibero/:st/:id',
        name: 'domandaRiempimentoLibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoLibero.vue'),
      },
      {
        path: 'domandaoutputstudente/:st/:id',
        name: 'domandaoutputstudente',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaOutputStudente.vue'),
      },
      {
        path: 'domandaabbinamentomultiplo/:st/:id',
        name: 'domandaabbinamentomultiplo',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaAbbinamentoMultiplo.vue'),
      },
      {
        path: 'domandaabbinamentosingolo/:st/:id',
        name: 'domandaabbinamentosingolo',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaAbbinamentoSingolo.vue'),
      },
      {
        path: 'domandawordpool/:st/:id',
        name: 'domandawordpool',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaWordPool.vue'),
      },
      {
        path: 'log',
        name: 'log',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/MostraLog.vue'),
      },
    ],
  },
  {
    path: '/simulazione',
    component: () => import('../layouts/SimulazioneLayout.vue'),
    children: [
      {
        path: 'domandasceltasingola/:id',
        name: 'simulazione_domandasceltasingola',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaSceltaSingola.vue'),
      },
      {
        path: 'domandariordino/:id',
        name: 'simulazione_domandariordino',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiordino.vue'),
      },
      {
        path: 'domandascritturalibera/:id',
        name: 'simulazione_domandascritturalibera',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaScritturaLibera.vue'),
      },
      {
        path: 'domandacomprensionetesto/:id',
        name: 'simulazione_domandacomprensionetesto',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaComprensioneTesto.vue'),
      },
      {
        path: 'domandasceltamultipla/:id',
        name: 'simulazione_domandasceltamultipla',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaSceltaMultipla.vue'),
      },

      {
        path: 'domandariempimentotesto/:id',
        name: 'simulazione_domandariempimentotesto',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoTesto.vue'),
      },
      {
        path: 'domandariempimentotestolibero/:id',
        name: 'simulazione_domandariempimentotestolibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoTestoLibero.vue'),
      },
      {
        path: 'domandariempimentotestoLibero/:id',
        name: 'simulazione_domandariempimentotestoLibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoTestoLibero.vue'),
      },
      {
        path: 'domandaRiempimentoLibero/:id',
        name: 'simulazione_domandaRiempimentoLibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoLibero.vue'),
      },
      {
        path: 'domandaRiempimentolibero/:id',
        name: 'simulazione_domandariempimentolibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoLibero.vue'),
      },
      {
        path: 'domandaoutputstudente/:id',
        name: 'simulazione_domandaoutputstudente',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaOutputStudente.vue'),
      },
      {
        path: 'domandaabbinamentomultiplo/:id',
        name: 'simulazione_domandaabbinamentomultiplo',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaAbbinamentoMultiplo.vue'),
      },
      {
        path: 'domandaabbinamentosingolo/:id',
        name: 'simulazione_domandaabbinamentosingolo',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaAbbinamentoSingolo.vue'),
      },
      {
        path: 'domandawordpool/:id',
        name: 'simulazione_domandawordpool',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaWordPool.vue'),
      },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('../pages/ErrorNotFound.vue'),
  },
];

export default routes;
