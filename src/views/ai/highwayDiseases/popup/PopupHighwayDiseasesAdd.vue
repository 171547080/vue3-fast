<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="新增" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item required has-feedback label="名称" name="name">
                <a-input v-model:value="formState.name" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>

            <a-form-item label="类型" name="type" :rules="[{ required: true, validator: $vaild.required }]">
                <a-select class="item-input" :allowClear="true" v-model:value="formState.type"
                    :disabled="cfg.submitting">
                    <a-select-option v-for="(d, key) in typeMap" :value="key" :key="key">{{ d }}</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item v-if="formState.type === 'RTSP'" has-feedback label="视频地址" name="dataSource"
                :rules="[{ required: true, validator: $vaild.queue([$vaild.rtspURL, $vaild.maxLength(4, 400), $vaild.required]) }]">
                <a-input v-model:value="formState.dataSource" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>

            <a-form-item v-if="formState.type === 'CAMERA'" has-feedback label="摄像头" name="cameraId"
                :rules="[{ required: true, validator: $vaild.required }]">
                <a-select class="item-input" :allowClear="true" v-model:value="formState.cameraId"
                    :disabled="cfg.submitting">
                    <a-select-option v-for="d in cameraList" :value="d.url" :key="d.id">{{ d.name }}
                    </a-select-option>
                </a-select>
            </a-form-item>
        </gc-formx>
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupHighwayDiseasesAdd">
import { ref, reactive } from 'vue'
import { createCfg, handleRequest, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'
import $vaild from '@components/js/vaild'
import highwayApi from '@api/highway/highwayApi'

const typeMap = {
  RTSP: "视频流"
  // CAMERA: "摄像头",
}
const cameraList = [
  { id: 1, name: '摄像头A', url: 'rtsp://camera/1324635132' },
  { id: 2, name: '摄像头B', url: 'rtsp://camera/1324635132' },
  { id: 3, name: '摄像头C', url: 'rtsp://camera/1324635132' }
]
// const FILE_MAX_SIZE = 16 * 1024 * 1024 // 每个文件最大为16M

const formx = ref()
interface FormState {
    name: string,
    type: string,
    dataSource: string
    cameraId: string
}
const cfg = reactive(createCfg({
  api: highwayApi.add,
  data: {
    name: '',
    type: '',
    dataSource: ''
    // cameraId: ''
  },
  handleRequest: handleRequest
}))

const formState: FormState = cfg.data as FormState

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

const popup = (data) => {
  show(cfg, data)
}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
