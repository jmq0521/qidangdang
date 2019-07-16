<template>
<div>
  <div id="hea-warp">
    <div id="hea">
      <div class="hea-center">
        <div id="logo"><img src="../../image/shop-logo.png" @click="$router.push('/')"/></div>
        <input type="text" id="txt" v-model="search" autocomplete="off"><div id="sear" @click="getGood()">搜索</div>
        <div id="hea-right" @click="$router.push('/joincar')">
          <i class="iconfont">&#xe73d;</i><span>我的购物车</span><div>{{checkNum}}</div>
        </div>
        <!-- <div id="right"><img src="../../image/shop-weima.png"/>扫码享受优惠</div> -->
      </div>
     
      <!-- <ul id="hea-nav">
        <li @click="getSearch(2356)">食品酒水</li>
        <li>铛铛新品</li>
        <li>铛铛热卖</li>
      </ul> -->
    </div>
  </div>

  <div id="list-warp">
    <div id="list">
      <div id="list-top">
        <span>全部商品分类</span>
        <i class="iconfont">&#xe62f;</i>
      </div>
      <div id="list-one">
        <span id="span">分类</span>
        <ul id="ul-list">
          <li @click="getSearch()">全部</li>
          <li  v-for="(item,index) in preheadlist" :key="item.Id" :class= "isactive === index ? 'addclass' : '' "  @click="getSearch(item.Id,index)">{{item.name}}</li>
        </ul>
      </div>

      <div id="list-one">
        <span id="span">类别</span>
        <ul id="ul-list">
          <li @click="getSear()">全部</li>
          <li v-for="(item,index) in cateList" :key="item.Id" :class= "active === index ? 'addclass' : '' " @click="getSear(item.Id,index)">{{item.name}}</li>
        </ul>
      </div>

      <div id="list-one">
        <span id="span">排序</span>
        <ul id="ul-list">
         <li @click="getSearch()">全部</li>
         <li @click="getPro(2)">上架时间</li>
         <li @click="getAway(2)">销量</li>
         <li @click="getPri(2)">价格</li>
        </ul>
      </div>

      <div id="list-img">
        <div id="img" v-for="item in preList" @click="openShop(item.ProId)" :key="item.ProId">
          <div class="img">
             <img :src="item.ProImg | imgUrl"/>
          </div>
          <p>零售价：<mark>￥{{item.MarketPrice}}</mark></p>
          <p><mark>新款</mark>{{item.ProName}}</p>
          <span><mark>尊</mark>{{item.EnjoyPrice}}</span>
          <span><mark>标</mark>{{item.VipPrice}}</span>
          <a>销量：{{item.prosum}}</a>
          <a>库存：{{item.repertory}}</a>
          <div id="chek">查看商品详情</div>
        </div>
      </div>

      <el-pagination
        style="margin-bottom:20px;margin-top: 10px; float: right; margin-right: 5px"
        background
        layout="prev, pager, next"
        :page-count="total"
        @current-change="getGood"
        current-change="getPreGood">
      </el-pagination>

    </div>
  </div>
</div>
  
</template>

