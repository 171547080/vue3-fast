<template>
    <gc-modalx :v-modal="cfg.loading" v-model:show="cfg.show" v-model:submitting="cfg.submitting"
        v-model:okText="cfg.okText" title="监控设备详情" @on-ok="handelSubmit" :loading="cfg.loading">
        <gc-formx ref="formx" :formState="formState" :layout="{ labelCol: { span: 6 }, wrapperCol: { span: 12 } }">
            <a-form-item label="名称" name="name">
                {{ formState.name }}
            </a-form-item>
            <a-form-item label="编号" name="no">
                {{ formState.deviceCode }}
            </a-form-item>
            <a-form-item label="设备类型" name="deviceType">
                {{ deviceTypeMap[formState.type] }}
            </a-form-item>
            <a-form-item v-if="formState.type" :label="deviceTypeMap[formState.type] + '地址'" name="url">
                {{ formState.dataSource }}
            </a-form-item>

            <a-form-item label="经度" name="longitude">
                {{ formState.longitude }}
            </a-form-item>
            <a-form-item label="纬度" name="latitude">
                {{ formState.latitude }}
            </a-form-item>
            <a-form-item label="方向" name="direction">
                {{ formState.direction }}
            </a-form-item>
            <a-form-item label="位置" name="positionDescription">
                {{ formState.positionDescription }}
            </a-form-item>
        </gc-formx>
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupTrafficJamMonitorUpdate">
import { ref, reactive } from 'vue'
import { createCfg, handleRequest, show, hide } from '@components/gc/utils/modalxUtils'
import monitorApi from '@/api/jam/monitorApi'
const formx = ref()
interface FormState {
    id: string
    name: "",
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

const handelSubmit = () => {
  hide(cfg)
}

const popup = (defaultData: FormState) => {
  show(cfg)
  cfg.loading = true
  monitorApi.detail(defaultData.id).then((res) => {
    show(cfg, res.data)
    cfg.loading = false
  })

}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
