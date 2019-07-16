<template>
  <div id="rea">
    <div class="top">
      <h4>储值设置</h4>
      <button>新增储值规则</button>
    </div>
    <div id="rea-bottom">
    <el-table style="width: 980px;margin: 0 auto;">
      <el-table-column prop="date" label="序号"></el-table-column>
      <el-table-column prop="name" label="充值金额"></el-table-column>
      <el-table-column prop="address" label="到账金额"></el-table-column>
      <el-table-column prop="address" label="赠送兑换券"></el-table-column>
      <el-table-column prop="address" label="赠送购物券"></el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button>删除</el-button>
        </template>
      </el-table-column>
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
       name: "rea"
    }
</script>

<style scoped>
  #rea{
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
  .top button{
    width: 100px;
    height: 25px;
    font-size: 12px;
    color: #ffffff;
    background: #ff0000;
    float: right;
    margin-right: 25px;
    border: 0;
    margin-top: 10px;
  }
  #rea #rea-bottom{
    width: 100%;
    height: 540px;
    margin-top: 5px;
    float: left;
    background: #ffffff;
    padding-top: 10px;
    box-sizing: border-box;
  }
</style>
