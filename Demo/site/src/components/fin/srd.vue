<template>
    <div id="srd">
      <h4>续费明细</h4>
      <div id="srd-table">
        <el-table style="width: 1000px;margin: 0 auto;"  :data="srdlist">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column prop="type_name" label="类型"></el-table-column>
          <el-table-column prop="valid_time_name" label="开通时长"></el-table-column>
          <el-table-column prop="created_time" label="操作时间"></el-table-column>
          <el-table-column prop="money_renew" label="金额(元)"></el-table-column>
          <el-table-column prop="status_name" label="状态"></el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
          background layout="prev, pager, next"
          :page-count="total"
          @current-change="getSrd">
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
      name: "srd",
      data(){
          return{
            Sible:false,
            srdlist:[],
            page: 1,
            total: 1,
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
        //显示商家续费列表
        getSrd(){
          this.$ajax.post("/finance/renewList",{},{
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              'token' :localStorage.token
            }}).then(data=>{
            this.srdlist=data.data.data;
          })
        }
      },
      mounted(){
        this.getCenter();
        this.getSrd();
        if(localStorage.is_audit==0){
          this.Sible=true;
        };
      }
    }
</script>

<style scoped>
  #srd{
    width: 1020px;
    margin-top: 10px;
  }
  #srd h4{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-indent: 15px;
    background: #fff;
    color: #313131;
  }
  #srd #srd-table{
    width: 1020px;
    min-height: 780px;
    background: #ffffff;
    margin-top: 10px;
    float: left;
    padding-top: 10px;
    box-sizing: border-box;
    margin-bottom: 20px;
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

