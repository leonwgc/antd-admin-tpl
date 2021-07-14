import React, { Suspense, useState } from 'react';
import { Spin } from 'antd';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import Menus from './Menus';
import Nav from './Nav';
import styled from 'styled-components';
import Header from './Header';
import { StyledAdminWrapper, StyledBody } from '~/common/StyledComponents';

const StyledContent = styled.div`
  background-color: #fff;
  padding: 20px 20px 0;
  height: calc(100vh - 112px);
  overflow-y: scroll;
  box-shadow: 0 1px 4px rgb(0 21 41 / 8%);
  &::-webkit-scrollbar {
    display: none;
  }
`;
const theme = 'dark';

export default function LayoutIndex() {
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
        </StyledAdminWrapper>
      </div>
    </StyledBody>
  );
}
