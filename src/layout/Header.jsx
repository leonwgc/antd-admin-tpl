import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import * as storage from 'simple-browser-store';
import './Header.less';

const { Header } = Layout;

export default function PageHeader({ history, toggleCollapsed, collapsed }) {
  const { name } = storage.getData('localStorage', 'admin');

  const menu = (
    <Menu>
      <Menu.Item
        style={{ width: '100%' }}
        onClick={() => {
          history.push('/login');
        }}
      >
        退出
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="page-header">
      <a className="folder" onClick={toggleCollapsed}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          style: { fontSize: 20 },
        })}
      </a>
      <div className="content">
        <Dropdown overlay={menu}>
          <div>
            <Avatar
              icon={<UserOutlined />}
              style={{ marginRight: 8, backgroundColor: '#87d068' }}
            />
            {name}
          </div>
        </Dropdown>
        ,
      </div>
    </Header>
  );
}
