<template>
  <div id="wallet">
    <div class="top">
      <h4>我的钱包-充值</h4>
    </div>
    <div id="wallet-center">
      <div id="center-one">
        <p>我的可用余额</p>
        <span>{{money}}</span>
      </div>
      <div id="center-two">
        <p>未兑换量：{{moneyBalance}}</p>
        <span>累计消耗储备盒：{{moneyConsume}}</span>
      </div>
      <div id="center-three">
        <div id="btn1" @click="$router.push('/rec?price='+money)">充值</div>
        <div id="btn2" @click="Visible=true">退还</div>
      </div>
    </div>
    <div id="wallet-bottom">
      <div id="wallet-form">
        <input type="text" placeholder="单号" v-model="orderId">
        <span>操作时间</span>
        <el-date-picker
          style="float: left"
          v-model="startTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-date-picker
          style="float: left;margin-left:10px"
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <div id="btn3" @click="getList()">查询</div>
      </div>
      <el-table style="width: 1000px;margin: 0 auto;" :data="presonlist">
        <el-table-column prop="order_id" label="ID" width="180px"></el-table-column>
        <el-table-column prop="createdtime" label="操作时间" width="180px"></el-table-column>
        <el-table-column label="操作日志" width="300px">
          <template slot-scope="scope">
            <span style="width: 300px;">{{scope.row.remark}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="money_balance" label="余额"></el-table-column>
        <el-table-column prop="money_prebalance" label="之前余额"></el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
        background layout="prev, pager, next"
        :page-count="total"
        @current-change="getList">
      </el-pagination>
      <el-dialog
        style="text-align: center"
        title="提示"
        :visible.sync="Sible"
        :show-close="false"
        :close-on-click-modal="false"
        top="300px"
        width="300px">
        <span style="margin-top:15px;display:block;">请提交审核资料</span>
        <span slot="footer" class="dialog-footer">
          <div id="bnt1" @click="$router.push('/bas')">确认</div>
        </span>
      </el-dialog>


       <el-dialog
        style="text-align: center"
        title="退还保证金"
        :visible.sync="Visible"
        :show-close="false"
        :close-on-click-modal="false"
        top="300px"
        width="400px">
        <div id="bank">
          <mark>选择银行卡：</mark>
          <span id="box" @click="type(item,index)" v-for="(item,index) in banklist" :key="item.ID" :class= "isactive === index ? 'addclass' : '' ">{{item.bank_account}}</span>
        </div>
        <span slot="footer" class="dialog-footer">
          <div id="bnt" @click="Turn()">确认退还</div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  export default {
    name: "wallet",
    data() {
      return {
        Sible:false,
        Visible:false,
        isactive : -1,
        banklist:[],
        pickerOptions1:{
          shortcuts: [{
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date());
            }
          }, {
            text: '昨天',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', date);
            }
          }, {
            text: '一周前',
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', date);
            }
          }]
        },
        startTime: '',
        endTime: '',
        presonlist:[],
        moneyBalance:'',
        moneyConsume:'',
        page: 1,
        total: 1,
        orderId:'',
        money:''
      };
    },
    methods:{
      //判断登录
      getCenter(){
        this.$ajax.post("/Person/userCentre",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.centerList=data.data;
          this.code=data.error_code;
          if(data.error_code==40015){
            localStorage.clear();
            this.$router.push('/login');
          }
        })
      },
      //显示钱包列表
      getList(page){
        this.$ajax.post("/person/lists",{
          page,
          orderId:this.orderId,
          startTime:this.startTime,
          endTime:this.endTime,
          status:1
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.presonlist=data.data.data;
            this.total=data.data.last_page
        })
      },
      //获取钱包列表商家保证金消耗
      getListmoney(){
        this.$ajax.post("/person/moneyBalance",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.moneyBalance=data.data.moneyBalance;
          this.moneyConsume=data.data.moneyConsume
        })
      },
      //储备金余额
      getMoney(){
        this.$ajax.post("/person/customIndex",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.money=data.data.userMoney;
        })
      },
       //选择银行卡
      type(item,index){
        this.value=item.id;
        console.log(this.value,8878778);
        this.isactive=index;
      },


      //获取银行卡列表尾号
      getBank(){
        this.$ajax.post("/finance/lists",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.banklist=data.data.data;
        })
      },

      //退还保证金
      Turn(){
        this.$ajax.post("v2/wallet/deposit",{
          bank_id:this.value
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.$message({
              message:data.msg,
              type:'success'
            })
            this.Visible=false
            this.getMoney()
          })
      }
    },
    mounted(){
      this.getCenter();
      this.getList(this.page);
      this.getListmoney();
      this.getMoney();
      this.getBank();
    }
  }
