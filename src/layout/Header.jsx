import React from 'react';
import { Menu, Avatar, Dropdown } from 'antd';
import { useSelector, useUpdateStore } from 'simple-redux-store';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import * as storage from 'simple-browser-store';
import styled from 'styled-components';

const StyledHeader = styled.header`
  display: flex;
  background-color: #fff;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  /* box-shadow: 0 1px 4px rgb(0 21 41 / 8%); */
  border-bottom: 1px solid #f5f5f5;

  .folder {
    font-size: 20px;
    line-height: 48px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: rgba(0, 0, 0, 0.65);
    padding: 0 24px 0 0;
    &:hover {
      color: #004bcc;
    }
  }
  > .content {
    cursor: pointer;
    padding: 0 20px;
    &:hover {
      background: #e6f3ff;
    }
  }
`;

export default function PageHeader({ history, toggleCollapsed, collapsed }) {
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
      </div>
    </StyledHeader>
  );
}
