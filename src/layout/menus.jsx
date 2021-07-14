import React, { useEffect, useState, useMemo } from 'react';
import { nanoid } from 'nanoid';
import { useLocation, useHistory } from 'react-router-dom';
import { Menu } from 'antd';
import Icon from '~/common/Icon';
import styled from 'styled-components';
import { useSelector, useUpdateStore } from 'simple-redux-store';
import { getSearchParams } from '~/utils/helper';
const { SubMenu } = Menu;

const StyledWrap = styled.div`
  height: 100vh;
  background-color: #001529;
`;

const StyledMenuTop = styled.div`
  display: flex;
  height: 64px;
  width: ${({ collapsed }) => (collapsed ? '80px' : '200px')} !important;
  justify-content: center;
  align-items: center;

  > .logo {
    width: 32px;
    height: 32px;
    background-position: center;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url('https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg');
  }
`;

const StyledMenu = styled(Menu)`
  border-right: none;
  height: calc(100vh - 64px);
  width: ${({ collapsed = false }) => (collapsed ? '80px' : '200px')};
  font-size: 14px;
  overflow-y: scroll;
  -webkit-overflow-scrolling: touch;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const sep = '$';

const setMenusWithId = (menus, parentId = '') => {
  for (let menu of menus) {
    if (!menu.set) {
      menu.id = `${parentId}${parentId ? sep : ''}${nanoid(10)}`;
      menu.set = true;
      if (menu.childs && Array.isArray(menu.childs)) {
        setMenusWithId(menu.childs, menu.id);
      }
    }
  }
};

export const getFlatMenus = (menus) => {
  if (!menus) return [];
  let ar = [];

  for (let m of menus) {
    ar.push(m);
    ar = ar.concat(getFlatMenus(m.childs));
  }

  return ar;
};

export const getMenuInfo = (menus, skipSetId = false) => {
  if (!skipSetId) {
    setMenusWithId(menus);
  }

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

  const flatMenus = getFlatMenus(menus);

  return {
    flatMenus,
    parentMenusKeys,
    menus,
    sep,
  };
};

const defaultIcon = 'icon-zhankai_line';

const Menus = () => {
  const updateStore = useUpdateStore();
  const { currentMenu = {}, menuCollapsed = false } = useSelector((state) => state.app);
  const history = useHistory();
  const { pathname } = useLocation();
  const [openKeys, setOpenKeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const menuInfo = useMemo(() => getMenuInfo(currentMenu?.childs || []), [currentMenu]);

  useEffect(() => {
    // menuInfo update , this update , ignore pathname for mutiple menu unfold
    const { flatMenus = [], sep } = menuInfo;
    if (flatMenus.length) {
      let menu = flatMenus.find((m) => m.funUrl === pathname);
      if (pathname === '/outside') {
        const { search = '' } = location;

        if (search.indexOf('?') === 0) {
          const searchObj = getSearchParams(search.slice(1)) || {};
          const { url = '' } = searchObj;
          menu = flatMenus.find((m) => m.funUrl === url);
        }
      }
      if (menu) {
        setSelectedKeys([menu.id]);

        if (menu.id.indexOf(sep) > -1) {
          let keys = menu.id.split(sep);
          if (!menuCollapsed) {
            setOpenKeys(keys.slice(0, keys.length - 1));
          }
        }
      }
    }
  }, [menuInfo, pathname, menuCollapsed]);

  const onClick = ({ key }) => {
    const { flatMenus = [] } = menuInfo;
    const item = flatMenus.find((m) => m.id === key);
    if (item) {
      setSelectedKeys([item.id]);
      if (item.funUrl.startsWith('http')) {
        history.push('/outside?url=' + encodeURIComponent(item.funUrl));
      } else {
        history.push(item.funUrl);
      }
    }
  };

  const getSubMenuClassName = (id) => {
    if (menuCollapsed) {
      if (openKeys.includes(id)) {
        return 'active collapsed';
      } else {
        return 'collapsed';
      }
    } else {
      return '';
    }
  };

  const menuRender = (menus = [], isFirst = true) => {
    const renderMenuNoChilds = (item) => {
      if (isFirst) {
        return menuCollapsed ? (
          <SubMenu
            className={getSubMenuClassName(item.id)}
            collapsed={menuCollapsed}
            noArrow
            onTitleClick={() => history.push(item.funUrl)}
            key={item.id}
            title={menuCollapsed ? null : item.funTitle}
            icon={
              menuCollapsed ? (
                <Icon
                  type={item.funLogo || defaultIcon}
                  style={{ color: '#8c8c8c', fontSize: 20 }}
                />
              ) : null
            }
          ></SubMenu>
        ) : (
          <Menu.Item key={item.id} style={{ fontWeight: 'bolder', paddingLeft: 16 }}>
            {item.funTitle}
          </Menu.Item>
        );
      } else {
        return (
          <Menu.Item key={item.id} style={{ paddingLeft: 30 }}>
            {item.funTitle}
          </Menu.Item>
        );
      }
    };

    return menus.map((item) => {
      if (!item.childs) {
        // no childs . e.g. settings
        return renderMenuNoChilds(item);
      } else {
        return (
          <SubMenu
            className={getSubMenuClassName(item.id)}
            collapsed={menuCollapsed}
            key={item.id}
            title={menuCollapsed ? null : item.funTitle}
            icon={
              menuCollapsed ? (
                <Icon
                  type={item.funLogo || defaultIcon}
                  style={{ color: '#8c8c8c', fontSize: 20 }}
                />
              ) : null
            }
          >
            {menuRender(item.childs, false)}
          </SubMenu>
        );
      }
    });
  };
  return (
    <StyledWrap>
      <StyledMenuTop collapsed={menuCollapsed}>
        <div className="logo"></div>
      </StyledMenuTop>

      <StyledMenu
        collapsed={menuCollapsed}
        theme="dark"
        mode={'inline'}
        onClick={onClick}
        openKeys={openKeys}
        selectedKeys={selectedKeys}
        onOpenChange={setOpenKeys}
        inlineCollapsed={menuCollapsed}
      >
        {menuRender(menuInfo?.menus)}
      </StyledMenu>
    </StyledWrap>
  );
};

export default Menus;
