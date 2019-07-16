<template>
    <div id="dep">
      <div id="top">
        <h4>提现申请</h4>
        <div id="but" @click="$router.go(-1)">返回</div>
      </div>
      <div id="deposit">
        <form id="one-form">
          <div><mark>提现金额：</mark><input type="text"  autocomplete="off" v-model="num"/><a>提现金额最少输入100元</a></div>
          <div>
            <mark>选择银行卡：</mark>
            <span id="box" @click="type(item,index)" v-for="(item,index) in banklist" :key="item.ID" :class= "isactive === index ? 'addclass' : '' ">{{item.bank_account}}</span>
          </div>
          <div><mark>支付密码：</mark><input type="password" autocomplete="new-password" v-model="password"/></div>
          <el-button id="btn" type="primary"  :loading="isLoading"  @click="Deposit()">提现申请</el-button>
        </form>
      </div>
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
        :visible.sync="Visible"
        style="text-align: center"
        title="提示"
        :show-close="false"
        :close-on-click-modal="false"
        top="300px"
        width="300px">
        <p  id="title2">
          {{msg}}
        </p>
        <span slot="footer" classs="dialog-footer">
          <div id="btn1" type="primary" @click="Visible=false">确认</div>
        </span>
      </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "dep",
    data(){
      return{
        Sible:false,
        Visible:false,
        isLoading:false,
        banklist:[],
        value:'',
        num:'',
        password:'',
        isactive : -1,
        msg:'',
        timer:''
      }
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

      //商户提现
      Deposit(){
        this.isLoading=true;
        this.Visible=true;
        this.$ajax.post("/purchase/putDeposit",{
          num:this.num,
          password:this.password,
          bank_id:this.value
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.msg=data.msg;
            this.isLoading=false;
        })
      },
    },
    mounted(){
      this.getCenter();
      this.getBank();
      if(localStorage.is_audit==0){
        this.Sible=true;
      };
    }
  }
</script>

<style scoped>
  .addclass{background: rgb(208, 68, 73);color: #fff;}
  #dep{
    width: 1010px;
    margin-top: 10px;
  }
  #dep #top{
    width: 100%;
    height: 50px;
    background: #fff;
  }
  #top h4{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    margin-left: 15px;
    color: #313131;
    float: left;
  }
  #top #but{
    width: 65px;
    height: 25px;
    line-height: 23px;
    font-size: 14px;
    margin-right: 35px;
    float: right;
    border: 1px solid #ff0000;
    text-align: center;
    margin-top: 13px;
    border-radius: 3px;
    color: #ff0000;
    cursor: pointer;
  }
  #dep #deposit{
    width: 100%;
    min-height: 800px;
    margin-top: 10px;
    margin-bottom: 20px;
    background: #fff;
  }
  #one-form{
    width: 100%;
    float: left;
    padding-left: 30px;
    box-sizing: border-box;
  }
  #one-form div{
    font-size: 14px;
    color: #313131;
    margin-top: 20px;
    width: 100%;
    height: 50px;
  }
  #one-form div mark{
    width: 100px;
    float: left;
    /* margin-top: 6px; */
    text-align: right;
    background: #fff;
    font-size: 14px;
    height: 100%;
    line-height: 50px;
  }
  #one-form div input{
    width: 255px;
    height: 35px;
    text-indent: 5px;
    color:#313131;
    font-size: 12px;
    border-radius: 3px;
    border: 0;
    border: 1px solid #d2d2d2;
    margin-left: 15px;
    outline: none;
    margin-top: 7px;
  }
  #one-form div a{
    font-size: 12px;
    display: block;
    color: #ff0000;
    margin-left: 120px;
  }
  #one-form #box{
    width: 75px;
    height: 25px;
    line-height: 25px;
    float: left;
    text-align: center;
    margin-left: 15px;
    font-size: 12px;
    cursor: pointer;
    margin-top: 12px;
    border: 1px solid rgb(208, 68, 73);
  }
  #one-form #btn{
    width: 180px;
    height: 30px;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    background: #ff0000;
    text-align: center;
    margin: 30px 0 0 60px;
    cursor: pointer;
    border: none;
  }

  #btn1{
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

