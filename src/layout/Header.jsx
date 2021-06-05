import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Avatar, Dropdown } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { useUpdateStore, useSelector } from 'simple-redux-store';
import './Header.less';

const { Header } = Layout;

export default function PageHeader({ history, toggleCollapsed, collapsed }) {
  const app = useSelector((state) => state.app);

  const menu = (
    <Menu>
      <Menu.Item style={{ width: '100%' }} onClick={() => history.push('/')}>
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
            leonwgc
          </div>
        </Dropdown>
        ,
      </div>
    </Header>
  );
}
