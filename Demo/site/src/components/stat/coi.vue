<template>
  <div id="memb">
    <div class="top">
      <h4>兑换券统计</h4>
    </div>
    <div class="center">
      <div id=center-top>
          <span>统计方式按</span>
          <select id="s1">
              <option value="week">周</option>
              <option value="month">月</option>
              <option value="year">年</option>
          </select>
          <div id="btn" @click="getCoi()">查询</div>
      </div>
      <div id="center-one">
          <h4>储蓄统计</h4>
          <ul id="center-ul">
              <li>发放兑换券：<mark>{{recharge}}</mark></li>
              <li>消耗兑换券：<mark>{{consume}}</mark></li>
              <li>累计发放兑换券：<mark>{{recharge}}</mark></li>
              <li>累计消耗兑换券：<mark>{{consume}}</mark></li>
          </ul>
      </div>
      <div id="center-left">
        <div id="LeftChart" :style="{width: '950px', height: '380px'}"></div>
      </div>
    </div>
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
    name: "memb",
    data(){
      return{
        Sible:false,
        recharge:'',
        consume:'',
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
        Num1:'',
        Num2:'',
        Num3:'',
        Num4:'',
        Num5:'',
        Num6:'',
        Num7:'',
        Num8:'',
      }
    },
    methods:{
      Line(){
        let LeftChart = echarts.init(document.getElementById('LeftChart'))
        LeftChart.setOption({
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
            },
            legend: {
              data:['发放的','消耗的']
            },
            xAxis: [
              {
                type: 'category',
                data: [this.list1,this.list2,this.list3,this.list4,this.list5,this.list6,this.list7,this.list8],
                axisPointer: {
                    type: 'shadow'
                }
              }
            ],
            yAxis: [
              {
                type: 'value',
                min: 0,
                max: 20000000000,
                interval: 2500000000
              }
            ],
            series: [
              {
                name:'发放的',
                type:'bar',
                data:[this.num1,this.num2,this.num3,this.num4,this.num5,this.num6,this.num7,this.num8]
              },
              {
                name:'消耗的',
                type:'bar',
                data:[this.Num1,this.Num2,this.Num3,this.Num4,this.Num5,this.Num6,this.Num7,this.Num8]
              },
            ]
        })
      },
        //兑换券统计
      getCoi(){
        var select = document.getElementById("s1");
        let options = select.options;
        let index = select.selectedIndex;
        this.$ajax.post("/member/statisticsIntegral",{
            time:options[index].value
        },{
          headers:{
            'token' :localStorage.token
          }}).then(data=>{
          this.list1=data.data.data.recharge[0].time;
          this.list2=data.data.data.recharge[1].time
          this.list3=data.data.data.recharge[2].time
          this.list4=data.data.data.recharge[3].time
          this.list5=data.data.data.recharge[4].time
          this.list6=data.data.data.recharge[5].time
          this.list7=data.data.data.recharge[6].time
          this.list8=data.data.data.recharge[7].time
          this.num1=data.data.data.recharge[0].num;
          this.num2=data.data.data.recharge[1].num
          this.num3=data.data.data.recharge[2].num
          this.num4=data.data.data.recharge[3].num
          this.num5=data.data.data.recharge[4].num
          this.num6=data.data.data.recharge[5].num
          this.num7=data.data.data.recharge[6].num
          this.num8=data.data.data.recharge[7].num
          this.Num1=data.data.data.consume[0].num;
          this.Num2=data.data.data.consume[1].num
          this.Num3=data.data.data.consume[2].num
          this.Num4=data.data.data.consume[3].num
          this.Num5=data.data.data.consume[4].num
          this.Num6=data.data.data.consume[5].num
          this.Num7=data.data.data.consume[6].num
          this.Num8=data.data.data.consume[7].num
          this.recharge=data.data.total.recharge;
          this.consume=data.data.total.consume;
          this.Line();
        })
      },
       //判断登录
      getCenter(){
        this.$ajax.post("/Person/userCentre",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          if(data.error_code==40015){
            localStorage.clear();
            this.$router.push('/login');
          }
        })
      },
    },
    mounted() {
      this.getCenter();
      this.Line();
      this.getCoi();
      if(localStorage.is_audit==0){
        this.Sible=true;
      };
    }
  }
</script>

<style scoped>
  #memb{
    width: 1020px;
    min-height: 600px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  #memb .top{height: 50px;background: #ffffff;}
  .top h4{
    text-indent: 15px;
    font-size: 14px;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  #memb .center{
    width: 100%;
    height: 740px;
    background: #ffffff;
    margin-top: 10px;
    margin-bottom: 20px;
    float: left;
  }
  #center-top{
    width: 1000px;
    height: 50px;
    margin: 10px auto;
    background: #f6f6f6;
  }
  #center-top span{
    display: inline-block;
    font-size: 14px;
    line-height: 50px;
    margin-left: 10px;
    color: #313131;
  }
  #center-top #s1{
    width: 100px;
    height: 25px;
    line-height: 25px;
    display: inline-block;
    border: 1px solid #d2d2d2;
    font-size: 12px;
    color: #7d7d7d;
    margin-left: 10px;
    outline: none;
  }
  #center-top #btn{
    width: 50px;
    height: 22px;
    text-align: center;
    line-height: 20px;
    display: inline-block;
    border: 1px solid #ff0000;
    font-size: 12px;
    color: #ff0000;
    margin-left: 10px;
    border-radius: 2px;
    cursor: pointer;
  }
  #center-one{
    width: 1000px;
    height: 100px;
    margin: 10px auto;
    border: 1px solid #f6f6f6;
  }
  #center-one h4{
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    text-indent: 10px;
    font-weight: normal;
    background: #f6f6f6;
  }
  #center-one #center-ul{
    width: 100%;
    height: 70px;
    line-height: 70px;
  }
  #center-ul li{
    min-width: 150px;
    height: 70px;
    text-align: center;
    float: left;
    font-size: 14px;
    margin-left: 35px;
  }
  #center-ul li mark{
    background: #fff;
    color: #ff5b00;
  }
  #center-left{
    width: 600px;
    height: 350px;
    background: #fff;
    margin: 10px 0 0 40px;
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
</style>
