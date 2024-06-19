import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'domandasceltasingola',
        component: () => import('pages/DomandaSceltaSingola.vue'),
      },
      {
        path: 'domandariordino',
        component: () => import('pages/DomandaRiordino.vue'),
      },
      {
        path: 'domandascritturalibera',
        component: () => import('pages/DomandaScritturaLibera.vue'),
      },
      {
        path: 'domandacomprensionetesto',
        component: () => import('pages/DomandaComprensioneTesto.vue'),
      },
      {
        path: 'domandasceltamultipla',
        component: () => import('pages/DomandaSceltaMultipla.vue'),
      },

      {
        path: 'domandariempimentotesto',
        component: () => import('pages/DomandaRiempimentoTesto.vue'),
      },
      {
        path: 'domandariempimentotestolibero',
        component: () => import('pages/DomandaRiempimentoTestoLibero.vue'),
      },
      {
        path: 'domandaRiempimentoLibero',
        component: () => import('pages/DomandaRiempimentoLibero.vue'),
      },
      {
        path: 'domandaoutputstudente',
        component: () => import('pages/DomandaOutputStudente.vue'),
      },
      {
        path: 'domandaabbinamentomultiplo',
        component: () => import('pages/DomandaAbbinamentoMultiplo.vue'),
      },
      {
        path: 'domandaabbinamentosingolo',
        component: () => import('pages/DomandaAbbinamentoSingolo.vue'),
      },
      {
        path: 'domandawordpool',
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
