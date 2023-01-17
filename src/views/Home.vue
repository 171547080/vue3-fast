<template>
  <div class="content-warp" style="width: 100%">
    <div></div>
  </div>
</template>
<script lang="ts" setup>
import { useUserStore } from "@/store";
import router  from "@/router"

useUserStore().checkLogin(true);
router.push({name: "AI"})
</script>
<style lang="less" scoped>
</style>
