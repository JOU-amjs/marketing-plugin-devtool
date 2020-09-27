<!--
 * @Date: 2020-07-07 00:14:57
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-26 15:46:26
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
          <div class="flex-row justify-between align-center nav nav-title" v-if="navStatus === 'title'" :style="navStyle">
            <span class="text color-gray-2 nav__title">{{ pageTitle }}</span>
            <el-dropdown @command="moreCommandHandler">
              <span class="el-dropdown-link">···</span>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="toggle">切换页面</el-dropdown-item>
                <el-dropdown-item command="share" :disabled="!sharable">{{ sharable ? '分享' : '无法分享'}}</el-dropdown-item>
                <el-dropdown-item command="qrcode">手机调试</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
          <div v-else-if="navStatus === 'location'" class="nav nav-location" @keydown.enter="togglePage('title')">
            <el-input placeholder="/" v-model="routePath" class="nav__location">
              <el-select class="page-select" v-model="currentPage" placeholder="选择页面" slot="prepend">
                <el-option v-for="item in onlinePages" :key="item.path" :label="item.path" :value="item.path" />
              </el-select>
            </el-input>
          </div>
          <plugin-view-online v-if="currentPage" 
            class="module__entity" 
            :program-url="programUrl()" 
            @navigate="setPageLocation"
            @share="showShareBox"
            @pay="showPayBox"
          />
        </div>
      </div>
    </div>

    <!-- 模拟手机操作界面对话框 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="400px"
      @closed="dialogClosedHandler"
    >
      <qrcode v-if="dialogType === 'qrcode'" :url="`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(this.programUrl(this.internalIP))}`" />
      <share v-else-if="dialogType === 'share'" />
      <payment v-else-if="dialogType === 'payment'" :data="payData" @payed="payComplete" />
    </el-dialog>
    <right-menu />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import ConfigFrame from './components/config-frame.vue';
import PluginViewOnline, { TPayData, TPayOptions } from './components/plugin-view-online.vue';
import RightMenu from './components/right-menu.vue';
import { IGeneralObject, IResponse } from '@/common/common.inter';
import {
  Select,
  Option,
  Input,
  Button,
  Tag,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Dialog,
} from 'element-ui';
import { localhostRequest } from '@/common/network/request';
import { TMutationFn, TEnvDatabase } from '@/store';
import { parseUrlParams } from '../../common/util';
import { accessToken, activityId, shopId } from '../../common/config';
import { TPageConfig, TShareMessage } from '../../store';
import { buildPath, buildUrlParams } from 'view-program-lib/src/common/util';
import Qrcode from './components/dialog-mocks/qrcode.vue';
import Share from './components/dialog-mocks/share.vue';
import Payment from './components/dialog-mocks/payment.vue';
import WindowMessage from '../../common/window-message';

