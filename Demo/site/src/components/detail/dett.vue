<template>
  <div id="det">
    <Top></Top>
    <Header></Header>
    <div id="detail-warp">
      <div id="detail-top">
        <h2>安全提醒：为了你的财产安全，不要点击陌生链接、不要像陌生人转账或透漏银行卡和验证码的信息，谨防诈骗!</h2>
      </div>
    </div>
    <div id="cen-warp">
      <div id="center" v-for="(item,index) in integral" v-if="index<1" :key="index">
        <span id="pp">我的企铛铛&gt;订单中心&gt;订单：{{item.InnerOrderId}}</span>
        <div id="btn" @click="$router.go(-1)">返回</div>
        <div id="btn" @click="$router.push('/subpay?id='+item.InnerOrderId+'&'+'data='+item.OrderAmount+'&'+'money='+item.status)" :style="{display:item.status==1?'inline-block':'none'}">支付</div>
        <div id="center-one">
          <div id="one-left">
            <p>订单：{{item.InnerOrderId}}</p>
            <span>{{item.statusName}}</span>
          </div>
          <div id="one-right">
            <p>尊敬的客户，您的订单商品已经从库房发出，请你做好收货标准。如果您已收到货物，请点击"确认收货"按钮完成订单。</p>
            <ul id="ul-li">
              <li :style="{color:item.status>=1?'#ff5b00':''}">
                <i class="iconfont">&#xe683;</i>
                <span>提交订单</span>
              </li>
              <a :style="{color:item.status>=1?'#ff5b00':''}"> ----></a>
              
              <li :style="{color:item.status>=2?'#ff5b00':''}">
                <i class="iconfont">&#xe607;</i>
                <span>待发货</span>
              </li>
              <a :style="{color:item.status>=2?'#ff5b00':''}"> ----></a>

              <li :style="{color:item.status>=3?'#ff5b00':''}">
                <i class="iconfont">&#xe656;</i>
                <span>已发货</span>
              </li>
              <a :style="{color:item.status>=3?'#ff5b00':''}"> ----></a>

              <li :style="{color:item.status>=3?'#ff5b00':''}">
                <i class="iconfont">&#xe705;</i>
                <span>配送中</span>
              </li>
              <a :style="{color:item.status>=3?'#ff5b00':''}"> ----></a>

              <li :style="{color:item.status>=8?'#ff5b00':''}">
                <i class="iconfont">&#xe605;</i>
                <span>已完成</span>
              </li>
            </ul>

          </div>
        </div>
        <div id="center-two">
          <div id="two-left" @click="$router.push('/detail?id='+integral[0].detail[0].product_id)">
            <p><img :src="integral[0].detail[0].img| imgUrl"></p>
            <div id="span">
              <span>配送方式：普通快递</span>
              <span>配送公司：{{exp_name}}</span>
              <span>快递单号：{{exp_number}}</span>
            </div>
          </div>

          <div id="two-right">
            
            <ul id="right" v-show="hide"> 
               <li v-for="(item,index) in integral">
                <i></i>
                <span>{{integral[0].create_time}}</span>
                <p>{{item.status === 1 ?'您提交了订单，请等待付款':item.status === 2 ?'支付已完成，请等待发货':'暂无物流信息'}}</p>
              </li>
            </ul>


            <ul id="right">
               <li v-for="item in logList">
                <i></i>
                <span>{{item.time}}</span>
                <p>{{item.status}}</p>
              </li>
            </ul>
          </div>


        </div>

        <div id="center-three">
          <div id="three-left">
            <h3>收货信息</h3>
            <p>收货人：{{integral[0].ReceiveName}}</p>
            <p>地址：{{integral[0].Province}}{{integral[0].County}}{{integral[0].Address}}</p>
            <p>电话：{{integral[0].UserTel}}</p>
          </div>
          <div id="three-center">
            <h3>配送信息</h3>
            <p>配送方式：普通快递</p>
            <p>快递运费：{{integral[0].detail[0].delivery_among?'到付':integral[0].Freight}}</p>
            <p>送货日期：只工作日送货（双休日、假日不用送)</p>
          </div>
          <div id="three-right">
            <h3>付款信息</h3>
            <p>商品总额：{{integral[0].detail[0].balancePrice}}</p>
            <p>快递运费：{{integral[0].detail[0].delivery_among?'到付':integral[0].Freight}}</p>
            <p :style="{display:integral[0].detail[0].delivery_among?'block':'none'}">预估到付：{{integral[0].detail[0].delivery_among}}</p>
            <p>在线实付款：{{integral[0].OrderAmount}}</p>
            <span>注：物流到付，实际物流按照到付的实际金额为准</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Top from "../index/top"
  import Header from "../index/head"
  import Footer from "../common/footer"
    export default {
      name: "det",
      data(){
        return{
          orderId : "",
          integral:[],
          log:[],
          logList:[],
          exp_name:'',
          exp_number:'',
          hide:false
        }
      },
      components:{
        Top,
        Header,
      },
      methods:{

        //采购商城订单详情
        getDet(){
          this.$ajax.get("/vitation/order-list",{
            params:{
              orderId:this.$route.query.id,
            },
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.integral=data.data.data;
          })
        },

        //物流信息
        getLog(){
          this.$ajax.get("/system/logistics-info",{
            params:{
             orderId:this.$route.query.id,
            },
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              console.log(data.data.info,2222);
              if(data.data.info==undefined){
                this.hide=true;
              };
              this.log=data.data.info;
              this.exp_number=data.data.number;
              this.exp_name=data.data.exp_name;
              localStorage.log=JSON.stringify(this.log);
              this.logList=JSON.parse(localStorage.log);
              this.exp_number=data.data.number;
              this.exp_name=data.data.exp_name;
              console.log(this.logList,2212121);
          })
        },

        Time(){
          let timer=setInterval(() => {
            localStorage.removeItem("log")
            this.getLog();
  　　　   }, 7200000);
        }
      },
      mounted(){
        this.getDet();
        this.getLog();
        this.Time();
      }
    }
