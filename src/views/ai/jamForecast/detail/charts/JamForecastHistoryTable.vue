<template>
  <div>
    <gc-tablex ref="historyTable" :columns="tableCfg.columns" :data="tableCfg.data" :loading="tableCfg.loading"
      :noDataText="tableCfg.noDataText" :errorMessage="tableCfg.errorMessage" :pageNo="tableCfg.pageNo"
      :pageSize="tableCfg.pageSize">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          <span>
            {{ ((tableCfg.pageNo - 1) * tableCfg.pageSize) + index + 1 }}
          </span>
        </template>
        <template v-if="column.key === 'name'">
          <a>
            {{ record.name }}
          </a>
        </template>
        <template v-if="column.key === 'realLevel'">
          <span>
            <a-tag v-if="levelStateMap[record.realJamLv]" :color="levelStateMap[record.realJamLv].color">
              {{ record.cnRealJamLv }}
            </a-tag>
            <span v-else> --</span>
          </span>
        </template>

        <template v-if="column.key === 'forecastLevel'">
          <span>
            <a-tag v-if="levelStateMap[record.forecastJamLv]" :color="levelStateMap[record.forecastJamLv].color">
              {{ record.cnForecastJamLv }}
            </a-tag>

            <span v-else> --</span>
          </span>
        </template>
        <template v-if="column.key === 'realSpeed'">
          <span> {{ record.realSpeed ? Math.floor(record.realSpeed) + ' km/h' : '--' }} </span>
        </template>

        <template v-if="column.key === 'forecastSpeed'">
          <span> {{ record.forecastSpeed ? Math.floor(record.forecastSpeed) + ' km/h' : '--' }} </span>
        </template>
        <template v-if="column.key === 'forecastTime'">
          <span> {{ datetimeFormat(record.forecastTime) }} </span>
        </template>

      </template>
    </gc-tablex>
    <gc-paginationx @change="onRefresh" v-model:pageNo="tableCfg.pageNo" v-model:total="tableCfg.total"
      v-model:pageSize="tableCfg.pageSize">
    </gc-paginationx>
  </div>
</template>
<script setup lang="ts">
import { reactive } from "vue";
import { datetimeFormat } from "@utils/moment";
import tablexUtils from "@utils/tablex";
import forecastApi from "@api/forecast/forecastApi";

const levelStateMap = {
  SMOOTH: { color: 'green', text: '流畅' },
  LIGHT: { color: 'geekblue', text: '轻度拥堵' },
  MEDIUM: { color: 'volcano', text: '拥堵' },
  HEAVY: { color: 'red', text: '严重拥堵' }
};

const info = reactive({
  datasourceId: '',
  roadName: ''
})

const columns = [
  {
    title: "序号",
    dataIndex: "index",
    key: "index"
  },
  {
    title: "真实数据",
    dataIndex: "realLevel",
    key: "realLevel"
  },
  {
    title: "预测数据",
    dataIndex: "forecastLevel",
    key: "forecastLevel"
  },
  {
    title: "真实车速",
    dataIndex: "realSpeed",
    key: "realSpeed"
  },
  {
    title: "预测车速",
    key: "forecastSpeed",
    dataIndex: "forecastSpeed"
  },
  {
    title: "时间",
    key: "forecastTime",
    dataIndex: "forecastTime"
  }
];

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: forecastApi.historyPage,
    params: {
      datasourceId: '',
      roadName: ''
    },
    loading: false,
    columns,
    data: [],
    pageNo: 1,
    pageSize: 10
  })
);

// const onSearch = () => {
//   tablexUtils.serach(tableCfg);
// };

const onRefresh = () => {
  tablexUtils.refresh(tableCfg);
};
const serach = (datasourceId, roadName) => {
  info.datasourceId = datasourceId
  info.roadName = roadName
  tableCfg.params.datasourceId = datasourceId
  tableCfg.params.roadName = roadName

  tablexUtils.serach(tableCfg);
};
defineExpose({
  serach
})
</script>
<style lang="less" scoped>
.desc {
  font-size: 16px;
  padding: 5px 0 10px 0;
}
</style>
