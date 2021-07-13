import { createFromIconfontCN } from '@ant-design/icons';

import styled from 'styled-components';

const Icon = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2639743_5mhiktjhccw.js',
});

const StyledIcon = styled(Icon)`
  font-size: 16px;
`;

export default StyledIcon;
