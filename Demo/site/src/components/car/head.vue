<template>
  <div id="hea-warp">
    <div id="hea">
      <div id="logo">
        <img src="../../image/logo.png" @click="$router.push('/')"/>
        <p>购物车</p>
      </div>
      <div class="hea-center">
        <ul id="hea-ul">
          <li>
            <span>1</span>
            <p></p>
            <a>1.我的购物车</a>
          </li>
          <li>
            <span>2</span>
            <p></p>
            <a>2.填写核对信息</a>
          </li>
          <li>
            <span>3</span>
            <p></p>
            <a>3.成功提交订单</a>
          </li>
        </ul>
      </div>
    </div>
  </div>


</template>

<script>
    export default {
      name: "hea",
      mounted(){
       
      }
    }
</script>

<style scoped>
  #hea-warp{width: 100%;}
  #hea{
    width: 1200px;
    height: 120px;
    margin: 0 auto;
    z-index: 9px;
  }
  #logo{
    width: 225px;
    height: 100%;
    float: left;
  }
  #logo img{
    width: 115px;
    height: 40px;
    margin-top: 10px;
    float: left;
  }
  #logo p{
    line-height: 75px;
    font-size: 24px;
    float: left;
    margin-left: 15px;
    color: #313131;
    margin-top: -3px;
  }
  .hea-center{
    float: right;
    width: 480px;
    height: 100%;
    z-index: 9px;
  }
  .hea-center #hea-ul{width: 100%;height: 100%;}
  #hea-ul li{
    width: 160px;
    height: 80px;
    margin-top: 20px;
    float: left;
    color: #cccccc;
    cursor: pointer;
  }
  #hea-ul li p{
    width: 160px;
    height: 8px;
    margin-top: 20px;
  }
  #hea-ul li:nth-of-type(1) p{border-radius: 15px;background: #ff5b00;}
  #hea-ul li:nth-of-type(2) p{border-radius: 15px;background: #cccccc;}
  #hea-ul li:nth-of-type(3) p{border-radius: 15px;background: #cccccc;}
  #hea-ul li span{
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    background: #cccccc;
    color: #ffffff;
    text-align: center;
    display: inline-block;
    margin-left: 60px;
    float: left;
    margin-top: 15px;
   
  }
  #hea-ul li a{
    font-size: 16px;
    font-weight: bold;
    text-align: center;
    margin-top: 10px;
    display: block;
    color: #cccccc;
  }
  #hea-ul li:nth-child(1) a{color: #ff5b00;}
  #hea-ul li:nth-child(1) span{background: #ff5b00;}

</style>
