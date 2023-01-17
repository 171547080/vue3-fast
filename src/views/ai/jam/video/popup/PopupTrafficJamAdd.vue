<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="新增" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item required has-feedback label="名称" name="name"
                :rules="[{ required: true, validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required]) }]">
                <a-input v-model:value="formState.name" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>

            <a-form-item label="类型" name="type" :rules="[{ required: true, validator: $vaild.required }]">
                <a-select class="item-input" :allowClear="true" v-model:value="formState.type"
                    :disabled="cfg.submitting">
                    <a-select-option v-for="(d, key) in typeMap" :value="key" :key="key">{{ d }}</a-select-option>
                </a-select>
            </a-form-item>

            <template v-if="formState.type === 'RTSP'">
                <a-form-item required has-feedback label="视频流地址" name="dataSource"
                    :rules="[{ required: true, validator: $vaild.queue([$vaild.rtspURL, $vaild.maxLength(4, 400), $vaild.required]) }]">
                    <a-input v-model:value="formState.dataSource" autocomplete="off" :disabled="cfg.submitting" />
                </a-form-item>
            </template>

            <template  v-if="formState.type === 'Monitor'">
                <a-form-item required has-feedback label="摄像头" name="monitorId">
                    <a-select class="item-input" :allowClear="true" v-model:value="formState.monitorId"
                        :disabled="cfg.submitting">
                        <a-select-option v-for="(d) in dataSourceList" :value="d.id" :key="d.id">{{ d.name }}
                        </a-select-option>
                    </a-select>
                </a-form-item>
            </template>
    
            <!-- <a-form-item label="描述" name="dataSourceDescription">
                <a-textarea v-model:value="formState.dataSourceDescription" autocomplete="off"
                    :disabled="cfg.submitting" />
            </a-form-item> -->
        </gc-formx>
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupVechicleTypeAdd">
import { ref, reactive } from 'vue'
import { createCfg, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'
import $vaild from '@components/js/vaild'

import jamApi from '@/api/jam/jamApi'
import monitorApi from '@/api/jam/monitorApi'

const typeMap = {
  RTSP: "视频流",
  Monitor: '监控设备'
}

const formx = ref()
interface FormState {
    name: string
    type: string
    positionDescription: string
    dataSource: string
    latitude: string
    longitude: string
    monitorId: string
    dataSourceDescription: string
}
interface SourceItemType {
    id: string
    name: string
}

const cfg = reactive(createCfg({
  api: jamApi.add,
  data: {
    name: "",
    type: "RTSP",
    positionDescription: "",
    dataSource: "",
    latitude: "",
    longitude: "",
    monitorId: "",
    dataSourceDescription: ""
  },
  handleRequest: (data: FormState) => {
    if (data.type === 'RTSP') {
      data.monitorId = ''
    } else {
      data.dataSource = ''
    }

    return data
  }
}))

const formState: FormState = cfg.data as FormState

const dataSourceList = ref<Array<SourceItemType>>([])

const loadSourceList = () => {
  monitorApi.list().then((res) => {
    dataSourceList.value = [].concat(res.data.list)
  })
}

const handelCancel = () => {
  cancel(cfg)
}

const popup = (defaultData?: object) => {
  // 处理函数 
  const data = defaultData || { type: "RTSP" }
  loadSourceList()
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
