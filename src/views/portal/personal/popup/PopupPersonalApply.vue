<!--
 * @Description: 弹出框-个人中心-我的申请记录-创建/编辑
 * @Author: laigt
 * @Date: 2023-02-7
-->
<template>
  <gc-modalx
    v-model:show="cfg.show"
    v-model:submitting="cfg.submitting"
    v-model:cancelText="cfg.cancelText"
    v-model:okText="cfg.okText"
    :title="isUpdate?'编辑申请':'创建申请'"
    @on-ok="handelSubmit"
    @on-cancel="handelCancel"
  >
    <gc-formx ref="formx" :formState="formState">
      <a-form-item
      v-if="isUpdate"
        label="申请编号"
      >
        <span>{{ formState.no }}</span>
      </a-form-item>
      <a-form-item
        v-else
        has-feedback
        label="申编号"
        name="no"
        :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required])}]"
      >
        <a-input
          v-model:value="formState.no"
          autocomplete="off"
          placeholder="请输入申编号"
          :disabled="cfg.submitting"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="申请单位"
        name="applyUser"
        :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required])}]"
      >
        <a-input
          v-model:value="formState.applyUser"
          placeholder="请输入申请单位"
          autocomplete="off"
          :disabled="cfg.submitting"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="申请项目"
        name="name"
        :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required])}]"
      >
        <a-input
          v-model:value="formState.name"
          placeholder="请输入申请项目"
          autocomplete="off"
          :disabled="cfg.submitting"
        />
      </a-form-item>
      <a-form-item
        has-feedback
        label="项目标题"
        name="title"

        :rules="[{required: true,validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required])}]"
      >
        <a-input
          v-model:value="formState.title"
          placeholder="请输入项目标题"
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

interface FormState {
  no: string | number;
  applyUser: string;
  name: string;
  title: string;
  phone: string | number;
}

const formx = ref()
const isUpdate = ref(false)

const cfg = reactive(
  createCfg({
    api: applyApi.add,
    data: {
      no: '',
      applyUser: '',
      title: '',
      phone: '',
      name: ''
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
  cfg.api = applyApi.add

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
