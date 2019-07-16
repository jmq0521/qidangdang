<template>
  <div id="bottom-warp">
    <div id="header-bottom">
      <h3>全部商品</h3>
      <h4 @click="allDel()">清除购物车</h4>
      <thead>
        <tr width="1200px">                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              
          <th width="200px">
            <p style="float:left;margin-right:-50px;margin-left:40px;margin-top:1px;">
              <input type="checkbox"  v-on:click="swapCheck" v-model="checked"/>
            </p>
            全选
          </th>
          <th width="390px">商品信息</th>
          <th width="195px">物流费用</th>
          <th width="195px">单价</th>
          <th width="195px">数量</th>
          <th width="195px">商品总价</th>
          <th width="195px">操作</th>
        </tr>
      </thead>
      <div v-show="hide" id="show">
        <i></i>
        <p id="art" @click="$router.push('/')">购物车暂无数据，去看看其他好货吧···</p>
      </div>
      <div class="shoplist" v-show="show">
        <div class="shop-item clearfix" v-for="(item,index) in carList" :key="index">
          <p class="fl">
            <input type="checkbox" v-model="selectList" :id="item.Id" :value="index" name="selectList" />
          </p>
          <p class="fl" @click="$router.push('/detail?id='+item.ProId)">
            <img :src="item.proImg | imgUrl" width="60px" height="60px">
            <span style="display: block;margin-top: 5px;">{{item.ProName}}</span>
            <span style="display: block;margin-top: 5px;font-weight:normal">{{item.StyleName}}</span>
          </p>
          <p class="fl">
            <span>{{item.delivery_among?item.delivery_among:item.freight_price}}</span>
          </p>
          <p class="fl shop-count">
            <span style="display:block;margin-top:25px; color: #ff5b00;font-size:12px;">
              标准兑换：{{item.vip_price.substr(0,item.vip_price.length-1)}}
              <a style="margin-left:-3px;color: #ff5b00;opacity: 0.4;">{{item.vip_price.substring(item.vip_price.length-1)}}</a>
            </span>
            <span style="display:block;margin-top:5px;color: #A1A1A1;font-size:12px;">
              至尊兑换：{{item.enjoy_price.substr(0,item.enjoy_price.length-1)}}
              <a style="margin-left:-3px;color: #A1A1A1;opacity: 0.4;">{{item.enjoy_price.substring(item.enjoy_price.length-1)}}</a>
            </span>
          </p>
          <p class="fl count" :data-id="item.Id">
            <span
              id="span1"
              @click="redPre(item.ProId,item.StyleId,item.ProNum==item.min_purchase?item.ProNum-=0:item.ProNum-=(item.min_purchase*item.order_step),item.deliverytype_product_id,item.freight_price)"
              data-number="1"
            >-</span>
            <input id="input" type="text" v-model="item.ProNum" disabled="disabled" >
            <span
              id="span2"
              @click="addPre(item.ProId,item.StyleId,item.ProNum+=(item.min_purchase*item.order_step),item.deliverytype_product_id,item.freight_price)"
              data-number="1"
            >+</span>
          </p>
          <em class="fl sumPrice">
            <!-- {{type==1?item.vip_price*item.ProNum*0.1:item.enjoy_price*item.ProNum*0.1}} -->
            {{item.ShopPrice}}
          </em>
          <i class="fl delBtn">
            <span @click="delCar(item.Id)" style="color: #ff0000;cursor:pointer;">删除</span>
          </i>
        </div>
      </div>
      <el-pagination
      style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
      background layout="prev, pager, next"
      :page-count="total"
      @current-change="getCar">
      </el-pagination>
      <div id="bottom">
        <a @click="$router.push('/')">继续选货</a>
        <div id="btn" @click="SubCar()">提交订单</div>
        <span>已选择
          <mark id="count">{{total_num}}</mark>件商品&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          总价：
          <mark id="money">
            {{total_price}}
            <!-- {{total_price.toString().substr(0,total_price.toString().length-4)}}
            <span style="color: #ff5b00;opacity: 0.4;">{{total_price.toString().substring(total_price.toString().length-4)}}</span> -->
          </mark>
        </span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "bottom",
  data() {
    return {
      show:true,
      hide:false,
      type:localStorage.type,
      carList: [],
      page: 1,
      total: 1,
      orderList:[],
      carArray:[],
      selectList:[],
      checked:false,
    }
  },
  methods: {
    //实现全选
    swapCheck:function(){
      var selectList = document.getElementsByName('selectList');
      var len = selectList.length;
      if(this.checked){
        for(var i = 0;i < len;i++){
          var item = selectList[i];
          item.checked = false;
        }
        this.checked = false;
        this.selectList = [];
      }else{
        for(i = 0;i < len;i++){
          var item = selectList[i];
          if(item.checked === false){
            item.checked = true;
            this.selectList.push(selectList[i].value);
          }
        }
        this.checked = true;
      }
    },



    //购物车全部删除
    allDel(){
      for(var i = 0,len = this.selectList.length;i < len;i++){
        var index = this.selectList[i];
        var item = this.carList[index];
        if(item){
          this.carArray.push(item.Id);
          this.$ajax.post("/purchase/delCar",{
              id:this.carArray.toString()
          },{
            headers: {
              token: localStorage.token
            }
          }).then(data => {
            this.getCar();
          }); 
        }
      }
    },





    //采购商城购物车列表
    getCar(page) {
      this.$ajax.post("/purchase/carList",{
        page:page
      },{
          headers: {
            token: localStorage.token
          }
        }).then(data => {
        this.carList = data.data.access_token.data;
        this.checkeds=new Array(data.data.access_token.data.length);
        this.total = data.data.access_token.last_page;
        if(data.data.access_token.data.length==0){
          this.show=false,
          this.hide=true
        }
      });
    },

    //购物车提交订单
    SubCar(){
      for(var i = 0,len = this.selectList.length;i < len;i++){
        var index = this.selectList[i];
        var item = this.carList[index];
        if(item){
          this.carArray.push(item.Id);
          this.carArray.toString();
          this.$router.push('/mesage?id='+this.carArray);
        }
      }
    },

    //采购商城增加购物车
    addPre(product_id, style_id, product_num,freight_id,freight_price){
      this.$ajax.post("v2/cart/add",{
          product_id,
          style_id,
          product_num,
          freight_id,
          freight_price,
          source:'pc'
        },{
          headers: {
            token: localStorage.token
          }
        }).then(data => {
          console.log(121212, data.msg);
          this.getCar();
          // this.getLivery(product_id,product_num,freight_id,freight_price)
      });
    },

    //采购商城减少购物车
    redPre(product_id, style_id, product_num,freight_id,freight_price) {
      this.$ajax.post("v2/cart/add",{
          product_id,
          style_id,
          product_num,
          freight_id,
          freight_price,
          source:'pc'
        },{
          headers: {
            token: localStorage.token
          }
        }).then(data => {
          console.log(121212, freight_price);
          this.getCar();
          // this.getLivery(product_id,product_num,freight_id,freight_price)
      });
    },

    //物流费用
    // getLivery(product_id,product_num,freight_id,freight_price){
    //   this.$ajax.get("v2/product/freight",{
    //     params:{
    //       product_id,
    //       product_num,
    //       freight_id,
    //     },
    //     headers: {
    //       'token' :localStorage.token
    //     }}).then(data=>{
    //     freight_price=data.data.freightPriceTotal;
    //     console.log(data.data.freightPriceTotal,1221212)
    //     this.getCar();
    //   })
    // },

    //删除购物车的记录
    delCar(id) {
      this.$ajax.post("/purchase/delCar",{
          id
        },{
          headers: {
            token: localStorage.token
          }
        }).then(data => {
        this.$message({
          message: data.msg,
          type: 'success'
        })
        this.getCar();
      });
    },
  },
  computed:{
    //总价
    total_price:function(){
      var price = 0;
        for(var i = 0,len = this.selectList.length;i < len;i++){
          var index = this.selectList[i];
          var item = this.carList[index];
        if(item){
          if(this.type==1){
            price += (Number(item.vip_price) * Number(item.ProNum)*0.1) + Number(item.freight_price);
          }else{
            price += (Number(item.enjoy_price) * Number(item.ProNum)*0.1)+ Number(item.freight_price);
          }
        }else{
          continue;
        }
      }
      return price=parseFloat(price).toFixed(2);
    },

    //总件数
    total_num() {
     var t_num = 0;
        for(var i = 0,len = this.selectList.length;i < len;i++){
          var index = this.selectList[i];
          var item = this.carList[index];
        if(item){
         t_num += Number(item.ProNum);
        }else{
          continue;
        }
      }
      return t_num
    }
  },
  mounted() {
    this.getCar();
  }
};
</script>

