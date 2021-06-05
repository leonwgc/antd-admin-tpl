import React, { Suspense, useState, useEffect } from 'react';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn'; // load on demand
import { Route, Switch, Redirect } from 'react-router-dom';
import { ConnectedRouter, Provider, configureStore, history } from 'simple-redux-store';
import dayjs from 'dayjs';
import routes from './routes';
import usePageTitle from '~/hooks/usePageTitle';
import './App.less';

dayjs.locale('zh-cn');

const App = () => {
  const store = configureStore();

  usePageTitle('灵工平台');

  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <ConnectedRouter history={history}>
          <Suspense fallback={<Spin spinning />}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login" />
              </Route>
              {routes.map((route, idx) => (
                <Route
                  key={idx}
                  path={route.path}
                  exact={route.exact}
                  component={route.component}
                />
              ))}
            </Switch>
          </Suspense>
        </ConnectedRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
