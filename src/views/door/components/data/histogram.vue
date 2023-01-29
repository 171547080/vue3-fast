<template>
  <div class="histogram">
    <a-tabs v-model:activeKey="activeName"  @tab-click="handleClick">
      <a-tab-pane tab="数据资源TOP5" key="first">
        <resources-chart />
      </a-tab-pane>
      <a-tab-pane tab="服务申请TOP5" key="second">服务申请TOP5</a-tab-pane>
      <a-tab-pane tab="服务使用TOP5" key="third">服务使用TOP5</a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import resourcesChart from "../chart/resources-chart.vue";
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
}
</style>
