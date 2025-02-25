import { defineConfig } from 'umi';
export default defineConfig({
  proxy: {
    '/api/uinfo/ncc': {
      target: 'http://42.186.122.253:8083',
      changeOrigin: true,
    },
    '/api': {
      target: 'https://test-ncc.popo.netease.com',
      changeOrigin: true,
    },
  },
});
