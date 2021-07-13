const menuData = {
  funTitle: 'root',
  childs: [
    {
      funTitle: '设置',
      funUrl: '/biz',
      childs: [
        {
          funTitle: '列表',
          funLogo: 'icon-qiyezhanghu',
          funUrl: `/biz/customer-list`,
        },
        {
          funTitle: '添加',
          funLogo: 'icon-guanliyuan',
          funUrl: '/biz/add-customer',
        },
      ],
    },
  ],
};

export default menuData;
