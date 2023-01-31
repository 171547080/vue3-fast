<template>
  <div ref="chartRef" class="echart my-chart" id="mychart"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart, BarChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  ToolboxComponent,
  TransformComponent
} from "echarts/components";
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from "echarts/features";
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from "echarts/renderers";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  BarChart,
  LabelLayout,
  UniversalTransition,
  ToolboxComponent,
  LegendComponent,
  CanvasRenderer
]);

const xData = [
  "类型1",
  "类型2",
  "类型3",
  "类型4",
  "类型5",
  "类型6",
  "类型7",
  "类型8",
  "类型9"
]; //横坐标

const yData = [1000, 2000, 3000, 4000, 5000]; //数据

onMounted(() => {
  // 初始化图表
  initEcharts();
  //随着屏幕大小调节图表
  window.addEventListener("resize", autoResetSize);
});

// 销毁window上的resize方法
onUnmounted(() => {
  //随着屏幕大小调节图表
  window.removeEventListener("resize", autoResetSize);
});

const autoResetSize = () => {
  chartInstance.resize();
};

let chartInstance;
const chartRef = ref();

const initEcharts = () => {
  const chartDom = chartRef.value;
  chartInstance = echarts.init(chartDom);

  // 基本柱状图
  const option = {
    xAxis: {
      data: xData
    },
    yAxis: {},
    series: [
      {
        type: "bar", //形状为柱状图
        data: yData
      }
    ]
  };

  chartInstance.setOption(option);
};
</script>
<style lang="less" scoped>
.my-chart {
  float: left;
  width: 100%;
  height: 260px;
}
</style>
