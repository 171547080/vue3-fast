<!--
 * @Description: 车型识别-详情（视频流）
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <a-spin :spinning="spinning" size="large">
    <div class="content-warp">
      <div class="main">
        <p class="video-title">{{ info.name || '--' }}</p>
        <CommonVideo ref="videoRef" @onPlay="handelPlay" @onPause="handelPause" @onRecovery="handelRecovery">
        </CommonVideo>
      </div>
    </div>
    <StatisticsInfo ref="statisticsRef"></StatisticsInfo>
  </a-spin>
  <PopupVechicleTypeVideoPlay ref="popupPlay" @onSubmit="refresh" />
</template>
<script name="VehicleTypeVideo" setup lang="ts">
import { defineComponent, ref, reactive, onMounted, onBeforeUnmount } from "vue";
import router from "@/router";
import vehicleTypeApi from "@api/vehicleType/vehicleTypeApi";
import StatisticsInfo from "./video/StatisticsInfo.vue";
import CommonVideo from "../common/CommonVideo.vue";
import PopupVechicleTypeVideoPlay from "./popup/PopupVechicleTypeVideoPlay.vue";
import { message } from "ant-design-vue";

defineComponent({
  StatisticsInfo,
  CommonVideo
});

const info = reactive({
  name: '',
  id: '',
  description: '',
  type: '',
  sourcePath: '',
  rtspUrl: '',
  delayTime: 2000
})

const videoRef = ref<InstanceType<typeof CommonVideo>>();
const statisticsRef = ref<InstanceType<typeof StatisticsInfo>>();

const spinning = ref<boolean>(false);


const loadData = (id: string) => {
  spinning.value = true
  vehicleTypeApi.detail(id).then((res) => {
    const infoData = res.data
    info.name = infoData.name
    info.id = infoData.id
    info.description = infoData.description
    info.type = infoData.type
    info.sourcePath = infoData.sourcePath
    spinning.value = false
  }).catch(() => {
    spinning.value = false
  })
};

onMounted(() => {
  loadData(router.currentRoute.value.params.id as string)
})

onBeforeUnmount(() => {
  if (info.id) {
    vehicleTypeApi.stopAi(info.id)
  }
})

const play = () => {
  vehicleTypeApi.videoUrlGet({}).then((res) => {
    if (res.data.rtsp) {
      setTimeout(() => {
        videoRef.value?.playVideo(res.data.rtsp);
        info.rtspUrl = res.data.rtsp
        spinning.value = false;
      }, 1000);
    } else {
      spinning.value = false;
    }
  })
  statisticsRef.value?.startLoadData(info.id, info.delayTime)
  spinning.value = true;
}

const popupPlay = ref();

const handelPlay = () => {
  vehicleTypeApi.startAi(info.id).then(() => {
    play()
  })
};

const handelPause = () => {
  message.success("视频已暂停")
  statisticsRef.value?.stopLoadData()
}

const handelRecovery = () => {
  message.success("视频继续")
  statisticsRef.value?.startLoadData(info.id, info.delayTime)
}


const refresh = (data) => {
  loadData(data.id);
};
</script>
<style lang="less" scoped>
@max-height: 600px;

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
}
</style>
