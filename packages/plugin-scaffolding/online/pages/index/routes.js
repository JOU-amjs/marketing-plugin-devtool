/*
 * @Date: 2020-04-09 15:06:35
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-13 16:07:59
 */
import ViewFirst from './views/view-first.vue';
import ViewSecond from './views/view-second.vue';

export const routes = [
  { path: '/', component: ViewFirst },
  { path: '/second', component: ViewSecond },
];

export function beforeEach(to, from, next) {
  next();
}