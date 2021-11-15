import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import BbsComp from '../views/Bbs.vue';

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: '/',
    component: BbsComp,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
