<template>
  <div id="top-warp">
    <div id="top">                                                                                                                                 
      <ul>
        <li @click="order()"><a>我的订单</a></li>
        <li @click="Ref()"><a>我的后台</a></li>
        <li id="ser"><a>联系客服</a></li>
        <li id="weat"><a>微信公众号</a></li>
        <li id="AP"><a>前往APP</a></li>
      </ul>
      <span id="an" @click="res()">免费注册</span>
      <span id="span" @click="ref()">您好，请登录</span>
      <div class="top-center">
        <p>欢迎回来,{{centerList.nickName}}</p>
      </div>
      <div class="top-bottom">
        <img :src="centerList.headUrl | imgUrl" id="image" :onerror="Img"/>
        <p>{{centerList.nickName}},您好</p>
        <span @click="out()" id="span2">退出</span>
        <span>{{centerList.typeName}}</span>
        <mark :style="{background:centerList.status===1?'#467cf7':centerList.status==3?'#ccc':centerList.status==0?'#f79146':'#f74646'}">{{centerList.statusName}}</mark>
      </div>

      <div id="cust">
        <p><mark>服务电话：</mark>400-630-5899</p>
        <p><mark>工作时间：</mark>09：00-18:00</p>
      </div>
      
      
      <div id="gzh">
        <img src="../../image/gzh.jpg" id="img"/>
      </div>  

      <div id="load">
        <img src="../../image/app.png" class="img"/>
      </div>

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
          localStorage.setItem('is_audit',data.data.status);
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
      //登录
      ref(){
        if(localStorage.phone === "" || localStorage.phone === undefined){
          this.$router.push('/login')
        }else if(this.code==40015){
          this.$router.push('/login');
        }
      },
      //注册
      res(){
        if(localStorage.phone == "" || localStorage.phone == undefined){
          this.$router.push('/resgier')
        }else{
          $("#an").css("display","none")
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
        $(".top-center").css("background","#fff");
        $(".top-center").css("border-left","1px solid #d8d8d8");
        $(".top-center").css("border-right","1px solid #d8d8d8");
        $(".top-bottom").css("display","block")
      });
      $(".top-center,.top-bottom").mouseleave(function(){
        $(".top-center").css("background","")
        $(".top-bottom").css("display","none")
        $(".top-center").css("border-left","none");
        $(".top-center").css("border-right","none");
      });



      if(localStorage.phone == "" || localStorage.phone == undefined){
        $("#span").css("display","inline-block");
        $("#an").css("display","inline-block")
        $(".top-center").css("display","none")
      }else{
        $("#span").css("display","none");
        $("#an").css("display","none");
        $(".top-center").css("display","inline-block");
      
      };

      //公众号
      $("#weat").mouseenter(function(){
        $("#weat").css("background","#fff")
        $("#weat a").css("border-left","none");
        $("#AP a").css("border-left","none");
        $("#weat").css("border-left","1px solid #d8d8d8");
        $("#AP").css("border-left","1px solid #d8d8d8");
        $("#gzh").css("display","block");
      });
       $("#weat").mouseleave(function(){
        $("#weat").css("background","")
        $("#gzh").css("display","none")
        $("#weat a").css("border-left","1px solid #d8d8d8");
        $("#AP a").css("border-left","1px solid #d8d8d8");
        $("#weat").css("border-left","none");
        $("#AP").css("border-left","none");
      });

      //APP下载
      $("#AP").mouseenter(function(){
        $("#AP a").css("border-left","none");
        $("#AP").css("border-left","1px solid #d8d8d8");
        $("#AP").css("border-right","1px solid #d8d8d8");
        $("#AP").css("background","#fff")
        $("#load").css("display","block")
      });
      $("#AP").mouseleave(function(){
        $("#AP").css("background","")
        $("#load").css("display","none")
        $("#AP a").css("border-left","1px solid #d8d8d8");
        $("#AP").css("border-left","none");
        $("#AP").css("border-right","none");
      });
    
      //联系客服
      $("#ser").mouseenter(function(){
        $("#ser").css("background","#fff");
        $("#cust").css("display","block");
        $("#ser a").css("border-left","none");
        $("#weat a").css("border-left","none");
        $("#ser").css("border-left","1px solid #d8d8d8");
        $("#weat").css("border-left","1px solid #d8d8d8");
      });
      $("#ser").mouseleave(function(){
        $("#ser").css("background","")
        $("#cust").css("display","none")
        $("#ser a").css("border-left","1px solid #d8d8d8");
        $("#weat a").css("border-left","1px solid #d8d8d8");
        $("#ser").css("border-left","none");
        $("#weat").css("border-left","none");
      });
    }
  }
