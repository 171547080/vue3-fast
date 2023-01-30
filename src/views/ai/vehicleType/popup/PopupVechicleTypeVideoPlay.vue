<template>
  <gc-modalx v-model:show="cfg.show" v-model:submitting="cfg.submitting" v-model:cancelText="cfg.cancelText"
    v-model:okText="cfg.okText" title="播放" @on-ok="handelSubmit" @on-cancel="handelCancel">
    <gc-formx ref="formx" :formState="formState">
      <a-form-item has-feedback label="名称" name="name" :rules="[{ required: true, validator: $vaild.required }]">
        <a-input v-model:value="formState.name" autocomplete="off" :disabled="true" />
      </a-form-item>
      <a-form-item label="类型" name="type" :rules="[{ required: true, validator: $vaild.required }]">
        <a-select class="item-input" :allowClear="true" v-model:value="formState.type" :disabled="true">
          <a-select-option v-for="(d, key) in typeMap" :value="key" :key="key">{{ d }}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item v-if="formState.type === 'video'" has-feedback label="视频地址" name="sourcePath"
        :rules="[{ required: true, validator: $vaild.required }]">
        <a-input v-model:value="formState.sourcePath" autocomplete="off" :disabled="true" />
      </a-form-item>
      <a-form-item name="description" label="描述">
        <a-textarea v-model:value="formState.description" :disabled="true" />
      </a-form-item>
    </gc-formx>
  </gc-modalx>
</template>

<script setup lang="ts" name="PopupVechicleTypePlay">
import { ref, reactive } from "vue";
import {
  createCfg,
  commonSubmit,
  show,
  hide,
  cancel
} from '@components/gc/utils/modalxUtils'
import $vaild from "@components/js/vaild";

import vehicleTypeApi from "@/api/vehicleType/vehicleTypeApi";

const formx = ref();

interface FormState {
  id: string;
  name: string;
  url: string;
  type: string;
  sourcePath: string;
  description: string;
}
const cfg = reactive(
  createCfg({
    api: vehicleTypeApi.startAi,
    data: {
      id: "",
      name: "",
      url: "",
      type: "",
      sourcePath: "",
      description: ""
    },
    handleRequest: (data) => {
      return { aiType: "carType", id: (data as FormState).id };
    }
  })
);

const typeMap = {
  VideoStream: "视频流",
  Picture: "图像"
};
const formState: FormState = cfg.data as FormState;

const emit = defineEmits<{
  (e: "onSubmit", event: any): void;
}>();

const handelSubmit = () => {
  commonSubmit(formx.value, cfg, "播放成功")
    .then(() => {
      emit("onSubmit", cfg.data);
    })
    .catch(() => {
      // not do something
    });
};

const handelCancel = () => {
  cancel(cfg);
};

const popup = (defaultData?: FormState) => {
  // 处理函数
  const data: FormState = defaultData || {
    id: "",
    name: "",
    url: "",
    type: "",
    sourcePath: "",
    description: ""
  };
  show(cfg, data);
};

defineExpose({
  popup,
  hide: () => {
    hide(cfg);
  }
});
</script>
<style lang="less" scoped>
</style>
