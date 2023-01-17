<template>
    <a-spin :spinning="spinning" size="large">
        <a-row type="flex" style="width:100%">

            <a-col :md="24" :lg="18" class="content-warp">
                <div class="main">
                    <p class="video-title">
                        {{ info.name }}
                        <span v-if="info.dataSourceDescription"> ({{ info.dataSourceDescription }})</span>
                    </p>
                    <CommonVideo class="video" ref="videoRef" @onPlay="onPlay" @onPause="onPause"
                        @onRecovery="onRecovery">
                        <span v-if="info.level">
                            <a-tag class="jam-status-text"
                                :color="(levelStateMap[info.level] || levelStateMap[0]).color">
                                {{ (levelStateMap[info.level] || levelStateMap[0]).text }}
                            </a-tag>
                        </span>
                    </CommonVideo>
                </div>
            </a-col>
            <a-col :md="24" :lg="6" class="content-warp">
                <StatisticsInfo :id="info.id" :delayTime="2000" ref="statisticsInfoRef"></StatisticsInfo>
            </a-col>
        </a-row>
    </a-spin>

</template>
<script setup lang="ts">
import { defineComponent, ref, onMounted, onBeforeUnmount, reactive } from 'vue';
import StatisticsInfo from './statistics/StatisticsInfo.vue'
import CommonVideo from '../../../common/CommonVideo.vue'
import router from "@/router";
import jamApi from '@/api/jam/jamApi'
import { message } from 'ant-design-vue';
defineComponent({
  StatisticsInfo,
  CommonVideo
})

const levelStateMap = {
  0: { color: 'grey', text: '暂无' },
  1: { color: 'green', text: '流畅' },
  2: { color: 'geekblue', text: '轻度拥堵' },
  3: { color: 'volcano', text: '拥堵' },
  4: { color: 'red', text: '严重拥堵' }
}

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
    jamApi.stopAi(info.id)
  }
})

const loadData = (id: string) => {

  if (id) {
    jamApi.detail(id).then((res) => {
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
  jamApi.startAi(info.id).then(() => {
    spinning.value = false
    statisticsInfoRef.value?.startLoadData()
            
    //直接播放原视频
    if (info.dataSource){
      videoRef.value?.playVideo(info.dataSource)
    } else {
      message.error("数据源(dataSource)不能为空")
    }

    // jamApi.videoUrlGet({}).then((res) => {
    //     videoRef.value?.playVideo(res.data.rtsp,5000)
    // }).catch((error) => {

    // })
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
@max-height: 800px;

.level-tag {
    margin-left: 5px;
}

.content-warp {
    position: relative;
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

        .jam-status-text {
            padding: 4px 10px;
            font-size: 14px;
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
