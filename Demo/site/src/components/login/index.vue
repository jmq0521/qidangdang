<template>
  <div>
    <div id="log-warp">
      <div id="log">
        <Top></Top>
        <div id="log-bottom">
          <form id="form-one" >
            <h6><mark></mark>用户登录</h6>
            <input type="text" v-model="phone" placeholder="请输入账号"  id="txt01" @keyup.enter="login"/>
            <span id="put01">*用户名不能为空</span>
            <input type="password" v-model="password" placeholder="请输入密码"   id="txt02" @keyup.enter="login"/>
            <span id="put02">*密码不能为空</span>
            <div id="btn" @click="login()"  @keyup.enter="login">登录</div>
            <a @click="$router.push('/resgier')" id="a-one">立即注册</a>
            <a id="one-a" @click="$router.push('/forgot')">忘记密码?</a>
          </form>
        </div>
        <Foot></Foot>
      </div>
    </div>
  </div>
</template>
<script>
  import Top from "../common/top"
  import Foot from "../common/foot"
  export default {
    name: "login",
    data() {
      return {
        phone: '',
        password: '',
        userToken: '',
        type:'',
        open:'',
        is_audit:''
      }
    },
    components:{
      Top,
      Foot
    },
    methods: {
      //登录
      login() {
        this.$ajax.post("/user/login", {
          phone:this.phone,
          password:this.password,
          unit_type:'pc',
          facility:'pc'
        }).then(data=>{
          if (data.error_code === 0) {
            this.userToken = data.data.access_token.access_token;
            this.type = data.data.access_token.type;
            this.open = data.data.access_token.is_integral_store;
            this.is_audit=data.data.access_token.is_audit;
            localStorage.setItem('token',this.userToken);
            localStorage.setItem('is_audit',this.is_audit);
            localStorage.setItem('type',this.type);
            localStorage.setItem('open',this.open);
            localStorage.setItem('phone',this.phone);
            localStorage.setItem('password',this.password);
            this.$router.push("/");
          }else{
            this.$message({
              message: data.msg,
              type: 'warning'
            })
          }
        })
      },
      
      //回车键登录
      // keyupEnter(){
      //   document.onkeydown = e =>{
      //     let body = document.getElementsByTagName('body')[0]
      //     if (e.keyCode === 13 && e.target.baseURI.match(/inputbook/) && e.target === body) {
      //         console.log('enter')
      //         this.login()
      //     }
      //   }
      // },
       keyupEnter:function(e){
        var keyCode = window.event? e.keyCode:e.which;
        if(keyCode == 13){
          this.login()
        }
      }

    },
    mounted(){
      $("#txt01").bind({
        blur: function() {
          $(this).css("border-color", "");
          if ($(this).val() == "") {
            $("#put01").css("opacity", "0.9");
          }else{
            $("#put01").css("opacity", "0");
          }
        }
      }),
      //密码
      $("#txt02").bind({
        blur: function() {
          $(this).css("border-color", "");
          if ($(this).val() == "") {
            $("#put02").css("opacity", "0.9");
          }else{
            $("#put02").css("opacity", "0");
          }
        }
      })
    }
  }
</script>

<style scoped>
  #log-warp{width: 100%;background: url("../../image/login1.png") no-repeat 0 80px;background-size:cover;}
  #log{width: 1200px;margin: 0 auto;}
  #log #log-bottom{width: 1200px;height: 500px;}

  #log-bottom #form-one{
    width: 400px;
    height: 350px;
    background: #fff;
    float: right;
    margin: 70px 40px 0 0;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    box-shadow: #d96c33 8px 8px 0px 0px;
  }
  #form-one h6{
    height: 20px;
    line-height: 20px;
    color: #ff7800;
    font-size: 20px;
    margin-top: 30px;
  }
  #form-one h6 mark{
    width: 4px;
    height: 18px;
    line-height: 18px;
    background: #ff7800;
    float: left;
    margin-top: 2px;
    margin-right: 5px;
    border-radius: 14px;
  }
  #form-one #txt01{
    width: 320px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    margin-top: 30px;
    color: #313131;
    border: 0;
    border: 1px solid #d0cfcf;
    border-radius: 2px;
    text-indent: 30px;
    float: left;
    display: block;
    outline: none;
  }
  #form-one #txt02{
    width: 320px;
    height: 40px;
    line-height: 40px;
    font-size: 12px;
    margin-top: 20px;
    color: #313131;
    border: 0;
    border: 1px solid #d0cfcf;
    border-radius: 2px;
    text-indent: 30px;
    float: left;
    display: block;
    outline: none;
  }
  #form-one input:nth-of-type(1){background: url("../../image/input01.png") no-repeat 10px center}
  #form-one input:nth-of-type(2){background: url("../../image/input02.png") no-repeat 10px center}
  #form-one span{
    width: 380px;
    font-size: 12px;
    color: red;
    opacity: 0;
    float: left;
  }
  #form-one #btn{
    width: 320px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    margin-top: 25px;
    color: #fff;
    border: 0;
    border-radius: 3px;
    background: #ff7800;
    text-align: center;
    float: left;
    cursor: pointer;
  }
  #form-one #a-one{
    margin-top: 10px;
    color: #ff7800;
    float: left;
    font-size: 14px;
    cursor: pointer;
  }
  #form-one #one-a{
    margin-top: 10px; 
    color: #ff7800;
    float: right;
    margin-right: 18px;
    font-size: 14px;
    cursor: pointer;
  }
</style>
