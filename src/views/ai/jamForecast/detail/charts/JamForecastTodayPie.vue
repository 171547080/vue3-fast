<template>
  <div ref="jamForecastCharts"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { PieChart } from "echarts/charts";
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

import forecastApi from "@api/forecast/forecastApi";

// 注册必须的组件
echarts.use([
  TitleComponent,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  PieChart,
  LabelLayout,
  UniversalTransition,
  ToolboxComponent,
  LegendComponent,
  CanvasRenderer
]);

const jamForecastCharts = ref();
let chartInstance;

const option = {
  title: {
    text: "",
    subtext: "",
    left: "center"
  },
  tooltip: {
    trigger: "item",
    formatter: '{c0} 小时'

  },
  legend: {
    orient: "vertical",
    left: "left"
  },
  // color:["#389e0d","#1d39c4","#d4380d","#cf1322"],
  color: ["#b7eb8f", "#adc6ff", "#ffbb96", "#ffa39e"],
  series: [
    {
      name: "当日拥堵情况",
      type: "pie",
      radius: [50, 120],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2
      },
      label: {
        show: false,
        position: "center"
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "20",
          fontWeight: "bold"
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 0, name: "" }
      ]
    }
  ]
};

const autoResetSize = () => {
  chartInstance.resize();
};

// 初始化chartInstance 以及添加 窗口自适应
onMounted(() => {
  const chartDom = jamForecastCharts.value;
  chartInstance = echarts.init(chartDom);
  option && chartInstance.setOption(option);
  window.addEventListener("resize", autoResetSize);
});

// 销毁window上的resize方法
onUnmounted(() => {
  window.removeEventListener("resize", autoResetSize);
});

const refreshData = (datasourceId, roadName) => {
  const params = {
    datasourceId: datasourceId,
    roadName: roadName
  }

  return new Promise((resolve, reject) => {
    const famLevelList = ['流畅', '轻度拥堵', '中度拥堵', '严重拥堵']

    chartInstance.showLoading()
    forecastApi.todayStatistics(params).then((res) => {
      const map = res.data || []
      const handleData = new Array<any>()

      // 解决排序问题
      famLevelList.forEach((key) => {
        handleData.push({
          name: key,
          value: map[key]
        })
      })

      option.series[0].data = handleData

      chartInstance.setOption(option);
      chartInstance.hideLoading()

      resolve(map)
    }).catch(() => {
      chartInstance.hideLoading()
      reject()
    })
  })

}

defineExpose({
  refreshData
})
</script>
