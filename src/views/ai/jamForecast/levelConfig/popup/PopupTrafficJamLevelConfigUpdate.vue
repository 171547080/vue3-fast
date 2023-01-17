<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="拥堵等级配置" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item label="名称" name="cnJamLv">
                <span>{{ formState.cnJamLv }}</span>
            </a-form-item>
            <a-form-item label="最小车速" name="minSpeed" :rules="[{ validator: minVaild }]">
                <a-input v-model:value="formState.minSpeed" placeholder="0" autocomplete="off"
                    :disabled="cfg.submitting">
                    <template #addonAfter>
                        km/h
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item label="最大车速" name="maxSpeed" :rules="[{ validator: maxVaild }]">
                <a-input v-model:value="formState.maxSpeed" placeholder="不限" autocomplete="off"
                    :disabled="cfg.submitting">
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
import { createCfg, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'

import configApi from '@/api/jam/configApi'

const formx = ref()
interface FormState {
    id: string
    cnJamLv: string
    minSpeed?: string
    maxSpeed?: string
}
const cfg = reactive(createCfg({
  api: configApi.update,
  data: {
    id: '',
    cnJamLv: '',
    minSpeed: '',
    maxSpeed: ''
  },
  handleRequest: (data: FormState) => {

    if (!data.minSpeed) {
      data.minSpeed = ''
    }

    if (!data.maxSpeed) {
      data.maxSpeed = ''
    }
    return data
  }
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
  // 处理函数 
  const data: FormState = defaultData
  if (!data.minSpeed) {
    data.minSpeed = '0'
  }
  show(cfg, data)
}

const minVaild = async (_rule: Rule, value: number) => {
  if (formState.maxSpeed && value && formState.maxSpeed && value >= Number(formState.maxSpeed)) {
    return Promise.reject('最小车速需要小于最大车速');
  }
  return Promise.resolve();
};
const maxVaild = (_rule: Rule, value: number) => {
  if (formState.minSpeed && value && formState.minSpeed && value <= Number(formState.minSpeed)) {
    return Promise.reject('最小车速需要小于最大车速');
  }
  return Promise.resolve();
}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
