<template>
  <div id="head-warp">
    <div id="head">
      <div id="head-top">
        <input type="text" id="txt" v-model="value" autocomplete="off" @keyup.enter="searchEnter">
        <div id="sear" @click="$router.push('/li?name='+value)">搜索</div>
        <div id="head-car" @click="car()">
          <i class="iconfont">&#xe73d;</i><span>我的购物车</span>
        </div>
        <ul id="head-ul">
          <li @click="$router.push('/li?name='+'美的')">美的</li>
          <li @click="$router.push('/li?name='+'康佳')">康佳</li>
          <!-- <li @click="$router.push('/li?name='+'铛铛惊喜')">铛铛惊喜</li> -->
          <li @click="$router.push('/li?name='+'苏泊尔')">苏泊尔</li>
          <li @click="$router.push('/li?name='+'双肩包')">双肩包</li>
        </ul>
        <ul id="head-li">
          <li><a>首页</a></li>
          <li><a>品牌商家</a></li>
          <li @click="$router.push('/sale')"><a>销量排行</a></li>
          <li @click="$router.push('/band')"><a>新品排行</a></li>
          <li @click="$router.push('/li?id='+0)"><a>铛铛精品</a></li>
          <li><a href="http://www.7dangdang.com/yxzk/list.php?catid=12">铛铛案例</a></li>
          <li><a href="http://www.7dangdang.com/mtzx/list.php?catid=19">铛铛新闻</a></li>
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
      
      //实现输入框回车页面跳转实现搜索
      searchEnter:function(e){
        var keyCode = window.event? e.keyCode:e.which;
        if(keyCode == 13){
            this.$router.push('/li?name='+this.value)
        }
      }
    },
    mounted(){
 
    }
  }
</script>

<style scoped>
  #head-warp{width: 100%;}
  #head{
    width: 1100px;
    height: 145px;
    margin: 0 auto;
  }
  #head #head-top{height: 100%;width: 100%;}
  #head-top #txt{
    width: 615px;
    height: 35px;
    line-height: 35px;
    color: #333;
    margin-left: 245px;
    margin-top: 30px;
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
    margin-top: 30px;
    border: 0;
    background: #e57339;
    cursor: pointer;
    border-radius: 25px;
    margin-left: -110px;
  }
  #head-car{
    width: 180px;
    height: 35px;
    margin-top:30px;
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
    padding-left: 200px;
    padding-right: 200px;
    box-sizing: border-box;
  }
  #head-li li{
    float: left;
    font-size: 14px;
    margin-left: 45px;
    cursor: pointer;
  }
  #head-li li a{color: #333;}
</style>
