<template>
  <div id="sea">
    <div class="top">
      <h4>预售商品-预售区</h4>
      <div id="btn" @click="$router.go('-1')">返回</div>
    </div>
    <div id="sea-bottom">
      <div id="sea-form">
        <span>商品名称</span><input type="text" v-model="search">
        <span>状态</span>
        <select id="s1">
          <option value="0">全部</option>
          <option value="1">上架</option>
          <option value="2">下架</option>
        </select>
        <div id="btn1" @click="getPreSell()">查询</div>
      </div>
      <el-table style="width: 1000px;margin: 0 auto;" :data="preselllist">
        <el-table-column label="商品名称" width="300px">
          <template slot-scope="scope">
            <img :src="scope.row.img | imgUrl" width="50px" height="50px" style="float:left;margin: 15px 0 0 5px"/>
            <span style="text-align:left;width:200px;height:80px;margin: 10px 0 0 5px;display: inline-block;">{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="商品分类"></el-table-column>
        <el-table-column prop="buyNum" label="已兑数量"></el-table-column>
        <el-table-column prop="balance_price" label="商品成本"></el-table-column>
        <el-table-column prop="marketPrice" label="市场价"></el-table-column>
        <el-table-column label="修改兑换券价" width="105px">
          <template slot-scope="scope">
           <input type="text" id="txt1" v-model="scope.row.integral_price" autocomplete="off"/>
          </template>
        </el-table-column>
        <el-table-column label="修改排序">
          <template slot-scope="scope">
            <input type="text" id="txt2" v-model="scope.row.sort" autocomplete="off"/>
          </template>
        </el-table-column>
        <el-table-column  label="状态">
          <template slot-scope="scope">
            <span :style="{background:scope.row.status===1?'#f56c6c':'#0aa6e8'}" @click="upPreSell(scope.row.id,'edit',scope.row.status===1?2:1)" id="span1">{{scope.row.status==1?'已上架':'已下架'}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="105px">
          <template slot-scope="scope">
            <span  @click="upPre(scope.row.id,'edit',scope.row.integral_price,scope.row.sort)" id="span1">修改</span>
            <span  @click="delPreSell(scope.row.id,'del')" id="span2">删除</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
        background layout="prev, pager, next"
        :page-count="total"
        @current-change="getPreSell">
      </el-pagination>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sea",
    data(){
      return{
        preselllist:[],
        total:1,
        page: 1,
        search:'',
      }
    },
    methods:{
      //显示商家预售区商品列表
      getPreSell(page){
        var select = document.getElementById("s1");
        let options = select.options;
        let index = select.selectedIndex;
        this.$ajax.get("/person/preSellList",{
          params:{
            page,
            search:this.search,
            status:options[index].value,
          },
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.preselllist=data.data.data;
            this.total=data.data.last_page;
            this.PageNumber=page;
        })
      },
      //商家删除预售区的商品
      delPreSell(id,type){
        this.$ajax.post("/person/editPreSell",{
          id,
          type
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.$message({
              message:data.msg,
              type: 'success'
            });
            this.getPreSell(this.PageNumber);
        })
      },
      //商家修改预售区的商品状态
      upPreSell(id,type,status){
        this.$ajax.post("/person/editPreSell",{
          id,
          type,
          status
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.$message({
            message:data.msg,
            type: 'success'
          });
          this.getPreSell(this.PageNumber);
        })
      },
      //商家修改预售区的商品
      upPre(id,type,intPrice,sort){
        this.$ajax.post("/person/editPreSell",{
          id,
          type,
          intPrice,
          sort
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.$message({
            message:data.msg,
            type: 'success'
          });
          this.getPreSell(this.PageNumber);
        })
      },
    },
    mounted() {
      this.getPreSell(this.page);
    }
  }
</script>

<style scoped>
  #sea{
    width: 1020px;
    min-height: 820px;
    margin-top: 10px;
  }
  .top{height: 50px;background: #fff;}
  .top h4{
    text-indent: 15px;
    font-size: 14px;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  .top #btn{
    width: 70px;
    height: 25px;
    line-height: 23px;
    font-size: 14px;
    text-align: center;
    border: 0;
    float: right;
    margin-top: 15px;
    margin-right: 30px;
    color: #ff0000;
    cursor: pointer;
    border: 1px solid #ff0000;
    border-radius: 3px;
  }
  #sea-bottom{
    width: 100%;
    min-height: 750px;
    margin-top: 10px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  #sea-bottom #sea-form{
    width: 1000px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
    font-size: 14px;
    padding-left: 20px;
    box-sizing: border-box;
    color: #313131;
  }
  #sea-form input{
    width: 105px;
    height: 23px;
    font-size: 12px;
    line-height: 20px;
    color: #ccc;
    float: left;
    margin-left: 15px;
    margin-top: 20px;
    margin-right: 15px;
    border: 1px solid #e5e5e5;
  }
  #sea-form span{
    float: left;
    height: 60px;
    line-height: 60px;
  }
  #sea-form input:nth-of-type(2){width: 50px;}
  #sea-form input:nth-of-type(3){width: 50px;}
  #sea-form select{
    width: 110px;
    height: 25px;
    margin-left: 16px;
    font-size: 12px;
    color: #b6b6b6;
    border: 0;
    float: left;
    margin-top: 20px;
  }
  #sea-form #btn1{
    width: 80px;
    height: 25px;
    line-height: 23px;
    font-size: 14px;
    text-align: center;
    border: 0;
    float: left;
    margin-left: 15px;
    margin-top: 20px;
    color: #fff;
    cursor: pointer;
    background: #ff0000;
  }
  #txt1{
    background: #fff;
    color: #A3A3A3;
    width: 60px;
    height: 25px;
    border-radius: 2px;
    text-align: center;
    border: 0;
    border: 1px solid #A3A3A3;
    outline: none;
  }
  #txt2{
    background: #fff;
    color: #A3A3A3;
    width: 60px;
    height: 25px;
    border-radius: 2px;
    text-align: center;
    border: 0;
    border: 1px solid #A3A3A3;
    outline: none;
  }
  #span1{
    display: block;
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #fff;
    border-radius: 3px;
    background: #0aa6e8;
    cursor: pointer;
  }
  #span2{
    display: block;
    width: 50px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    color: #fff;
    border-radius: 3px;
    background: #f56c6c;
    cursor: pointer;
    margin-top: 10px;
  }
</style>
