<template>
  <div>
    <div id="center">
      <div id="center-top">
        <img  :src="centerList.headUrl?centerList.headUrl:require('../../image/bo.png')"/>
        <div class="top-left">
          <strong>{{centerList.nickName}}</strong>
          <p>{{centerList.typeName}}</p>
          <span>有效期至{{time?time.end_time:null}}</span>
          <div @click="$router.push('/renew')" :style="{display:type==4?'none':'block'}">续费</div>
        </div>
        <ul>
          <li><p>商品总数</p><span>{{orderList.product_total_num}}</span></li>
          <li><p>今日订单数</p><span>{{orderList.order_today_num}}</span></li>
          <li><p>今日兑换量</p><span>{{orderList.order_today_exchange}}</span></li>
          <li><p>今日营业额</p><span>{{centerList.priceSum}}</span></li>
        </ul>
        <nav>
          <li><i class="iconfont" @click="$router.push('/pur?id='+2)">&#xe683;</i>待发货<span>{{orderList.order_deliver}}</span></li>
          <li><i class="iconfont" @click="$router.push('/pur?id='+4)">&#xe705;</i>待收货<span>{{orderList.order_receive}}</span></li>
          <li><i class="iconfont" @click="$router.push('/conv')">&#xe656;</i>兑换订单<span>{{orderList.order_exchange_total_num}}</span></li>
          <!-- <li><i class="iconfont">&#xe683;</i>待发货<span>{{orderList.order_deliver}}</span></li>
          <li><i class="iconfont">&#xe705;</i>待收货<span>{{orderList.order_receive}}</span></li>
          <li><i class="iconfont">&#xe656;</i>兑换订单<span>{{orderList.order_exchange_total_num}}</span></li> -->
        </nav>
      </div>

      <div id="right-top">
        <div class="img">
          <div class="img-left" v-for="(item,index) in imgList" v-if="index<2" :key="item.type">
            <p>{{item.name}}二维码</p>
            <img :src="item.img | imgUrl">
            <a href='http://qddapi.lsybk.com/api/v1/vitation/downloadCode?code_type=integral_code_url&token=MTU3ODE5NTkxMbGIfpaG3bmwhtCJqa-GeXE' id="box">点击下载</a>
          </div>
        </div>
      </div>

      <div id="right-bottom">
        <h4><mark></mark>新增会员</h4>
        <p v-for="(item,index) in memberlist" v-if="index<4" :key="item.ID">{{item.Mobile}}<span>{{item.createdtime |data}}</span> </p>
      </div>

      <div id="right-footer">
        <h4><mark></mark>公告</h4>
        <ul>
          <li v-if="index<4" v-for="(item,index) in newsList" :key="item.id">
            <a v-html="item.ArticleTitle" @click="$router.push('/newslist?id='+item.id)"></a>
            <span>{{item.addtime | data}}</span> 
          </li>
        </ul>
      </div>

      <div id="center-bottom">
        <div id="center-left">
          <h4><mark></mark>周销售额统计</h4>
          <div id="LeftChart" :style="{width: '450px', height: '260px'}"></div>
        </div>
        <div id="center-right">
          <h4><mark></mark>会员兑换量</h4>
          <div id="RightChart" :style="{width: '450px', height: '260px'}"></div>
        </div>
      </div>
    </div>
    <el-dialog
      style="text-align: center"
      title="提示"
      :visible.sync="dialogVisible"
      :show-close="false"
      :close-on-click-modal="false"
      top="300px"
      width="420px">
      <span style="margin-top:15px;display:block;">审核未通过，请完善审核资料</span>
      <span slot="footer" class="dialog-footer">
        <div id="bnt3" @click="$router.push('/')">取消</div>
        <div id="bnt2" @click="$router.push('/bas')">完善</div>
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

