<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="车牌识别重命名" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item required has-feedback label="名称" name="name"
                :rules="[{ required: true, validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required]) }]">
                <a-input v-model:value="formState.name" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
        </gc-formx>
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupLicensePlateUpdate">
import { ref, reactive } from 'vue'
import $vaild from '@components/js/vaild'
import { createCfg, handleRequest, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'

import licensePlateApi from '@api/licensePlate/licensePlateApi'


const formx = ref()
interface FormState {
    id: string
    name: string
}
const cfg = reactive(createCfg({
  api: licensePlateApi.update,
  data: {
    id: '',
    name: ""
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

const popup = (defaultData: FormState) => {
  show(cfg, defaultData)
}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
