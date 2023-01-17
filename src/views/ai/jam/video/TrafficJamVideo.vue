<template>
    <div class="desc">
        【高速公路拥堵识别】支持根据高速公路实时图像推断高速公路交通状态，识别结果符合国家高速路道路标准中规定的四个等级分类;提供高速公路本地化拥堵模型训练功能，对高速公路的交通状态的有十分精确的识别准确率</div>

    <gc-toolbar>
        <template #left>
            <a-button type="primary" @click="handelAdd">新增</a-button>
        </template>
        <template #right>
            <!-- <span class="item-label"> 拥堵状态 </span>
            <a-select class="item-input" style="width: 120px" @change="onSearch" :allowClear="true"
                v-model:value="tableCfg.params.level">
                <a-select-option v-for="(d, key) in levelStateMap" :value="key" :key="key">{{ d.text }}
                </a-select-option>
            </a-select> -->

            <!-- <span class="item-label"> 设备类型 </span>
            <a-select class="item-input" style="width: 120px" @change="onSearch" :allowClear="true"
                v-model:value="tableCfg.params.type">
                <a-select-option v-for="(d, key) in deviceTypeMap" :value="key" :key="key">{{ d }}</a-select-option>
            </a-select> -->

            <!-- <span class="item-label"> 镇区 </span>
            <a-select class="item-input" style="width: 120px" @change="onSearch" v-model:value="tableCfg.params.town"
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
            <template v-if="column.key === 'level'">
                <span>
                    <a-tag :color="(levelStateMap[record.level] || levelStateMap[0]).color">
                        {{ (levelStateMap[record.level] || levelStateMap[0]).text }}
                    </a-tag>
                </span>
            </template>
            <template v-if="column.key === 'positionDescription'">
                <span>
                    {{ record.positionDescription || '--' }}
                </span>
            </template>

            <template v-if="column.key === 'type'">
                <span>
                    {{ deviceTypeMap[record.type] }}
                </span>
            </template>

            <template v-if="column.key === 'dataSourceDescription'">
                <span v-if="record.type === 'RTSP'">
                    {{ record.dataSource }}
                </span>

                <span v-if="record.type === 'Monitor'">
                    {{ '摄像头: ' + record.dataSourceDescription }}
                </span>
            </template>



            <template v-if="column.key === 'name'">
                <a @click="handelJamDetail(record)">
                    {{ record.name }}
                </a>
            </template>
            <template v-if="column.key === 'creationTime'">
                <span>
                    {{ datetimeFormat(record.creationTime) }}
                </span>
            </template>

            <template v-else-if="column.key === 'action'">
                <span>
                    <a @click="handelJamUpdate(record)"> 编辑</a>
                </span>
                <span @click="handelAlarmUpdate(record)">
                    <a>告警等级</a>
                </span>
                <span @click="handelJamDelete(record)">
                    <a> 删除</a>
                </span>
                <span>
                    <a @click="handelJamDetail(record)">详情</a>
                </span>
            </template>
        </template>
    </gc-tablex>
    <gc-paginationx @change="onRefresh" v-model:pageNo="tableCfg.pageNo" v-model:total="tableCfg.total"
        v-model:pageSize="tableCfg.pageSize">
    </gc-paginationx>
    <PopupTrafficJamAdd ref="popupJamAdd" @onSubmit="onSearch" />
    <PopupTrafficJamUpdate ref="popupJamUpdate" @onSubmit="onRefresh" />
    <PopupTrafficJamAlarm ref="popupAlarmUpdate" @onSubmit="onRefresh" />
    <PopupTrafficJamDelete ref="popupJamDelete" @onSubmit="onRefresh" />

</template>
<script setup lang="ts">
import { defineComponent, ref, onMounted, reactive } from 'vue'
import Router from "@/router"
import tablexUtils from '@utils/tablex'
import jamApi from '@api/jam/jamApi'
import { datetimeFormat } from "@utils/moment";
import PopupTrafficJamAdd from './popup/PopupTrafficJamAdd.vue'
import PopupTrafficJamUpdate from './popup/PopupTrafficJamUpdate.vue'
import PopupTrafficJamDelete from './popup/PopupTrafficJamDelete.vue'
import PopupTrafficJamAlarm from './popup/PopupTrafficJamAlarm.vue'


defineComponent({ PopupTrafficJamAdd, PopupTrafficJamDelete, PopupTrafficJamUpdate, PopupTrafficJamAlarm })

const levelStateMap = {
  0: { color: 'grey', text: '暂无' },
  1: { color: 'green', text: '流畅' },
  2: { color: 'geekblue', text: '轻度拥堵' },
  3: { color: 'volcano', text: '拥堵' },
  4: { color: 'red', text: '严重拥堵' }
}

const deviceTypeMap = {
  'RTSP': '视频流',
  'Monitor': '摄像头'
}

const popupJamAdd = ref<InstanceType<typeof PopupTrafficJamAdd>>()
const handelAdd = () => {
  popupJamAdd.value?.popup()
}

const popupJamUpdate = ref<InstanceType<typeof PopupTrafficJamUpdate>>()
const handelJamUpdate = (record) => {
  popupJamUpdate.value?.popup(record)
}

const popupJamDelete = ref<InstanceType<typeof PopupTrafficJamDelete>>()
const handelJamDelete = (record) => {
  popupJamDelete.value?.confirm(record)
}

const popupAlarmUpdate = ref<InstanceType<typeof PopupTrafficJamAlarm>>()
const handelAlarmUpdate = (record) => {
  popupAlarmUpdate.value?.popup(record)
}

const handelJamDetail = (record) => {
  Router.push({ name: 'TrafficJamVideoDetail', params: { id: record.id } })
}

const columns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '类型', dataIndex: 'cnType', key: 'cnType' },
  { title: '数据源', dataIndex: 'dataSourceDescription', key: 'dataSourceDescription' },
  { title: '创建时间', key: 'creationTime', dataIndex: 'creationTime' },
  { title: '操作', key: 'action' }
];

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: jamApi.page,
    params: {
      type: '',
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

onMounted(() => {
  onSearch()
})
</script>
<style lang="less" scoped>
.desc {
    font-size: 16px;
    padding: 5px 0 10px 0;
}
</style>
