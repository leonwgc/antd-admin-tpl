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
  {
    path: '/micro/hooks-pc',
    component: lazy(() => import('../micro/App')),
  },
];

export default routes;
