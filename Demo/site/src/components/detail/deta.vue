<template>
  <div id="deta">
    <div id="btn" @click="$router.go(-1)">返回</div>
    <div id="deta-left">
      <div id="s-img">
        <span id="mark"></span>
        <span id="float"></span>
        <img :src="proimg | imgUrl"/>
      </div>
      <div id="b-img">
        <img id="imgUrl" :src="proimg | imgUrl" />
      </div>
      <div id="bottom-img">
        <img v-for="(item,index) in productImg" :src="item | imgUrl" v-if="index<4" @click="getIndex(item)"/>
      </div>
    </div>
    <div id="deta-right">
      <h3>{{preList.proName}}</h3>
      <div id="right-det">
        <div id="det-one">
          <span>
            标准兑换：{{vipPrice.substr(0,vipPrice.length-1)}}
            <a>{{vipPrice.substring(vipPrice.length-1)}}</a>
            <mark>兑换券</mark>
          </span>
          <span>零售价：<mark>￥{{preList.marketprice}}</mark></span>
        </div>
        <div id="det-two">
          <span>
            至尊兑换：{{enjoyprice.substr(0,enjoyprice.length-1)}}
            <a>{{enjoyprice.substring(enjoyprice.length-1)}}</a>
            <mark>兑换券</mark>
          </span>
        </div>
      </div>
      <!-- <div id="right-one" >
        <span>规格：</span>
        <div id="box1"v-for="(item,index) in preList.productStyle" v-if="index<4">{{item.stylename}}</div>
      </div> -->
      <div id="right-two" v-for="(item,index) in address" :key="index" v-if="index<1">配送至：
        <mark>{{item.province_name}}  {{item.city_name}}  {{item.county_name}}</mark>
        <img src="../../image/address.png" @click="$router.push('/addre')"/>
      </div>
      <div id="right-three">
        <span>运输方式：</span>
        <div id="box2"  v-for="(item,index) in preList.delivery"  :key="index" v-if="index<4" @click="Livery(item,index)" :class= "active === index ? 'addclass' : '' ">{{item.name}}</div>
      </div>
      <div id="right-four">运输费用：<mark>{{price}}</mark></div>
      <div id="right-five">库存：<mark>{{preList.productstock}}</mark></div>
      <el-button type="text" @click="addPre(1)" id="btn1">提交预售区</el-button>
       <el-dialog
        :visible.sync="dialogVisible"
        :modal-append-to-body="false"
        style="text-align: center"
        title="预售区"
        :show-close="false"
        top="300px"
        width="425px">
        <img src="../../image/car.png" style="margin-top:10px;"/>
        <p id="title1">{{msg}}</p>
        <span slot="footer" class="dialog-footer">
          <div id="but1" @click="goCar()">确认</div>
          <div id="but2" @click="dialogVisible=false">取消</div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
    export default {
      name: "deta",
      data(){
        return{
          dialogVisible: false,
          preList:'',
          address:[],
          active:-1,
          price:'',
          livery:'',
          msg:'',
          productImg:[],
          proimg:'',
          enjoyprice:'',
          vipPrice:''
        }
      },
      methods:{
         //点击小图片换成大图片
        getIndex(imgUrl){
          this.proimg = imgUrl;
        },
        //物流
        Livery(item,index){
          this.price=item.price;
          this.livery=item.id;
          console.log(this.livery,index);
          this.active=index;
        },
        //显示预售区列表的详情
        getPreById(){
          this.$ajax.get("/person/preselGoodDetail",{
            params:{
              goodId:this.$route.query.id
            },
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              this.preList=data.data;
              this.proimg=data.data.proimg;
              this.vipPrice=data.data.vipPrice;
              this.enjoyprice=data.data.enjoyprice;
              this.productImg=data.data.productImg;
              this.price=data.data.delivery[0].price;
          })
        },
        //加入预售区的判断
        addPre(type){
          this.dialogVisible=true;
          this.$ajax.post("/person/selectPreSell", {
            goodIds:this.$route.query.id,
            type,
          }, {
            headers: {
              'token': localStorage.token
            }
          }).then(data=>{
            this.msg=data.msg;
            this.code=data.error_code;
            if(data.msg=="操作失败"){
              this.msg="该商品已加入预售区"
            }
          });
        },

        //去预售区
        goCar(){
          console.log(this.code,10101)
          if(this.code==0){
            this.$router.push('/sea')
          }else if(this.code==10037){
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
        }
      },
      mounted(){
        this.getPreById();
        this.getaddress();
        var oBox=document.getElementById('deta-left');
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
      }
    }
</script>

<style scoped>
 .addclass{
    background:rgb(208, 68, 73); 
    color:#fff !important;
    border-color:rgb(208, 68, 73) !important;
  }
  #deta{
    width: 1010px;
    height: 800px;
    margin-bottom: 20px;
    margin-top: 10px;
    background: #fff;
  }
  #btn{
    width: 65px;
    height: 25px;
    line-height: 23px;
    text-align: center;
    margin: 15px 65px 0 0;
    border: 0;
    color: #ff0000;
    font-size: 14px;
    border: 1px solid #ff0000;
    float: right;
    cursor: pointer;
    border-radius: 2px;
  }
  #deta-left{
    width: 335px;
    height: 485px;
    float: left;
    margin: 65px 0 0 20px;
    position: relative;
  }
  #deta-left #s-img{
    width: 335px;
    height: 360px;
    position: relative;
    overflow: hidden;
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
  #deta-left #b-img{
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
  #deta-left #bottom-img{
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
  #deta-right{
    width: 570px;
    height: 480px;
    margin: 28px 0 0 30px;
    float: left;
  }
  #deta-right h3{
    width: 100%;
    font-size: 18px;
    font-weight: bold;
    color: #313131;
    line-height: 30px;
  }
  #deta-right #right-det{width: 100%;height: 90px; margin-top: 20px;}
  #right-det #det-one{
    height: 100%;
    width: 355px;
    float: left;
    background: #f5f5f5;
  }
  #det-one span{display: block;margin: 15px 0 0 15px;}
  #det-one span:nth-of-type(1){
    font-size: 16px;
    font-weight: bold;
    color: #ff0000;
  }
  #det-one span:nth-of-type(1) a{
    color: #ff0000;
    margin-left: -4px;
    opacity: 0.4;
  }
  #det-one span:nth-of-type(1) mark{
    font-size: 12px;
    font-weight: bold;
    background: #f5f5f5;
    color: #ff0000;
    margin-left: 5px;
  }
  #det-one span:nth-of-type(2){
    font-size: 14px;
    color: #b2b2b2;
    margin-top: 10px;
  }
  #det-one span:nth-of-type(2) mark{
    font-size: 12px;
    background: #f5f5f5;
    color: #b2b2b2;
    margin-left: 5px;
  }
  #right-det #det-two{
    height: 100%;
    width: 215px;
    float: left;
    background:url("../../image/bj2.png") no-repeat;
  }
  #det-two span{
    font-size: 16px;
    line-height: 95px;
    font-weight: bold;
    color: #fff;
    text-align: center;
    display: block;
  }
  #det-two span a{
    color: #fff;
    margin-left: -4px;
    opacity: 0.4;
  }
  #det-two span mark{
    font-size: 12px;
    font-weight: bold;
    background: #da574a;
    color: #fff;
    margin-left: 5px;
  }
  #deta-right #right-one{
    height: 30px;
    line-height: 30px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #right-one #box1{
    min-width: 65px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin: 5px 0 0 10px ;
    border: 0;
    color: #313131;
    font-size: 14px;
    display: inline-block;
    cursor: pointer;
    font-weight: normal;
    background: #f5f5f5;
  }
  #deta-right #right-two{
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #right-two mark{color:#959595;background: #fff;}
  #right-two img{float: right;margin: 5px 20px 0 0;cursor: pointer;}
  #deta-right #right-three{
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #right-three span{float: left;}
  #right-three #box2{
    padding: 0 5px;
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
  #deta-right #right-four{
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #right-four mark{color:#959595;background: #fff;}
  #deta-right #right-five{
    height: 40px;
    line-height: 40px;
    margin-top: 10px;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #right-five mark{color:#959595;background: #fff;}
  #deta-right #btn1{
    width: 115px;
    height: 35px;
    text-align: center;
    border: 0;
    border-radius: 5px;
    color: #fff;
    font-size: 14px;
    background: #ff0000;
    cursor: pointer;
    margin-top: 20px;
  }

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
