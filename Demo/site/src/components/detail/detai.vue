<template>
  <div id="det">
    <div class="top">
      <a id="a-one">供应商品</a>
      <a id="a-two">需求商品</a>
      <a id="a-three">个人记录</a>
      <div id="box" @click="$router.go(-1)">返回</div>
    </div>
    <div id="pane-one">
      <div id="one-left">
        <img src="../../image/banner02.png"/>
        <p>黄先生</p>
        <p>发布与2019年12月21日</p>
        <p>联系方式：13478859887</p>
        <p>地址：重庆市成都小河镇</p>
      </div>

      <div id="one-right">
        <span>不限量</span>
        <span>奉节肌橙</span>
        <p>预约价格：￥12563</p>
        <p>发布与重庆市</p>
        <p>描述：奉节橙子，果园直摘，不打蜡，一箱20斤，包邮</p>
        <img src="../../image/banner03.png"/>
        <img src="../../image/banner03.png"/>
        <img src="../../image/banner03.png"/>
      </div>
    </div>

  </div>
</template>

<script>
  export default {
    name: "det",
    data() {
      return {

      }
    },
    methods:{



    },
    mounted(){

    }
  }
</script>

<style scoped>
  #det{
    width: 1010px;
    min-height: 640px;
    margin-bottom: 20px;
    border-top: 5px solid #626262;
    margin-top: 10px;
  }
  .top{height: 50px;background: #ffffff;margin-bottom: 5px}
  .top #a-one{
    font-size: 14px;
    line-height: 50px;
    float: left;
    font-weight: bold;
    color: #313131;
    margin-left: 30px;
    cursor: pointer;
  }
  .top #a-two{
    margin-left: 30px;
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    float: left;
    color: #313131;
    cursor: pointer;
  }
  .top #a-three{
    margin-left: 30px;
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    float: left;
    color: #313131;
    cursor: pointer;
  }
  .top #box{
    font-size: 14px;
    width: 80px;
    text-align: center;
    border-radius: 2px;
    margin: 10px 20px 0 0;
    height: 25px;
    line-height: 25px;
    float: right;
    color: #ff0000;
    border: 1px solid #ff0000;
    cursor: pointer;
  }
  #pane-one{
    width: 100%;
    min-height: 600px;
    float: left;
    background: #ffffff;
    margin-bottom: 20px;
  }
  #pane-one #one-left{
    width: 320px;
    height: 165px;
    border: 1px solid #efefef;
    background: #fafafa;
    float: left;
    margin: 30px 0 0 30px;
  }
  #one-left img{
    width: 50px;
    height: 50px;
    margin: 30px 0 0 30px;
    float: left;
  }
  #one-left p:nth-of-type(1){
    float: left;
    margin: 30px 0 0 15px;
    font-size: 14px;
    color: #313131;
    font-weight: bold;
  }
  #one-left p:nth-of-type(2){
    width: 180px;
    float: left;
    margin: 6px 0 0 15px;
    font-size: 12px;
    color: #A3A3A3;
  }
  #one-left p:nth-of-type(3){
    width: 180px;
    float: left;
    margin: 20px 0 0 15px;
    font-size: 12px;
    color: #313131;
  }
  #one-left p:nth-of-type(4){
    width: 180px;
    float: left;
    margin: 6px 0 0 95px;
    font-size: 12px;
    color: #313131;
  }
  #pane-one #one-right{
    width: 480px;
    height: 310px;
    float: left;
    margin: 30px 0 0 60px;
  }
  #one-right span:nth-of-type(1){
    width: 55px;
    height: 20px;
    line-height: 20px;
    margin: 10px 0 0 15px;
    float: left;
    font-size: 12px;
    background: #fbe4dc;
    color: #fe762c;
    text-align: center;
  }
  #one-right span:nth-of-type(2){
    margin: 10px 0 0 15px;
    display: inline-block;
    font-weight: bold;
    color: #313131;
    font-size: 14px;
  }
  #one-right p{
    width: 100%;
    font-size: 14px;
    margin: 10px 0 0 15px;
  }
  #one-right p:nth-of-type(1){color: #ff0000;font-weight: bold;}
  #one-right p:nth-of-type(2){color: #A3A3A3;font-size:12px;margin-top: 20px}
  #one-right p:nth-of-type(3){color: #313131;font-size:14px;margin-top: 40px}
  #one-right img{
    width: 120px;
    height: 120px;
    margin: 10px 0 0 15px;
    float: left;
  }
</style>

