import React, { Suspense, useState } from 'react';
import { Layout, Menu, Spin } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Menus from './Menus';
import Nav from './Nav';
import styled from 'styled-components';
import Header from './Header';
import { StyledAdminWrapper, StyledBody } from '~/common/StyledComponents';
import './Layout.less';

const StyledContent = styled.div`
  background-color: #f5f5f5;
  padding: 20px;
`;

const { Content, Footer, Sider } = Layout;
const theme = 'dark';

export default function LayoutIndex({ history }) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <StyledBody>
      <div style={{ display: 'flex' }}>
        <Menus theme={theme} />

        <StyledAdminWrapper>
          <Header />
          <Nav></Nav>
          <StyledContent>
            <Suspense fallback={<Spin spinning />}>
              <Switch>
                {routes.map((route, idx) => (
                  <Route
                    key={idx}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                  />
                ))}
                <Route render={() => <div>not found</div>}></Route>
              </Switch>
            </Suspense>
          </StyledContent>

          {/* <Footer style={{ textAlign: 'center' }}> supported by zfl team</Footer> */}
        </StyledAdminWrapper>
      </div>
    </StyledBody>
  );
}
