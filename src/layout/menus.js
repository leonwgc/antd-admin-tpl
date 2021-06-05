import React from 'react';
import { SmileOutlined, HeartOutlined, LikeOutlined } from '@ant-design/icons';

const menus = [
  [
    {
      id: '0',
      name: 'welcome',
      icon: <HeartOutlined />,
    },
  ],
  {
    id: '1',
    name: '合作方管理',
    icon: <SmileOutlined />,
    children: [
      {
        id: '1-1',
        name: '企业客户列表',
        path: '/biz/customer-list',
      },
      {
        id: '1-2',
        name: 'add',
        path: '/biz/add-customer',
      },
    ],
  },
  {
    id: '2',
    name: '其他',
    icon: <LikeOutlined />,
    children: [
      {
        id: '2-1',
        name: '企业客户列表',
        path: '/biz/page1',
      },
      {
        id: '2-2',
        name: '创客列表',
        path: '/biz/business-type',
      },
    ],
  },
];

export default menus;
