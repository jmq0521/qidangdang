<template>
  <div id="use">
    <div class="top">
      <h4>用户信息</h4>
    </div>
    <div id="use-bottom">
      <div id="use-left" style="position: relative">
        <img id="img" :src="centerList.headUrl| imgUrl" style="position: absolute;top: 5px; left: 3px;" :onerror="Img"/>
        <el-upload
          style="position: absolute; top:240px;"
          action="http://qddapi.lsybk.com/api/v1/system/uploadImg"
          list-type="picture-card"
          name="img"
          id="img-one"
          methods="post"
          :limit="1"
          :headers="{'token':'MTU3ODg3NzM2N7GIfpaG3bmwhtCJqa-GeXE'}"
          :on-success="Imgsuccess"
          :show-file-list="false">头像修改</el-upload>
      </div>
      <div id="use-right">
        <p>用户名：{{centerList.nickName}}</p>
        <p>会员类型：<span>{{centerList.typeName}}</span></p>
        <p>手机号：{{centerList.phone}}</p>
        <div id="btn1"  @click="addUser()">保存</div>
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
      name: "us",
      data(){
        return{
          Sible:false,
          dialogVisible: false,
          centerList:[],
          Img: 'this.src="' + require('../../image/bo.png') + '"',
          img:[],
          name:''
        }
      },
      methods:{
        Imgsuccess(response, file, fileList){
          this.img.push(response.data[0].img_url)
          $("#use-left #img-one").prepend("<img src='"+response.data[0].img_url+"' alt='' id='hidden' style='position: absolute;top: -235px; left: 3px;width:100px;height: 100px; border-radius: 50%'/>")
        },

        //个人中心头像
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

        //修改商户名和头像
        addUser(){
          this.$ajax.post("/user/userInfoEdit",{
            head_url:this.img[0],
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.$message({
              message:data.msg,
              type: 'success'
            });
          })
        }
        
      },
      mounted(){
        this.getCenter();
        if(localStorage.is_audit==0){
          this.Sible=true;
        };
      }

    }
</script>

<style scoped>
  #use{
    width: 1020px;
    min-height: 600px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .top{height: 50px;background: #ffffff;}
  .top h4{
    text-indent: 30px;
    font-size: 14px;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  #use #use-bottom{
    width: 100%;
    height: 740px;
    margin-top: 10px;
    float: left;
    background: #ffffff;
    margin-bottom: 20px;
  }
  #use-left{
    width: 100px;
    height: 135px;
    margin: 30px 0 0 90px;
    float: left;
    position: relative;
  }
  #use-left #img{width: 100px;height: 100px;border-radius: 50%;}
  #use-right{
    height: 135px;
    margin: 30px 0 0 50px;
    float: left;
    color: #313131;
  }
  #use-right p{
    font-size: 14px;
    line-height: 20px;
    font-weight: bold;
    margin-top: 10px;
  }
  #use-right p:nth-of-type(3){float: left}
  #use-right p:nth-of-type(2) span{
    min-width: 70px;
    height: 20px;
    text-align: center;
    color: #ffffff;
    display: inline-block;
    font-size: 12px;
    font-weight: normal;
    background: #d5c49c;
    border-radius: 3px;
  }
  #use-right #btn1{
    width: 50px;
    height: 20px;
    line-height: 18px;
    font-size: 12px;
    margin: 10px 0 0 15px;
    border: 1px solid #19acf7;
    text-align: center;
    color: #19acf7;
    float: left;
    cursor: pointer;
  }
  #input1 {
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #input1 input{
    width: 150px;
    height: 35px;
    margin: 5px 0 0 20px;
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
<style>
  #use-left .el-upload--picture-card{
    width: 90px;
    height: 25px;
    font-size: 14px;
    margin: -120px 0 0 10px;
    line-height: 25px;
    border: 0;
    background: #19acf7;
    color: #fff;
    border-radius:2px;
  }
</style>
