import { lazy } from 'react';

const routes = [
  {
    path: `/login`,
    component: lazy(() => import('./auth/Login')),
  },
  {
    path: `/:admin`,
    component: lazy(() => import('./layout/Layout')),
  },
];

export default routes;
