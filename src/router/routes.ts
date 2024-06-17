import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'DomandaSceltaSingola',
        component: () => import('pages/DomandaSceltaSingola.vue'),
      },
      {
        path: 'DomandaRiordino',
        component: () => import('pages/DomandaRiordino.vue'),
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
