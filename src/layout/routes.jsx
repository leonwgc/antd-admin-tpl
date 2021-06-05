import { lazy } from 'react';

const routes = [
  {
    path: `/biz/page1`,
    component: lazy(() => import('../biz/Page1')),
  },
  {
    path: `/biz/add-customer`,
    component: lazy(() => import('../biz/AddCustomer')),
  },
  {
    path: `/biz/customer-list`,
    component: lazy(() => import('../biz/CustomerList')),
  },
];

export default routes;
