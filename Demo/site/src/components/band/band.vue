<template>
<div>
  <div id="head-warp">
    <div id="head">
       <div id="head-top">
        <input type="text" id="txt" v-model="search" autocomplete="off" @keyup.enter="searchEnter"/>
        <div id="sear" @click="getSearch()">搜索</div>
        <div id="head-car" @click="car()">
          <i class="iconfont">&#xe73d;</i><span>我的购物车</span>
        </div>
        <ul id="head-ul">
          <li @click="getSea('美的')">美的</li>
          <li @click="getSea('康佳')">康佳</li>
          <li @click="getSea('苏泊尔')">苏泊尔</li>
          <li @click="getSea('双肩包')">双肩包</li>
        </ul>
        <ul id="head-li">
          <li @click="$router.push('/sale')">销售排行</li>
          <li style="color:#e57339">新品排行</li>
        </ul>
        <div id="head-left" @click="$router.push('/')">
          <div id="logo-img">
            <img src="../../image/s-logo.png"/>
          </div>
          <p>精品B2B企业礼品采购平台</p>
        </div>
      </div>
    </div>
  </div>

  <div id="list-warp" v-show="Show">
    <div id="list">
      <div id="list-img">
        <div id="img" v-for="item in maxList" @click="openShop(item.ProId)" :key="item.ProId">
          <div class="img">
             <img :src="item.ProImg | imgUrl"/>
          </div>
          <p>零售价：<mark>￥{{item.MarketPrice}}</mark></p>
          <p><mark>新款</mark>{{item.ProName}}</p>
          <div style="width:100%;height:18px;">
            <span  v-show="show">
              <mark>尊</mark>
              {{item.EnjoyPrice.substr(0,item.EnjoyPrice.length-1)}}
              <i>{{item.EnjoyPrice.substring(item.EnjoyPrice.length-1)}}</i>
            </span>
            <span  v-show="show">
              <mark>标</mark>
              {{item.VipPrice.substr(0,item.VipPrice.length-1)}}
              <i>{{item.VipPrice.substring(item.VipPrice.length-1)}}</i>
            </span>
          </div>
          <div style="width:100%;height:18px; margin-top: 10px; margin-bottom: 10px;">
            <a  v-show="show">销量：{{item.prosum}}</a>
            <a  v-show="show">库存：{{item.repertory}}</a>
          </div>
          <div id="chek">查看商品详情</div>
        </div>
      </div>
    </div>
  </div>
  <div id="Load" v-show="hdie">
    <h4 @click="load()">加载更多>></h4>
  </div>
  <div id="Load" v-show="Hidd">
    <h4 @click="Loadmore()">加载更多>></h4>
  </div>

  <div v-show="Hide" id="show">
    <i></i>
    <p id="art">商品已售完或下架了，去看看其他好货吧···</p>
  </div>
</div>
</template>

