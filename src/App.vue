<!--
 * @Description: 框架-APP入口
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <!-- <outer-frame> -->
  <div class="main">
    <router-view> </router-view>
  </div>
  <!-- </outer-frame> -->
</template>
<script name="app" setup>
import { onBeforeMount, provide } from 'vue'
// import OuterFrame from "./components/ifram/outer-frame.vue";
import { useAppStore } from '@store/index'

// import router from '@/router'
onBeforeMount(() => {
  // 检查登录信息
  // useUserStore().checkLogin(true);

  // 加载动态配置
  useAppStore().loadProperties()
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
