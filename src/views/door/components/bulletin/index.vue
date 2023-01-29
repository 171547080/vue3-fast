<template>
  <div class="bulletin-content">
    <titleBar :content="'通知公告'" />
    <bulletinBox />
  </div>
</template>

<script>
import titleBar from "../toolBar/titleBar.vue";
import bulletinBox from '../toolBar/bulletinBox.vue'
export default {
  name: "bulletin",
  components: {
    titleBar,
    bulletinBox
  }
};
</script>

<style lang="scss" scoped>
.bulletin-content {
  background-color: #fff;
  margin-top: 52px;
  padding-left: 30px;
}
</style>
