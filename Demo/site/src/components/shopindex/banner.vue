<template>
  <div id="banner-warp">
    <div id="banner">
      <div id="banner-left">
        <div id="left-top">
          <span>全部商品分类</span>
          <i class="iconfont">&#xe62f;</i>
        </div>
        <div id="ul">
          <ul id="banner-ul">
            <li :data-id="item.Id" v-for="item in cateList" :key="item.Id">
              <span>{{item.name}}</span>
              <i class="iconfont">&#xe62e;</i>
            </li>
          </ul>
        </div>
        <div class="nav-banner hide">
          <div class="nav hide" :data-id="item.Id" v-for="item in cateList" :key="item.Id">
            <div id="box" v-for="(img,index) in item.childrens" :key="img.Id" v-if="index<7" @click="$router.push('/lis?sub_id='+item.Id+'&'+'id='+img.Id)">
              <img :src="img.photo | imgUrl"/>
              <p>{{img.name}}</p>
            </div>
          </div>
        </div>
      </div>
      <div id="banner-center">
        <div class="banner-top">
          <el-carousel height="345px" :interval="2000">
            <el-carousel-item  v-for="item in swipeList" :key="item.product_id">
              <img :src="item.banner | imgUrl" @click="openShop(item.product_id)"/>
            </el-carousel-item>
          </el-carousel>
        </div>
        <div class="banner-bottom">
          <img :src="item.banner | imgUrl" v-for="(item,index) in advList" @click="openShop(item.product_id)" :key="item.product_id" v-if="index<4"/>
        </div>
      </div>

      <div id="banner-right">
        <div class="right-top">
          <img :src="headUrl | imgUrl" :onerror="Img"/>
          <p id="put">Hi,欢迎{{nickName}}来到企铛铛商城</p>
          <div id="btn">{{typeName}}</div>
          <div id="left">
            <p>￥{{price}}</p>
            <p>账户余额</p>
          </div>
          <div id="right">
            <p>{{orderList.product_total_num}}</p>
            <p>商品总数</p>
          </div>
          
          <ul id="ul-li">
            <li>
              <i class="iconfont">&#xe656;</i>
              <a>待发货<span>{{orderList.order_receive}}</span></a>
            </li>
            <li>
              <i class="iconfont">&#xe605;</i>
              <a>待收货<span>{{orderList.order_deliver}}</span></a>
            </li>
            <li>
              <i class="iconfont">&#xe683;</i>
              <a>兑换订单<span>{{orderList.order_exchange_total_num}}</span></a>
            </li>
            <li>
              <i class="iconfont">&#xe607;</i>
              <a>订单数量<span>{{orderList.order_today_exchange}}</span></a>
            </li>
          </ul>

          <div class="right-center">
            <span>公告</span>
            <div id="center-right">
              <p v-if="index<4" v-for="(item,index) in newsList" :key="item.id" v-html="item.ArticleTitle" @click="$router.push('/Newslist?id='+item.id)"></p>
            </div>
          </div>
        </div>
        <div class="right-bottom" @click="Join()"><img src="../../image/banner05.png"/></div>
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
            banner_position:1
          }}).then(data=>{
          this.swipeList=data.data;
        })
      },
      //显示采购商城广告图
      getAdv(){
        this.$ajax.get("/system/index/banner",{
          params:{
             banner_position:2
          }
          }).then(data=>{
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
      //加盟企铛铛
      Join(){
        if(localStorage.phone == "" || localStorage.phone == undefined){
          this.$router.push('/login')
        }
      },
      //订单数据模块
      getOrder(){
        this.$ajax.get("/order/status-num",{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.orderList=data.data;
        })
      },
      //显示可提现余额
      Deposit(){
        this.$ajax.post("/person/userDeposit",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.price=data.data.depositTotal;
        })
      }
    },
    mounted(){
      this.getCenter();
      this.getCate();
      this.getSwipe();
      this.getAdv();
      this.getNews();
      this.getOrder();
      this.Deposit();
    
      //加入联盟的判断
      if(localStorage.phone == "" || localStorage.phone == undefined){
        $(".right-top").css('display','none');
        $(".right-bottom").css('display','block');
      }else{
        $(".right-top").css('display','block');
        $(".right-bottom").css('display','none');
      }
      
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
      })

    }
  }
</script>

