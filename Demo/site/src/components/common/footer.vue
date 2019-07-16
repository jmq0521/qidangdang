<template>
  <div id="foot-warp">
    <div id="foot">
      <p>Copyright&copy;企铛铛(北京)科技有限公司2019&copy;&nbsp&nbsp版权所有</p>
      <p>ICP备案：京ICP备19005167号</p>
    </div>
  </div>

</template>

<script>
    export default {
        name: "foot"
    }
</script>

<style scoped>
  #foot-warp{
    width: 100%;
    background: #414141;
    float: left;
  }
  #foot{
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    background: #414141;
    overflow: hidden;
    color: #eee;
  }
  p:first-child{
    font-size: 12px;
    margin-top: 23px;
    text-align: center;
  }
  p:nth-child(2){
    font-size: 12px;
    margin-top: 12px;
    text-align: center;
  }

</style>
