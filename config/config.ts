import { defineConfig } from 'umi';
import routes from './routes';
import defaultSettings from './defaultSettings';
export default defineConfig({
  fastRefresh: {}, // 快速刷新
  dynamicImport: {}, // 按需加载
  layout: {
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  dva: {
    immer: true,
    hmr: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  antd: {},
  routes,
  mfsu: {},
});
