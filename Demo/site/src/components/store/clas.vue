<template>
  <div id="clas">
    <div class="top">
      <h4>商品分类</h4>
    </div>
    <div id="clas-bottom">
      <div id="clas-form">
        <span>商品名称</span><input type="text" value="请输入商品分类">
        <button>添加</button>
      </div>
      <el-table style="width: 980px;margin: 0 auto;">
        <el-table-column label="序号"></el-table-column>
        <el-table-column label="商品分类"></el-table-column>
        <el-table-column label="是否启用"></el-table-column>

      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: "clas"
    }
</script>

<style scoped>
  #clas{
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
  #clas #clas-bottom{
    width: 100%;
    height: 740px;
    margin-top: 5px;
    margin-bottom: 20px;
    float: left;
    background: #ffffff;
  }
  #clas-bottom #clas-form{
    width: 980px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
    font-size: 12px;
    color: #d2d2d2;
  }
  #clas-form span{
    margin-left: 5px;

  }
  #clas-form input{
    width: 190px;
    height: 25px;
    line-height: 25px;
    margin: 20px 0 0 15px;
    border: 0;
    font-size: 12px;
    text-indent: 15px;
    border: 1px solid #e5e5e5;
    color: #cecece;
  }
  #clas-form button{
    width: 80px;
    height: 25px;
    margin: 20px 0 0 15px;
    border: 0;
    color: #ff5b00;
    border: 1px solid #ff5b00;
    background: #ffffff;
  }
</style>
