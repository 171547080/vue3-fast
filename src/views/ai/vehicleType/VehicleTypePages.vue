<template>
  <div class="desc">
    <p>
      提供基于市政等监控摄像头、图片等数据的精细化车辆检测功能，可以精准区分不少于8类不同的车辆(MPV、SUV、小)
      轿车、客车、火车、三轮车、摩托车、危化品车辆)，对在不利条件下拍摄的图像由于像素偏移导致小物体模糊等问题具有较强的纠正的功能
    </p>
  </div>
  <Toolbar>
    <template #left>
      <a-button type="primary" @click="
        () => {
          popupAdd?.popup();
        }
      ">新增</a-button>
    </template>
    <template #right>
      <span class="item-label"> 类型 </span>
      <a-select class="item-input" :allowClear="true" style="width: 120px" @change="onSearch"
        v-model:value="tableCfg.params.type">
        <a-select-option v-for="(d, key) in typeMap" :value="key" :key="key">{{
            d
        }}</a-select-option>
      </a-select>
    </template>
    <template #search>
      <a-input-search v-model:value="tableCfg.params.key" class="item-input" placeholder="名称/描述关键字搜索" enter-button
        @search="onSearch" />
    </template>
  </Toolbar>
  <gc-tablex :columns="tableCfg.columns" :data="tableCfg.data" :loading="tableCfg.loading"
    :noDataText="tableCfg.noDataText" :errorMessage="tableCfg.errorMessage" :pageNo="tableCfg.pageNo"
    :pageSize="tableCfg.pageSize">
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'index'">
        <span>
          {{ ((tableCfg.pageNo - 1) * tableCfg.pageSize) + index + 1 }}
        </span>
      </template>
      <template v-if="column.key === 'name'">
        <a @click="hangeToDetail(record)">
          {{ record.name }}
        </a>
      </template>

      <template v-if="column.key === 'type'">
        <span>
          {{ typeMap[record.type] }}
        </span>
      </template>
      <template v-if="column.key === 'creationTime'">
        <span>
          {{ dateFormat(record.creationTime) }}
        </span>
      </template>

      <template v-else-if="column.key === 'action'">
        <span>
          <a @click="handleUpdate(record)">编辑</a>
        </span>
        <span>
          <a @click="handleDelete(record)">删除</a>
        </span>
        <span>
          <a @click="hangeToDetail(record)">详情</a>
        </span>
      </template>
    </template>
  </gc-tablex>
  <gc-paginationx @change="onRefresh" v-model:pageNo="tableCfg.pageNo" v-model:total="tableCfg.total"
    v-model:pageSize="tableCfg.pageSize">
  </gc-paginationx>

  <PopupVechicleTypeAdd ref="popupAdd" @onSubmit="onRefresh" />
  <PopupVechicleTypeUpdate ref="popuUpdate" @onSubmit="onRefresh" />
  <PopupVechicleTypeDelete ref="popuDelete" @onSubmit="onRefresh" />
</template>
<script setup lang="ts" name="VehicleTypePages">
import { ref, reactive, onMounted } from "vue";
import { dateFormat } from "@utils/moment";
import tablexUtils from "@utils/tablex";
import vehicleTypeApi from "@api/vehicleType/vehicleTypeApi";
import router from "@/router";
import PopupVechicleTypeAdd from "./popup/PopupVechicleTypeAdd.vue";
import PopupVechicleTypeUpdate from "./popup/PopupVechicleTypeUpdate.vue";
import PopupVechicleTypeDelete from "./popup/PopupVechicleTypeDelete.vue";

const popupAdd = ref<InstanceType<typeof PopupVechicleTypeAdd>>();

const typeMap = {
  VideoStream: "视频流",
  Picture: "图像"
};

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: vehicleTypeApi.page,
    url: "",
    params: {
      type: "",
      key: ""
    },
    loading: false,
    columns: [
      { title: "序号", dataIndex: "index", key: "index" },
      { title: "名称", dataIndex: "name", key: "name" },
      { title: "类型", dataIndex: "type", key: "type" },
      { title: "描述", dataIndex: "description", key: "description" },
      { title: "创建时间", key: "creationTime", dataIndex: "creationTime" },
      { title: "操作", key: "action" }
    ],
    data: [],
    pageNo: 1,
    pageSize: 10
  })
);

const popuUpdate = ref<InstanceType<typeof PopupVechicleTypeUpdate>>();
const handleUpdate = (row) => {
  popuUpdate.value?.popup(row)
}

const popuDelete = ref<InstanceType<typeof PopupVechicleTypeDelete>>();
const handleDelete = (row) => {
  popuDelete.value?.confirm(row)
}
const hangeToDetail = (row) => {
  if (row.type === "VideoStream") {
    router.push({
      name: "VehicleTypeVideoDetail",
      params: {
        id: row.id,
        ...row
      }
    }); 
  }

  if (row.type === "Picture") {
    router.push({
      name: "VehicleTypeImageDetail",
      params: {
        id: row.id,
        ...row
      }
    }); 
  }
};

const onSearch = () => {
  tablexUtils.serach(tableCfg);
};

const onRefresh = () => {
  tablexUtils.refresh(tableCfg);
};
onMounted(() => {
  onSearch();
})
</script>
<style lang="less" scoped>
.desc {
  font-size: 16px;
  padding: 5px 0 0 0;

  p {
    text-indent: 2em;
    margin-bottom: 2px;
  }
}
</style>
