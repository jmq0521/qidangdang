<template>
    <div id="foot-warp">
      <div id="foot">
        <ul id="foot-ul">
          <li><i class="iconfont">&#xe60e;</i><span>值得信赖</span></li>
          <li><i class="iconfont">&#xe7ba;</i><span>超值购物</span></li>
          <li><i class="iconfont">&#xe634;</i><span>厂家直销</span></li>
          <li><i class="iconfont">&#xe698;</i><span>正品行货</span></li>
          <li><i class="iconfont">&#xe642;</i><span>价格优惠</span></li>
          <li><i class="iconfont">&#xe624;</i><span>极速配送</span></li>
        </ul>
      </div>
    </div>
</template>

<script>
  export default {
    name: "foot"
  }
</script>

<style scoped>
  #foot-warp{width: 100%;background: #414141;float: left;border-bottom: 1px solid #4d4d4d;}
  #foot{width: 1100px;margin: 0 auto;background: #414141;}
  #foot-ul{width: 100%;height: 110px;}
  #foot-ul li{
    float: left;
    margin-left: 75px;
    font-weight: bold;
    height: 100%;
  }
  #foot-ul li i{
    font-size: 35px;
    color: #999;
    margin-right: 10px;
    margin-top: 35px;
    float: left;
  }
  #foot-ul li span{
    font-size: 15px;
    color: #eee;
    float: left;
    margin-top: 50px;
  }
</style>
