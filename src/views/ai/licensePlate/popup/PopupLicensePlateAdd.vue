<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="车牌识别新增" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item required has-feedback label="名称" name="name" :rules="[{ required: true, validator: $vaild.queue([$vaild.maxLength(2, 50),$vaild.required]) }]">
                <a-input v-model:value="formState.name" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>

            <a-form-item required has-feedback label="图像" name="file">
                <input ref="uploadInputRef" name="file" type="file" @change="handleFileChange($event)">
            </a-form-item>
        </gc-formx>
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupLicensePlateAdd">
import { ref, reactive } from 'vue'
import { message } from 'ant-design-vue';
import $vaild from '@components/js/vaild'
import { createCfg, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'

import licensePlateApi from '@api/licensePlate/licensePlateApi'
const FILE_MAX_SIZE = 16 * 1024 * 1024 // 每个文件最大为16M

const formx = ref()
interface FormState {
    name: string,
    file: File | undefined
}
const cfg = reactive(createCfg({
  api: licensePlateApi.add,
  data: {
    name: ""
  },
  handleRequest: (data: FormState) => {
    // 上传文件需要使用formData格式
    let formData = new FormData()
    formData.append('name', data.name)
    if (data.file) {
      formData.append('file', data.file)
    }
    return formData
  }
}))

const formState: FormState = cfg.data as FormState
const uploadInputRef = ref()

const emit = defineEmits<{
    (e: 'onSubmit', event: any): void,
}>()


const handleFileChange = (event) => {
  const uploadFile = event.target.files[0]
  if (!uploadFile) {
    return
  }

  if (checkJEPIMage(uploadFile)) {
    formState.file = uploadFile
  } else {
    uploadInputRef.value.value = ''
    formState.file = undefined
  }
}
const checkJEPIMage = (uploadFile) => {
  // 判断文件是否为图片个格式
  if (!(uploadFile.type.indexOf('jpg') >= 0 || uploadFile.type.indexOf('jpeg') >= 0)) {
    message.error("当前图片不是JPG/JPEG格式图片")

    return false
  }


  if (uploadFile.size > FILE_MAX_SIZE) { // 判定上传文件大小是否超过上限
    message.error("上传文件大小是否超过上限( " + (FILE_MAX_SIZE / 1024 / 1024) + "MB )")
    return false
  }
  return true
}

const handelSubmit = () => {
  commonSubmit(formx.value, cfg).then(() => {
    emit('onSubmit', cfg.data)
  })
}
const handelCancel = () => {
  cancel(cfg)
}

const popup = () => {
  show(cfg, {})
}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
