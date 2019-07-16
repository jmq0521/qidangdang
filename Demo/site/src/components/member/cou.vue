<template>
  <div id="cou">
    <div class="top">
      <h4>兑换券设置</h4>
    </div>
    <div id="cou-bottom">
      <a id="a-one">兑换比例</a>
      <!--<a id="a-two">兑换规则</a>-->
      <!-- <div class="btn">积分清零</div> -->
      <div class="cou-left">
        <div id="left">
          <div class="left-one">
            <h3>兑换券比率</h3>
            <p>100元=<input type="text" v-model="value">兑换券</p>
            <span>请填写大于0的整数</span>
          </div>
          <div class="left-two">
            <h3>购物券比率</h3>
            <p>100元=<input type="text" v-model="value">兑换券</p>
            <span>消费100元赠送{{value ? value : 0}}兑换券{{value ? value : 0}}购物券</span>
          </div>
        </div>
        <div id="right">
          <input type="radio" id="one" value="1" v-model="type">
          <label for="one">显示兑换券</label>
          <input type="radio" id="two" value="2" v-model="type">
          <label for="two">显示购物券</label>
          <p>开启与关闭用于企铛铛app数值显示与隐藏</p>
          <div id="btn" @click="upRate()">保存</div>
        </div>
      </div>
      <!--<div class="cou-right">-->
        <!--<el-table style="width: 950px;margin: 0 auto;">-->
          <!--<el-table-column prop="date" label="序号"></el-table-column>-->
          <!--<el-table-column prop="name" label="充值金额"></el-table-column>-->
          <!--<el-table-column prop="address" label="兑换币金额"></el-table-column>-->
          <!--<el-table-column prop="address" label="操作"></el-table-column>-->
        <!--</el-table>-->
      <!--</div>-->
    </div>
     <el-dialog
      :visible.sync="Visible"
      style="text-align: center"
      title="提示"
      :show-close="false"
      :close-on-click-modal="false"
      top="300px"
      width="300px">
      <p  id="title">{{msg}}</p>
      <span slot="footer" class="dialog-footer">
        <div id="btn1" type="primary" @click="Visible=false">确认</div>
      </span>
    </el-dialog>

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

</template>

<script>
  export default {
    name: "cou",
    data(){
      return{
        value: 0,
        Visible: false,
        Sible:false,
        type:'',
        msg:''
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
      //获取积分比率
      Rate(){
        this.$ajax.post("/member/integralRateList",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.value=data.data.rate
        })
      },
      //修改会员积分比率
      upRate(){
        this.$ajax.post("/member/rechargeIntegralRate",{
          rate:this.value
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.Visible=true;
            this.msg=data.msg;
        })
      }
    },
    mounted(){
      this.getCenter();
      this.Rate();
      if(localStorage.is_audit==0){
        this.Sible=true;
      };
      $('#a-one').click(function(){
        $(this).css("border-bottom","2px solid #ff0000"),
          $('#a-two').css("border-bottom",""),
          $('.cou-right').css("display","none"),
          $('.cou-left').css("display","block")
      });
      $('#a-two').click(function(){
        $(this).css("border-bottom","2px solid #ff0000"),
          $('#a-one').css("border-bottom",""),
          $('.cou-right').css("display","block"),
          $('.cou-left').css("display","none")
      })
    }
  }
</script>

<style scoped>
  #cou{
    width: 1020px;
    min-height: 600px;
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
  #cou #cou-bottom{
    width: 100%;
    height: 740px;
    margin-top: 10px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  #cou #cou-bottom a{
    font-size: 14px;
    font-weight: bold;
    color: #ff0000;
    float: left;
    margin: 15px 0 0 15px;
    cursor: pointer;
  }
  #cou #cou-bottom .btn{
    width: 80px;
    height: 25px;
    line-height: 23px;
    font-size: 14px;
    color: #ff0000;
    background: #fff;
    border: 0;
    border: 1px solid #ff0000;
    float: right;
    margin: 15px 30px 0 0;
    cursor: pointer;
    text-align: center;
  }
  .cou-left{
    width: 715px;
    height: 120px;
    float: left;
    margin: 90px 0 0 35px;
    color: #000;
  }
  .cou-left #left{
    width: 305px;
    height: 100%;
    float: left;
    color: #313131;
  }
  #left .left-one{width: 305px;height: 45px;float: left;}
  .left-one h3{font-size: 16px;float: left; }
  .left-one p{
    margin-left: 20px;
    font-size: 14px;
    font-weight: bold;
    float: left;
  }
  .left-one p input{
    width: 55px;
    height: 20px;
    margin: 0 5px 0 5px;
    color: #ff0000;
    font-weight: bold;
    outline: none;
  }
  .left-one span{
    font-size: 12px;
    float: left;
    width: 100%;
    margin-top: 5px;
    margin-left: 102px;
    color: #707070;
  }
  #left .left-two{
    width: 305px;
    height: 45px;
    margin-top: 20px;
    float: left;
  }
  .left-two h3{
    font-size: 16px;
    float: left;
  }
  .left-two p{
    margin-left: 20px;
    font-size: 14px;
    font-weight: bold;
    float: left;
  }
  .left-two p input{
    width: 55px;
    height: 20px;
    margin: 0 5px 0 5px;
    color: #ff0000;
    font-weight: bold;
    outline: none;
  }
  .left-two span{
    font-size: 12px;
    float: left;
    width: 100%;
    margin-top: 5px;
    margin-left: 102px;
    color: #707070;
  }
  .cou-left #right{
    width: 245px;
    height: 100%;
    float: left;
    margin-left: 160px;
    font-size: 12px;
  }
  #right #check{
    width: 15px;
    height: 15px;
    float: left;
  }
  #right span{float: left;}
  #right .check{
    width: 15px;
    height: 15px;
    float: left;
    margin-left: 25px;
  }
  #right p{
    width: 100%;
    float: left;
    margin-top: 10px;
    color: #ff0000;
    text-indent: 15px;
    background: url("../../image/icon.png") no-repeat left 2px;
  }
  #right #btn{
    width: 190px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    float: left;
    margin-top: 25px;
    color: #fff;
    border: 0;
    font-weight: bold;
    border-radius: 2px;
    background: #ff0000;
    cursor: pointer;
  }
  #cou-bottom .cou-right{
    width: 100%;
    height: 490px;
    float: left;
    background: #fff;
    display: none;
    padding-top: 10px;
    box-sizing: border-box;
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

  #btn1{
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

