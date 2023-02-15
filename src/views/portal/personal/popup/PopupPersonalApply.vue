<!--
 * @Description: 弹出框-个人中心-工单申请-创建
 * @Author: laigt
 * @Date: 2023-02-7
-->
<template>
  <gc-modalx
    v-model:show="cfg.show"
    v-model:submitting="cfg.submitting"
    v-model:cancelText="cfg.cancelText"
    v-model:okText="cfg.okText"
    :title="isUpdate?'创建订单':'编辑订单'"
    @on-ok="handelSubmit"
    @on-cancel="handelCancel"
  >
    <gc-formx ref="formx" :formState="formState">
      <a-form-item
        has-feedback
        label="人员名称"
        name="username"
        :rules="[
          {
            required: true,
            validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required]),
          },
        ]"
      >
        <a-input
          v-model:value="formState.username"
          autocomplete="off"
          :disabled="cfg.submitting"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="工单名称"
        name="name"
        :rules="[
          {
            required: true,
            validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required]),
          },
        ]"
      >
        <a-input
          v-model:value="formState.name"
          autocomplete="off"
          :disabled="cfg.submitting"
        />
      </a-form-item>
    </gc-formx>
  </gc-modalx>
</template>

<script setup lang="ts" name="PopupPersonalApplyAdd">
import { ref, reactive } from 'vue'
import {
  createCfg,
  commonSubmit,
  show,
  hide,
  cancel
} from '@components/gc/utils/modalxUtils'
import $vaild from '@components/js/vaild'
import applyApi from '@/api/personal/applyApi'

const formx = ref()
const isUpdate = ref(false)
interface FormState {
  name: string;
  username: string;
}
const cfg = reactive(
  createCfg({
    api: applyApi.add,
    data: {
      name: '',
      username: ''
    }
  })
)

const formState: FormState = cfg.data as FormState

const emit = defineEmits<{(e: 'onSubmit', event: any): void;}>()

const handelSubmit = () => {
  const successText = isUpdate.value ? '编辑操作成功' : '创建操作成功'
  commonSubmit(formx.value, cfg, successText)
    .then(() => {
      emit('onSubmit', cfg.data)
    })
    .catch(() => {
      // not do something
    })
}

const handelCancel = () => {
  cancel(cfg)
}

const popup = (defaultData?: FormState) => {
  // 处理函数
  const data: FormState = defaultData || {
    name: '',
    username: ''
  }

  show(cfg, data)
}
/**
 * 创建
 * @param defaultData
 */
const showadd = (defaultData?: FormState) => {
  isUpdate.value = false
  cfg.api = applyApi.add
  show(cfg, defaultData)
}

/**
 * 编辑
 * @param defaultData
 */
const showUpdate = (defaultData?: FormState) => {
  isUpdate.value = true
  cfg.api = applyApi.update
  show(cfg, defaultData)
}

defineExpose({
  popup,
  showadd,
  showUpdate,
  hide: () => {
    hide(cfg)
  }
})
</script>
<style lang="less" scoped></style>
