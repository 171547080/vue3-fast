
<template>
  <!-- <a-spin class="tablex-warp" :spinning="loading"> -->
  <a-table :columns="columns" :data-source="data" class="tablex ant-table-striped" :loading="loading"
    :row-class-name="(_record, index) => (index % 2 === 1 ? 'table-striped' : null)" :pagination="false"
    :bordered="props.bordered">
    <template #headerCell="{ 
      /* eslint-disable vue/no-unused-vars */
      column 
    }">
    </template>
    <template #bodyCell="{ column, record, index }">
      <slot name="bodyCell" :column="column" :record="record" :index="index"></slot>
    </template>
    <template #emptyText>
      <div class="no-data-tips" v-if="loading">
        加载中...
      </div>

      <div class="no-data-tips" v-if="!loading && !props.errorMessage && (!props.data || !props.data.length)">
        {{ props.noDataText }}
      </div>

      <div class="error-tips" v-if="!loading && props.errorMessage">
        {{ props.errorMessage }}
      </div>
    </template>
  </a-table>
  <!-- </a-spin> -->
</template>

<script lang="ts" setup>
const props = defineProps({
  columns: {
    type: Array,
    default: () => { return [] }
  },
  data: {
    type: Array,
    default: () => { return [] }
  },
  loading: {
    type: Boolean,
    default: false
  },
  noDataText: {
    type: String,
    default: '暂无数据'
  },
  errorMessage: {
    type: String,
    default: ''
  },
  bordered: {
    type: Boolean,
    default: true
  }
})

</script>

<style lang="less" scoped>
.ant-table-striped :deep(.table-striped) td {
  background-color: #fafafa;
}

.ant-table-striped :deep(.ant-table-cell) {
  a {
    margin-right: 5px;
  }
}

:deep(.no-data-tips) {
  text-align: center;
  padding: 10px;
}

:deep(.error-tips) {
  padding: 10px;
  color: red;
  text-align: center;
}
</style>
