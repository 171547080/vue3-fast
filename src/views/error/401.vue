<!--
 * @Description: 框架-401页面
 * @Author: laigt
 * @Date: 2023-01-31
-->
<template>
  <div class="errPage-container">
    <a-button class="pan-back-btn" @click="back">
      返回
    </a-button>
    <a-row>
      <a-col :span="24">
        <h1 class="text-jumbo text-ginormous">
          401错误!
        </h1>
        <h2>您没有访问权限！</h2>
        <h6>对不起，您没有访问权限，请不要进行非法操作！您可以返回主页面</h6>
        <ul class="list-unstyled">
          <li class="link-type">
            <router-link to="/">
              回首页
            </router-link>
          </li>
        </ul>
      </a-col>
      <a-col :span="24">
        <img src="../../assets/401_images/401.gif" width="313" height="428" alt="Girl has dropped her ice cream.">
      </a-col>
    </a-row>
  </div>
</template>

<script name="401" setup lang="ts">
import router from '@/router'

const back = () => {
  console.error(router)
  if (!router.getRoutes().length) {
    router.push({ path: '/' })
  } else {
    router.back()
  }
}
</script>

<style lang="scss" scoped>
  .errPage-container {
    width: 800px;
    max-width: 100%;
    margin: 100px auto;
    .pan-back-btn {
      background: #008489;
      color: #fff;
      border: none!important;
    }
    .pan-gif {
      margin: 0 auto;
      display: block;
    }
    .pan-img {
      display: block;
      margin: 0 auto;
      width: 100%;
    }
    .text-jumbo {
      font-size: 60px;
      font-weight: 700;
      color: #484848;
    }
    .list-unstyled {
      font-size: 14px;
      li {
        padding-bottom: 5px;
      }
      a {
        color: #008489;
        text-decoration: none;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
</style>
