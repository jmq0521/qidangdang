<template>
  <div id="pur">
    <div class="top">
      <h4>采购订单</h4>
    </div>
    <div id="pur-bottom">
      <div id="pur-form">
        <ul id="pur-ul">
          <li v-for="(item,index) in sele" :key="index" @click="getStatu(item.value,index)"  :class= "isactive === index ? 'addclass' : '' ">{{item.label}}</li>
        </ul>
        <input type="text" placeholder="订单号" v-model="orderId" style="text-indent:5px;outline:none"/>
        <i class="iconfont" @click="getPur()">&#xe752;</i>
      </div>
      <thead>
        <tr>
          <th width="350px">订单详情</th>
          <th width="200px">收货人</th>
          <th width="200px">金额</th>
          <th width="200px">状态</th>
          <th width="200px">操作</th>
        </tr>
      </thead>

      <div v-show="hide" id="show">
        <p id="art">暂无数据</p>
      </div>


      <div class="shoplist">
        <div class="shop-item clearfix" v-for="item in purList" :key="item.InnerOrderId">
          <div id="box">
            <p>{{item.create_time}}</p>
            <p>订单号：<mark>{{item.InnerOrderId}}</mark></p>
          </div>
          <p class="fl" v-for="(img,index) in item.detail" v-if="index<1" :key="index"  @click="$router.push('/detail?id='+img.product_id)">
            <img :src="img.img | imgUrl" width="50px" height="50px" style=" margin: 30px 0 0 20px;" :onerror="Img"> 
            <span>{{img.proName ? img.proName : null}}</span>
            <span>【{{img.id ? img.id : null}}】</span>
            <span>数量:{{img.proNum ? img.proNum : null}}</span>
            <span>单价:￥{{img.one_price ?img.one_price : null}}</span>
          </p>
          <p class="fl">
            <span>收货人:{{item.ReceiveName}}</span>
            <span>电话:{{item.UserTel}}</span>
            <span>地址:{{item.Province}}{{item.City}}{{item.County}}{{item.Address}}</span>
          </p>
          <p class="fl" v-for="(img,index) in item.detail" :key="index" v-if="index<1"><span>{{item.OrderAmount}}</span></p>
          <p class="fl"> 
            <span>
              <mark @click="getDet(item.InnerOrderId)" style="background:#fff;color:#616161;margin-left:20px;" :style="{display:item.status==10?'none':'inline-block'}">订单详情</mark>
              <mark style="background:#fff;color:#616161;margin-left:20px;">{{item.statusName}}</mark>
            </span>
          </p>  
          <p class=fl>
            <span style="cursor: pointer;" @click="item.status==1?open(item.InnerOrderId):''">{{item.status==1?'取消订单':item.status==10?'已取消':'无法取消'}}</span>
          </p>
        </div>
      </div>
      <el-pagination
        style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
        background layout="prev, pager, next"
        :page-count="total"
        @current-change="getPur">
      </el-pagination>
       <el-dialog
        style="text-align: center"
        title="提示"
        :visible.sync="Visible"
        :show-close="false"
        :close-on-click-modal="false"
        top="300px"
        width="280px">
        <span id="span">你确定要取消订单吗？</span>
        <span slot="footer" class="dialog-footer">
          <div id="bnt2" @click="Cancel()">确定</div>
        </span>
      </el-dialog>
      <el-dialog
        style="text-align: center"
        title="提示"
        :visible.sync="Sible"
        :show-close="false"
        :close-on-click-modal="false"
        top="300px"
        width="300px">
        <span style="margin-top:15px;display:block;">请提交审核资料</span>
        <span slot="footer" class="dialog-footer">
          <div id="bnt1" @click="$router.push('/bas')">确认</div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  export default {
    name: "pur",
    data(){
      return{
        Sible:false,
        select:'',
        sele:[
          {
            value:'0',
            label:'过期订单'
          },
          {
            value:'1',
            label:'待付款'
          },
          {
            value:'2',
            label:'待发货'
          },
          {
            value:'3',
            label:'配送中'
          },
          {
            value:'4',
            label:'已发货'
          },
          {
            value:'8',
            label:'已完成'
          },
        ],
        isactive:-1,
        Visible:false,
        hide:false,
        purList:[],
        page:1,
        total:1,
        orderId:'',
        type:'',
        count:'',
        order:'',
        PageNumber:'',
        Img:'this.src="' + require('../../image/bo.png') + '"',
      }
    },
    methods:{
        //判断登录
      getCenter(){
        this.$ajax.post("/Person/userCentre",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.centerList=data.data;
          this.code=data.error_code; 
          if(data.error_code==40015){
            localStorage.clear();
            this.$router.push('/login');
          }
        })
      },
      //显示B2B采购订单列表
      getPur(page){
        this.$ajax.get("/vitation/order-list",{
          params:{
            page,
            orderId:this.orderId,
            status:this.type
          },
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.purList=data.data.data;
          this.total=data.data.last_page;
          this.PageNumber=page;
          if(data.data.data.length==0){
            this.hide=true;
          }else{
            this.hide=false;
          }
        })
      },
      //根据状态搜索
      getStatu(type,index){
        this.type=type,
        this.isactive=index,
        this.getPur(this.PageNumber);
      },

      //判断取消订单吗
      open(order_code){
        this.Visible=true;
        this.order=order_code;
      },
      //确定取消订单
      Cancel(){
        this.$ajax.post("/purchase/cancleOrder",{
          order_code:this.order
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.$message.success(data.msg);
          this.Visible=false;
          this.getPur(this.PageNumber);
          console.log(this.order,23323)
        })
      },
      //点击进入订单详情
      getDet(orderId){
        this.$ajax.get("/vitation/order-list",{
          params:{
            orderId,
          },
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.$router.push('/dett?id='+orderId)
        })
      }
    },
    mounted(){
      this.getCenter();
      this.type=this.$route.query.id;
      this.isactive=this.$route.query.id,
      this.getPur(this.page);
      if(localStorage.is_audit==0){
        this.Sible=true;
      };
    }
  }
