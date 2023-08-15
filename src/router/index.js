// src/router/index.js
import { createRouter, createWebHashHistory } from 'vue-router';
import login from '@/page/LoginPage.vue';
import setting from '@/page/SettingPage.vue';
import game from '@/page/GamePage.vue';
import home from '@/page/HomePage.vue';
import register from '@/page/Register.vue'

const routes = [
  {
    path: '/',
    component: home,
  },
  {
    path: '/login',
    component: login,
  },
  {
    path: '/register',
    component: register,
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
