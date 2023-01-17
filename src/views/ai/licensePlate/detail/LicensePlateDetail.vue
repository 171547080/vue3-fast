<template>
    <a-spin :spinning="spinning" size="large">
        <div class="file-name">{{ info.name }}</div>
        <div class="content-warp">
            <div class="video-box">
                <div class="img-warp">
                    <img v-if="info.img" class="img" :onerror="'src=\'' + error404 + '\''" :src="info.img">
                </div>
            </div>

            <div class="video-box">
                <a-spin size="large" :spinning="info.targetImgLoading">
                    <div class="img-warp">
                        <img v-if="info.targetImage" class="img" :onerror="'src=\'' + error404 + '\''"
                            :src="info.targetImage">
                    </div>
                </a-spin>
            </div>
        </div>
        <div class="statistics">
            <div class="title">车牌识别列表</div>
            <gc-tablex :columns="tableCfg.columns" :data="tableCfg.data" :loading="tableCfg.loading"
                :noDataText="tableCfg.noDataText" :errorMessage="tableCfg.errorMessage" :pageNo="tableCfg.pageNo"
                :pageSize="tableCfg.pageSize">// do nothing.
                <template #bodyCell="{ column, record, index }">
                    <template v-if="column.key === 'index'">
                        <span>
                            {{ ((tableCfg.pageNo - 1) * tableCfg.pageSize) + index + 1 }}
                        </span>
                    </template>

                    <template v-if="column.key === 'bbox'">
                        <div>
                            {{ "X : " + (record.bbox.x || '--') }}
                        </div>
                        <div>
                            {{ "Y : " + (record.bbox.y || '--') }}
                        </div>
                    </template>
                </template>
            </gc-tablex>
        </div>
    </a-spin>

</template>
<script setup lang="ts" name="VehicleTypeImages">
import { onMounted, ref, reactive } from 'vue';
import tablexUtils from '@utils/tablex'
import CONFIG from '@/config'
import router from '@/router'
import licensePlateApi from "@api/licensePlate/licensePlateApi";

const spinning = ref<boolean>(false)
const defaultImg = CONFIG.defaultUrl
const error404 = CONFIG.error404
onMounted(() => {
  info.id = router.currentRoute.value.params.id as string
  tableCfg.params.id = info.id
  info.targetImage = defaultImg
  loadData(info.id)

})

const info = reactive({
  id: '',
  name: '--',
  img: '',
  sourceImage: '',
  targetImage: '',
  targetImgLoading: false
})

const loadData = (id: string) => {
  if (id) {
    spinning.value = true
    licensePlateApi.detail(id).then((res) => {
      const data = res.data
      info.img = licensePlateApi.imageUrl(id)
      info.name = data.name

      // 启动ai识别
      licensePlateApi.startAi(info.id).then(() => {
        loadTableStatistics()
        loadTargetImage()
      })

      spinning.value = false
    }).catch(() => {
      spinning.value = false
    })
  }
}

const loadTargetImage = () => {
  info.targetImgLoading = true
  licensePlateApi.checkDecideImage(info.id).then(() => {
    info.targetImage = licensePlateApi.decideImageUrl(info.id)

    info.targetImgLoading = false
  }).catch(() => {
    info.targetImgLoading = false
  })
}

const columns = [
  { title: "序号", dataIndex: "index", key: "index" },
  { title: "识别车牌", dataIndex: "plateNumber", key: "plateNumber" },
  { title: "识别分数", dataIndex: "plateOcrScore", key: "plateOcrScore" },
  { title: "位置", dataIndex: "bbox", key: "bbox" }
]

const tableCfg = reactive(
  tablexUtils.createCfg({
    api: licensePlateApi.picStatistics,
    params: {
      id: ''
    },
    loading: false,
    columns,
    data: [],
    pageNo: 1,
    pageSize: 10 
  })
)

const loadTableStatistics = (() => {
  tableCfg.params.id = info.id
  tablexUtils.serach(tableCfg)
})


</script>
<style lang="less" scoped>
@background-color: #fafafa;
@border-color: #f0f0f0;
@max-height: 600px;

.content-warp {
    margin-bottom: 10px;
    display: flex;
    flex-direction: row;
    position: relative;
}

.file-name {
    font-size: 16px;
    font-weight: bold;
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
    font-size: 15px;
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
