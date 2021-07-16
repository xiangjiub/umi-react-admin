import { defineConfig } from 'umi';

export default defineConfig({
  fastRefresh: {}, // 快速刷新
  dynamicImport: {}, // 按需加载
  // mfsu:{},  // 打包提速
  layout: {
    name: 'Ant umi',
    locale: true,
    layout: 'side',
    theme: 'tech',
  },
  antd: {},
  nodeModulesTransform: {
    type: 'none',
  },
  // routes: [
  //   { path: '/', component: '@/pages/index' },
  //   { path: '/list', component: '@/pages/list' },

  // ],
  // routes: [
  //   {
  //     path: '/',
  //     component: '@/layouts/index',
  //     routes: [
  //       { path: '/list', component: 'list' },
  //     ],
  //   },
  // ],
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/index' },
        { exact: true, path: '/list', component: '@/pages/list' },
      ],
    },
  ],
});
