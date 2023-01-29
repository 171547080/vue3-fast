<template>
  <div class="status-bar">
    <div
      v-for="(item, index) in statusBar"
      :key="index"
      :style="{ borderLeft: index >= 1 ? '1px solid' : '' }"
      class="status-item"
    >
      <i class="number">{{ item.data }}</i
      ><i>个</i>
      <p>{{ item.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: "StatusBar",
  data() {
    return {
      statusBar: [
        {
          title: "信息资源目录",
          data: 3616
        },
        {
          title: "数据资源目录",
          data: 6616
        },
        {
          title: "接口服务",
          data: 26
        },
        {
          title: "应用服务",
          data: 18
        }
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.status-bar {
  display: flex;
  align-items: center;
  justify-content: center;
}
.status-item {
  color: #fff;
  text-align: center;
  padding: 10px 80px 0 80px;
  i {
    font-size: 24px;
    font-style: normal;
  }
  .number {
    font-size: 48px;
  }
  p {
    font-size: 24px;
  }
}
</style>
