<template>
    <div id="min-warp">
      <div id="min">
        <ul id="min-ul">
          <li><a href="http://www.7dangdang.com/news/list.php?catid=4">关于我们</a></li>
          <li><a href="http://www.7dangdang.com/lxwm/list.php?catid=22">服务电话</a></li>
          <li><a href="http://www.7dangdang.com/">建议意见</a></li>
          <li><a href="http://www.7dangdang.com/lxwm/list.php?catid=22">联系我们</a></li>
          <li><a href="http://www.7dangdang.com/news/list.php?catid=5">帮助中心</a></li>
        </ul>
        <p>Copyright©企铛铛(北京)科技有限公司2019</p>
        <p>京ICP备19005167号</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "min"
    }
</script>

<style scoped>
  #min-warp{width: 100%;background: #414141;float: left;border-bottom: 1px solid #4d4d4d;}
  #min{width: 1100px;margin: 0 auto;background: #414141;height: 85px;overflow: hidden;}
  #min-ul{width: 420px;margin: 13px auto;height: 14px;}
  #min-ul li a{
    width: 78px;
    height: 13px;
    line-height: 13px;
    text-align: center;
    float: left;
    font-size: 12px;
    color: #eee;
    font-weight: bold;
    border-right: 1px solid #eee;
  }
  #min-ul li:last-of-type a{border-right: 0;}

  #min p:nth-of-type(1){margin-top: 0;}
  #min p{
    width: 100%;
    font-size: 12px;
    color: #eee;
    text-align: center;
    margin-top: 5px;
  }
</style>
