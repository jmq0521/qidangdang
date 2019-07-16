<template>
    <div id="dep">
      <h4>续费明细</h4>
      <div id="dep-table">
        <el-table style="width: 1000px;margin: 0 auto;"  :data="deplist">
          <el-table-column prop="id" label="序号"></el-table-column>
          <el-table-column label="操作日志" width="500px">
            <template slot-scope="scope">
              <span style="width: 500px;">{{scope.row.remark}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="created_time" label="操作时间"></el-table-column>
        </el-table>
        <el-pagination
          style="margin-top: 10px; float: right; margin-right: 5px;margin-bottom: 20px"
          background layout="prev, pager, next"
          :page-count="total"
          @current-change="getdepList">
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
      name: "dep",
      data(){
          return{
            Sible:false,
            deplist:[],
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
        //显示财务明细列表
        getdepList(page){
          this.$ajax.get("/person/user-award-log",{
            params:{
              page
            },
            headers: {
            'token' :localStorage.token
          }}).then(data=>{
            this.deplist=data.data.data;
            this.total=data.data.last_page;
          })
        },
      },
      mounted(){
        this.getCenter();
        this.getdepList();
        if(localStorage.is_audit==0){
          this.Sible=true;
        };
      }
    }
</script>

<style scoped>
  #dep{
    width: 1020px;
    margin-top: 10px;
  }
  #dep h4{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-indent: 15px;
    background: #fff;
    color: #313131;
  }
  #dep #dep-table{
    width: 1020px;
    min-height: 780px;
    background: #fff;
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

