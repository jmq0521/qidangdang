<template>
  <div id="forgot-warp">
    <div id="forgot">
      <Top></Top>
      <div id="forgot-bottom">
        <form>
          <h3><mark></mark>找回密码</h3>
          <input type="text" v-model="phone" placeholder="请输入用户名"/>
          <input type="password" v-model="password" placeholder="请输入密码"/>
          <input type="password" v-model="rePassword" placeholder="请输入确认密码"/>
          <input type="text" v-model="code" placeholder="请输入手机验证码"/>
          <span id="span" @click="Code(2)">短信验证码</span>
          <p><input type="checkbox" v-model="checked"/>阅读并同意<mark @click="dialog=true">“用户服务协议”</mark></p>
          <div id="btn" @click="forgot()">注册</div>
        </form>
        <a id="a-two" @click="$router.push('/login')">已有账号？去登录&gt;</a>
      </div>
      <el-dialog
        title="重置密码用户服务协议"
        :visible.sync="dialog"
        top="200px"
        width="800px">
        <span v-html="item.content" v-for="item in agree" :key="item.id"></span>
        <span slot="footer" class="dialog-footer">
          <el-button  @click="dialog=false">取 消</el-button>
          <el-button type="primary" @click="confirm()">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <Foot></Foot>
  </div>
</template>
<script>
  import Foot from "../common/foot"
  import Top from "../common/top"
  export default {
    name: "forgot",
    data(){
      return{
        dialog:false,
        checked:true,
        phone: '',
        password:'',
        rePassword:'',
        code: '',
        agree:[]
      }
    },
    components:{
      Top,
      Foot
    },
    methods:{
      //确定协议
      confirm(){
        this.dialog=false;
        this.checked=true;
      },
      //重置密码
      forgot(){
        if($("input[type='checkbox']").is(':checked')==true){
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
              message: data.msg,
              type: 'success'
            })
            if(data.msg=='成功'){
              this.$router.push("/login");
            }
          })
        }else{
          this.dialog=true;
        }
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
            message: data.msg,
            type: 'success'
          })
        })
      },
      //获取服务协议
      getAgree(){
        this.$ajax.get("/system/agreemen-info",{
          params:{
            use_type:'pc',
            location_type:4
          }}).then(data=>{
          this.agree=data.data;
        })
      }
    },
    mounted(){
      this.getAgree()
    }
  }
</script>

<style scoped>
  #forgot-warp{width: 100%;background: url("../../image/resgier01.png") no-repeat center 80px;background-size:cover;}
  #forgot{width: 1200px;margin: 0 auto;}
  #forgot #forgot-bottom{width: 1200px;height: 690px;}
  #forgot-bottom form{
    float: left;
    width: 560px;
    height: 400px;
    background: #fff;
    margin-top: 128px;
    box-shadow: #d96c33 8px 8px 0px 0px;
  }
  form h3{
    height: 20px;
    line-height: 20px;
    color: #ff7800;
    font-size: 20px;
    margin-top: 30px;
    margin-left: 60px;
  }
  form h3 mark{
    width: 4px;
    height: 18px;
    line-height: 18px;
    background: #ff7800;
    float: left;
    margin-top: 2px;
    margin-right: 5px;
    border-radius: 14px;
  }
  form input{
    width: 330px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    margin: 20px 0 0 60px;
    color: #313131;
    border: 0;
    border: 1px solid #d0cfcf;
    border-radius: 3px;
    text-indent: 30px;
    float: left;
    outline: none;
  }
  form #span{
    float: left;
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin: 20px 0 0 10px;
    border: 1px solid #d0cfcf;
    border-radius: 3px;
    background: #e9e9e9;
    text-align: center;
    color: #666;
  }
  form input:nth-of-type(1){background: url("../../image/input01.png") no-repeat 10px center}
  form input:nth-of-type(2){background: url("../../image/input02.png") no-repeat 10px center}
  form input:nth-of-type(3){background: url("../../image/input05.png") no-repeat 10px center}
  form input:nth-of-type(4){background: url("../../image/input02.png") no-repeat 10px center}
  form p{
    margin: 10px 0 0 60px;
    font-size: 14px;
    float: left;
    font-weight: 500;
  }
  form p input{
    width: 13px;
    height: 13px;
    margin: 3px 5px 0 0;
    float: left;
  }
  form p mark{color: red;background: #fff;cursor: pointer;}
  form #btn{
    width: 330px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    margin: 35px 0 0 60px;
    color: #fff;
    border: 0;
    border-radius: 3px;
    background: #ff7800;
    cursor: pointer;
    float: left;
    text-align: center;
  }
  #forgot-bottom a{
    font-size: 18px;
    font-weight: bold;
    float: right;
    margin-top: 45px;
    color: #fff;
    cursor: pointer;
  }
</style>
