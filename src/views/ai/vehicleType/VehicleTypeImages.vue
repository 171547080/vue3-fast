<!--
 * @Description: 车型识别-详情（图像）
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <a-spin :spinning="spinning" size="large">
    <div class="content-warp">

      <div class="video-box">
        <div class="img-warp">
          <div class="file-name">{{ info.name }}</div>
          <img class="img" :onerror="'src=\'' + error404 + '\''" :src="info.sourceImage">
        </div>
      </div>

      <div class="video-box">
        <a-spin size="large" :spinning="info.targetImgLoading">
          <div class="img-warp">
            <img class="img" :onerror="'src=\'' + error404 + '\''" :src="info.targetImage">
          </div>
        </a-spin>
      </div>
    </div>
    <div class="statistics">
      <a-table class="table" :loading="tableCfg.loading" :columns="tableCfg.columns" :data-source="tableCfg.data"
        :pagination="false" bordered> </a-table>
    </div>
  </a-spin>
</template>
<script setup lang="ts" name="VehicleTypeImages">
import { onMounted, ref, reactive } from 'vue';
import CONFIG from '@/config'
import router from '@/router'
import { CarTypeMap } from './commom/CarType'
import vehicleTypeApi from "@api/vehicleType/vehicleTypeApi";

interface TableItem {
  title: string,
  dataIndex?: string,
  key: string
}
const spinning = ref<boolean>(false)

const defaultImg = CONFIG.defaultUrl
const error404 = CONFIG.error404Url

const info = reactive({
  id: '',
  name: '--',
  description: '',
  sourceImage: '',
  targetImage: defaultImg,
  targetImgLoading: false
})

const tableCfg = reactive({
  loading: false,
  columns: new Array<TableItem>(),
  data: []
})

onMounted(() => {
  info.id = router.currentRoute.value.params.id as string
  info.targetImage = defaultImg
  initTable()
  loadData()
})

const loadData = () => {
  spinning.value = true
  vehicleTypeApi.detail(info.id).then((res) => {
    info.name = res.data.name
    info.description = res.data.description
    info.sourceImage = vehicleTypeApi.imageUrl(info.id)

    // 启动ai识别
    vehicleTypeApi.startAi(info.id).then(() => {
      loadPicStatistics()
      loadTargetImage()
    })
    spinning.value = false
  }).catch(() => {
    spinning.value = false
  })
}

const loadTargetImage = () => {
  info.targetImgLoading = true
  vehicleTypeApi.checkDecideImage(info.id).then(() => {
    info.targetImage = vehicleTypeApi.decideImageUrl(info.id)

    info.targetImgLoading = false
  }).catch(() => {
    info.targetImgLoading = false
  })
}

const tableIndexMap = {}
const initTable = () => {
  const result = Array<TableItem>()
  result.push({ title: '统计类型', dataIndex: 'name', key: 'name' })
  const keys = Object.keys(CarTypeMap)

  const initData = { 'name': '画面识别车型数量' }

  keys.forEach((key) => {
    const column: TableItem = { title: CarTypeMap[key], dataIndex: key, key: key }
    result.push(column)
    initData[CarTypeMap[key]] = "--"

    // 顺便记录key对应的下标
    tableIndexMap[CarTypeMap[key]] = (result.length - 1)
  })

  tableCfg.columns = result

  tableCfg.data = []
  tableCfg.data.push(initData as never)
}

const loadPicStatistics = () => {
  tableCfg.loading = true
  //获取识别信息
  vehicleTypeApi.picStatistics(info.id).then((res) => {
    const data = res.data.statistics
    if (data) {
      tableCfg.data[0] = formatTableData(data) as never
    }

    tableCfg.loading = false
  }).catch(() => {
    tableCfg.loading = false
  })
}

const formatTableData = (data: Array<any>) => {
  const result = {
    'name': '画面识别车型数量'
  }

  data.forEach((item) => {
    result[item.name] = item.count
  })

  return result
}

</script>
<style lang="less" scoped>
@background-color: #fafafa;
@border-color: #f0f0f0;
@max-height: 600px;

.content-warp {
  padding-top: 10px;
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  position: relative;

  .file-name {
    position: absolute;
    top: 15px;
    left: 10px;
    font-size: 18px;
    font-weight: bold;
  }
}

.info-item {
  :deep(.ant-card-head) {
    padding-left: 23px;
  }
}

.content-warp .video-box:last-of-type {
  margin-right: 0;
}

.video-box {
  background: @background-color;
  border: 1px solid @border-color;
  width: 100%;
  padding: 10px;
  margin-right: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;


  .img-warp {
    background: #fff;
    display: flex;
    min-width: 500px;
  }

  .img {
    height: 55vh;
    min-height: 150px;
    max-height: 400px;
  }
}

.title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 5px;

}

.video-info-warp {
  background: @background-color;
  border: 1px solid @border-color;
  margin-bottom: 10px;
}

.video-info-box {
  display: block;
  width: 100%;
  overflow: auto;
  color: #000;
  overflow: auto;
  white-space: nowrap;
  margin-bottom: 0;

  .info-item {
    // background: #fff;
    // border: 1px solid @border-color;
    font-size: 15px;
    padding: 5px 10px 10px 10px;
    margin-bottom: 3px;
    margin-right: 5px;
    display: inline-block;
    width: 300px;

    .info-item-title {
      font-size: 16px;
      font-weight: bold;
      width: 100%;
    }

    .info-item-text {
      // display: inline-block;
      width: 50%;
      min-width: 120px;
    }

  }
}
</style>
