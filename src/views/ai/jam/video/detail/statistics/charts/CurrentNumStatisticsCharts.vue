<template>
    <div ref="currentNumCharts"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from 'echarts/core';
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from 'echarts/charts';
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  LegendComponent,
  ToolboxComponent,
  TransformComponent
} from 'echarts/components';
// 标签自动布局，全局过渡动画等特性
import { LabelLayout, UniversalTransition } from 'echarts/features';
// 引入 Canvas 渲染器，注意引入 CanvasRenderer 或者 SVGRenderer 是必须的一步
import { CanvasRenderer } from 'echarts/renderers';

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  LineChart,
  LabelLayout,
  UniversalTransition,
  ToolboxComponent,
  LegendComponent,
  CanvasRenderer
]);

const currentNumCharts = ref()
let chartInstance;


const option = {
  title: {
    text: ''
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['车辆']
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    data: ['0:00', '0:05', '0:10', '0:15', '0:20', '0:25', '0:30', "0:35"]
  },
  yAxis: {
    name: '数量',
    type: 'value',
    axisLabel: { formatter: `{value} 辆` }
  },
  series: [
    {
      name: '车辆',
      type: 'line',
      stack: 'Total',
      data: [40, 42, 35, 38, 41, 46, 40, 38]
    }
  ]
};

const autoResetSize = () => {
  chartInstance.resize()
}

// 初始化chartInstance 以及添加 窗口自适应
onMounted(() => {
  const chartDom = currentNumCharts.value;
  chartInstance = echarts.init(chartDom);
  option && chartInstance.setOption(option);
  window.addEventListener("resize", autoResetSize);
})

// 销毁window上的resize方法
onUnmounted(() => {
  window.removeEventListener("resize", autoResetSize);
})
</script>
