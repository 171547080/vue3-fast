<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="新增" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item required has-feedback label="名称" name="name"
                :rules="[{ required: true, validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required]) }]">
                <a-input v-model:value="formState.name" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item required has-feedback label="编号" name="deviceCode"
                :rules="[{ required: true, validator: $vaild.queue([$vaild.maxLength(2, 100), $vaild.required]) }]">
                <a-input v-model:value="formState.deviceCode" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item has-feedback label="设备类型" name="type">
                <span>{{ deviceTypeMap[formState.type] }}</span>
            </a-form-item>
            <a-form-item :label="deviceTypeMap[formState.type] + '地址'" name="dataSource">
                <span>{{ formState.dataSource }}</span>
            </a-form-item>

            <a-form-item required has-feedback label="经度" name="longitude" :rules="[{ required: true, validator: $vaild.queue([$vaild.numberBetween(-180, 180),$vaild.required])  }]">
                <a-input v-model:value="formState.longitude" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item required has-feedback label="纬度" name="latitude" :rules="[{ required: true, validator: $vaild.queue([$vaild.numberBetween(-90, 90),$vaild.required])  }]">
                <a-input v-model:value="formState.latitude" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item has-feedback label="方向" name="direction"  :rules="[{ validator: $vaild.queue([$vaild.maxLength(2, 50)]) }]">
                <a-input v-model:value="formState.direction" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item has-feedback label="位置" name="positionDescription" :disabled="cfg.submitting"
                :rules="[{ validator: $vaild.queue([$vaild.maxLength(0, 500)]) }]">
                <a-textarea v-model:value="formState.positionDescription" autocomplete="off"
                    :disabled="cfg.submitting" />
            </a-form-item>

        </gc-formx>
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupTrafficJamMonitorAdd">
import { ref, reactive } from 'vue'
import { createCfg, handleRequest, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'
import $vaild from '@components/js/vaild'

import monitorApi from '@/api/jam/monitorApi'


const formx = ref()
interface FormState {
    name: string
    type: string
    deviceCode: string
    dataSource: string
    town: string
    longitude: string
    latitude: string
    positionDescription: string
    direction: string
}
const cfg = reactive(createCfg({
  api: monitorApi.update,
  data: {
    id: "",
    name: "",
    type: "",
    deviceCode: "",
    dataSource: "",
    town: "",
    longitude: "",
    latitude: "",
    positionDescription: "",
    direction: ""
  },
  handleRequest: handleRequest
}))

const formState: FormState = cfg.data as FormState

const deviceTypeMap = {
  'RTSP': '视频流'
}

const emit = defineEmits<{
    (e: 'onSubmit', event: any): void,
}>()

const handelSubmit = () => {
  commonSubmit(formx.value, cfg).then(() => {
    emit('onSubmit', cfg.data)
  })
}

const handelCancel = () => {
  cancel(cfg)
}

const popup = (defaultData: FormState) => {
  // 处理函数 
  const data: FormState = defaultData
  show(cfg, data)
}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
