<template>
  <div id="mark-warp">
    <div id="mark">
      <div id="mark-top">
        <div id="top-left">
          <img src="../../image/mark01.png"/>
        </div>
        <div id="top-right">
          <div id="right-img" v-for="item in maxList.max_product" @click="openShop(item.ProId)" :key="item.ProId">
            <div id="img">
              <img :src="item.ProImg | imgUrl"/>
            </div>
            <p id="mak">零售价：<mark>￥{{item.MarketPrice}}</mark></p>
            <p><mark>新款</mark>{{item.ProName}}</p>
            <span id="enjoy"><mark>尊</mark>{{item.EnjoyPrice}}</span>
            <span id="vip"><mark>标</mark>{{item.VipPrice}}</span>
            <!-- <a id="pro">销量：{{item.prosum}}</a>
            <a id="ku">库存：{{item.kucun}}</a> -->
            <div id="chek">查看商品详情</div>
          </div>
        </div>

      </div>

      <div id="mark-bottom">
        <div id="bottom-left">
          <img src="../../image/mark02.png"/>
        </div>
        <div id="bottom-right">
          <div id="img-right" v-for="item in maxList.new_product"  @click="openShop(item.ProId)" :key="item.ProId">
            <div id="img">
              <img :src="item.ProImg | imgUrl"/>
            </div>
            <p>零售价：<mark>￥{{item.MarketPrice}}</mark></p>
            <p><mark>新款</mark>{{item.ProName}}</p>
            <span><mark>尊</mark>{{item.EnjoyPrice}}</span>
            <span><mark>标</mark>{{item.VipPrice}}</span>
            <!-- <a>销量：{{item.prosum}}</a>
            <a>库存：{{item.kucun}}</a> -->
            <div id="chek">查看商品详情</div>
          </div>
        </div>
      </div>

      <!-- <div id="banner-img">
        <img src="../../image/banner-img.png"/>
      </div> -->
    </div>
  </div>

</template>

