export default [
  {
    exact: true,
    path: '/',
    // component: 'index'
    redirect: '/list/subpage',
  },
  {
    path: '/list',
    icon: 'AreaChartOutlined',
    name: 'list',
    routes: [
      {
        path: '/list/subpage',
        name: 'table-list',
        exact: true,
        component: './List',
      },
    ],
  },
  {
    path: '/form',
    icon: 'BarChartOutlined',
    name: 'form',
    routes: [
      {
        path: '/form/item',
        name: 'form-list',
        exact: true,
        component: './form',
      },
      {
        path: '/form/basic-form',
        name: 'basic-form',
        exact: true,
        component: './form/basic-form/basic-form',
      },
    ],
  },
  {
    path: '/notice',
    icon: 'NotificationOutlined',
    name: 'notice',
    component: './notice',
    // routes:[
    //   {
    //     path: '/notice'
    //   }
    // ]
  },
  {
    path: '/task',
    icon: 'home',
    name: 'task',
    routes: [
      {
        path: '/task/action',
        name: 'task-action',
        exact: true,
        component: './task',
      },
      {
        path: '/task/list/:id?',
        exact: true,
        component: './task/taskList',
      },
    ],
  },
  {
    path: '/collect',
    icon: 'home',
    name: 'collect',
    routes: [
      {
        path: '/collect/records',
        name: 'collect-records',
        exact: true,
        component: './collect/records',
      },
      {
        path: '/collect/plan',
        name: 'collect-plan',
        exact: true,
        component: './collect/plan',
      },
    ],
  },
  {
    component: '404',
  },
];
