<template>
    <div class="statistics-box">
        <div class="title">
            车流量统计
            <span class="sub-title">( 刷新频率: {{ delayTime / 1000 }}s ) </span>
        </div>
        <div class="tool-bar">
            <caret-right-outlined v-if="props.id && !info.isStart" class="btn" @click="handleStart" />
            <pause-outlined v-if="info.isStart" class="btn" @click="handlePause" />
        </div>
        <div class="statistics-content">
            <a-table class="table" :columns="columns" :data-source="data" :pagination="false" bordered>
                <template #bodyCell="{ column, record }">
                    <template v-if="column.key === 'time'">
                        {{ datetimeFormat(record.time) }}
                    </template>
                    <template v-if="column.key === 'level'">
                        <a-tag v-if="levelStateMap[record.jamLv]" :color="levelStateMap[record.jamLv].color">
                            {{ record.cnJamLv || levelStateMap[record.jamLv].text }}
                        </a-tag>
                        <a-tag v-else color="grey">
                            暂无数据
                        </a-tag>
                    </template>
                </template>
            </a-table>
            <div class="charts-warp" v-if="false">
                <div class="charts-item">
                    <div class="charts-title">当前画面识别车型数量</div>
                    <CurrentNumStatisticsCharts class="charts"></CurrentNumStatisticsCharts>
                </div>
                <div class="charts-item">
                    <div class="charts-title">当前画面识别平均速度</div>
                    <CurrentSpeedStatisticsCharts class="charts"></CurrentSpeedStatisticsCharts>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import { defineComponent, ref, reactive, onUnmounted } from 'vue'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue'
import { datetimeFormat } from "@utils/moment";
import CurrentNumStatisticsCharts from './charts/CurrentNumStatisticsCharts.vue'
import CurrentSpeedStatisticsCharts from './charts/CurrentSpeedStatisticsCharts.vue'
import jamApi from '@api/jam/jamApi'
import { TaskScheduler } from "@/components/gc/js/TaskScheduler"


defineComponent({
  CurrentNumStatisticsCharts,
  CurrentSpeedStatisticsCharts
})

const props = defineProps({
  id: {
    type: String
  },
  delayTime: {
    type: Number,
    default: 2000
  }
})

const levelStateMap = {
  0: { color: 'green', text: '流畅' },
  1: { color: 'geekblue', text: '轻度拥堵' },
  2: { color: 'volcano', text: '拥堵' },
  3: { color: 'red', text: '严重拥堵' }
}

const columns = ref([
  { title: '时间', dataIndex: 'time', key: 'time' },
  { title: '拥堵级别', dataIndex: 'level', key: 'level' }
])

const data = ref([])

const info = reactive({
  isStart: false
})

const handleStart = () => {
  startLoadData()
}

const handlePause = () => {
  stopLoadData()
}
/**
 * 构建加载数据任务调度器
 */

const loadStatisticsData = () => {
  return new Promise((resolve, reject) => {
    if (props.id) {
      jamApi.statistics(props.id).then((res) => {
        data.value = res.data.list
        resolve(res)
      }).catch((error) => {
        reject(error)
      })
    } else {
      info.isStart = false
      reject()
    }
  })

}

let LoadDataTask = new TaskScheduler(loadStatisticsData)

const startLoadData = () => {
  info.isStart = true

  // 开启加载当前画面车辆数
  LoadDataTask.setDelayTime(props.delayTime)
  LoadDataTask.start()
}

const stopLoadData = () => {
  info.isStart = false

  LoadDataTask.stop()
}

onUnmounted(() => {
  LoadDataTask.stop()
})

defineExpose({
  startLoadData,
  stopLoadData
})


</script>
<style lang="less" scoped>
@background-color: #fafafa;
@border-color: #f0f0f0;

.sub-title {
    margin-left: 5px;
    color: gray;
    font-size: 12px;
}

.statistics-box {
    background: @background-color;
    border: 1px solid @border-color;
    padding: 10px;
    width: 100%;

    .tool-bar {
        position: absolute;
        right: 20px;
        top: 20px;

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

    :deep(.ant-table-content) {
        height: 500px;
        overflow-y: auto;
    }

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

    .charts-warp {
        display: flex;
        flex-direction: row;
        flex: 1;

        .charts-item {
            display: inline-block;
            padding: 0 20px;
            width: 50%;

            .charts-title {
                text-align: center;
                font-size: 18px;
                font-weight: bold;
                display: block;
                padding-bottom: 10px;
            }

            .charts {
                display: block;
                height: 400px;
                width: 100%;
            }
        }
    }

    .display-board {
        display: flex;

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
