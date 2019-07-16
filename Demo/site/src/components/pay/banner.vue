<template>
  <div id="banner-warp">
    <div id="banner">
      <div id="banner-left">
        <div id="logo-img">
          <img src="../../image/s-logo.png"/>
        </div>
        <p>精品B2B企业礼品采购平台</p>
        <ul id="banner-ul">
          <li :data-id="item.Id" v-for="item in cateList" :key="item.Id">
            <span>{{item.name}}</span>
          </li>
        </ul>
        <div class="nav-banner hide">
          <div class="nav hide" :data-id="item.Id" v-for="item in cateList" :key="item.Id">
            <div id="box" v-for="(img,index) in item.childrens" :key="img.Id" v-if="index<7" @click="$router.push('/li?sub_id='+item.Id+'&'+'id='+img.Id)">
              <img :src="img.photo | imgUrl"/>
              <p>{{img.name}}</p>
            </div>
          </div>
        </div> 
      </div>

      <div class="banner-top">
        <el-carousel :interval="2000" height="357px" style="z-index:0">
          <el-carousel-item  v-for="item in swipeList" :key="item.product_id">
            <img :src="item.banner | imgUrl" @click="openShop(item.product_id)"/>
          </el-carousel-item>
        </el-carousel>
      </div>

      <div id="banner-right">
        <div id="right-top">
          <img :src="headUrl | imgUrl" :onerror="Img"/>
          <p id="ppan">亲爱的，{{nickName}}，您好！</p>
          <div id="btn1" @click="$router.push('/resgier')">注册账号</div>
          <div id="btn2" @click="$router.push('/login')">立即登录</div>
          <div id="btn3" @click="$router.push('/index')">我的</div>
          <div id="btn4" @click="out()">退出</div>
        </div>
        <div id="right-bottom">
          <span>铛铛快报</span>
          <span @click="$router.push('/news')">更多></span>
          <p v-if="index<4" v-for="(item,index) in newsList" :key="item.id" v-html="item.ArticleTitle" @click="$router.push('/Newslist?id='+item.id)"></p>
        </div>
      </div>

      <div id="banner-bottom">
        <img :src="item.banner | imgUrl" v-for="(item,index) in advList" @click="openShop(item.product_id)" :key="item.product_id"  v-if="index<4"/>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: "banner",
    data(){
      return{
        headUrl:'',
        typeName:'',
        nickName:'',
        cateList:[],
        swipeList:[],
        newsList:[],
        advList:[],
        orderList:[],
        code:'',
        Img:'this.src="' + require('../../image/bo.png') + '"',
        price:''
      }
    },
    methods:{
       //个人中心头像
      getCenter(){
        this.$ajax.post("/Person/userCentre",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.headUrl=data.data.headUrl;
          this.typeName=data.data.typeName;
          this.nickName=data.data.nickName;
          this.code=data.error_code;
        })
      },
      //显示采购商城分栏框
      getCate(){
        this.$ajax.get("/vitation/indexProductCategory").then(data=>{
          this.cateList=data.data;
        })
      },
      //显示采购商城轮播图
      getSwipe(){
        this.$ajax.get("/system/index/banner",{
          params:{
            banner_position:1,
            type:'pc'
          }}).then(data=>{
          this.swipeList=data.data;
        })
      },
      //显示采购商城广告图
      getAdv(){
        this.$ajax.get("/system/index/banner",{
          params:{
            banner_position:2,
            type:'pc'
          }}).then(data=>{
          this.advList=data.data;
        })
      },
      //进入详情
      openShop(id){
        if(localStorage.phone == "" || localStorage.phone == undefined){
          this.$router.push('/login')
        }else if(this.code==40015){
          this.$router.push('/login')
        }else{
          this.$router.push('/detail?id='+id)
        }
      },

      //显示公告列表
      getNews(){
        this.$ajax.get("/system/articleList",{
          params:{
            category_id:23
          }}).then(data=>{
          this.newsList=data.data.data;
        })
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
      this.getCate();
      this.getSwipe();
      this.getAdv();
      this.getNews();
   
      //分栏框的鼠标移入移出
      $('#banner-ul,.nav-banner').on('mouseenter', function() {
        $(".nav-banner").removeClass('hide');
        var li_data = $(this).attr('data-id');
        $('.nav[data-id="' + li_data + '"]').removeClass('hide');
      }).on('mouseleave',function() {
        $(".nav-banner").addClass('hide');
        var li_data = $(this).attr('data-id');
        $('.nav[data-id="' + li_data + '"]').addClass('hide');
      }).on('mouseenter', 'li', function(e) {
        var li_data = $(this).attr('data-id');
        $(".nav").addClass('hide');
        $('.nav[data-id="' + li_data + '"]').removeClass('hide');
      });

      if(localStorage.phone == "" || localStorage.phone == undefined){
        $("#ppan").css("display","none");
        $("#btn1").css("display","inline-block");
        $("#btn2").css("display","inline-block");
        $("#btn3").css("display","none");
        $("#btn4").css("display","none");
      }else{
        $("#pan").css("display","block");
        $("#btn1").css("display","none");
        $("#btn2").css("display","none");
        $("#btn3").css("display","inline-block");
        $("#btn4").css("display","inline-block");
       
      };
    }
  }
