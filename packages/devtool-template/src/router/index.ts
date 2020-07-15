/*
 * @Date: 2020-07-07 00:14:57
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-07 19:45:56
 */ 
import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '@/views/home/index.vue';

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
