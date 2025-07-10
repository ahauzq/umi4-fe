import { defineConfig } from 'umi';
export default defineConfig({
  proxy: {
    '/api/xxx': {
      target: 'http://10.10.122.253:8081',
      changeOrigin: true,
    },
    '/api': {
      target: 'http://10.10.122.253:8080',
      changeOrigin: true,
    },
  },
});