</script>

<style scoped>
  #banner-warp{width: 100%;}
  #banner{
    width: 1100px;
    height: 470px;
    margin: 0 auto;
  }
  #banner #banner-left{
    width: 175px;
    height: 655px;
    float: left;
    position: relative;
    background: #fff;
    top: -185px;
    box-shadow: 0 4px 6px rgba(0,0,0,.15);
  }
  #banner-left #logo-img{
    width: 85px;
    height: 110px;
    margin: 0 auto;
    border-bottom: 1px solid #f8f8f8;
  }
  #logo-img img{margin-top: 18px;}
  #banner-left p{
    width: 100%;
    margin-top: 5px;
    text-align: center;
    color: #666;
    font-size: 12px;
  }
  #banner-left #banner-ul{
    width: 100%;
    height: 482px;
    margin-top: 40px;
  }
  #banner-ul li{
    width: 120px;
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    color: #333;
    margin: 0 auto;
    border-bottom: 1px solid #f8f8f8;
    cursor: pointer;
  }
  #banner-ul li:last-of-type{border-bottom: none;}
  #banner-ul li:hover{color: #e57339;}

  #banner-ul li:nth-of-type(1){background:url("../../image/li9.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(2){background:url("../../image/li1.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(3){background:url("../../image/li5.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(4){background:url("../../image/li2.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(5){background:url("../../image/li6.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(6){background:url("../../image/li8.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(7){background:url("../../image/li7.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(8){background:url("../../image/li0.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(9){background:url("../../image/li4.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(10){background:url("../../image/li3.png") no-repeat 15px center;}
  
  #banner-ul li:nth-of-type(1):hover{background:url("../../image/li09.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(2):hover{background:url("../../image/li01.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(3):hover{background:url("../../image/li05.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(4):hover{background:url("../../image/li02.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(5):hover{background:url("../../image/li06.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(6):hover{background:url("../../image/li08.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(7):hover{background:url("../../image/li07.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(8):hover{background:url("../../image/li10.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(9):hover{background:url("../../image/li04.png") no-repeat 15px center;}
  #banner-ul li:nth-of-type(10):hover{background:url("../../image/li03.png") no-repeat 15px center;}



  .nav-banner{
    width: 400px;
    height: 470px;
    background: #fff;
    position: absolute;
    left: 176px;
    bottom: 0;
    z-index: 99;
    box-shadow: 0 4px 6px rgba(0,0,0,.15);
    border-radius: 3px;
  }
  .nav{width: 100%;height: 100%}
  .hide {display: none;}
  .nav-banner #box{
    width: 150px;
    height: 100px;
    float: left;
    margin: 20px 0px 0 25px;
    cursor: pointer;
  }
  #box img{
    width: 60px;
    height: 60px;
    margin: 10px 0 0 15px;
    float: left;
  }
  #box p{
    width: 75px;
    font-size: 14px;
    margin-top: 10px;
    text-align: center;
    color: #313131;
    float: left;
    line-height: 70px;
  }

  #banner .banner-top{
    width: 685px;
    height: 357px;
    float: left;
    margin-left: 7px;
    cursor: pointer;
  }


  #banner #banner-right{
    width: 225px;
    height: 357px;
    float: left;
    margin-left: 5px;
    background: url("../../image/ss-bj.png");

  }
  #banner-right #right-top{
    width: 100%;
    height: 200px;
  }
  #right-top img{
    width: 70px;
    height: 70px;
    margin-top: 35px;
    margin-left: 75px;
    border-radius: 50%;
  }
  #right-top #ppan{
    width: 100%;
    text-align: center;
    font-size: 14px;
    color: #e57339;
    margin-top: 20px;
  }
  #right-top #btn1{
    width: 90px;
    height: 25px;
    line-height: 24px;
    font-size: 14px;
    text-align: center;
    color: #e57339;
    background: #fff;
    border-radius: 25px;
    margin: 43px 0 0 15px;
    float: left;
    box-shadow: #eee 3px 3px 0px 0px;
    cursor: pointer;
  }
  #right-top #btn2{
    width: 90px;
    height: 25px;
    line-height: 24px;
    color: #fff;
    text-align: center;
    font-size: 14px;
    border-radius: 25px;
    margin: 43px 0 0 20px;
    float: left;
    background: #e57339;
    cursor: pointer;
    box-shadow: #eee 3px 3px 0px 0px;
  }
  #right-top #btn3{
    width: 75px;
    height: 25px;
    line-height: 24px;
    font-size: 14px;
    text-align: center;
    color: #e57339;
    background: #fff;
    border-radius: 25px;
    margin: 15px 0 0 25px;
    float: left;
    cursor: pointer;
    border: 1px solid #e57339;
  }
  #right-top #btn4{
    width: 75px;
    height: 25px;
    line-height: 24px;
    font-size: 14px;
    text-align: center;
    color: #e57339;
    background: #fff;
    border-radius: 25px;
    margin: 15px 0 0 25px;
    float: left;
    cursor: pointer;
    border: 1px solid #e57339;
  }




  #banner-right #right-bottom{
    width: 100%;
    height: 157px;
    padding-right: 23px;
    padding-left: 23px;
    padding-top: 10px;
    box-sizing: border-box;
  }
  #right-bottom span:nth-of-type(1){
    color: #666;
    font-size: 14px;
    float: left;
  }
  #right-bottom span:nth-of-type(2){
    color: #666;
    font-size: 12px;
    float: right;
    cursor: pointer;
  }
  #right-bottom p{
    width: 100%;
    height: 20px;
    line-height: 20px;
    font-size: 12px;
    color: #666;
    float: left;
    margin-top: 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    cursor: pointer;
  }
  #right-bottom p:nth-of-type(1)::before{
    content: '公告';
    width: 35px;
    height: 18px;
    line-height: 17px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #0075a9;
    border-radius: 3px;
    display: inline-block;
    margin-right: 10px;
    color: #0075a9;
  }
  #right-bottom p:nth-of-type(2):before{
    content: '活动';
    width: 35px;
    height: 18px;
    line-height: 17px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #dcb044;
    border-radius: 3px;
    display: inline-block;
    margin-right: 10px;
    color: #dcb044;
  }
  #right-bottom p:nth-of-type(3):before{
    content: '热搜';
    width: 35px;
    height: 18px;
    line-height: 17px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #ff0000;
    border-radius: 3px;
    display: inline-block;
    margin-right: 10px;
    color: #ff0000;
  }
  #right-bottom p:nth-of-type(4):before{
    content: '热搜';
    width: 35px;
    height: 18px;
    line-height: 17px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #e57339;
    border-radius: 3px;
    display: inline-block;
    margin-right: 10px;
    color: #e57339;
  }
  

  #banner #banner-bottom{
    width: 925px;
    height: 105px;
    float: left;
    margin-top: 7px;
  }
  #banner-bottom img:nth-of-type(1){margin-left: 7px;}
  #banner-bottom img{
    margin-left: 5px;
    width: 225px;
    height: 100%;
    float: left;
    cursor: pointer;
  }

</style>
<style>
  .el-carousel__button{background-color: red;}
</style>
