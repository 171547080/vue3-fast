<!--
 * @Description: 框架-首页
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <div class="content-warp" style="width: 100%">
    <div>
      <div class="logo">
        <img :src="getSrc('../../../img/inside/logo.png')">
      </div>

      <section class="banner">
        <div class="left">
          <div class="imgs-box" @click="routerTo('workOrder')">
            <img :src="getSrc('../../../img/inside/order.png')">
          </div>
          <div class="imgs-box" @click="routerTo('message')">
            <img :src="getSrc('../../../img/inside/message.png')">
          </div>
          <div class="imgs-box" @click="routerTo('personalCenter')">
            <img :src="getSrc('../../../img/inside/user.png')">
          </div>
        </div>
        <div class="mid">
          <div class="mid-content">
            <div v-if="true" class="ad-carousel">
              <a-carousel autoplay dots-class="my-dots" :after-change="onChange">
                <div v-for="(item) in adImgs" :key="item.title" class="ad-carousel-box">
                  <img :src="item.img">
                </div>
              </a-carousel>
            </div>
            <div class="ad-carousel-toolbar">
              {{ adImgs[currentActiveIndex].title }}
            </div>
          </div>
        </div>
        <div class="right">
          <div class="imgs-box">
            <img :src="getSrc('../../../img/inside/assets.png')" @click="routerTo('assetsCenter')">
          </div>
          <div class="imgs-box">
            <img :src="getSrc('../../../img/inside/market.png')" @click="routerTo('serverMarket')">
          </div>
        </div>
      </section>
      <server-nav></server-nav>
    </div>
  </div>
</template>
<script name="hone" lang="ts" setup>
import ServerNav from './compo/server-nav.vue'
import ROUTER from '@/router'
import { ref } from 'vue'

const getSrc = (src:string) => {
  return src
}

const adImgs = [{
  img: '/img/inside/1-1.png',
  title: '大美湘江新区-1'
},
{
  img: '/img/inside/1-1.png',
  title: '大美湘江新区-2'
},
{
  img: '/img/inside/1-1.png',
  title: '大美湘江新区-3'
}
]

const currentActiveIndex = ref(0)

const onChange = (current: number) => {
  currentActiveIndex.value = current
}

const routerTo = (routerName: string) => {
  const { href } = ROUTER.resolve({ name: routerName })
  window.open(href, '_blank')
}

// const outerLink = (url:string) => {
//   window.open(url)
// }
</script>
<style lang="less" scoped>
.logo {
  text-align: center;
  padding-top: 0.5vw;
  padding-bottom: 2vw;

  img {
    height: 60px;
  }
}

.banner {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-bottom: 3vw;

  .left,
  .right {
    display: flex;
    padding: 0 10px;
    flex-direction: column;
    justify-content: space-between;
  }

  .mid {
    width: calc(100% - 700px);
    display: flex;
    flex: 1;

    .mid-content {
      width: 100%;
    }
  }

  .ad-carousel {
    width: 100%;
    .ad-carousel-box {
      min-height: 250px;
      max-height: 400px;
      width: 100%;
      background: #FFF;
      text-align: center;
      text-align: -moz-center;
    }

    img {
      width: 100%;
    }
  }
}

.imgs-box:last-of-type {
  padding-bottom: 0px;
}

.imgs-box {
  text-align: center;
  padding-bottom: 20px;

  img {
    width: 15vw;
    min-width: 200px;
  }

  &:hover {
    opacity: 0.9;
    cursor: pointer;
  }
}
.content-warp {
  min-height: 100vh;
  /*
  background: url('../../../img/inside/home-bg.png');
  background-size: cover;
  */
  background: url('../../../img/inside/home-bg.png') no-repeat;
  background-size: 100% 100%;

  padding: 20px 10%;
}

.server-meuns {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;

  .server-item-warp {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 20%;
  }

  .server-item {
    display: flex;
    justify-content: space-between;
    opacity: 1;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-radius: 5px;

    // border: solid slategray 1px;{}
    img {
      min-width: 150px;
      width: 14vw;
    }

    &:hover {
      opacity: 0.9;
      cursor: pointer;
    }
  }
}

.ad-carousel-toolbar {
  background: #0088ff;
  padding: 20px;
  font-size: 18px;
  color: #fff;
}
:deep(.ant-carousel .slick-track){
  overflow: hidden;
}
:deep(.ant-carousel .slick-dots li button)  {
  height: 0.5vw;
  width: 0.5vw;
  min-width: 10px;
  min-height: 10px;
  border-radius: 50%;
}
:deep(.ant-carousel .slick-dots)  {
  position: absolute;
  bottom: -45px;
  right: -90%
}

// :deep(.ant-carousel .slick-dots li.slick-active)  {
//   height: 15px;
//   width: 15px;
// }

.main{
  overflow-x: hidden;
}
</style>
