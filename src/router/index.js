// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import login from '@/page/LoginPage.vue';
import setting from '@/page/SettingPage.vue';
import game from '@/page/GamePage.vue';

const routes = [
  {
    path: '/',
    redirect: '/login', // 重定向到 /login
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/setting',
    component: setting,
  },
  {
    path: '/game',
    component: game,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
