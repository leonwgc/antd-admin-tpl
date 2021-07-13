import React from 'react';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'simple-redux-store';
import { Space } from 'antd';

const StyledNav = styled.div`
  height: 48px;
  line-height: 48px;
  background: #ffffff;
  border-radius: 0px 8px 0px 0px;
  padding: 0 20px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.04);

  font-size: 14px;
  font-family: PingFangSC, PingFangSC-Regular;
  font-weight: 400;
  text-align: left;
  color: #8c8c8c;

  .current {
    color: #1a1a1a;
  }
`;

const Nav = () => {
  const { currentMenu = null, nav = [] } = useSelector((state) => state.app);
  const { pathname } = useLocation();

  let ar = [];

  if (currentMenu) {
    const { childs = [] } = currentMenu;
    for (let m of childs) {
      if (m.funUrl === pathname) {
        ar.push(m.funTitle);
        break;
      } else if (m.childs) {
        let t = m.childs.find((i) => i.funUrl === pathname);

        if (t) {
          ar.push(m.funTitle);
          ar.push(t.funTitle);
        }
      }
    }
  }

  if (nav.length) {
    ar = ar.concat(nav);
  }

  return (
    <StyledNav>
      <Space split="/">
        {ar.map((item, idx) => (
          <span key={idx} className={idx === ar.length - 1 ? 'current' : ''}>
            {item}
          </span>
        ))}
      </Space>
    </StyledNav>
  );
};

export default Nav;
