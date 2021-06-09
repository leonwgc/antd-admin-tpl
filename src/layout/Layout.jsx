import React, { Suspense, useEffect, useState } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { Route, Switch, useLocation } from 'react-router-dom';
import { useUpdateEffect } from 'ahooks';
import routes from './routes';
import Header from './Header';
import menus, { sep } from './menus';
import './Layout.less';

const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

const parentMenusKeys = [];

function getParentMenus(arr) {
  for (let item of arr) {
    if (item.children && !parentMenusKeys.includes(item.id)) {
      parentMenusKeys.push(item.id + '');
      getParentMenus(item.children);
    }
  }
}

function getFlatMenus(menus) {
  if (!menus) return [];
  let ar = [];

  for (let m of menus) {
    ar.push(m);
    ar = ar.concat(getFlatMenus(m.children));
  }

  return ar;
}

const flatMenus = getFlatMenus(menus);

getParentMenus(menus);

const theme = 'dark';

export default function LayoutIndex({ history }) {
  const [collapsed, setCollapsed] = useState(false);
  const [isMenuAllUnFold, setIsMenuAllUnFold] = useState(false);
  const { pathname } = useLocation();

  const [openKeys, setOpenKeys] = useState(() => {
    const menu = flatMenus.find((m) => m.path === pathname);

    if (!menu) {
      return [];
    }

    let id = menu.id;
    if (id.indexOf(sep) > -1) {
      let keys = id.split(sep);
      return keys.slice(0, keys.length - 1);
    } else {
      return [];
    }
  });

  const [selectedKeys, setSelectedKeys] = useState(() => {
    const menu = flatMenus.find((m) => m.path === pathname);
    if (menu) {
      return [menu.id];
    } else {
      return [];
    }
  });

  useUpdateEffect(() => {
    const menu = flatMenus.find((m) => m.path === pathname);
    if (menu) {
      setSelectedKeys([menu.id]);
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
          {collapsed ? null : <h1>今日油条企业</h1>}
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
        </Content>
        <Footer style={{ textAlign: 'center' }}> powered by react/antd</Footer>
      </Layout>
    </Layout>
  );
}
