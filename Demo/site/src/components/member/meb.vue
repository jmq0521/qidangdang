<template>
  <div id="meb">
    <div class="top">
      <h4>会员卡设置</h4>
    </div>
    <div  class="meb-bottom">
      <el-steps :active="active" finish-status="success" style="width: 650px;margin: 0 auto ;margin-top: 20px;">
        <el-step title="基本服务"></el-step>
        <el-step title="服务信息"></el-step>
        <el-step title="开卡资料"></el-step>
      </el-steps>
      <div class="meb-check">
        <el-checkbox-group
          style="margin-left: 80px"
          v-model="checkedCities1"
          :min="0"
          :max="4">
          <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
        </el-checkbox-group>
        <p>可同时选择多个选项</p>
        <div id="btn">完成</div>
      </div>
    </div>
  </div>

</template>

<script>
    const cityOptions = ['姓名', '手机', '生日', '性别'];
    export default {
        name: "meb",
        data() {
          return {
            active: 0,
            checkedCities1: ['姓名', '生日', '性别'],
            cities: cityOptions

          };
        },
        methods: {
          next() {
            if (this.active++ > 2) this.active = 0;
          }
        }
    }
</script>

<style scoped>
  #meb{
    width: 1010px;
    height: 600px;
    margin-bottom: 20px;
    border-top: 5px solid #626262;
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
  .meb-bottom{
    width: 100%;
    height: 540px;
    background: #ffffff;
    float: left;
    margin-top: 10px;
  }
  .meb-bottom .meb-check{
    width: 605px;
    height: 135px;
    margin: 75px 0 0 200px;
    float: left;
  }
  .meb-check p{
    width: 100%;
    font-size: 12px;
    margin-top: 25px;
    text-indent: 15px;
    margin-left: 80px;
    color: #ff0000;
    float: left;
    background: url("../../image/icon.png") no-repeat left 2px;
  }
  .meb-check #btn{
    width: 190px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    float: left;
    font-size: 12px;
    font-weight: bold;
    background: #ff0000;
    margin: 40px 0 0 200px;
    color: #ffffff;
    border: 0;
    border-radius: 3px;
    cursor: pointer;
  }
</style>
<style>
  .el-checkbox__input.is-checked .el-checkbox__inner{
    border-color: #ff0000;
    background: #ff0000;
  }
  .el-checkbox__input.is-checked+.el-checkbox__label{
    color: #404040;
  }
</style>
