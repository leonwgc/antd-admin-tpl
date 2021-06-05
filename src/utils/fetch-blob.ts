import fetch from '~/utils/fetch-common';

// 获取文件流
export const fetchBlob = (api, method = 'get', data = null, headers = null) => {
  return fetch(api, method, data, headers, true, {
    responseType: 'blob',
  }).then((xhr) => xhr.response);
};

// 文件流下载
export const download = (blob, fileName) => {
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = fileName;
  a.click();
};

// 文件流获取并下载
export const fetchAndDownload = (api, fileName, method = 'get', data = null, headers = null) => {
  return fetchBlob(api, method, data, headers).then((blob) => {
    download(blob, fileName);
  });
};
