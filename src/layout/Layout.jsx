import React, { Suspense, useState } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Header from './Header';
import Menus from './Menus';
import './Layout.less';

const { Content, Footer, Sider } = Layout;
const theme = 'dark';

export default function LayoutIndex({ history }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout className="site-layout">
      <Sider
        theme={theme}
        collapsed={collapsed}
        trigger={null}
        collapsible
        style={{ height: '100vh' }}
      >
        <div className={`sidebar-logo`}>
          <div className="logo"></div>
          {collapsed ? null : <h1>测试企业</h1>}
        </div>
        <Menus theme={theme} />
      </Sider>

      <Layout className="page-layout">
        <Header
          history={history}
          collapsed={collapsed}
          toggleCollapsed={() => setCollapsed((c) => !c)}
        />
        <Content style={{ padding: 20, minWidth: 980 }}>
          <div className="content-wrap">
            <Suspense fallback={<Spin spinning />}>
              <Switch>
                {routes.map((route, idx) => (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                ))}
                <Route render={() => <div>not found</div>}></Route>
              </Switch>
            </Suspense>
          </div>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}> supported by zfl team</Footer> */}
      </Layout>
    </Layout>
  );
}