<style scoped>
#bottom-warp {
  width: 100%;
}
#header-bottom {
  width: 1200px;
  min-height: 780px;
  margin: 0 auto;
}
#header-bottom h3 {
  height: 40px;
  line-height: 40px;
  font-size: 18px;
  color: #626262;
  display: inline-block;
}
#header-bottom h4{
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #19acf7;
  float: right;
  font-weight: normal;
  cursor: pointer;
}
#bottom {
  width: 100%;
  height: 50px;
  margin-top: 30px;
  background: #eee;
  float: left;
  margin-bottom: 30px;
}

#bottom a {
  float: left;
  line-height: 50px;
  color: #333;
  font-size: 14px;
  margin-left: 50px;
}
#bottom span {
  float: right;
  line-height: 50px;
  font-size: 14px;
  font-weight: bold;
  color: #626262;
}
#bottom span mark {
  color: #ff0000;
  background: #eee;
}
#bottom #btn {
  float: right;
  width: 135px;
  line-height: 50px;
  font-size: 14px;
  text-align: center;
  font-weight: bold;
  background: #ff0000;
  color: #fff;
  cursor: pointer;
  margin-left: 20px;
}




tr {
  background: #eee;
  height: 50px;
  line-height: 50px;
}
tr th {
  font-size: 14px;
  color: #313131;
  text-align: center;
}
#header-bottom .shoplist {width: 100%;}
.shop-item {
  width: 100%;
  height: 100px;
  border-bottom: 1px solid #eee;
}
.shop-item input[type="checkbox"] {
  width: 13px;
  height: 13px;
}
.shop-item .fl:nth-of-type(2) {width: 300px;cursor: pointer;}
.shop-item .fl:nth-of-type(2) img {
  float: left;
  margin-top: 8px;
}

