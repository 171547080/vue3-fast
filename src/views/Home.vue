<!--
 * @Description: 框架-首页
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <div class="content-warp" style="width: 100%">
    <div>
      首页
    </div>
  </div>
</template>
<script name="hone" lang="ts" setup>
import { useUserStore } from "@store/index";
import router  from "@/router"

useUserStore().checkLogin(true);
router.push({name: "AI"})
</script>
<style lang="less" scoped>
</style>
