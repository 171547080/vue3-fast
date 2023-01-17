<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="新增拥堵预测" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item required has-feedback label="名称" name="name">
                <a-input v-model:value="formState.name" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item required has-feedback label="设备类型" name="deviceType">
                <a-select class="item-input" :allowClear="true" v-model:value="formState.deviceType"
                    @change="handleTypeChnage" :disabled="cfg.submitting">
                    <a-select-option v-for="(d, key) in deviceTypeMap" :value="key" :key="key">{{ d }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item required has-feedback :label="deviceTypeMap[formState.deviceType] + '数据源'" name="sourceNo">
                <a-select class="item-input" :allowClear="true" v-model:value="formState.sourceNo"
                    :disabled="cfg.submitting || !formState.deviceType">
                    <a-select-option v-for="(d, key) in sourceList" :value="d.no" :key="key">{{ d.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item required has-feedback label="镇区" name="area">
                <a-select class="item-input" :allowClear="true" v-model:value="formState.area"
                    :disabled="cfg.submitting">
                    <a-select-option v-for="(d, key) in areaMap" :value="key" :key="key">{{ d }}</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item required has-feedback label="位置" name="location">
                <a-input v-model:value="formState.location" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item required has-feedback label="经度" name="y">
                <a-input v-model:value="formState.y" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item required has-feedback label="纬度" name="x">
                <a-input v-model:value="formState.x" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
        </gc-formx>
    </gc-modalx>
</template>


<script setup lang="ts" name="PopupTrafficJamMonitorAdd">
import { ref, reactive } from 'vue'
import { createCfg, handleRequest, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'


import forecastApi from '@/api/forecast/forecastApi'
import monitorApi from '@api/jam/monitorApi'

const formx = ref()
interface FormState {
    name: string
    no: string
    deviceType: string
    area: string
    sourceNo: string
    location: string
    orientations: string
    url: string
    x: string
    y: string
}
const cfg = reactive(createCfg({
  api: forecastApi.update,
  data: {
    name: "",
    no: "",
    deviceType: "",
    area: "",
    location: "",
    orientations: "",
    sourceNo: "",
    url: "",
    x: "",
    y: ""
  },
  handleRequest: handleRequest
}))

const formState: FormState = cfg.data as FormState

const deviceTypeMap = {
  'camera': '摄像头',
  'video': '视频流'
}

const areaMap = {
  'ssl': '松山湖高新区',
  'nc': '南城街道',
  'dc': '东城街道',
  'dl': '大朗镇',
  'lb': '寮步镇'
}

const handleTypeChnage = () => {
  loadSourcList()
}

interface sourceType { no: string, name: string }
const sourceList = ref(new Array<sourceType>())
const loadSourcList = () => {
  monitorApi.page({}).then((res) => {
    sourceList.value = res.data
  })
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

const popup = (defaultData?: FormState) => {
  // 处理函数 
  const data: FormState = defaultData || { name: "", no: "", deviceType: "", area: "", location: "", orientations: "", url: "", x: "", y: "", sourceNo: "" }
  data.deviceType = 'camera'
  loadSourcList()
  show(cfg, data)
}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
