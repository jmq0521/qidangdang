<template>
  <div id="mak">
    <div class="top">
      <h4>预约订单</h4>
    </div>
    <div id="mak-bottom">
      <div id="mak-form">
        <select>
          <option>下单日期</option>
          <option></option>
        </select>
        <select>
          <option>订单状态</option>
          <option>金钱</option>
        </select>
        <input type="text" value="订单编号"/>
        <i class="iconfont">&#xe752;</i>
        <div id="btn">查询</div>
      </div>
      <el-table style="width: 980px;margin: 0 auto;">
        <el-table-column label="订单编号"></el-table-column>
        <el-table-column label="会员账号"></el-table-column>
        <el-table-column label="联系电话"></el-table-column>
        <el-table-column label="人数"></el-table-column>
        <el-table-column label="支付金额"></el-table-column>
        <el-table-column label="预约时间"></el-table-column>
        <el-table-column label="验证状态"></el-table-column>
        <el-table-column label="订单状态"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "mak",
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
        value7: ''
      };
    }
  }
</script>

<style scoped>
  #mak{
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
  #mak #mak-bottom{
    width: 100%;
    height: 740px;
    margin-top: 5px;
    margin-bottom: 20px;
    float: left;
    background: #ffffff;
  }
  #mak-bottom #mak-form{
    width: 980px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
    font-size: 12px;
    color: #d2d2d2;
  }
  #mak-form #btn{
    width: 80px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    text-align: center;
    display: inline-block;
    margin: 20px 0 0 15px;
    border: 0;
    color: #ffffff;
    background: #ff0000;
    border-radius: 3px;
    float: left;
    cursor: pointer;
  }
  #mak-form select{
    width: 95px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    display: inline-block;
    margin: 20px 0 10px 5px;
    color: #d2d2d2;
    border: 0;
    border: 1px solid #e5e5e5;
    background: #ffffff;
    float: left;
  }
  #mak-form input{
    width: 105px;
    height: 21px;
    font-size: 12px;
    line-height: 21px;
    color: #cccccc;
    float: right;
    margin-right: 80px;
    margin-top: 20px;
    border: 1px solid #e5e5e5;
  }
  .iconfont{
    width: 30px;
    height: 20px;
    line-height: 20px;
    float: right;
    color: #ffffff;
    margin-top: 20px;
    margin-right: -135px;
    border: 0;
    background: #ec652b;
    text-align: center;
    border-radius: 0;
  }
</style>