</script>

<style scoped>
  .addclass{background:#e57339;color: #fff;}
  #wallet{
    width: 1020px;
    height: 600px;
    margin-top: 10px;
  }
  .top{height: 50px;background: #fff;}
  .top h4{
    text-indent: 15px;
    font-size: 14px;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  #wallet-center{
    height: 115px;
    background: #fff;
    margin-top: 10px;
  }
  #wallet-center #center-one{
    width: 100px;
    height: 100%;
    float: left;
    margin-left: 122px;
  }
  #center-one p{
    font-size: 16px;
    margin-top: 20px;
    font-weight: bold;
    color: #313131;
  }
  #center-one span{
    font-size: 24px;
    margin-top: 20px;
    display: block;
    font-weight: bold;
    color: #ff0000;
  }
  #center-one span mark{
    font-size: 16px;
    background: #fff;
    color: #ff0000;
  }
  #wallet-center #center-two{
    width:235px;
    float: left;
    margin-left: 110px;
    height: 100%;
  }
  #center-two p{
    width: 100%;
    font-size: 13px;
    margin-top: 20px;
    color: #313131;
     background: url("../../image/icon2.png") no-repeat 140px center;
  }
  #center-two span{
    font-size: 13px;
    display: block;
    margin-top: 15px;
    color: #313131;
  }
  #wallet-center #center-three{
    width: 100px;
    height: 100%;
    float: left;
    margin-left: 115px;
  }
  #center-three div{
    width: 100%;
    height: 25px;
    line-height: 25px;
    margin-top: 20px;
    font-size: 14px;
    border: 0;
    color: #fff;
    border-radius: 2px;
    text-align: center;
    font-weight: bold;
  }
  #center-three #btn1{background: #ff0000;cursor: pointer}
  #center-three #btn2{background: #6D6D6D;cursor: pointer}
  #wallet #wallet-bottom{
    width: 100%;
    min-height: 640px;
    margin-top: 10px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  #wallet-bottom #wallet-form{
    width: 1000px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
  }
  #wallet-form span{
    height: 25px;
    line-height: 25px;
    margin: 20px 0 0 15px;
    border: 0;
    color: #313131;
    font-size: 12px;
    float: left;
  }
  #wallet-form input{
    width: 145px;
    height: 23px;
    line-height: 23px;
    margin: 20px 0 0 5px;
    border: 0;
    color: #313131;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    float: left;
    text-indent: 10px;
    outline: none;
  }
  #wallet-form #btn3{
    width: 65px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 14px;
    margin: 20px 0 0 20px;
    border: 0;
    color: #fff;
    background: #ff0000;
    float: left;
    cursor: pointer;
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
    margin: -13px auto;
  }


  #bank{
    font-size: 14px;
    color: #313131;
    margin-top: 20px;
    width: 100%;
    height: 50px;
  }
  #bank mark{
    width: 100px;
    float: left;
    text-align: right;
    background: #fff;
    font-size: 14px;
    height: 100%;
    line-height: 50px;
    margin-left: 20px;
  }
  #bank #box{
    width: 75px;
    height: 25px;
    line-height: 25px;
    float: left;
    text-align: center;
    margin-left: 15px;
    font-size: 12px;
    cursor: pointer;
    margin-top: 12px;
    border: 1px solid #e57339;
  }
  #bnt{
    width: 120px;
    height: 35px;
    line-height: 35px;
    margin: -10px auto;
    border-radius: 25px;
    color: #e57339;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    border: 1px solid #e57339;
  }

</style>
