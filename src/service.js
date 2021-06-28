export const getMenus = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          funTitle: '客户管理',
          childs: [
            {
              funTitle: '企业客户列表',
              funUrl: '/biz/customer-list',
            },
            {
              funTitle: '添加客户',
              funUrl: '/biz/add-customer',
            },
            {
              funTitle: '创客管理',
              funUrl: '/biz/private-manage',
            },
          ],
        },
        {
          funTitle: '总包模式',
          childs: [
            {
              funTitle: '客户总包任务',
              funUrl: '/biz/statement-manage',
            },
          ],
        },
        {
          funTitle: '任务单管理',
          funUrl: 'https://t-hrm.zuifuli.com/#/attend/setting',
        },
      ]);
    }, 1000);
  });
};
