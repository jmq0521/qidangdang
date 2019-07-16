<template>
  <div id="vit">
    <div class="top">
      <p v-for="(item,index) in vitNum" :key="index" v-if="type==3?index<2:index<3">已开通{{item.Name}}<mark>{{item.buyed_num+item.giveed_num}}</mark></p>
      <div id="but" @click="$router.push('/crea')">商户创建</div>
      <div id="but" @click="$router.push('/num')">名额管理</div>
    </div>
    <div id="vit-bottom">
      <div id="vit-form">
        <span>联系电话</span><input type="text" v-model="phone">
        <span>创建时间</span>
        <el-date-picker
          v-model="start_time"
          style="margin-left:-5px"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-date-picker
          style="margin-left:5px;margin-right:5px;"
          v-model="end_time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <span>激活状态</span>
        <select id="s1">
          <option>全部</option>
          <option value="0">已激活</option>
          <option value="1">未激活</option>
        </select>
        <div id="btn" @click="getVit()">查询</div>
      </div>
      <el-table style="width: 1000px;margin: 0 auto;" :data="vitList">
        <el-table-column prop="Mobile" label="联系电话"></el-table-column>
        <el-table-column prop="TrueName" label="申请人"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <span id="span2" @click="Clickgrage(scope.row.Mobile,scope.row.type)" :style="{display:scope.row.IsLock==0&&scope.row.type<number-1&&type==number?'inline-block':'none'}">升级</span>
            <span id="span1" @click="Clickren(scope.row.Mobile,scope.row.type)" :style="{display:scope.row.type==4?'none':'inline-block'}">续费</span>
          </template>
        </el-table-column>
        <el-table-column  label="创建时间">
          <template slot-scope="scope">
           <span>{{scope.row.createdtime | data}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="IsAuditName" label="认证状态"></el-table-column>
        <el-table-column prop="user_type" label="申请身份"></el-table-column>
        <el-table-column label="激活状态" >
          <template slot-scope="scope">
            <span @click="ClickVit(scope.row.Mobile,scope.row.IsLock)" id="span" :style="{background:scope.row.IsLockName==='激活'?'#f56c6c':'#0aa6e8'}">{{scope.row.IsLock===0?'已激活':'未激活'}}</span>
          </template>
        </el-table-column>
      </el-table>
      
      <el-pagination
        style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
        background layout="prev, pager, next"
        :page-count="total"
        @current-change="getVit">
      </el-pagination>
      
      
      <!-- 续费 -->
      <el-dialog
        title="提示"
        style="text-align: center"
        :visible.sync="dialogVisible"
        :show-close="false"
        :close-on-click-modal="false"
        top="300px"
        width="430px">
        <p id="elpp">{{count === 1 ?'你确定要将企业标准版续期一年吗':count === 2 ? '你确定要将企业至尊版续期一年吗' : count === 3 ? '你确定要将企业联盟商续期三年吗': '您已经是最高级别无法续费'}}</p>
        <div id="btn">
         <div id="btn2" v-for="(item,index) in box1" :key="index" @click="sele(item,index)" :class= "active === index ? 'addclass' : '' ">{{item.label}}</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button id="bnt1" type="primary" :loading="isLoading"  @click="openRen()" plain>确认</el-button>
          <div id="bnt2" @click="confirm()">取消</div>
        </span>
      </el-dialog>


      <!-- 开通 -->
      <el-dialog
        title="提示"
        style="text-align: center"
        :visible.sync="Visible"
        :show-close="false"
        :close-on-click-modal="false"
        top="300px"
        width="430px">
        <p id="elp">{{Type === 1 ?'您确定要升成企业至尊版级别吗':Type === 2 ? '您确定要升成企业联盟商级别吗' : Type === 3 ? '请您联系客服升级': '您已经是最高级别'}}</p>
        <div id="btn">
         <div id="btn2" v-for="(item,index) in box1" :key="index" @click="sele(item,index)" :class= "active === index ? 'addclass' : '' ">{{item.label}}</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button id="bnt3" type="primary" :loading="Loading"  @click="openGrage()" plain>确认</el-button>
          <div id="bnt4" @click="confirme()">取消</div>
        </span>
      </el-dialog>


      <!-- 激活 -->
      <el-dialog
        title="提示"
        style="text-align: center"
        :visible.sync="dialog"
        top="300px"
        :show-close="false"
        :close-on-click-modal="false"
        width="400px">
        <div id="btn">
         <div id="btn1" v-for="(item,index) in box" :key="index" @click="Sele(item,index)" :class= "isactive === index ? 'addclass' : '' ">{{item.label}}</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <div id="bnt5" @click="upVit()">确认</div>
          <div id="bnt6" @click="confir()">取消</div>
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
        <span>请提交审核资料</span>
        <span slot="footer" class="dialog-footer">
          <el-button type="primary" @click="$router.push('/bas')">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: "vit",
    data() {
      return {
        isLoading:false,
        Loading:false,
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
        box:[
          {
            value:'1',
            label:'激活赠送名额'
          },
          {
            value:'2',
            label:'激活购买名额'
          }
        ],
        box1:[
          {
            value:'1',
            label:'扣除赠送名额'
          },
          {
            value:'2',
            label:'扣除购买名额'
          }
        ],
        isactive: -1,
        active: -1,
        start_time: '',
        end_time: '',
        phone:'',
        Phone:'',
        Sible:false,
        dialogVisible: false,
        Visible:false,
        dialog:false,
        vitList:[],
        vitNum:[],
        type:localStorage.type,
        total:1,
        page: 1,
        Type:'',
        number:'',
        count:'',
        mobile:'',
        Mobile:'',
        PageNumber:'',
        select_type:'',
        select:''
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
      //选择激活名额类型
      Sele(item,index){
        this.select_type=item.value;
        this.isactive=index;
      },

      //选择扣除名额类型
      sele(item,index){
        this.select=item.value;
        this.active=index;
        console.log(this.select,223)
      },
      //续费功能弹框的取消
      confirm(){
        this.active=-1;
        this.dialogVisible=false;
      },
      //开通功能弹框的取消
      confirme(){
        this.active=-1;
        this.Visible=false;
      },
      //激活功能弹框的取消
      confir(){
        this.isactive=-1;
        this.dialog=false;
      },

      //个人中心用户的type值
      getCenter(){
        this.$ajax.post("/Person/userCentre",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.number=data.data.type
        })
      },

      //显示我的邀请列表
      getVit(page){
        var select = document.getElementById("s1");
        let options = select.options;
        let index = select.selectedIndex;
        this.$ajax.get("/vitation/lists",{
          params:{
            page,
            phone:this.phone,
            start_time:this.start_time,
            end_time:this.end_time,
            is_lock:options[index].value
          },
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.vitList=data.data.data;
          this.total=data.data.last_page;
          this.PageNumber=page;
        })
      },

      //点击激活状态显示弹框
      ClickVit(phone,status){
        if(status==1){
          this.dialog=true,
          this.mobile=phone;
        }
      },

      //邀请激活
      upVit(){
        this.$ajax.post("/invite/user/activate",{
         phone:this.mobile,
         select_type:this.select_type
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          if(data.msg=='成功'){
            this.$message({
              message:data.msg,
              type: 'success'
            });
            this.dialog=false;
            this.isactive=-1
          };
          this.getVit(this.PageNumber);
        })
      },

      //点击续费显示弹框
      Clickren(phone,count){
        this.dialogVisible=true,
        this.Mobile=phone,
        this.count=count
        console.log(this.Mobile,this.count,223)
      },
    

      //续费
      openRen(){
        this.isLoading=true;
        this.$ajax.post("/invite/user/renew",{
          phone:this.Mobile,
          select_type:this.select
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.$message({
              message: data.msg,
              type: 'success'
            }); 
            if(data.msg=='成功'){
              this.dialogVisible=false;
            };
            let timer=setInterval(() => {
              this.isLoading=false;
  　　　    }, 5000);
            this.active=-1;
            this.getVit(this.PageNumber);
        })
      },

      //点击开通显示弹框
      Clickgrage(phone,count){
        this.Visible=true,
        this.Phone=phone,
        this.Type=count,
        console.log(this.Phone,this.Type+1,223)
      },

      //升级
      openGrage(){
        this.Loading=true;
        this.$ajax.post("/invite/user/upgrade",{
          phone:this.Phone,
          user_type:this.Type+1,
          select_type:this.select,
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.$message({
              message: data.msg,
              type: 'success'
            });
            if(data.msg=='成功'){
              this.Visible=false;
            };
            let timer=setInterval(() => {
              this.Loading=false;
  　　　    }, 5000);
            this.active=-1;
            this.getVit(this.PageNumber);
        })
      },
      

      //获取邀请的名额以及开通的个数
      getVitNum(){
        this.$ajax.post("/vitation/inviteNum",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.vitNum=data.data;
        })
      },

    },
    mounted(){
      this.getCenter();
      this.getVit(this.page);
      this.getVitNum();
      this.getCenter();
      if(localStorage.is_audit==0){
        this.Sible=true;
      };
    },
  }
