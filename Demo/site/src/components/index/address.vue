<template>
  <div id="address">
    <div class="top">
      <h4>地址明细</h4>
      <div id="btn" @click="$router.go(-1)">返回</div>
    </div>
    <el-table style="width: 980px;margin: 0 auto;" :data="address">
      <el-table-column prop="id" label="编号"></el-table-column>
      <el-table-column label="详情">
        <template slot-scope="scope">
          {{scope.row.province_name}}   {{scope.row.city_name}}    {{scope.row.county_name}}
        </template>
      </el-table-column>
      <el-table-column label="操作">
         <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="delAddress(scope.row.id)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <el-pagination
      style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
      background layout="prev, pager, next"
      :page-count="total"
      @current-change="getaddress">
    </el-pagination>
  </div>
</template>

<script>
  $(function(){
    $('#btn').mouseenter(function(){
      $('.img').css('display','block')
    });
    $('#btn').mouseleave(function(){
      $('.img').css('display','none')
    })
  });
  export default {
    name: "add",
    data(){
      return{
        address:[],
        page:1,
        total:1
      }
    },
    methods:{
      //显示地址明细
      getaddress(){
        this.$ajax.post("/person/receiveAddrList",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.address=data.data.data;
          this.total=data.data.last_page
        })
      },
      //删除地址明细
      delAddress(id){
        this.$ajax.post("/person/receiveAddrDel",{
          id,
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            alert(data.msg);
            this.getaddress();
        })
      },
    },
    mounted(){
      this.getaddress()
    }
  }
</script>

<style scoped>
  #address{
    width: 1010px;
    min-height: 800px;
    margin-bottom: 20px;
    border-top: 5px solid #626262;
    background: #ffffff;
    margin-top: 10px;
    float: left;
  }
  .top{height: 50px;width: 100%}
  .top h4{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-indent: 15px;
    float: left;
  }
  .top #btn{
    width: 80px;
    height: 25px;
    float: right;
    line-height: 25px;
    border: 1px solid #ff0000;
    border-radius: 5px;
    color: #ff0000;
    font-size: 14px;
    text-align: center;
    margin: 10px 30px 0 0;
    cursor: pointer;
  }
  .top .img{
    width: 140px;
    height: 140px;
    border: 1px solid #eaeaea;
    position: absolute;
    top: 43px;
    right: 10px;
    background: #ffffff;
    z-index: 999;
    display: none;
  }
  .img img{
    margin: 15px 0 0 28px;
  }
  #address #address-form{
    width: 980px;
    height: 60px;
    margin: 10px auto 0;
    margin-bottom: 10px;
    background: #f6f6f6;
  }
  #address-form select{
    width: 95px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    display: inline-block;
    margin: 20px 0 10px 15px;
    color: #d2d2d2;
    border: 0;
    border: 1px solid #e5e5e5;
    background: #ffffff;
    float: left;
  }
  #address-form input{
    width: 140px;
    height: 23px;
    line-height: 23px;
    margin: 20px 0 0 10px;
    border: 0;
    color: #d2d2d2;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    background: #ffffff;
    float: left;
  }
  #address-form .but-one{
    width: 80px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    font-size: 12px;
    margin: 20px 0 0 20px;
    border: 0;
    background: #ff0000;
    border-radius: 3px;
    float: left;
    cursor: pointer;
  }
  #address-form .but-two{
    width: 70px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: #ffffff;
    text-align: center;
    font-size: 12px;
    margin: 20px 0 0 10px;
    border: 0;
    background: #19acf7;
    border-radius: 3px;
    float: left;
    cursor: pointer;
  }
</style>
