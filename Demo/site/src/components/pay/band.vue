<template>
  <div id="band-warp">
    <!-- <div id="band">
      <div id="band-top">
        <p>品牌商家</p>
        <mark>超值大牌  优惠升级</mark>
        <span>更多品牌商家>></span>
      </div>
      <div id="band-img">
        <div id="img">
          <p>海外制造商</p>
          <mark></mark>
          <span>9.9元起</span>
          <img src='../../image/img.png'/>
        </div>
        <div id="img">
          <p>海外制造商</p>
          <mark></mark>
          <span>9.9元起</span>
          <img src='../../image/img.png'/>
        </div>
        <div id="img">
          <p>美的制造商</p>
          <mark></mark>
          <span>9.9元起</span>
          <img src='../../image/img.png'/>
        </div>
        <div id="img">
          <p>美的制造商</p>
          <mark></mark>
          <span>9.9元起</span>
          <img src='../../image/img.png'/>
        </div>

      </div>
      
    </div> -->

  </div>

</template>

<script>
    export default {
      name: "band",
      data(){
        return{

        }
      },
      methods:{
        
      },
      mounted(){
        
      }

    }
</script>

<style scoped>
  #band-warp{width: 100%;}
  #band{
    width: 1100px;
    height: 400px;
    margin: 0 auto;
  }
  #band #band-top{width: 100%;height: 80px;}
  #band-top p{
    font-size: 24px;
    color: #000;
    margin-left: -160px;
    margin-top: 30px;
    float: left;
    border-bottom: 1px solid #ea5006;
  }
  #band-top mark{
    font-size: 14px;
    color: #666;
    margin-left: -50px;
    margin-top: 45px;
    float: left;
    background: #fff;
  }
  #band-top span{
    font-size: 14px;
    color: #666;
    margin-top: 45px;
    margin-right: 30px;
    float: right;
    cursor: pointer;
  }
  #band #band-img{width: 100%;height: 320px;cursor: pointer;}
  #band-img #img:nth-of-type(1){
    width: 360px;
    height: 100%;
    float: left;
    margin-left: -175px;
    background: #f6f7fb;
  }
  #img:nth-of-type(1) p{
    width: 100%;
    font-size: 24px;
    color: #666;
    text-align: center;
    margin-top: 50px;
    background: url("../../image/band.png") no-repeat 245px 0px;
  }
  #img:nth-of-type(1) mark{
    display: block;
    width: 60px;
    height: 1px;
    background: #666;
    margin: 15px auto;
  }
  #img:nth-of-type(1) span{
    width: 100%;
    font-size: 14px;
    color: #666;
    margin-top: 10px;
    text-align: center;
    display: block;
  }
  #img:nth-of-type(1) img{
    width: 130px;
    height: 130px;
    margin: 25px 0 0 115px;
  }
  
  #band-img #img:nth-of-type(2){
    width: 360px;
    height: 100%;
    float: left;
    margin-left: 10px;
    background: #fdf6f2;
  }
  #img:nth-of-type(2) p{
    width: 100%;
    font-size: 24px;
    color: #666;
    margin-top: 50px;
    text-align: center;
    background: url("../../image/band.png") no-repeat 245px 0px;
  }
  #img:nth-of-type(2) mark{
    display: block;
    width: 60px;
    height: 1px;
    background: #666;
    margin: 15px auto;
  }
  #img:nth-of-type(2) span{
    width: 100%;
    font-size: 14px;
    color: #666;
    margin-top: 10px;
    text-align: center;
    display: block;
  }
  #img:nth-of-type(2) img{
    width: 130px;
    height: 130px;
    margin: 25px 0 0 115px;
  }

  #band-img #img:nth-of-type(3){
    width: 360px;
    height: 155px;;
    float: left;
    margin-left: 10px;
    background: #f6f7fb;
  }

  #img:nth-of-type(3) p{
    font-size: 24px;
    color: #666;
    margin-top: 25px;
    margin-left: 20px;
    display: block;
  }
  #img:nth-of-type(3) mark{
    display: block;
    width: 60px;
    height: 1px;
    background: #666;
    margin-left: 20px;
    margin-top: 10px;
  }
  #img:nth-of-type(3) span{
    display: block;
    font-size: 14px;
    color: #666;
    margin-left: 20px;
    margin-top: 10px;
  }
  #img:nth-of-type(3) img{
    width: 130px;
    height: 130px;
    margin: -90px 0 0 180px;
  }
  #band-img #img:nth-of-type(4){
    width: 360px;
    height: 155px;
    float: left;
    margin-left: 10px;
    margin-top: 10px;
    background: #eaeff1;
  }
  #img:nth-of-type(4) p{
    font-size: 24px;
    color: #666;
    margin-top: 25px;
    margin-left: 20px;
    display: block;
  }
  #img:nth-of-type(4) mark{
    display: block;
    width: 60px;
    height: 1px;
    background: #666;
    margin-left: 20px;
    margin-top: 10px;
  }
  #img:nth-of-type(4) span{
    display: block;
    font-size: 14px;
    color: #666;
    margin-left: 20px;
    margin-top: 10px;
  }
  #img:nth-of-type(4) img{
    width: 130px;
    height: 130px;
    margin: -90px 0 0 180px;
  }


</style>
