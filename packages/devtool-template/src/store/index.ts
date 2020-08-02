/*
 * @Date: 2020-07-07 00:14:57
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-20 16:52:25
 */ 
import Vue from 'vue';
import Vuex from 'vuex';
import { IGeneralObject } from '@/common/common.inter';

Vue.use(Vuex);

export type TEnvDatabase = {
  collection: string[],
};
export type TConfigData = IGeneralObject<any> | any[];
interface IState {
  pageTitle: string,
  configData: TConfigData,
  pluginID: string,
  database: {
    development: TEnvDatabase,
    production: TEnvDatabase,
  },
}

export type TMutationFn = (payload: any) => void;
export default new Vuex.Store<IState>({
  state: {
    pageTitle: '...加载中',
    configData: {},
    pluginID: '',
    database: {
      development: {
        collection: []
      },
      production: {
        collection: []
      },
    }
  },
  mutations: {
    updateState(state, payload: IGeneralObject<any> = {}) {
      Object.keys(payload).forEach((attrName) => {
        if (payload[attrName as keyof typeof state]) {
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