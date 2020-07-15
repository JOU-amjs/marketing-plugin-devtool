/*
 * @Date: 2020-07-07 00:14:57
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-14 13:25:41
 */ 
import Vue from 'vue';
import Vuex from 'vuex';
import { IGeneralObject } from '@/common/common.inter';

Vue.use(Vuex);

export type TConfigData = IGeneralObject<any> | any[];
interface IState {
  pageTitle: string,
  configData: TConfigData,
}

export type TMutationFn = (payload: any) => void;
export default new Vuex.Store<IState>({
  state: {
    pageTitle: '...加载中',
    configData: {},
  },
  mutations: {
    updateState(state, payload: IGeneralObject<any> = {}) {
      Object.keys(payload).forEach((attrName) => {
        if (state[attrName as keyof typeof state]) {
          state[attrName as keyof typeof state] = payload[attrName];
        }
      });
    },
  },
  actions: {
  },
  modules: {
  }
});