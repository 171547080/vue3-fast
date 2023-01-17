<template>
  <div>
    <div class="desc">
      监控设备管理主要为平台操作拥有提供配置【高速公路拥堵识别】所需要的图像资源
    </div>

    <gc-toolbar>
      <template #right>
        <span class="item-label">数据源</span>
        <a-select class="item-input" style="width: 160px" @change="onSearch"
          v-model:value="tableCfg.params.datasourceId">
          <a-select-option v-for="(d, key) in datasourceList" :value="d.id" :key="key">{{
              d.name
          }}</a-select-option>
        </a-select>
      </template>
      <!-- <template #search>
        <a-input-search v-model:value="tableCfg.params.key" class="item-input" placeholder="关键字搜索" enter-button
          @search="onSearch" />
      </template> -->
    </gc-toolbar>
    <gc-tablex ref="alarmTable" class="tablex" :columns="tableCfg.columns" :data="tableCfg.data"
      :loading="tableCfg.loading" :noDataText="tableCfg.noDataText" :errorMessage="tableCfg.errorMessage"
      :pageNo="tableCfg.pageNo" :pageSize="tableCfg.pageSize">
      <template #bodyCell="{ column, record, index }">
        <template v-if="column.key === 'index'">
          <span>
            {{ index + 1 }}
          </span>
        </template>

        <template v-if="column.key === 'position'">
          <div>
            {{ "东经: " + record.latitude }}
          </div>
          <div>
            {{ "北纬: " + record.longitude }}
          </div>
        </template>
        <template v-if="column.key === 'name'">
          <a @click="handleDetail(record)">
            {{ record.name }}
          </a>
        </template>

        <template v-else-if="column.key === 'action'">
          <span @click="handleDetail(record)">
            <a>详情</a>
          </span>
        </template>
      </template>
    </gc-tablex>
    <gc-paginationx @change="onRefresh" v-model:pageNo="tableCfg.pageNo" v-model:total="tableCfg.total"
      v-model:pageSize="tableCfg.pageSize">
    </gc-paginationx>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import tablexUtils from "@utils/tablex";
import forecastApi from "@api/forecast/forecastApi";
import router from "@/router";

interface DatasourceItem {
  id: string
  name: string
}
const datasourceList = ref<Array<DatasourceItem>>([])

const handleDetail = (record) => {
  router.push({ name: "TrafficJamForecastDetail", params: { roadName: record.roadName, datasourceId: record.datasourceId } });
};

const columns = [
  { title: "序号", dataIndex: "index", key: "index" },
  { title: "名称", dataIndex: "cnRoadName", key: "cnRoadName" },
  { title: "数据源", dataIndex: "datasourceName", key: "datasourceName" },
  { title: "经纬度", dataIndex: "position", key: "position" },
  { title: "操作", key: "action" }
];

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: forecastApi.page,
    params: {
      datasourceId: "",
      key: ""
    },
    loading: false,
    columns,
    data: [],
    pageNo: 1,
    pageSize: 10
  })
);

const loadSourceSelectData = () => {
  tableCfg.loading = true
  forecastApi.sourceList({}).then((res) => {
    datasourceList.value = res.data.list
    if (res.data.list && res.data.list.length) {
      tableCfg.params.datasourceId = res.data.list[0].id || ''
    }
    onSearch()
    tableCfg.loading = false
  }).catch(() => {
    tableCfg.loading = false
  })
}

const onSearch = () => {
  tablexUtils.serach(tableCfg);
};

const onRefresh = () => {
  tablexUtils.refresh(tableCfg);
};

onMounted(() => {
  loadSourceSelectData()
})
</script>
<style lang="less" scoped>
.paly-icon {
  font-size: 16px;
  color: #1890ff;
  cursor: pointer;

  &:hover {
    color: #40a9ff;
  }
}

.ant-table-cell {
  padding: 8px 16px;
}

.desc {
  font-size: 16px;
  padding: 5px 0 10px 0;
}
</style>