.shop-item .fl:nth-of-type(2) span {
  width: 200px;
  float: left;
  text-align: left;
  margin-left: 10px;
}

.shop-item .fl {
  padding: 10px;
  box-sizing: border-box;
  width: 150px;
  display: block;
  font-style: normal;
  height: 100px;
  font-weight: bold;
  color: #313131;
  text-align: center;
  float: left;
  font-size: 12px;
}
.shop-item .fl:after {
  content: "";
  display: inline-block;
  vertical-align: middle;
  height: 100%;
}
.shop-item #span1 {
  font-size: 20px;
  cursor: pointer;
  width: 20px;
  display: inline-block;
  height: 22px;
  line-height: 15px;
  border: 1px solid #eee;
  color: #313131;
  margin-right: -4px;
}
.shop-item .count #span2 {
  font-size: 20px;
  color: #313131;
  cursor: pointer;
  width: 20px;
  display: inline-block;
  height: 22px;
  line-height: 15px;
  border: 1px solid #eee;
  margin-left: -5px;
}
.shop-item .count #input {
  width: 40px;
  height: 22px;
  line-height: 15px;
  border: none;
  text-align: center;
  border: 1px solid #eee;
  border-left: none;
  border-right: none;
  outline: none;
  background: #fff;
}


#show{
    width: 100%;
    height: 160px;
    /* background: tan; */
    margin-top: 30px;
    float: left;
  }
  #show i{
    display: block;
    width: 65px;
    height: 65px;
    margin: 20px auto;
    background: url('../../image/show.png');
   }
  #show #art{
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: center;
    font-size: 14px;
    cursor: pointer;
  }
</style>