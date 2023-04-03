<!--
 * @Description: 个人中心-我的申请记录
 * @Author: laigt
 * @Date: 2023-02-16
-->
<template>
  <div class="content">
      <page-view v-if="USE_FRAME"></page-view>
      <img v-else src="/img/inside/demo/work-order.png">

  </div>
</template>
<script name="WorkOrder" setup lang="ts">
import pageView from './WorkOrderCenter.vue'
import CONFIG from '@/config'

// demo模式使用静态图片，不使用内部框架
const USE_FRAME = CONFIG.APP_IS_DEMO === false
console.error(CONFIG.APP_IS_DEMO)
</script>
<style lang="less" scoped>
.content {
  // min-height: 100vh;

  img {
      width: 100%
  }
}
</style>
