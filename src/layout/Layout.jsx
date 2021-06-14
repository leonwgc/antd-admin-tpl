import React, { Suspense, useEffect, useState } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { BrowserRouter as Router, Route, Switch, useLocation } from 'react-router-dom';
import { useUpdateEffect } from 'ahooks';
import routes from './routes';
import Header from './Header';
import menuData from './menus';
import './Layout.less';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const theme = 'dark';

const { flatMenus, parentMenusKeys, menus, sep } = menuData;

export default function LayoutIndex({ history }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMenuAllUnFold] = useState(false); // fold all by default
  const { pathname } = useLocation();

  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    const menu = flatMenus.find((m) => m.path === pathname);
    if (menu) {
      setSelectedKeys([menu.id]);

      if (menu.id.indexOf(sep) > -1) {
        let keys = menu.id.split(sep);
        setOpenKeys(keys.slice(0, keys.length - 1));
      }
    }
  }, [pathname]);

  const onClick = ({ key }) => {
    const item = flatMenus.find((m) => m.id === key);
    if (item) {
      setSelectedKeys([item.id]);
      history.push(item.path);
    }
  };

  useUpdateEffect(() => {
    if (isMenuAllUnFold) {
      setOpenKeys(parentMenusKeys);
    } else {
      setOpenKeys([]);
    }
  }, [isMenuAllUnFold]);

  const menuRender = (menus) => {
    return menus.map((item) => {
      if (!item.children) {
        return (
          <Menu.Item key={item.id} icon={item.icon}>
            {item.name}
          </Menu.Item>
        );
      } else {
        return (
          <SubMenu key={item.id} title={item.name} icon={item.icon}>
            {menuRender(item.children)}
          </SubMenu>
        );
      }
    });
  };

  return (
    <Layout className="site-layout">
      <Sider theme={theme} collapsed={collapsed} trigger={null} collapsible>
        <div className={`sidebar-logo`}>
          <div className="logo"></div>
          {collapsed ? null : <h1>测试企业</h1>}
        </div>

        <Menu
          theme={theme}
          mode={'inline'}
          onClick={onClick}
          openKeys={openKeys}
          selectedKeys={selectedKeys}
          onOpenChange={setOpenKeys}
        >
          {menuRender(menus)}
        </Menu>
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
        <Footer style={{ textAlign: 'center' }}> powered by react/antd</Footer>
      </Layout>
    </Layout>
  );
}
