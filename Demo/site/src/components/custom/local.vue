<template>
  <div id="local">
    <div class="top">
      <h4>本地订单</h4>
    </div>
    <div id="local-bottom">
      <div id="local-form">
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
        <el-table-column label="商品名称" width="300px"></el-table-column>
        <el-table-column label="兑换券单价"></el-table-column>
        <el-table-column label="数量"></el-table-column>
        <el-table-column label="兑换券总额"></el-table-column>
        <el-table-column label="收货人信息"></el-table-column>
        <el-table-column label="兑换券余额"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "local",
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
    }
  }
</script>

<style scoped>
  #local{
    width: 1010px;
    height: 800px;
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
  #local #local-bottom{
    width: 100%;
    height: 740px;
    margin-top: 5px;
    float: left;
    background: #ffffff;
  }
  #local-bottom #local-form{
    width: 980px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
    font-size: 12px;
    color: #d2d2d2;
  }
  #local-form span{
    height: 25px;
    line-height: 25px;
    float: left;
    margin: 20px 0 0 15px;
    color: #313131;
    font-size: 12px;
  }
  #local-form input{
    width: 95px;
    height: 23px;
    line-height: 23px;
    margin: 20px 0 0 15px;
    border: 0;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    float: left;
  }
  #local-form #btn{
    width: 80px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    text-align: center;
    margin: 20px 0 0 20px;
    border: 0;
    color: #ffffff;
    background: #19acf7;
    float: left;
    cursor: pointer;
  }
</style>
