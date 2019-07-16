<template>
  <div id="bank">
    <div class="top">
      <h4>我的快捷卡</h4>
    </div>
    <div id="bank-box">
      <div class="img-five" v-for="item in banklist" :key="item.id">
        <div id="header">
          <p>{{item.bank_name}}</p>
          <span>尾号{{item.bank_account}}</span>
        </div>
        <div id="footer">
          <p>持卡人姓名：{{item.bank_user_name}}</p>
          <p>手机号：{{item.phone}}</p>
          <div class="btn" @click="delBank(item.id)">删除银行卡</div>
        </div>
      </div>

      <div class="img-four" style="margin-bottom: 20px;" @click="Visible = true">
        <i class="el-icon-circle-plus-outline"></i>
        <p>添加快捷卡</p>
      </div>
    </div>
    
    <el-dialog
      style="text-align: center"
      title="添加银行卡"
      :visible.sync="dialogVisible"
      :close-on-click-modal="false"
      top="180px"
      width="580px">
      <p id="add"><span>银行名称</span><input type="text" autocomplete="off" v-model="bank_name" placeholder="填写银行名称"/></p>
      <p id="add"><span>开户银行</span><input type="text" autocomplete="off" v-model="branch_bank" placeholder="填写开户行名称"/></p>
      <p id="add"><span>银行卡号</span><input type="text" autocomplete="off" v-model="bank_account" placeholder="填写银行卡号"/></p>
      <p id="add"><span>持卡人名</span><input type="text" autocomplete="off" v-model="bank_user_name" placeholder="持卡人与银行卡注册名一致"/></p>
      <p id="add"><span>身份证号</span><input type="text" autocomplete="off" v-model="person_card" placeholder="填写身份证号"/></p>
      <p id="add"><span>手机号码</span><input type="text" autocomplete="off" v-model="phone" placeholder="填写银行预留手机号"/></p>
      <p id="add">
        <span>省、市</span>
        <select v-model="pro" @change="getCity(pro)" id="s1">
          <option value="">请选择省份</option>
          <option v-for="item in province" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
        </select>
        <select v-model="cit" id="s2">
          <option value="">请选择城市</option>
          <option v-for="item in city" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
        </select>
      </p>
      <p id="add">
        <span>账号属性</span>
        <input type="radio" id="one" value="1" v-model="type">
        <label for="one">公司</label>
        <input type="radio" id="two" value="2" v-model="type">
        <label for="two">个人</label>
      </p>
      <span slot="footer" class="dialog-footer">
        <div id="btn3" @click="addBank()">保存设置</div>
      </span>
    </el-dialog>

   
    <el-dialog
      :visible.sync="Visible"
      style="text-align: center"
      title="验证密码"
      :show-close="false"
      top="300px"
      width="425px">
      <input type="password" v-model="code" autocomplete="new-password" placeholder="请输入提现密码" style="height:30px;text-align:center;outline:none;margin-top:10px;"/>
      <span slot="footer" class="dialog-footer">
        <div id="btn1" @click="verCode()">确认</div>
        <div id="btn2" @click="Visible = false">取消</div>
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
      name: "bank",
      data(){
          return{
            dialogVisible: false,
            Visible: false,
            Sible:false,
            banklist:[],
            bank_name:'',
            bank_account:'',
            bank_user_name:'',
            person_card:'',
            branch_bank:'',
            phone:'',
            total: 1,
            page: 1,
            type:'',
            code:'',
            pro:'',
            cit:'',
            province:[],
            city:[]
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
            if(data.error_code==40015){
              localStorage.clear();
              this.$router.push('/login');
            }
          })
        },
        //显示商家银行卡列表
        getBank(page){
          this.$ajax.post("/finance/lists",{
            page,
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              this.total=data.data.last_page
              this.banklist=data.data.data;
            })
        },
        //添加银行卡
        addBank(){
          var select1 = document.getElementById("s1");
          var select2 = document.getElementById("s2");

          let options1 = select1.options;
          let index1 = select1.selectedIndex;

          let options2 = select2.options;
          let index2 = select2.selectedIndex;

          this.$ajax.post("/finance/addBank",{
            bank_name:this.bank_name,
            bank_account:this.bank_account,
            bank_user_name:this.bank_user_name,
            person_card:this.person_card,
            phone:this.phone,
            bank_type:this.type,
            branch_bank:this.branch_bank,
            province:options1[index1].text,
            city:options2[index2].text,
          },{
            headers:{
              'token' :localStorage.token
            }}).then(data=>{
              console.log(this.type,23454);
              console.log(options2[index2].text,23456);
            
              this.$message({
                message: data.msg,
                type: 'success'
              });
              if(data.msg=='成功'){
                this.dialogVisible=false;
              };
              this.getBank();    
          })
        },
        //删除银行卡
        delBank(id){
          this.$ajax.post("/finance/delBank",{
            id
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              this.getBank();
          })
        },

        //验证提现密码
        verCode(){
          this.$ajax.post("/finance/verify-bank-password",{
            password:this.code
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            if(data.msg=='成功'){
              this.$message({
                message: data.msg,
                type: 'success'
              });
              this.Visible=false;
              this.dialogVisible=true;
              this.code=''
            }else{
              this.$message({
                message: data.msg,
                type: 'warning'
              });
              this.$router.push('/reset')
            }
          })
        },

         //获取地区的三级联动
        getPro(code){
          this.$ajax.post("/system/getcity",{
           code
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.province=data.data;
          })
        },
        getCity(code){
          this.$ajax.post("/system/getcity",{
            code
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.city=data.data;
          })
        }
      },
      mounted(){
        this.getCenter();
        this.getBank(this.page);
        this.getPro(0);
        if(localStorage.is_audit==0){
          this.Sible=true;
        };
        $(".img-four").click(function(){
          $("#addBank").css("display","block")
        });
        $(".el-icon-close").click(function(){
          $("#addBank").css("display","none")
        });
      }
    }
