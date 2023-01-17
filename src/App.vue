<template>
  <outer-frame>
    <router-view>
    </router-view>
  </outer-frame>
</template>
<script setup>
import { defineComponent } from "vue";
import OuterFrame from "./components/ifram/outer-frame.vue";
import { useUserStore, useAppStore } from "@/store";

defineComponent({
  OuterFrame
})
//检查登录信息
useUserStore().checkLogin(true);

// 模拟登录
useAppStore().loadProperties()

</script>
<style lang="less" scoped>
</style>
