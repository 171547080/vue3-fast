<template>
  <div class="marker-info-content">
    <div class="head">{{ (props.data as MarkerInfoType).cnRoadName }}</div>
    <div class="body">
      <div class="text-item title">名称：<span>{{ (props.data as MarkerInfoType).cnRoadName }}</span></div>
      <div class="text-item">数据源: {{ (props.data as MarkerInfoType).datasourceName }}</div>
      <div class="text-item">
        状态: <span :style="{ color: levelStateMap[1].color }">正常</span>
      </div>
      <div class="text-item">东经：{{ (props.data as MarkerInfoType).latitude }}</div>
      <div class="text-item">北纬：{{ (props.data as MarkerInfoType).longitude }}</div>
      <div class="text-item">
        拥堵预测: <a @click="handleDetail(data)">查看</a>
      </div>
    </div>
    <div class="footer"></div>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface MarkerInfoType {
  datasourceId: string;
  datasourceName: string;
  roadName: string;
  cnRoadName: string;
  latitude: string;
  longitude: string;
}

const props = defineProps({
  top: {
    type: Number,
    defalut: 0
  },
  left: {
    type: Number,
    defalut: 0
  },
  data: {
    type: Object,
    defalut: 0
  }
});

const levelStateMap = {
  1: { color: "green", text: "流畅" },
  2: { color: "geekblue", text: "轻度拥堵" },
  3: { color: "volcano", text: "拥堵" },
  4: { color: "red", text: "严重拥堵" }
};

const handleDetail = (record) => {
  router.push({ name: "TrafficJamForecastDetail", params: { roadName: record.roadName, datasourceId: record.datasourceId } });
};
</script>
<style lang="less" scoped>
.marker-info-content {
  min-width: 250px;
  min-height: 150px;
  border: 1px #efefef solid;
  background: #fff;

  .head {
    background: #4095e5;
    font-size: 16px;
    text-align: center;
    padding: 5px;
    color: #fff;
    font-weight: bold;
  }

  .body {
    font-size: 14px;
    padding: 5px 10px 5px 10px;

    .text-item {
      &.title {
        font-size: 17px;
        font-weight: bold
      }

      border-bottom: #efefef 1px solid;
      margin-bottom: 5px;
    }
  }
}
</style>
