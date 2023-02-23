<!--
 * @Description: 个人中心-我的申请列表
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <a-tabs v-model:activeKey="activeKey">
    <a-tab-pane key="1" tab=" 我的申请记录 ">
      <gc-toolbar>
        <template #right>
          <span class="item-label">申请人</span>
          <a-input
            v-model:value="tableCfg.params.applyUser"
            class="item-input"
            autocomplete="off"
            placeholder="请输入申请人"
            :disabled="tableCfg.loading"
          />

          <span class="item-label">申请时间</span>
          <a-range-picker
            v-model:value="applyDateType"
            :disabled="tableCfg.loading"
            @change="applyDateChange"/>

          <span class="item-label">环节</span>
          <a-input
            v-model:value="tableCfg.params.type"
            class="item-input"
            autocomplete="off"
            placeholder="请输入环节"
            :disabled="tableCfg.loading"
          />
          <span class="item-label">状态</span>
          <a-select
            v-model:value="tableCfg.params.status"
            placeholder="状态"
            :allowClear="true"
            style="width: 120px"
            @change="onSearch"
          >
            <a-select-option
              v-for="(d, key) in statusMap"
              :key="d.name"
              :value="key"
              >{{ d.name }}</a-select-option
            >
          </a-select>
        </template>
        <template #left>
          <gc-buttonx
            v-hasPermi="['work:order:update']"
            type-name="update"
            :disabled="
              tableRef?.selectedRowKeys &&
              (tableRef?.selectedRowKeys.length >= 2 ||
                tableRef?.selectedRowKeys.length === 0)
            "
            @click="handleUpdate(tableRef?.getSelectedRowData()[0])"
          >
          </gc-buttonx>

          <gc-buttonx
            v-hasPermi="['work:order:del']"
            type-name="del"
            :disabled="
              !(tableRef?.selectedRowKeys && tableRef?.selectedRowKeys.length >= 1)
            "
            @click="handleBatchDelete(tableRef?.getSelectedRowData())"
          >
          </gc-buttonx>
        </template>
        <template #search>
          <a-space direction="horizontal">
          <a-input-search
            v-model:value="tableCfg.params.key"
            class="item-input"
            placeholder="标题/关键字搜索"
            style="width: 210px;"
            enter-button
            @search="onSearch"
          />
          <gc-buttonx
            type-name="reset"
            @click="handleReset"
            >
            </gc-buttonx>
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
            <span :style="{color:statusMap[record.status].color || '#000'}">
              {{ statusMap[record.status].name }}
            </span>
          </template>
          <template v-if="column.key === 'applyDate'">
            <span>
              {{ dateFormat(record.applyDate) }}
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
    </a-tab-pane>
  </a-tabs>
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
import { Dayjs } from 'dayjs'

const statusMap = {
  1: {
    name: '未处理',
    color: '#23d96e'
  },
  2: {
    name: '已处理',
    color: '#ff0000'
  }
}

type RangeValue = [Dayjs | undefined, Dayjs | undefined]
const applyDateType = ref<RangeValue>()

const applyDateChange = (date, dateArray) => {
  tableCfg.params.startApplyDate = dateArray[0] || ''
  tableCfg.params.endApplyDate = dateArray[1] || ''
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
      { title: '申请单位', dataIndex: 'applyUser', key: 'applyUser' },
      { title: '申请项目', dataIndex: 'name', key: 'name' },
      { title: '申请时间', dataIndex: 'applyDate', key: 'applyDate' },
      { title: '项目标题', key: 'title', dataIndex: 'title' },
      { title: '手机号码', dataIndex: 'phone', key: 'phone' },
      { title: '状态', dataIndex: 'status', key: 'status' },
      { title: '操作', key: 'action' }
    ],
    data: [],
    pageNo: 1,
    pageSize: 10
  })
)

const activeKey = ref('1')

// 新增
const popupApply = ref<InstanceType<typeof PopupPersonalApply>>()

// 编辑
const handleUpdate = (row) => {
  popupApply.value?.showUpdate(row)
}

// 删除
const popuDelete = ref<InstanceType<typeof PopupPersonalApplyDelete>>()
const handleDelete = (row) => {
  popuDelete.value?.confirm(row)
}
// 批量删除
const handleBatchDelete = (array) => {
  popuDelete.value?.batchConfirm(array)
}

// 详情
const hangeToDetail = (row) => {
  console.error('hangeToDetail', row)
}

// 搜索
const onSearch = () => {
  tablexUtils.serach(tableCfg)
}

// 重置
const handleReset = () => {
  tableCfg.params.applyUser = ''
  tableCfg.params.applyDate = ''
  tableCfg.params.type = ''
  tableCfg.params.status = ''
  tableCfg.params.key = ''
  // 清空时间选择器
  applyDateType.value = [undefined, undefined]
  tableCfg.params.startApplyDate = ''
  tableCfg.params.endApplyDate = ''
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

<style lang="less" scoped>
.item-input{
  width: 120px;
}
.item-search{
  margin-left: 25px;
}
</style>
