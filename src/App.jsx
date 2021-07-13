import React, { Suspense, useEffect, useState } from 'react';
import { ConfigProvider, Spin } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import 'dayjs/locale/zh-cn';
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom';
import { getSearchParams } from '~/utils/helper';
import { useSelector, useUpdateStore } from 'simple-redux-store';
import dayjs from 'dayjs';
import routes from './routes';
import usePageTitle from '~/hooks/usePageTitle';
import { getFlatMenus } from '~/layout/Menus';
import * as service from '~/service';
import './App.less';

dayjs.locale('zh-cn');

const App = () => {
  usePageTitle('admin');
  const updateStore = useUpdateStore();
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
    <ConfigProvider locale={zhCN}>
      <Router>
        <Suspense fallback={<Spin spinning />}>
          <Switch>
            <Route exact path="/">
              <Redirect to={name ? '/biz/customer-list' : '/login'} />
            </Route>
            {routes.map((route, idx) => (
              <Route key={idx} path={route.path} exact={route.exact} component={route.component} />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </ConfigProvider>
  );
};

export default App;
