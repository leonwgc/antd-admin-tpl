import { getHostPrefix } from '~/utils/host';
import { get, post, put, del } from 'xhr-fetch-lib';

import menuData from './menuData';

export const getMenus = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(menuData);
    }, 200);
  });
};
