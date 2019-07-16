<template>
  <div id="ren">
    <div id="top">
      <h4>升级支付</h4>
      <div id="but" @click="$router.go(-1)">返回</div>
    </div>
    <div id="ren-table">
      <div id="box">
        <mark></mark>
        <span id="span">开通时长</span>
        <div  v-for="(item,index) in upList" :key="item.user_type">
          <div class="b-box" :data="item.link_info.name" :data-id="item.link_info.phone"  @click="type(item,index)" :class= "isactive === index ? 'addclass' : '' ">
            <div id="open">
              <a>{{item.name}}</a>
              <a>{{item.price}}元{{item.time ?'/'+item.time+'月':item.time}}</a>
            </div>
          </div>
        </div>
      </div>
      <p id="check">
        <input type="checkbox" v-model="checked">
        <span>我已经阅读并同意<mark @click="dialog=true">《企业用户合作协议》</mark></span>
      </p>
      <div id="btn" @click="gopay()">确认升级</div>
    </div>

    <el-dialog
      :visible.sync="Visible"
      style="text-align: center"
      title="联系方式"
      :show-close="false"
      :close-on-click-modal="false"
      top="300px"
      width="425px">
      <img src="../../image/kf.png" style="margin-top:10px;"/>
      <p>
        <a id="title1">联系人：{{name}}</a>
        <a id="title2">联系电话：{{phone}}</a>
      </p>
      <span slot="footer" class="dialog-footer">
        <div id="btn1" type="primary"  @click="Visible=false">确认</div>
      </span>
    </el-dialog>

    <el-dialog
      title="升级支付企业用户合作协议"
      :visible.sync="dialog"
      top="300px"
      width="600px">
      <span v-html="item.content" v-for="item in agree" :key="item.id"></span>
      <span slot="footer" class="dialog-footer">
        <el-button  @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="confirm()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "ren",
    data(){
      return{
        dialog:false,
        checked:true,
        upList:[],
        Visible:false,
        value:'',
        isactive:0,
        agree:[],
        name:'',      
        phone:''
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
      //选择用户类型
      type(item,index){
        this.isactive=index;
        this.name=item.link_info.name;
        this.phone=item.link_info.phone;
        console.log(this.name,this.phone,55454);
      },

      //升级显示
      upPay(){
        this.$ajax.post("/invite/user/up/link",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.upList=data.data.renew_info;
          console.log( this.upList,23332323);
        })
      },
   
      //支付
      gopay(){
        if($("input[type='checkbox']").is(':checked')==false){
          this.dialog=true
        }else{
          if(this.name == ''){
            var name =  $('.addclass').attr('data');
            this.name=name;
          }else{
            var name = this.name;
            this.name=name;
          }
          if(this.phone == ''){
            var phone =  $('.addclass').attr('data-id');
            this.phone=phone;
          }else{
            var phone= this.phone;
            this.phone=phone;
          }
          this.Visible=true
        }
      },
       
      //获取服务协议
      getAgree(){
        this.$ajax.get("/system/agreemen-info",{
          params:{
            use_type:'pc',
            location_type:2
          }}).then(data=>{
          this.agree=data.data;
        })
      },
      
      //确定协议
      confirm(){
        this.dialog=false;
        this.checked=true;
      }
    },
    mounted(){
      this.getCenter();
      this.upPay();
      this.getAgree();
    }
  }
</script>

<style scoped>


.b-box{ width: 250px;float: left;text-align: center;border-radius:4px;
  height: 100px;padding: 5px; border:3px solid #b2b2b2;margin-left: 15px;}

.b-box:hover #open{border-color:#f60}


 .addclass{
    border-color:#f60
  }
  #ren{
    width: 1020px;
    margin-top: 10px;
  }
  #ren #top{
    width: 100%;
    height: 50px;
    background: #fff;
  }
  #top h4{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-indent: 15px;
    float: left;
    color: #313131;
  }
  #top #but{
    width: 65px;
    height: 25px;
    float: right;
    line-height: 23px;
    border: 1px solid #ff0000;
    border-radius: 3px;
    color: #ff0000;
    font-size: 14px;
    text-align: center;
    margin: 13px 30px 0 0;
    cursor: pointer;
  }
  #ren #ren-table{
    width: 1020px;
    min-height: 740px;
    background: #fff;
    margin-top: 10px;
    float: left;
    margin-bottom: 20px;
  }
 
  #ren-table #box{
    width: 100%;
    height: 100px;
    margin-top: 15px;
    float: left;
  }
  #box mark{
    width: 5px;
    height: 20px;
    background: #d5443d;
    float: left;
    margin-left: 35px;
    margin-top: 2px;
  }
  #box #span{
    font-size: 14px;
    color: #313131;
    float: left;
    margin-left: 15px;
    margin-top: 2px;
  }
  #box #open{
    width: 235px;
    height: 85px; 
    line-height:90px;
    float: left;
    border-radius: 3px;
    border:1px solid #eee;
    font-size: 14px;
    text-align: center;
    background: #fff;
  }
  #open a:nth-of-type(1){
    font-size: 14px;
    width: 100%;
    text-align: center;
    height: 40px;
    line-height: 40px;
    color: #ecbe6f;
    display: block;
  }
  #open a:nth-of-type(2){
    font-size: 14px;
    width: 100%;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #313131;
    display: block;
  }

  #ren-table #check{
    width: 100%;
    height: 30px;
    margin-top: 15px;
    float: left;
    padding-left: 33px;
    box-sizing: border-box;
  }
  #check span{
    font-size: 14px;
    margin-left: 5px;
    display: inline-block;
  }
  #check span mark{
    background: #fff;
    color: #ff0000;
    cursor: pointer;
  }
  #ren-table #btn{
    width: 180px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    font-size: 14px;
    border: 1px solid #ff0000;
    color: #ff0000;
    float: left;
    margin-left: 32px;
    margin-top: 15px;
    border-radius: 3px;
    cursor: pointer;
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
    margin: -12px auto;
  }
 
  #title1{
    float: left;
    font-size:14px;
    color: #666;
    margin-left: 25px;
    margin-top:19px;
    font-size: 14px;
  }
  #title2{
    color:#666;
    float:right;
    margin-right:25px;
    margin-top:19px;
    font-size: 14px;
  }

</style>


