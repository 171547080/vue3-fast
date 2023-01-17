<template>
    <div class="statistics-box">
        <div class="title">
            公路病害识别列表
            <span class="sub-title">( 刷新频率: {{ delayTime / 1000 }}s ) </span>
        </div>
        <div class="tool-bar">
            <caret-right-outlined v-if="props.id && !info.isStart" class="btn" @click="handleStart" />
            <pause-outlined v-if="info.isStart" class="btn" @click="handlePause" />
        </div>
        <div class="statistics-content">
            <a-table class="table" :columns="columns" :data-source="data" :pagination="false" bordered>
                <template #bodyCell="{ column, record, index }">
                    <template v-if="column.key === 'index'">
                        <span>
                            {{ index + 1 }}
                        </span>
                    </template>

                    <template v-if="column.key === 'bbox'">
                        <div>
                            {{ "X : " + (record.bbox.x) }}
                        </div>
                        <div>
                            {{ "Y : " + (record.bbox.y) }}
                        </div>
                    </template>
                    <template v-if="column.key === 'creationTime'">
                        {{ datetimeFormat(record.creationTime) }}
                    </template>
                </template>
            </a-table>
        </div>
    </div>
</template>
<script setup lang="ts">
import { ref, reactive, onUnmounted } from 'vue'
import { CaretRightOutlined, PauseOutlined } from '@ant-design/icons-vue'
import { datetimeFormat } from "@utils/moment";
import highwayApi from '@api/highway/highwayApi'
import { TaskScheduler } from "@/components/gc/js/TaskScheduler"


const props = defineProps({
  id: {
    type: String
  },
  delayTime: {
    type: Number,
    default: 2000
  }
})

const columns = ref([
  { title: "序号", dataIndex: "index", key: "index" },
  { title: "病害类型", dataIndex: "cnType", key: "cnType" },
  { title: "识别分数", dataIndex: "score", key: "score" },
  { title: "位置", dataIndex: "bbox", key: "bbox" },
  { title: '识别时间', dataIndex: 'creationTime', key: 'creationTime' }
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
      highwayApi.statistics(props.id).then((res) => {
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
    position: relative;
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

    :deep(.ant-table-content) {
        height: 500px;
        overflow-y: auto;
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
