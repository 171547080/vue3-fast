<template>
    <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
        v-model:okText="cfg.okText" title="新增车型识别" @on-ok="handelSubmit" @on-cancel="handelCancel">
        <gc-formx ref="formx" :formState="formState">
            <a-form-item has-feedback label="名称" name="name"
                :rules="[{ required: true, validator: $vaild.queue([$vaild.maxLength(2, 50), $vaild.required]) }]">
                <a-input v-model:value="formState.name" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>
            <a-form-item label="类型" name="type" :rules="[{ required: true, validator: $vaild.required }]">
                <a-select class="item-input" :allowClear="true" v-model:value="formState.type"
                    :disabled="cfg.submitting">
                    <a-select-option v-for="(d, key) in typeMap" :value="key" :key="key">{{ d }}</a-select-option>
                </a-select>
            </a-form-item>

            <a-form-item v-if="formState.type === 'VideoStream'" has-feedback label="视频地址" name="sourcePath"
                :rules="[{ required: true, validator: $vaild.queue([$vaild.rtspURL, $vaild.maxLength(4, 400), $vaild.required]) }]">
                <a-input v-model:value="formState.sourcePath" autocomplete="off" :disabled="cfg.submitting" />
            </a-form-item>

            <a-form-item v-if="formState.type === 'Picture'" has-feedback label="图像" name="file"
                :rules="[{ required: true, validator: $vaild.required }]">
                <input ref="uploadInputRef" name="file" type="file" @change="handleFileChange($event)">
            </a-form-item>

            <a-form-item name="description" label="描述" :rules="[{validator: $vaild.queue([$vaild.maxLength(0, 500)]) }]">
                <a-textarea v-model:value="formState.description" :disabled="cfg.submitting" />
            </a-form-item>


        </gc-formx>
    </gc-modalx>
</template>

<script setup lang="ts" name="PopupVechicleTypeAdd">
import { ref, reactive } from 'vue';
import { message } from 'ant-design-vue';
import { createCfg, commonSubmit, show, hide, cancel } from '@components/gc/utils/modalxUtils'
import $vaild from '@components/js/vaild'
import vehicleTypeApi from '@/api/vehicleType/vehicleTypeApi'

const formx = ref()

interface FormState {
    name: string
    sourcePath: string
    type: string
    description: string
    file: File | undefined
}
const cfg = reactive(createCfg({
  api: vehicleTypeApi.add,
  data: {
    name: '',
    sourcePath: '',
    type: '',
    description: '',
    file: undefined
  },
  handleRequest: (data: FormState) => {
    // 上传文件需要使用formData格式
    if (data.file) {
      // 跟进是否有文件选择上传文件接口
      cfg.api = vehicleTypeApi.addAndUpload
      let formData = new FormData()
      Object.keys(data).forEach((key) => {
        if (data[key]) {
          formData.append(key, data[key])
        }
      })

      return formData
    }

    cfg.api = vehicleTypeApi.add
    return data
  }
}))

const typeMap = {
  VideoStream: "视频流",
  Picture: "图像"
}
const formState: FormState = cfg.data as FormState

const uploadInputRef = ref()
const FILE_MAX_SIZE = 16 * 1024 * 1024 // 每个文件最大为16M
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

const emit = defineEmits<{
    (e: 'onSubmit', event: any): void,
}>()

const handelSubmit = () => {
  commonSubmit(formx.value, cfg, "新增操作成功").then(() => {
    emit('onSubmit', cfg.data)
  }).catch(() => {
    // do nothing.
  })

}

const handelCancel = () => {
  cancel(cfg)
}

const popup = (defaultData?: FormState) => {
  // 处理函数 
  const data: FormState = defaultData || { name: '', sourcePath: '', type: '', description: '', file: undefined }
  data.type = 'VideoStream'

  show(cfg, data)
}

defineExpose({
  popup,
  hide: () => { hide(cfg) }
})


</script>
<style lang="less" scoped>
</style>
