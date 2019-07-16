<template>
  <div id="cou">
    <div class="top">
      <a id="a-one">二维码下载</a>
    </div>
    <div id="cou-bottom">
      <div class="cou-left">
        <div class="left-one" v-for="(item,index) in intList" :key="index" :style="{display:item.is_show==2?'none':'block'}">
          <div id="left-img"><img :src="item.img | imgUrl"/></div>
          <div id="left-box">
            <a href='http://qddapi.lsybk.com/api/v1/vitation/downloadCode?code_type=integral_code_url&token=MTU3ODE5NTkxMbGIfpaG3bmwhtCJqa-GeXE' id="box">下载</a>
            <span>{{item.name}}</span>
          </div>
        </div>
      </div>
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
    name: "cou",
    data(){
      return{
        Sible:false,
        intList:[],
        resList:[]
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
      //显示积分商城二维码
      getImg(){
        this.$ajax.get("/vitation/userCodeDetail",{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.intList=data.data;
        })
      },
    },
    mounted(){
      this.getCenter();
      this.getImg();
      if(localStorage.is_audit==0){
        this.Sible=true;
      };
      // $('#a-one').click(function(){
      //   $(this).css("border-bottom","2px solid #ff0000"),
      //     $('#a-two').css("border-bottom",""),
      //     $('.cou-right').css("display","none"),
      //     $('.cou-left').css("display","block")
      // });
      // $('#a-two').click(function(){
      //   $(this).css("border-bottom","2px solid #ff0000"),
      //     $('#a-one').css("border-bottom",""),
      //     $('.cou-right').css("display","block"),
      //     $('.cou-left').css("display","none")
      // })
    }
  }
</script>

<style scoped>
  #cou{
    width: 1020px;
    min-height: 600px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .top{height: 50px;background: #ffffff;}
  .top #a-one{
    font-size: 14px;
    line-height: 50px;
    float: left;
    font-weight: bold;
    color: #313131;
    margin-left: 15px;
  }
  .top #a-two{
    margin-left: 30px;
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  #cou #cou-bottom{
    width: 100%;
    height: 740px;
    margin-top: 10px;
    margin-bottom: 20px;
    float: left;
    background: #fff;
  }

  .cou-left{
    width: 790px;
    height: 295px;
    margin: 80px auto;
    background: #fff;
    box-shadow: #eee 0 4px 6px;

  }
  .cou-left .left-one{
    width: 220px;
    height: 255px;
    float: left;
    margin-left: 20px;
  }
 
  .left-one #left-img{
    width: 183px;
    height: 183px;
    background: url('../../image/load.png') no-repeat;
    margin: 35px 0 0 40px;
  }
  .left-one #left-img img{
    width: 130px;
    height: 130px;
    float: left;
    margin: 25px 0 0 25px;
  
  }

  .left-one #left-box{
    width: 180px;
    text-align: center;
    font-size: 14px;
    margin-left: 40px;
    margin-top: 20px;
    color: #333;
  }
  #left-box #box{color: #ff0000;}




  #cou-bottom .cou-right{
    width: 100%;
    height: 490px;
    float: left;
    background: #fff;
    display: none;
    padding-top: 10px;
    box-sizing: border-box;
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

