<template>
    <div id="num">
      <div id="top">
        <h4>名额管理</h4>
        <div id="btn" @click="$router.go(-1)">返回</div>
      </div>
      <div id="num-table">
        <el-table style="width: 980px;margin: 0 auto;"  :data="vitNum">
          <el-table-column label="身份" prop="Name"></el-table-column>
          <el-table-column label="已开通购买名额" prop="buyed_num"></el-table-column>
          <el-table-column label="已开通赠送名额" prop="giveed_num"></el-table-column>
          <el-table-column label="剩余购买名额"  prop="buy_num"></el-table-column>
          <el-table-column label="剩余赠送名额" prop="give_num"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
                <span id="span1" @click="$router.push('/tran?id='+scope.row.ID)" :style="{display:count==3?'none':'inline-block'}">转入</span>
                <span id="span2" @click="Visible = true" :style="{display:count==3?'none':'inline-block'}">转出</span>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <el-dialog
        title="转出联盟商名额"
        style="text-align: center"
        :visible.sync="Visible"
        :show-close="false"
        top="300px"
        width="430px">
        <p id="elp"><span>转出账号</span><input type="text" placeholder="单行输入" v-model="phone"/></p>
        <p id="elp" style="margin-top:15px"><span>转出数量</span><input type="text" placeholder="单行输入" v-model="num"/></p>
        <p id="elp" style="margin-top:15px">
          <span>商户类型</span>
          <select id="s1">
            <option v-for="item in vitType" :value="item.id" :key="item.id">{{item.name}}</option>
          </select>
        </p>
        <span slot="footer" class="dialog-footer">
          <div id="bnt1" @click="addTran()">确认</div>
          <div id="bnt2" @click="out1()">取消</div>
        </span>
      </el-dialog>
    </div> 
</template>

<script>
    import QRcode from '@xkeshi/vue-qrcode'
    export default {
      name: "num",
      data(){
        return{
         count:localStorage.type,
         Visible:false,
         vitNum:[],
         vitType:[],
         phone:'',
         Num:'',
         num:'',
         Type:'',
         box:[
            {
              value:'0',
              label:'微信'
            },
            {
              value:'1',
              label:'支付宝'
            },
            {
              value:'2',
              label:'线下付款'
            },
          ],
          value:'',
          isactive : -1,
          pay_way:"wechat",
          pay_source:"pc",
          initQCode:''
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
        //获取邀请的名额
        getVitNum(){
          this.$ajax.post("/vitation/inviteNum",{},{
          headers: {
              'token' :localStorage.token
          }}).then(data=>{
              this.vitNum=data.data;
          })
        },
        //获取转出商户类型选择
        getVitType(){
          this.$ajax.post("/invite/user/type",{},{}).then(data=>{
              this.vitType=data.data;
          })
        },
        //转出接口
        addTran(){
          var select = document.getElementById("s1");
          let options = select.options;
          let index = select.selectedIndex;
          this.$ajax.post("/invite/transfer",{
            phone:this.phone,
            num:this.num,
            user_type:options[index].value
          },{
          headers: {
              'token' :localStorage.token
          }}).then(data=>{
              alert(data.msg);
              if(data.msg==='成功'){
                this.Visible = false;
              };
              this.getVitNum()
          })
        },
        //转入的取消
        // out(){
        //   this.dialogVisible = false;
        //   this.Num="";
        //   this.money="";
        //   this.isactive= -1
        // },
        //转出的取消
        out1(){
          this.Visible = false;
          this.num="";
          this.phone="";
        },
        // //转入购买的type值
        // openOrder(type){
        //   this.dialogVisible = true;
        //   this.Type=type;
        //   console.log(this.Type,5665)
        // },
        //转入购买接口
        addOrder(){
          this.$ajax.post("/finance/UserPlacesOrder",{
            type:this.Type,
            num:this.Num,
          },{
          headers: {
              'token' :localStorage.token
          }}).then(data=>{
            this.orderId=data.data.orderId
          });
        },
        //获取要支付的金钱
        payMoney(){
          this.$ajax.post("/invite/user/price",{
            user_type:this.Type,
            num:this.Num,
          },{
          headers: {
              'token' :localStorage.token
          }}).then(data=>{
              this.money=data.data.totalPrice
          })
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
            console.log(3123,this.initQCode)
          })
        },
        //支付方式
        goPay(){
          if(this.value==2){
            this.$router.push("/sub?id="+this.orderId)
          }else if(this.value==0){
            this.dialog=true;
            this.payMoney();
            this.wetPay();
          }
        },
      },
      mounted(){
        this.getVitNum();
        this.getVitType();
      
      }
    }
</script>

<style scoped>
  .addclass{
    border: 1px solid #ff0000;
  }
  #num{
    width: 1020px;
    margin-top: 10px;
  }
  #num #top{
    width: 100%;
    height: 50px;
    background: #ffffff;
  }
  #top h4{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-indent: 15px;
    float: left;
    background: #fff;
    color: #313131;
  }
   #top #btn{
    height: 25px;
    line-height: 23px;
    border: 1px solid #ff0000;
    width: 70px;
    font-size: 14px;
    text-align: center;
    background: #fff;
    margin: 15px 30px 0 0;
    float: right;
    color: #ff0000;
    border-radius: 3px;
    cursor: pointer;
  }
  #num #num-table{
    width: 1010px;
    min-height: 780px;
    background: #ffffff;
    margin-top:10px;
    float: left;
    padding-top: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  #span1{
    display: inline-block;
    width: 40px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    color: #ff5b00;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid #ff5b00
  }
  #span2{
    display: inline-block;
    width: 40px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    color: #ff0000;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid #ff0000
  }

  #elp{
    width: 100%;
    font-size:14px;
    color: #b2b2b2;
    margin-top: 15px;
  }
  #elp input{
    margin-left: 15px;
    width: 160px;
    text-indent: 5px;
    height: 25px;
    font-size: 12px;
  }
  #elp #s1{
    margin-left: 10px;
    width: 160px;
    text-indent: 5px;
    height: 25px;
    font-size: 12px;
    color: #616161;
  }
  #elp mark{
    margin-left: 15px;
    background: #ffffff;
    color: #ff0000;
  }
  /* .elp{
    width: 100%;
    font-size:14px;
    padding-left: 60px;
    box-sizing: border-box;
    color: #b2b2b2;
    margin-top: 15px;
  }
  .elp #box{
    width: 160px;
    height: 65px;
    line-height: 65px;
    text-indent: 70px;
    font-size: 16px;
    display: inline-block;
    margin-left: 12px;
    cursor: pointer;
  }
  .elp #box:nth-of-type(1){background: #f3f5f7 url(../../image/wxpay.png) no-repeat 10px center;}
  .elp #box:nth-of-type(2){background: #f3f5f7 url(../../image/zfpay.png) no-repeat 10px center;}
  .elp #box:nth-of-type(3){background: #f3f5f7 url(../../image/xxpay.png) no-repeat 10px center;} */
  #money{
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }

   #bnt1{
    width: 120px;
    height: 35px;
    line-height: 35px;
    margin-left: 50px;
    border: 1px solid #e57339;
    border-radius: 25px;
    color: #e57339;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    float: left;
    margin-top: -13px;
  }
  #bnt2{
    width: 120px;
    height: 35px;
    line-height: 35px;
    margin-left: 50px;
    border: 1px solid #999;
    border-radius: 25px;
    color: #999;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    float: left;
    margin-top: -13px;
  }
</style>

