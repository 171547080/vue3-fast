<template>
    <div class="desc">告警信息主要为平台操作拥有提供高效信息展示,此处信息记录了所有【高速公路拥堵识别】的告警信息</div>

    <gc-toolbar>
        <template #right>
            <!-- <span class="item-label"> 设备类型 </span>
            <a-select class="item-input" style="width: 120px" @change="onSearch" v-model:value="tableCfg.params.type"
                :allowClear="true">
                <a-select-option v-for="(d, key) in deviceTypeMap" :value="key" :key="key">{{ d }}</a-select-option>
            </a-select> -->

            <!-- <span class="item-label"> 镇区 </span>
            <a-select class="item-input" style="width: 120px" @change="onSearch" v-model:value="tableCfg.params.area"
                :allowClear="true">
                <a-select-option v-for="(d, key) in areaMap" :value="key" :key="key">{{ d }}</a-select-option>
            </a-select> -->

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
            <template v-if="column.key === 'source'">
                <span v-if="record.dataType === 'RTSP'">
                    {{ record.cnDateType + " : " + record.dataName }}
                </span>

                <span v-if="record.dataType === 'Monitor'">
                    {{ record.cnDateType + " : " + record.monitorName }}
                </span>
            </template>


            <template v-if="column.key === 'level'">
                <span>
                    <a-tag :color="levelStateMap[record.jamLv].color">
                        {{ record.cnjamLv }}
                    </a-tag>
                </span>
            </template>

            <template v-if="column.key === 'name'">
                <span>
                    {{ record.name }}
                </span>
            </template>

            <template v-if="column.key === 'positionDescription'">
                <span>
                    {{ record.positionDescription || '--' }}
                </span>
            </template>
            <template v-if="column.key === 'direction'">
                <span>
                    {{ record.direction || '--' }}
                </span>
            </template>
            
            <template v-if="column.key === 'recordTime'">
                <span>
                    {{ datetimeFormat(record.recordTime) }}
                </span>
            </template>

            <template v-else-if="column.key === 'action'">
                <span>
                    <a>详情</a>
                </span>
            </template>
        </template>
    </gc-tablex>
    <gc-paginationx @change="onRefresh" v-model:pageNo="tableCfg.pageNo" v-model:total="tableCfg.total"
        v-model:pageSize="tableCfg.pageSize">
    </gc-paginationx>
</template>
<script setup lang="ts">
import { reactive } from 'vue'
import tablexUtils from '@utils/tablex'
import alarmApi from '@api/jam/alarmApi'
import { datetimeFormat } from "@utils/moment";
const levelStateMap = {
  0: { color: 'green', text: '流畅' },
  1: { color: 'geekblue', text: '轻度拥堵' },
  2: { color: 'volcano', text: '拥堵' },
  3: { color: 'red', text: '严重拥堵' }
}


const columns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '拥堵等级', dataIndex: 'level', key: 'level' },
  { title: '来源', key: 'source', dataIndex: 'source' },
  { title: '位置', dataIndex: 'positionDescription', key: 'positionDescription' },
  // { title: '镇区', dataIndex: 'town', key: 'town', },
  { title: '方向', key: 'direction', dataIndex: 'direction' },
  { title: '告警时间', key: 'recordTime', dataIndex: 'recordTime' }
  // { title: '操作',key: 'action',},
];

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: alarmApi.page,
    params: {
      deviceType: '',
      area: '',
      key: ''
    },
    loading: false,
    columns,
    data: [],
    pageNo: 1,
    pageSize: 10
  })
)

const onSearch = (() => {
  tablexUtils.serach(tableCfg)
})


const onRefresh = (() => {
  tablexUtils.refresh(tableCfg)
})

onSearch()
</script>
<style lang="less" scoped>
.desc {
    font-size: 16px;
    padding: 5px 0 10px 0;
}
</style>