</script>

<style scoped>
  #top-warp{width: 100%; background: #f9f9f9;border-bottom: 1px solid #d8d8d8;}
  #top{
    position: relative;
    width: 1100px;
    height: 40px;
    background: #f9f9f9;
    margin: 0 auto;
  }
  #top ul{
    width: 400px;
    height: 100%;
    float: right;
  }
  #top ul li{float: left;height: 100%;}
  #top ul li:hover a{color: #e57339;}
  #top ul li a{
    float: left;
    width: 78px;
    height: 14px;
    line-height: 14px;
    margin-top: 13px;
    text-align: center;
    color: #707070;
    font-size: 12px;
    border-left: 1px solid #d8d8d8;
    cursor: pointer;
  }
  #top #an{
    float: right;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #e57339;
    cursor: pointer;
    margin-right: 10px;
  }
  #top #span{
    float: right;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #707070;
    cursor: pointer;
    margin-right: 30px;
  }


  #top .top-center{
    float: left;
    width: 175px;
    height: 40px;
    line-height: 40px;
    background: #f9f9f9;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 399px;
  
  }
  #top .top-center p{font-size: 12px;text-align: center;color: #e57339;}


  #top .top-bottom{
    position: absolute;
    top: 40px;
    right: 309px;
    width: 265px;
    height: 72px;
    background: #ffffff;
    border-top: 1px solid #fff;
    border-left: 1px solid #d8d8d8;
    border-right: 1px solid #d8d8d8;
    border-bottom: 1px solid #d8d8d8;
    border-radius: 2px;
    z-index: 99;
    display: none;
  }
  #top .top-bottom img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    float: left;
    margin: 13px 0 0 13px;
  }
  #top .top-bottom p{
    font-size: 12px;
    float: left;
    width: 130px;
    margin:15px 0 0 10px;
    color: #e57339;
  }
  #top .top-bottom span:nth-of-type(1){
    font-size: 12px;
    float: right;
    color: #666;
    width: 50px;
    text-align: center;
    margin-top: 15px;
    cursor: pointer;
  }

  #top .top-bottom mark{
    font-size: 12px;
    float: left;
    color: #fff;
    width: 65px;
    text-align: center;
    height: 18px;
    line-height: 18px;
    border-radius: 3px;
    margin: 10px 0 0 5px;
    background: #fff;
    opacity: 0.8;
  }
 
  #top .top-bottom span:nth-of-type(2){
    float: right;
    font-size: 12px;
    float: left;
    color: #ffffff;
    min-width: 75px;
    height: 18px;
    line-height: 18px;
    background: #d5c49c;
    text-align: center;
    border-radius: 3px;
    margin: 10px 0 0 10px;
  }
  #gzh{
    position: absolute;
    top: 40px;
    right: 16px;
    width: 150px;
    height: 150px;
    border: 1px solid #d8d8d8;
    border-top: none;
    background: #fff;
    display: none;
    z-index: 99;
  }
  #gzh #img{
    width: 120px;
    height: 120px;
    margin: 15px 0 0 15px;
  }
  #load{
    width: 150px;
    height: 150px;
    position: absolute;
    top: 40px;
    right: -62px;
    display: none;
    border: 1px solid #d8d8d8;
    border-top: none;
    background: #fff;
    z-index: 99;
  }
  #load .img{
    width: 120px;
    height: 120px;
    margin: 15px 0 0 15px;
  }

  #cust{
    position: absolute;
    top: 40px;
    right: 44px;
    width: 200px;
    height: 75px;
    border: 1px solid #d8d8d8;
    border-top: none;
    background: #fff;
    display: none;
    z-index: 99;
  }
  #cust p{
    width: 100%;
    margin-top: 10px;
    font-size: 12px;
    color: #666;
  }
  #cust p mark{
    width: 70px;
    display: inline-block;
    margin-right: 10px;
    margin-left: 15px;
    text-align: left;
    background: #fff;
    color: #333;
    font-size: 14px;
  }
 
</style>
