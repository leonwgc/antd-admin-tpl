import React from 'react';
import ReactDOM from 'react-dom';
import { Provider, configureStore, useSelector } from 'simple-redux-store';
import { getEnv } from '~/utils/host';
import App from './App';

const store = configureStore(null, getEnv() === 'test');

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
