<template>
  <div id="list">
    <div class="top">
      <h4>会员列表</h4>
      <!-- <div id="btn">查看邀请码</div>
      <div id="one-top"></div>
      <div class="img">
        <img src="../../image/list-weima01.png">
        <p>邀请码：<mark>04430</mark></p>
      </div> -->
    </div>
    <div id="list-form">
      <input type="text" v-model="phone" placeholder="会员账号">
      <div class="but-one" @click="getList">查询</div>
    </div>
    <el-table style="width: 1000px;margin: 0 auto;" :data="memberlist">
      <el-table-column prop="ID" label="会员ID"></el-table-column>
      <el-table-column prop="Mobile" label="会员账号"></el-table-column>
      <el-table-column label="注册时间">
        <template slot-scope="scope">
          <span>{{scope.row.createdtime}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="兑换券余额">
        <template slot-scope="scope">
          <a>查看</a>
        </template>
      </el-table-column> -->
    </el-table>
    <el-pagination
      style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
      background layout="prev, pager, next"
      :page-count="total"
      @current-change="getList">
    </el-pagination>
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
    name: "list",
    data(){
      return{
        Sible:false,
        memberlist:[],
        phone:'',
        page:1,
        total:1
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

      //显示会员列表
      getList(page){
        this.$ajax.get("/member/lists",{
          params:{
            page,
            phone:this.phone
          },
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'token' :localStorage.token
          }}).then(data=>{
          this.memberlist=data.data.data;
          this.total=data.data.last_page
        })
      }
    },
    mounted(){
      this.getCenter();
      this.getList(this.page);
      if(localStorage.is_audit==0){
        this.Sible=true;
      };
      $('#btn').mouseenter(function(){
        $('.img').css('display','block');
        $('#one-top').css('display','block')
      });
      $('#btn').mouseleave(function(){
        $('.img').css('display','none');
        $('#one-top').css('display','none')
      })
    }
  }
</script>

<style scoped>
  #list{
    width: 1020px;
    min-height: 800px;
    margin-bottom: 20px;
    background: #fff;
    margin-top: 10px;
    float: left;
  }
  .top{height: 50px;position: relative;}
  .top h4{
    text-indent: 15px;
    font-size: 14px;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  .top #btn{
    width: 90px;
    height: 25px;
    font-size: 12px;
    line-height: 25px;
    float: right;
    margin: 10px 32px 0 0;
    border: 0;
    color: #313131;
    background: #eaeaea;
    text-align: center;
    cursor: pointer;
  }
  .top #one-top{
    width: 0;
    height: 0;
    border-width: 5px;
    position: absolute;
    right: 70px;
    top: 35px;
    border-style: solid;
    border-color: #fff #fff #d2d2d2 #fff;
    display: none;
  }
  .top .img{
    width: 130px;
    height: 130px;
    border: 1px solid #eaeaea;
    position: absolute;
    top: 45px;
    right: 10px;
    background: #fff;
    z-index: 999;
    display: none;
  }
  .img img{ 
    width: 80px;
    height: 80px;
    margin-left:25px;
    margin-top: 15px;
  }
  .img p{
    text-align: center;
    font-size: 12px;
    color: #313131;
  }
  .img p mark{color: #ff0000;background: #fff;}
  #list #list-form{
    width: 1000px;
    height: 60px;
    margin: 0px auto 0;
    margin-bottom: 10px;
    background: #f6f6f6;
  }
  #list-form input{
    width: 140px;
    height: 23px;
    line-height: 23px;
    margin: 20px 0 0 5px;
    border: 0;
    color: #313131;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    background: #fff;
    float: left;
    text-indent: 10px;
    outline: none;
  }
  #list-form .but-one{
    width: 65px;
    height: 23px;
    line-height: 23px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    font-size: 12px;
    margin: 20px 0 0 15px;
    border: 0;
    background: #ff0000;
    border-radius: 2px;
    float: left;
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
