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
        path: 'domandasceltasingola/:id',
        name: 'domandasceltasingola',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaSceltaSingola.vue'),
      },
      {
        path: 'domandariordino/:id',
        name: 'domandariordino',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiordino.vue'),
      },
      {
        path: 'domandascritturalibera/:id',
        name: 'domandascritturalibera',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaScritturaLibera.vue'),
      },
      {
        path: 'domandacomprensionetesto/:id',
        name: 'domandacomprensionetesto',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaComprensioneTesto.vue'),
      },
      {
        path: 'domandasceltamultipla/:id',
        name: 'domandasceltamultipla',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaSceltaMultipla.vue'),
      },

      {
        path: 'domandariempimentotesto/:id',
        name: 'domandariempimentotesto',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoTesto.vue'),
      },
      {
        path: 'domandariempimentotestoLibero/:id',
        name: 'domandariempimentotestoLibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoTestoLibero.vue'),
      },
      {
        path: 'domandariempimentolibero/:id',
        name: 'domandariempimentolibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoLibero.vue'),
      },
      {
        path: 'domandaoutputstudente/:id',
        name: 'domandaoutputstudente',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaOutputStudente.vue'),
      },
      {
        path: 'domandaabbinamentomultiplo/:id',
        name: 'domandaabbinamentomultiplo',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaAbbinamentoMultiplo.vue'),
      },
      {
        path: 'domandaabbinamentosingolo/:id',
        name: 'domandaabbinamentosingolo',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaAbbinamentoSingolo.vue'),
      },
      {
        path: 'domandawordpool/:id',
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
        path: 'domandariempimentotestoLibero/:id',
        name: 'simulazione_domandariempimentotestoLibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoTestoLibero.vue'),
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
