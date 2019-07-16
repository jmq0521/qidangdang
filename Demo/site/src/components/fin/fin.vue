<template>
  <div id="fin">
    <h4>提现明细</h4>
    <div id="fin-center">
      <div class="center-one">
        <span>可提现余额：￥<mark>{{price}}</mark>元</span>
        <div id="btn1" @click="$router.push('/deposit')">提现</div>
      </div>
    </div>
    <div id="fin-bottom">
      <div class="toolbar">
        <input type="text" placeholder="单号" v-model="orderId"/>
        <span>操作时间</span>
        <el-date-picker
          style="float: left"
          v-model="startTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <el-date-picker
          style="float: left;margin-left:10px;color:#313131"
          v-model="endTime"
          type="datetime"
          placeholder="选择日期时间">
        </el-date-picker>
        <select id="s1">
          <option value="0">全部</option>
          <option value="1">充值</option>
          <option value="2">会员积分订单</option>
          <option value="3">商家购买</option>
          <option value="4">商家提现</option>
        </select>
        <div id="btn3" @click="getFinList()">查询</div>
      </div>
      <el-table style="width: 1000px;margin: 0 auto;" :data="finlist">
        <el-table-column prop="order_id" label="单号"></el-table-column>
        <el-table-column prop="type" label="订单类型"></el-table-column>
        <el-table-column prop="createdtime" label="操作时间"></el-table-column>
        <el-table-column label="操作日志" width="300px">
          <template slot-scope="scope">
            <span style="width: 300px;">{{scope.row.remark}}</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
        background layout="prev, pager, next"
        :page-count="total"
        @current-change="getFinList">
      </el-pagination>
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
    export default {
      name: "fin",
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
          startTime: '',
          endTime: '',
          finlist:[],
          orderId:'',
          page: 1,
          total: 1,
          price:''
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
        //显示财务明细列表
        getFinList(page){
          var select = document.getElementById("s1");
          let options = select.options;
          let index = select.selectedIndex;
          this.$ajax.post("/finance/financeDetails",{
            page,
            orderId:this.orderId,
            startTime:this.startTime,
            endTime:this.endTime,
            type:options[index].value
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.finlist=data.data.data;
            this.total=data.data.last_page
          })
        },
        //显示可提现余额
        Deposit(){
          this.$ajax.post("/person/userDeposit",{},{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.price=data.data.depositTotal;
          })
        }
      },
      mounted(){
        this.getCenter();
        this.getFinList(this.page);
        this.Deposit();
        if(localStorage.is_audit==0){
          this.Sible=true;
        };
      }
    }
</script>

<style scoped>
  #fin{
    width: 1020px;
    margin-top: 10px;
  }
  #fin h4{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-indent: 15px;
    background: #fff;
    color: #313131;
  }
  #fin #fin-center{
    height: 55px;
    background: #fff;
    margin-top: 10px;
  }
  #fin-center .center-one{
    width: 100%;
    height: 55px;
    float: left;
  }
  .center-one span{
    font-size: 12px;
    height: 55px;
    line-height: 55px;
    margin-left: 15px;
    float: left;
  }
  .center-one span mark{
    background: #fff;
    color: #ff0000;
  }
  .center-one #btn1{
    width: 65px;
    height: 25px;
    line-height: 25px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    margin-top: 15px;
    margin-left: 20px;
    float: left;
    border: 0;
    background: #ff0000;
    cursor: pointer;
  }
 
  #fin #fin-bottom{
    width: 1020px;
    min-height: 780px;
    background: #fff;
    margin-top: 10px;
    margin-bottom: 20px;
    float: left;
  }
  #fin-bottom .toolbar{
    width: 1000px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
  }
  .toolbar input{
    width: 150px;
    height: 22px;
    margin-left: 5px;
    font-size: 12px;
    color: #313131;
    border: 0;
    float: left;
    margin-top: 20px;
    border: 1px solid #d2d2d2;
    text-indent: 10px;
    outline: none;
  }
  .toolbar span{
    float: left;
    height: 60px;
    margin-left: 15px;
    line-height: 60px;
    font-size: 12px;
    color: #313131;
  }

  .toolbar select{
    width: 110px;
    height: 25px;
    margin-left: 20px;
    font-size: 12px;
    color: #313131;
    border: 0;
    float: left;
    margin-top: 20px;
    border: 1px solid #d2d2d2;
    outline: none;
  }
  .toolbar #btn3{
    width: 65px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    color: #fff;
    text-align: center;
    margin-top: 20px;
    margin-left: 10px;
    float: left;
    border: 0;
    background: #ff0000;
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
</style>

