import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
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
        path: 'domandariempimentotestolibero/:id',
        name: 'domandariempimentotestolibero',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/DomandaRiempimentoTestoLibero.vue'),
      },
      {
        path: 'domandaRiempimentoLibero/:id',
        name: 'domandaRiempimentoLibero',
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
        component: () => import('src/pages/DomandaAbbinamentoMultiplo.vue'),
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
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
