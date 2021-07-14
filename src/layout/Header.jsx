import React from 'react';
import { Menu, Avatar, Dropdown, Space } from 'antd';
import { useSelector, useUpdateStore } from 'simple-redux-store';
import { useHistory } from 'react-router-dom';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import * as storage from 'simple-browser-store';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  height: 48px;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  border-bottom: 1px solid #f5f5f5;

  .folder {
    font-size: 16px;
    color: rgba(0, 0, 0, 0.65);
    &:hover {
      color: #004bcc;
    }
  }
`;

export default function Header() {
  const history = useHistory();
  const { name } = storage.getData('localStorage', 'admin');
  const { menuCollapsed } = useSelector((state) => state.app);

  const updateStore = useUpdateStore();

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
    <StyledHeader>
      <a className="folder" onClick={() => updateStore({ menuCollapsed: !menuCollapsed })}>
        {menuCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </a>

      <Space size={12}>
        <Dropdown overlay={menu}>
          <div>
            <Avatar
              icon={<UserOutlined />}
              style={{ marginRight: 8, backgroundColor: '#87d068' }}
            />
          </div>
        </Dropdown>
        <span>{name}</span>
      </Space>
    </StyledHeader>
  );
}
