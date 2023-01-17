<template>
    <div class="statistics-box">
        <div class="title">车流量统计
            <span class="sub-title"> 当前数据时间: {{ info.operationTime }}</span>
            <span class="sub-title">( 刷新频率: {{ info.delayTime / 1000 }}s ) </span>
        </div>
        <div class="tool-bar">
            <caret-right-outlined v-if="info.id" class="btn" @click="handleStartStatistics" />
            <pause-outlined v-if="info.isLoadData" class="btn" @click="handleStopStatistics" />
        </div>
        <div class="statistics-content">
            <a-row type="flex" style="width:100%">
                <a-col :md="24" :lg="8">
                    <div class="display-board">
                        <div class="display-board-title">车型识别</div>
                        <a-table class="table" :columns="columns" :data-source="tableData" :pagination="false" bordered>
                        </a-table>
                    </div>
                </a-col>
                <a-col :md="24" :lg="16">
                    <a-row class="charts-item">
                        <div class="charts-title">当前画面识别车型数量</div>
                        <CurrentNumStatisticsCharts :data="tableData" :delayTime="info.delayTime" ref="currentChartRef"
                            class="charts"></CurrentNumStatisticsCharts>
                    </a-row>
                    <a-row class="charts-item" style="margin-top: 20px;">
                        <div class="charts-title">各车型累计通过数量</div>
                        <CurrentCountStatisticsCharts :data="tableData" :delayTime="info.delayTime" ref="countChartRef"
                            class="charts">
                        </CurrentCountStatisticsCharts>
                    </a-row>
                </a-col>
            </a-row>
        </div>
    </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref, onUnmounted } from 'vue'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue'
import vehicleTypeApi from "@api/vehicleType/vehicleTypeApi";
import { CarTypeArray } from '../commom/CarType'
import { TaskScheduler } from "@/components/gc/js/TaskScheduler"

import { datetimeFormat } from '@/utils/moment'
import CurrentNumStatisticsCharts from './charts/CurrentNumStatisticsCharts.vue'
import CurrentCountStatisticsCharts from './charts/CurrentCountStatisticsCharts.vue'

const carTypeIndexMap = {}

const info = reactive({
  id: '',
  isLoadData: false,
  delayTime: 2000,
  operationTime: '--'
})
/**
 * 加载当前通过画面车辆识别数据方法
 */
const loadCurrentCarData = () => {
  return new Promise((resolve, rejct) => {
    vehicleTypeApi.current(info.id, 1).then((res) => {
      if (res.data && res.data.list) {
        const table = tableData.value
        res.data.list.forEach((item) => {
          const info = item.statistics
          info.forEach((item) => {
            const carType = item.name
            const itemIndex = carTypeIndexMap[carType]
            if (itemIndex) {
              table[itemIndex].current = item.count
            }
          })

        })
      }
      countChartRef.value?.draw()
      resolve(res)
    }).catch((error) => {
      console.error(error)
      CurrentCarTask.stop()
      rejct(error)
    })
  })
}

/**
 * 加载当前通过画面车辆总数方法
 */
const loadCountCarData = () => {
  return new Promise((resolve, rejct) => {
    vehicleTypeApi.statistics(info.id, 1).then((res) => {
      info.operationTime = datetimeFormat(res.data.operationTime)

      if (res.data && res.data.list) {
        const table = tableData.value
        res.data.list.forEach((item) => {
          const info = item.statistics
          info.forEach((item) => {
            const carType = item.name
            const itemIndex = carTypeIndexMap[carType]
            if (itemIndex) {
              table[itemIndex].count = item.count
            }
          })

        })
      }

      currentChartRef.value?.draw()
      resolve(res)
    }).catch((error) => {
      console.error(error)
      CurrentCarTask.stop()
      rejct(error)
    })
  })
}
/**
 * 构建加载数据任务调度器
 */
const CurrentCarTask = new TaskScheduler(loadCurrentCarData)
const CountCarTask = new TaskScheduler(loadCountCarData)

const currentChartRef = ref<InstanceType<typeof CurrentNumStatisticsCharts>>()
const countChartRef = ref<InstanceType<typeof CurrentCountStatisticsCharts>>()

const startLoadData = (id: string, delayTime = 5000) => {
  info.isLoadData = true
  info.id = id;
  info.delayTime = delayTime;

  // 开启加载当前画面车辆数
  CurrentCarTask.setDelayTime(delayTime)
  CurrentCarTask.start()

  // 开启加载车辆总数任务
  CountCarTask.setDelayTime(delayTime)
  CountCarTask.start()
}

const stopLoadData = () => {
  info.isLoadData = false

  CurrentCarTask.stop()
  CountCarTask.stop()
}

const initCharts = () => {
  CarTypeArray.forEach((item, index) => {
    // 顺便记录每一个key对应的下标
    carTypeIndexMap[item.key] = index
    tableData.value.push({
      type: item.cnName,
      current: 0,
      count: 0
    })
  })

  currentChartRef.value?.draw()
  countChartRef.value?.draw()
}

onMounted(() => {
  initCharts()
})
onUnmounted(() => {
  stopLoadData()
})
defineExpose({
  startLoadData,
  stopLoadData
})

const columns = ref([
  { title: '车型', dataIndex: 'type', key: 'type' },
  { title: '当前画面出现车辆数', dataIndex: 'current', key: 'type' },
  { title: '累计画面出现车辆数量', dataIndex: 'count', key: 'type' }
])
interface TableItem {
    type: string,
    current: number,
    count: number
}
const tableData = ref(Array<TableItem>())

const handleStartStatistics = () => {
  startLoadData(info.id)
}

const handleStopStatistics = () => {
  stopLoadData()
}

</script>
<style lang="less" scoped>
@background-color: #fafafa;
@border-color: #f0f0f0;

.statistics-box {
    background: @background-color;
    border: 1px solid @border-color;
    padding: 10px;
    position: relative;


    .sub-title {
        margin-left: 5px;
        color: gray;
        font-size: 12px;
    }

    .tool-bar {
        position: absolute;
        right: 20px;
        top: 10px;

        .btn {
            font-size: 25px;
        }

        :hover {
            color: #1890ff;
        }
    }
}

.title {
    font-size: 16px;
    font-weight: bold;
    padding-left: 8px;
    padding-bottom: 10px;
}


.table {
    width: 100%;

    :deep(.ant-table-cell) {
        text-align: center;
        padding: 10px 20px;
    }

    :deep(.ant-table-cell:first-child) {
        text-align: right;
    }
}

.statistics-content {
    display: flex;
    background: #fff;
    border: 1px solid @border-color;
    padding: 10px;

    .charts-item {
        display: inline-block;
        padding: 0 20px;
        width: 100%;

        .charts-title {
            text-align: center;
            font-size: 18px;
            font-weight: bold;
            display: block;
            padding-bottom: 10px;
        }

        .charts {
            display: block;
            height: 240px;
            width: 100%;
        }
    }


    .display-board {
        .display-board-title {
            text-align: center;
            font-size: 16px;
            font-weight: bold;
            display: block;
            padding-bottom: 10px;
        }
    }
}
</style>
