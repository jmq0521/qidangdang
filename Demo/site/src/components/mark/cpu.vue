<template>
  <div id="cpu">
    <div class="top">
      <a id="a-one">供应商品</a>
      <a id="a-two">需求商品</a>
      <a id="a-three">个人记录</a>
    </div>
    <div id="pane-one">
      <div id="one-bottom">
        <span>范围</span>
        <select v-model="pro" @change="getCity(pro)" id="s1">
          <option value="">请选择省份</option>
          <option v-for="item in province" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
        </select>
        <select v-model="cit" @change="getDis(cit)" id="s2">
          <option value="">请选择城市</option>
          <option v-for="item in city" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
        </select>
        <select v-model="dist" id="s3">
          <option value="">请选择区县</option>
          <option v-for="item in dis" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
        </select>
      </div>
      <div id="one-img" @click="$router.push('/detai')">
        <div id="img-left">
          <img src="../../image/list-weima01.png">
          <span>不限量</span>
          <span>奉节肌橙</span>
          <p>预约价格：￥12563</p>
          <p>发布与重庆市</p>
        </div>
        <div id="img-right">
          <img src="../../image/boy.png"/>
          <p>黄先生</p>
        </div>
      </div>
    </div>



    <div id="pane-two">
      <div id="two-img" @click="$router.push('/detai')">
        <div id="two-left">
          <img src="../../image/banner03.png"/>
          <span>不限量</span>
          <span>奉节肌橙</span>
          <p>预约价格：￥12563</p>
          <p>发布与重庆市</p>
        </div>
        <div id="two-right">
          <img src="../../image/boy.png"/>
          <p>黄先生</p>
        </div>
      </div>
    </div>


    <div id="pane-three">
      <el-table style="width: 980px;margin: 10px auto;" >
        <el-table-column  label="全部"></el-table-column>
        <el-table-column  label="需求商品"></el-table-column>
        <el-table-column  label="个人记录"></el-table-column>
      </el-table>


    </div>
  </div>
</template>

<script>
  export default {
    name: "cpu",
    data() {
      return {
        pro:'',
        cit:'',
        dist:'',
        province:[],
        city:[],
        dis:[],

      }
    },
    methods:{
      //获取地区的三级联动
      getPro(code){
        this.$ajax.post("/system/getcity",{
          code
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.province=data.data;
          this.city=data.data;
          this.dis=data.data;
        })
      },
      getCity(code){
        this.$ajax.post("/system/getcity",{
          code
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.city=data.data;
        })
      },
      getDis(code){
        this.$ajax.post("/system/getcity",{
          code
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.dis=data.data;
         })
      }
    },
    mounted(){
      this.getPro(0);
      $('#a-one').click(function(){
        $(this).css("border-bottom","2px solid #ff0000");
        $('#a-two').css("border-bottom","");
        $('#pane-one').css("display","block"),
          $('#pane-two').css("display","none")
        $('#pane-three').css("display","none")
      });
      $('#a-two').click(function(){
        $(this).css("border-bottom","2px solid #ff0000");
        $('#a-one').css("border-bottom","");
        $('#a-three').css("border-bottom","");
        $('#pane-two').css("display","block"),
          $('#pane-one').css("display","none")
        $('#pane-three').css("display","none")
      });
      $('#a-three').click(function(){
        $(this).css("border-bottom","2px solid #ff0000");
        $('#a-two').css("border-bottom","");
          $('#pane-three').css("display","block"),
          $('#pane-one').css("display","none"),
          $('#pane-two').css("display","none")
      })

    }
  }
</script>

