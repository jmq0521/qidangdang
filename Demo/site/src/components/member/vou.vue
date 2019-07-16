<template>
  <div id="vou">
    <div class="top">
      <h4>兑换券充值</h4>
    </div>
    <div class="center">
      <!-- <div id="center-one">
        <span>ID:764389</span>
        <div id="btn1">修改</div>
      </div> -->
      <div id="center-two">
        <div id="box">
          <span>会员号</span>
          <input type="text" id="txt" v-model="phone" autocomplete="off">
        </div>
        <div id="box">
          <span>充值现金</span>
          <input type="text" id="txt1" v-model="val" autocomplete="off">
        </div>
        <!-- <input type="radio" id="check" value="1" v-model="type">
        <label for="check">兑换券</label>
        <input type="radio" id="chek" value="2" v-model="type">
        <label for="chek">购物券</label> -->
        <el-button id="btn2" type="primary" :loading="isLoading"   @click="Charge()">充值</el-button>
      </div>
      <div id="center-three">
        <h3>当前充值兑换比例</h3>
        <p>100元={{value?value:value=0}}兑换券={{value?value:value=0}}购物券</p>
        <!-- <span>累计兑换券数：123543</span>
        <span>累计充值券数：123543</span>
        <span><mark>*</mark>填写负数则为减少兑换券额度，购物券不变</span> -->
      </div>
    </div>
    <div id="vou-bottom">
      <div id="vou-form">
        <input type="text" placeholder="会员号" v-model="phone1">
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
        <div id="btn" @click="getIntegar">查询</div>
      </div>
      <el-table style="width: 1000px;margin: 0 auto;" :data="inteList">
        <el-table-column label="ID" prop="id"></el-table-column>
        <el-table-column label="会员账号" prop="mobile"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">{{scope.row.type===2?'充值':'消费'}}</template>
        </el-table-column>
        <el-table-column label="充值前兑换券" prop="pre_integral_num"></el-table-column>
        <el-table-column label="充值兑换券额度" prop="now_integral_num"></el-table-column>
        <el-table-column label="充值时间" prop="createdtime"></el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
        background layout="prev, pager, next"
        :page-count="total"
        @current-change="getIntegar">
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
    </div>
  </div>
</template>
</template>

<script>
  export default {
    name: "vou",
    data() {
      return {
        Sible:false,
        isLoading:false,
        type:'',
        pickerOptions1: {
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
        val:'',
        phone:'',
        phone1:'',
        inteList:[],
        page:1,
        total:1,
        result:'',
        value:0

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
      //兑换券充值
      Charge(){
        this.isLoading=true;
        this.$ajax.post("/member/integralRecharge",{
          phone:this.phone,
          value:this.val
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.$message({
              message:data.msg,
              type: 'success'
            });
            let timer=setInterval(() => {
              this.isLoading=false;
  　　　    }, 3000);
            this.getIntegar();
        })
      },
      //获取会员充值记录
      getIntegar(page){
        this.$ajax.get("/member/integralLog",{
          params:{
            page,
            phone:this.phone1,
            startTime:this.startTime,
            endTime:this.endTime,
            type:2
          },
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.inteList=data.data.data;
            this.total=data.data.last_page;
        })
      },
      //获取积分比率
      Rate(){
        this.$ajax.post("/member/integralRateList",{},{
          headers:{
            'token' :localStorage.token
          }}).then(data=>{
            this.value=data.data.rate
        })
      }
    },
    mounted(){
      this.getCenter();
      this.getIntegar(this.page);
      this.Rate();
      if(localStorage.is_audit==0){
        this.Sible=true;
      };
    }
  }
</script>

<style scoped>
  #vou{
    width: 1020px;
    height: 600px;
    margin-bottom: 20px;
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
  #vou .center{
    width: 100%;
    height: 165px;
    background: #fff;
    margin-top: 10px;
  }

  .center #center-one{
    width: 180px;
    margin-left: 70px;
    float: left;
  }
  #center-one span{
    display: inline-block;
    line-height: 165px;
    font-size: 24px;
    font-weight: bold;
    color: #313131;
    float: left;
  }
  #center-one #btn1{
    width: 45px;
    height: 18px;
    line-height: 16px;
    font-size: 12px;
    margin:74px 0 0 10px;
    text-align: center;
    color: #ff0000;
    background: #fff;
    border: 0;
    border: 1px solid #ff0000;
    float: left;
    cursor: pointer;
  }
  .center #center-two{
    width: 220px;
    margin-left: 80px;
    float: left;
    font-size: 12px;
  }
  #center-two #box{
    width: 100%;
    height: 25px;
    margin-top: 10px;
  }
  #box span{
    width: 60px;
    height: 20px;
    text-align: right;
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
    float: left;
    color: #313131;
  
  }
  #box input{
    width: 125px;
    height: 24px;
    margin: 15px 0 0 10px;
    border: 0;
    border: 1px solid #e5e5e5;
    float: left;
    outline: none;
  }

  #center-two #check{
    width: 12px;
    height: 12px;
    float: left;
    margin: 10px 0 0 75px;
  }
  #center-two label{float: left;margin: 6px 0 0 5px;}
  #center-two #chek{
    width: 12px;
    height: 12px;
    float: left;
    margin: 11px 0 0 20px;
  }
  #center-two #btn2{
    width: 190px;
    height: 28px;
    line-height: 28px;
    margin-top: 15px;
    margin-left: 5px;
    color: #fff;
    border: 0;
    background: #ff0000;
    border-radius: 2px;
    float: left;
    text-align: center;
    font-weight: bold;
    cursor: pointer;
    font-size: 15px;
  }
  .center #center-three{
    width: 280px;
    margin-left: 130px;
    float: left;
  }
  #center-three h3{font-size: 14px;margin-top: 25px;color: #313131;}
  #center-three p{
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    color: #ff0000;
    font-weight: bold;
  }
  #center-three span{
    display: block;
    font-size: 10px;
    color: #ff0000;
    font-weight: bold;
  }
  #center-three span:nth-of-type(2){margin-top: 5px;}
  #center-three span:nth-of-type(3){margin-top: 10px;color: #626262;font-weight: normal;}
  #center-three span:nth-of-type(3) mark{margin-top:1px;background: #ffffff;margin-right: 5px;font-size: 14px;float: left;}
  #vou #vou-bottom{
    width: 100%;
    min-height: 540px;
    margin-top: 10px;
    margin-bottom: 20px;
    float: left;
    background: #fff;
  }
  #vou-bottom #vou-form{
    width: 1000px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
    box-sizing: border-box;
  }
  #vou-form input{
    width: 115px;
    height: 23px;
    line-height: 23px;
    margin: 20px 0 0 5px;
    border: 0;
    color: #313131;
    text-indent:10px;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    float: left;
    outline: none;
  }
  #vou-form span{
    height: 25px;
    line-height: 25px;
    color: #313131;
    float: left;
    margin: 20px 0 0 15px;
    font-size: 12px;
  }
  #vou-form #btn{
    width: 65px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    text-align: center;
    margin: 20px 0 0 20px;
    border: 0;
    color: #ffffff;
    background: #ff0000;
    float: left;
    cursor: pointer;
  }
  #vou-form .btn{
    width: 60px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    margin: 20px 0 0 10px;
    border: 0;
    color: #959595;
    text-align: center;
    background: #ffffff;
    border: 1px solid #e5e5e5;
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
</style>
