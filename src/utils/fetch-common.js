import qs from 'qs';

// 通用的fetch

function hasContentType(headers) {
  return Object.keys(headers).some((name) => {
    return name.toLowerCase() === 'content-type';
  });
}

// application/x-www-form-urlencoded / application/json
function setHeaders(xhr, headers) {
  headers = headers || {};
  if (!hasContentType(headers)) {
    headers['Content-Type'] = 'application/json';
  }
  Object.keys(headers).forEach((name) => {
    if (headers[name]) {
      xhr.setRequestHeader(name, headers[name]);
    }
  });
}
function objectToQueryString(data) {
  return isObject(data) ? getQueryString(data) : data;
}

function isObject(data) {
  return Object.prototype.toString.call(data) === '[object Object]';
}

function getQueryString(object) {
  return qs.stringify(object, { indices: false });
}

function fetch(url, options) {
  return new Promise((resolve, reject) => {
    var xhr = new XMLHttpRequest();
    xhr.open(options.method, url);
    xhr.withCredentials = options.withCredentials;
    if (options.xhr) {
      for (let key of Object.keys(options.xhr)) {
        xhr[key] = options.xhr[key];
      }
    }

    setHeaders(xhr, options.headers);
    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        resolve(xhr);
      } else {
        reject(xhr);
      }
    };
    xhr.onerror = reject;
    xhr.send(options.data);
  });
}

const fetchCommon = (
  api,
  method = 'get',
  data = null,
  headers = null,
  withCredentials = true,
  xhr = null
) => {
  let url = api;
  if (method === 'get') {
    if (data) {
      url += `?${objectToQueryString(data)}`;
      data = null;
    }
  } else {
    if (headers && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
      data = objectToQueryString(data);
    } else {
      try {
        data = JSON.stringify(data);
      } catch (ex) {}
    }
  }

  return fetch(url, {
    method,
    data,
    headers,
    withCredentials,
    xhr,
  });
};

export default fetchCommon;
