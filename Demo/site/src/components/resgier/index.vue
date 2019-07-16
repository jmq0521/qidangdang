<template>
  <div id="resgier-warp">
    <div id="resgier">
      <Top></Top>
      <div id="resgier-bottom">
        <form>
          <h3><mark></mark>注册企铛铛账号</h3>
          <input type="text" v-model="phone" autocomplete="off" placeholder="请输入手机号" id="txt1"/>
          <span id="put1">*手机号不能为空</span>
          <input type="text" v-model="code" autocomplete="off" placeholder="请输入验证码" id="txt7"/>
          <mark id="span" @click="Code(1)">短信验证码</mark>
          <span id="put7">*验证码不能为空</span>
          <input type="password" v-model="password" autocomplete="off" placeholder="请输入密码" id="txt2"/>
          <span id="put2">*密码不能为空</span>
          <input type="password" v-model="rePassword" autocomplete="off" placeholder="请确认密码" id="txt3"/>
          <span id="put3">*确认密码不能为空</span>
          <input type="text" v-model="trueName" autocomplete="off" placeholder="请输入商家名称" id="txt4"/>
          <span id="put4">*商家名称不能为空</span>
          <input type="text" v-model="nickName" autocomplete="off" placeholder="请输入负责人名" id="txt5"/>
          <span id="put5">*负责人名不能为空</span>
          <select id="s1">
            <option value="0">会员类型</option>
            <option v-for="item in vitName" :value="item.id" :key="item.id">{{item.name}}</option>
          </select>
          <input type="text" v-model="invitecode" autocomplete="off" placeholder="请输入邀请码" id="txt6"/>
          <span id="put6">*邀请码不能为空</span>
          <p><input type="checkbox" v-model="checked"/>阅读并同意<mark @click="dialog=true">“用户服务协议”</mark></p>
          <div id="btn1" @click="resgier()">注册</div>
        </form>
        <a id="a-two" @click="$router.push('/login')">已有账号？去登录&gt;</a>
      </div>
      <el-dialog
        class="el"
        title="注册用户服务协议"
        :visible.sync="dialog"
        top="200px"
        width="800px">
        <span v-html="item.content" v-for="item in agree" :key="item.id"></span>
        <span slot="footer" class="dialog-footer">
          <el-button  @click="dialog=false">取 消</el-button>
          <el-button type="primary" >确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <Foot></Foot>
  </div>
</template>

