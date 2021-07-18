export default [
  { exact: true, path: '/', component: 'index' },
  {
    path: '/List',
    icon: 'AreaChartOutlined',
    name: 'list',
    routes: [
      {
        path: '/List/sub-page',
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
    ],
  },
  {
    component: '404',
  },
];
