<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="新增" @on-ok="handelSubmit">
        <gc-formx ref="formx" :formState="formState" :layout="{ labelCol: { span: 8 }, wrapperCol: { span: 8 } }">
            <a-form-item label="流畅" name="SMOOTH">
                <a-switch v-model:checked="formState.SMOOTH" checked-children="开" un-checked-children="关"
                    :disabled="cfg.submitting" /><br />
            </a-form-item>
            <a-form-item label="轻度拥堵" name="LIGHT">
                <a-switch v-model:checked="formState.LIGHT" checked-children="开" un-checked-children="关"
                    :disabled="cfg.submitting" /><br />
            </a-form-item>
            <a-form-item label="中度拥堵" name="MEDIUM">
                <a-switch v-model:checked="formState.MEDIUM" checked-children="开" un-checked-children="关"
                    :disabled="cfg.submitting" /><br />
            </a-form-item>
            <a-form-item label="严重拥堵" name="HEAVY">
                <a-switch v-model:checked="formState.HEAVY" checked-children="开" un-checked-children="关"
                    :disabled="cfg.submitting" /><br />
            </a-form-item>
        </gc-formx>
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupVechicleTypeAlarm">
import { ref, reactive } from 'vue'
import { createCfg, commonSubmit, show, hide } from '@components/gc/utils/modalxUtils'
import alarmApi from '@/api/jam/alarmApi'


const formx = ref()
interface FormState {
    id: string
    HEAVY: boolean
    MEDIUM: boolean
    LIGHT: boolean
    SMOOTH: boolean
}

const cfg = reactive(createCfg({
  api: alarmApi.update,
  data: {
    id: '',
    HEAVY: false,
    MEDIUM: false,
    LIGHT: false,
    SMOOTH: false
  },
  handleRequest: (data: FormState) => {
    const params = {
      id: data.id,
      settings: {
        HEAVY: data.HEAVY || false,
        MEDIUM: data.MEDIUM || false,
        LIGHT: data.LIGHT || false,
        SMOOTH: data.SMOOTH || false
      }
    }
    return params
  }
}))

const formState: FormState = cfg.data as FormState

const popup = (data: FormState) => {
  // 处理函数 
  show(cfg, data)
  cfg.loading = true

  alarmApi.detail(data.id).then((res) => {
    show(cfg, { id: data.id, ...res.data })
    cfg.loading = false
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

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
