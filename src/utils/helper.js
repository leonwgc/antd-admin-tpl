import * as qs from 'qs';

// object to form-urlencoded string
export function getQueryString(object) {
  return qs.stringify(object, { indices: false });
}

// location.search to object
export function getURLParams() {
  return qs.parse(location.search.slice(1));
}

export const setTitle = (title = '') => {
  document.title = title;
};

export const isValidPhone = (tel = '') => {
  return /^1\d{10}$/.test(tel);
};

export const isValidSMSCode = (code = '') => {
  return /^\d{6}$/.test(code);
};
