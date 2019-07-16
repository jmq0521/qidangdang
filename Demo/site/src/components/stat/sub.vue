<template>
  <div id="sub">
    <div id="top">
      <h4>线下付款</h4>
      <div id="but" @click="$router.go(-1)">返回</div>
    </div>
    <div id="sub-table">
      <div id="sub-box">
        <div id="box-left">
          <p v-for="(item,index) in bankList" :key="index">{{item.name}}：{{item.content}}</p>
          <span>提示：汇款成功请联系客服，财务部确认后发货;</span>
          <span>汇款成功后请立即操作联系，否则无效。</span>
        </div>
        <div id="box-right">
          <div id="box">上传打印凭证</div>
          <el-upload
            style="position: absolute; top:240px;"
            action="http://qddapi.lsybk.com/api/v1/system/uploadImg"
            list-type="picture-card"
            name="img"
            methods="post"
            :limit="1"
            :headers="{'token':'MTU3ODg3NzM2N7GIfpaG3bmwhtCJqa-GeXE'}"
            :on-exceed="exced"
            :on-success="imgsuccess"
            :show-file-list="false">上传凭证</el-upload>
        </div>
      </div>
      <div id="btn" @click="subOff()">提交申请</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sbu",
    data(){
      return{
        img:[],
        bankList:[],
        pay_way:"line",
        pay_source:"pc",
      }
    },
    methods:{
      exced(){
        this.$message.error("一次只能上传一张照片，最多可上传一张图片");
      },
      imgsuccess(response, file, fileList){
        this.img.push(response.data[0].img_url)
        console.log(121212,response.data[0].img_url);
        $(".el-upload--picture-card").prepend("<img id='img' src='"+response.data[0].img_url+"' alt='' id='hidden' style='position: absolute;top: -37px; left: 45px; width: 203px;height: 162px'/>")
      },
      
      //线下支付显示银行卡信息
      showBank(){
        this.$ajax.get("/system/pay-bank-info").then(data=>{
          this.bankList=data.data;
        })
      },

      //线下付款提交凭证
      subOff(){
        this.$ajax.post("/finance/buyUserPlaces",{
          orderId:this.$route.query.id,
          pay_way:this.pay_way,
          pay_source:this.pay_source,
          img_url:this.img[0]
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.$message({
              message: data.msg,
              type: 'success'
            });
            if(data.msg=='成功'){
              this.$router.push('/num?')
            }
        })
      }
    },
    mounted(){
      this.showBank();
    }
  }
</script>

<style scoped>
  #sub{
    width: 1020px;
    margin-top: 10px;
  }
  #sub #top{
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
    width: 80px;
    height: 25px;
    float: right;
    line-height: 23px;
    border: 1px solid #ff0000;
    border-radius: 3px;
    color: #ff0000;
    font-size: 14px;
    text-align: center;
    margin: 10px 30px 0 0;
    cursor: pointer;
  }
  #sub #sub-table{
    width: 1020px;
    min-height: 740px;
    background: #fff;
    margin-top: 10px;
    margin-bottom: 20px;
    float: left;
  }
  #sub-table #sub-box{
    width: 930px;
    height: 235px;
    margin: 30px auto;
    border: 1px solid #eee;
  }
  #sub-box #box-left{
    width: 500px;
    float: left;
    margin: 30px 0 0 25px;
  }
  #box-left p{
    font-size: 16px;
    color: #313131;
    margin-top: 5px;
  }
  #box-left span:nth-of-type(1){
    font-size: 12px;
    color: #ff0000;
    margin-top: 30px;
    display: block;
  }
  #box-left span:nth-of-type(2){
    font-size: 12px;
    color: #ff0000;
    margin-top: 5px;
    margin-left: 35px;
    display: block;
  }
  #sub-box #box-right{
    width: 300px;
    height: 100%;
    float: left;
    margin-left:75px;
  }
  #sub-table #btn{
    width: 180px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin:30px 0 0 40px;
    font-size: 14px;
    color: #ffffff;
    background: #ff0000;
    border-radius: 3px;
    cursor: pointer;
  }
</style>
<style>
  #box-right #box{
    width: 200px;
    height: 160px;
    margin: 20px 0 0 45px;
    border: 1px solid #EBEBEB;
    text-align: center;
    line-height: 160px;
    font-size: 14px;
    color: #a1a1a1;
    background: #FBFBFB;
  }
  #box-right .el-upload--picture-card{
    width: 100px;
    height: 25px;
    font-size: 12px;
    margin: 168px 0 0 95px;
    line-height: 25px;
    border: 1px solid #e6e6e6;
    color: #313131;
    background: #ffffff;
  }
</style>
