<template>
  <div id="eig">
    <div class="top">
     <h4>独孤九剑</h4>
    </div>
    <div id="eig-bottom">
      <div id="eig-img">
        <div id="img">
          <img src="../../image/eig1.png"/>
        </div>
        <div id="img">
          <img src="../../image/eig2.png"/>
        </div>
        <div id="img">
          <img src="../../image/eig3.png"/>
        </div>
        <div id="img">
          <img src="../../image/eig4.png"/>
        </div>
        <div id="img">
          <img src="../../image/eig5.png"/>
        </div>
        <div id="img">
          <img src="../../image/eig6.png"/>
        </div>
        <div id="img">
          <img src="../../image/eig7.png"/>
        </div>
        <div id="img">
          <img src="../../image/eig8.png"/>
        </div>
        <div id="img">
          <img src="../../image/eig9.png"/>
        </div>
      </div>


      <div id="eig-center">
        <div id="eig-box"> <span>加入企铛铛，营销很轻松</span></div>
        <p>企铛铛深入市场调研，剖析经济形势，提前捕捉市场机会，把握未来营销动态。深耕6年，有着超前的商业模式 经过全国10万家企业合作，服务过40多个行业，丰富的营销实战落地经验总结出切实可行的十八种营销制胜的方案 。以受众思维打造立体化传播渠道，通过零成本营销思维让顾客蜂拥而至。</p>
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
    export default {
      name: "eig",
      data(){
        return{
          Sible:false,
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
      },
      mounted(){
        this.getCenter();
        if(localStorage.is_audit==0){
          this.Sible=true;
        };
      }
    }
</script>

<style scoped>
  #eig{
    width: 1020px;
    min-height: 800px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .top{height: 50px;background: #fff;margin-bottom: 10px}
  .top h4{
    font-size: 14px;
    line-height: 50px;
    float: left;
    font-weight: bold;
    color: #313131;
    margin-left: 15px;
  }
  #eig-bottom{
    width: 100%;
    height: 480px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  
  #eig-bottom #eig-center{
    width: 870px;
    height: 145px;
    margin: 40px auto 0 auto;
    border: 1px solid #edbc66;
    background: #fff;
  }

  #eig-center #eig-box{
    width: 340px;
    height: 40px;
    background: #fff;
    margin: -15px auto;
  }
  #eig-box span{
    display: block;
    width: 300px;
    height: 30px;
    border-radius: 15px;
    margin: 0 auto;
    text-align: center;
    line-height: 30px;
    color: #fff;
    font-size: 14px;
    background: #edbc66;
  }
  #eig-center p{
    width: 800px;
    font-size: 14px;
    margin: 35px auto 0 auto;
    line-height: 20px;
    color: #666;
    letter-spacing: 2px;
  }
 



  #eig-bottom #eig-img{width: 100%; height: 350px;}
  #eig-img #img{
    float: left;
    margin-top: 35px;
    margin-left: 90px;

  }
  #img img{
    margin-top: 35px;
    width: 91px;
    height: 92px;
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
