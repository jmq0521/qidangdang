<template>
  <div id="home-warp">
    <div id="home-shop">
      <div id="home" v-for="item in homeList" :key="item.id">
        <div id="home-top" >
          <div></div>
          <h4>{{item.name}}</h4>
          <ul id="home-ul">
            <li v-for="li in item.children" :key="li.category_id" @click="$router.push('/lis?sub_id='+li.category_id)">{{li.name}}</li>
            <li @click="$router.push('/lis?sub_id='+item.children[0].category_id)">查看更多&gt;</li>
          </ul>
        </div>
        <div id="home-left" >
          <img :src="item.img_url | imgUrl"/>
        </div>
        <div id="home-img">
          <div id="img" v-for="(img,index) in item.data" :key="img.ProId" v-if="index < 8" @click="openShop(img.ProId)">
            <div class="img">
              <img :src="img.ProImg | imgUrl"/>
            </div>
            <p>零售价：<mark>￥{{img.MarketPrice}}</mark></p>
            <p><mark>新款</mark>{{img.ProName}}</p>
            <span><mark>尊</mark>{{img.EnjoyPrice}}</span>
            <span><mark>标</mark>{{img.VipPrice}}</span>
            <!-- <a>销量：{{img.prosum}}</a>
            <a>库存：{{img.kucun}}</a> -->
            <div id="chek">查看商品详情</div>
          </div>
        </div>
      </div>




      <div id="home1">
        <div id="home1-top">
          <div style="background: #601986"></div>
          <h4 style="color: #601986">更多采购</h4>
        </div>
        <div id="home1-img">
          <div id="img1"  @click="openShop(item .ProId)" v-for="(item,index) in floorList" :key="index">
            <div class="img1">
             <img :src="item.ProImg | imgUrl"/>
            </div>
            <p>零售价：<mark>￥{{item.MarketPrice}}</mark></p>
            <p><mark>新款</mark>{{item.ProName}}</p>
            <span><mark>尊</mark>{{item.EnjoyPrice}}</span>
            <span><mark>标</mark>{{item.VipPrice}}</span>
            <!-- <a>销量：{{item.prosum}}</a>
            <a>库存：{{item.repertory}}</a> -->
            <div id="chek">查看商品详情</div>
          </div>
        </div>
      </div>
      <div id="load">
        <h4 @click="load()">加载更多>></h4>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "home",
      data(){
        return{
          homeList:[],
          floorList:[],
          page:0,
          code:''
        }
      },
      methods:{
        //个人中心状态值
        getCenter(){
          this.$ajax.post("/Person/userCentre",{},{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.code=data.error_code
          })
        },
        //显示采购商城的列表
        getHome(){
          this.$ajax.get("/vitation/indexFloor",{}).then(data=>{
            this.homeList=data.data;
          })
        },
        loadMore(){
          this.$ajax.post("/person/presellGood",{
            page:++this.page
          }).then(data=>{
              this.floorList=this.floorList.concat(data.data.data);
          })
        },
        load(){
          this.loadMore();
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
        this.getHome();
        this.loadMore();
        this.getCenter();
      }
    }
</script>
  

