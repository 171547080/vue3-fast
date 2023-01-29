<template>
  <div class="policy-img-box">
    <div
      v-for="(item, index) in 4"
      :key="index"
      :style="{ marginLeft: index !== 0 ? '19px' : 0 }"
    >
      <div class="img">
        <img src="../../../../assets/cutimg/carousel1.png" alt="" />
      </div>
      <div class="content">
        <p class="content-title">
          《湖南科技报》：运用干细胞治疗重大 难治性疾病成果
        </p>
        <p class="content-briefly">
          我国人类生殖工程创始人之一、生殖医学与医学遗传学家卢光琇教授，提出“全生命周期健康服务”理念，以干细胞和精准医疗为核心技术，探
        </p>
      </div>
      <div style="text-align: center; padding-top: 20px">
        <a-button>查看详情</a-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.policy-img-box {
  display: flex;
  width: 300px;
  height: 450px;
  .content {
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      margin: 0;
    }
    .content-title {
      color: #333;
      font-size: 16px;
      padding: 28px 19px 13px 11px;
      border-bottom: 2px solid #edeff1;
    }
    .content-briefly {
      color: #666;
      font-size: 14px;
      padding-top: 13px;
    }
  }
}
</style>
