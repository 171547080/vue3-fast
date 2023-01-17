<template>
    <inner-frame>
        <template #left>
            <left-menu :menus="system"></left-menu>
        </template>
        <router-view></router-view>
    </inner-frame>
</template>
<script setup lang="ts">
import InnerFrame from '@components/ifram/inner-frame.vue'
import LeftMenu from '@components/ifram/left-menu.vue'
import { defineComponent } from 'vue';

import { system } from '../../meuns'
defineComponent({
  InnerFrame,
  LeftMenu
})
</script>