<script>
    export default {
      name: "market",
      data(){
        return{
          maxList:[],
          new:[],
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

        getGoods(){
          //销售列表
          this.$ajax.get("/vitation/indexNewProduct",{}).then(data=>{
            this.maxList=data.data;
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
        this.getGoods();
        this.getCenter();
        if(localStorage.phone == "" || localStorage.phone == undefined){
          $("#mak").css("display","none")
        }else{
          $("#mak").css("display","block")
        }

      }

    }
</script>

<style scoped>
  #mark-warp{width: 100%;background: #f8f8f8;}
  #mark{
    width: 1200px;
    min-height: 600px;
    margin: 0 auto;
  }
  #mark-top{
    width: 100%;
    height: 300px;
  }
  #mark-top #top-left{
    width: 199px;
    height: 100%;
    border-right: 1px solid #f8f8f8;
    float: left;
  }
  #top-left img{width: 100%;height: 100%;}
  #mark-top #top-right{
    width: 1000px;
    height: 100%;
    float: left;
  }
  #top-right #right-img{
    width: 194px;
    height: 100%;
    float: left;
    border: 1px solid #f8f8f8;
    cursor: pointer;
    margin-left: 6px;
    background: #ffffff;
    position: relative;
    transition: all 0.4s ease-in-out;
    position: relative;
  }
 
  #right-img #img{
    width: 100%;
    height: 190px;
    position: relative;
    margin-top: 10px;
  }
  #img img{
    width: 150px;
    height: 150px;
    position: absolute;  
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;  
    margin: auto;
  }
  #right-img #mak{
    width: 100%;
    text-indent: 16px;
    font-size: 12px;
    color: #b9b9b9;
  }
  #right-img #mak mark{
    background: #ffffff;
    text-decoration: line-through;
    color: #b9b9b9;
  }
  #right-img p:nth-of-type(2){
    font-size: 12px;
    color: #626262;
    margin: 10px auto;
    line-height: 18px;
    width: 160px;
    font-weight: bold;
    height: 35px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  #right-img p:nth-of-type(2) mark{
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
  #right-img #enjoy{
    margin-left: 18px;
    font-size: 12px;
    color: #ff5b00;
    display: inline-block;
    width: 70px;
  }
  #right-img #vip{
    margin-left: 18px;
    font-size: 12px;
    color: #f4a76d;
    display: inline-block;
    width: 70px;
  }
  #right-img #enjoy mark{
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
  #right-img #vip mark{
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
  #right-img a:nth-of-type(1){
    margin-left: 18px;
    font-size: 12px;
    color: #b9b9b9;
    display: inline-block;
    margin-top: 10px;
    width: 70px;
  }
  #right-img a:nth-of-type(2){
    margin-left: 18px;
    font-size: 12px;
    color: #b9b9b9;
    display: inline-block;
    margin-top: 10px;
    width: 70px;
  }
  #right-img #chek{
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    background:#ff5600;
    text-align: center;
    color: #fff;
    font-size: 16px;
    display:none;
  }
  #right-img:hover #chek{display: block;}
  #right-img:hover{border: 1px solid #ff9119;}
  #right-img:hover #img{transform:scale(1.2);}








  #mark-bottom{
    margin-top: 5px;
    width: 100%;
    height: 300px;
  }
  #mark-bottom #bottom-left{
    width: 199px;
    height: 100%;
    float: left;
  }
  #bottom-left img{width: 100%;height: 100%;}
  #mark-bottom #bottom-right{
    width: 1000px;
    height: 100%;
    float: left;
  }
  #bottom-right #img-right{
    width: 194px;
    height: 100%;
    float: left;
    border: 1px solid #f8f8f8;
    cursor: pointer;
    margin-left: 6px;
    background: #ffffff;
    transition: all 0.4s ease-in-out;
    position: relative;
  }
  #img-right #img{
    width: 100%;
    height: 190px;
    position: relative;
    margin-top: 10px;
  }
  #img img{
    width: 150px;
    height: 150px;
    position: absolute;  
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;  
    margin: auto;
  }
  #img-right p:nth-of-type(1){
    width: 100%;
    text-indent: 18px;
    font-size: 12px;
    color: #b9b9b9;
  }
  #img-right p:nth-of-type(1) mark{
    background: #ffffff;
    text-decoration: line-through;
    color: #b9b9b9;
  }
  #img-right p:nth-of-type(2){
    font-size: 12px;
    color: #626262;
    margin: 10px auto;
    line-height: 18px;
    width: 160px;
    font-weight: bold;
    height: 35px;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  #img-right p:nth-of-type(2) mark{
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
  #img-right span:nth-of-type(1){
    margin-left: 18px;
    font-size: 12px;
    color: #ff5b00;
    display: inline-block;
    width: 70px;
  }
  #img-right span:nth-of-type(2){
    margin-left: 18px;
    font-size: 12px;
    color: #ff5b00;
    display: inline-block;
    width: 70px;
  }
  #img-right span:nth-of-type(1) mark{
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
  #img-right span:nth-of-type(2) mark{
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
  #img-right a:nth-of-type(1){
    margin-left: 18px;
    font-size: 12px;
    color: #b9b9b9;
    display: inline-block;
    margin-top: 10px;
    width: 70px;
  }
  #img-right a:nth-of-type(2){
    margin-left: 18px;
    font-size: 12px;
    color: #b9b9b9;
    display: inline-block;
    margin-top: 10px;
    width: 70px;
  }
  #img-right #chek{
    width: 100%;
    height: 50px;
    line-height: 50px;
    position: absolute;
    bottom: 0;
    left: 0;
    background:#ff5600;
    text-align: center;
    color: #fff;
    font-size: 16px;
    display:none;
  }
  #img-right:hover #chek{display: block;}
  #img-right:hover{border: 1px solid #ff9119;}
  #img-right:hover #img{transform:scale(1.2);}


  #mark #banner-img{width: 100%;height: 90px;margin-top: 30px}
  #banner-img img{width: 100%;height: 100%;}
</style>
