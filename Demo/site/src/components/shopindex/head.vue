<template>
  <div id="hea-warp">
    <div id="hea">
      <!-- <div class="hea-top"><img src="../../image/shop01.png"/></div> -->
      <div class="hea-center">
        <div id="logo"><img src="../../image/shop-logo.png"/></div>
        <input type="text" id="txt" v-model="value" autocomplete="off"><div id="sear" @click="$router.push('/lis?name='+value)">搜索</div>
        <div id="hea-right" @click="car()">
          <i class="iconfont">&#xe73d;</i><span>我的购物车</span><div>{{checkNum}}</div>
        </div>
        <!-- <div id="right"><img src="../../image/shop-weima.png"/>扫码享受优惠</div> -->
        <ul id="hea-ul">
          <li @click="$router.push('/lis?name='+'美的')">美的</li>
          <li @click="$router.push('/lis?name='+'茅台')">茅台</li>
          <li @click="$router.push('/lis?name='+'乐美')">乐美</li>
          <li @click="$router.push('/lis?id='+0)" style="color:#ff0000">企业采购</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "hea",
    data(){
      return{
        value:'美的',
        carList:[]
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
      
      //我的购物车
      car(){
        if(localStorage.phone === "" || localStorage.phone === undefined){
          this.$router.push('/login');
        }else{
          this.$router.push('/joincar');
        }
      },
    },
    mounted(){
      this.getCar();
    }
  }
</script>

<style scoped>
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
  #hed-ul li:hover{color:#ff0000;}
  #hea-nav{height: 40px;line-height: 40px;margin-left: 230px;}
  #hea-nav li{margin-left: 35px;float:left;font-weight: bold;font-size: 14px;color:#313131;}
</style>
