<template>
  <div id="rec">
    <div class="top">
      <h4>我的钱包-充值</h4>
      <div id="btn" @click="$router.go(-1)">返回</div>
    </div>
    <div id="rec-bottom">
      <ul id="rec-one">
        <li>开通服务</li>
        <li>开通方式</li>
        <li>应付金额</li>
      </ul>
      <ul id="rec-two">
        <li>自定义商城</li>
        <li>增加余额</li>
        <li><el-input-number v-model="value" :step="1000" :min="3000" placeholder></el-input-number></li>
      </ul>
      <h2>尊敬的企铛铛平台企业用户：</h2>
      <p v-html="item.content" v-for="item in agree"></p>
      <p><input type="checkbox" v-model="checked">我同意预选协议</p>
      <div id="btn1" @click="gopay()">立即支付</div>
      <el-dialog
        :visible.sync="dialog"
        style="text-align: center"
        title="提示"
        :show-close="false"
        :close-on-click-modal="false"
        top="300px"
        width="300px">
        <span style="color:#ff0000">请仔细阅读预选协议</span>
        <span slot="footer" class="dialog-footer">
          <div id="bnt1" type="primary" @click="dialog=false">确认</div>
        </span>
      </el-dialog>
    </div>

  </div>
</template>

<script>
  export default {
    name: "rec",
    data(){
      return{
        value:3000,
        checked:true,
        dialog:false,
        agree:[],
        price:''
      }
    },
    methods:{
      //支付方式
      gopay(){
        if($("input[type='checkbox']").is(':checked')==false){
          this.dialog=true
        }else{
          this.$router.push('/gopay?id='+this.value+'&'+'price='+this.price)
        }
      },

      //获取服务协议
      getAgree(){
        this.$ajax.get("/system/agreemen-info",{
          params:{
            use_type:'pc',
            location_type:1
          }}).then(data=>{
          this.agree=data.data;
        })
      }
    },
    mounted(){
      this.getAgree()
      this.price=this.$route.query.price;
     
    }
  }
</script>

<style scoped>
  #rec{
    width: 1020px;
    height: 600px;
    margin-top: 10px;
  }
  .top{height: 50px;background: #e9e9e9;}
  .top h4{
    text-indent: 30px;
    font-size: 14px;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  .top #btn{
    width: 65px;
    height: 25px;
    line-height: 23px;
    font-size: 14px;
    text-align: center;
    border: 0;
    float: right;
    margin-top: 12px;
    margin-right: 30px;
    color: #ff0000;
    cursor: pointer;
    border: 1px solid #ff0000;
    border-radius: 3px;
  }
  #rec-bottom{
    min-height: 400px;
    background: #fff;
    float: left;
    margin-bottom: 20px;
    width: 100%;
  }
  #rec-bottom #rec-one{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    margin: 0 auto;
    margin-top: 30px;
    background: #e9e9e9;
  }
  #rec-one li{
    float: left;
    width: 33%;
    text-align: center;
  }
  #rec-bottom #rec-two{
    width: 1000px;
    height: 70px;
    line-height: 70px;
    font-size: 14px;
    margin: 0 auto;
  }
  #rec-two li{
    float: left;
    width: 33%;
    text-align: center;
  }
  #rec-bottom h2{
    width: 100%;
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    font-weight: bold;
    margin: 0 auto;
    text-indent: 30px;
    background: #e9e9e9;
    color: #313131;
  }
  #rec-bottom p{
    width: 920px;
    line-height: 20px;
    font-size: 14px;
    margin: 0 auto;
    margin-top: 10px;
    text-indent: 15px;
  }
  #rec-bottom p:nth-of-type(6){
    margin-top: 48px;
    color: #ff0000;
  }
  #rec-bottom #btn1{
    width: 80px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    text-align: center;
    color: #fff;
    background: #ff0000;
    cursor: pointer;
    border-radius: 3px;
    margin: 20px auto;
  }


  #bnt1{
    width: 120px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #e57339;
    border-radius: 25px;
    color: #e57339;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    margin: -13px auto;
  }
</style>
