<template>
    <div class="desc">【车牌定位和识别】具有高鲁帮性的车标识别功能,并在车牌车牌污染、变形倾斜以及极端天气条件下依然具有高度的准确的车牌识别功能</div>

    <gc-toolbar>
        <template #left>
            <a-button type="primary" @click="handelAdd">新增</a-button>
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
            <template v-if="column.key === 'img'">
                <div class="img-warp">
                    <img class="img" :src="getImgUrl(record)" :onerror="'src=\'' + defaultImg + '\''"
                        @click="handelImgClick($event, record)" />
                </div>
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
    <PopupLicensePlateAdd ref="popupAdd" @onSubmit="onSearch" />
    <PopupLicensePlateUpdate ref="popupUpdate" @onSubmit="onRefresh" />
    <PopupLicensePlateDelete ref="popupDelete" @onSubmit="onRefresh" />
</template>
<script setup lang="ts">
import { defineComponent, ref, reactive, onMounted } from 'vue'
import { datetimeFormat } from "@utils/moment";
import tablexUtils from '@utils/tablex'
import CONFIG from '@/config'
import licensePlateApi from '@api/licensePlate/licensePlateApi'
import PopupLicensePlateAdd from './popup/PopupLicensePlateAdd.vue'
import PopupLicensePlateUpdate from './popup/PopupLicensePlateUpdate.vue'
import PopupLicensePlateDelete from './popup/PopupLicensePlateDelete.vue'
import router from "@/router";

defineComponent({
  PopupLicensePlateAdd,
  PopupLicensePlateUpdate,
  PopupLicensePlateDelete
})

const defaultImg = CONFIG.defaultImg
const getImgUrl = (record) => {
  return licensePlateApi.imageUrl(record.id)
}
const handelImgClick = (event, record) => {
  if (event && event.target && event.target.src) {
    if ((event.target.src as string).endsWith(defaultImg)) {
      return
    }
    if (record){
      // todo something
    }

    window.open(event.target.src)
  }

}

const popupAdd = ref<InstanceType<typeof PopupLicensePlateAdd>>()
const handelAdd = () => {
  popupAdd.value?.popup()
}

const popupUpdate = ref<InstanceType<typeof PopupLicensePlateUpdate>>()
const handleUpdate = (record) => {
  popupUpdate.value?.popup(record)
}

const popupDelete = ref<InstanceType<typeof PopupLicensePlateDelete>>()
const handleDelete = (record) => {
  popupDelete.value?.confirm(record)
}

const handleDetail = (record) => {
  router.push({
    name: "LicensePlateDetail",
    params: {
      id: record.id,
      ...record
    }
  });
}

const columns = [
  { title: '序号', dataIndex: 'index', key: 'index' },
  { title: '名称', dataIndex: 'name', key: 'name' },
  { title: '图像', dataIndex: 'img', key: 'img' },
  { title: '创建时间', key: 'creationTime', dataIndex: 'creationTime' },
  { title: '操作', key: 'action' }
];

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: licensePlateApi.page,
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
onMounted(() => {
  onSearch()
})
</script>
<style lang="less" scoped>
.table {
    :deep(.ant-table-cell) {
        padding: 5px 20px;
    }

    :deep(.ant-table-cell:first-child) {
        text-align: right;
    }
}

.desc {
    font-size: 16px;
    padding: 10px 0 10px 0;
}


.img {
    cursor: pointer;
    height: 50px;
    border: #fff 1px solid;

    &:hover {
        border: #1890ff 1px solid;
    }

    transition: all .3s;

}
</style>
