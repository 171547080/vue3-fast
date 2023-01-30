<template>
  <div class="policy-content">
    <titleBar :content="'政策依据'" />
    <policy-img-box />
  </div>
</template>

<script name="policy" setup lang="ts">
import titleBar from "../toolBar/titleBar.vue";
import policyImgBox from "../toolBar/policyImgBox.vue"

</script>

<style lang="scss" scoped>
.policy-content {
  padding-left: 30px;
}
</style>