<style scoped>
  #cpu{
    width: 1010px;
    min-height: 600px;
    margin-bottom: 20px;
    border-top: 5px solid #626262;
    margin-top: 10px;
  }
  .top{height: 50px;background: #ffffff;margin-bottom: 5px}
  .top #a-one{
    font-size: 14px;
    line-height: 50px;
    float: left;
    font-weight: bold;
    color: #313131;
    margin-left: 30px;
    cursor: pointer;
  }
  .top #a-two{
    margin-left: 30px;
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    float: left;
    color: #313131;
    cursor: pointer;
  }
  .top #a-three{
    margin-left: 30px;
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    float: left;
    color: #313131;
    cursor: pointer;
  }
  #pane-one{
    width: 100%;
    min-height: 740px;
    float: left;
    background: #ffffff;
    margin-bottom: 20px;
  }
  #pane-one #one-bottom{width: 100%;height: 60px;}
  #pane-one  #one-bottom  span{
    display: inline-block;
    font-size: 14px;
    margin: 15px 0 0 30px;
    font-weight: bold;
    color: #313131;
  }
  #pane-one #one-bottom select{
    margin: 20px 0 0 10px;
    color:#A3A3A3;
    width: 105px;
    height: 25px;
  }
  #pane-one #one-img{
    width: 960px;
    height: 225px;
    margin: 10px auto;
    border-top: 1px solid #f6f6f6;
    border-bottom: 1px solid #f6f6f6;
  }
  #one-img #img-left{
    width: 370px;
    height: 100%;
    float: left;
  }
  #img-left img{
    width: 150px;
    height: 150px;
    margin: 20px 0 0 20px;
    float: left;
  }
  #img-left span:nth-of-type(1){
    width: 55px;
    height: 20px;
    line-height: 20px;
    margin: 30px 0 0 15px;
    float: left;
    font-size: 12px;
    background: #fbe4dc;
    color: #fe762c;
    text-align: center;
  }
  #img-left span:nth-of-type(2){
    margin: 30px 0 0 15px;
    float: left;
    font-weight: bold;
    color: #313131;
    font-size: 14px;
  }
  #img-left p{
    float: left;
    font-size: 14px;
    width: 130px;
    margin: 10px 0 0 15px;
  }
  #img-left p:nth-of-type(1){color: #ff0000;font-weight: bold;}
  #img-left p:nth-of-type(2){color: #A3A3A3;font-size:12px;}
  #one-img #img-right{
    width: 100px;
    height: 100%;
    float: right;
    margin-right: 35px;
  }
  #img-right img{
    width: 50px;
    height: 50px;
    margin: 30px 0 0 25px;
  }
  #img-right p{
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    width: 100%;
    text-align: center;
    color: #313131;
  }



  #pane-two{
    width: 100%;
    height: 600px;
    float: left;
    display: none;
    background: #ffffff;
    margin-bottom: 20px;
  }
  #pane-two #two-img{
    width: 960px;
    height: 225px;
    margin: 10px auto;
    border-top: 1px solid #f6f6f6;
    border-bottom: 1px solid #f6f6f6;
  }
  #two-img #two-left{
    width: 370px;
    height: 100%;
    float: left;
  }
  #two-left img{
    width: 150px;
    height: 150px;
    margin: 20px 0 0 20px;
    float: left;
  }
  #two-left span:nth-of-type(1){
    width: 55px;
    height: 20px;
    line-height: 20px;
    margin: 30px 0 0 15px;
    float: left;
    font-size: 12px;
    background: #fbe4dc;
    color: #fe762c;
    text-align: center;
  }
  #two-left span:nth-of-type(2){
    margin: 30px 0 0 15px;
    float: left;
    font-weight: bold;
    color: #313131;
    font-size: 14px;
  }
  #two-left p{
    float: left;
    font-size: 14px;
    width: 130px;
    margin: 10px 0 0 15px;
  }
  #two-left p:nth-of-type(1){color: #ff0000;font-weight: bold;}
  #two-left p:nth-of-type(2){color: #A3A3A3;font-size:12px;}
  #two-img #two-right{
    width: 100px;
    height: 100%;
    float: right;
    margin-right: 35px;
  }
  #two-right img{
    width: 50px;
    height: 50px;
    margin: 30px 0 0 25px;
  }
  #two-right p{
    font-size: 14px;
    font-weight: bold;
    margin-top: 10px;
    width: 100%;
    text-align: center;
    color: #313131;
  }


  #pane-three{
    width: 100%;
    height: 600px;
    float: left;
    display: none;
    background: #ffffff;
    margin-bottom: 20px;
  }

</style>

