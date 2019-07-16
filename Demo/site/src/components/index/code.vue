<template>
  <div id="code">
    <div class="top">
      <h4>修改密码</h4>
    </div>
    <div id="code-bottom">
      <div><span>手机号</span><input type="text" id="txt1" autocomplete="off" v-model="phone"/><mark id="put1">*手机号不能为空</mark></div>
      <div><span>请填写手机验证码</span><input type="text" autocomplete="off" v-model="code"/><div id="btn" @click="Code(2)">获取验证码</div></div>
      <div><span>请填写新密码</span><input type="password" id="txt2" autocomplete="new-password" v-model="password"/><mark id="put2">*密码不能为空</mark>
        <p>6-16个字符，需要使用字母、数字或符号组合，不能使用纯数字、纯字母、纯符号</p>
      </div>
      <div><span>请确认密码</span><input type="password" id="txt3" autocomplete="new-password" v-model="rePassword"/><mark id="put3">*确认密码不能为空</mark></div>
      <div id="btn1"  @click="upCode()">确认修改</div>
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
        phone: '',
        password:'',
        rePassword:'',
        code: ''
      }
    },
    methods:{
      //判断登录
      getCenter(){
        this.$ajax.post("/Person/userCentre",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          if(data.error_code==40015){
            localStorage.clear();
            this.$router.push('/login');
          }
        })
      },
      //修改密码
      upCode(){
        this.$ajax.post("/user/resetPassWord",{
          phone:this.phone,
          password:this.password,
          rePassword:this.rePassword,
          code:this.code
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.$message({
            message:data.msg,
            type:'success'
          });
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
          if(data.msg=='未知错误'){
            this.$message({
              message:'发送过去频繁，请稍后再试',
              type: 'warning'
            });
          }
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
  #code{
    width: 1020px;
    min-height: 600px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .top{height: 50px;background: #fff;}
  .top h4{
    text-indent: 30px;
    font-size: 14px;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  #code #code-bottom{
    width: 100%;
    height: 740px;
    margin-top: 10px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  #code-bottom div{
    margin-top: 15px;
    font-size: 14px;
    color: #313131;
    width: 100%;
    height: 45px;
  }
  #code-bottom div span{
    width: 140px;
    text-align: right;
    margin-left: 45px;
    height: 100%;
    line-height: 45px;
    float: left;
  }
  #code-bottom div mark{
    background: #fff;
    color: red;
    font-size: 12px;
    margin-left: 5px;
    height: 100%;
    line-height: 45px;
    display: none;
  }

  #code-bottom div input{
    width: 150px;
    height: 30px;
    border: 0;
    border: 1px solid #d2d2d2;
    border-radius:3px;
    margin-left:30px;
    text-indent:5px;
    float: left;
    outline: none;
    margin-top: 7px;
  }
  #code-bottom div:nth-of-type(2) #btn{
    width: 80px;
    height: 25px;
    line-height: 25px;
    margin: 10px 0 0 5px;
    font-size: 14px;
    background: #fbe4dc;
    text-align: center;
    color: #f74f14;
    float: left;
    cursor: pointer;
  }
  #code-bottom div:nth-of-type(3) p{
    font-size: 12px;
    text-indent: 214px;
    color: #999;
    float: left;
    width: 100%;
  }
  #code-bottom #btn1{
    width: 130px;
    height: 30px;
    line-height: 30px;
    margin: 15px 0 0 225px;
    font-size: 14px;
    background: #ff0000;
    text-align: center;
    color: #fff;
    border-radius: 2px;
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
