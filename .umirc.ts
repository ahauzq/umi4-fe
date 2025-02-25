import { defineConfig } from 'umi';
//@ts-ignore
import px2rem from 'postcss-plugin-px2rem';

export default defineConfig({
  hash: true,
  mfsu: {
    esbuild: true,
  },
  define: {
    'process.env.UMI_ENV': process.env.UMI_ENV,
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
    },
    {
      name: '首页',
      path: '/home',
      component: './home',
    },
  ],
  extraPostCSSPlugins: [
    px2rem({
      rootValue: 100,
      unitPrecision: 5,
      propWhiteList: [],
      exclude: false,
      ignoreIdentifier: false,
      replace: true,
      mediaQuery: false,
      minPixelValue: 2,
    }),
  ],
  metas: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0',
    },
  ],
  npmClient: 'pnpm',
});
