<template>
  <div id="set">
    <div class="top">
      <h4>奖品设置-奖品方案</h4>
      <div id="btn">大转盘首页</div>
    </div>
    <div id="set-form">
      <el-table style="width: 980px;margin: 0 auto;">
        <el-table-column  label="序号"></el-table-column>
        <el-table-column  label="方案名称"></el-table-column>
        <el-table-column  label="开始日期"></el-table-column>
        <el-table-column  label="结束日期"></el-table-column>
        <el-table-column  label="状态"></el-table-column>
        <el-table-column label="操作"></el-table-column>
        <el-table-column label="开关"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "set",
    data(){
      return{

      }
    },

  }
</script>
<style scoped>
  #set{
    width: 1010px;
    min-height: 800px;
    margin-bottom: 20px;
    border-top: 5px solid #626262;
    background: #ffffff;
    margin-top: 10px;
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
    width: 100px;
    height: 25px;
    font-size: 12px;
    line-height: 25px;
    float: right;
    margin: 10px 30px 0 0;
    border: 1px solid #ff0000;
    cursor: pointer;
    text-align: center;
    color: #ff0000;
  }
  #set #set-form{
    width: 980px;
    height: 60px;
    margin: 0 auto;
    margin-bottom: 10px;
    background: #f6f6f6;
  }
</style>
