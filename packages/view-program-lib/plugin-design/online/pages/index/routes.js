/*
 * @Date: 2020-04-09 15:06:35
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-04-10 15:30:47
 */
import ViewFirst from './views/view-first';
import ViewSecond from './views/view-second';

export const routes = [
  { path: 'index/first', component: ViewFirst },
  { path: 'index/second', component: ViewSecond },
];

export function beforeEach(to, from, next) {
  
}