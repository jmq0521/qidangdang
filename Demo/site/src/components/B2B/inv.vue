<template>
  <div id="inv">
    <div class="top">
      <h4>B2B库存</h4>
    </div>
    <div id="inv-bottom">
      <div id="inv-form">
        <span>商品名称</span><input type="text" value="">
        <span>全部分类</span><input type="text" value="">
        <span>兑换券价</span><input type="text" value=""><span>----</span><input type="text" value="">
        <div id="btn">查询</div>
        <div id="btn1">调整记录</div>
      </div>
      <el-table style="width: 980px;margin: 0 auto;">
        <el-table-column label="操作日期"></el-table-column>
        <el-table-column label="商品分类"></el-table-column>
        <el-table-column label="商品单价"></el-table-column>
        <el-table-column label="累计进货"></el-table-column>
        <el-table-column label="已兑数量"></el-table-column>
        <el-table-column label="库存"></el-table-column>
        <el-table-column label="修改兑换券价" width="150px"></el-table-column>
        <el-table-column label="修改排序"></el-table-column>
        <el-table-column label="二维码"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "inv"
  }
</script>

<style scoped>
  #inv{
    width: 1010px;
    height: 600px;
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
  #inv-bottom{
    width: 100%;
    min-height: 450px;
    margin-top: 5px;
    float: left;
    background: #ffffff;
    margin-bottom: 20px;
  }
  #inv-bottom #inv-form{
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
  #inv-form span{
    float: left;
    height: 60px;
    line-height: 60px;
  }
  #inv-form input{
    width: 100px;
    height: 25px;
    line-height: 25px;
    margin: 20px 0 0 10px;
    border: 0;
    font-size: 12px;
    text-indent: 10px;
    border: 1px solid #e5e5e5;
    margin-right: 15px;
  }
  #inv-form input:nth-of-type(3){width: 50px;}
  #inv-form input:nth-of-type(4){width: 50px;}
  #inv-form select{
    width: 110px;
    height: 25px;
    margin-left: 16px;
    font-size: 12px;
    color: #b6b6b6;
    border: 0;
    float: left;
    margin-top: 20px;
  }
  #inv-form input{
    width: 105px;
    height: 20px;
    font-size: 12px;
    line-height: 20px;
    color: #cccccc;
    float: left;
    margin-left: 15px;
    margin-top: 20px;
    border: 1px solid #e5e5e5;
  }
  #inv-form #btn{
    width: 80px;
    height: 22px;
    line-height: 22px;
    font-size: 14px;
    text-align: center;
    border: 0;
    float: left;
    margin-left: 5px;
    margin-top: 20px;
    color: #ffffff;
    background: #19acf7;
    cursor: pointer;
  }
  #inv-form #btn1{
    width: 80px;
    height: 20px;
    line-height: 20px;
    font-size: 14px;
    text-align: center;
    border: 0;
    float: left;
    margin-left: 15px;
    margin-top: 20px;
    color: #ff0000;
    cursor: pointer;
    border: 1px solid #ff0000;
  }
</style>
