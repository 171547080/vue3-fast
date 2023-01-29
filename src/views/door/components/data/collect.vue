<template>
  <div class="content">
    <h2>数据汇总</h2>
    <div class="collecr-bar">
      <div
        v-for="(item, index) in statusBar"
        :style="{ float: 'left', clear: index === 2 ? 'left' : 'none' }"
        :key="index"
        class="collecr-item"
      >
        <i class="number">{{ item.data }}</i
        ><i>万条</i>
        <p>{{ item.title }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Collect",
  data() {
    return {
      statusBar: [
        {
          title: "数据资源总量",
          data: '25,509,014'
        },
        {
          title: "主题库总数",
          data: 6616
        },
        {
          title: "服务调用次数",
          data: '355,657'
        },
        {
          title: "服务系统总数",
          data: 18
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.collecr-bar {
  overflow: hidden;
}
.content {
  width: 100%;
}
h2 {
  padding-left: 30px;
}
.collecr-item {
  width: 275px;
  height: 100px;
  color: #000;
  text-align: center;
  padding: 0 30px;
  i {
    font-size: 16px;
    font-style: normal;
  }
  .number {
    font-size: 36px;
  }
  p {
    padding: 0;
    font-size: 14px;
  }
}
</style>
