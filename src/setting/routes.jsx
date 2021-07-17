import { lazy } from 'react';

const routes = [
  {
    path: `/setting/Page1`,
    component: lazy(() => import('./Page1')),
  },
  {
    path: `/setting/Page2`,
    component: lazy(() => import('./Page2')),
  },
];

export default routes;
