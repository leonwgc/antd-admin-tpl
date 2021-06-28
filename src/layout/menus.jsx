import React, { useEffect, useState } from 'react';
import { BarsOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';
import { useLocation, useHistory } from 'react-router-dom';
import { Menu, Spin } from 'antd';
import * as service from '../service';
import { useUpdateEffect } from 'ahooks';
const { SubMenu } = Menu;

const sep = '$';

const setMenusWithId = (menus, parentId = '') => {
  for (let menu of menus) {
    menu.id = `${parentId}${parentId ? sep : ''}${nanoid(10)}`;
    if (menu.childs && Array.isArray(menu.childs)) {
      setMenusWithId(menu.childs, menu.id);
    }
  }
};

const getMenuInfo = (menus) => {
  setMenusWithId(menus);

  let parentMenusKeys = [];

  function getParentMenuKeys(menus) {
    for (let item of menus) {
      if (item.childs && !parentMenusKeys.includes(item.id)) {
        parentMenusKeys.push(item.id + '');
        getParentMenuKeys(item.childs);
      }
    }
  }

  getParentMenuKeys(menus);

  function getFlatMenus(menus) {
    if (!menus) return [];
    let ar = [];

    for (let m of menus) {
      ar.push(m);
      ar = ar.concat(getFlatMenus(m.childs));
    }

    return ar;
  }

  const flatMenus = getFlatMenus(menus);

  return {
    flatMenus,
    parentMenusKeys,
    menus,
    sep,
  };
};

const Menus = ({ theme = 'dark' }) => {
  const history = useHistory();
  // const [isMenuAllUnFold] = useState(false); // fold all by default
  const { pathname } = useLocation();
  const [menuInfo, setMenuInfo] = useState({});
  const [loading, setLoading] = useState(false);

  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);

  useEffect(() => {
    setLoading(true);
    service.getMenus().then((result = []) => {
      const { flatMenus, parentMenusKeys, menus, sep } = getMenuInfo(result);
      setMenuInfo({
        flatMenus,
        parentMenusKeys,
        menus,
        sep,
      });
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (menuInfo) {
      const { flatMenus = [], sep } = menuInfo;
      const menu = flatMenus.find((m) => m.funUrl === pathname);
      if (menu) {
        setSelectedKeys([menu.id]);

        if (menu.id.indexOf(sep) > -1) {
          let keys = menu.id.split(sep);
          setOpenKeys(keys.slice(0, keys.length - 1));
        }
      }
    }
  }, [pathname, menuInfo]);

  const onClick = ({ key }) => {
    const { flatMenus = [] } = menuInfo;
    const item = flatMenus.find((m) => m.id === key);
    if (item) {
      setSelectedKeys([item.id]);
      history.push(item.funUrl);
    }
  };

  // useUpdateEffect(() => {
  //   if (menuInfo) {
  //     if (isMenuAllUnFold) {
  //       setOpenKeys(menuInfo.parentMenusKeys);
  //     } else {
  //       setOpenKeys([]);
  //     }
  //   }
  // }, [isMenuAllUnFold, menuInfo]);

  const menuRender = (menus = []) => {
    return menus.map((item) => {
      if (!item.childs) {
        return <Menu.Item key={item.id}>{item.funTitle}</Menu.Item>;
      } else {
        return (
          <SubMenu key={item.id} title={item.funTitle} icon={<BarsOutlined />}>
            {menuRender(item.childs)}
          </SubMenu>
        );
      }
    });
  };
  return (
    <Spin spinning={loading}>
      <Menu
        theme={theme}
        mode={'inline'}
        onClick={onClick}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={setOpenKeys}
        className="left-menus"
      >
        {menuRender(menuInfo?.menus)}
      </Menu>
    </Spin>
  );
};

export default React.memo(Menus);
