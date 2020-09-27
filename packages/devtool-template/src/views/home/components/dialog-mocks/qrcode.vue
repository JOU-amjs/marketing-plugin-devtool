<!--
 * @Date: 2020-07-06 21:28:03
 * @LastEditors: JOU(wx: huzhen555)
 * @LastEditTime: 2020-09-23 09:18:54
--> 
<template>
  <div class="qrcode-container">
    <el-image :src="url">
      <template #placeholder>
        <div class="loading">加载中...</div>
      </template>
    </el-image>
    <span class="tips">手机必须和PC在同一局域网下</span>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator';
import { Image } from 'element-ui';

@Component({
  components: {
    [Image.name]: Image,
  }
})
export default class ConfigFrame extends Vue {
  @Prop(String) private url!: string;
  
}
</script>

<style lang="scss" scoped>
.qrcode-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  .loading {
    width: 150px;
    height: 150px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #f5f5f5;
  }
  .tips {
    color: #999;
    margin-top: 10px;
  }
}
</style>