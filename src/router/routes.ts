import { RouteRecordRaw } from 'vue-router';
import DomandaSceltaSingola from '../pages/DomandaSceltaSingola.vue';
import DomandaRiordino from '../pages/DomandaRiordino.vue';
import DomandaScritturaLibera from '../pages/DomandaScritturaLibera.vue';
import DomandaComprensioneTesto from '../pages/DomandaComprensioneTesto.vue';
import DomandaSceltaMultipla from '../pages/DomandaSceltaMultipla.vue';
import DomandaRiempimentoLibero from '../pages/DomandaRiempimentoLibero.vue';
import DomandaRiempimentoTesto from '../pages/DomandaRiempimentoTesto.vue';
import DomandaRiempimentoTestoLibero from '../pages/DomandaRiempimentoTestoLibero.vue';
import DomandaOutputStudente from '../pages/DomandaOutputStudente.vue';
import DomandaAbbinamentoMultiplo from '../pages/DomandaAbbinamentoMultiplo.vue';
import DomandaAbbinamentoSingolo from '../pages/DomandaAbbinamentoSingolo.vue';
import DomandaWordPool from '../pages/DomandaWordPool.vue';

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
    path: '/',
    component: () => import('../layouts/MainLayout.vue'),
    children: [
      {
        path: 'domandasceltasingola/:id',
        name: 'domandasceltasingola',
        meta: { keepAlive: true }, // use cache
        component: DomandaSceltaSingola,
      },
      {
        path: 'domandariordino/:id',
        name: 'domandariordino',
        meta: { keepAlive: true }, // use cache
        component: DomandaRiordino,
      },
      {
        path: 'domandascritturalibera/:id',
        name: 'domandascritturalibera',
        meta: { keepAlive: true }, // use cache
        component: DomandaScritturaLibera,
      },
      {
        path: 'domandacomprensionetesto/:id',
        name: 'domandacomprensionetesto',
        meta: { keepAlive: true }, // use cache
        component: DomandaComprensioneTesto,
      },
      {
        path: 'domandasceltamultipla/:id',
        name: 'domandasceltamultipla',
        meta: { keepAlive: true }, // use cache
        component: DomandaSceltaMultipla,
      },

      {
        path: 'domandariempimentotesto/:id',
        name: 'domandariempimentotesto',
        meta: { keepAlive: true }, // use cache
        component: DomandaRiempimentoTesto,
      },
      {
        path: 'domandariempimentotestolibero/:id',
        name: 'domandariempimentotestolibero',
        meta: { keepAlive: true }, // use cache
        component: DomandaRiempimentoTestoLibero,
      },
      {
        path: 'domandaRiempimentoLibero/:id',
        name: 'domandaRiempimentoLibero',
        meta: { keepAlive: true }, // use cache
        component: DomandaRiempimentoLibero,
      },
      {
        path: 'domandaoutputstudente/:id',
        name: 'domandaoutputstudente',
        meta: { keepAlive: true }, // use cache
        component: DomandaOutputStudente,
      },
      {
        path: 'domandaabbinamentomultiplo/:id',
        name: 'domandaabbinamentomultiplo',
        meta: { keepAlive: true }, // use cache
        component: DomandaAbbinamentoMultiplo,
      },
      {
        path: 'domandaabbinamentosingolo/:id',
        name: 'domandaabbinamentosingolo',
        meta: { keepAlive: true }, // use cache
        component: DomandaAbbinamentoSingolo,
      },
      {
        path: 'domandawordpool/:id',
        name: 'domandawordpool',
        meta: { keepAlive: true }, // use cache
        component: DomandaWordPool,
      },
      {
        path: 'log',
        name: 'log',
        meta: { keepAlive: true }, // use cache
        component: () => import('pages/MostraLog.vue'),
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
