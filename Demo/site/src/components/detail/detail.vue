<template>
  <div>
    <Top></Top>
    <Head></Head>
    <div id="det-warp">
      <div id="det">
        <div id="btn" @click="$router.back()">返回</div>
          <div id="det-left">
            <div id="s-img">
              <span id="mark"></span>
              <span id="float"></span>
              <img :src="proimg | imgUrl"/>
            </div>
            <div id="b-img">
              <img id="imgUrl" :src="proimg | imgUrl"/>
            </div>
            <div id="bottom-img">
              <img v-for="(item,index) in productImg" :key="index" :src="item | imgUrl" v-if="index<4" @click="getIndex(item)"/>
            </div>
        </div>
        <div id="det-right">
          <h3>{{preList.proName}}</h3>
          <div id="right-deta">
            <div id="deta-one">
              <span>
                标准兑换：{{vipPrice.substr(0,vipPrice.length-1)}}
                <a>{{vipPrice.substring(vipPrice.length-1)}}</a>
                <mark>兑换券</mark>
              </span>
              <span>零售价：<mark>￥{{preList.marketprice}}</mark></span>
            </div>
            <div id="deta-two">
              <span>
                至尊兑换：{{enjoyprice.substr(0,enjoyprice.length-1)}}
                <a>{{enjoyprice.substring(enjoyprice.length-1)}}</a>
                <mark>兑换券</mark>
              </span>
            </div>
          </div>
          <div id="right-one">
            <span>商品属性：</span>
            <div id="box1"  :data="item.style_id"  :key="index" v-for="(item,index) in preList.classify"  @click="Type(item,index)" :class= "isactive === index ? 'addclass' : '' ">{{item.classify}}</div>
          </div>
         
          <div id="right-two">配送至：
          <mark v-for="(item,index) in address" v-if="index<1" :key="index">{{item.province_name}}  {{item.city_name}}  {{item.county_name}}</mark>
          <img src="../../image/address.png" @click="$router.push('/addre')"/>
          </div>
          
          <div id="right-three">
            <mark>配送方式：</mark>
            <div v-for="(item,index) in preList.delivery" @click="Livery(item,index)"  >
              <el-popover
                placement="top"
                width="200"
                trigger="click">
                <p>货品总重：{{weight*productNum}}KG</p>
                <p>运输费用：{{delivery_among?delivery_among:price}}</p>
                <p>{{item.description}}</p>
                <el-button slot="reference" id="box2" :class= "active === index ? 'add' : '' " :data-id="item.id">{{item.name}}</el-button>
              </el-popover>
            </div>
          </div>

          <div id="right-four">运费：<mark>{{delivery_among?delivery_among:price}}</mark></div>
          <div id="right-five">库存：<mark>{{preList.productstock}}</mark></div>
          <div id="right-six">选购数量：<input type="text" v-model="productNum" style="text-align: center"/><span>注：样品采购数量为1，批量采购填写{{preList.min_purchase}}的倍数.</span></div>
          <el-button type="text" @click="addPre()" id="btn1">加入购物车</el-button>
          <el-dialog
            :visible.sync="dialogVisible"
            :modal-append-to-body="false"
            style="text-align: center"
            title="购物车"
            top="300px"
            width="425px">
            <img src="../../image/car.png"/>
            <p id="title1">{{msg}}</p>
            <span slot="footer" class="dialog-footer">
              <div id="but1" type="primary" @click="goCar()">确认</div>
              <div id="but2" @click="$router.push('/')" type="primary">选货</div>
            </span>
          </el-dialog>
        </div>
        <div id="det-bottom">
          <div id="det-top">
            <h4>商品详情</h4>
          </div>
          <div  id="div-img" v-for="(item,index) in preList.detail_info" :key="index">
            <img :src="item| imgUrl" />
          </div>
          <!-- <div v-html=""></div> -->
        </div>
      </div>
      <Aside></Aside>
    </div>
  </div>