type TRouteInfo = {
  path: string,
  routePath: string,
  query: IGeneralObject<string|number>;
};
type TOnlinePage = { path: string };
type TDevtoolConfig = {
  IP: string,
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
    [Dropdown.name]: Dropdown,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [Dialog.name]: Dialog,
    Qrcode,
    Share,
    Payment,
  }
})
export default class App extends Vue {
  private currentPage = '';
  private routePath = '';
  private routeInfo: TRouteInfo = {
    path: '',
    routePath: '',
    query: {}
  };
  private onlinePages: TOnlinePage[] = [];
  @State('pageTitle') pageTitle!: string;
  @State('pluginID') pluginID!: string;
  @State('pageConfig') pageConfig!: TPageConfig;
  private navStatus = 'title';   // 导航栏状态，值为title时显示标题，值为location时显示页面url信息
  private containerUrl = `http://localhost:18002/?${query2String({ devMode: 1 })}`;
  private internalIP = '';
  private programUrl(host = 'http://localhost') {
    let { path = '', routePath = '', query = {} } = this.routeInfo;
    path = path && path.substr(-1, 1) !== '/' ? `${path}/` : path;
    routePath = routePath.substr(0, 1) === '/' ? routePath : `/${routePath}`;
    query.devMode = 1;
    query.accessToken = accessToken;
    
    // 以下是在插件开发环境下添加的数值
    return `${host}:18003/${this.pluginID}/${activityId}/${shopId}/online/${path}?${query2String(query)}#${routePath}`;
  }
  get navStyle() {
    return this.pageConfig.navColor ? { background: this.pageConfig.navColor } : {};
  }
  get sharable() {
    return !!this.pageConfig.shareMessage;
  }
  // 对话框相关
  private dialogTitle = '';
  private dialogVisible = false;
  private dialogType = '';
  private payData: TPayData = {
    payOptions: {
      intent: 'couponPurchase',
      amount: 0,
    }
  };
  @Mutation('updateState') updateState!: TMutationFn;
  private moreCommandHandler(command: string) {
    if (command === 'toggle') {
      this.togglePage('location');
    }
    else if (command === 'share') {
      this.updateState({
        shareMessage: { ...this.pageConfig.shareMessage },
      });
      this.showShareBox();
    }
    else if (command === 'qrcode') {
      this.dialogTitle = '手机扫码调试';
      this.dialogType = 'qrcode';
      this.dialogVisible = true;
    }
  }
  dialogClosedHandler() {
    if (this.dialogType === 'payment') {
      this.payComplete(false);
    }
  }
  async mounted() {
    let { data } = await localhostRequest.get<IResponse<TDevtoolConfig>>('/get_devtool_config');
    if (data.code === 200) {
      const { IP, onlinePages, database, pluginID } = data.data;
      this.internalIP = IP ? `http://${IP}` : '';
      this.onlinePages = onlinePages;
      if (this.onlinePages.length > 0) {
        this.currentPage = this.routeInfo.path = this.onlinePages[0].path;
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

    // 初始化页面信息
    let routeInfoStr = localStorage.getItem('routeInfo');
    if (routeInfoStr) {
      let routeInfo = JSON.parse(routeInfoStr) as TRouteInfo;
      let index = this.onlinePages.findIndex(({ path }) => routeInfo.path === path);
      if (index >= 0) {
        this.setPageLocation(routeInfo);
      }
      else {
        localStorage.removeItem('routeInfo');
      }
    }
  }
  togglePage(status: string) {
    this.navStatus = status;
    if (status === 'title') {
      this.routeInfo.path = this.currentPage;
      this.routeInfo.routePath = this.routePath.replace(/\?.*$/, '');
      this.routeInfo.query = parseUrlParams(this.routePath);
      localStorage.setItem('routeInfo', JSON.stringify(this.routeInfo));
    }
  }
  showShareBox(shareMessage?: TShareMessage) {
    if (shareMessage) {
      this.updateState({ shareMessage });
    }
    this.dialogTitle = '分享模拟';
    this.dialogType = 'share';
    this.dialogVisible = true;
  }
  // 线上视图模块页面跳转事件
  setPageLocation({ path, routePath = '', query = {} }: TRouteInfo) {
    this.routeInfo = {
      path, 
      routePath,
      query
    };
    this.currentPage = path;
    this.routePath = buildPath(routePath, query);
  }
  showPayBox(payData: TPayData) {
    this.payData = payData;
    this.dialogTitle = '支付模拟';
    this.dialogType = 'payment';
    this.dialogVisible = true;
  }
  async payComplete(finish: boolean, payOptions?: TPayOptions) {
    this.dialogVisible = false;
    let message = WindowMessage.getWindowMessage('programFrame');
    message?.emit('payComplete', finish);

    // 如果支付成功则模拟调用支付成功回调
    if (finish && payOptions) {
      let { data } = await localhostRequest.post<IResponse<{ moduleReturnValue: boolean }>>('/v1/callback_payment', {
        activityId,
        pluginId: this.pluginID,
        type: 'payed',
        intent: payOptions.intent,
        clientParams: payOptions.clientParams,
      });
      if (data.code === 200) {
        this.$message({
          message: `服务端支付成功回调返回了[${data.data.moduleReturnValue.toString()}]`,
          type: data.data.moduleReturnValue ? 'success' : 'warning',
        });
      }
      else {
        console.error(data.message || '');
        this.$message.error('服务端代码错误，请查看控制台');
      }
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
    height: 42px;
    background: #eceef3;
  }
  .nav-title {
    padding: 0 10px;
    .el-dropdown-link {
      cursor: pointer;
      color: #409EFF;
      font-size: 24px;
    }
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