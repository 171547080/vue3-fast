<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="编辑" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item required has-feedback label="名称" name="name"
                :rules="[{ required: true, validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required]) }]">
                <a-input v-model:value="formState.name" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <template v-if="formState.type === 'RTSP'">
                <a-form-item label="视频流地址" name="dataSource">
                    <span> {{ formState.dataSource || '--' }} </span>
                </a-form-item>
            </template>

            <template v-if="formState.type === 'Monitor'">
                <a-form-item label="摄像头" name="monitorId">
                    <span> {{ monitorData.name || formState.dataSourceDescription }}</span>
                </a-form-item>
            </template>
        </gc-formx>
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupVechicleTypeUpdate">
import { ref, reactive } from 'vue'
import { createCfg, handleRequest, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'
import $vaild from '@components/js/vaild'

import jamApi from '@/api/jam/jamApi'
import monitorApi from '@/api/jam/monitorApi'

const formx = ref()
interface FormState {
    id: string
    name: string
    type: string
    positionDescription: string
    dataSource: string
    latitude: string
    longitude: string
    monitorId: string
    dataSourceDescription: string
}

const monitorData = reactive({
  id: '',
  name: ''
})
const cfg = reactive(createCfg({
  api: jamApi.update,
  data: {
    id: '',
    name: "",
    type: "RTSP",
    positionDescription: "",
    dataSource: "",
    latitude: "",
    longitude: "",
    monitorId: "",
    dataSourceDescription: ""
  },
  handleRequest: handleRequest
}))

const formState: FormState = cfg.data as FormState

const loadMonitorData = (id: string) => {
  monitorApi.detail(id).then((res) => {
    monitorData.id = res.data.id
    monitorData.name = res.data.name
  })
}

const handelCancel = () => {
  cancel(cfg)
}

const popup = (defaultData: FormState) => {
  // 处理函数 
  const data = defaultData
  if (data.monitorId) {
    loadMonitorData(data.monitorId)
  }
  show(cfg, data)
}

const emit = defineEmits<{
    (e: 'onSubmit', event: any): void,
}>()

const handelSubmit = () => {
  commonSubmit(formx.value, cfg).then(() => {
    emit('onSubmit', cfg.data)
  })
}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
