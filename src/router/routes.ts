import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'domandasceltasingola/:id',
        name: 'domandasceltasingola',
        component: () => import('pages/DomandaSceltaSingola.vue'),
      },
      {
        path: 'domandariordino/:id',
        name: 'domandariordino',
        component: () => import('pages/DomandaRiordino.vue'),
      },
      {
        path: 'domandascritturalibera/:id',
        name: 'domandascritturalibera',
        component: () => import('pages/DomandaScritturaLibera.vue'),
      },
      {
        path: 'domandacomprensionetesto/:id',
        name: 'domandacomprensionetesto',
        component: () => import('pages/DomandaComprensioneTesto.vue'),
      },
      {
        path: 'domandasceltamultipla/:id',
        component: () => import('pages/DomandaSceltaMultipla.vue'),
      },

      {
        path: 'domandariempimentotesto/:id',
        name: 'domandariempimentotesto',
        component: () => import('pages/DomandaRiempimentoTesto.vue'),
      },
      {
        path: 'domandariempimentotestolibero/:id',
        name: 'domandariempimentotestolibero',
        component: () => import('pages/DomandaRiempimentoTestoLibero.vue'),
      },
      {
        path: 'domandaRiempimentoLibero/:id',
        name: 'domandariempimentolibero',
        component: () => import('pages/DomandaRiempimentoLibero.vue'),
      },
      {
        path: 'domandaoutputstudente/:id',
        name: 'domandaoutputstudente',
        component: () => import('pages/DomandaOutputStudente.vue'),
      },
      {
        path: 'domandaabbinamentomultiplo/:id',
        name: 'domandaabbinamentomultiplo',
        component: () => import('pages/DomandaAbbinamentoMultiplo.vue'),
      },
      {
        path: 'domandaabbinamentosingolo/:id',
        name: 'domandaabbinamentosingolo',
        component: () => import('pages/DomandaAbbinamentoSingolo.vue'),
      },
      {
        path: 'domandawordpool/:id',
        name: 'domandawordpool',
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
