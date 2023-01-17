<template>
  <div>
    <div class="info-title"><span class="text">{{ info.cnRoadName }}</span></div>
    <div>
      <div class="info-desc">
        <div class="info-text">数据源:<span class="text">{{ info.datasourceName }}</span>
          <!-- <PlayCircleOutlined class="paly-icon" @click="handelPlay" /> -->
        </div>
        <div class="info-text">东经: <span class="text">{{ info.latitude }}</span></div>
        <div class="info-text">北纬: <span class="text">{{ info.longitude }}</span></div>
      </div>
    </div>
    <div class="info-charts">
      <h2>交通拥堵预测 <span class="date-text">当前时间 : {{ info.operationDate }}</span></h2>
      <div class="tool-bar">
        <SyncOutlined @click="onRefresh"></SyncOutlined>
      </div>
      <a-spin :spinning="info.loading" size="large">
        <div class="charts-warp">
          <div class="charts-item" style="width: 60%">
            <div class="charts-title">拥堵预测模型</div>
            <JamForecastCharts ref="forecastChartsRef" class="charts"></JamForecastCharts>
          </div>
          <div class="charts-item" style="width: 40%">
            <div class="charts-title">拥堵预测准确率</div>
            <JamForecastRatePie ref="forecastRatePieRef" class="charts"></JamForecastRatePie>
          </div>
        </div>

        <div class="charts-warp">
          <div class="charts-item" style="width: 60%">
            <div class="charts-title">拥堵等级分布</div>
            <JamForecastBar ref="forecastBarRef" class="charts"></JamForecastBar>
          </div>
          <div class="charts-item" style="width: 40%">
            <div class="charts-title">最近24小时拥堵情况</div>
            <JamForecastTodayPie ref="forecastTodayPieRef" class="charts"></JamForecastTodayPie>
          </div>
        </div>
        <div class="charts-warp">
          <div class="charts-item" style="width: 100%">
            <div class="charts-title" style="text-align: left;">历史记录</div>
            <JamForecastHistoryTable ref="historyTableRef" :datasourceId="info.datasourceId" :roadName="info.roadName"
              class="charts">
            </JamForecastHistoryTable>
          </div>
        </div>
      </a-spin>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from "vue";
import moment from "moment";
import { SyncOutlined } from '@ant-design/icons-vue'
import JamForecastCharts from "./charts/JamForecastCharts.vue";
import JamForecastRatePie from "./charts/JamForecastRatePie.vue";
import JamForecastBar from "./charts/JamForecastBar.vue";
import JamForecastTodayPie from "./charts/JamForecastTodayPie.vue";
import JamForecastHistoryTable from "./charts/JamForecastHistoryTable.vue";
import forecastApi from "@api/forecast/forecastApi";
import router from '@/router'

const info = reactive({
  datasourceId: '',
  datasourceName: '',
  roadName: '',
  cnRoadName: '',
  latitude: '',
  longitude: '',
  operationDate: '',
  loading: false,
  historyList: []
});

const loadData = () => {
  const data = {
    datasourceId: info.datasourceId,
    roadName: info.roadName
  }
  forecastApi.detail(data).then((res) => {
    info.datasourceId = res.data.datasourceId
    info.datasourceName = res.data.datasourceName
    info.roadName = res.data.roadName
    info.cnRoadName = res.data.cnRoadName
    info.latitude = res.data.latitude
    info.longitude = res.data.longitude
  })
}
const forecastChartsRef = ref<InstanceType<typeof JamForecastCharts>>();
const forecastRatePieRef = ref<InstanceType<typeof JamForecastRatePie>>();
const forecastTodayPieRef = ref<InstanceType<typeof JamForecastTodayPie>>();
const forecastBarRef = ref<InstanceType<typeof JamForecastBar>>();

const onRefresh = () => {
  info.loading = true
  info.operationDate = '--'
  forecastChartsRef.value?.refreshData(info.datasourceId, info.roadName).then((res: any) => {
    info.operationDate = res.operationDate || moment().format("YYYY-MM-DD HH:mm:ss")
    info.loading = false
  }).catch(() => {
    info.operationDate = '数据获取失败'
    info.loading = false
  })

  forecastRatePieRef.value?.refreshData(info.datasourceId, info.roadName)
  forecastTodayPieRef.value?.refreshData(info.datasourceId, info.roadName)
  forecastBarRef.value?.refreshData(info.datasourceId, info.roadName)

  //刷新列表数据
  historyTableRef.value?.serach(info.datasourceId, info.roadName)
}
const historyTableRef = ref<InstanceType<typeof JamForecastHistoryTable>>();


onMounted(() => {
  info.datasourceId = router.currentRoute.value.params.datasourceId as string
  info.roadName = router.currentRoute.value.params.roadName as string

  loadData()
  onRefresh()
})

</script>
<style lang="less" scoped>
@background-color: #fafafa;
@border-color: #f0f0f0;

.info-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 5px;
}

.text {
  padding-left: 10px;
}

.info-desc {
  padding: 10px 20px;
  border: 1px solid @border-color;
  background: @background-color;
  font-size: 14px;

  .info-text {
    margin-bottom: 5px;
  }

  margin-bottom: 10px;
}

.info-charts {
  padding: 10px;
  border: 1px solid @border-color;
  background: @background-color;
  padding: 10px 20px;
  min-height: 600px;
  position: relative;

  .tool-bar {
    position: absolute;
    color: green;
    font-size: 20px;
    right: 20px;
    top: 3px;

    &:hover {
      color: #00a400;
    }
  }

  .date-text {
    color: grey;
    font-size: 14px;
    padding: 0 5px;
  }
}

.charts-warp {
  display: flex;
  flex-direction: row;
  flex: 1;
  background: #fff;
  border: 1px solid @border-color;
  margin-bottom: 10px;

  .charts-item {
    display: inline-block;
    padding: 10px 20px;

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

.paly-icon {
  font-size: 16px;
  color: #1890ff;
  cursor: pointer;

  &:hover {
    color: #40a9ff;
  }
}
</style>
