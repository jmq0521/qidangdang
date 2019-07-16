<template>
  <div id="foot-warp">
    <div id="foot">
      <p>Copyright&copy;企铛铛(北京)科技有限公司2019&copy;&nbsp&nbsp版权所有ICP备案：京ICP备19005167号</p>
      <ul id="foot-ul">
        <li><a href="http://www.7dangdang.com/news/list.php?catid=4">关于我们</a></li>
        <li><a href="http://www.7dangdang.com/lxwm/list.php?catid=22">服务电话</a></li>
        <li><a href="http://www.7dangdang.com/">建议意见</a></li>
        <li><a href="http://www.7dangdang.com/lxwm/list.php?catid=22">联系我们</a></li>
        <li><a href="http://www.7dangdang.com/news/list.php?catid=5">帮助中心</a></li>
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
  #foot-warp{width: 100%;margin-top: 40px;}
  #foot{
    width: 1200px;
    margin: 0 auto;
    background: #161616;
    color: #635548;
  }
  #foot #foot-ul{
    width: 350px;
    float: left;
    margin-top: 10px;
    margin-left: 425px;
  }
  #foot-ul li{
    float: left;
    height: 13px;
    line-height: 13px;
    border-right: 1px solid #999;
    font-size: 12px;
    width: 65px;
    text-align: center;
    color: #434343;
  }
  #foot-ul li:last-child{border: 0;}
  #foot-ul li a{color: #999;}
  #foot p{
    width: 100%;
    float: left;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
</style>
