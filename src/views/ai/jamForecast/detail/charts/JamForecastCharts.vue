<template>
  <div ref="jamForecastCharts"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { LineChart } from "echarts/charts";
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

import moment from "moment";
import forecastApi from "@api/forecast/forecastApi";

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

interface HistoryItemType {
  forecastTime: string
  forecastSpeed: number
  forecastJamLv: string
  cnForecastJamLv: string
  realTime: string
  realSpeed: number
  realJamLv: string
  cnRealJamLv: string
  realDateTime: string
}


const jamForecastCharts = ref();
let chartInstance;

const option = {
  title: {
    text: "",
    subtext: '预测未来一个小时'
  },
  tooltip: {
    trigger: "axis"
  },
  legend: {
    data: ["真实数据", '预测数据']
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  color: ["#b7eb8f", "#ffbb96", "#ffa39e"],
  toolbox: {
    // feature: {
    //   saveAsImage: {},
    // },
  },
  xAxis: {
    type: "category",
    boundaryGap: false,
    data: ['0:0']
  },
  yAxis: {
    name: "车速",
    type: "value",
    axisLabel: { formatter: `{value} km/h` }
  },
  series: [
    {
      name: "真实数据",
      type: "line",
      stack: "real",
      tooltip: {
        valueFormatter: function (value) {
          return value + ' km/h';
        }
      },
      data: [0]
    },
    {
      name: "预测数据",
      type: "line",
      stack: "forecast",
      tooltip: {
        valueFormatter: function (value) {
          return value + ' km/h';
        }
      },
      data: [0]
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

const refreshData = (datasourceId, roadName) => {
  const params = {
    datasourceId: datasourceId,
    roadName: roadName,
    pageSize: 999,
    pageNo: 1
  }

  return new Promise((resolve, reject) => {
    chartInstance.showLoading()
    forecastApi.historyList(params).then((res) => {
      let historyList = res.data || []

      const handleData = {
        forecast: new Array<number>(),
        realSpeed: new Array<number>(),
        time: new Array<string>(),
        operationDate: moment().format("YYYY-MM-DD HH:mm:ss")
      }

      if (historyList && historyList.length) {
        // if (historyList.length > 30) {
        //   historyList = historyList.slice(historyList.length - 20, historyList.length)
        // }

        historyList.forEach((item: HistoryItemType) => {
          if (item.forecastSpeed) {
            handleData.forecast.push(Math.floor(item.forecastSpeed))
          }

          if (item.realSpeed) {
            handleData.realSpeed.push(Math.floor(item.realSpeed as number))
          }
          handleData.time.push(item.forecastTime as string)
        })
      }

      option.xAxis.data = handleData.time
      option.series[0].data = handleData.realSpeed
      option.series[1].data = handleData.forecast

      chartInstance.setOption(option);
      chartInstance.hideLoading()

      resolve(handleData)
    }).catch(() => {
      chartInstance.hideLoading()
      reject()
    })
  })

}

defineExpose({
  refreshData
})



// 销毁window上的resize方法
onUnmounted(() => {
  window.removeEventListener("resize", autoResetSize);
});
</script>