</template>
<script>
  import Top from "../index/top"
  import Head from "../index/head"
  import Aside from "../common/aside"
  export default {
    name: "det",
    data(){
      return{
        dialogVisible: false,
        preList:'',
        productNum:'',
        description:'',
        weight:'',
        msg:'',
        code:'',
        carList:[],
        address:[],
        isactive:0,
        active:0,
        type:'',
        livery:'',
        price:'',
        delivery_among:'',
        proimg:'',
        productImg:[],
        enjoyprice:'',
        vipPrice:'',
        timer:null,
      }
    },
    components:{
      Top,
      Head,
      Aside
    },
    methods:{
      //点击小图片换成大图片
      getIndex(imgUrl){
        this.proimg = imgUrl;
      },
      //样式
      Type(item,index){
       this.type=item.style_id;
       this.isactive=index;
      },

      //物流
      Livery(item,index){
       this.livery=item.id;
       this.active=index;
       console.log(this.livery,232323)
       this.getLivery();
      },

      //显示采购商城列表的详情
      getPreById(){
        this.$ajax.get("v2/product/detail",{
          params:{
            goodId:this.$route.query.id
          },
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.preList=data.data;
          this.vipPrice=data.data.vipPrice;
          this.enjoyprice=data.data.enjoyprice;
          this.productNum=data.data.min_purchase;
          this.proimg=data.data.proimg;
          this.productImg=data.data.productImg;
          this.description=data.data.description;
          this.weight=data.data.weight;
        })
      },


      //物流费用
      getLivery(){
        if(this.livery == ''){
            var livery =  $('.add').attr('data-id')
        }else{
            var livery= this.livery;
        }
        this.$ajax.get("v2/product/freight",{
          params:{
            product_id:this.$route.query.id,
            product_num:this.productNum,
            freight_id:livery
          },
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.price=data.data.freightPriceTotal;
          this.delivery_among=data.data.delivery_among;
        })
      },

  


      //采购商城购物车列表
      getCar() {
        this.$ajax.post("/purchase/carList",{},{
          headers: {
            token: localStorage.token
          }})
        .then(data => {
          this.carList=data.data.access_token.data;
        });
      },
      //采购商城加入购物车的判断
      addPre(){
        this.dialogVisible=true;
        var goodIds = this.$route.query.id;
        //这里你先看一下这个v里面都有哪些属性，找到个goodIds对应的属性，这里就是v.属性 === goodIds
        var foodIndex = this.carList.findIndex(v => v.ProId === goodIds);
        if (foodIndex <= -1) {
          if(this.type == ''){
            var type =  $('.addclass').attr('data');
          }else{
            var type= this.type;
          }
          if(this.livery == ''){
            var livery =  $('.add').attr('data-id')
          }else{
            var livery= this.livery;
          }
          this.$ajax.post("v2/cart/add", {
              product_id:this.$route.query.id,
              product_num:this.productNum,
              style_id:type,
              freight_id:livery,
              source:'pc'
            }, {
              headers: {
                'token': localStorage.token
              }
            }).then(data=>{
              this.msg=data.msg;
              this.code=data.error_code;
          })
        }
      },
      //去购物车
      goCar(){
        if(this.code==0){
          this.$router.push('/joincar')
        }else if(this.code==10018){
          this.$router.push('/addre')
        }else{
          this.dialogVisible=false;
        }
      },
      //收货地址
      getaddress(){
        this.$ajax.post("/person/receiveAddrList",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.address=data.data.data;
        })
      },
      //定时器
      setTimer: function(){
　　　　this.timer = setTimeout(() => { 
          this.getLivery();
　　　 }, 1000)},
      menu() {
        window.scrollTo(0,0);
      },
    },

    
    created(){
      this.menu()
    },
    mounted(){
      this.getCar();
      this.getPreById();
      this.getaddress();
      this.setTimer();

      var oBox=document.getElementById('det-left');
      var oSmall=document.getElementById('s-img');
      var oMark=document.getElementById('mark');
      var oFloat=document.getElementById('float');
      var oBig=document.getElementById('b-img');
      var oImg=document.getElementById('imgUrl');
      //给遮罩添加鼠标移入事件
      oMark.onmouseover=function(){
        oFloat.style.display='block';
        oBig.style.display='block';
      }
      //给遮罩添加鼠标移出事件
      oMark.onmouseout=function(){
        oFloat.style.display='none';
        oBig.style.display='none';
      }
      //给遮罩添加鼠标移动事件
      oMark.onmousemove=function(evt){
        evt.evt||window.event;
        //求滑块距离他的父元素的位置
        var left=evt.pageX-oBox.offsetLeft-oFloat.offsetWidth/2;
        var top=evt.pageY-oBox.offsetTop-oFloat.offsetHeight/2;
        //边界
        if(left<=0){
          left=0;
        }else if(left>=oSmall.offsetWidth-oFloat.offsetWidth){
          left=oSmall.offsetWidth-oFloat.offsetWidth;
        }
        if(top<=0){
          top=0;
        }else if(top>=oSmall.offsetHeight-oFloat.offsetHeight){
          top=oSmall.offsetHeight-oFloat.offsetHeight;
        }
        oFloat.style.left=left+'px';
        oFloat.style.top=top+'px';
        //求小图的比例
        var disX=left/(oSmall.offsetWidth-oFloat.offsetWidth);
        var disY=top/(oSmall.offsetHeight-oFloat.offsetHeight);
        //求大图的位置
        oImg.style.left=-disX*(oImg.offsetWidth-oBig.offsetWidth)+'px';
        oImg.style.top=-disY*(oImg.offsetHeight-oBig.offsetHeight)+'px';
      }
    },
  }
