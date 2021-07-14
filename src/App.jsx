import React, { Suspense, useEffect, useState } from 'react';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { useUpdateStore, useSelector } from 'simple-redux-store';
import { ThemeProvider } from 'styled-components';
import dayjs from 'dayjs';
import routes from './routes';
import usePageTitle from '~/hooks/usePageTitle';
import * as service from '~/service';
import './App.less';

dayjs.locale('zh-cn');

const App = () => {
  usePageTitle('后台管理');
  const updateStore = useUpdateStore();
  const { color = '', colors } = useSelector((state) => state.app);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    service
      .getMenus()
      .then((menuData) => {
        // match path
        updateStore({ currentMenu: menuData });

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <ThemeProvider theme={{ color: colors.find((c) => c.name === color).color }}>
      <ConfigProvider locale={zhCN}>
        <Router>
          <Suspense fallback={<Spin spinning />}>
            <Switch>
              <Route exact path="/">
                <Redirect to={'/user/add'} />
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
        </Router>
      </ConfigProvider>
    </ThemeProvider>
  );
};

export default App;
