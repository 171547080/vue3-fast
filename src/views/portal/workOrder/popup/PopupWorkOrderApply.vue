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
    :title="isUpdate?'创建工单':'编辑工单'"
    @on-ok="handelSubmit"
    @on-cancel="handelCancel"
  >
    <gc-formx ref="formx" :formState="formState">
      <a-form-item
      v-if="isUpdate"
        label="工单号"
      >
        <span>{{ formState.no }}</span>
      </a-form-item>
      <a-form-item
        v-else
        has-feedback
        label="工单号"
        name="no"
        :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required])}]"
      >
        <a-input
          v-model:value="formState.no"
          autocomplete="off"
          placeholder="请输入工单号"
          :disabled="cfg.submitting"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="工单名称"
        name="name"
        :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required])}]"
      >
        <a-input
          v-model:value="formState.name"
          placeholder="请输入工单名称"
          autocomplete="off"
          :disabled="cfg.submitting"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="人员名称"
        name="username"

        :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required])}]"
      >
        <a-input
          v-model:value="formState.username"
          placeholder="请输入人员名称"
          autocomplete="off"
          :disabled="cfg.submitting"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="手机号码"
        name="phone"
        :rules="[{required: true,validator: $vaild.queue([$vaild.mobilePhone, $vaild.required])}]"
      >
        <a-input
          v-model:value="formState.phone"
          autocomplete="off"
          placeholder="请输入手机号码"
          :disabled="cfg.submitting"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="职位"
        name="position"
        :rules="[{required: true,validator: $vaild.queue([$vaild.required])}]"
      >
        <a-select
        v-model:value="formState.position"
        placeholder="请选择职位"
        autocomplete="off"
        :allowClear="true"
        :disabled="cfg.submitting"
      >
        <a-select-option v-for="(d, key) in positionMap" :key="key" :value="key">{{
          d
        }}</a-select-option>
      </a-select>
      </a-form-item>
    </gc-formx>
  </gc-modalx>
</template>

<script setup lang="ts" name="PopupWorkOrderApply">
import { ref, reactive } from 'vue'
import {
  createCfg,
  commonSubmit,
  show,
  hide,
  cancel
} from '@components/gc/utils/modalxUtils'
import $vaild from '@components/js/vaild'
import orderApi from '@/api/workOrder/orderApi'

interface FormState {
  name: string;
  username: string;
  no: string | number;
  phone: string | number;
  position: string;
}

const positionMap = {
  1: '普通员工',
  2: '部门领导'
}

const formx = ref()
const isUpdate = ref(false)

const cfg = reactive(
  createCfg({
    api: orderApi.add,
    data: {
      name: '',
      username: '',
      phone: '',
      position: '',
      no: ''
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
  const data: FormState = defaultData || {} as FormState

  show(cfg, data)
}
/**
 * 创建
 * @param defaultData
 */
const showadd = (defaultData?: FormState) => {
  isUpdate.value = false
  cfg.api = orderApi.add

  // 处理函数
  const data: FormState = defaultData || {} as FormState
  show(cfg, data)
}

/**
 * 编辑
 * @param defaultData
 */
const showUpdate = (defaultData?: FormState) => {
  isUpdate.value = true
  cfg.api = orderApi.update
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
