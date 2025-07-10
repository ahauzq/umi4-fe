import { defineConfig } from 'umi';
export default defineConfig({
  proxy: {
    '/api': {
      target: '',
      changeOrigin: true,
    },
  },
});
