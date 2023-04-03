<!--
 * @Description: 框架-首页
 * @Author: laigt
 * @Date: 2023-03-23
-->
<template>
  <div class="home-bg">
    <header class="head">
      <div class="head-left-item">
        <span><calendar-outlined /> 今天是{{ dateDay }}</span>
        <span>{{dateWeeker}}</span>
      </div>

      <div class="head-left-item">
        <span><img :src="getSrc('../../../img/inside/v1/weather.png')"></span>
        <span>天气：</span>
        <span>XXXX新区 晴天</span>
        <span>温度: 2-10 °C</span>
      </div>

      <div class="head-left-item">
        <span><bell-outlined /></span>
        <div class="scroll-messgae"><span class="message">{{ scrollMessageText }}</span></div>
      </div>

      <div class="head-right-item">
        <span><heart-filled /> 张晓丹</span>
        <span><logout-outlined />退出</span>
      </div>
    </header>
    <section class="content-warp" style="width: 100%">
      <div>
        <div class="logo">
          <img :src="getSrc('../../../img/inside/logo.png')" />
        </div>
        <server-nav></server-nav>
        <div class="server-box">
          <div
            v-for="d in servers"
            :key="d.routerName"
            class="server-item"
            @click="routerTo(d.routerName)">
              <div><img :src="getSrc(d.img)" /></div>
              <div>{{  d.title  }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
<script name="hone" lang="ts" setup>
import moment from 'moment'
import ServerNav from './compoV1/server-nav.vue'
import ROUTER from '@/router'

const getSrc = (src: string) => {
  return src
}

const servers = [
  {
    img: '../../../img/inside/v1/market.png',
    title: '服务超市',
    routerName: 'serverMarket'
  },
  {
    img: '../../../img/inside/v1/assets.png',
    title: '资产全景',
    routerName: 'assetsCenter'
  },
  {
    img: '../../../img/inside/v1/message.png',
    title: '消息中心',
    routerName: 'message'
  },
  {
    img: '../../../img/inside/v1/order.png',
    title: '工单列表',
    routerName: 'workOrder'
  },
  {
    img: '../../../img/inside/v1/user.png',
    title: '个人中心',
    routerName: 'personalCenter'
  }
]

const routerTo = (routerName: string) => {
  const { href } = ROUTER.resolve({ name: routerName })
  window.open(href, '_blank')
}

const dateWeeker = ' 星期' + '日一二三四五六'.charAt(new Date().getDay())
const dateDay = moment(new Date()).format('YYYY年MM月DD日')
const scrollMessageText = '这里是一条湘江新区最新的滚动消息，请查收:欢迎用户使用XXXXX智慧中枢系统'
// const outerLink = (url:string) => {
//   window.open(url)
// }
</script>
<style lang="less" scoped>
.head{
  background: #000073;
  color: #edf1f1;
  font-size: 18px;
  padding: 10px;
  .head-left-item,.head-right-item{
    cursor: pointer;
    :hover{
      color: #fff;
    }
  }
  .head-left-item{
    display: inline-block;
    margin-right: 30px;
    span{
      margin: 3px;
    }
    img{
      height: 22px;
      margin-bottom: 3px;
    }
  }
  .head-right-item{
    margin-right: 10px;
    float: right;
    span{
      margin: 0 8px;
    }
  }
}
.logo {
  text-align: center;
  padding-top: 0.5vw;
  padding-bottom: 1vh;

  img {
    height: 60px;
  }
}

.home-bg {
  min-height: 100vh;
  background: rgba(0, 0, 115, 0.9);
  background-size: 100% 100%;
}

.content-warp {
  /*
  background: url('../../../img/inside/home-bg.png');
  background-size: cover;
  */
  background: url("../../../img/inside/v1/home-bg.png") no-repeat;

  background-size: 100% 100%;

  padding: 20px 10%;
}

.server-box{
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 30px 20px 30px;
  .server-item{
    display: flex;
    position: relative;
    top:0;
    justify-content: space-between;
    flex-direction: column;
    opacity: 1;
    justify-content: center;
    align-items: center;
    font-size: 22px;
    color: #fff;
    cursor: pointer;
    position: relative;
    top: 0;
    &:hover{
      top:-10px;
      text-shadow: 2px 8px 8px #0cb0e3;
      /* 设置过渡属性 */
      transition-property: all;
      /*设置过渡时长 */
      transition-duration: 0.2s;
      /* 过渡变化速率 */
      transition-timing-function: linear;
    }

    img{
      margin-bottom: 10px;
    }
  }
}

.scroll-messgae{
  display: inline-block;
  height: 26px;
  position: relative;
  width:500px;
  overflow: hidden;
  .message{
    position: absolute;
    left: 0;
    animation-name: scroll-messgae-animation; // 动画名称
    // animation-direction: alternate; // 动画在奇数次（1、3、5...）正向播放，在偶数次（2、4、6...）反向播放。
    animation-timing-function: linear; // 动画执行方式，linear：匀速；ease：先慢再快后慢；ease-in：由慢速开始；ease-out：由慢速结束；ease-in-out：由慢速开始和结束；
    animation-delay: 0s; // 动画延迟时间
    animation-iteration-count: infinite; //  动画播放次数，infinite：一直播放
    animation-duration: 10s; // 动画完成时间
  }
}
@keyframes scroll-messgae-animation{
  0% {
    left:0
  }
  20% {
    left:0
  }
  80% {
    left:-70%
  }
  100% {
    left:-70%
  }
}
.main {
  overflow-x: hidden;
}
</style>
