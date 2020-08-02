<!--
 * @Date: 2020-07-20 15:41:21
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-07-20 17:44:01
--> 
<template>
  <div class="menu">
    <logo />
    <el-collapse v-model="activeNames">
      <el-collapse-item title="配置数据" name="1">
        <vue-json-pretty :data="configData" show-length :deep="2" highlightMouseoverNode />
      </el-collapse-item>
      <el-collapse-item title="数据集合管理" name="2">
        <div class="database__wrap" v-for="(dbItem, env) in database" :key="env">
          <div class="database__header">
            <label class="env-name">{{ env }}</label>
            <el-button size="mini" @click="openDialog('create', env)">添加集合</el-button>
          </div>
          <div>
            <el-tag 
              class="coll-name"
              v-for="collName in dbItem.collection" 
              :key="collName"
              closable
              @close="openDialog('remove', env, collName)"
            >{{ collName }}</el-tag>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-dialog
      :title="dialogContentType === 'create' ? '新建数据集合' : '删除数据集合'"
      :visible.sync="dialogVisible"
      width="40%">
      <div v-if="dialogContentType === 'create'">
        <el-input placeholder="请输入集合名称，批量添加以`,`隔开" v-model="dialogOperateCollection">
          <template slot="prepend">{{ dialogEnv }}</template>
        </el-input>
      </div>
      <div v-else-if="dialogContentType === 'remove' && dialogOperateCollection">
        <span>你正准备删除数据集合[{{ dialogOperateCollection }}]，删除后该集合的数据将会一并删除，确定操作吗？</span>
      </div>
      <template slot="footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitCollectionOperation">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { State, Mutation } from 'vuex-class';
import {
  Collapse,
  CollapseItem,
  Button,
  Tag,
  Dialog,
  Input,
} from 'element-ui';
import { localhostRequest } from '@/common/network/request';
import { TMutationFn, TConfigData, TEnvDatabase } from '@/store';
import { config } from '@vue/test-utils';
import VueJsonPretty from 'vue-json-pretty';
import Logo from '@/components/logo.vue';
import { IResponse } from '../../../common/common.inter';

type TEnv = 'development'|'production';

@Component({
  components: {
    [Collapse.name]: Collapse,
    [CollapseItem.name]: CollapseItem,
    [Button.name]: Button,
    [Tag.name]: Tag,
    [Dialog.name]: Dialog,
    [Input.name]: Input,
    VueJsonPretty,
    Logo,
  }
})
export default class RightMenu extends Vue {
  private activeNames = '1';
  private dialogVisible = false;
  private dialogContentType = '';
  private dialogOperateCollection = '';
  private dialogEnv: TEnv = 'development';
  @State('configData') configData!: TConfigData;
  @State(String) private configUrl!: string;
  @State('database') database!: {
    development: TEnvDatabase,
    production: TEnvDatabase,
  };
  @State('pluginID') pluginID!: string;
  @Mutation('updateState') updateState!: TMutationFn;
  openDialog(contentType: string, env: TEnv, collectionName?: string) {
    this.dialogVisible = true;
    this.dialogContentType = contentType;
    this.dialogEnv = env;
    this.dialogOperateCollection = collectionName || '';
  }
  // 移除一个集合
  async removeCollection(envNum: 1|2) {
    let { data } = await localhostRequest.delete('/mongo/collections', {
      data: {
        env: envNum,
        pluginId: this.pluginID,
        name: [this.dialogOperateCollection],
      }
    });
    if (data.code === 200) {
      this.$message.success('删除成功');
      this.dialogVisible = false;

      let database = { ...this.database };
      let index = database[this.dialogEnv].collection.findIndex(collName => collName === this.dialogOperateCollection);
      if (index >= 0) {
        database[this.dialogEnv].collection.splice(index, 1);
        this.updateState({
          database,
        });
      }
    }
  }

  // 添加一个集合
  async addCollection(envNum: 1|2) {
    if (!this.dialogOperateCollection) {
      this.$message.error('请输入创建的集合名称');
      return;
    }
    let names = this.dialogOperateCollection.split(/,|，/).map(item => item.trim()).filter(item => item);
    let { data } = await localhostRequest.post<IResponse<any>>('/mongo/collections', {
      env: envNum,
      pluginId: this.pluginID,
      name: names,
    });
    if (data.code === 200) {
      this.$message.success('创建成功');
      this.dialogVisible = false;

      let database = { ...this.database };
      database[this.dialogEnv].collection.push(...names);
      this.updateState({
        database,
      });
    }
  }

  // 提交数据集合操作
  submitCollectionOperation() {
    const envNum = ({ development: 1, production: 2 })[this.dialogEnv] as 1|2;
    if (this.dialogContentType === 'create') {
      this.addCollection(envNum);
    }
    else if (this.dialogContentType === 'remove') {
      this.removeCollection(envNum);
    }
    else {
      this.$message.error('操作错误');
    }
  }
}
</script>

<style lang="scss" scoped>
.menu {
  width: 400px;
  border-left: solid 1px #ddd;
  padding: 20px;

  .database__wrap {
    margin-bottom: 20px;
  }
  
  .database__header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .env-name {
    font-size: 20px;
    color: black;
    font-weight: bolder;
  }
  .coll-name {
    margin-right: 10px;
  }
}
</style>