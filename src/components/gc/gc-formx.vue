/* eslint-disable vue/no-mutating-props */
<template>
    <a-form ref="formRef" name="custom-validation" :model="props.formState" v-model:rules="formRules"
        v-bind="props.layout" @finish="handleFinish" @validate="handleValidate" @finishFailed="handleFinishFailed">
        <slot></slot>
    </a-form>
</template>

<script setup lang="ts" name="Formx">
import { reactive, ref, watch, onMounted } from 'vue';

const props = defineProps({
  formState: {
    type: Object,
    default: () => { return {} }
  },
  rules: {
    type: Object,
    default: (reactive([]))
  },
  layout: {
    type: Object,
    default: () => {
      return {
      // 全长度24
        labelCol: { span: 5 },
        wrapperCol: { span: 17 }
      }
    }
  }
})

const formRules = ref(props.rules);
      
watch(
  () => props.rules,
  (value) => formRules.value = value
);

const formRef = ref();

onMounted(() => {
  resetVaid()
})

const validateFields = () => {
  return formRef.value.validateFields();
};

const resetVaid = () => {
  formRef.value.resetFields();
}

defineExpose({
  formRef: formRef.value,
  validateFields,
  resetVaid
})

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleFinish = (values) => {
  // console.log(values);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleFinishFailed = errors => {
  // console.log(errors);
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleValidate = (...args) => {
  // console.log(args);
}
</script>
