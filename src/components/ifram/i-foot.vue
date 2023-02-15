<template>
    <div class="foot">
        <p>联系地址：{{ address }}</p>
        <p>主办单位：{{ sponsor }}</p>
        <p>{{  right  }}</p>
    </div>
</template>
<script lang="ts" setup>
const address = 'XXXXXX管委会办公室'
const sponsor = 'XXXXXXX管委会'
const right = 'XX网安备4301XXXX湘ICP备060XXXX号网站标识码：43XXXXX8站点地图|联系我们'
</script>

<style lang="less">
.foot{
    text-align: center;
    padding: 25px 30px 10px 30px;
    color: #fff;
    background: #054cb7;
    p{
        margin: 6px;
    }
}
</style>