</script>

<style scoped>
  #bank{
    width: 1020px;
    min-height: 800px;
    margin-top: 10px;
    overflow: hidden;
    position: relative;
  }
  .top{height: 50px;background: #fff;}
  .top h4{
   text-indent: 28px;
   font-size: 14px;
   line-height: 50px;
   float: left;
   color: #313131;
 }
  .top span{
   line-height: 50px;
   font-size: 12px;
   font-weight: bold;
   margin-left: 15px;
   color: #626262;
 }
  span mark{color: #ea3323;background: #ffffff;}
  #bank #bank-box{
    width: 1020px;
    min-height: 780px;
    background: #ffffff;
    margin-top: 10px;
    float: left;
    padding-top: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
 .img-four{
   width: 300px;
   height: 150px;
   float: left;
   margin-left: 27px;
   margin-top: 20px;
   border: 1px solid #ff0000;
   border-radius: 2px;
   cursor: pointer;
 }
  .img-four i{
    font-size: 30px;
    margin-top: 50px;
    margin-left: 135px;
    color: #ff0000;
  }
  .img-four p{
    font-size: 14px;
    font-weight: bold;
    margin-top: 15px;
    color: #ff0000;
    text-align: center;
  }
  .img-five{
    width: 296px;
    height: 150px;
    float: left;
    margin-left: 30px;
    margin-top: 20px;
    border: 1px solid #ff0000;
    border-radius: 2px;
  }
  .img-five #header{width: 100%;height: 55px;border-bottom: 1px solid #ff0000;}
  .img-five #header img{margin: 18px 0 0 18px;float: left;}
  .img-five #header p{
    height: 55px;
    float: left ;
    line-height: 55px;
    font-size: 12px;
    margin-left: 18px;
    font-weight: bold;
    color: #ff0000;
  }
  .img-five #header span{
    height: 55px;
    float: right;
    line-height: 55px;
    font-size: 12px;
    margin-right: 18px;
    font-weight: bold;
    color: #626262;
  }
  .img-five #footer p:nth-of-type(1){
    font-size: 12px;
    margin-top: 20px;
    text-indent: 18px;
  }
  .img-five #footer p:nth-of-type(2){
    font-size: 12px;
    margin-top: 10px;
    float: left;
    text-indent: 18px;
    width: 150px;
  }
  .img-five #footer .btn{
    font-size: 12px;
    margin-top: 25px;
    float: right;
    margin-right: 18px;
    color: #ff0000;
    border: 0;
    background: #fff;
    cursor: pointer;
  }
  #add{font-size: 14px;width: 450px;height: 30px; margin-top: 10px;}
  #add span{
    text-align:left;
    width: 80px;
    height: 25px;
    line-height: 25px;
    float: left;
    margin-left: 100px;
    color: #626262;
  }
  #add input{
    width: 250px;
    height: 25px;
    text-indent: 5px;
    border: 0;
    border: 1px solid #b2b2b2;
    border-radius: 3px;
    outline: none;
  }
  #add:nth-of-type(8) input:nth-of-type(1){
    margin: 7px 0 0 10px;
    float: left;
    width: 15px;
    height: 15px;
  }
  #add:nth-of-type(8) label:nth-of-type(1){
    margin-top: 5px;
    margin-left: 10px;
    float: left;
    font-size: 12px;
  }
  #add:nth-of-type(8) input:nth-of-type(2){
    margin: 8px 0 0 15px;
    float: left;
    width: 15px;
    height: 15px;
  }
  #add:nth-of-type(8) label:nth-of-type(2){
    margin-top: 5px;
    margin-left: 10px;
    font-size: 12px;
    float: left;
  }
  #add #s1{
    width: 122px;
    color: #626262;
    border-radius: 3px;
    height: 25px;
  }
  #add #s2{
    width: 122px;
    color: #626262;
    border-radius: 3px;
    height: 25px;
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
    float: left;
    margin-top: -13px;
  }
  #btn2{
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


  #btn3{
    width: 120px;
    height: 35px;
    line-height: 35px;
    margin-right: 30px;
    border: 1px solid #e57339;
    border-radius: 25px;
    color: #e57339;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    float: right;
    margin-top: -13px;
  }
</style>