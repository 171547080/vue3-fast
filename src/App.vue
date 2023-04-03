<!--
 * @Description: 框架-APP入口
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <div class="main">
    <router-view> </router-view>
  </div>
  <i-cfg-drawer v-if="showCfg"></i-cfg-drawer>
</template>
<script name="app" setup>
import { onBeforeMount, provide } from 'vue'
import ICfgDrawer from '@components/ifram/i-cfg-drawer.vue'
import CONFIG from '@/config'

import { useAppStore, usePermissionStore } from '@store/index'
const showCfg = true
// import router from '@/router'
onBeforeMount(() => {
  // 检查登录信息
  // useUserStore().checkLogin(true);

  // 加载动态配置
  useAppStore().loadProperties()

  if (CONFIG.APP_IS_DEMO === false) {
    // 加载当前用户权限
    usePermissionStore().loadPermissions()
  }
})
const MOCK_USER = {
  userId: '1',
  username: 'admin',
  realName: '系统管理员'
}
provide('userInfo', MOCK_USER)

// router.push({name: "home"})
</script>
<style lang="less" scoped>
.main {
  min-height: 100vh;
  min-width: 1000px;
}
</style>
