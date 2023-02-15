<!--
 * @Description: 弹出框-个人中心-工单申请-删除
 * @Author: laigt
 * @Date: 2023-02-7
-->
<template>
  <gc-modalx
    v-model:show="cfg.show"
    v-model:submitting="cfg.submitting"
    title="是否删除订单"
    :confirm="true"
    @on-ok="handelSubmit"
  >
    确认删除【 {{ formState.name }} 】
  </gc-modalx>
</template>

<script setup lang="ts" name="PopupPersonalApplyDelete">
import { reactive } from 'vue'
import {
  createCfg,
  commonConfirm,
  show,
  hide
} from '@components/gc/utils/modalxUtils'

import applyApi from '@api/personal/applyApi'

interface FormState {
  id: string;
  name: string;
}

const cfg = reactive(
  createCfg({
    api: applyApi.del,
    data: {
      id: '',
      name: ''
    },
    handleRequest: (data: FormState) => {
      return data.id
    }
  })
)

const formState: FormState = cfg.data as FormState

const confirm = (defaultData?: FormState) => {
  // 处理函数
  const data = defaultData || {}
  show(cfg, data)
}

const emit = defineEmits<{(e: 'onSubmit', event: any): void;
}>()

const handelSubmit = () => {
  commonConfirm(cfg, '删除成功').then(() => {
    emit('onSubmit', cfg.data)
  })
}

defineExpose({
  confirm,
  hide: () => {
    hide(cfg)
  }
})
</script>
<style lang="less" scoped></style>
