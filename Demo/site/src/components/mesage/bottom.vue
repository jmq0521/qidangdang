<template>
  <div id="bottom-warp">
    <div id="header-bottom">
      <h3>配送清单</h3>
      <h6 @click="$router.push('/joincar')">返回购物车</h6>
      <div id="bottom-center">
        <el-table style="width: 100%;" :data="purList">
          <el-table-column  label="商品信息" width="380">
            <template slot-scope="scope">
              <img :src="scope.row.product_info.ProImg | imgUrl" width="50px" height="50px" style="float:left;margin: 5px 0 0 10px"/>
              <span style="float: left;margin: 5px 0 0 10px;width:260px;font-weight:bold">{{scope.row.product_info.ProName}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="运费">
            <template slot-scope="scope">
              <span style="font-weight:bold">{{scope.row.car_info.freight_price}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="单价">
            <template slot-scope="scope">
              <span style="color:#ff8744;font-weight:bold">{{type==1?scope.row.product_info.VipPrice*0.1:scope.row.product_info.EnjoyPrice*0.1}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="数量">
            <template slot-scope="scope">
              <span style="font-weight:bold">{{scope.row.car_info.ProNum}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="地址">
            <template slot-scope="scope">
             <span>{{scope.row.address_info.province_name}}{{scope.row.address_info.city_name}}{{scope.row.address_info.county_name}}{{scope.row.address_info.address}}</span>
            </template>
          </el-table-column>
          <el-table-column  label="总价">
            <template slot-scope="scope">
              <span style="color:#ff0000;font-weight:bold">{{scope.row.car_info.total_price}}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <a>共计<mark>{{num}}</mark>件商品，商品总金额：<mark>{{sum |currency}}</mark></a>
      <a>物流运费：{{delivery_among?'到付':freighTotal}}</a>
      <a :style="{display:delivery_among?'block':'none'}">预估到付：{{delivery_among}}</a>
      <a>在线实付款：{{allPriceTotal}}</a>
      <div id="bottom">
        <div id="btn" @click="goPay()">去支付</div>
      </div>
    </div>
  </div>
</template>
<script>
    export default {
      name: "bottom",
      data(){
        return{
          purList:[],
          clientType:"pc",
          dialog:false,
          type:localStorage.type,
          order:'',
          freighTotal:'',
          delivery_among:'',
          allPriceTotal:''
        }
      },
      methods:{
        //购物车提交订单
        SubCar(){
          this.$ajax.post("/purchase/get-car-info", {
            code:this.$route.query.id,
            clientType:this.clientType
            },{
              headers: {
                'token': localStorage.token
              }
            }).then(data=>{
              this.purList=data.data.new_data;
              this.freighTotal=data.data.freighTotal;
              this.delivery_among=data.data.delivery_among;
              this.allPriceTotal=data.data.allPriceTotal;
              console.log(this.purList,565656565);
          })
        },

        //去支付
        goPay(){
           this.$ajax.post("/purchase/clearCar", {
            code:this.$route.query.id,
            clientType:this.clientType
            },{
              headers: {
                'token': localStorage.token
              }
            }).then(data=>{
              this.order=data.data.inner_order;
              this.$router.push('/subpay?id='+this.order+'&'+'data='+this.allPriceTotal+'&'+'money='+0)
          })
        },
      },
      computed:{
        sum(){
          var sum=0;
          for(var i=0;i<this.purList.length;i++){
            sum+=Number(this.purList[i].car_info.one_price*this.purList[i].car_info.ProNum)
          }
          return sum;
        },
        num(){
          var num=0;
          for(var i=0;i<this.purList.length;i++){
            num+=Number(this.purList[i].car_info.ProNum)
          }
          return num;
        },
      },
      mounted(){
        this.SubCar();
      }
    }
</script>
<style scoped>
  #bottom-warp{width: 100%}
  #header-bottom{
    width: 1200px;
    min-height: 820px;
    margin: 0 auto;
    overflow: hidden;
  }
  #header-bottom h3{
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    color: #323232;
    float: left;
  }
  #header-bottom h6{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #19acf7;
    font-weight: normal;
    float: right;
    cursor: pointer;
  }
  #bottom-center{
    width: 1198px;
    min-height: 100px;
    float: left;
  }
  #header-bottom a{
    width: 100%;
    display: block;
    text-align: right;
    line-height: 30px;
    float: right;
    font-size: 14px;
    font-weight: bold;
    color: #626262;
  }
  #header-bottom a mark{color: #ff0000;background: #fff;}
  #bottom{
    width: 100%;
    height: 50px;
    margin-bottom: 30px;
    float: left;
  }
  #bottom h3{
    float: left;
    line-height: 60px;
    color: #21aef7;
    font-size: 14px;
    cursor: pointer;
  }
  #bottom span{
    float: left;
    line-height: 50px;
    margin-left: 745px;
    font-size: 14px;
    font-weight: bold;
    color: #626262;
  }
  #bottom span mark{color: #ff0000;background: #eee;}
  #bottom #btn{
    float: right;
    width: 155px;
    line-height: 50px;
    font-size: 14px;
    text-align: center;
    font-weight: bold;
    background: #ff0000;
    color: #fff;
    cursor: pointer;
  }
</style>
