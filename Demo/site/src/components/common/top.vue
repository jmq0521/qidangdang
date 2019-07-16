<template>
  <div id="resgier-top">
    <div id="top">
      <div id="logo">
        <img src="../../image/l-logo.png" @click="$router.push('/')">
        <p>诚邀你加入企铛铛</p>
      </div>
      <div id="resgier-right">
        <p id="right-p">企铛铛商城APP下载</p>
        <ul id="resgier-ul">
          <!-- <li @click="$router.push('/login')">登录官网</li> -->
          <li @click="$router.push('/off')">关于我们</li>
        </ul>
        <div id="lod">
          <img src="../../image/app.png" class="img"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "top",
      data(){
        return{

        }
      },
      mounted(){
          //联系客服
        $("#right-p").mouseenter(function(){
          $("#lod").css("display","block");
        });
        $("#right-p").mouseleave(function(){
          $("#lod").css("display","none")
          
        });
      }
    }
</script>

<style scoped>
  #resgier-top{width: 100%;height: 80px;}
  #resgier-top #top{
    width: 1200px;
    height: 80px;
    margin: 0 auto;
    position: relative;
  }
  #top #logo{width: 455px;height: 100%;float: left;}
  #logo img{float: left;margin-top: 15px;}
  #logo p{
    height: 80px;
    line-height: 80px;
    margin-left:35px;
    float: left;
    color: #ccc;
    font-size: 14px;
  }
  #resgier-top #resgier-right{width: 260px;height: 100%;float: right;}
  #resgier-right p{
    float: left;
    font-size: 14px;
    height: 100%;
    line-height: 80px;
    color: #999;
    cursor: pointer;
  }
  #resgier-right p:hover{color: #e57339}
  #resgier-right #resgier-ul{float: left; line-height: 80px;}
  #resgier-ul li{float: left;margin-left: 65px;color: #999;font-size: 14px;cursor: pointer}
  #resgier-ul li:hover{color: #e57339}
  #lod{
    width: 200px;
    height: 200px;
    position: absolute;
    top: 80px;
    right: 95px;
    display: none;
    z-index: 999;
    background: url('../../image/log.png') no-repeat;
  
  }
  #lod .img{
    width: 170px;
    height: 170px;
    margin: 20px 0 0 10px;
  }
 
</style>
