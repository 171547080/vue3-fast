<template>
  <div class="title">
    <h2>{{ content }}</h2>
    <span>查看更多</span>
  </div>
</template>

<script>
export default {
  name: 'titleBar',
  props: {
    content: {
      type: String
    }
  }
};
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  border-bottom: 3px solid #f4f5f6;
  margin-bottom: 46px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: space-between;
  h2 {
    display: inline-block;
    border-bottom: 5px solid #1f87e6;
    margin: 0;
  }
  span {
    color: #7c7979;
    font-size: 8px;
    float: right;
    line-height: 30px;
    padding-right: 6px;
  }
}
</style>
