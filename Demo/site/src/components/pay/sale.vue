<template>
  <div id="sale-warp">
    <div id="sale">
      <div id="sale-top">
        <p>销量排行</p>
        <mark>销量冠军  购物指南</mark>
        <span  @click="$router.push('/sale')">更多销量排行>></span>
      </div>
      <div id="sale-img">
        <div id="sale-left">
          <h6><mark></mark>销量排行榜<mark></mark></h6>
          <div id="sale-box">
            <p>企铛铛平台销量排行榜</p>
            <span>{{Math.floor(Math.random()*1000000)}}人已看</span>
          </div>
        </div>
         <div id="sale-right">
            <el-carousel indicator-position="none" height="270px" style="z-index:0">
              <el-carousel-item>
                <div id="img" v-for="(item,index) in maxList.max_product" v-if="index<4" @click="openShop(item.ProId)" :key="item.ProId">
                  <img :src="item.ProImg | imgUrl"/>
                  <span>热销</span>
                  <p>{{item.ProName}}</p>
                </div>
               
              </el-carousel-item>
              <el-carousel-item >
                 <div id="img" v-for="(item,index) in maxList.max_product" v-if="index<4" @click="openShop(item.ProId)" :key="item.ProId">
                  <img :src="item.ProImg | imgUrl"/>
                  <span>热销</span>
                  <p>{{item.ProName}}</p>
                </div>
              </el-carousel-item>
            </el-carousel>
        </div>
      </div>
      
    </div>
    <div id="sale">
      <div id="sale-top">
        <p>新品排行</p>
        <mark>新品直供  精挑细选</mark>
        <span  @click="$router.push('/band')">更多新品排行>></span>
      </div>
      <div id="sale-img">
        <div id="sale-left">
          <h6><mark></mark>新品排行榜<mark></mark></h6>
          <div id="sale-box">
            <p>企铛铛平台新品排行榜</p>
            <span>{{Math.floor(Math.random()*1000000)}}人已看</span>
          </div>
        </div>
        <div id="sale-right">
            <el-carousel indicator-position="none" height="270px" style="z-index:0">
              <el-carousel-item>
                <div id="img" v-for="(item,index) in maxList.new_product" v-if="index<4" @click="openShop(item.ProId)" :key="item.ProId">
                  <img :src="item.ProImg | imgUrl"/>
                  <span>新品</span>
                  <p>{{item.ProName}}</p>
                </div>
              </el-carousel-item>
              <el-carousel-item>
                <div id="img" v-for="(item,index) in maxList.new_product" v-if="index<4" @click="openShop(item.ProId)" :key="item.ProId">
                  <img :src="item.ProImg | imgUrl"/>
                  <span>新品</span>
                  <p>{{item.ProName}}</p>
                </div>
              </el-carousel-item>
            </el-carousel>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
    export default {
      name: "sale",
      data(){
        return{
          maxList:[]
        }
      },
      methods:{
        //销售列表新品列表
        getGoods(){
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
      }
    }
</script>

<style scoped>
  #sale-warp{width: 100%;}
  #sale{
    width: 1100px;
    height: 350px;
    margin: 0 auto;
    display: block;
  }
  #sale #sale-top{width: 100%;height: 80px;}
  #sale:nth-of-type(2) #sale-top p{margin-left: 20px;}
  #sale-top p{
    font-size: 24px;
    color: #333;
    margin-top: 30px;
    margin-left: -160px;
    float: left;
    border-bottom: 1px solid #ea5006;
  }
  #sale:nth-of-type(2) #sale-top mark{margin-left: 15px;}
  #sale-top mark{
    font-size: 14px;
    color: #666;
    margin-left: -50px;
    margin-top: 45px;
    float: left;
    background: #fff;
  }
  #sale-top span{
    font-size: 14px;
    color: #666;
    margin-top: 45px;
    margin-right: 30px;
    float: right;
    cursor: pointer;
  }
  #sale #sale-img{width: 100%;height: 270px;background: #eef1f7;}
  #sale:nth-of-type(2) #sale-img #sale-left{margin-left: 0;}
  #sale-img #sale-left{width: 365px;height: 100%;float: left;margin-left: -180px;}
  #sale-left h6{
    width: 100%;
    font-size: 24px;
    text-align: center;
    font-weight: normal;
    color: #333;
    margin-top: 65px;
    position: relative;
  }
  #sale-left h6 mark:nth-of-type(1){
    display: inline-block;
    width: 40px;
    height: 2px;
    background: #666;
    position: absolute;
    left: 70px;
    top: 20px;

 
  }
  #sale-left h6 mark:nth-of-type(2){
    display: inline-block;
    width: 45px;
    height: 2px;
    background: #666;
    position: absolute;
    right: 70px;
    top: 20px;
  }

  #sale-left #sale-box{
    width: 290px;
    height: 90px;
    margin: 20px auto;
    border: 2px solid #fff;
  }
  
  #sale-box p{
    width: 100%;
    font-size: 18px;
    text-align: center;
    color: #333;
    margin-top: 20px;
  }
  #sale-box span{
    display: block;
    width: 100%;
    font-size: 12px;
    text-align: center;
    color: #666;
    margin-top: 5px;
    background: url('../../image/sale.png') no-repeat 80px center;
  }
 
  #sale-img #sale-right{width: 725px;height: 100%;float: left;margin-left:-8px;}
  #sale-right #img{
    width: 170px;
    height: 230px;
    background: #fff;
    float: left;
    margin: 20px 0 0 10px;
    cursor: pointer;
    position: relative;
  }
  #img img{
    width: 120px;
    height: 120px;
    margin: 50px 0 0 25px;
  }
  #img span{
    width: 30px;
    height: 18px;
    text-align: center;
    line-height: 18px;
    display: block;
    border-radius: 3px;
    background: #ff0000;
    color: #fff;
    font-size: 12px;
    position: absolute;
    top: 15px;
    right: 15px;

  }
  #img p{
    width: 140px;
    height: 30px;
    margin-left: 15px;
    font-size: 12px;
    line-height: 15px;
    color: #666;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
  }
  #sale:nth-of-type(2)  #sale-img{background: #fcf6f3;}
  #sale:nth-of-type(2)  #sale-img #sale-right #img span{background: #f5aa41;}
</style>
