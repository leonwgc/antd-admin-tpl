import { lazy } from 'react';

const routes = [
  {
    path: `/user/add`,
    component: lazy(() => import('./Add')),
  },
  {
    path: `/user/List`,
    component: lazy(() => import('./List')),
  },
];

export default routes;
