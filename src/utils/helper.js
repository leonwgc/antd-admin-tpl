import * as qs from 'qs';
import { setData, getData } from 'simple-browser-store';

const key = '__admin__';

export const getSetting = () => {
  return getData('localStorage', key);
};

export const saveSetting = (data) => {
  setData('localStorage', key, data);
};

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

const cssRegex = /\.css$/i;
const jsRegex = /\.js$/i;

export const loadResource = (url) => {
  return new Promise((resolve, reject) => {
    if (url) {
      let el;
      let isCss = false;
      if (cssRegex.test(url)) {
        isCss = true;
        el = document.createElement('link');
        el.rel = 'stylesheet';
        el.href = url;
      } else if (jsRegex.test(url)) {
        el = document.createElement('script');
        el.src = url;
      }
      el.id = url;

      el.onload = resolve;

      if (isCss) {
        const head = document.getElementsByTagName('head')[0];
        head.appendChild(el);
      } else {
        document.body.appendChild(el);
      }
    } else {
      reject('url is required');
    }
  });
};
