import * as qs from 'qs';

// object to form-urlencoded string
export function getQueryString(object) {
  return qs.stringify(object, { indices: false });
}

// location.search to object
export function getURLParams() {
  return qs.parse(location.search.slice(1));
}

export function getSearchParams(search = '') {
  return qs.parse(search);
}

// jsbridge set title
export const setTitle = (title = '') => {
  document.title = title;
};

export const isValidPhone = (tel = '') => {
  return /^1[3|4|5|8|7|9][0-9]\d{8}$/.test(tel);
};

export const isValidSMSCode = (code = '') => {
  return /^\d{6}$/.test(code);
};

export const responseCheck = (res) => {
  return new Promise((resolve, reject) => {
    let code = Number(res.code);
    if (code) return reject(res);
    resolve(res);
  });
};