<style scoped>
  #home-warp{width: 100%;background: #f8f8f8;padding-bottom: 35px;box-sizing: border-box}
  #home-shop{width: 1200px;min-height: 730px;margin: 0 auto;overflow: hidden;}
  #home{width: 100%;height: 590px;margin-top: 30px;float: left;}
  #home-top{width: 100%;height: 70px;float: left;margin-top: 5px;}
  #home-top h4{font-size: 14px;margin-top: 10px;float: left;}
  #home-top div{width: 3px;height: 13px;float: left;margin:14px 5px 0 5px}
  #home-top #home-ul{
    float:left;
    display:block;
    height: 30px;
    line-height: 30px;
    margin-top: 40px;
    margin-left: -75px;
  }
  #home-ul li{float:left;font-size: 14px;margin-left: 20px;color: #626262;cursor: pointer;}




  #home-left{width: 380px;height: 500px;float: left;margin-top:10px;}
  #home-left img{width: 100%;height: 100%;}
  #home-img{
    width: 820px;
    height: 500px;
    background: #f5f5f5;
    cursor: pointer;
    float: left;
    margin-top:10px;
  }
  #home-img #img{
    width: 190px;
    height: 245px;
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    background: #ffffff;
    border: 1px solid #ffffff;
    transition: all 0.4s ease-in-out;
    position: relative;
  }
  #img .img{
    width: 100%;
    height: 130px;
    position: relative;
    margin-top: 10px;
  }
  .img img{
    width: 100px;
    height: 100px;
    position: absolute;  
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;  
    margin: auto;
  }
  #img p:nth-of-type(1){
    width: 100%;
    text-indent: 10px;
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
    margin-left: 10px;
    width: 80px;
    font-size: 12px;
    color: #ff5b00;
    display: inline-block;
  }
  #img span:nth-of-type(2){
    margin-left: 10px;
    width: 80px;
    font-size: 12px;
    color: #f4a76d;
    display: inline-block;
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
    width: 80px;
    margin-top: 10px;
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
    height: 55px;
    line-height: 55px;
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
  #img:hover{border: 1px solid #ff9119;}
  #img:hover .img{transform:scale(1.2);}




  #home:nth-of-type(1) #home-top div{background:#6378de}
  #home:nth-of-type(1) #home-top h4{color:#6378de}
  #home:nth-of-type(2) #home-top div{background: #ec6941;}
  #home:nth-of-type(2) #home-top h4{color: #ec6941;}
  #home:nth-of-type(3) #home-top div{background: #009e96;}
  #home:nth-of-type(3) #home-top h4{color: #009e96;}
  #home:nth-of-type(4) #home-top div{background: #d362f3;}
  #home:nth-of-type(4) #home-top h4{color: #d362f3;}
  #home-img #img:nth-of-type(1){margin-top: 0}
  #home-img #img:nth-of-type(2){margin-top: 0}
  #home-img #img:nth-of-type(3){margin-top: 0}
  #home-img #img:nth-of-type(4){margin-top: 0}



  #home-shop #home1{width: 100%;min-height: 520px;margin-top: 10px;float: left;}
  #home1 #banner-img{width: 100%;height: 90px;float: left;margin-top: 20px;}
  #banner-img img{width: 100%;height: 100%;}
  #home1-top{width: 100%;height: 30px;float: left;margin-top: 15px;}
  #home1-top h4{font-size: 16px;margin-top: 10px;float: left;}
  #home1-top div{width: 3px;height: 13px;float: left;margin:14px 5px 0 10px}
  #home1-img{width: 100%;min-height: 525px;cursor: pointer;float: left;}
  #home1-img{
    width: 100%;
    cursor: pointer;
    float: left;
    margin-top:10px;
  }
  #home1-img #img1{
    width: 225px;
    height: 245px;
    float: left;
    margin-top: 10px;
    margin-left: 10px;
    background: #ffffff;
    border: 1px solid #ffffff;
    transition: all 0.4s ease-in-out;
    position: relative;
  }
  #img1 .img1{
    width: 100%;
    height: 130px;
    position: relative;
    margin-top: 10px;
  }
  .img1 img{
    width: 100px;
    height: 100px;
    position: absolute; 
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;  
    margin: auto;
  }
  #img1 p:nth-of-type(1){
    width: 100%;
    text-indent: 20px;
    font-size: 12px;
    color: #b9b9b9;
  }
  #img1 p:nth-of-type(1) mark{
    background: #ffffff;
    text-decoration: line-through;
    color: #b9b9b9;
  }
  #img1 p:nth-of-type(2){
    font-size: 12px;
    color: #626262;
    margin: 10px auto;
    line-height: 18px;
    width: 180px;
    font-weight: bold;
    height: 35px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  #img1 p:nth-of-type(2) mark{
    color: #ff0000;
    border: 1px solid #ff0000;
    display: inline-block;
    width: 35px;
    height: 18px;
    line-height: 16px;
    text-align: center;
    font-size: 12px;
    background: #ffffff;
    margin-right: 5px;
    font-weight: normal;
    border-radius: 3px;
  } 
  #img1 span:nth-of-type(1){
    margin-left: 20px;
    width: 80px;
    font-size: 12px;
    color: #ff5b00;
    display: inline-block;
  }
  #img1 span:nth-of-type(2){
    margin-left: 20px;
    width: 80px;
    font-size: 12px;
    color: #f4a76d;
    display: inline-block;
  }
  #img1 span:nth-of-type(1) mark{
    display: inline-block;
    color: #ffffff;
    width: 20px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    background: #ff5b00;
    border-radius: 50%;
    margin-right: 5px;
  }
  #img1 span:nth-of-type(2) mark{
    display: inline-block;
    color: #ffffff;
    width: 20px;
    height: 18px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    background: #f4a76d;
    border-radius: 50%;
    margin-right: 5px;
  }
  #img1 a:nth-of-type(1){
    margin-left: 30px;
    font-size: 12px;
    color: #b9b9b9;
    display: inline-block;
    margin-top: 10px;
    width: 80px;
  }
  #img1 a:nth-of-type(2){
    margin-left: 30px;
    font-size: 12px;
    color: #b9b9b9;
    display: inline-block;
    margin-top: 10px;
    width: 80px;
  }

  #img1 #chek{
    width: 100%;
    height: 55px;
    line-height: 55px;
    position: absolute;
    bottom: 0;
    left: 0;
    background:#ff5600;
    text-align: center;
    color: #fff;
    font-size: 16px;
    display:none;
  }
  #img1:hover #chek{display: block;}
  #img1:hover{border: 1px solid #ff9119;}
  #img1:hover .img1{transform:scale(1.2);}










  #load{
    width: 100%;
    height: 30px;
    float: left;
    margin-top: 20px;
  }
  #load h4{
    width: 100px;
    height: 30px;
    line-height: 30px;
    margin: 0 auto;
    background: #ff5600;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    cursor: pointer;
    border-radius: 14px;

  }
</style>
