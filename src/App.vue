<template>
  <outer-frame>
    <router-view>
    </router-view>
  </outer-frame>
</template>
<script setup>
import { defineComponent, onBeforeMount } from "vue";
import OuterFrame from "./components/ifram/outer-frame.vue";
import { useUserStore, useAppStore } from "@store/index";

defineComponent({
  OuterFrame
})

onBeforeMount(() => {
  // 检查登录信息
  useUserStore().checkLogin(true);

  // 加载动态配置
  useAppStore().loadProperties()
})


</script>
<style lang="less" scoped>
</style>
