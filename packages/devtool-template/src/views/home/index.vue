<!--
 * @Date: 2020-07-07 00:14:57
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-08-02 14:24:07
--> 
<template>
  <div id="container">
    <div class="views">
      <div class="module">
        <span class="module__hd">插件配置页</span>
        <div class="module__body">
          <config-frame class="module__entity" :config-url="containerUrl" />
        </div>
      </div>
      <div class="module">
        <span class="module__hd">插件视图(线上)</span>
        <div class="flex-column module__body">
          <div class="flex-row justify-between align-center nav" v-if="navStatus === 'title'">
            <span class="text color-gray-2 nav__title">{{ pageTitle }}</span>
            <el-button type="text" @click="togglePage('location')">
              切换
              <i class="el-icon-arrow-right el-icon--right" />
            </el-button>
          </div>
          <div v-else-if="navStatus === 'location'" @keydown.enter="togglePage('title')">
            <el-input placeholder="/" v-model="routePath" class="nav__location">
              <el-select class="page-select" v-model="currentPage" placeholder="选择页面" slot="prepend">
                <el-option v-for="item in onlinePages" :key="item.path" :label="item.path" :value="item.path" />
              </el-select>
            </el-input>
          </div>
          <plugin-view-online v-if="currentPage" class="module__entity" :program-url="programUrl" />
        </div>
      </div>
    </div>
    <right-menu />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import ConfigFrame from './components/config-frame.vue';
import PluginViewOnline from './components/plugin-view-online.vue';
import RightMenu from './components/right-menu.vue';
import { IGeneralObject, IResponse } from '@/common/common.inter';
import {
  Select,
  Option,
  Input,
  Button,
  Tag,
} from 'element-ui';
import { localhostRequest } from '@/common/network/request';
import { TMutationFn, TEnvDatabase } from '@/store';
import { parseUrlParams } from '../../common/util';
import { accessToken } from '../../common/config';

type TRouteInfo = {
  page: string,
  routePath: string,
  query: IGeneralObject<string|number>;
};
type TOnlinePage = { path: string };
type TDevtoolConfig = {
  pluginID: string,
  onlinePages: TOnlinePage[],
  database: {
    development: TEnvDatabase,
    production: TEnvDatabase,
  },
};
const query2String = (query: IGeneralObject<string|number>) => {
  return Object.keys(query).map(key => `${key}=${query[key]}`).join('&');
}
@Component({
  components: {
    ConfigFrame,
    PluginViewOnline,
    RightMenu,
    [Select.name]: Select,
    [Option.name]: Option,
    [Input.name]: Input,
    [Button.name]: Button,
    [Tag.name]: Tag,
  }
})
export default class App extends Vue {
  private currentPage = '';
  private routePath = '';
  private routeInfo: TRouteInfo = {
    page: '',
    routePath: '',
    query: {}
  };
  private onlinePages: TOnlinePage[] = [];
  @State('pageTitle') pageTitle!: string;
  @State('pluginID') pluginID!: string;
  private navStatus = 'title';   // 导航栏状态，值为title时显示标题，值为location时显示页面url信息
  private containerUrl = `http://localhost:18002/?${query2String({ devMode: 1 })}`;
  get programUrl() {
    let { page, routePath, query } = this.routeInfo;
    page = page && page.substr(-1, 1) !== '/' ? `${page}/` : page;
    routePath = routePath.substr(0, 1) === '/' ? routePath : `/${routePath}`;
    query.devMode = 1;
    query.accessToken = accessToken;
    
    // 以下是在插件开发环境下添加的数值
    const activityId = 0;
    const shopId = 0;
    return `http://localhost:18003/${this.pluginID}/${activityId}/${shopId}/online/${page}#${routePath}?${query2String(query)}`;
  }
  @Mutation('updateState') updateState!: TMutationFn;
  
  async mounted() {
    let { data } = await localhostRequest.get<IResponse<TDevtoolConfig>>('/get_devtool_config');
    if (data.code === 200) {
      const { onlinePages, database, pluginID } = data.data;
      this.onlinePages = onlinePages;
      if (this.onlinePages.length > 0) {
        this.currentPage = this.routeInfo.page = this.onlinePages[0].path;
      }
      this.updateState({
        database,
        pluginID,
      });
    }
    
    let configDataWrap = await localhostRequest.get<IResponse<any>>('mock/get_config_data');
    let configData = configDataWrap.data;
    if (configData.code === 200) {
      this.updateState({
        configData: configData.data,
      });
    }
  }
  togglePage(status: string) {
    this.navStatus = status;
    if (status === 'title') {
      this.routeInfo.page = this.currentPage;
      this.routeInfo.routePath = this.routePath.replace(/\?.*$/, '');
      this.routeInfo.query = parseUrlParams(this.routePath);
    }
  }
}
</script>

<style lang="scss" scoped>
#container {
  display: flex;
  flex-direction: row;
  height: 100vh;
  // justify-content: center;
  /* justify-content: space-between; */

  .nav {
    padding: 0 10px;
    border-bottom: solid 1px #ddd;
    background: #eceef3;
  }
  .nav__location {
    .page-select {
      width: 100px;
    }
    .el-input-group__prepend, .el-input__inner {
      border: none;
      border-radius: 0;
    }
  }
  .views {
    display: flex;
    flex-direction: row;
    padding-top: 20px;
    flex: 1;
  }

  .module {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 120px;

    .module__hd {
      color: #999;
      font-size: 20px;
      font-weight: bolder;
      margin-bottom: 12px;
    }
    .module__body {
      position: relative;
      width: 325px;
      height: 587px;
      box-shadow: 2px 2px 16px #eee;
      border-radius: 8px;
      border: solid 1px #ddd;
      overflow: hidden;
      display: flex;
    }
    .module__entity {
      width: 100%;
      height: 100%;
    }
  }
}
</style>