<script>
  export default {
    name: "list",
    data(){
      return{
        Hide:false,
        Show:true,
        hdie:false,
        show:false,
        Hidd:true,
        maxList:[],
        search:'',
        page:0,
        ppage:0,
      }
    },
    beforeRouteLeave(to,from,next){        
      if(to.name==='detail'){            
        if(!from.meta.keepAlive){                
          from.meta.keepAlive=true;//当我们进入到C时开启B的缓存            
        }
        console.log(to.name,21121)            
        next()        
        }else{            
          from.meta.keepAlive=false;            
          this.$destroy();//销毁B的实例            
          next();//当我们前进的不是C时我们让B页面刷新        
        }    
    },

    methods:{
      //我的购物车
      car(){
        if(localStorage.phone === "" || localStorage.phone === undefined){
          this.$router.push('/login');
        }else{
          this.$router.push('/joincar');
        }
      },

       //刚进入页面显示销售列表
      getGoods(){
        this.$ajax.post("/person/presellGood",{
          page:++this.page,
          putaway:1,
        }).then(data=>{
          this.maxList=this.maxList.concat(data.data.data);
          if(this.page>=data.data.last_page){
            this.Show=true;
            this.Hidd=false;
          }else{
            this.Show=true;
          };
        })
      },
      Loadmore(){
        this.getGoods();
      },






     

       //点击搜索显示对应类别的商品列表
      getPreGood(){
        this.$ajax.post("/person/presellGood",{
          page:++this.ppage,
          putaway:1,
          search:this.search
        }).then(data=>{
          this.maxList=this.maxList.concat(data.data.data);
          if(this.ppage>=data.data.last_page){
            this.Hide=false;
            this.Show=true;
            this.hdie=false;
            this.Hidd=false;
          }else{
            this.Hide=false;
            this.Hidd=false;
            this.Show=true;
            this.hdie=true;
          };
        })
      },

      load(){
        this.getPreGood();
      },



      //根据关键字名字搜索
      getSea(search){
        this.search=search;
        this.ppage=0,
        this.maxList=[],
        this.getPreGood();
      },




      //根据搜索框搜索
      getSearch(){
        this.search=this.search;
        this.ppage=0,
        this.maxList=[],
        this.getPreGood();
      },

    
      //实现输入框回车页面跳转实现搜索
      searchEnter:function(e){
        var keyCode = window.event? e.keyCode:e.which;
        if(keyCode == 13){
            this.search=this.search;
            this.ppage=0,
            this.maxList=[],
            this.getPreGood();
        }
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
      this.getGoods();
      // this.setTimer();
      if(localStorage.phone == "" || localStorage.phone == undefined){
        this.show=false;
      }else{
        this.show=true;
      };
    },
  }
</script>
 
<style scoped>

  #head-warp{width: 100%;}
  #head{
    width: 1100px;
    height: 160px;
    margin: 0 auto;
    position: relative;
  }
  #head #head-top{height: 100%;width: 100%;}
  #head-top #txt{
    width: 615px;
    height: 35px;
    line-height: 35px;
    color: #000;
    margin-left: 245px;
    margin-top: 40px;
    text-indent: 15px;
    border: 1px solid #e57339;
    border-radius: 25px;
    outline: none;
    font-size: 12px;
    float: left;
  }
  #head-top #sear{
    width: 110px;
    height: 35px;
    line-height: 35px;
    color: #fff;
    float: left;
    font-size: 14px;
    text-align: center;
    margin-top: 40px;
    border: 0;
    background: #e57339;
    cursor: pointer;
    border-radius: 25px;
    margin-left: -110px;
  }
  #head-car{
    width: 180px;
    height: 35px;
    margin-top:40px;
    border: 1px solid #e57339;
    float: left;
    border-radius: 25px;
    margin-left: 15px;
    font-size: 14px;
    cursor: pointer;
  }
  #head-car i{
    font-size: 14px;
    color: #e57339;
    line-height: 33px;
    float: left;
    margin-left: 50px;
  }
  #head-car span{
    color: #e57339;
    line-height: 35px;
    float: left;
    font-size: 12px;
  }
  #head-car div{
    width: 15px;
    height: 15px;
    line-height: 15px;
    font-size: 8px;
    border-radius: 50%;
    background: #ec652b;
    float: left;
    color: #fff;
    text-align: center;
    margin-top: 10px;
  }

  #head-ul{
    float: left;
    width:300px;
    margin-left: 245px;
    margin-top: 5px;
  }
  #head-ul li:nth-of-type(1){margin-left: 15px;}
  #head-ul li{
    float: left;
    font-size: 12px;
    margin-left: 10px;
    color: #666;
    cursor: pointer;
  }

  #head-li{
    float: left;
    width:100%;
    margin-top: 30px;
  }
  #head-li li:nth-of-type(1){margin-left: 10px;}
  #head-li li{
    float: left;
    font-size: 14px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    margin-left: 40px;
    color: #333;
    cursor: pointer;
    font-weight: bold;
  }
  #head #head-left{
    width: 175px;
    height: 140px;
    float: left;
    position: absolute;
    left: 0;
    top: -40px;
    background: #fff;
    box-shadow: 1px 0px 6px 0px rgba(0,0,0,.10);
    cursor: pointer;
  }
  #head-left #logo-img{
    width: 85px;
    height: 110px;
    margin: 0 auto;
    border-bottom: 1px solid #f8f8f8;
  }
  #logo-img img{margin-top: 15px;}
  #head-left p{
    width: 100%;
    margin-top: 5px;
    text-align: center;
    color: #666;
    font-size: 12px;
  }



  #list-warp{width: 100%;}
  #list{
    width: 1100px;
    margin: 0 auto;
    position: relative; 
  }
  
  #list-img{
    width: 100%;
    float: left;
    min-height: 300px;
  }
  #list-img #img{
    width: 210px;
    min-height: 290px;
    max-height: 332px;
    float: left;
    margin-top: 10px;
    margin-left: 9px;
    background: #fff;
    border: 1px solid #fff;
    transition: all 0.4s ease-in-out;
    position: relative;
    cursor: pointer;
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
    text-indent: 15px;
    font-size: 12px;
    color: #b9b9b9;
  }
  #img p:nth-of-type(1) mark{
    background: #fff;
    text-decoration: line-through;
    color: #b9b9b9;
  }
  #img p:nth-of-type(2){
    font-size: 12px;
    color: #626262;
    margin: 10px auto;
    line-height: 18px;
    width: 180px;
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
    background: #fff;
    margin-right: 5px;
    font-weight: normal;
    border-radius: 3px;
    
  }
  #img span:nth-of-type(1){
    font-size: 12px;
    color: #ff5b00;
    margin-left: 15px;
    float: left;
    font-weight: bold;
  }
  #img span:nth-of-type(2){
    font-size: 12px;
    color: #f4a76d;
    float: right;
    margin-right: 15px;
    font-weight: bold;
  }
  #img span:nth-of-type(1) mark{
    display: inline-block;
    color: #fff;
    width: 20px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    background: #ff5b00;
    margin-right: 5px;
    border-radius: 50%;
    font-weight: normal;
  }
  #img span:nth-of-type(1) i{
    color: #ff5b00;
    margin-left: -3px;
    opacity: 0.2;
    font-style: normal;
  }


  #img span:nth-of-type(2) mark{
    display: inline-block;
    color: #fff;
    width: 20px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    background: #f4a76d;
    margin-right: 5px;
    border-radius: 50%;
    font-weight: normal;

  }
  #img span:nth-of-type(2) i{
    color: #ff5b00;
    margin-left: -3px;
    opacity: 0.2;
    font-style: normal;
  }

  #img a:nth-of-type(1){
    font-size: 12px;
    color: #b9b9b9;
    float: left;
    margin-left: 15px;
    font-weight: bold;
  }
  #img a:nth-of-type(2){
    font-size: 12px;
    color: #b9b9b9;
    float: right;
    margin-right: 15px;
    font-weight: bold;
  }
  #img #chek{
    width: 100%;
    height: 65px;
    line-height: 65px;
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


  #Load{
    width: 100%;
    height: 30px;
    float: left;
    margin-top: 50px;
  }
  #Load h4{
    width: 125px;
    height: 30px;
    line-height: 30px;
    margin: 0px auto;
    background: #e57339;
    text-align: center;
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    border-radius: 14px;
    font-weight: normal;
  }

  #show{
    width: 100%;
    height: 200px;
    /* background: tan; */
    margin-top:100px;
    float: left;
  }
  #show i{
    display: block;
    width: 65px;
    height: 65px;
    margin: 20px auto;
    background: url('../../image/show.png');
   }
  #show #art{
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
  }

</style>