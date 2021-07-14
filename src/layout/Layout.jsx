import React, { Suspense, useState } from 'react';
import { Spin } from 'antd';
import { Route, Switch } from 'react-router-dom';
import Menus from './Menus';
import Nav from './Nav';
import styled from 'styled-components';
import Header from './Header';
import { StyledAdminWrapper, StyledBody } from '~/common/StyledComponents';
import settingRoutes from '~/setting/routes';
import userRoutes from '~/user/routes';

const routeList = [...settingRoutes, ...userRoutes];

const StyledFlexLayout = styled.div`
  display: flex;
`;

const StyledContent = styled.div`
  background-color: #fff;
  padding: 20px;
  height: calc(100vh - 96px);
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
      <StyledFlexLayout>
        <Menus theme={theme} />
        <StyledAdminWrapper>
          <Header />
          <Nav></Nav>
          <StyledContent>
            <Suspense fallback={<Spin spinning />}>
              <Switch>
                {routeList.map((route, idx) => (
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
      </StyledFlexLayout>
    </StyledBody>
  );
}
