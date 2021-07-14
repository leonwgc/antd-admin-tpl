import React, { useEffect } from 'react';
import { Menu, Avatar, Dropdown, Space, Button, Drawer } from 'antd';
import { useSelector, useUpdateStore } from 'simple-redux-store';
import { useHistory } from 'react-router-dom';
import { loadResource, saveSetting } from '~/utils/helper';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import * as storage from 'simple-browser-store';
import styled from 'styled-components';

const colors = [
  { name: 'green', color: '#08bc63' },
  { name: 'red', color: '#f5222d' },
  {
    name: 'blue',
    color: '#004bcc',
  },
];

const StyledColorBlock = styled.div`
  width: 20px;
  height: 20px;
  margin-top: 8px;
  margin-right: 8px;
  color: #fff;
  font-weight: 700;
  text-align: center;
  border-radius: 2px;
  cursor: pointer;
`;

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
  const { menuCollapsed, isSettingVisile, theme = '' } = useSelector((state) => state.app);

  const updateStore = useUpdateStore();

  useEffect(() => {
    if (theme) {
      loadResource(`https://static.zuifuli.com/antd-theme/custom-theme-${theme}.css`);
    }
  }, [theme]);

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
        <Button
          icon={<SettingOutlined />}
          type="default"
          shape="circle"
          onClick={() => updateStore({ isSettingVisile: true })}
        ></Button>
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
      <Drawer
        title="主题色设置"
        placement="right"
        closable={false}
        onClose={() => updateStore({ isSettingVisile: false })}
        visible={isSettingVisile}
      >
        <p>
          <Space>
            {colors.map((c, i) => (
              <StyledColorBlock
                onClick={() => {
                  updateStore({ theme: c.name });
                  saveSetting({ theme: c.name });
                }}
                style={{ backgroundColor: c.color }}
                key={i}
              />
            ))}
          </Space>
        </p>
      </Drawer>
    </StyledHeader>
  );
}
