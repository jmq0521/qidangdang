<template>
  <div id="bea">
    <div class="top">
      <h4>获奖名单</h4>
    </div>
    <div id="bea-bottom">
      <div id="bea-form">
        <span>获奖账号</span><input type="text" value="">
        <span>获奖商品</span><input type="text" value="">
        <span>操作时间</span>
        <el-date-picker
          style="float: left"
          v-model="start_time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-date-picker
          style="float:left;margin-left:5px"
          v-model="end_time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <div id="btn">查询</div>
      </div>
      <el-table style="width: 980px;margin: 0 auto;">
        <el-table-column label="序号"></el-table-column>
        <el-table-column label="获奖账号"></el-table-column>
        <el-table-column label="获奖商品"></el-table-column>
        <el-table-column label="获奖时间"></el-table-column>
        <el-table-column label="状态"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bea",
    data() {
      return {
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value6: '',
        value7: '',
      };
    },
    mounted(){
     
    }
  }
</script>

<style scoped>
  #bea{
    width: 1010px;
    min-height: 600px;
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
  #bea-bottom{
    width: 100%;
    min-height: 740px;
    margin-top: 5px;
    float: left;
    background: #ffffff;
    margin-bottom: 20px;
  }
  #bea-bottom #bea-form{
    width: 980px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
    font-size: 14px;
    padding-left: 20px;
    box-sizing: border-box;
    color: #313131;
  }
  #bea-form span{
    float: left;
    height: 60px;
    line-height: 60px;
  }
  #bea-form input{
    width: 105px;
    height: 25px;
    font-size: 12px;
    line-height: 20px;
    color: #cccccc;
    float: left;
    margin-left: 15px;
    margin-top: 20px;
    margin-right: 15px;
    border: 1px solid #e5e5e5;
  }
  #bea-form select{
    width: 110px;
    height: 25px;
    margin-left: 16px;
    font-size: 12px;
    color: #b6b6b6;
    border: 0;
    float: left;
    margin-top: 20px;
  }
  #bea-form #btn{
    width: 80px;
    height: 26px;
    line-height: 26px;
    font-size: 14px;
    text-align: center;
    border: 0;
    float: left;
    margin-left: 20px;
    margin-top: 20px;
    color: #ffffff;
    background: #19acf7;
    cursor: pointer;
  }
</style>
