<template>
    <a-drawer class="drawer" :width="500" :height="height" :placement="placement" :visible="visible"
        :maskClosable="maskClosable" :mask="mask" @close="onClose">
        <template #extra>
            <a-button type="primary" @click="onClose">收起</a-button>
        </template>
        <!-- <template #closeIcon>
        </template> -->
        <template #title>
            <span v-if="title">{{ title }}</span>
            <span v-if="subTitle" class="sub-title" style="color: gray;font-size: 14px;margin-left: 10px;">({{ subTitle
            }})</span>
        </template>
        <CommonVideo ref="videoRef" @onPlay="handelPlay" />
    </a-drawer>
</template>
<script setup lang="ts">
import CommonVideo from '../../common/CommonVideo.vue'
import { ref } from 'vue'
const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String,
    default: 'top'
  },
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  height: {
    type: Number,
    default: 550
  },
  maskClosable: {
    type: Boolean,
    default: false
  },
  mask: {
    type: Boolean,
    default: true
  }
})

const emit = defineEmits<{
    (e: 'update:visible', value: any): void,
}>()

const onClose = () => {
  emit('update:visible', false)
}

const videoRef = ref<InstanceType<typeof CommonVideo>>()
const handelPlay = () => {
  console.error("handelPlay")
}
</script>

<style lang="less" scoped>
:v-deep(.ant-drawer-body) {
    padding-top: 5px;
}

:v-deep(.drawer) {
    .ant-drawer-title {
        .sub-title {
            color: gray;
            font-size: 12px;
        }

    }

}
</style>
