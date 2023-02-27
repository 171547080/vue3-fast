<!--
 * @Description: 消息列表-框架入口
 * @Author: laigt
 * @Date: 2023-02-27
-->
<template>
    <outer-frame v-if="USE_FRAME">
      <inner-frame>
        <template #left>
          <left-menu :menus="messageMenus"></left-menu>
        </template>
        <router-view></router-view>
      </inner-frame>
    </outer-frame>
    <router-view v-else></router-view>
  </template>
<script name="MessageCenter" setup lang="ts">
import OuterFrame from '@components/ifram/outer-frame.vue'
import InnerFrame from '@components/ifram/inner-frame.vue'
import LeftMenu from '@components/ifram/left-menu.vue'
import messageMenus from '@/meuns/messageCenter'
const USE_FRAME = true
</script>
<style lang="less" scoped>

</style>
