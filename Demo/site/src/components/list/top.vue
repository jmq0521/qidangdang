<template>
  <div id="top-warp">
      <div id="top">
        <span id="span" @click="$router.push('/')">企铛铛采购首页</span>
        <div class="top-center">
          <span>{{centerList.nickName}}</span>
          <p>{{centerList.typeName}}</p>
        </div>
        <div class="top-bottom">
          <img :src="centerList.headUrl | imgUrl" id="image" :onerror="Img"/>
          <span>{{centerList.typeName}}</span>
          <span @click="out()" id="span2">退出</span>
          <p>负责人：{{centerList.nickName}}</p>
        </div>
        <ul>
          <li @click="car()"><img src="../../image/gouwuche.png"/>购物车</li>
          <li @click="order()">我的订单</li>
          <li @click="Ref()">我的后台</li>
          <li>联系客服</li>
          <li id="weat">微信公众号</li>
          <li id="AP">前往APP</li>
        </ul>
        <!-- <img src="../../image/weima02.png" id="img"/>
        <div id="load">
          <img src="../../image/weima02.png" class="img"/>
          <img src="../../image/weima02.png" class="img"/>
        </div> -->
      </div>
  </div>
</template>
<script>
  export default {
    name: "top",
    data(){
      return{
        centerList:[],
        Img: 'this.src="' + require('../../image/bo.png') + '"',
        code:''
      }
    },
    methods:{
      //个人中心头像
      getCenter(){
        this.$ajax.post("/Person/userCentre",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.centerList=data.data;
          this.code=data.error_code;
          if(data.error_code==40015){
            localStorage.clear();
          }
        })
      },
      //我的后台
      Ref(){
        if(localStorage.phone === "" || localStorage.phone === undefined){
          this.$router.push('/login');
        }else if(this.code==40015){
          localStorage.clear();
          this.$router.push('/login');
        }else{
          this.$router.push('/index');
        }
      },
      //购物车
      car(){
        if(localStorage.phone === "" || localStorage.phone === undefined){
          this.$router.push('/login');
        }else if(this.code==40015){
          this.$router.push('/login');
        }else{
          this.$router.push('/joincar');
        }
      },
      //我的订单
      order(){
        if(localStorage.phone === "" || localStorage.phone === undefined){
          this.$router.push('/login');
        }else if(this.code==40015){
          this.$router.push('/login');
        }else{
          this.$router.push('/pur');
        }
      },
      //注册
      res(){
        if(localStorage.phone == "" || localStorage.phone == undefined){
          this.$router.push('/resgier')
        }else{
          $("#pan").css("display","none")
        }
      },
      //退出
      out(){
        if(localStorage.phone !== "" || localStorage.phone!== undefined){
          localStorage.clear();
          this.$router.push('/login')
        }
      }
    },
    mounted(){
      this.getCenter();
      $(".top-center,.top-bottom").mouseenter(function(){
        $(".top-center span").css("color","#ff0000")
        $(".top-bottom").css("display","block")
      });
      $(".top-center,.top-bottom").mouseleave(function(){
        $(".top-center span").css("color","")
        $(".top-bottom").css("display","none")
      });
      if(localStorage.phone == "" || localStorage.phone == undefined){
        $(".top-center").css("display","none")
      }



      $("#weat").mouseenter(function(){
        $("#img").css("display","block")
      });
       $("#weat").mouseleave(function(){
        $("#img").css("display","none")
      });

      $("#AP").mouseenter(function(){
        $("#load").css("display","block")
      });
      $("#AP").mouseleave(function(){
        $("#load").css("display","none")
      });
    }
  }
</script>

<style scoped>
  #top-warp{width: 100%;background: #eaeaea;}
  #top{width: 1200px;height: 30px;background: #eaeaea;margin: 0 auto;position: relative}
  #span{float: left;height: 30px;line-height: 30px;font-size: 12px;color: #626262;cursor: pointer;}
 
  .top-center{
    float: left;
    width: 180px;
    height: 30px;
    line-height: 30px;
    border-left: 1px solid #d8bd85;
    border-right: 1px solid #d8bd85;
    margin-left: 343px;
    cursor: pointer;
  }
  .top-center span{font-size: 12px;float: left;color: #626262;text-indent: 20px;font-weight: bold;}
  .top-center p{
    font-size: 12px;
    float: left;
    min-width: 50px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color: #ffffff;
    margin-left: 5px;
    margin-top: 6px;
    border-radius: 3px;
    background: #d5c49c; 
  }
  ul{float: right;text-align: center;margin-right: 70px;}
  ul li{
    float: left;
    width: 80px;
    height: 13px;
    line-height: 13px;
    margin-top: 8px;
    border-left: 1px solid #b2b2b2;
    font-size: 12px;
    color: #626262;
    cursor: pointer;
  }
  ul li:first-child{width: 95px; border: 0;margin-left: 6px; margin-top: 6px;}
  ul li:first-child img{margin-right: 5px;}
  ul li:first-child strong{margin-left: 3px;color: #ec652b;font-weight: normal;}
  ul li:hover{color: #ff0000;}
  .top-bottom{
    position: absolute;
    top: 30px;
    left: 342px;
    width: 265px;
    height: 72px;
    background: #ffffff;
    border-left: 1px solid #d8bd85;
    border-right: 1px solid #d8bd85;
    border-bottom: 1px solid #d8bd85;
    border-radius: 2px;
    z-index: 99;
    display: none;
  }
  .top-bottom img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
    margin: 13px 0 0 13px;
  }
  .top-bottom span:nth-of-type(1){
    font-size: 12px;
    float: left;
    color: #ffffff;
    min-width: 50px;
    height: 18px;
    line-height: 18px;
    background: #d5c49c;
    text-align: center;
    border-radius: 3px;
    margin: 20px 0 0 20px;
  }
  .top-bottom p{
    font-size: 12px;
    float: left;
    color: #626262;
    width: 150px;
    margin: 10px 0 0 20px;
  }
  .top-bottom span:nth-of-type(2){
    font-size: 12px;
    float: right;
    color: #626262;
    font-weight: bold;
    width: 70px;
    text-align: center;
    margin: 20px 0 0 30px;
    cursor: pointer;
  }
  .top-bottom #span2:hover{color: #ff0000;}

  #img{
    position: absolute;
    top: 40px;
    right: 130px;
    width: 120px;
    height: 120px;
    display: none;
  }
  #load{
    width: 260px;
    height: 150px;
    position: absolute;
    top: 40px;
    right: -50px;
    display: none;
  }
  #load .img{
    width: 120px;
    height: 120px;

  }
</style>
