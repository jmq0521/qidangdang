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
            <span>转入数量</span>
            <span @click="col()">-</span><input type="text" v-model="num" id="num"/><span @click="add()">+</span>
          </div>

          <div id="box">
            <mark></mark>
            <span>支付金钱</span>
            <span>{{money}}</span>
          </div>

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
      <div id="money">微信支付{{money}}</div>
      <div  class="response">    
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
         value:"1000",
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
          dialog:false,
          orderId:'',
          num: 0,
          money:0,
          initQCode:'',
          pay_way:"wechat",
          pay_source:"pc",
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
        this.addOrder();
      },
      //转入购买接口
      addOrder(){
        this.$ajax.post("/finance/UserPlacesOrder",{
          type:this.$route.query.id,
          num:this.num,
        },{
        headers: {
            'token' :localStorage.token
        }}).then(data=>{
          this.orderId=data.data.orderId;
        });
      },
      //加号数量增加
      add(){
        this.num+=1;
        this.payMoney()
      },
      //减号数量减少
      col(){
        if(this.num>0){
          this.num-=1;
          this.payMoney()
        }
      },
      
      //获取要支付的金钱
      payMoney(){
        if(this.num==0){
          this.money=0
        }else{
          this.$ajax.post("/invite/user/price",{
            user_type:this.$route.query.id,
            num:this.num,
          },{
          headers: {
              'token' :localStorage.token
          }}).then(data=>{
              this.money=data.data.totalPrice
          }) 
        }
      },

      //微信支付
      wetPay(){
        this.$ajax.post("/finance/buyUserPlaces",{
          orderId:this.orderId,
          pay_way:this.pay_way,
          pay_source:this.pay_source
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.initQCode=data.data;
        })
      },
      //支付宝支付
      get(){
          location.href="http://api.7dangdang.cn/api/v1/order/ali-invite-pay?order_id="+this.orderId+'&'+'pay_source='+this.pay_source
      },
      //去支付
      goPay(){
        if(this.value==2){
          this.$router.push('/sub?id='+this.orderId)
        }else if(this.value==0){
          this.dialog=true;
          this.payMoney();
          this.wetPay();
        }else if(this.value==1){
          this.get();
        }
      }
    },
    mounted(){
      $("#num").click(function(){
        $(this).css("border",'')
      })
    }
  }
</script>

<style scoped>
 .addclass{
    border: 1px solid #ecbe6f;
  }
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
    border-radius: 2px;
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
  #box:nth-of-type(1) input{
    width: 30px;
    height: 25px;
    color: #313131;
    float: left;
    text-align: center;
    border: none;
    border-top: 1px solid #b2b2b2;
    border-bottom: 1px solid #b2b2b2;
  }
   #box:nth-of-type(1) span:nth-of-type(2){
     display: inline-block;
     width: 20px;
     height: 25px;
     border: 1px solid #b2b2b2;
     color: #313131;
     text-align: center;
     font-weight: bold;
     cursor: pointer;
   }
   #box:nth-of-type(1) span:nth-of-type(3){
     display: inline-block;
     width: 20px;
     height: 25px;
     border: 1px solid #b2b2b2;
     color: #313131;
     text-align: center;
     margin-left: 0;
     font-weight: bold;
     cursor: pointer;
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
    font-size: 15px;
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