</script>

<style scoped>
  #detail-warp{width: 100%;background: #eaeaea;}
  #detail-top{width: 1200px;height: 40px;background: #eaeaea;margin: 0 auto;}
  #detail-top h2{
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    color: #8d8d8d;
    float: left;
    font-weight: normal;
  }
  #cen-warp{width: 100%;background: #f5f5f5;}
  #center{width: 1200px;min-height: 900px;background: #f5f5f5;margin: 0 auto;overflow: hidden;}
  #center #pp{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #8d8d8d;
    display: inline-block;
  }
  #center #btn{
    width: 65px;
    height: 25px;
    line-height: 23px;
    font-size: 14px;
    text-align: center;
    border: 0;
    float: right;
    margin-top: 15px;
    margin-right: 20px;
    color: #ff0000;
    cursor: pointer;
    border: 1px solid #ff0000;
    border-radius: 3px;
  }
  #center #center-one{
    width: 1200px;
    height: 220px;
    background: #fff;
    border-top: 5px solid #ff5b00;
  }
  #center-one #one-left{
    width: 320px;
    height: 100%;
    border-right: 1px solid #f5f5f5;
    float: left;
  }
  #one-left p{
    font-size: 14px;
    color: #8d8d8d;
    font-weight: bold;
    margin-top: 15px;
    text-align: center;
  }
  #one-left span{
    font-size: 24px;
    color: #ff5b00;
    font-weight: bold;
    margin-top: 30px;
    text-align: center;
    display: block;
  }
  #center-one #one-right{width: 879px;height: 100%;float: left;}
  #one-right p{
    font-size: 14px;
    color: #8d8d8d;
    margin-top: 15px;
    text-align: center;
  }
  #one-right #ul-li{
    width: 100%;
    height: 160px;
    margin-top: 20px;
  }
  #ul-li a{
    display: block;
    float: left;
    margin: 20px 0 0 0;
    font-size: 16px;
    color: #b2b2b2;
  }
  #ul-li li{
    height: 100%;
    float: left;
    width: 120px;
    margin-left: 10px;
  }
  #ul-li li .iconfont{
    font-size: 40px;
    width: 100%;
    text-align:center;
    display:block;
  }
  #ul-li li  span{
    font-size: 14px;
    width: 100%;
    text-align:center;
    display:block;

  }


  #center #center-two{
     width: 1200px;
     height: 220px;
     background: #fff;
     margin-top: 5px;
  }
  #center-two #two-left{
    width: 320px;
    height: 100%;
    border-right: 1px solid #f5f5f5;
    float: left;
    cursor: pointer;
  }
  #two-left p{width: 100px;float: left;height: 100%;position: relative;}
  #two-left p img{width: 80px;height: 80px;position: absolute;top: 60px;left: 10px;}
  #two-left #span{
    width: 200px;
    float: left;
    margin-left: 15px;
    padding: 60px 0 0 0;
    box-sizing: border-box;
  }
  #two-left #span span{
    width: 100%;
    font-size: 14px;
    color: #8d8d8d;
    margin-top: 5px;
    display: block;
  }



  
  
  #center-two #two-right{width: 879px;height: 100%;float: left;}
  #two-right #right{
    width: 700px;
    height: 200px;
    margin: 10px auto;
    overflow: auto;
  }

  #two-right #right li{
    width: 673px;
    float: left;
    min-height: 35px;
    background: #fff;
    margin-top: 10px;
    margin-left: 10px;

  }

  #two-right #right li i{
    width: 14px;
    height: 35px;
    float: left;
    width: 14px;
    background: url('../../image/group.png');
    background-size: cover;
  }


  #two-right #right li span{
    float: left;
    font-size: 12px;
    line-height: 14px;
    margin-left: 30px;
    color: #666;
  }


  #two-right #right li p{
    width: 470px;
    float: left;
    margin-left: 30px;
    font-size: 14px;
    color: #333;
  }
  /* #two-right #log{
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 200px;
    font-size: 28px;
    color: #333;
  } */







  #center #center-three{
    width: 1200px;
    height: 220px;
    background: #fff;
    margin-top: 5px;
    margin-bottom: 60px;
    color: #626262;
  }
  #center-three #three-left{
    width: 320px;
    height: 100%;
    border-right: 1px solid #f5f5f5;
    float: left;
  }
  #three-left h3{
    font-size: 14px;
    margin-top: 25px;
    text-indent: 45px;
    color: #333;
  }
  #three-left p{
    font-size: 14px;
    margin-top: 10px;
    text-indent: 45px;
  }
  #center-three #three-center{
    width: 480px;
    height: 100%;
    border-right: 1px solid #f5f5f5;
    float: left;
  }
  #three-center h3{
    font-size: 14px;
    margin-top: 25px;
    text-indent: 105px;
    color: #333;
  }
  #three-center p{
    font-size: 14px;
    margin-top: 10px;
    text-indent: 105px;
  }
  #center-three #three-right{width: 398px;height: 100%;float: left;}
  #three-right h3{
    font-size: 14px;
    margin-top: 25px;
    text-indent: 45px;
    color: #333;
  }
  #three-right p{
    font-size: 14px;
    margin-top: 10px;
    text-indent: 45px;
  }
  #three-right span{
    font-size: 12px;
    color: #ff0000;
    display: block;
    margin-top: 5px;
    text-indent: 45px;
  }
</style>