<script>
    import Top from "../common/top"
    import Foot from "../common/foot"
    export default {
      name: "index",
      data() {
        return {
          dialog:false,
          checked:true,
          vitName:[],
          phone: '',
          password:'',
          rePassword: '',
          trueName:'',
          nickName:'',
          invitecode:'',
          userType:'',
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
        
        //注册
        resgier(){
          if($("input[type='checkbox']").is(':checked')==true){
            var select = document.getElementById("s1");
            let options = select.options;
            let index = select.selectedIndex;
            this.$ajax.post("/user/register",{
              phone:this.phone,
              password:this.password,
              rePassword:this.rePassword,
              invitecode:this.invitecode,
              trueName:this.trueName,
              nickName:this.nickName,
              userType:options[index].value,
              code:this.code
            },{
              headers: {
                'token' :localStorage.token
              }}).then(data=>{
              this.$message({
                message: data.msg,
                type: 'warning'
              })
              if(data.msg=='注册成功'){
                this.$router.push('/login')
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
              type:'warning'
            })
          })
        },


        //商户注册分类
        getVit(){
          this.$ajax.post("/user/userClassify",{
            invite_code:13675066212
            },{}).then(data=>{
            this.vitName=data.data;
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
        this.getVit();
        this.getAgree();

        //用户名
        $("#txt1").bind({
          blur: function() {
            $(this).css("border-color", "");
            if($(this).val() == "") {
              $("#put1").css("opacity", "0.9");
            }else{
              $("#put1").css("opacity", "0");
            }
          }
        })
        //密码
        $("#txt2").bind({
          blur: function() {
            $(this).css("border-color", "");
            if($(this).val() == "") {
              $("#put2").css("opacity", "0.9");
            }else{
              $("#put2").css("opacity", "0");
            }
          }
        })
        //确认密码
        $("#txt3").bind({
          blur: function() {
            $(this).css("border-color", "");
            if($(this).val() == ""){
              $("#put3").css("opacity", "0.9");
            }else if($(this).val() != $("#txt2").val()){
              $("#put3").html("*俩次密码必须一致");
              $("#put3").css("color", "red");
            }else if($(this).val() === $("#txt2").val()){
              $("#put3").css("opacity", "0");
            }
          }
        })
        //商家名称
        $("#txt4").bind({
          blur: function() {
            $(this).css("border-color", "");
            if($(this).val() == ""){
              $("#put4").css("opacity", "0.9");
            }else{
              $("#put4").css("opacity", "0");
            }
          }
        })
        //负责人名
        $("#txt5").bind({
          blur: function() {
            $(this).css("border-color", "");
            if($(this).val() == ""){
              $("#put5").css("opacity", "0.9");
            }else{
              $("#put5").css("opacity", "0");
            }
          }
        })
        //邀请码
        $("#txt6").bind({
          blur: function() {
            $(this).css("border-color", "");
            if($(this).val() == ""){
              $("#put6").css("opacity", "0.9");
            }else{
              $("#put6").css("opacity", "0");
            }
          }
        })
        //验证码
        $("#txt7").bind({
          blur: function() {
            $(this).css("border-color", "");
            if($(this).val() == "") {
              $("#put7").css("opacity", "0.9");
            }else{
              $("#put7").css("opacity", "0");
            }
          }
        })
      }
    }
</script>

<style scoped>
  #resgier-warp{width: 100%;background: url("../../image/resgier01.png") no-repeat center 80px;background-size:cover;}
  #resgier{width: 1200px;margin: 0 auto;}
  #resgier #resgier-bottom{width: 1200px;height: 690px;}
  #resgier-bottom form{
    float: left;
    width: 630px;
    height: 650px;
    background: #fff;
    margin-top: 20px;
    box-shadow: #d96c33 8px 8px 0px 0px;
  }
  form h3{
    height: 20px;
    line-height: 20px;
    color: #ff7800;
    font-size: 20px;
    margin-top: 30px;
    margin-left: 60px;
    margin-bottom: 20px;
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
    margin: 5px 0 0 60px;
    color: #313131;
    border: 0;
    border: 1px solid #d0cfcf;
    border-radius: 3px;
    text-indent: 35px;
    float: left;
    display: block;
    outline: none;
  }
  form select{
    width: 330px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    margin: 5px 0 20px 60px;
    color: #ff7800;
    border: 0;
    border: 1px solid #d0cfcf;
    border-radius: 3px;
    text-indent: 30px;
    background: url("../../image/input04.png") no-repeat 10px center;
    float: left;
  }
  form input:nth-of-type(1){background: url("../../image/input01.png") no-repeat 10px center}
  form input:nth-of-type(2){background: url("../../image/input02.png") no-repeat 10px center}
  form input:nth-of-type(3){background: url("../../image/input02.png") no-repeat 10px center}
  form input:nth-of-type(4){background: url("../../image/input03.png") no-repeat 10px center}
  form input:nth-of-type(5){background: url("../../image/input03.png") no-repeat 10px center}
  form input:nth-of-type(6){background: url("../../image/input05.png") no-repeat 10px center}
  form input:nth-of-type(7){background: url("../../image/input07.png") no-repeat 10px center}
  form span{
    width: 330px;
    display:block;
    font-size: 12px;
    color: red;
    margin-left: 60px;
    opacity: 0;
    float: left;
  }
  form #span{
    float: left;
    width: 100px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    margin: 5px 0 0 10px;
    border: 1px solid #d0cfcf;
    border-radius: 3px;
    background: #e9e9e9;
    text-align: center;
    cursor: pointer;
    color: #666;
  }
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
  form #btn1{
    width: 330px;
    height: 38px;
    line-height: 38px;
    font-size: 14px;
    margin: 25px 0 0 60px;
    color: #fff;
    border: 0;
    border-radius: 3px;
    background: #ff7800;
    float: left;
    cursor: pointer;
    text-align: center;
  }
  #resgier-bottom a{
    font-size: 18px;
    font-weight: bold;
    float: right;
    margin-top: 45px;
    color: #fff;
    cursor: pointer;
  }
</style>




