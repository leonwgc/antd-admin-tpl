import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, configureStore } from 'simple-redux-store';
import { getSetting } from '~/utils/helper';
import { getEnv } from '~/utils/host';
import App from './App';

const colors = [
  { name: 'green', color: '#08bc63' },
  { name: 'red', color: '#f5222d' },
  {
    name: 'blue',
    color: '#004bcc',
  },
  {
    name: 'purple',
    color: '#9254de',
  },
  {
    name: 'yellow',
    color: 'rgb(250, 173, 20)',
  },
];

type Color = {
  name: string;
  color: string;
};

type StoreData = {
  menuCollapsed: boolean;
  isSettingVisile: boolean;
  colors: Color[];
  color: string; //当前颜色名称
};

const initData: StoreData = {
  menuCollapsed: false,
  isSettingVisile: false,
  colors,
  color: 'blue', //默认取蓝色
  ...getSetting(),
};

const store = configureStore(initData, getEnv() === 'test');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
