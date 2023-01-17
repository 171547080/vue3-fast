<template>
  <div ref="jam预测数据Charts"></div>
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

import forecastApi from "@api/forecast/forecastApi";
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
interface TodayLevelItemType {
  duration: string
  forecastAvgSpeed: number
  forecastJamLv: string
  cnForecastJamLv: string
  realAvgSpeed: number
  realJamLv: string
  cnRealJamLv: string
}

const jam预测数据Charts = ref();
const levelValueMap = {
  SMOOTH: 1,
  LIGHT: 2,
  MEDIUM: 3,
  HEAVYL: 4
}
const getLevelName = (level) => {
  const levelMap = {
    1: { color: "green", text: "流畅" },
    2: { color: "geekblue", text: "轻度拥堵" },
    3: { color: "volcano", text: "拥堵" },
    4: { color: "red", text: "严重拥堵" }
  };
  return levelMap[level] ? levelMap[level].text : '--';
};

const serverData = (array: Array<any>) => {
  const levelMap = {
    1: { color: "#b7eb8f", text: "流畅" },
    2: { color: "#adc6ff", text: "轻度拥堵" },
    3: { color: "#ffbb96", text: "中度拥堵" },
    4: { color: "#ffa39e", text: "严重拥堵" }
  };

  const result = new Array<any>();
  array.forEach((level) => {
    const model = {
      value: level,
      itemStyle: {
        color: levelMap[level] ? levelMap[level].color : null
      }
    };

    result.push(model);
  });

  return result;
};

const forecastServerData = (array: Array<any>) => {
  const forecastLevelMap = {
    1: { color: "#389e0d", text: "流畅" },
    2: { color: "#1d39c4", text: "轻度拥堵" },
    3: { color: "#d4380d", text: "拥堵" },
    4: { color: "#cf1322", text: "严重拥堵" }
  };

  const result = new Array<any>();
  array.forEach((level) => {
    const model = {
      value: level,
      itemStyle: {
        color: forecastLevelMap[level] ? forecastLevelMap[level].color : null
      }
    };

    result.push(model);
  });

  return result;
};

let chartInstance;

const option = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "cross",
      crossStyle: {
        color: "#999"
      }
    }
  },
  color: ["#389e0d", "#b7eb8f", "#5470c6"],
  toolbox: {
    // feature: {
    //   dataView: { show: true, readOnly: false },
    //   magicType: { show: true, type: ["line", "bar"] },
    //   restore: { show: true },
    //   saveAsImage: { show: true },
    // },
  },
  legend: {
    data: ["真实数据", "预测数据"]
  },
  xAxis: [
    {
      type: "category",
      data: [""],
      axisPointer: {
        type: "shadow"
      }
    }
  ],
  yAxis: [
    {
      type: "value",
      name: "预测数据",
      min: 0,
      max: 4,
      interval: 1,
      axisLabel: {
        formatter: function (value) {
          return getLevelName(value);
        }
      }
    }
  ],
  series: [
    {
      name: "真实数据",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return getLevelName(value);
        }
      },
      data: [0]
    },
    {
      name: "预测数据",
      type: "bar",
      tooltip: {
        valueFormatter: function (value) {
          return getLevelName(value);
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
  const chartDom = jam预测数据Charts.value;
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
    roadName: roadName,
    pageSize: 999,
    pageNo: 1
  }

  return new Promise((resolve, reject) => {
    chartInstance.showLoading()
    forecastApi.jamLevelStatistics(params).then((res) => {
      const toDayList = res.data || []
      const handleData = {
        forecastLevel: new Array<string>(),
        realLevel: new Array<string>(),
        time: new Array<string>()
      }

      if (toDayList && toDayList.length) {
        toDayList.forEach((item: TodayLevelItemType) => {
          // 拥堵等级【string】 需要转成number才能进行展示
          handleData.forecastLevel.push(levelValueMap[item.forecastJamLv])
          handleData.realLevel.push(levelValueMap[item.realJamLv])
          handleData.time.push(item.duration as string)
        })
      }

      option.xAxis[0].data = handleData.time
      // 处理拥堵等级颜色
      option.series[0].data = serverData(handleData.realLevel)
      option.series[1].data = forecastServerData(handleData.forecastLevel)

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
</script>
