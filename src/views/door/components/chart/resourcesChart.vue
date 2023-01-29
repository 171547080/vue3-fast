<template>
  <div class="echart" id="mychart" :style="myChartStyle"></div>
</template>

<script>
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import * as echarts from "echarts";

export default {
  data() {
    return {
      xData: ["类型1", "类型2", "类型3", "类型4", "类型5", "类型6", "类型7", "类型8", "类型9"], //横坐标
      yData: [1000, 2000, 3000, 4000, 5000], //数据
      myChartStyle: { float: "left", width: "100%", height: "260px" }  //图表样式
    };
  },
  mounted() {
    this.initEcharts();
  },
  methods: {
    initEcharts() {
      // 基本柱状图
      const option = {
        xAxis: {
          data: this.xData
        },
        yAxis: {},
        series: [
          {
            type: "bar", //形状为柱状图
            data: this.yData
          }
        ]
      };
      const myChart = echarts.init(document.getElementById("mychart"));
      myChart.setOption(option);
      //随着屏幕大小调节图表
      window.addEventListener("resize", () => {
        myChart.resize();
      });
    }
  }
};
</script>
