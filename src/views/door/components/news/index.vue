<template>
  <div class="news-content">
    <titleBar :content="'新闻动态'" />
    <div class="news-box">
      <div class="left-carousel">
        <a-carousel  height="300px">
          <div v-for="item in pics" :key="item.url">
            <img :src="item.url" />
          </div>
        </a-carousel >
      </div>
      <div>
        <div
          class="right-news"
          v-for="(item, index) in content"
          :key="index"
          :style="{
            float: 'left',
            clear: index === 2 ? 'left' : 'none',
            marginRight: index % 2 === 0 ? '50px' : 0,
          }"
        >
          <h3>{{ item.title }}</h3>
          <span class="time">{{ item.time }}</span
          ><i class="el-icon-right"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script name="news" setup lang="ts">
import titleBar from "../toolBar/titleBar.vue";
import {ref} from 'vue'
const getAssetsFile = (url) => {
  return new URL(`../assets/${url}`, import.meta.url).href
}

interface picsItem {
  url?: string | undefined
}

interface picsArray {
  [index: number]: picsItem
}

interface contentItem {
  title?: string | undefined,
  time?: string | undefined
}

interface contentArray {
  [index: number]: contentItem
}

// 图片列表
const pics = ref<picsArray>([])
pics.value = [
  { url: getAssetsFile("../../../../assets/cutimg/carousel1.png") },
  { url: getAssetsFile("../../../../assets/cutimg/carousel2.png") },
  { url: getAssetsFile("../../../../assets/cutimg/carousel3.png") }
]

// 内容列表
const content = ref<contentArray>([])
content.value = [
  {
    title: "智慧长沙加“数前行一一长沙市数学习宪法、遵守宪法、维护宪法、据资源管理工作高质量发展侧记",
    time: "2021-01-06"
  },
  {
    title: "智慧长沙加“数前行一一长沙市数学习宪法、遵守宪法、维护宪法、据资源管理工作高质量发展侧记",
    time: "2021-01-06"
  },
  {
    title: "智慧长沙加“数前行一一长沙市数学习宪法、遵守宪法、维护宪法、据资源管理工作高质量发展侧记",
    time: "2021-01-06"
  },
  {
    title: "智慧长沙加“数前行一一长沙市数学习宪法、遵守宪法、维护宪法、据资源管理工作高质量发展侧记",
    time: "2021-01-06"
  }
]      

</script>

<style lang="scss" scoped>
.news-content {
  background-color: #fff;
  padding-left: 30px;
  .news-box {
    display: flex;
    .left-carousel {
      width: 395px;
      height: auto;
      margin-right: 46px;
    }
    .right-news {
      width: 300px;
      height: 120px;
      padding: 10px;
      h3 {
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      span,
      i {
        color: #7c7979;
        font-size: 14px;
        padding-right: 10px;
      }
    }
  }
}
</style>
