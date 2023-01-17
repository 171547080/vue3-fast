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

const props = defineProps({
  data: {
    type: Array
  },
  // 刷新频率
  delayTime: {
    type: Number,
    default: 5000
  }
})

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

interface TableItem {
    type: string,
    current: number,
    count: number
}
const time = ref(0)
const draw = () => {
  const list = props.data
  if (list) {
    (option.legend.data as Array<string>) = list.map((item) => (item as TableItem).type)
    if (!option.series || !(option.series as Array<never>).length) {
      option.series = []

      list.forEach((item) => {
        const tmp = item as TableItem
        const model = {
          name: tmp.type,
          type: 'line',
          stack: tmp.type,
          data: []
        }
        option.series.push(model as never)
      })
      // 初始化时间为0
      time.value = -(props.delayTime / 1000);
    }

    list.forEach((item, index) => {
      const current = item as TableItem
      (option.series[index] as { data }).data.push(current.current as never)
    })
    time.value += props.delayTime / 1000;
    (option.xAxis.data as Array<string>).push(formatTime(time.value))
    chartInstance.setOption(option);
  }
}

defineExpose({
  draw
})
const formatTime = (time) => {
  let hour = Math.floor(time / 60)
  let second = Math.floor(time - hour * 60)
  return (hour > 10 ? hour : "0" + hour) + " : " + (second > 10 ? second : "0" + second)
}
const currentNumCharts = ref()

const option = {
  title: {
    text: '',
    subtext: ""
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: []
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
    data: []
  },
  yAxis: {
    type: 'value'
  },
  series: []
};

let chartInstance

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