</template>
<script>
  let echarts = require('echarts/lib/echarts')
  require('echarts/lib/chart/bar')
  require('echarts/lib/component/tooltip')
  require('echarts/lib/component/title')
  export default {
    name: "center",
    data() {
      return {
        dialogVisible:false,
        Sible:false,
        centerList:[],
        time:'',
        orderList:[],
        type: localStorage.type,    
        memberlist:[],
        imgList:[],
        newsList:[],
        value: 0,
        time:'week',
        list1:'',
        list2:'',
        list3:'',
        list4:'',
        list5:'',
        list6:'',
        list7:'',
        list8:'',
        num1:'',
        num2:'',
        num3:'',
        num4:'',
        num5:'',
        num6:'',
        num7:'',
        num8:'',
      }
    },
    methods: {
      //个人中心头像
      getCenter(){
        this.$ajax.post("/Person/userCentre",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.centerList=data.data;
          this.time=data.data.user_renw;
          console.log(this.time,233223)
          if(data.error_code==40015){
            localStorage.clear();
            this.$router.push('/login');
          }
        })
      },



      //订单数据模块
      getOrder(){
        this.$ajax.get("/order/status-num",{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.orderList=data.data;
        })
      },
     


      drawLine() {
        // 基于准备好的dom，初始化echarts实例
        let RightChart = echarts.init(document.getElementById('RightChart'))
        // 绘制图表
        RightChart.setOption({
          title: {},
          tooltip: {},
          xAxis: {
            type: 'category',
            data: [this.list1,this.list2,this.list3,this.list4,this.list5],
          },
          yAxis: [
              {
                  type: 'value',
                  min: 0,
                  max: 100,
                  interval: 20
              }
          ],
          series: [{
            data: [this.num1,this.num2,this.num3,this.num4,this.num5],
            type: 'line'
          }]
        })
      },
      Line(){
        let LeftChart = echarts.init(document.getElementById('LeftChart'))
        LeftChart.setOption({
          title: {},
          tooltip: {},
          xAxis : [
            {
              type:'category',
              data:[this.list1,this.list2,this.list3,this.list4,this.list5]
            }
          ],
          yAxis: [
              {
                  type: 'value',
                  min: 0,
                  max: 100,
                  interval: 20
              }
          ],
          series : [
            {
              type:'bar',
              barWidth: '15%',
              data:[this.num1,this.num2,this.num3,this.num4,this.num5]
            }
          ]
        })
      },
      //周销售额统计
      getMeb(){
        this.$ajax.post("/member/statisticsMember",{
            time:this.time
          },{
          headers:{
            'token' :localStorage.token
          }}).then(data=>{
          this.list1=data.data.data[0].time
          this.list2=data.data.data[1].time
          this.list3=data.data.data[2].time
          this.list4=data.data.data[3].time
          this.list5=data.data.data[4].time
          this.list6=data.data.data[5].time
          this.list7=data.data.data[6].time
          this.list8=data.data.data[7].time

          this.num1=data.data.data[0].num
          this.num2=data.data.data[1].num
          this.num3=data.data.data[2].num
          this.num4=data.data.data[3].num
          this.num5=data.data.data[4].num
          this.num6=data.data.data[5].num
          this.num7=data.data.data[6].num
          this.num8=data.data.data[7].num
          this.drawLine();
          this.Line();
        })
      },
      //获取积分比率
      Rate(){
        this.$ajax.post("/member/integralRateList",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.value=data.data.rate;
        })
      },
      //显示新增会员
      getList(){
        this.$ajax.post("/member/lists",{},
          {headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.memberlist=data.data.data;
        })
      },
       //显示积分商城二维码
      getImg(){
        this.$ajax.get("/vitation/userCodeDetail",{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.imgList=data.data;
        })
      },
      //显示公告列表
      getNews(){
        this.$ajax.get("/system/articleList",{
          params:{
            category_id:23
          }}).then(data=>{
          this.newsList=data.data.data;
        })
      }
    },
    mounted(){
      this.drawLine();
      this.Line();
      this.getMeb();
      this.getCenter();
      this.getList();
      this.getImg();
      this.Rate();
      this.getNews();
      this.getOrder();
      if(localStorage.is_audit==2){
        this.dialogVisible=true;
      };
      if(localStorage.is_audit==0){
        this.Sible=true;
      }
    }
  }
