<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" title="是否删除拥堵预测实例" @on-ok="handelSubmit"
        :confirm="true">
        确认删除【 {{ formState.name }} 】
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupVechicleTypeAdd">
import { ref, reactive } from 'vue'
import { createCfg, handleRequest, commonConfirm, show, hide } from '@components/gc/utils/modalxUtils'

import forecastApi from '@/api/forecast/forecastApi'

const formx = ref()
interface FormState {
    id: string
    name: string
}

const cfg = reactive(createCfg({
  api: forecastApi.delete,
  data: {
    id: "",
    name: ""
  },
  handleRequest: handleRequest
}))

const formState: FormState = cfg.data as FormState


const confirm = (defaultData?: FormState) => {
  // 处理函数 
  const data = defaultData || {}
  show(cfg, data)
}

const emit = defineEmits<{
    (e: 'onSubmit', event: any): void,
}>()

const handelSubmit = () => {
  commonConfirm(cfg, '删除成功').then(() => {
    emit('onSubmit', cfg.data)
  })
}

defineExpose({
  confirm,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
