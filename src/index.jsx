import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, configureStore } from 'simple-redux-store';
import { getSetting } from '~/utils/helper';
import { getEnv } from '~/utils/host';
import App from './App';

const store = configureStore(
  { menuCollapsed: false, isSettingVisile: false, ...getSetting() },
  getEnv() === 'test'
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
