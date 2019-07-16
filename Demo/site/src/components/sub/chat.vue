<template>
  <div id="chat-warp">
    <div id="chat">
      <h4>
        <i class="iconfont">&#xe616;</i>
        微信支付
        <div id="btn" @click="$router.go(-1)">返回</div>
      </h4>
      <div id="img">
        <div class="response">    
          <qrcode :value="initQCode"  :options="{ size: 230 }"></qrcode>  
        </div>
        <div id="dime">
          <i class="iconfont">&#xe630;</i>
          <span>请使用微信"扫一扫"</span>
          <span>扫描二维码支付</span>
        </div>
        <p>￥{{price}}</p>
      </div>
    </div>
  </div>
</template>
<script>
    import QRcode from '@xkeshi/vue-qrcode'
    export default {
      name: "chat",
      data(){
        return{
          initQCode:'',
          pay_way:"wechat",
          pay_source:"pc",
          price:'',
          orderId:'',
          type:1,
          Type:2,
          timer:null,
        }
      },
      components:{
        qrcode : QRcode
      },
      methods:{
        //微信支付
        wetPay(){
          if(this.$route.query.money==1){
            this.$ajax.post("/purchase/payOrder",{
              orderId:this.orderId,
              pay_way:this.pay_way,
              pay_source:this.pay_source,
              order_type:this.type,
            },{
              headers: {
                'token' :localStorage.token
              }}).then(data=>{
              this.initQCode=data.data;
              this.setTime();
            })
          }else{
            this.$ajax.post("/purchase/payOrder",{
              orderId:this.orderId,
              pay_way:this.pay_way,
              pay_source:this.pay_source,
              order_type:this.Type,
            },{
              headers: {
                'token' :localStorage.token
              }}).then(data=>{
              this.initQCode=data.data;
              console.log(data.data);
              this.setTimer();
            })
          }
        },
        //显示兑换订单列表的详情
        callBack(){
          this.$ajax.get("/vitation/order-list",{
            params:{
              orderId:this.orderId,
              order_type:2
            },
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              if(data.data.data[0].status===2){
                this.$message.success('支付成功');
                this.$router.push('/dett?id='+data.data.data[0].InnerOrderId);
                clearInterval(this.timer);
              }
          })
        },
        //定时器
        setTimer: function(){
  　　　　this.timer = setInterval(() => {
            this.callBack();
  　　　 }, 2000)},
        
        setTime: function(){
  　　　　this.timer = setInterval(() => {
            this.callBack();
  　　　 }, 2000)},
       
      },
      mounted(){
        this.price=this.$route.query.price;
        this.orderId=this.$route.query.id;
        this.wetPay();
        clearInterval(this.timer)
      },
      distroyed: function () {
      　clearInterval(this.timer)
      }
    }
</script>
<style scoped>
  #chat-warp{width: 100%; background: #f8f8f8;}
  #chat{
    width: 1200px;
    min-height: 850px;
    margin: 0 auto;
    overflow: hidden;
    background: #f8f8f8;
  }
  #chat h4{
    width: 100%;
    height: 80px;
    line-height: 80px;
    border-bottom: 5px solid #ff5b00;
    text-align: center;
    font-size: 24px;
    color: #313131;
  }
  #chat h4 i{
    color: #a0bf5b;
    font-size: 24px;
    margin-right: 10px;
  }
  #chat h4 #btn{
    float: right;
    width: 65px;
    height: 25px;
    line-height: 23px;
    color: #ff0000;
    border: 1px solid #ff0000;
    font-size: 14px;
    font-weight: normal;
    margin: 30px 30px 0 0;
    border-radius: 2px;
    cursor: pointer;
  }
  #chat #img{
    width: 100%;
    height: 600px;
    background: #fff;
    float: left;
  }
  #img .response{
    width: 200px;
    height: 200px;
    margin: 50px 0 0 500px;
  }
  #img #dime{
    width: 230px;
    height: 60px;
    margin: 50px 0 0 500px;
    border: 1px solid #ff5b00;
    border-radius: 3px;
  }
  #dime i{
    float: left;
    width: 50px;
    height: 100%;
    line-height: 60px;
    text-align: center;
    font-size: 40px;
    margin-left: 20px;
    color: #ff5b00;
  }
  #dime span:nth-of-type(1){
    float: left;
    width: 150px;
    font-size: 14px;
    text-indent: 10px;
    margin-top: 5px;
    color: #ff5b00;
  }
  #dime span:nth-of-type(2){
    float: left;
    width: 150px;
    font-size: 14px;
    text-indent: 10px;
    margin-top: 5px;
    color: #ff5b00;
  }
  #img p{
    width: 600px;
    margin: 50px auto;
    border-bottom: 1px solid #eeeeee;
    text-align: center;
    font-size: 36px;
    color: #ff5b00;
  }
</style>
