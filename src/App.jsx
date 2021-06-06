import React, { Suspense, useState, useEffect } from 'react';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn'; // load on demand
import { Route, Switch, Redirect, HashRouter } from 'react-router-dom';
import { Provider, configureStore } from 'simple-redux-store';
import dayjs from 'dayjs';
import { useCookieState } from 'ahooks';
import routes from './routes';
import usePageTitle from '~/hooks/usePageTitle';
import './App.less';

dayjs.locale('zh-cn');

const App = () => {
  const store = configureStore();
  usePageTitle('admin');
  const [name] = useCookieState('auth');

  return (
    <Provider store={store}>
      <ConfigProvider locale={zhCN}>
        <HashRouter history={history}>
          <Suspense fallback={<Spin spinning />}>
            <Switch>
              <Route exact path="/">
                <Redirect to={name ? '/biz/customer-list' : '/login'} />
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
        </HashRouter>
      </ConfigProvider>
    </Provider>
  );
};

export default App;
