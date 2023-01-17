<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="新增" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item required has-feedback label="名称" name="name">
                <a-input v-model:value="formState.name" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item required label="最小车速" name="min" :rules="[{ validator: minVaild }]">
                <a-input v-model:value="formState.min" autocomplete="off" :disabled="cfg.submitting">
                    <template #addonAfter>
                        km/h
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item required label="最大车速" name="max" :rules="[{ validator: maxVaild }]">
                <a-input v-model:value="formState.max" autocomplete="off" :disabled="cfg.submitting">
                    <template #addonAfter>
                        km/h
                    </template>
                </a-input>
            </a-form-item>
        </gc-formx>
    </gc-modalx>
</template>


<script setup lang="ts" name="PopupTrafficJamMonitorAdd">
import { ref, reactive } from 'vue'
import type { Rule } from 'ant-design-vue/es/form';
import { createCfg, handleRequest, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'

import configApi from '@/api/jam/configApi'

const formx = ref()
interface FormState {
    name: string
    level?: number
    min?: number
    max?: number
}
const cfg = reactive(createCfg({
  api: configApi.add,
  data: {
    name: "",
    level: null,
    min: null,
    max: null
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

const popup = (defaultData?: FormState) => {
  // 处理函数 
  const data: FormState = defaultData || { name: "" }
  show(cfg, data)
}

const minVaild = async (_rule: Rule, value: number) => {
  if (value && formState.max && value >= formState.max) {
    return Promise.reject('最小车速需要小于最大车速');
  }
};
const maxVaild = (_rule: Rule, value: number) => {
  if (value && formState.min && value <= formState.min) {
    return Promise.reject('最小车速需要小于最大车速');
  }
}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
