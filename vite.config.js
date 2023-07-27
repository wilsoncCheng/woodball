import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  // base: '/Woodball/',
  plugins: [
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    vue()
  ],
  server: {
    port: 3000, // 設置 Vite 的端口为 3000
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 添加别名配置，将 @ 设置为 ./src 路径
    },
  },
});