</script>

<style scoped>
  #vit{
    width: 1020px;
    height: 600px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .top{height: 80px;background: #fff;}
  .top p{
    float: left;
    font-size: 14px;
    line-height: 80px;
    margin-left: 10px;
    color: #313131;
    text-indent: 45px;
    background: url("../../image/iconfont.png") no-repeat left center;
  }
  .top p mark{
    color: #f7931e;
    font-size: 22px;
    font-weight: bold;
    background: #fff;
    margin-left: 15px;
  }
  .top #but{
    width: 80px;
    height: 25px;
    float: right;
    line-height: 23px;
    border: 1px solid #ff0000;
    border-radius: 3px;
    color: #ff0000;
    font-size: 14px;
    text-align: center;
    margin: 25px 10px 0 0;
    cursor: pointer;
  }
  #vit #vit-bottom{
    width: 100%;
    min-height: 740px;
    margin-top: 5px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  #vit-bottom #vit-form{
    width: 1000px;
    height: 65px;
    line-height: 55px;
    margin: 10px auto ;
    background: #f6f6f6;
    margin-bottom: 10px;
    font-size: 12px;
    color: #d2d2d2;
  }
  #vit-form span{
    display: inline-block;
    margin-left: 10px;
    color: #313131;
  }
  #vit-form input{
    width: 110px;
    height: 25px;
    line-height: 25px;
    margin: 15px 0 0 5px;
    border: 0;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    outline: none;
  }
  #vit-form select{
    width: 115px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    display: inline-block;
    margin: 15px 0 10px 5px;
    color: #d2d2d2;
    box-sizing: border-box;
    border: 0;
    border: 1px solid #e5e5e5;
    background: #fff;
    outline: none;
  }
  #vit-form #btn{
    width: 60px;
    height: 25px;
    line-height: 23px;
    font-size: 14px;
    text-align: center;
    display: inline-block;
    margin: 20px 0 0 10px;
    border: 0;
    color: #ff0000;
    border: 1px solid #ff0000;
    border-radius: 3px;
    cursor: pointer;
    background: #fff;
  }
   #span{
    display: inline-block;
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #fff;
    border-radius: 3px;
    background: #f56c6c;
    cursor: pointer;
  }
  #span1{
    display: inline-block;
    width: 40px;
    height: 18px;
    line-height: 16px;
    text-align: center;
    color: #ff5b00;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid #ff5b00
  }
  #span2{
    display: inline-block;
    width: 40px;
    height: 18px;
    line-height: 16px;
    text-align: center;
    color: #ff0000;
    border-radius: 3px;
    cursor: pointer;
    border: 1px solid #ff0000
  }
  #elp{
    width: 100%px;
    font-size:14px;
    color: #666;
    margin-top: 5px;
  }
  .elp{
    width: 100%;
    font-size:12px;
    text-indent: 80px;
    color: #ff5b00;
    margin-top: 5px;
  }
  #elpp{
    width: 100%;
    font-size:14px;
    color: #666;
    margin-top: 5px;
  }
  #btn1{
    width: 120px;
    height: 35px;
    line-height: 35px;
    float: left;
    text-align: center;
    margin-left: 50px;
    margin-top: 20px;
    border-radius: 25px;
    cursor: pointer;
    border: 1px solid #e57339;
  }
  .addclass{background: #e57339;color: #fff;}
  #btn2{
    width: 120px;
    height: 35px;
    line-height: 35px;
    float: left;
    text-align: center;
    margin-left: 50px;
    margin-top: 20px;
    border-radius: 25px;
    cursor: pointer;
    border: 1px solid #e57339;
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
    float: left;
    margin-top: -13px;
    background: #fff;
  }
  #bnt2{
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


   #bnt3{
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
    background: #fff;
  }
  #bnt4{
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


  #bnt5{
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
  #bnt6{
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
</style>

