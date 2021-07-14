import React from 'react';
import styled from 'styled-components';

export const StyledBody = styled.section`
  background: ${({ bgColor = '#fff' }) => bgColor};
  min-width: 1080px;
  position: relative;
`;

export const StyledAdminWrapper = styled.div`
  min-height: calc(100vh - 64px);
  background-color: #f5f5f5;
  flex: 1;
`;

export const StyledAdminContentWrapper = styled.div`
  background: #fff;
  min-height: calc(100vh - 180px);
  padding: ${({ padding = 20 }) => padding}px;
  border-radius: 2px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.04);
`;

export const StyledSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;
