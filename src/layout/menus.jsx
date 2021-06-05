import React from 'react';
import { SmileOutlined, HeartOutlined, LikeOutlined } from '@ant-design/icons';
import { nanoid } from 'nanoid';

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

export const sep = '$';

const getMenusWithId = (menus, parentId = '') => {
  for (let menu of menus) {
    menu.id = `${parentId}${parentId ? sep : ''}${nanoid(10)}`;
    if (menu.children && Array.isArray(menu.children)) {
      getMenusWithId(menu.children, menu.id);
    }
  }
};

getMenusWithId(menus);

export default menus;
