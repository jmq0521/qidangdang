<template>
  <div id="aside">
    <div id="aside-one">
      <img src="../../image/aside.png"/>
    </div>
    <div id="aside-two">
       <i class="iconfont" @click="$router.push('/joincar')">&#xe73d;</i>
    </div>
    <div id="aside-three">
      <i class="iconfont">&#xe731;</i>
    </div>
    <div id="aside-four">
      <i class="iconfont">&#xe633;</i>
    </div>
     <div id="aside-five">
      <i class="iconfont">&#xe630;</i>
    </div>
     <div id="aside-six">
      <span>意见反馈</span>
    </div>
  </div>

</template>

<script>
  export default {
    name: "vit",
    data() {
      return {
       
      }
    },
    methods:{
      
    },
    mounted(){
      $("#aside-four").click(function() {
        $("body,html").animate({
          scrollTop: 0
        }, "fast");
      })
    }
  }
</script>

<style scoped>
  #aside{
    width: 50px;
    height: 300px;
    position: fixed;
    top: 450px;
    right: 0;
  }
  #aside #aside-one{
    width: 100%;
    height: 50px;
  }
  #aside-one img{
    width: 100%;
    height: 100%
  }
  #aside #aside-two{
    width: 100%;
    height: 50px;
    float: left;
    cursor: pointer;
  }
  #aside-two .iconfont{
   display: block;
   margin: 10px 0 0 15px;
   color: #bfbfbf;
   font-size:20px;
  }
  #aside #aside-three{
    width: 100%;
    height: 50px;
    float: left;
    cursor: pointer;
  }
  #aside-three .iconfont{
   display: block;
   margin: 10px 0 0 15px;
   color: #bfbfbf;
   font-size:20px;
  }
  #aside #aside-four{
    width: 100%;
    height: 50px;
    float: left;
    cursor: pointer;
  }
  #aside-four .iconfont{
   display: block;
   margin: 10px 0 0 15px;
   color: #bfbfbf;
   font-size:20px;
  }
  #aside #aside-five{
    width: 100%;
    height: 50px;
    float: left;
    cursor: pointer;
    background: #ff9119;
  }
  #aside-five .iconfont{
   display: block;
   margin: 10px 0 0 15px;
   color: #bfbfbf;
   font-size:20px;
  }
  #aside #aside-six{
    width: 100%;
    height: 50px;
    float: left;
    cursor: pointer;
  }
  #aside-six span{
    display: block;
    width: 30px;
    margin: 10px 0 0 15px;
    
   
  }
</style>