<script>
  export default {
    name: "list",
    data(){
      return{
        carList:'',
        preheadlist:[],
        preList:[],
        cateList:[],
        page:0,
        total:1,
        limit:15,
        type:'',
        id:'',
        isactive:-1,
        active:-1,
        search:''
      }
    },
    computed:{
      checkNum: function () {
        let num = 0;
        for (let i in this.carList) {
          num+=this.carList[i].ProNum;
        }
        return num;
      }
    },
    methods:{
      //获取购物车列表
      getCar() {
          this.$ajax.post("/purchase/carList",{},{
            headers: {
              token: localStorage.token
            }
          }).then(data => {
          this.carList = data.data.access_token.data;
        })
      },
      //显示列表的表头的分类
      getPreHead(){
        this.$ajax.post("/person/presellGoodHead",{}).then(data=>{
          this.preheadlist=data.data.category;
        })
      },
      //刚进入页面显示对应类别的商品列表
      getPreGood(page){
        this.$ajax.post("/person/presellGood",{
          page,
          limit:this.limit,
          category:this.$route.query.sub_id,
          category_code:this.$route.query.id,
          search:this.search
        }).then(data=>{
          this.preList=data.data.data;
          this.total=data.data.last_page;
        })
      },

      //点击时显示对应分类的商品列表
      getGood(page){
        this.$ajax.post("/person/presellGood",{
          page,
          limit:this.limit,
          search:this.search,
          category:this.type,
          category_code:this.id,
        }).then(data=>{
          this.preList=data.data.data;
          this.total=data.data.last_page;
        })
      },

 


      //根据分类表头状态搜索
      getSearch(category,index){
        this.type=category,
        this.isactive=index,
        this.getGood();
        this.getCat();
      },

      //根据类别表头状态搜索
      getSear(category,index){
        this.id=category,
        this.active=index,
        this.getCateGood();
      },


      //点击二级分类时显示对应类别的商品列表
      getCateGood(page){
        this.$ajax.post("/person/presellGood",{
          page,
          limit:this.limit,
          category_code:this.id,
        }).then(data=>{
          this.preList=data.data.data;
          this.total=data.data.last_page;
        })
      },


      //刚进入页面显示二级分类
      getCate(){
        this.$ajax.get("/person/product/category",{
          params:{
            id:this.$route.query.sub_id
          }}).then(data=>{
            this.cateList=data.data
        })
      },

      //点击分类显示二级类别
      getCat(){
        this.$ajax.get("/person/product/category",{
          params:{
            id:this.type
          }}).then(data=>{
            this.cateList=data.data
        })
      },


      //显示预售区价格搜索功能
      getPri(price){
        this.$ajax.post("/person/presellGood",{
          limit:this.limit,
          price
        }).then(data=>{
          this.preList=data.data.data;
          this.total=data.data.last_page;
        })
      },
      //显示预售区商品列表最新上架搜索功能
      getAway(putaway){
        this.$ajax.post("/person/presellGood",{
          limit:this.limit,
          putaway
        }).then(data=>{
          this.preList=data.data.data;
          this.total=data.data.last_page;
        })
      },
      //显示预售区商品列表销量搜索功能
      getPro(pronum){
        this.$ajax.post("/person/presellGood",{
            limit:this.limit,
            pronum
        }).then(data=>{
          this.preList=data.data.data;
          this.total=data.data.last_page;
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
      }
    },
    mounted(){
      this.search=this.$route.query.name;
      this.getCar();
      this.getPreHead();
      this.getPreGood();
      this.getCate();
      
    }
  }
</script>

<style scoped>
  .addclass{color: #ff0000;}
  #hea-warp{width: 100%;}
  #hea{
    width: 1200px;
    height: 155px;
    margin: 0 auto;
  }
  #hea .hea-center{height: 100px;width: 100%;margin-top: 20px;}
  .hea-center #logo{width: 140px;height: 100px;float: left;}
  .hea-center #logo img{margin-top: 20px;}
  #txt{
    width: 430px;
    height: 40px;
    line-height: 40px;
    color: #626262;
    float: left;
    margin-left: 200px;
    margin-top: 25px;
    text-indent: 10px;
    border: 2px solid #ec652b;
    border-radius: 25px;
    outline: none;
  }
  #sear{
    width: 70px;
    height: 40px;
    line-height: 40px;
    float: left;
    color: #ffffff;
    font-size: 14px;
    text-align: center;
    margin-top: 25px;
    border: 0;
    background: #ec652b;
    cursor: pointer;
    border-radius: 25px;
    margin-left: -45px;
  }
  #hea-right{
    width: 145px;
    height: 40px;
    margin-top: 25px;
    border: 2px solid #ec652b;
    float: left;
    border-radius: 25px;
    margin-left: 75px;
    font-size: 12px;
    cursor: pointer;
  }
  #hea-right i{
    font-size: 18px;
    color: #ec652b;
    line-height: 40px;
    float: left;
    margin-left: 15px;
  }
  #hea-right span{
    color: #313131;
    line-height: 40px;
    float: left;
    margin-left: 10px;
    font-size: 14px;
  }
  #hea-right div{
    width: 18px;
    height: 18px;
    line-height: 18px;
    font-size: 8px;
    border-radius: 50%;
    background: #ec652b;
    float: left;
    color: #ffffff;
    text-align: center;
    margin-top: 10px;
  }
  #right{
    width: 130px;
    height: 33px;
    color: #313131;
    line-height: 33px;
    margin-top: 17px;
    border: 1px solid #dcdcdc;
    float: right;
    font-size: 12px;
    font-weight: bold;
  }
  #right img{width: 25px;height: 25px;margin: 3px 10px 0 10px;float: left;}
  #hea-ul{float: left;width:260px;margin-left: 208px;margin-top: 5px;}
  #hea-ul li{float: left;font-size: 12px;margin-left: 5px;color: #626262;cursor: pointer;}
  #hea-nav{height: 40px;line-height: 40px;margin-left: 230px;}
  #hea-nav li{margin-left: 35px;float:left;font-weight: bold;font-size: 12px;color:#313131;cursor: pointer;}

  #list-warp{
    width: 100%;
    border-top: 2px solid #ff5900;
    
  }
  #list{
    width: 1200px;
    margin: 0 auto;
    position: relative; 

  }
  #list-top{
    height: 40px;
    width: 200px;
    line-height: 40px;
    position: absolute;
    top: -40px;
    background: #ff5900;
    font-size: 14px;
    color: #ffffff;
  }
  #list-top span{text-indent: 20px;display: inline-block;}
  #list-top i{display: inline-block;margin-left: 55px;}

  #list-one{
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
  }
  #list-one #span{
    width: 60px;
    text-align: center;
    line-height: 40px;
    font-size:14px;
    color: #616161;
    font-weight: bold;
    float: left;
  }
  #list-one #ul-list{
    width: 1100px;
    float: left;
  }
  #ul-list li{
    float: left;
    width: 80px;
    font-size: 14px;
    text-align: center;
    line-height: 40px;
    margin-left: 10px;
    cursor: pointer;
  }
  #list-one:nth-of-type(3) #ul-list li:hover{color: #ff0000;}
  #list-one:nth-of-type(4) #ul-list li:hover{color: #ff0000;}
  #list-one:nth-of-type(5) #ul-list li:hover{color: #ff0000;}
  #list-img{
    width: 100%;
    float: left;
    min-height: 300px;
  }
  #list-img #img{
    width: 230px;
    height: 340px;
    float: left;
    margin-top: 10px;
    margin-left: 9px;
    background: #ffffff;
    border: 1px solid #fff;
    transition: all 0.4s ease-in-out;
    position: relative;
  }
  #img .img{
   width: 100%;
   height: 190px;
   position: relative;
   margin-top: 10px;
  }
  .img img{
    width: 150px;
    height: 150px;
    position: absolute;  
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;  
    margin: auto;
  }
  #img p:nth-of-type(1){
    width: 100%;
    text-indent: 30px;
    font-size: 12px;
    color: #b9b9b9;
  }
  #img p:nth-of-type(1) mark{
    background: #ffffff;
    text-decoration: line-through;
    color: #b9b9b9;
  }
  #img p:nth-of-type(2){
    font-size: 12px;
    color: #626262;
    margin: 10px auto;
    line-height: 18px;
    width: 170px;
    font-weight: bold;
    height: 35px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  #img p:nth-of-type(2) mark{
    color: #ff0000;
    border: 1px solid #ff0000;
    width: 35px;
    display: inline-block;
    height: 18px;
    line-height: 16px;
    text-align: center;
    font-size: 12px;
    background: #ffffff;
    margin-right: 5px;
    font-weight: normal;
    border-radius: 3px;
    
  }
  #img span:nth-of-type(1){
    margin-left: 30px;
    font-size: 12px;
    color: #ff5b00;
    display: inline-block;
    width: 80px;
  }
  #img span:nth-of-type(2){
    margin-left: 30px;
    font-size: 12px;
    color: #f4a76d;
    display: inline-block;
    width: 80px;
  }
  #img span:nth-of-type(1) mark{
    display: inline-block;
    color: #ffffff;
    width: 20px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    background: #ff5b00;
    margin-right: 5px;
    border-radius: 50%;
  }
  #img span:nth-of-type(2) mark{
    display: inline-block;
    color: #ffffff;
    width: 20px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    background: #f4a76d;
    margin-right: 5px;
    border-radius: 50%;
    
  }
  #img a:nth-of-type(1){
    margin-left: 30px;
    font-size: 12px;
    color: #b9b9b9;
    display: inline-block;
    margin-top: 10px;
    width: 80px;
  }
  #img a:nth-of-type(2){
    margin-left: 30px;
    font-size: 12px;
    color: #b9b9b9;
    display: inline-block;
    margin-top: 10px;
    width: 80px;
  }
  #img #chek{
    width: 100%;
    height: 60px;
    line-height: 60px;
    position: absolute;
    bottom: 0;
    left: 0;
    background:#ff5600;
    text-align: center;
    color: #fff;
    font-size: 16px;
    display:none;
  }
  #img:hover #chek{display: block;}
  #img:hover .img{transform:scale(1.2);}


  #load{
    width: 100%;
    height: 30px;
    float: left;
    margin: 30px 0 20px 0;
  }
  #load h4{
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin: 0px auto;
    background: #ff9119;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    border-radius: 14px;
  }
</style>