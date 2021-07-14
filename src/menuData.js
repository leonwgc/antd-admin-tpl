const menuData = {
  funTitle: 'root',
  childs: [
    {
      funTitle: '用户管理',
      funUrl: '/user',
      childs: [
        {
          funTitle: '列表',
          funLogo: 'icon-qiyezhanghu',
          funUrl: `/user/list`,
        },
        {
          funTitle: '添加',
          funLogo: 'icon-guanliyuan',
          funUrl: '/user/add',
        },
      ],
    },
    {
      funTitle: '设置',
      funUrl: '/setting',
      childs: [
        {
          funTitle: 'page1',
          funLogo: 'icon-qiyezhanghu',
          funUrl: `/setting/page1`,
        },
        {
          funTitle: 'page2',
          funLogo: 'icon-guanliyuan',
          funUrl: `/setting/page2`,
        },
      ],
    },
  ],
};

export default menuData;
