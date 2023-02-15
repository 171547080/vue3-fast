<!--
 * @Description: 个人中心-我的申请列表
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <gc-toolbar>
    <template #top>
    <a-button
        type="primary"
        @click="handleAdd"
        >
        <template #icon><plus-circle-outlined /></template>
        创建工单
        </a-button>
    </template>
    <template #left>
      <!-- <a-button
        type="primary"
        class="add-btn btn"
        @click="handleAdd"
        >
        <template #icon><plus-circle-outlined /></template>
        创建工单
        </a-button> -->
      <a-button
        class="update-btn btn"
        >
        <template #icon><edit-outlined/></template>
        修改
        </a-button>

        <a-button
        class="del-btn btn"
        >
        <template #icon><delete-outlined /></template>
        删除
        </a-button>

        <a-button
        class="export-btn btn"
        >
        <template #icon><upload-outlined/></template>
        导出
        </a-button>
    </template>
    <template #right>
      <!-- <span class="item-label"></span> -->
      <a-select
        v-model:value="tableCfg.params.position"
        class="item-input"
        placeholder="职位"
        :allowClear="true"
        style="width: 120px"
        @change="onSearch"
      >
        <a-select-option v-for="(d, key) in positionMap" :key="key" :value="key">{{
          d
        }}</a-select-option>
      </a-select>
      <!-- <span class="item-label"></span> -->
      <a-select
        v-model:value="tableCfg.params.status"
        class="item-input"
        placeholder="状态"
        :allowClear="true"
        style="width: 120px"
        @change="onSearch"
      >
        <a-select-option v-for="(d, key) in statusMap" :key="key" :value="key">{{
          d
        }}</a-select-option>
      </a-select>
    </template>
    <template #search>
      <a-space direction="horizontal">
      <a-input-search
        v-model:value="tableCfg.params.key"
        class="item-input"
        placeholder="名称/描述关键字搜索"
        enter-button
        @search="onSearch"
      />
      <a-button
        class="reset-btn"
        @click="handleReset"
        >
        <template #icon><sync-outlined /></template>
        重置
        </a-button>
      </a-space>
    </template>
  </gc-toolbar>
  <gc-tablex
    ref="tableRef"
    :columns="tableCfg.columns"
    :data="tableCfg.data"
    :loading="tableCfg.loading"
    :noDataText="tableCfg.noDataText"
    :errorMessage="tableCfg.errorMessage"
    :pageNo="tableCfg.pageNo"
    :pageSize="tableCfg.pageSize"
    :checkbox="true"
  >
    <template #bodyCell="{ column, record, index }">
      <template v-if="column.key === 'index'">
        <span>
          {{ (tableCfg.pageNo - 1) * tableCfg.pageSize + index + 1 }}
        </span>
      </template>
      <template v-if="column.key === 'name'">
        <a @click="hangeToDetail(record)">
          {{ record.name }}
        </a>
      </template>

      <template v-if="column.key === 'status'">
        <span>
          {{ statusMap[record.status] }}
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
  <gc-paginationx
    v-model:pageNo="tableCfg.pageNo"
    v-model:total="tableCfg.total"
    v-model:pageSize="tableCfg.pageSize"
    @change="onRefresh"
  >
  </gc-paginationx>

  <popup-personal-apply ref="popupApply" @onSubmit="onRefresh" />
  <popup-personal-apply-delete ref="popuDelete" @onSubmit="onRefresh" />
</template>
<script setup lang="ts" name="VehicleTypePages">
import { ref, reactive, onMounted } from 'vue'
import { dateFormat } from '@utils/moment'
import tablexUtils from '@utils/tablex'
import applyApi from '@api/personal/applyApi'
import PopupPersonalApply from './popup/PopupPersonalApply.vue'
import PopupPersonalApplyDelete from './popup/PopupPersonalApplyDelete.vue'
import GcTablex from '@/components/gc/gc-tablex.vue'

import { EditOutlined, DeleteOutlined, PlusCircleOutlined, UploadOutlined, SyncOutlined } from '@ant-design/icons-vue'

const statusMap = {
  1: '未处理',
  2: '已处理'
}

const positionMap = {
  1: '普通员工',
  2: '部门领导'
}

const tableRef = ref<InstanceType<typeof GcTablex>>()

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: applyApi.page,
    url: '',
    params: {
      type: '',
      key: ''
    },
    loading: false,
    columns: [
      { title: '序号', dataIndex: 'index', key: 'index' },
      { title: '人员名称', dataIndex: 'username', key: 'username' },
      { title: '工单', dataIndex: 'no', key: 'no' },
      { title: '工单名称', dataIndex: 'name', key: 'name' },
      { title: '发起人', key: 'creator', dataIndex: 'creator' },
      { title: '接受部门', dataIndex: 'acceptDep', key: 'acceptDep' },
      { title: '处理部门', key: 'handleDep', dataIndex: 'handleDep' },
      { title: '职位', dataIndex: 'position', key: 'position' },
      { title: '手机号码', key: 'phone', dataIndex: 'phone' },
      { title: '状态', dataIndex: 'status', key: 'status' },
      { title: '操作', key: 'action' }
    ],
    data: [],
    pageNo: 1,
    pageSize: 10
  })
)

// 新增
const popupApply = ref<InstanceType<typeof PopupPersonalApply>>()
const handleAdd = () => {
  popupApply.value?.showadd()
}

// 编辑
const handleUpdate = (row) => {
  popupApply.value?.showUpdate(row)
}

// 删除
const popuDelete = ref<InstanceType<typeof PopupPersonalApplyDelete>>()
const handleDelete = (row) => {
  popuDelete.value?.confirm(row)
}

// 详情
const hangeToDetail = (row) => {
  console.error('hangeToDetail', row)
}

// 搜索
const onSearch = () => {
  tablexUtils.serach(tableCfg).then(() => {
    tableRef.value?.setSelectedRowKeys([0, 1, 2, 3])
    console.error(tableRef.value?.getSelectedRowData())
  })
}

// 重置
const handleReset = () => {
  tableCfg.params.status = ''
  tableCfg.params.position = ''
  tablexUtils.serach(tableCfg)
}

// 刷新
const onRefresh = () => {
  tablexUtils.refresh(tableCfg)
}
onMounted(() => {
  onSearch()
})
</script>

<style lang="less">
.btn{
  margin-right: 15px;
  border-radius: 5px;
}
.add-btn{
  border-color: #12ab5f ;
  background: #e4fcf0;
  color: #119f58;
  &:hover{
    border-color: #0f9150 ;
    color:#0f884b;
  }
}

.update-btn{
  border-color: #4295cc ;
  background: #daebf5;
  color: #2472a6;
  &:hover{
    border-color: #3283b8 ;
    color:#1e5e88;
  }
}
.del-btn{
  border-color: #ea8282 ;
  background: #fae8e8;
  color: #e36767;
  &:hover{
    border-color: #e45f5f ;
    color:#d93333;
  }
}
.export-btn {
  border-color: #e8b453 ;
  background: #fcf3e4;
  color: #d9a75b;
  &:hover{
    border-color: #e2a32c ;
    color:#d1953a;
  }
}
.reset-btn{
  margin-left: 15px;
  padding: 4px 8px;
}
</style>
