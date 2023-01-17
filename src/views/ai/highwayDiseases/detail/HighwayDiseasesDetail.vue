<template>
    <a-spin :spinning="spinning" size="large">
        <div class="content-warp">
            <div class="main">
                <p class="video-title">{{ info.name || '--' }}</p>
                <CommonVideo ref="videoRef" @onPlay="onPlay" @onPlaying="onRecovery" @onPause="onPause"  @onRecovery="onRecovery">
                </CommonVideo>
            </div>
        </div>
        <div class="statistics">
            <StatisticsInfo :id="info.id" :delayTime="2000" ref="statisticsInfoRef"></StatisticsInfo>
        </div>
    </a-spin>

</template>
<script setup lang="ts" name="VehicleTypeImages">
import { onMounted, ref, reactive, onBeforeUnmount  } from 'vue';
import router from '@/router'
import highwayApi from "@api/highway/highwayApi";
import CommonVideo from "../../common/CommonVideo.vue";
import StatisticsInfo from './statistics/StatisticsInfo.vue'

const statisticsInfoRef = ref<InstanceType<typeof StatisticsInfo>>()

const videoRef = ref<InstanceType<typeof CommonVideo>>()

const spinning = ref<boolean>(false)

const info = reactive({
  id: '',
  name: "",
  dataSource: "",
  dataSourceDescription: "",
  level: ""
})
onMounted(() => {
  info.id = router.currentRoute.value.params.id as string
  loadData(info.id)
})

onBeforeUnmount(() => {
  if (info.id){
    highwayApi.stopAi(info.id)
  }
})

const loadData = (id: string) => {

  if (id) {
    highwayApi.detail(id).then((res) => {
      info.name = res.data.name
      info.dataSource = res.data.dataSource
      info.dataSourceDescription = res.data.dataSourceDescription
    }).catch(() => {
      // do nothing.
    })
  }
}
const onPlay = () => {

  spinning.value = true
  highwayApi.startAi(info.id).then(() => {
    spinning.value = false
    highwayApi.videoUrlGet(info.id).then((res) => {
      videoRef.value?.playVideo(res.data.rtsp, 10 * 1000)
    }).catch(() => {
      // do nothing.
    })
  })
}

const onPause = () => {
  statisticsInfoRef.value?.stopLoadData()
}
const onRecovery = () => {
  statisticsInfoRef.value?.startLoadData()
}


</script>
<style lang="less" scoped>
@background-color: #fafafa;
@border-color: #f0f0f0;
@max-height: 600px;

.statistics {
    margin-right: 13px;

    .title {
        font-size: 15px;
        font-weight: bold;
        margin-bottom: 5px;
    }
}

.content-warp {
    position: relative;

    .file-name {
        z-index: 999;
        position: absolute;
        top: 10px;
        left: 15px;
        font-size: 18px;
        font-weight: bold;
    }
}

.content-warp {
    padding: 10px 0;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    max-height: @max-height;

    .main {
        display: flex;
        flex: 1;

        .video-title {
            position: absolute;
            z-index: 999;
            top: 20px;
            left: 15px;
            font-size: 18px;
            font-weight: bold;
        }
    }

    .right {
        display: flex;
        width: 400px;
        background: @background-color;
        border: 1px solid @border-color;
        padding: 10px 10px;
        position: relative;

        .title {
            position: absolute;
            top: -35px;
            left: 0px;
            display: block;
            z-index: 999;
            font-size: 18px;
            font-weight: bold;
        }
    }
}

.video-info-box {
    display: block;
    width: 100%;
    overflow: auto;
    color: #000;

    .info-item {
        background: #fff;
        border: 1px solid @border-color;
        font-size: 15px;
        padding: 5px 10px 10px 10px;
        margin-bottom: 10px;
        margin-right: 5px;
        display: flex;
        flex-wrap: wrap;

        .info-item-title {
            font-size: 16px;
            font-weight: bold;
            margin-bottom: 5px;
            width: 100%;
        }

        .info-item-text {
            width: 50%;
            display: inline-block;
            min-width: 120px;
        }
    }
}
</style>
