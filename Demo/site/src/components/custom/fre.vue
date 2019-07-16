<template>
  <div id="fre">
    <div class="top">
      <h4>运费设置</h4>
    </div>
    <div id="fre-bottom">
      <div class="bottom-left">
        <h3>运费设置</h3>
        <div id=box>
          <p>兑换订单：默认</p>
          <p>运费承担</p>
          <input type="radio" id="one" value="1" v-model="type">
          <label for="one">商家承担</label>
          <input type="radio" id="two" value="2" v-model="type">
          <label for="two">用户承担</label>
          <p>商家承担：发货后运费不可退</p>
          <p>会员承担：运费后不可退</p>
          <div id="btn" @click="Freset()">保存</div>
        </div>
        
      </div>
      <div class="bottom-right">
        <img src="../../image/mober.png"/>
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
      name: "fre",
      data(){
        return{
          Sible:false,
          type:''
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
        //运费设置
        Freset(){
          this.$ajax.post("/person/freightSet",{
            type:this.type
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
             this.$message({
              message: data.msg,
              type: 'success'
            })
          })
        }
      },
      mounted(){
        this.getCenter();
        
      }
    }
</script>

<style scoped>
  #fre{
    width: 1020px;
    min-height: 600px;
    margin-top: 10px;
  }
  .top{height: 50px;background: #fff;}
  .top h4{
    text-indent: 15px;
    font-size: 14px;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  #fre-bottom{
    width: 100%;
    height: 740px;
    margin-top: 10px;
    margin-bottom: 20px;
    float: left;
    background: #fff;
  }
  #fre-bottom .bottom-left{
    width: 300px;
    height: 270px;
    margin: 50px 0 0 150px;
    float: left;
  }
  .bottom-left h3{
    height: 45px;
    line-height: 45px;
    text-align: center;
    color: #fff;
    font-size: 14px;
    background: #ff0000;
  }
  .bottom-left #box{
    height: 225px;
    border: 1px solid #eee;
    border-top: none;
    float: left;
  }
  #box p:nth-of-type(1){
    font-size: 14px;
    font-weight: bold;
    text-indent: 35px;
    color: #313131;
    margin-top:30px;
  }
  #box p:nth-of-type(2){
    font-size: 14px;
    font-weight: bold;
    text-indent: 35px;
    float: left;
    margin-top: 25px;
    color: #313131;
  }
  #box p:nth-of-type(3){
    font-size: 12px;
    margin-top: 20px;
    text-indent: 50px;
    float: left;
    background: url("../../image/icon.png") no-repeat 35px 2px;
    color: #313131;
  }
  #box p:nth-of-type(4){
    font-size: 12px;
    margin-top: 10px;
    text-indent: 50px;
    float: left;
    color: #313131;
  }
  #box input:nth-of-type(1){
    margin: 30px 5px 0 15px;
    float: left;
  }
  #box label:nth-of-type(1){
    margin-top: 28px;
    float: left;
    font-size: 12px;
  }
  #box input:nth-of-type(2){
    margin: 30px 5px 0 15px;
    float: left;
  }
  #box label:nth-of-type(2){
    margin-top: 28px;
    float: left;
    font-size: 12px;
  }
  #box #btn{
    width: 110px;
    height: 30px;
    line-height: 30px;
    float: left;
    margin: 20px 0 0 90px;
    border: 0;
    font-size: 14px;
    background: #ff0000;
    color: #ffffff;
    font-weight: bold;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
  }
  .bottom-right{
    width: 215px;
    height: 440px;
    margin: 30px 0 0 140px;
    float: left;
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

