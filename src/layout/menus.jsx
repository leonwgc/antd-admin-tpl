import React from 'react';
import { SmileOutlined, LikeOutlined, HeartOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

const sep = '$';

const setMenusWithId = (menus, parentId = '') => {
  for (let menu of menus) {
    menu.id = `${parentId}${parentId ? sep : ''}${nanoid(10)}`;
    if (menu.children && Array.isArray(menu.children)) {
      setMenusWithId(menu.children, menu.id);
    }
  }
};

const getMenus = () => {
  const menus = [
    {
      name: 'welcome',
      path: '/biz/hi',
      icon: <HeartOutlined />,
    },
    {
      name: 'smile',
      icon: <SmileOutlined />,
      children: [
        {
          name: 'smile1',
          path: '/biz/customer-list',
        },
        {
          name: 'smile2',
          path: '/biz/add-customer',
        },
      ],
    },
    {
      name: 'like',
      icon: <LikeOutlined />,
      children: [
        {
          name: 'like1',
          path: '/biz/page1',
        },
        {
          name: 'not allowed to access',
          path: '/biz/private',
        },
      ],
    },
  ];

  setMenusWithId(menus);

  let parentMenusKeys = [];

  function getParentMenuKeys(menus) {
    for (let item of menus) {
      if (item.children && !parentMenusKeys.includes(item.id)) {
        parentMenusKeys.push(item.id + '');
        getParentMenuKeys(item.children);
      }
    }
  }

  getParentMenuKeys(menus);

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

  return {
    flatMenus,
    parentMenusKeys,
    menus,
    sep,
  };
};

const menuData = getMenus();

export default menuData;
