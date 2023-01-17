<template>
    <div class="desc">【公路病害识别】实现纵向裂缝、纵向拼接缝、横向裂缝、横向拼接缝、龟裂、坑洞、十字路口模糊、白线模糊等8种公路病害识别，支持通过采集公路的摄像头实时影像数据和元数据、实时探测公路病害状况。</div>

    <gc-toolbar>
        <template #left>
            <a-button type="primary" @click="handelAdd">新增</a-button>
        </template>
        <template #right>
            <!-- <span class="item-label"> 类型 </span>
            <a-select class="item-input" :allowClear="true" style="width: 120px" @change="onSearch"
                v-model:value="tableCfg.params.type">
                <a-select-option v-for="(d, key) in typeMap" :value="key" :key="key">{{
                        d
                }}</a-select-option>
            </a-select> -->
        </template>
        <template #search>
            <a-input-search v-model:value="tableCfg.params.key" class="item-input" placeholder="关键字搜索" enter-button
                @search="onSearch" />
        </template>
    </gc-toolbar>
    <gc-tablex class="table" :columns="tableCfg.columns" :data="tableCfg.data" :loading="tableCfg.loading"
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

            <template v-if="column.key === 'type'">
                <span>
                    {{ typeMap[record.type] || '--' }}
                </span>
            </template>
            <template v-if="column.key === 'source'">
                <span v-if="record.type == 'VideoStream'">
                    {{ record.sourceUrl }}
                </span>

                <span v-if="record.type == 'Camera'">
                    {{ record.cameraName }}
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
    <PopupHighwayDiseasesAdd ref="popupAdd" @onSubmit="onSearch" />
    <PopupHighwayDiseasesUpdate ref="popupUpdate" @onSubmit="onRefresh" />
    <PopupHighwayDiseasesDelete ref="popupDelete" @onSubmit="onRefresh" />
</template>
<script setup lang="ts" name="HighwayDiseases">
import { ref, reactive, onMounted } from 'vue'
import { datetimeFormat } from "@utils/moment";
import tablexUtils from '@utils/tablex'
import highwayApi from '@api/highway/highwayApi'
import PopupHighwayDiseasesAdd from './popup/PopupHighwayDiseasesAdd.vue'
import PopupHighwayDiseasesUpdate from './popup/PopupHighwayDiseasesUpdate.vue'
import PopupHighwayDiseasesDelete from './popup/PopupHighwayDiseasesDelete.vue'
import router from "@/router";

const typeMap = {
  RTSP: "视频流",
  CAMERA: "摄像头"
}

const popupAdd = ref()
const handelAdd = () => {
  popupAdd.value?.popup({ type: 'RTSP' })
}

const popupUpdate = ref()
const handleUpdate = (record) => {
  popupUpdate.value?.popup(record)
}

const popupDelete = ref()
const handleDelete = (record) => {
  popupDelete.value?.confirm(record)
}

const handleDetail = (record) => {
  router.push({
    name: "HighwayDiseasesDetail",
    params: {
      id: record.id,
      ...record
    }
  });
}

const columns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '类型', dataIndex: 'cnType', key: 'cnType' },
  { title: '数据源', dataIndex: 'dataSource', key: 'dataSource' },
  { title: '创建时间', key: 'creationTime', dataIndex: 'creationTime' },
  { title: '操作', key: 'action' }
];

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: highwayApi.page,
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
    padding: 10px 0 10px 0;
}
</style>
