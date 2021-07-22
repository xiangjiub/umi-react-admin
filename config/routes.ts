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
    component: '404',
  },
];