</script>

<style scoped>
 .addclass{color: #ff0000 !important;}
  tr{height: 50px;line-height: 50px;width: 980px;margin-left:20px;display: block;background: #f6f6f6;border-bottom: 1px solid #e57339;}
  tr th{font-size: 14px;color: #313131;text-align:center;}
  #header-bottom  .shoplist{width: 100%;}
  .shop-item{
    width: 980px;
    margin-left:20px;
    height: 160px;
    border-bottom: 1px solid #eee;
  }
   .shop-item #box{
     width: 100%;
     height: 40px;
     background:#f6f6f6;
   }
   #box p:nth-of-type(1){
     font-size: 14px;
     line-height: 40px;
     display: inline-block;
     text-indent: 10px;
   }
   #box p:nth-of-type(2){
     font-size: 14px;
     line-height: 40px;
     display: inline-block;
     text-indent: 30px;
   }
   #box p:nth-of-type(2) mark{background: #f6f6f6;color: #19acf7}
  .shop-item .fl:nth-of-type(1){width: 300px;cursor: pointer;}
  .shop-item .fl{
    width: 168px;
    display: block;
    font-style: normal;
    height: 120px;
    text-align: center;
    font-size: 12px;
    float: left;
    border-right: 1px solid #eee;
  }
  .shop-item .fl:nth-of-type(5){border-right: none;}
  .shop-item .fl:nth-of-type(1) img{float: left;}
  .shop-item .fl:nth-of-type(1) span{
    width: 35px;
    font-size: 12px;
    font-weight: normal;
    line-height: 20px;
    float: left;
    text-align: left;
  }
.shop-item .fl:nth-of-type(1) span:nth-of-type(1){
  width:200px;
  margin:25px 0 0 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.shop-item .fl:nth-of-type(1) span:nth-of-type(2){margin: 19px  0 0 5px;display: inline-block}
.shop-item .fl:nth-of-type(1) span:nth-of-type(3){
 width: 60px;
 margin: 20px  0 0 15px;
 display: inline-block;
}
.shop-item .fl:nth-of-type(1) span:nth-of-type(4){
 width: 100px;
 margin: 20px  0 0 5px;
 display: inline-block;
}

.shop-item .fl:nth-of-type(2) span:nth-of-type(1){margin-top: 25px;}
.shop-item .fl:nth-of-type(2) span{
  display: block;
  width: 120px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  line-height: 20px;
  margin:5px 0 0 35px;
  text-align: left;
}
.shop-item .fl:nth-of-type(3) span{color: #ff0000;}
.shop-item .fl:nth-of-type(4) span{cursor: pointer;}
.shop-item .fl span{
  width: 100%;
  font-size: 12px;
  font-weight: bold;
  line-height: 120px;
  color: #616161;
  text-align: center;
  display: block;
}



#pur{
  width: 1020px;
  min-height: 600px;
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
#pur-bottom{
  width: 100%;
  min-height: 740px;
  margin-top: 10px;
  float: left;
  background: #fff;
  margin-bottom: 20px;
}
#pur-bottom #pur-form{
  width: 980px;
  height: 60px;
  margin: 10px auto 0;
  background: #f6f6f6;
  margin-bottom: 10px;
}
#pur-form #pur-ul{
  float: left;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  font-weight: bold;
}
#pur-ul li{
  float: left;
  width: 95px;
  text-align: center;
  cursor: pointer;
  color: #313131;
}
#pur-form select{
  width: 110px;
  height: 25px;
  margin-left: 16px;
  font-size: 12px;
  color: #ccc;
  border: 0;
  float: left;
  margin-top: 18px;
}
#pur-form input{
  width: 155px;
  height: 22px;
  font-size: 12px;
  line-height: 20px;
  color: #ccc;
  float: left;
  margin-left: 15px;
  margin-top: 18px;
  border: 1px solid #ec652b;
}
.iconfont{
  width: 50px;
  height: 22px;
  line-height: 22px;
  float: left;
  color: #fff;
  margin-top: 18px;
  border: 0;
  background: #ec652b;
  text-align: center;
  border-radius: 0;
  cursor: pointer;
}

  #bnt1{
  width: 120px;
  height: 35px;
  line-height: 35px;
  margin-left: 50px;
  border: 1px solid #e57339;
  border-radius: 25px;
  color: #e57339;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  margin: -13px auto;
}

#bnt2{
  width: 120px;
  height: 35px;
  line-height: 35px;
  margin-left: 60px;
  border: 1px solid #e57339;
  border-radius: 25px;
  color: #e57339;
  text-align: center;
  font-size: 15px;
  cursor: pointer;
  float: left;
  margin-top: -13px;
}

#show{
  width: 980px;
  height: 60px;
  margin: 0 auto;
  border-bottom: 1px solid #f6f6f6;
}
#show #art{
  width: 100%;
  height: 60px;
  line-height: 60px;
  text-align: center;
  font-size: 14px;
}


</style>

