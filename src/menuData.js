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
          funTitle: '微服务页面测试',
          funLogo: 'icon-qiyezhanghu',
          funUrl: `/micro/hooks-pc`,
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
