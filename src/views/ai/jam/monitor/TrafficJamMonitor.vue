<template>
    <div class="desc">监控设备管理主要为平台操作拥有提供配置【高速公路拥堵识别】所需要的图像资源</div>

    <gc-toolbar>
        <template #left>
            <a-button type="primary" @click="handelAdd">新增</a-button>
        </template>
        <template #right>
            <!-- <span class="item-label"> 设备类型 </span>
            <a-select class="item-input" style="width: 120px" @change="onSearch" :allowClear="true"
                v-model:value="tableCfg.params.type">
                <a-select-option v-for="(d, key) in deviceTypeMap" :value="key" :key="key">{{ d }}</a-select-option>
            </a-select> -->

            <!-- <span class="item-label"> 镇区 </span>
            <a-select class="item-input" style="width: 120px" @change="onSearch" v-model:value="tableCfg.params.area"
                :allowClear="true">
                <a-select-option v-for="(d, key) in areaMap" :value="key" :key="key">{{ d }}</a-select-option>
            </a-select> -->

        </template>
        <template #search>
            <a-input-search v-model:value="tableCfg.params.key" class="item-input" placeholder="关键字搜索" enter-button
                @search="onSearch" />
        </template>
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
            <template v-if="column.key === 'name'">
                <a @click="handleDetail(record)">
                    {{ record.name }}
                </a>
            </template>
            <template v-if="column.key === 'position'">
                <div>
                    {{ '东经: ' + record.longitude }}
                </div>
                <div>
                    {{ '北纬: ' + record.latitude }}
                </div>
            </template>

            <template v-if="column.key === 'type'">
                <span>
                    {{ deviceTypeMap[record.type] }}
                </span>
            </template>


            <template v-if="column.key === 'creationTime'">
                <span>
                    {{ datetimeFormat(record.creationTime) }}
                </span>
            </template>
            <template v-else-if="column.key === 'action'">
                <span @click="handleUpdate(record)">
                    <a>编辑</a>
                </span>
                <span @click="handleDelete(record)">
                    <a>删除</a>
                </span>
                <span @click="handleDetail(record)">
                    <a>详情</a>
                </span>
            </template>
        </template>
    </gc-tablex>
    <gc-paginationx @change="onRefresh" v-model:pageNo="tableCfg.pageNo" v-model:total="tableCfg.total"
        v-model:pageSize="tableCfg.pageSize">
    </gc-paginationx>
    <PopupTrafficJamMonitorAdd ref="popupMonitorAdd" @onSubmit="onSearch" />
    <PopupTrafficJamMonitorUpdate ref="popupMonitorUpdate" @onSubmit="onRefresh" />
    <PopupTrafficJamMonitorDelete ref="popupMonitorDelete" @onSubmit="onRefresh" />
    <PopupTrafficJamMonitorDetail ref="popupMonitorDetail" />

</template>
<script setup lang="ts">
import { defineComponent, ref } from 'vue'
import tablexUtils from '@utils/tablex'
import monitorApi from '@api/jam/monitorApi'
import { datetimeFormat } from "@utils/moment";
import PopupTrafficJamMonitorAdd from './popup/PopupTrafficJamMonitorAdd.vue'
import PopupTrafficJamMonitorUpdate from './popup/PopupTrafficJamMonitorUpdate.vue'
import PopupTrafficJamMonitorDelete from './popup/PopupTrafficJamMonitorDelete.vue'
import PopupTrafficJamMonitorDetail from './popup/PopupTrafficJamMonitorDetail.vue'

defineComponent({
  PopupTrafficJamMonitorAdd,
  PopupTrafficJamMonitorUpdate,
  PopupTrafficJamMonitorDelete
})


const deviceTypeMap = {
  'RTSP': '视频流',
  'Monitor': '摄像头'
}


const popupMonitorAdd = ref<InstanceType<typeof PopupTrafficJamMonitorAdd>>()
const handelAdd = () => {
  popupMonitorAdd.value?.popup()
}

const popupMonitorUpdate = ref<InstanceType<typeof PopupTrafficJamMonitorUpdate>>()
const handleUpdate = (record) => {
  popupMonitorUpdate.value?.popup(record)
}

const popupMonitorDelete = ref<InstanceType<typeof PopupTrafficJamMonitorDelete>>()
const handleDelete = (record) => {
  popupMonitorDelete.value?.confirm(record)
}

const popupMonitorDetail = ref<InstanceType<typeof PopupTrafficJamMonitorDetail>>()
const handleDetail = (record) => {
  popupMonitorDetail.value?.popup(record)
}

const columns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '设备类型', dataIndex: 'type', key: 'type' },
  { title: '编号', dataIndex: 'deviceCode', key: 'deviceCode' },
  // { title: '镇区', dataIndex: 'area', key: 'area', },
  { title: '位置', dataIndex: 'positionDescription', key: 'positionDescription' },
  { title: '经纬度', dataIndex: 'position', key: 'position' },
  { title: '方向', key: 'direction', dataIndex: 'direction' },
  { title: '创建时间', key: 'creationTime', dataIndex: 'creationTime' },
  { title: '操作', key: 'action' }
];

const tableCfg = ref(
  tablexUtils.createCfg({
    api: monitorApi.page,
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
  tablexUtils.serach(tableCfg.value)
})


const onRefresh = (() => {
  tablexUtils.refresh(tableCfg.value)
})

onSearch()
</script>
<style lang="less" scoped>
.desc {
    font-size: 16px;
    padding: 5px 0 10px 0;
}
</style>
