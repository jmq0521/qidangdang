<template>
  <div id="pay">
    <div id="top">
      <h4>支付方式</h4>
      <div id="but" @click="$router.go(-1)">返回</div>
    </div>

    <div id="pay-table">
      <div id="pay-box">
        <div id="box">
          <mark></mark>
          <span>支付方式</span>
          <div id="box1" @click="type(item,index)" :key="index" v-for="(item,index) in box" :class= "isactive === index ? 'addclass' : '' ">
             <img :src="item.src">
          </div>
        </div>
        <div id="btn" @click="goPay()">立即支付</div>
      </div>
    </div>

    <el-dialog
      style="text-align: center;"
      :visible.sync="dialog"
      top="300px"
      width="300px">
      <div id="money">微信支付</div>
      <div class="response">    
        <qrcode :value="initQCode"  :options="{ size: 230 }"></qrcode>  
      </div> 
    </el-dialog>

  </div>
</template>

<script>
  import QRcode from '@xkeshi/vue-qrcode'
  export default {
    name: "pay",
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
          // {
          //   value:'2',
          //   src:"static/xx.png"
          // }
        ],
        isactive : -1,
        initQCode:'',
        dialog: false,
        pay_way:"wechat",
        pay_source:"pc",
        price:'',
        timer:null,
        orderId:''
      }
    },
    components:{
      qrcode : QRcode
    },
    methods:{
      //支付方式
      type(item,index){
        this.value=item.value;
        this.isactive=index;
      },
      //去支付
      goPay(){
        if(this.value==2){
          this.$router.push("/recsub?money="+this.money)
        }else if(this.value==0){
          this.dialog=true;
          this.wetPay();
        }else if(this.value==1){
          this.get();
        }
      },
      //微信支付
      wetPay(){
        this.$ajax.post("/Finance/rechargeDeposit",{
          money:this.money,
          pay_way:this.pay_way,
          pay_source:this.pay_source
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.initQCode=data.data;
          this.setTimer();
          console.log(3123,this.initQCode);
        })
      },
      //定时器
      setTimer: function(){
　　　　this.timer = setInterval(() => {
          this.callBack();
　　　 }, 7000)},

      //储备金余额
      callBack(){
        this.$ajax.post("/person/customIndex",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          if(this.price!=data.data.userMoney){
            this.$message.success('充值成功');
            this.$router.push('/wallet');
            clearInterval(this.timer);
          }
        })
      },
      //支付宝支付
      get(){
        this.$ajax.post("/Finance/rechargeDeposit",{
          money:this.money,
          pay_way:'ali',
          pay_source:this.pay_source
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.orderId=data.data.order_id;
          location.href="http://api.7dangdang.cn/api/v1/order/ali-deposit-pay?order_id="+this.orderId+'&'+'pay_source='+this.pay_source
          console.log(this.orderId,23231)
        })
      },
    
    },
    mounted(){
      this.money=this.$route.query.id;
      this.price=this.$route.query.price;
      clearInterval(this.timer);
    },
    distroyed: function(){
    　clearInterval(this.timer);
    }
  }
</script>

<style scoped>
  .addclass{border: 1px solid #ecbe6f;}
  #pay{
    width: 1020px;
    margin-top: 10px;
  }
  #pay #top{
    width: 100%;
    height: 50px;
    background: #fff;
  }
  #top h4{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-indent: 15px;
    float: left;
    color: #313131;
  }
  #top #but{
    width: 70px;
    height: 25px;
    float: right;
    line-height: 23px;
    border: 1px solid #ff0000;
    border-radius: 3px;
    color: #ff0000;
    font-size: 14px;
    text-align: center;
    margin: 10px 30px 0 0;
    cursor: pointer;
  }
  #pay #pay-table{
    width: 1020px;
    min-height: 740px;
    background: #fff;
    margin-top: 10px;
    float: left;
    margin-bottom: 20px;
  }

  #pay-table #pay-box{
    width: 100%;
    height: 240px;
    margin: 10px 0 0 10px;
  }
  #pay-box #box{
    width: 100%;
    height: 70px;
    margin-top: 10px;
    float: left;
  }
  #box mark{
    width: 5px;
    height: 20px;
    background: #d5443d;
    display: inline-block;
    float: left;
    margin-left: 18px;
  }
  #box span{
    font-size: 14px;
    color: #313131;
    float: left;
    margin-left: 15px;
  }
  #box #box1{
    width: 160px;
    height: 65px;
    line-height: 65px;
    text-indent: 80px;
    font-size: 14px;
    color: #313131;
    border-radius: 3px;
    cursor: pointer;
    margin: -8px 0 0 20px;
    float: left;
    position: relative;
  }
  #box1 img{
    position:absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
  }
  #pay-box #btn{
    width: 100px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    margin: 20px 0 0 18px;
    font-size: 14px;
    color: #ff0000;
    float: left;
    border: 1px solid #ff0000;
    border-radius: 3px;
    cursor: pointer;
  }
</style>

