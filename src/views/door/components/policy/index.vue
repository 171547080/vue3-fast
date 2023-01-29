<template>
  <div class="policy-content">
    <titleBar :content="'政策依据'" />
    <policyImgBox />
  </div>
</template>

<script>
import titleBar from "../toolBar/titleBar.vue";
import policyImgBox from "../toolBar/policyImgBox.vue"
export default {
  name: "policy",
  components: {
    titleBar,
    policyImgBox
  }
};
</script>

<style lang="scss" scoped>
.policy-content {
  padding-left: 30px;
}
</style>
