<!--
 * @Description: 弹出框-个人中心-消息申请-删除
 * @Author: laigt
 * @Date: 2023-02-27
-->
<template>
  <gc-modalx
    v-model:show="cfg.show"
    v-model:submitting="cfg.submitting"
    title="是否删除订单"
    :confirm="true"
    @on-ok="handelSubmit"
  >
   <div v-if="currentConfirmType === 'single'"> 确认删除【 {{ formState.name }} 】</div>
   <div v-if="currentConfirmType === 'batch'">
     <div>确认删除：</div>
     <div v-for="d,i in arrayFormState" :key="d.name + '_' + i">【{{ d.name }}( {{d.id}} )】</div>
    </div>
  </gc-modalx>
</template>

<script setup lang="ts" name="PopupWorkOrderDelete">
import { reactive, ref } from 'vue'
import {
  createCfg,
  commonConfirm,
  show,
  hide,
  messageSucess
} from '@components/gc/utils/modalxUtils'

import messageApi from '@/api/message/messageApi'

interface FormState {
  id: string;
  name: string;
}
type confirmType = 'single'|'batch';

const cfg = reactive(
  createCfg({
    api: messageApi.del,
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
const arrayFormState = ref<Array<FormState>>([])
const currentConfirmType = ref<confirmType>('single')
/**
 * 删除确认
*/
const confirm = (defaultData?: FormState) => {
  currentConfirmType.value = 'single'

  // 处理函数
  const data = defaultData || {}
  show(cfg, data)
}

/**
 * 批量确认删除
*/
const batchConfirm = (array?: Array<FormState>) => {
  currentConfirmType.value = 'batch'

  // 处理函数
  arrayFormState.value = array || []
  // 处理多个id
  show(cfg)
}

const emit = defineEmits<{(e: 'onSubmit', event: any): void;
}>()

const handelSubmit = () => {
  if (currentConfirmType.value === 'single') {
    commonConfirm(cfg, '删除成功').then(() => {
      emit('onSubmit', cfg.data)
    })
  }

  if (currentConfirmType.value === 'batch') {
    cfg.loading = true
    arrayFormState.value.forEach(item => {
      const param = item.id

      cfg.api(param).then(() => {
        // 排除重复执行
        if (cfg.loading) {
          cfg.loading = false
          messageSucess('批量删除操作发送成功')
          hide(cfg)
          emit('onSubmit', cfg.data)
        }
      })
    })
  }
}

defineExpose({
  confirm,
  batchConfirm,
  hide: () => {
    hide(cfg)
  }
})
</script>
<style lang="less" scoped></style>
