<template>
  <div id="mag">
    <div class="top">
      <h4>商品管理</h4>
    </div>
    <div id="mag-bottom">
      <div id="mag-form">
        <span>商品名称</span>
        <input type="text" value="">
        <span>操作时间</span>
        <el-date-picker
          style="float: left"
          v-model="start_time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-date-picker
          style="float: left;margin-left:10px"
          v-model="end_time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <div id="btn">查询</div>
      </div>
      <el-table style="width: 980px;margin: 0 auto;">
        <el-table-column label="商品名称"></el-table-column>
        <el-table-column label="商品类型"></el-table-column>
        <el-table-column label="商品单价"></el-table-column>
        <el-table-column label="商品规格"></el-table-column>
        <el-table-column label="添加时间"></el-table-column>
        <el-table-column label="审核状态"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mag",
    data() {
      return {
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
        start_time: '',
        end_time: '',
      };
    },
  }
</script>

<style scoped>
  #mag{
    width: 1010px;
    height: 600px;
    margin-bottom: 20px;
    border-top: 5px solid #626262;
    margin-top: 10px;
  }
  .top{height: 50px;background: #ffffff;}
  .top h4{
    text-indent: 15px;
    font-size: 14px;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  #mag #mag-bottom{
    width: 100%;
    height: 740px;
    margin-top: 5px;
    float: left;
    background: #ffffff;
    margin-bottom: 20px;
  }
  #mag-bottom #mag-form{
    width: 980px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
    font-size: 12px;
    color: #d2d2d2;
  }
  #mag-form input{
    width: 100px;
    height: 23px;
    line-height: 23px;
    margin: 20px 0 0 15px;
    border: 0;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    float: left;
  }
  #mag-form span{
    height: 25px;
    line-height: 25px;
    float: left;
    margin: 20px 0 0 5px;
    color: #d2d2d2;
    font-size: 12px;
  }
  #mag-form #btn{
    width: 80px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    text-align: center;
    display: inline-block;
    margin: 20px 0 0 20px;
    border: 0;
    color: #ffffff;
    background: #ff0000;
    border-radius: 3px;
    float: left;
    cursor: pointer;
  }
</style>
