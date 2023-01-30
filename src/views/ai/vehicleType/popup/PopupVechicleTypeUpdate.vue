<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="编辑车型识别" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item has-feedback label="名称" name="name"
                :rules="[{ required: true, validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required]) }]">
                <a-input v-model:value="formState.name" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item label="类型" name="type">
                <span>{{ typeMap[formState.type] }} </span>
            </a-form-item>

            <a-form-item v-if="formState.type === 'VideoStream'" has-feedback label="视频地址" name="sourcePath">
                <span> {{ formState.sourcePath }}</span>
            </a-form-item>

            <a-form-item name="description" label="描述"
            :rules="[{validator: $vaild.queue([$vaild.maxLength(0, 500)]) }]">
                <a-textarea v-model:value="formState.description" :disabled="cfg.submitting" />
            </a-form-item>


        </gc-formx>
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupVechicleTypeUpdate">
import { ref, reactive } from 'vue'
import { createCfg, handleRequest, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'
import $vaild from '@components/js/vaild'


import vehicleTypeApi from '@/api/vehicleType/vehicleTypeApi'

const formx = ref()

interface FormState {
    id: string
    name: string
    sourcePath: string
    type: string
    description: string
}
const cfg = reactive(createCfg({
  api: vehicleTypeApi.update,
  data: {
    id: '',
    name: '',
    sourcePath: '',
    type: '',
    description: ''
  },
  handleRequest: handleRequest
}))

const typeMap = {
  VideoStream: "视频流",
  Picture: "图像"
}
const formState: FormState = cfg.data as FormState

const emit = defineEmits<{
    (e: 'onSubmit', event: any): void,
}>()

const handelSubmit = () => {
  commonSubmit(formx.value, cfg, "编辑成功").then(() => {
    emit('onSubmit', cfg.data)
  }).catch(() => {
    // not do something
  })

}

const handelCancel = () => {
  cancel(cfg)
}

const popup = (defaultData?: FormState) => {
  show(cfg, defaultData)
}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