<style scoped>
  #banner-warp{width: 100%;background: #f8f8f8;border-top: 2px solid #ff5900;}
  #banner{width: 1200px;height: 520px;margin: 0 auto;}
  #banner-left{width: 200px;height: 100%;float: left;position: relative;}
  #banner-left #left-top{
    height: 40px;
    width: 100%;
    line-height: 40px;
    position: absolute;
    top: -40px;
    background: #ff5900;
    font-size: 14px;
    color: #ffffff;
  }
  #left-top span{text-indent: 20px;display: inline-block;}
  #left-top i{display: inline-block;margin-left: 55px;}
  #banner-left #ul{height: 500px;width: 200px;background: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,.11);}
  #ul #banner-ul li {
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    cursor: pointer;
    width: 100%;
    border-bottom: 1px dotted #ddd;
  }
  #ul #banner-ul li span{
    display: inline-block;
    text-indent: 55px;
    margin: 0 auto;
  }
  #ul #banner-ul li .iconfont{
    width: 20px;
    font-weight: normal;
    font-size: 12px;
    margin-right: 13px;
    float: right;
  }
  #banner-ul li:nth-of-type(1){background:url("../../image/list1.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(2){background:url("../../image/list2.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(3){background:url("../../image/list3.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(4){background:url("../../image/list4.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(5){background:url("../../image/list5.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(6){background:url("../../image/list6.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(7){background:url("../../image/list7.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(8){background:url("../../image/list2.png") no-repeat 20px center;}

  #banner-ul li:hover{color:#ffffff;}
  #banner-ul li:nth-of-type(1):hover{background:#ff5600 url("../../image/list01.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(2):hover{background:#ff5600 url("../../image/list02.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(3):hover{background:#ff5600 url("../../image/list03.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(4):hover{background:#ff5600 url("../../image/list04.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(5):hover{background:#ff5600 url("../../image/list05.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(6):hover{background:#ff5600 url("../../image/list06.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(7):hover{background:#ff5600 url("../../image/list07.png") no-repeat 20px center;}
  #banner-ul li:nth-of-type(8):hover{background:#ff5600 url("../../image/list02.png") no-repeat 20px center;}
  .nav-banner{
    width: 400px;
    height: 500px;
    background: #ffffff;
    position: absolute;
    left: 200px;
    top: 0px;
    z-index: 99;
    box-shadow: 0 4px 6px rgba(0,0,0,.15);
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

  #banner-center{width: 730px;height: 100%;float: left;margin-left: 10px;}
  #banner-center .banner-top{width: 100%;height: 345px;}
  .el-carousel__item img{width: 100%;height: 100%;}
  #banner-center .banner-bottom{width: 100%;height: 150px;margin-top: 10px;}
  .banner-bottom img{width: 175px;height:145px;float:left;margin-left: 10px;}
  .banner-bottom img:nth-of-type(1){margin-left: 0px;}
  .banner-bottom img:hover{margin-top: -10px;transition: 0.5s;}

  #banner-right{width: 255px;height: 100%;float: left;}
  #banner-right .right-top{
    width: 245px;
    height: 500px;
    margin-left: 10px;
    float: left;
    background:url("../../image/bj1.png");
    position: relative;  
    box-shadow: 0 4px 6px rgba(0,0,0,.11);
  }
  .right-top img{
    height: 78px;
    width: 78px;
    border-radius: 50%;
    position: absolute;
    top: -40px;
    left: 82px;
    display:block;
    background:#fafafa; 
    box-shadow: 0px 0px 2px 2px RGB(249,225,212);
  }
  .right-top #put{
    width: 100%;
    font-size: 12px;
    text-align: center;
    color: #313131;
    margin-top: 45px;
  }
  .right-top #btn{
    width: 100px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    text-align: center;
    background: RGB(240,178,140);
    color: #fff;
    margin: 15px auto;
    border-radius: 25px;
    box-shadow: 0px 0px 2px 2px RGB(249,225,212);
  }
  .right-top #left{
    width: 80px;
    height: 60px;
    margin: 20px 0 0 32px;
    float: left;
  }
  #left p:nth-of-type(1){
    width: 100%;
    line-height: 20px;
    margin-top:5px;
    color: #ff0000;
    font-size: 12px;
    text-align: center;
  }
  #left p:nth-of-type(2){
    width: 100%;
    margin-top:5px;
    line-height: 20px;
    color: #313131;
    font-size: 12px;
    text-align: center;
  }
  .right-top #right{
    width: 80px;
    height: 60px;
    margin: 20px 0 0 32px;
    float: left;
  }
  #right p:nth-of-type(1){
    width: 100%;
    line-height: 20px;
    margin-top:5px;
    color: #ff0000;
    font-size: 12px;
    text-align: center;
  }
  #right p:nth-of-type(2){
    width: 100%;
    margin-top:5px;
    line-height: 20px;
    color: #313131;
    font-size: 12px;
    text-align: center;
  }
 .right-top #ul-li{
    width: 100%;
    height: 150px;
    margin-top: 10px;
    float: left;
  }
  #ul-li li{
    width: 80px;
    height: 60px;
    margin: 10px 0 0 32px;
    float: left;
    position: relative;
  }
  #ul-li li i{
    display: block;
    width: 30px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    border-radius: 50%;
    text-align: center;
    font-size: 20px;
    cursor: pointer;
  }
  #ul-li li:nth-of-type(1) i{background: RGB(240,178,140);}
  #ul-li li:nth-of-type(2) i{background: RGB(240,178,140);}
  #ul-li li:nth-of-type(3) i{background: #ff5600;color: #fff;}
  #ul-li li:nth-of-type(4) i{background: #ff5600;color: #fff;}
  #ul-li li i:hover{margin-top: -10px;transition: 0.3s;}

  #ul-li li a{
    display: block;
    width: 100%;
    text-align: center;
    color: #313131;
    position: absolute;
    left: 0;
    top: 30px;
  }
  #ul-li li a span{
    font-size: 12px;
    color: #ff0000;
    margin-left: 3px;
  }
  .right-top .right-center{
    height: 150px;
    width: 100%;
    display: block;
    float: left;

  }
  .right-center span{
    width: 100%;
    display: block;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-indent: 15px;
  }
  .right-center #center-right{
    width: 100%;
    height: 120px;
  }
  #center-right p{
    text-indent: 15px;
    font-size: 12px;
    line-height: 20px;
    cursor: pointer;
  }
  #center-right p:hover{color: #ff0000;}



  .right-bottom{
    width: 245px;
    height: 100%;
    margin-left: 10px;
    float: left;
    cursor: pointer;
  }
  .right-bottom img{width: 100%;height: 499px;}
</style>
<style>
  .el-carousel__button{background-color: red;}
</style>
