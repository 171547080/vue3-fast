<template>
    <div ref="globalModal">
        <a-modal v-model:visible="visible" :getContainer="() => globalModal" :okText="props.okText"
            :class="{ modal: !props.confirm }" :cancel-text="props.cancelText" @ok="handleOk" @cancel="handelCancel"
            :ok-button-props="{ disabled: props.submitting, loading: props.submitting }"
            :cancel-button-props="{ disabled: props.submitting, loading: props.submitting }" :destroyOnClose="true">

            <template #title v-if="!props.confirm">
                <div ref="modalTitleRef" class="modal-title">{{ props.title }}</div>
            </template>

            <template v-if="!confirm">
                <a-spin :spinning="loading">
                    <slot></slot>
                </a-spin>
            </template>

            <div v-else>
                <p class="confirm-title">
                    <exclamation-circle-outlined class="tips-icon" /> <span class="text"> {{ title }}</span>
                </p>
                <div>
                    <a-spin :spinning="loading">
                        <slot></slot>
                    </a-spin>
                </div>
            </div>
        </a-modal>
    </div>
</template>
<script setup lang="ts" name="modalx">
import { ref, watch } from 'vue'
import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
const emit = defineEmits<{
    (e: 'onOk', event: any): void,
    (e: 'onCancel', event: any): void,
    (e: 'update:show', value: any): void,
}>()
const globalModal = ref()
const visible = ref<boolean>(false)


// 同步 props.show 与 visible 的属性
watch(() => props.show, (value) => {
  visible.value = value
})

watch(() => visible.value, (value) => {
  emit("update:show", value);
})


const props = defineProps({
  show: {
    type: Boolean,
    default: false
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  okText: {
    type: String,
    default: '确定'
  },
  title: {
    type: String,
    require: true,
    default: ''
  },
  submitting: {
    type: Boolean,
    default: false
  },
  confirm: {
    type: Boolean,
    default: false
  },
  loading: {
    type: Boolean,
    default: false
  }
})
const show = () => {
  visible.value = true
}

const hide = () => {
  visible.value = false
}

const handleOk = ((e?: any) => {
  emit('onOk', e)
})
const handelCancel = ((e?: any) => {
  hide()
  emit('onCancel', e)
})



defineExpose({
  show,
  hide
})
</script>
<style  lang="less" scoped>
:deep(.modal .ant-modal-content) {
    border-radius: 30px;
}

:deep(.modal .ant-modal-body) {
    padding: 25px 30px 5px 30px;
}

:deep(.modal .ant-modal-header) {
    background-color: #003366;

    border-radius: 30px 30px 0 0;
}

:deep(.modal .ant-modal-footer) {
    padding: 15px 30px;
}

:deep(.modal .ant-modal-close) {
    color: #fff;
}

:deep(.ant-modal-close:focus, .ant-modal-close) {
    :hover {
        color: #fff;
        font-weight: bold;
    }
}

.modal-title {
    text-align: center;
    color: #fff;
    font-weight: bold;
    font-size: 18px;
}

.confirm-title {
    line-height: 30px;
    font-size: 15px;
    font-weight: bold;

    .text {
        padding-left: 10px;
    }

    .tips-icon {
        font-size: 30px;
        color: #faad14;
        vertical-align: bottom;
    }
}
</style>
