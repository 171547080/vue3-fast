<template>
    <div class="desc">【拥堵等级配置】主要为平台进行拥堵识别时提供判断依据，根据配置的平均车速上下限范围进行拥堵特征性识别，并自动进行等级划分依据</div>

    <gc-toolbar>
        <template #right>
            <span class="item-label">数据源</span>
            <a-select class="item-input" style="width: 160px" @change="onSearch" :allowClear="true"
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
    <gc-tablex ref="alarmTable" :columns="tableCfg.columns" :data="tableCfg.data" :loading="tableCfg.loading"
        :noDataText="tableCfg.noDataText" :errorMessage="tableCfg.errorMessage" :pageNo="tableCfg.pageNo"
        :pageSize="tableCfg.pageSize">
        <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
                <span>
                    {{ ((tableCfg.pageNo - 1) * tableCfg.pageSize) + index + 1 }}
                </span>
            </template>
            <template v-if="column.key === 'cnJamLv'">
                <span>
                    <a-tag :color="levelStateMap[record.jamLv].color">
                        {{ record.cnJamLv }}
                    </a-tag>
                </span>
            </template>
            <template v-if="column.key === 'minSpeed'">
                <span>
                    {{ record.minSpeed }} km/h
                </span>
            </template>

            <template v-if="column.key === 'maxSpeed'">
                <span>
                    {{ (record.maxSpeed > 0 ? (record.maxSpeed + ' km/h') : ' 不限') }}
                </span>
            </template>
            <template v-if="column.key === 'average'">
                <span>{{ record.minSpeed + ' km/h <= V <' + (record.maxSpeed > 0 ? (record.maxSpeed + ' km/h') : ' 不限') }}
                </span>
            </template>
            <template v-else-if="column.key === 'action'">
                <span @click="handleUpdate(record)">
                    <a>配置</a>
                </span>
            </template>
        </template>
    </gc-tablex>
    <PopupTrafficJamLevelConfigUpdate ref="popupConfigUpdate" @onSubmit="onRefresh" />
</template>
<script setup lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import tablexUtils from '@utils/tablex'
import configApi from '@api/jam/configApi'
import forecastApi from "@api/forecast/forecastApi";

import PopupTrafficJamLevelConfigUpdate from './popup/PopupTrafficJamLevelConfigUpdate.vue'

defineComponent({
  PopupTrafficJamLevelConfigUpdate
})

const levelStateMap = {
  SMOOTH: { color: 'green', text: '流畅' },
  LIGHT: { color: 'geekblue', text: '轻度拥堵' },
  MEDIUM: { color: 'volcano', text: '拥堵' },
  HEAVY: { color: 'red', text: '严重拥堵' }
}

const popupConfigUpdate = ref<InstanceType<typeof PopupTrafficJamLevelConfigUpdate>>()
const handleUpdate = (record) => {
  popupConfigUpdate.value?.popup(record)
}

const columns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '拥堵等级', dataIndex: 'cnJamLv', key: 'cnJamLv' },
  { title: '数据源', dataIndex: 'datasourceName', key: 'datasourceName' },
  { title: '最小车速', dataIndex: 'minSpeed', key: 'minSpeed' },
  { title: '最大车速', dataIndex: 'maxSpeed', key: 'maxSpeed' },
  { title: '平均车速', dataIndex: 'average', key: 'average' },
  { title: '操作', key: 'action' }
];

const tableCfg = ref(
  tablexUtils.createCfg({
    api: configApi.page,
    params: {
      datasourceId: ''
    },
    loading: false,
    columns,
    data: [],
    pageNo: 1,
    pageSize: 10
  })
)


interface DatasourceItem {
    id: string
    name: string
}
const datasourceList = ref<Array<DatasourceItem>>([])
const loadSourceSelectData = () => {
  forecastApi.sourceList({}).then((res) => {
    datasourceList.value = res.data.list
  }).catch(() => {
    // do nothing.
  })
}
const onSearch = (() => {
  tablexUtils.serach(tableCfg.value)
})


const onRefresh = (() => {
  tablexUtils.refresh(tableCfg.value)
})
onMounted(() => {
  loadSourceSelectData()
  onSearch()
})
</script>
<style lang="less" scoped>
.desc {
    font-size: 16px;
    padding: 5px 0 10px 0;
}
</style>
