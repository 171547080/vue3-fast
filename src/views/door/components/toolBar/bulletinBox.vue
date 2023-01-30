<template>
  <div class="bulletin">
    <!-- <div class="bulletin-content-box"> -->
    <a-card
      class="bulletin-content-box"
      v-for="(item, index) in 6"
      :key="index"
      shadow="hover"
    >
      <p>关于开展2021年长沙政务数据管理能力评估和政务数据资源归集 治理的通知</p>
    </a-card>
    <!-- </div> -->
  </div>
</template>

<script name="bulletinBox" setup lang="ts">
// do something
</script>

<style lang="scss" scoped>
.bulletin {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-around;
  .bulletin-content-box {
    width: 370px;
    height: 230px;
    border: 1px solid #cec9c9;
    // box-shadow: 5px 5px 5px #e7e9ea;
    margin-bottom: 30px;
    p {
      color: #333;
      font-size: 24px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;
      margin: 0;
      padding: 34px 16px 79px 23px;
    }
  }
}
</style>