</script>

<style scoped>
  #center{
    width: 100%;
    float: left;
    height: 820px;
    margin-top: 10px;
  }
  #center #center-top{
    width: 740px;
    height: 200px;
    background: #fff;
    float: left;
  }
  #center-top img{
    width: 85px;
    height: 85px;
    float: left;
    margin: 30px 0 0 30px;
    border-radius: 50%;
  }
  #center-top .top-left{
    width: 220px;
    height: 110px;
    float: left;
    margin-top: 30px;
    font-size: 12px;
  }
  .top-left strong{
    font-size: 12px;
    float: left;
    color: #313131;
    height: 18px;
    text-indent: 25px;
    margin-top: 10px;
    font-weight: bold;
  }
  .top-left p{
    width: 80px;
    font-size: 12px;
    float: left;
    height: 18px;
    line-height: 18px;
    text-align: center;
    color: #fff;
    margin-left: 5px;
    margin-top: 10px;
    background: #d5c49c; 
    border-radius: 2px;
  }
  .top-left span{
    font-size: 12px;
    margin-top: 10px;
    float: left;
    text-indent: 25px;
    width: 100%;
    color: #313131;
  }
  .top-left div{
    width: 120px;
    height: 22px;
    line-height: 22px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    background: #ff0000;
    float: left;
    margin: 10px 0 0 25px;
    border-radius: 2px;
    cursor: pointer;
  }
  #center-top ul{
    width: 400px;
    height: 110px;
    float: right;
    margin-top: 30px;
  }
  #center-top ul li{
    width: 70px;
    float: left;
    margin-left: 20px;
    color: #313131;
  }

  #center-top ul li p{
    font-size: 14px;
    width: 100%;
    margin-top: 10px;
    text-align: center;
  }
  #center-top ul li span{
    font-size: 14px;
    width: 100%;
    margin-top: 15px;
    float: left;
    color: #ff0000;
    text-align: center;
  }
  #center-top nav{
    width: 100%;
    float: left;
  }
  #center-top nav li{
    list-style: none;
    width: 110px;
    height: 40px;
    line-height: 40px;
    float: left;
    font-size: 14px;
    margin-left: 100px;
    font-weight: bold;
    color: #313131;
  }
  nav li i{
    float: left;
    width: 30px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background: #e57339;
    margin-top: 5px;
    cursor: pointer;
    margin-right: 10px;
    font-weight: normal;
    font-size: 16px;
    opacity: 0.9;
  }
  nav li i:hover{
    margin-top: -5px;
    transition: 1s;
  }

  nav li span{
    width: 35px;
    margin-left: 5px;
    color: #ff0000;
    font-weight: bold;
  }

  #center #right-top{
    width: 270px;
    height: 200px;
    float: left;
    margin-left: 10px;
    background: #fff;
  }
  #right-top .img{
    width: 100%;
    float: left;
    height: 100%;
  }
  .img .img-left{
    margin: 10px 0 0 20px;
    width: 105px;
    height: 190px;
    float: left;
  }
  .img-left img{margin: 10px 0 0 2px;width: 100px;height: 100px;}
  .img-left p{
    width: 100%;
    font-size: 12px;
    margin-top: 5px;
    text-align: center;
    color: #666;
  }
   .img-left #box{
    width: 85px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    float: left;
    border: 1px solid #e57339;
    text-align: center;
    color: #e57339;
    margin: 10px 0 0 10px;
    border-radius: 2px;
    cursor: pointer;
    border-radius: 25px;
  }

  #center #right-bottom{
    width: 500px;
    height: 185px;
    float: left;
    margin-top: 10px;
    background: #fff;
  }
  #right-bottom h4{
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 10px;
    color: #e57339;
  }
  #right-bottom h4 mark{
    width: 4px;
    height: 18px;
    line-height: 18px;
    background: #e57339;
    float: left;
    margin-top: 2px;
    margin-right: 5px;
    border-radius: 14px;
    margin-left: 15px;
  }

  #right-bottom p{
    width: 100%;
    padding-left:60px;
    font-size: 14px;
    color: #333;
    margin-top: 12px;
  }
  #right-bottom p span{
    font-size: 12px;
    color: #666;
    float: right;
    margin-right: 60px;
  }

  #center #right-footer{
    width: 510px;
    height: 185px;
    float: left;
    margin-top: 10px;
    background: #fff;
    color: #666;
    margin-left: 10px;
  }
  #right-footer h4{
    font-size: 14px;
    margin-top: 15px;
    margin-bottom: 10px;
    color: #e57339;
  }
  #right-footer h4 mark{
    width: 4px;
    height: 18px;
    line-height: 18px;
    background: #e57339;
    float: left;
    margin-top: 2px;
    margin-right: 5px;
    border-radius: 14px;
    margin-left: 15px;
  }

  #right-footer ul{float: left;width: 500px;}
  #right-footer ul li{
    width: 480px;
    margin: 0px auto;
    font-size: 12px;
    height: 30px;
    color: #666;
    border-bottom: 1px dotted #b2b2b2;
    cursor: pointer;
  }
  #right-footer ul li a{
    float: left;
    color: #666;
    width: 280px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  
  #right-footer ul li span{
    float: right;
    color: #666;
    margin-right: 20px;
    line-height: 30px;
  }
  #right-footer ul li:hover a{color:#ff0000;}
  #right-footer ul li a::before{
    content: '热门';
    width: 35px;
    height: 18px;
    line-height: 17px;
    font-size: 12px;
    text-align: center;
    border: 1px solid #ff0000;
    border-radius: 3px;
    display: inline-block;
    margin-right: 10px;
    margin-left: 5px;
    color: #ff0000;
  }
  #right-footer ul li:hover span{color:#ff0000;}


  #center #center-bottom{
    width: 100%px;
    height: 305px;
    margin-top: 5px;
  }
  #center-bottom #center-left{
    width: 500px;
    height: 300px;
    float: left;
    background: #fff;
    margin-top: 10px;
  }
  #center-left h4{
    font-size: 14px;
    margin-top: 15px;
    color: #e57339;
  }
  #center-left h4 mark{
    width: 4px;
    height: 18px;
    line-height: 18px;
    background: #e57339;
    float: left;
    margin-top: 2px;
    margin-right: 5px;
    border-radius: 14px;
    margin-left: 15px;

  }






  #center-bottom #center-right{
    width: 510px;
    height: 300px;
    float: left;
    margin-left: 10px;    
    margin-top: 10px;
    background: #fff;
  }
  #center-right h4{
    font-size: 14px;
    margin-top: 15px;
    color: #e57339;
  }
  #center-right h4 mark{
    width: 4px;
    height: 18px;
    line-height: 18px;
    background: #e57339;
    float: left;
    margin-top: 2px;
    margin-right: 5px;
    border-radius: 14px;
    margin-left: 15px;

  }


  #center-right span:nth-of-type(1){
    float: right;
    font-size: 14px;
    color: #b5b5b5;
    font-weight: bold;
  }
  #center-right span:nth-of-type(2){
    float: right;
    font-size: 14px;
    margin-right: 10px;
    color: #b5b5b5;
    font-weight: bold;
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
   #bnt3{
    width: 120px;
    height: 35px;
    line-height: 35px;
    margin-left: 50px;
    border: 1px solid #666;
    border-radius: 25px;
    color: #666;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    float: left;
    margin-top: -13px;
  }

  
</style>
