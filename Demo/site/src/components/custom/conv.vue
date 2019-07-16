<template>
  <div id="conv">
    <div class="top">
      <h4>兑换订单</h4>
    </div>
    <div id="conv-bottom">
      <div id="conv-form">
        <span>收货人电话</span><input type="text" v-model="user_tel">
        <span>操作时间</span>
        <el-date-picker
          v-model="start_time"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-date-picker
          v-model="end_time"
          style="margin-left:5px;margin-right:5px"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <span>订单状态</span>
        <select id="s1">
          <option>全部</option>
          <option value="1">待付款</option>
          <option value="2">待发货</option>
          <option value="3">配送中</option>
          <option value="4">已发货</option>
          <option value="8">已收货</option>
        </select>
        <div id="btn" @click="getInte()">查询</div>
      </div>
      <div style="min-height:800px;">
        <el-table style="width: 1000px;margin: 0 auto;" :data="integralList">
          <el-table-column label="商品名称" width="300px">
            <template slot-scope="scope">
              <img :src="scope.row.detail[0].img | imgUrl" width="50px" height="50px" style="float:left;margin: 15px 0 0 10px"/>
              <span style="text-align:left;width:200px;height:80px;margin: 10px 0 0 5px;display: inline-block;">{{scope.row.detail[0].proName}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="detail[0].onceIntegralCost" label="单价"></el-table-column>
          <el-table-column prop="detail[0].proNum" label="数量"></el-table-column>
          <el-table-column prop="detail[0].consumeIntegral" label="实付款"></el-table-column>
          <el-table-column label="收货人信息" width="220px">
            <template slot-scope="scope">
              <span style="display:block">收货人：{{scope.row.ReceiveName}}</span>
              <span style="display:block">电话：{{scope.row.UserTel}}</span>
              <span style="display:block">地址：{{scope.row.City}}&nbsp;{{scope.row.County}}&nbsp;{{scope.row.Address}}</span>
            </template>
          </el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">{{scope.row.statusName}}<br><span id="td-span" @click="$router.push('/det?id='+scope.row.OuterOrderId)">查看详情</span></template>
          </el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
          background layout="prev, pager, next"
          :page-count="total"
          @current-change="getInte">
        </el-pagination>
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
  </div>

</template>

<script>
    export default {
      name: "conv",
      data() {
        return {
          Sible:false,
          pickerOptions1: {
            shortcuts: [{
              text: '今天',
              onClick(picker) {
                picker.$emit('pick', new Date());
              }
            }, {
              text: '昨天',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24);
                picker.$emit('pick', date);
              }
            }, {
              text: '一周前',
              onClick(picker) {
                const date = new Date();
                date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                picker.$emit('pick', date);
              }
            }]
          },
          start_time: '',
          end_time: '',
          integralList:[],
          product_name:'',
          user_tel:'',
          page: 1,
          total: 1
        };
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
        //显示兑换订单列表
        getInte(page){
          var select = document.getElementById("s1");
          let options = select.options;
          let index = select.selectedIndex;
          this.$ajax.get("/person/integralOrderList",{
            params:{
              page,
              user_tel:this.user_tel,
              start_time:this.start_time,
              end_time:this.end_time,
              status:options[index].value
            },
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.integralList=data.data.data;
            this.total=data.data.last_page
          })
        },
      },
      mounted(){
        this.getCenter();
        this.getInte(this.page);
        if(localStorage.is_audit==0){
          this.Sible=true;
        };
      }
    }
</script>

<style scoped>
  #conv{
    width: 1020px;
    height: 600px;
    margin-bottom: 20px;
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
  #conv #conv-bottom{
    width: 100%;
    min-height: 540px;
    margin-top: 10px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  #conv-bottom #conv-form{
    width: 1000px;
    height: 65px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
    font-size: 12px;
    color: #313131;
  }
  #conv-form span{ margin-left:10px;}
  #conv-form input{
    width: 100px;
    height: 25px;
    line-height: 25px;
    margin: 20px 0 0 5px;
    border: 0;
    font-size: 12px;
    border: 1px solid #e5e5e5;
    outline: none;
  }
  #conv-form select{
    width: 115px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    display: inline-block;
    margin: 20px 0 10px 10px;
    color: #626262;
    border: 0;
    border: 1px solid #e5e5e5;
    background: #fff;
    outline: none;
  }
  #conv-form #btn{
    width: 65px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    text-align: center;
    display: inline-block;
    margin: 20px 0 0 10px;
    border: 0;
    color: #fff;
    background: #ff0000;
    border-radius: 2px;
    cursor: pointer;
  }
  #td-span{cursor: pointer;color: #19acf7}

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

