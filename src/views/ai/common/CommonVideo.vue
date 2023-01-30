<template>
    <div class="video-box">
        <!-- <button @click="handelClose">关闭播放</button> -->
        <!-- <button @click="handelPause">停止</button>
        <button @click="handelPlayButton">播放</button> -->
        <div class="video-warp">
            <div class="status-text">
                <span v-show="!$slots.default || palyState.status === 'error'"
                    :style="{ color: palyState.status === 'error' ? 'red' : '#000' }">{{
                            statusMap[palyState.status]
                    }}</span>

                <span v-show="palyState.status !== 'error'">
                    <slot></slot>
                </span>

            </div>
            <a-spin :tip="palyState.spinningMsg" :spinning="palyState.spinning">
                <video v-show="palyState.status === 'loading' || palyState.status === 'play'" id="videoElement" controls
                    class="video-instance" ref="player" muted></video>
            </a-spin>
            <div v-show="palyState.status === 'pending' || palyState.status === 'error'" class="init-mask">
                <play-circle-outlined class="icon" @click="handelPlay" />
                <p v-if="palyState.status === 'error'" class="error-message"> {{ errorMessage }} </p>
            </div>
        </div>
    </div>
</template>
<script name="commonVideo" setup lang="ts">
import { ref, onUnmounted, reactive } from 'vue';
import { useAppStore } from "@store/index";
import { PlayCircleOutlined } from '@ant-design/icons-vue';
import { message } from 'ant-design-vue';
import flvjs from 'flv.js'


const statusMap = {
  pending: '',
  loading: '加载中...',
  play: '播放中',
  pause: '暂停',
  error: '数据异常'
}

const palyState = reactive({
  status: 'pending',
  url: '',
  loadTime: 0,
  spinning: false,
  spinningMsg: '加载中,请稍后...'
})

let taskId
// 设置默认的最大超时时间为 30s
const MAX_TIME_OUT = 30 * 1000
const errorMessage = "视频数据请求超时(" + MAX_TIME_OUT/1000 +"s),请检查视频数据URL地址是否有效"
const clearTask = () => {
  window.clearTimeout(taskId)
}
const startTask = (timeout) => {
  if (taskId) {
    window.clearTimeout(taskId)
    taskId = null
  }

  taskId = setTimeout(() => {
    palyState.status = 'error'
    message.error(errorMessage)
  }, timeout)
}

const player = ref()
// flvjs.Player
let instance: any = {}
const playVideo = (url: string, delayTime?: number) => {
  if (!url) {
    message.error('视频地址不能为空')
    handelPause(null)
    return
  }

  palyState.status = 'loading'

  const wsServerUrl = useAppStore().properties.WS_SERVER_URL

  if (delayTime) {
    palyState.spinning = true
    palyState.spinningMsg = `视频加载预计需要${delayTime / 1000}秒钟,请稍后。。。`
    setTimeout(() => {
      palyState.spinning = false
      startVideo(wsServerUrl, url)
    }, delayTime)
  } else {
    startVideo(wsServerUrl, url)
  }
}
const startVideo = (wsServerUrl, url, timeout?) => {
  const runTime = new Date().getTime()

  // 启动请求超时检查【MAX_TIME_OUT】
  startTask(timeout || MAX_TIME_OUT)

  if (flvjs.isSupported()) {
    let video = player.value
    video.addEventListener("pause", (e) => {
      handelPause(e)
    })
    video.addEventListener("play", (e) => {
      onRecovery(e)
    })


    if (video) {
      instance = flvjs.createPlayer({
        type: 'flv',
        isLive: true,
        url: `ws://${wsServerUrl}/id123?url=` + url
      })

      instance.attachMediaElement(video)

      try {
        instance.load()

        instance.play().then(() => {
          palyState.loadTime = (new Date().getTime() - runTime)
          palyState.status = 'play'
                    
          // 清除请求超时定时器
          clearTask()

          emit('onPlaying')
        }).catch(() => {
          // palyState.status = 'pending'
        })

      } catch (error) {
        console.log(error)
      }
    }
  }
}
const emit = defineEmits<{
    (e: 'onPlay', event: any): void,
    (e: 'onPause', event: any): void,
    (e: 'onRecovery', event: any): void,
    (e: 'onPlaying'): void,

}>()

const handelPlay = (e) => {
  emit('onPlay', e)
}


const handelPause = (e) => {
  emit('onPause', e)
}

const onRecovery = (e) => {
  emit('onRecovery', e)
}

const handelClose = () => {
  if (instance) {
    instance.unload ? instance.unload() : {}
    instance.destroy ? instance.destroy() : {}
    instance = null
  }
}
defineExpose({
  playVideo
})

onUnmounted(() => {
  handelClose()
  clearTask()
})

</script>

<style lang="less" scoped>
@background-color: #fafafa;
@border-color: #f0f0f0;
@max-height: 600px;

.video-box {
    position: relative;
    background: @background-color;
    border: 1px solid @border-color;
    width: 100%;
    padding: 10px;
    margin-right: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    .video-warp {
        position: relative;
        display: flex;

        .status-text {
            position: absolute;
            top: 5px;
            right: 10px;
            z-index: 999;

        }
    }

    .video-instance {
        height: 55vh;
        min-height: 400px;
        min-width: 600px;
    }

    .error-message {
        position: absolute;
        top: 60%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 13px;
        line-height: 13px;
        color: red;
        text-align: center;
        padding-top: 20px;
    }

    .init-mask {
        position: relative;
        background: #f0f0f0;
        height: 55vh;
        min-height: 400px;
        min-width: 600px;
        text-align: center;
        line-height: 60vh;

        .icon {
            font-size: 80px;
            cursor: pointer;
            transition: color 2s;
            color: #000;

            :hover {
                color: #666;
            }
        }
    }
}
</style>
