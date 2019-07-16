<template>
  <div id="reset">
    <div class="top">
      <h4>支付密码</h4>
    </div>
    <div id="reset-bottom">
      <div><span>手机号</span><input type="text" id="txt1" autocomplete="off" v-model="phone"/><mark id="put1">*手机号不能为空</mark></div>
      <div><span>验证码</span><input type="text" autocomplete="off" v-model="reset"/><div id="btn" @click="Code(3)">获取验证码</div></div>
      <div><span>提现密码</span><input type="password" id="txt2" autocomplete="new-password" v-model="password" /><mark id="put2">*密码不能为空</mark>
      </div>
      <div><span>确认提现密码</span><input type="password" id="txt3" autocomplete="new-password"  v-model="rePassword" /><mark id="put3">*确认密码不能为空</mark></div>
      <el-button id="btn1" type="primary" :loading="isLoading"  @click="upCode()">支付设置</el-button>
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
  </div>
</template>
<script>
    export default {
      name: "cod",
      data(){
        return{
          Sible:false,
          isLoading:false,
          phone: '',
          password:'',
          rePassword:'',
          reset: ''
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


        //重设提现密码
        upCode(){
          this.isLoading=true;
          this.$ajax.post("/user/depositPassword",{
            phone:this.phone,
            password:this.password,
            rePassword:this.rePassword,
            code :this.reset
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
  　　　    }, 3000)
          })
        },


          //验证码
        Code(type){
          this.$ajax.post("/user/validateCode",{
            type,
            phone:this.phone,
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              this.$message({
              message:data.msg,
              type: 'success'
            });
          })
        }
      },
      mounted(){
        this.getCenter();
        if(localStorage.is_audit==0){
          this.Sible=true;
        };
        //手机号
        $("#txt1").bind({
          // focus: function() {
          //   $(this).css("border-color", "#0ea0ec");
          // },
          blur: function() {
            $(this).css("border-color", "");
            if($(this).val() == ""){
              $("#put1").css("display", "inline-block");
            }else{
              $("#put1").css("display", "none");
            }
          }
        })
        //密码
        $("#txt2").bind({
          // focus: function() {
          //   $(this).css("border-color", "#0ea0ec");
          // },
          blur: function() {
            $(this).css("border-color", "");
            if($(this).val() == "") {
              $("#put2").css("display", "inline-block");
            }else{
              $("#put2").css("display", "none");
            }
          }
        })
        //确认密码
        $("#txt3").bind({
          // focus: function() {
          //   $(this).css("border-color", "#0ea0ec");
          // },
          blur: function() {
            $(this).css("border-color", "");
            if($(this).val() == ""){
              $("#put3").css("display", "inline-block");
            }else if($(this).val() != $("#txt2").val()){
              $("#put3").html("*俩次密码必须一致");
              $("#put3").css("color", "red");
            }else if($(this).val() === $("#txt2").val()){
              $("#put3").css("display", "none");
            }
          }
        })
      }
    }
</script>

<style scoped>
  #reset{
    width: 1020px;
    min-height: 600px;
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
  #reset #reset-bottom{
    width: 100%;
    height: 740px;
    margin-top: 10px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  #reset-bottom div{
    margin-top: 15px;
    font-size: 14px;
    color: #313131;
    width: 100%;
    height: 45px;
  }
  #reset-bottom div span{
    width: 140px;
    text-align: right;
    margin-left: 25px;
    height: 100%;
    line-height: 45px;
    float: left;
  }
  #reset-bottom div mark{
    background: #fff;
    color: red;
    font-size: 12px;
    margin-left: 5px;
    height: 100%;
    line-height: 45px;
    display: none;
  }

  #reset-bottom div input{
    width: 150px;
    height: 30px;
    border: 0;
    border: 1px solid #d2d2d2;
    border-radius:3px;
    margin-left:30px;
    text-indent: 5px;
    float: left;
    outline: none;
    margin-top: 7px;
  }
  #reset-bottom div:nth-of-type(2) #btn{
    width: 80px;
    height: 25px;
    line-height: 25px;
    margin: 10px 0 0 5px;
    font-size: 12px;
    background: #fbe4dc;
    text-align: center;
    color: #f74f14;
    float: left;
    cursor: pointer;
  }
  #reset-bottom div:nth-of-type(3) p{
    font-size: 12px;
    text-indent: 214px;
    color: #999999;
    float: left;
  }
  #reset-bottom #btn1{
    width: 150px;
    height: 30px;
    line-height: 30px;
    margin: 15px 0 0 195px;
    font-size: 14px;
    background: #ff0000;
    text-align: center;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
    border: none;
  }

   #bnt1{
    width: 120px;
    height: 35px;
    line-height: 35px;
    margin-left: 50px;
    border: none;
    border-radius: 25px;
    color: #e57339;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    margin: -13px auto;
   }
</style>
