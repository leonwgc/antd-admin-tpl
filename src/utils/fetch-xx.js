import { getHostPrefix } from './host';
import fetchFactory from './fetch';

const hostname = location.hostname;

export const host = hostname.indexOf('xx.com') == -1 ? '' : `//${getHostPrefix()}api.xx.com`;

export const get = fetchFactory('get', host);
export const post = fetchFactory('post', host);
export const put = fetchFactory('put', host);
export const del = fetchFactory('delete', host);
