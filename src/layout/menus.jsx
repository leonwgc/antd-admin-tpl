import React from 'react';
import { SmileOutlined, HeartOutlined, LikeOutlined } from '@ant-design/icons';

const menus = [
  {
    id: '0',
    name: 'welcome',
    path: '/biz/hi',
    icon: <HeartOutlined />,
  },
  {
    id: '1',
    name: 'smile',
    icon: <SmileOutlined />,
    children: [
      {
        id: '1-1',
        name: 'smile1',
        path: '/biz/customer-list',
      },
      {
        id: '1-2',
        name: 'smile2',
        path: '/biz/add-customer',
      },
    ],
  },
  {
    id: '2',
    name: 'like',
    icon: <LikeOutlined />,
    children: [
      {
        id: '2-1',
        name: 'like1',
        path: '/biz/page1',
      },
      {
        id: '2-2',
        name: 'like2',
        path: '/biz/business-type',
      },
    ],
  },
];

export default menus;
