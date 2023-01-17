<template>
    <inner-frame>
        <template #left>
            <left-menu :menus="ai"></left-menu>
        </template>
        <router-view></router-view>
    </inner-frame>
</template>
<script setup lang="ts">
import InnerFrame from '@components/ifram/inner-frame.vue'
import LeftMenu from '@components/ifram/left-menu.vue'
import { defineComponent } from 'vue';
import { ai } from '../../meuns'
defineComponent({
  InnerFrame,
  LeftMenu
})

</script>
<style lang="less" scoped>
.content {
    background: url(/img/bg/content-bg.jpg) 90% -3% no-repeat;
}
</style>
