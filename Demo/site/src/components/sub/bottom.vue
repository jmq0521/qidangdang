<template>
  <div id="bottom-warp">
    <div id="bottom">
      <div id="bottom-top"  v-for="(item,index) in address" v-if="index<1" :key="index">
        <h6>订单信息</h6>
        <p>订单提交成功，请尽快付款!<span>应付金额：{{price}}</span></p>
        <p>请您在40分钟内完成支付，否则订单会被自动取消！</p>
        <p>收货人：{{item.receive_name}} 电话：{{item.mobile}}</p>
        <p>详细地址：{{item.province_name}}  {{item.city_name}}  {{item.county_name}}  {{item.address}}</p>
      </div>
      <div id="bottom-bottom">
        <h6>支付方式</h6>
        <div id="box" v-for="(item,index) in box" :key="index" @click="type(item,index)" :class= "isactive === index ? 'addclass' : '' ">
          <img :src="item.src">
        </div>
        <div id="btn" @click="goPay()">立即支付</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      name: "bottom",
      data(){
        return{
          box:[
            {
              value:'0',
              src:"static/wx.png"
            },
            {
              value:'1',
              src:"static/zf.png"
            },
          ],
          initQCode:'',
          value:'',
          isactive : 0,
          address:[],
          price:'',
          orderId:'',
          Num:2,
          pay_source:'pc'
        }
      },
   
      methods:{
        //支付方式
        type(item,index){
          this.value=item.value;
          this.isactive=index;
        },
        //去支付
        goPay(){
          if(this.value==0){
            this.$router.push("/wechat?id="+this.orderId+'&'+'price='+this.price+'&'+'money='+this.money)
          }else{
            this.get();
          }
        },
        //显示地址
        getaddress(){
          this.$ajax.post("/person/receiveAddrList",{},{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.address=data.data.data;
          })
        },
        get(){
         location.href="http://api.7dangdang.cn/api/v1/order/ali-pay?order_id="+this.orderId+'&'+'pay_source='+this.pay_source
        }
      },
      mounted(){
        this.getaddress();
        this.price=this.$route.query.data;
        this.orderId=this.$route.query.id;
        this.money=this.$route.query.money;
      },
    }
</script>
<style scoped>
 .addclass{border: 1px solid #ecbe6f;}
  #bottom-warp{width: 100%}
  #bottom{
    width: 1200px;
    min-height: 820px;
    margin: 0 auto;
    overflow: hidden;
  }
  #bottom-top{
    width: 100%;
    height: 205px;
    border: 1px solid #b2b2b2;
  }
  #bottom-top h6{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #323232;
    text-indent: 25px;
  }
  #bottom-top p:nth-of-type(1){
    font-size: 14px;
    color: #323232;
    text-indent: 25px;
    font-weight: bold;
  }
  #bottom-top p:nth-of-type(1) span{
    float: right;
    color: #ff0000;
    margin-right: 30px;
  }
  #bottom-top p:nth-of-type(2){
    font-size: 14px;
    color: #b2b2b2;
    text-indent: 25px;
    margin-top: 10px;
  }
  #bottom-top p:nth-of-type(3){
    font-size: 14px;
    color: #313131;
    text-indent: 25px;
    margin-top: 30px;
  }
   #bottom-top p:nth-of-type(4){
    font-size: 14px;
    color: #313131;
    text-indent: 25px;
    margin-top: 5px;
  }

   #bottom-bottom{
    width: 100%;
    height: 205px;
    border: 1px solid #b2b2b2;
    margin-top: 30px;
  }
   #bottom-bottom h6{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #323232;
    text-indent: 25px;
  }
   #bottom-bottom #box{
    width: 160px;
    height: 65px;
    font-size: 16px;
    line-height: 65px;
    display: inline-block;
    margin-left: 25px;
    cursor: pointer;
    margin-top: 25px;
    border-radius: 3px;
    position: relative;
  }
  #box img{
    position:absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  #bottom-bottom #btn{
    width: 100px;
    height: 35px;
    text-align: center;
    font-size: 14px;
    line-height: 35px;
    border: 1px solid #ff0000;
    margin-left: 25px;
    color: #ff0000;
    cursor: pointer;
    margin-top: 25px;
    border-radius: 3px;
  }
</style>
