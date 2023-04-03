<!--
 * @Description: 工单列表-全部工单
 * @Author: laigt
 * @Date: 2023-02-16
-->
<template>
  <gc-toolbar>
    <template #top>
    <a-button
        v-hasPermi="['work:order:list']"
        type="primary"
        @click="handleAdd"
        >
        <template #icon><plus-circle-outlined /></template>
        创建工单
        </a-button>
    </template>
    <template #left>
      <!-- <gc-buttonx
        type-name="add"
        @click="handleAdd"
        >
        </a-button> -->
      <gc-buttonx
        v-hasPermi="['work:order:update']"
        type-name="update"
        :disabled="tableRef?.selectedRowKeys && (tableRef?.selectedRowKeys.length >= 2 || tableRef?.selectedRowKeys.length === 0)"
        @click="handleUpdate(tableRef?.getSelectedRowData()[0])"
        >
        </gc-buttonx>

        <gc-buttonx
        v-hasPermi="['work:order:del']"
        type-name="del"
        :disabled="!(tableRef?.selectedRowKeys && tableRef?.selectedRowKeys.length >= 1)"
        @click="handleBatchDelete(tableRef?.getSelectedRowData())"
        >
        </gc-buttonx>

        <a-popconfirm placement="right" ok-text="确认" cancel-text="取消" @confirm="handleTableExport('工单列表-全部工单',tableCfg,tableRef)">
          <template #title>
            <div>确认要当前导出表格内容？</div>
          </template>
          <gc-buttonx type-name="export">
          </gc-buttonx>
        </a-popconfirm>
    </template>
    <template #right>
      <span class="item-label">职位</span>
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
      <span class="item-label">发起人</span>
      <a-input
        v-model:value="tableCfg.params.username"
        class="item-input"
        placeholder="发起人"
        style="width: 120px"
      />
      <span class="item-label">发起部门</span>
      <a-select
        v-model:value="tableCfg.params.sendDep"
        class="item-input"
        placeholder="发起部门"
        :allowClear="true"
        style="width: 120px"
      >
        <a-select-option v-for="(d, key) in depMap" :key="key" :value="key">{{
          d
        }}</a-select-option>
      </a-select>
      <span class="item-label">状态</span>
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
        <span v-hasPermi="['work:order:update']">
          <a @click="handleUpdate(record)">编辑</a>
        </span>
        <span v-hasPermi="['work:order:del']">
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

  <popup-work-order-apply ref="popupApply" @onSubmit="onRefresh" />
  <popup-work-order-delete ref="popuDelete" @onSubmit="onRefresh" />
</template>
<script setup lang="ts" name="WorkOrderAllPage">
import { ref, reactive, onMounted } from 'vue'
import { dateFormat } from '@utils/moment'
import tablexUtils, { TablexCfgType } from '@utils/tablex'
import orderApi from '@/api/workOrder/orderApi'

import { PlusCircleOutlined } from '@ant-design/icons-vue'

import PopupWorkOrderApply from './popup/PopupWorkOrderApply.vue'
import PopupWorkOrderDelete from './popup/PopupWorkOrderDelete.vue'
import GcTablex from '@/components/gc/gc-tablex.vue'

const statusMap = {
  1: '未处理',
  2: '已处理'
}

const positionMap = {
  1: '普通员工',
  2: '部门领导'
}

const depMap = {
  depA: '部门A',
  depB: '部门B',
  depC: '部门C',
  depD: '部门D',
  depE: '部门E'
}

const tableRef = ref<InstanceType<typeof GcTablex>>()

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: orderApi.page,
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
const popupApply = ref<InstanceType<typeof PopupWorkOrderApply>>()
const handleAdd = () => {
  popupApply.value?.showadd()
}

// 编辑
const handleUpdate = (row) => {
  popupApply.value?.showUpdate(row)
}

// 删除
const popuDelete = ref<InstanceType<typeof PopupWorkOrderDelete>>()
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

/**
 * 前端导出列表数据
 * @param exportFileName 导出文件名称
 * @param cfg 表格配置对象（例：tableCfg）
 * @param tableInstance 表格对象实例（例：tabaleRef）
 */
const handleTableExport = (exportFileName = '导出文件', cfg:TablexCfgType, tableInstance?:InstanceType<typeof GcTablex>) => {
  const arrayData = tableInstance?.getTablesData().value as Array<any>
  handleExport(exportFileName, cfg, arrayData)
}

/**
 * 导出excel实现方法
 * @param exportFileName 导出文件名称
 * @param cfg 表格配置对象（例：tableCfg）
 * @param exportDataArray 导出数据
 */
const handleExport = (exportFileName = '导出文件', cfg:TablexCfgType, exportDataArray?:Array<any>) => {
  exportFileName += '.xls'
  // table显示的数据
  const tableDataArray = exportDataArray || []

  // 列标题，逗号隔开，每一个逗号就是隔开一个单元格
  let str = ''
  const keys:string[] = []

  // 封装需要导出的key值与标题 （排除action）
  cfg.columns.forEach((item) => {
    if (item.key !== 'action') {
      str += item.title + ','
      keys.push(item.key)
    }
  })
  if (str.length > 0 && str.endsWith(',')) {
    str = str.substring(0, str.length - 1) + '\n'
  }

  // 增加\t为了不让表格显示科学计数法或者其他格式
  // 外循环表格数据
  tableDataArray.forEach((tableDataItem, i) => {
    // 内循环key
    keys.forEach((key) => {
      // 序号
      if (key === 'index') {
        str += (i + 1) + '\t,'
        // 状态
      } else if (key === 'status') {
        str += (statusMap[tableDataItem[key]] || '') + '\t,'
        // 信用风险等级
      } else if (key === 'position') {
        str += positionMap[tableDataItem[key]] || '' + '\t,'
      } else {
        str += tableDataItem[key] + '\t,'
      }
    })
    // 表格数据换行
    str += '\n'
  })
  // encodeURIComponent解决中文乱码
  const uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str)
  // 通过创建a标签实现
  const link = document.createElement('a')
  link.href = uri
  // 对下载的文件命名
  link.download = exportFileName
  link.click()
}

// 搜索
const onSearch = () => {
  tablexUtils.serach(tableCfg).then(() => {
    tableRef.value?.setSelectedRowKeys([0, 1, 2, 3])
  })
}

// 重置
const handleReset = () => {
  tableCfg.params.status = null
  tableCfg.params.position = null
  tableCfg.params.key = ''
  tableCfg.params.sendDep = null
  tableCfg.params.username = ''
  tablexUtils.serach(tableCfg)
}

// 刷新
const onRefresh = () => {
  tablexUtils.refresh(tableCfg)
}
onMounted(() => {
  // 获取当前vue实例对象
  // console.error(getCurrentInstance())
  onSearch()
})
</script>
