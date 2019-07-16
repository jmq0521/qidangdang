<template>
    <div id="bottom-warp">
      <div id="bottom">
        <ul id="bottom-ul">
          <li>值得信赖</li>
          <li>超值购物</li>
          <li>厂家直销</li>
          <li>正品行货</li>
          <li>价格优惠</li>
          <li style="border-right: 0">极速配送</li>
        </ul>
        <div id="bottom-bottom">
          <div id="bottom-logo">
            <img src="../../image/logo.png"/>
            <img src="../../image/app.png"/>
            <img src="../../image/app.png"/>
            <p>扫码下载APP</p>
          </div>
          <div id="bottom-center">
            <span>服务电话：400-630-5899</span>
            <span>工作时间：09：00-19:00</span>
            <ul id="center-ul">
              <li><a href="http://www.7dangdang.com/news/list.php?catid=5">关于我们</a></li>
              <li><a href="http://www.7dangdang.com/">建议意见</a></li>
              <li><a href="http://www.7dangdang.com/lxwm/list.php?catid=22">联系我们</a></li>
              <!-- <li>免责声明</li>
              <li>隐私政策</li>
              <li>营业执照</li> -->
            </ul>
            <div id="center-img">
              <img src="../../image/bottom04.png"/>
              <img src="../../image/bottom05.png"/>
              <img src="../../image/bottom06.png"/>
              <img src="../../image/bottom07.png"/>
            </div>
          </div>
          <div id="bottom-right">
            <img src="../../image/bottom01.png"/>
            <img src="../../image/bottom02.png"/>
            <img src="../../image/bottom03.png"/>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "bottom"
    }
</script>

<style scoped>
  #bottom-warp{width: 100%;background: #fbfcff;float: left;}
  #bottom{width: 1200px;height: 315px;margin: 0 auto;}
  #bottom-ul{width: 100%;height: 75px;}
  #bottom-ul li{
    width: 199px;
    height: 20px;
    line-height: 20px;
    color: #959595;
    float: left;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    border-right: 1px solid #959595;
    margin-top: 30px;
  }
  #bottom-bottom{height: 240px;}
  #bottom-logo{width: 205px;height: 240px;float: left}
  #bottom-logo img:nth-of-type(1){margin-top: 15px;display: block;}
  #bottom-logo img:nth-of-type(2){width: 85px;float: left;height:85px;margin-top: 20px;}
  #bottom-logo img:nth-of-type(3){width: 85px;float: left;height:85px;margin-top: 20px;margin-left: 35px}
  #bottom-logo p{
    height: 25px;
    line-height: 25px;
    width: 99.8%;
    color: #f5931e;
    float: left;
    font-size: 14px;
    color: #f5931e;
    text-align: center;
    border: 1px solid #f5931e;
    margin-top: 10px;
  }
  #bottom-center{width: 545px;height: 240px;margin-left: 100px;float: left}
  #bottom-center span{font-size: 14px;font-weight: bold;color: #959595;margin-top: 70px;float: left;margin-left: 20px;}
  #bottom-center span:nth-of-type(2){margin-left: 50px;}
  #bottom-center #center-ul{width: 100%;margin-top: 20px;float: left;}
  #center-ul li{
    width: 90px;
    text-align: center;
    font-size: 14px;
    font-weight: bold;
    color: #959595;
    float: left;
    border-right: 1px solid #959595;
    cursor: pointer;
  }
  #center-ul li:nth-child(6){border-right: 0}
  #center-ul li a{color: #959595;}
  #bottom-center #center-img{
    width: 100%;
    height: 40px;
    margin-top: 45px;
    float: left;
  }
  #center-img img{
    margin-left: 20px;
    width: 100px;
    height: 100%;
    float: left;
    cursor: pointer;
  }
  #center-img img:nth-child(1){width: 40px;}
  #bottom-right{width: 95px;height: 240px;float: right}
  #bottom-right img{width: 100%;margin-top: 15px;cursor: pointer;}
  #bottom-right img:nth-child(1){margin-top: 30px;}
</style>
