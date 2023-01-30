<template>
  <div class="news-item">
    <div class="notice">
      <div class="notice__inner">
        <i class="el-icon-message-solid" style="line-height: 30px; padding-left: 10px;"></i>
        <div class="notice__box">
          <div class="notice__item">
            恭喜会员用户&nbsp;<span style="color: red">橙某人</span>&nbsp;中奖
          </div>
          <div class="notice__item">
            恭喜会员用户&nbsp;<span style="color: red">小密圈圈</span>&nbsp;中奖
          </div>
          <div class="notice__item">
            恭喜会员用户&nbsp;<span style="color: red">Cooke_</span>&nbsp;中奖
          </div>
          <div class="notice__item">
            恭喜会员用户&nbsp;<span style="color: red">爱音乐网站</span
            >&nbsp;中奖
          </div>
          <div class="notice__item">
            恭喜会员用户&nbsp;<span style="color: red">青年之声</span>&nbsp;中奖
          </div>
          <div class="notice__item">
            恭喜会员用户&nbsp;<span style="color: red">仙人</span>&nbsp;中奖
          </div>
          <div class="notice__item">
            恭喜会员用户&nbsp;<span style="color: red">三十万人编号</span
            >&nbsp;中奖
          </div>
          <div class="notice__item">
            恭喜会员用户&nbsp;<span style="color: red">Maboroshii</span
            >&nbsp;中奖
          </div>
          <div class="notice__item">
            恭喜会员用户&nbsp;<span style="color: red">陈亚明</span>&nbsp;中奖
          </div>
          <div class="notice__item">
            恭喜会员用户&nbsp;<span style="color: red">老娘终于发达了</span
            >&nbsp;中奖
          </div>
        </div>
        <!-- <div class="notice__box">
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">橙某人</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">小密圈圈</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">Cooke_</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">爱音乐网站</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">青年之声</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">仙人</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">三十万人编号</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">Maboroshii</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">陈亚明</span>&nbsp;中奖</div>
            <div class="notice__item">恭喜会员用户&nbsp;<span style="color: red;">老娘终于发达了</span>&nbsp;中奖</div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script name="news" setup lang="ts">
// do something
</script>

<style scoped>
.notice {
  width: auto;
  height: 34px;
  border-radius: 8px;
  border: 1px solid #eee;
  margin: 10px auto;
  background-color: #fbe1ca;
}
.notice__inner {
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-size: 14px;
  color: #666;
}
.notice__box {
  padding-left: 15px;
  animation: roll 10s linear infinite;
}
.notice__item {
  width: 100%;
  height: 30px;
  line-height: 30px;
  padding: 0 12px;
  white-space: nowrap;
}
@keyframes roll {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-300px);
  }
}
</style>
