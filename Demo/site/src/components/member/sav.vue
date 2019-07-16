<template>
    <div id="sav">
      <div class="top">
        <h4>储值充值</h4>
      </div>
      <div class="center">
        <div id="center-one">
          <span>ID:764389</span>
          <div id="btn1">修改</div>
        </div>
        <div id="center-two">
          <h3>充值现金</h3>
          <select>
            <option>财务类型</option>
            <option>金钱</option>
          </select>
          <span>获得兑换券&nbsp;&nbsp;0</span>
          <span>获得购物券&nbsp;&nbsp;0</span>
          <div id="btn2">充值</div>
        </div>
        <div id="center-three">
          <h3>储值充值设置比例</h3>
          <ul>
            <li>储值金额：1.00</li>
            <li>到账金额：2.00</li>
            <li>赠送兑换券：1</li>
            <li>储值金额：1</li>
          </ul>
          <a href="#">查看更多比例&nbsp;&nbsp;&gt;</a>
        </div>
      </div>
      <div id="sav-bottom">
        <div id="sav-form">
          <input type="text" placeholder="会员号">
          <span>操作时间</span>
          <el-date-picker
            style="float: left"
            v-model="start_time"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
          <el-date-picker
            style="float: left"
            v-model="end_time"
            type="datetime"
            placeholder="选择日期时间">
        </el-date-picker>
          <div id="btn3">查询</div>
        </div>
        <el-table style="width: 980px;margin: 0 auto;">
          <el-table-column prop="date" label="会员账号"></el-table-column>
          <el-table-column prop="name" label="本次充值"></el-table-column>
          <el-table-column prop="address" label="赠送兑换券"></el-table-column>
          <el-table-column prop="address" label="赠送购物券"></el-table-column>
          <el-table-column prop="address" label="余额"></el-table-column>
          <el-table-column prop="address" label="兑换券余额"></el-table-column>
          <el-table-column prop="address" label="描述"></el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 10px; float: right; margin-right: 5px"
          background
          layout="prev, pager, next"
          :total="100">
        </el-pagination>
      </div>
    </div>
</template>

<script>
    export default {
      name: "sav",
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
  #sav{
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
  #sav .center{
    width: 100%;
    height: 165px;
    background: #ffffff;
    margin-top: 5px;
  }
  .center #center-one{
    width: 180px;
    margin-left: 70px;
    float: left;
  }
  #center-one span{
    display: inline-block;
    line-height: 165px;
    font-size: 20px;
    font-weight: bold;
    color: #313131;
    float: left;
  }
  #center-one #btn1{
    width: 45px;
    height: 18px;
    line-height: 18px;
    font-size: 12px;
    margin:70px 0 0 10px;
    text-align: center;
    color: #ff0000;
    background: #ffffff;
    border: 0;
    border: 1px solid #ff0000;
    float: left;
    cursor: pointer;
  }
  .center #center-two{
    width: 180px;
    margin-left: 100px;
    float: left;
  }
  #center-two h3{
    font-size: 14px;
    margin-top: 25px;
    float: left;
  }
  #center-two select{
    width: 95px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    margin: 20px 0 0 20px;
    float: left;
    color: #c0c0c0;
    border: 0;
    border: 1px solid #e5e5e5;
  }
  #center-two span{
    font-size: 12px;
    margin-top: 15px;
    float: left;
    color: #ff0000;
  }
  #center-two span:nth-of-type(2){
    margin-left: 25px;
  }
  #center-two #btn2{
    width: 100%;
    height: 30px;
    line-height: 30px;
    margin-top: 25px;
    color: #ffffff;
    border: 0;
    background: #ff0000;
    border-radius: 3px;
    float: left;
    text-align: center;
    cursor: pointer;
  }
  .center #center-three{
    width: 210px;
    margin-left: 150px;
    float: left;
  }
  #center-three h3{
    font-size: 14px;
    margin-top: 25px;
  }
  #center-three ul{
    float: left;
    margin-top: 10px;
  }
  #center-three ul li{
    float: left;
    color: #ff0000;
    font-size: 12px;
  }
  #center-three ul li:nth-child(2){margin-left: 20px;}
  #center-three ul li:nth-child(4){margin-left: 20px;}
  #center-three a{
    font-size: 14px;
    float: left;
    margin-top: 10px;
    color: #19acf7;
  }
  #sav #sav-bottom{
    width: 100%;
    height: 540px;
    margin-top: 5px;
    float: left;
    background: #ffffff;
  }
  #sav-bottom #sav-form{
    width: 980px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
  }
  #sav-form input{
    width: 95px;
    height: 23px;
    line-height: 23px;
    margin: 20px 0 0 15px;
    border: 0;
    color: #d2d2d2;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    float: left;
  }
  #sav-form span{
    height: 25px;
    line-height: 25px;
    float: left;
    margin: 20px 0 0 15px;
    color: #d2d2d2;
    font-size: 12px;
  }
  #sav-form #btn3{
    width: 80px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    font-size: 14px;
    margin: 20px 0 0 20px;
    border: 0;
    color: #ffffff;
    background: #19acf7;
    float: left;
    cursor: pointer;
  }
</style>
