<template>
  <div class="histogram">
    <a-tabs v-model:activeKey="activeName"  @tab-click="handleClick">
      <a-tab-pane tab="数据资源TOP5" key="first">
        <resourcesChart />
      </a-tab-pane>
      <a-tab-pane tab="服务申请TOP5" key="second">服务申请TOP5</a-tab-pane>
      <a-tab-pane tab="服务使用TOP5" key="third">服务使用TOP5</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import resourcesChart from "../chart/resourcesChart.vue";
export default {
  name: "histogram",
  components: {
    resourcesChart
  },
  data() {
    return {
      activeName: "first"
    };
  },
  methods: {
    handleClick() {
      // to do somethings
    }
  }
};
</script>

<style lang="scss" scoped>
.histogram {
  width: 100%;
  .el-tabs {
    margin-top: 10px;
  }
  ::v-deep.el-tabs__item {
    font-size: 22px;
  }
  .el-tabs__nav-wrap {
    border-bottom: 2px solid #dfe4ed;
  }
}
</style>
