<template>
  <div id="addre">
    <div class="top">
      <h4>收货地址</h4>
      <div id="but" @click="$router.go(-1)">返回</div>
    </div>
    <div id="addre-bottom">
      <!-- <h6 @click="$router.push('/address')">地址明细</h6> -->
      <h5 @click="Visible = true" :style="{display:address.length===0?'block':'none'}">添加地址</h5>
      <div id="box" v-for="(item,index) in address" v-if="index<1" :key="item.id">
        <span>{{item.receive_name}}</span>
        <div id="btn">默认地址</div>
        <span>设置时间：2019-01-10 17：55:22</span>
        <p>收货人：<mark>{{item.receive_name}}</mark></p>
        <p>收货地址：<mark>{{item.province_name}}  {{item.city_name}}  {{item.county_name}}</mark></p>
        <p>联系电话：<mark>{{item.mobile}}</mark></p>
        <p>有效期：<mark>永久</mark></p>
        <div id="btn1">注：地址不能修改，请谨慎填写</div>
      </div>
    </div>
     <!-- <el-dialog
      style="text-align: center;"
      title="修改收货地址"
      :visible.sync="dialogVisible"
      top="180px"
      width="580px">
      <p id="add"><span>手机号</span><input type="text" v-model="phone" placeholder="填写手机号"/></p>
      <p id="add"><span>收货人</span><input type="text" v-model="receive_name" placeholder="填写收货人"/></p>
      <p id="add"><span>所在地区</span>
          <select v-model="pro" @change="getCity(pro)" id="s4">
            <option value="">请选择省份</option>
            <option v-for="item in province" :value="item.Code">{{item.AreaName}}</option>
          </select>
          <select v-model="cit" @change="getDis(cit)" id="s5">
            <option value="">请选择城市</option>
            <option v-for="item in city" :value="item.Code">{{item.AreaName}}</option>
          </select>
          <select v-model="dist" id="s6">
            <option value="">请选择区县</option>
            <option v-for="item in dis" :value="item.Code">{{item.AreaName}}</option>
          </select>
      </p>
      <p id="add"><span>详细地址</span><input type="text" v-model="Address" placeholder="填写详细地址" /></p>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="upAddress()">保存设置</el-button>
        </span>
    </el-dialog> -->

     <el-dialog
      style="text-align: center;"
      title="添加收货地址"
      :visible.sync="Visible"
      top="180px"
      width="580px">
      <p id="add"><span>手机号</span><input type="text" v-model="phone" autocomplete="off"  placeholder="填写手机号"/></p>
      <p id="add"><span>收货人</span><input type="text" v-model="receive_name"  autocomplete="off" placeholder="填写收货人"/></p>
      <p id="add"><span>所在地区</span>
        <select v-model="pro" @change="getCity(pro)" id="s1">
          <option value="">请选择省份</option>
          <option v-for="item in province" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
        </select>
        <select v-model="cit" @change="getDis(cit)" id="s2">
          <option value="">请选择城市</option>
          <option v-for="item in city" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
        </select>
        <select v-model="dist" id="s3">
          <option value="">请选择区县</option>
          <option v-for="item in dis" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
        </select>
      </p>
      <p id="add"><span>详细地址</span><input type="text" v-model="Address" autocomplete="off" placeholder="填写详细地址" /></p>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addAddress()">保存设置</el-button>
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
      name: "add",
      data(){
        return{
          Sible:false,
          dialogVisible: false,
          Visible: false,
          address:[],
          num:'',
          pro:'',
          cit:'',
          dist:'',
          province:[],
          city:[],
          dis:[],
          phone:'',
          receive_name:'',
          Address:'',
          type:"edit",
          Type:"add",
          id:''
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
        //显示地址
        getaddress(){
          this.$ajax.post("/person/receiveAddrList",{},{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.address=data.data.data;
            this.num=data.data.data.length;
            console.log(3123,this.num)
          })
        },
        //添加收货地址
        addAddress(){
          var select1 = document.getElementById("s1");
          var select2 = document.getElementById("s2");
          var select3 = document.getElementById("s3");
          let options1 = select1.options;
          let index1 = select1.selectedIndex;
          let options2 = select2.options;
          let index2 = select2.selectedIndex;
          let options3 = select3.options;
          let index3 = select3.selectedIndex;
           this.$ajax.post("/person/receiveAddrAction",{
            phone:this.phone,
            receive_name:this.receive_name,
            province:options1[index1].value,
            city:options2[index2].value,
            county:options3[index3].value,
            address:this.Address,
            type:this.Type,
            is_default:0,
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              this.$message({
                message:data.msg,
                type:'success'
              })
              if(data.msg=='成功'){
                this.Visible=false;
                this.getaddress();
              }
          })
        },
        //修改收货地址
        upAddress(){
          var select4 = document.getElementById("s4");
          var select5 = document.getElementById("s5");
          var select6 = document.getElementById("s6");
          let options4 = select4.options;
          let index4 = select4.selectedIndex;
          let options5 = select5.options;
          let index5 = select5.selectedIndex;
          let options6 = select6.options;
          let index6 = select6.selectedIndex;
           this.$ajax.post("/person/receiveAddrAction",{
            phone:this.phone,
            receive_name:this.receive_name,
            province:options4[index4].value,
            city:options5[index5].value,
            county:options6[index6].value,
            address:this.Address,
            id:this.id,
            type:this.type,
            is_default:1
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              this.$message({
                message: data.msg,
                type: 'success'
              });
              if(data.msg==="成功"){
                this.dialogVisible=false;
                this.getaddress();
                
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
            this.city=data.data;
            this.dis=data.data;
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
        },
        getDis(code){
          this.$ajax.post("/system/getcity",{
              code
            },{
              headers: {
                'token' :localStorage.token
              }}).then(data=>{
              this.dis=data.data;
          })
        }
      },
      mounted(){
        this.getCenter();
        this.getaddress();
        this.getPro(0);
        if(localStorage.is_audit==0){
          this.Sible=true;
        };
      }
    }
</script>

<style scoped>
  #addre{
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
  .top #but{
    width: 65px;
    font-size: 14px;
    height: 25px;
    border-radius: 3px;
    border: 1px solid #ff0000;
    line-height: 23px;
    margin-top: 8px;
    float: right;
    color: #ff0000;
    text-align: center;
    margin-right: 30px;
    cursor: pointer;
  }

  #addre #addre-bottom{
    width: 100%;
    height: 740px;
    margin-top: 10px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  #addre-bottom #box:hover{border-color: #ff0000;}
  #addre-bottom h5{
    margin-top: 20px;
    margin-left: 60px;
    font-size: 14px;
    width: 80px;
    text-align: center;
    height: 25px;
    line-height: 23px;
    color: #ff0000;
    border: 1px solid #FF0000;
    border-radius: 5px;
    cursor: pointer;
    font-weight: normal;
    float: left;
  }
  #addre-bottom h6{
    margin-top: 20px;
    margin-right: 60px;
    font-size: 14px;
    width: 80px;
    font-weight: normal;
    text-align: center;
    height: 20px;
    line-height: 20px;
    color: #ff0000;
    border: 1px solid #FF0000;
    border-radius: 5px;
    cursor: pointer;
    float: right;
  } 

  #addre-bottom #box{
    width: 900px;
    height: 210px;
    margin:15px 0 0 60px;
    border: 1px solid #eeeeee;
    float: left;
    border-radius: 3px;
  }

  #box span:nth-of-type(1){
    width: 60px;
    font-size: 14px;
    color: #313131;
    text-align: center;
    line-height: 40px;
    display: inline-block;
    margin-left: 10px;
  }
  #box #btn{
    width: 80px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    color: #ffffff;
    background: #ff0000;
    display: inline-block;
    margin: 10px 0 0 5px;
    border-radius: 3px;
  }
  #box span:nth-of-type(2){
    font-size: 14px;
    font-weight: normal;
    color: #626262;
    float: right;
    margin: 10px 20px 0 0;
  }
  #box p{
    font-size: 14px;
    color: #313131;
    margin: 10px 0 0 15px;
  }
  #box p mark{
    background: #ffffff;
    font-weight: normal;
    color: #b2b2b2;
    font-size: 12px;
  }
  #box #btn1{
    width: 200px;
    height: 20px;
    line-height: 20px;
    float: right;
    font-size: 14px;
    color: #ff0000;
    cursor: pointer;
  }
  #input1 {
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #input1 input{
    width: 180px;
    height: 25px;
    margin: 5px 0 0 20px;
  }
  #input2 {
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #input2 input{
    width: 180px;
    height: 25px;
    margin: 15px 0 0 20px;
  }

  #add{margin-top: 15px;font-size: 14px;width: 470px;height: 30px; }
  #add span{
    text-align:left;
    width: 80px;
    height: 30px;
    line-height: 30px;
    float: left;
    margin-left: 100px;
    font-weight: bold;
    color: #000000;
  }
  #add input{
    width: 260px;
    height: 25px;
    text-indent: 5px;
    border: 0;
    border: 1px solid #b2b2b2;
    border-radius: 3px;
    outline: none;
  }
  #add select{
    width: 85px;
    font-size: 12px;
    margin: 3px 0 0 0px;
    height:25px;
    border: 1px solid #d2d2d2;
    border-radius: 3px;
    color: #616161;
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
