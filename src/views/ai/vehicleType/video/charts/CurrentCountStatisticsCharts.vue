<template>
    <div ref="currentNumCharts"></div>
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
// 引入柱状图图表，图表后缀都为 Chart
import { BarChart } from "echarts/charts";
// 引入提示框，标题，直角坐标系，数据集，内置数据转换器组件，组件后缀都为 Component
import {
    TitleComponent,
    TooltipComponent,
    GridComponent,
    DatasetComponent,
    LegendComponent,
    ToolboxComponent,
    TransformComponent,
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
    BarChart,
    LabelLayout,
    UniversalTransition,
    ToolboxComponent,
    LegendComponent,
    CanvasRenderer,
]);

const props = defineProps({
    data: {
        type: Array
    },
    // 刷新频率
    delayTime: {
        type: Number,
        default: 5000
    },
})

interface TableItem {
    type: string,
    current: number,
    count: number
}
const colors = ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a', '#6e7074', '#546570', '#c4ccd3']

const time = ref(0)
const draw = () => {
    const list = props.data
    const server = option.series[0]
    if (list) {
        option.xAxis.data = list.map((item) => (item as TableItem).type) as Array<never>
        // 初始化
        if (!server.data || !server.data.length) {
            server.data = []

            list.forEach((item, index) => {
                const tmp = item as TableItem
                const model = {
                    value: 0,
                    itemStyle: {
                        color: colors[index % (colors.length + 1)]
                    }
                }
                server.data.push(model as never)
            })

            // 初始化时间为0
            time.value = -(props.delayTime / 1000);
        }

        list.forEach((item, index) => {
            const current = item as TableItem
            (server.data[index] as { value }).value = current.count as never
        })
        time.value += props.delayTime / 1000;

        option.title.subtext = '当前统计时间: ' + formatTime(time.value)
        chartInstance.setOption(option);
    }
}

const formatTime = (time) => {
    let format = '00:00'
    let hour = Math.floor(time / 60)
    let second = Math.floor(time - hour * 60)
    return (hour > 10 ? hour : "0" + hour) + " : " + (second > 10 ? second : "0" + second)
}

defineExpose({
    draw
})
const currentNumCharts = ref();
let chartInstance;

const option = {
    title:{
        text:'',
        subtext:'',
        right:'0%'
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'shadow'
        }
    },
    xAxis: {
        type: 'category',
        data: []
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [],
            type: 'bar'
        }
    ]
};

const autoResetSize = () => {
    chartInstance.resize();
};

// 初始化chartInstance 以及添加 窗口自适应
onMounted(() => {
    const chartDom = currentNumCharts.value;
    chartInstance = echarts.init(chartDom);
    option && chartInstance.setOption(option);
    window.addEventListener("resize", autoResetSize);
});

// 销毁window上的resize方法
onUnmounted(() => {
    window.removeEventListener("resize", autoResetSize);
});
</script>