</script>

<style scoped>
  .addclass{
    background:rgb(208, 68, 73); 
    color:#fff !important;
    border-color:rgb(208, 68, 73) !important;
  }
  .add{
    background:rgb(208, 68, 73); 
    color:#fff !important;
    border-color:rgb(208, 68, 73) !important;
  }

  #det-warp{width: 100%;}
  #det{
    width: 1010px;
    background: #fff;
    margin: 20px auto;
  }
  #btn{
    width: 60px;
    height: 25px;
    line-height: 23px;
    text-align: center;
    margin: 15px 65px 0 0;
    color: #ff0000;
    font-size: 14px;
    border: 1px solid #ff0000;
    float: right;
    border-radius: 2px;
    cursor: pointer;
  }
  #det-left{
    width: 335px;
    height: 485px;
    position: relative;
    float: left;
    margin: 70px 0 0 20px;
  }
  #det-left #s-img{
    width: 335px;
    height: 360px;
    position: relative;
    border: 1px solid #ccc;
  }
  #s-img #mark{
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    background: red;
    opacity: 0;
    z-index: 1000;
  }
  #s-img #float{
    width: 100px;
    height: 100px;
    border: 1px solid #000;
    background: #A3A3A3;
    opacity: 0.5;
    position: absolute;
    top: 0;
    left: 0;
    display: none;
  }
  #s-img img{width: 100%;height: 100%;}
  #det-left #b-img{
    width: 325px;
    height: 350px;
    position: absolute;
    left: 400px;
    top: 0;
    overflow: hidden;
    border: 1px solid #ccc;
    display: none;
    z-index: 999;
  }
  #b-img #imgUrl{
    position: absolute;
    width:775px;
    height: 760px;
  }
  #det-left #bottom-img{
    height: 100px;
    width: 335px;
    margin-top: 15px;
  }
  #bottom-img img{
    float: left;
    width: 70px;
    height: 70px;
    margin-left: 10px;
    border: 1px solid #ccc;
  }
  #bottom-img img:hover{border: 1px solid red;}
  #det-right{
    width: 570px;
    height: 600px;
    margin: 15px 0 0 30px;
    float: left;
  }
  #det-right h3{
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    color: #313131;
    line-height: 30px;
    margin-top: 15px;
  }
  #det-right #right-deta{width: 100%;height: 90px; margin-top: 20px;}
  #right-deta #deta-one{
    height: 100%;
    width: 355px;
    float: left;
    background: #f5f5f5;
  }
  #deta-one span{display: block;margin: 15px 0 0 15px;}
  #deta-one span:nth-of-type(1){
    font-size: 16px;
    font-weight: bold;
    color: #ff0000;
  }
  #deta-one span:nth-of-type(1) mark{
    font-size: 12px;
    font-weight: bold;
    background: #f5f5f5;
    color: #ff0000;
    margin-left: 5px;
  }
  #deta-one span:nth-of-type(1) a{
    color: #ff0000;
    margin-left: -6px;
    opacity: 0.4;
  }
  #deta-one span:nth-of-type(2){
    font-size: 14px;
    color: #b2b2b2;
    margin-top: 10px;
  }
  #deta-one span:nth-of-type(2) mark{
    font-size: 12px;
    background: #f5f5f5;
    color: #b2b2b2;
    margin-left: 5px;
  }
  #right-deta #deta-two{
    height: 100%;
    width: 215px;
    float: left;
    background:url("../../image/bj2.png") no-repeat;
  }
  #deta-two span{
    font-size: 16px;
    line-height: 95px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    display: block;
  }
  #deta-two span mark{
    font-size: 12px;
    font-weight: bold;
    background: #da574a;
    color: #fff;
    margin-left: 5px;
  }
  #deta-two span a{
    color: #fff;
    margin-left: -4px;
    opacity: 0.4;
  }
  #det-right #right-one{
    width: 100%;
    float: left;
    min-height: 40px;
    line-height: 40px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #right-one span{float: left;}
  #right-one #box1{
    padding: 0 10px;
    box-sizing: border-box;
    height: 25px;
    line-height: 23px;
    margin-left: 15px;
    float: left;
    font-size: 14px;
    margin-top: 10px;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    font-weight: normal;
    border: 1px solid #999;
    color: #666;
  }
  #det-right #right-two{
    width: 100%;
    float: left;
    min-height: 40px;
    line-height: 40px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #right-two mark{color:#959595;background: #fff;}
  #right-two img{float: right;margin: 5px 20px 0 0;cursor: pointer;}
  #det-right #right-three{
    width: 100%;
    float: left;
    min-height: 40px;
    line-height: 40px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
    float: left;
  }
  #right-three mark{float: left;background: #fff;}
  #right-three #box2{
    height: 25px;
    line-height: 25px;
    margin-left: 15px;
    float: left;
    font-size: 14px;
    margin-top: 10px;
    border-radius: 2px;
    text-align: center;
    cursor: pointer;
    font-weight: normal;
    border: 1px solid #999;
    color: #666;
  }
  #det-right #right-four{
    width: 100%;
    float: left;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #right-four mark{color:#959595;background: #fff;}
  #det-right #right-five{
    width: 100%;
    float: left;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #right-five mark{color:#959595;background: #fff;}
  #det-right #right-six{
    width: 100%;
    float: left;
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #right-six input{
    width: 40px;
    height: 20px;
    line-height: 20px;
    border: 1px solid #ff0000;
    outline: none;
  }
  #right-six span{font-size: 12px;color: #ff0000;margin-left: 15px;font-weight: normal;}
  #det-right #btn1{
    width: 115px;
    height: 35px;
    text-align: center;
    border: 0;
    border-radius: 5px;
    margin-top: 10px;
    color: #fff;
    font-size: 14px;
    background: #ff0000;
    cursor: pointer;
  }
  #det-bottom{
    width: 100%;
    min-height: 600px;
    float: left;
    margin: 30px 0 20px 20px;
  }
  #det-bottom #det-top{
    width: 100%;
    height: 30px;
    border-bottom: 1px solid #f6f6f6;
    float: left;
  }
  #det-top h4{
    width: 80px;
    height: 100%;
    line-height: 30px;
    text-align: center;
    font-size: 14px;
    color: #fff;
    font-weight: normal;
    background: #ff0000;
  }
  #det-bottom #div-img{width: 100%;}
  #det-bottom #div-img img{ margin-left: 130px;}


  #but1{
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
    float: left;
    margin-top: -13px;
  }
  #but2{
    width: 120px;
    height: 35px;
    line-height: 35px;
    margin-left: 50px;
    border: 1px solid #999;
    border-radius: 25px;
    color: #999;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    float: left;
    margin-top: -13px;
  }
  
  #title1{
    font-size:14px;
    color: #666;
    margin-top: 25px;
  }


 
</style>
