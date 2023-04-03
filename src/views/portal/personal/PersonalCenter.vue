<!--
 * @Description: 个人中心
 * @Author: laigt
 * @Date: 2023-02-2
-->
<template>
  <outer-frame v-if="USE_FRAME">
    <inner-frame>
      <template #left>
        <left-menu :menus="personalMenus"></left-menu>
      </template>
      <router-view></router-view>
    </inner-frame>
  </outer-frame>
  <router-view v-else></router-view>
</template>
<script name="PersonalCenter" setup lang="ts">
import OuterFrame from '@components/ifram/outer-frame.vue'
import InnerFrame from '@components/ifram/inner-frame.vue'
import LeftMenu from '@components/ifram/left-menu.vue'
import personalMenus from '@/meuns/personalCenter'
import CONFIG from '@/config'

// demo模式使用静态图片，不使用内部框架
const USE_FRAME = CONFIG.APP_IS_DEMO === false
</script>
<style lang="less" scoped>

</style>
