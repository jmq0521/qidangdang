<template>
  <div id="aside">
    <div id="aside-two">
      <a id="span" href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=3617715353&website=www.oicqzone.com">在线咨询</a>
    </div>
    <div id="aside-two">
      <i class="iconfont" @click="car()">&#xe73d;</i>
    </div>
    <div id="aside-three">
      <i class="iconfont">&#xe731;</i>
      <div id="cust">
        <p><mark>服务电话：</mark>400-630-5899</p>
        <p><mark>工作时间：</mark>09：00-18:00</p>
        <div id="cust-top"></div>
      </div>
    </div>
    <div id="aside-four">
      <i class="iconfont">&#xe633;</i>
    </div>
    <div id="aside-five">
      <i class="iconfont">&#xe630;</i>
      <div id="app">
        <img src="../../image/app.png" class="img"/>
        <p>下载APP</p>
        <div id="app-top"></div>
      </div>
    </div>
    <div id="aside-six" @click="getCenter()">
      <span>意见反馈</span>
    </div>

    <el-dialog
      :visible.sync="Visible"
      :modal-append-to-body="false"
      :close-on-click-modal="false"
      style="text-align: center"
      title="意见反馈"
      :show-close="false"
      top="300px"
      width="715px">
      <p id="title">请在此提出您的宝贵意见：</p>
      <textarea v-model="value" id="area" placeholder='(⊙o⊙)请详细描述您遇到的问题，有助于我们快速定位并解决处理，或留下您的宝贝意见或建议，我们会认真进行评估！'></textarea>
      <span slot="footer" class="dialog-footer">
        <div id="btn1" type="primary" @click="getIdea()">提交</div>
        <div id="btn2" @click="Visible=false" type="primary">取消</div>
      </span>
    </el-dialog>

    <el-dialog
      :visible.sync="dialog"
      style="text-align: center"
      title="提示"
      :show-close="false"
      :close-on-click-modal="false"
      :modal-append-to-body="false"
      top="300px"
      width="300px">
      <p  id="title2">{{msg}}</p>
      <div id="btn"  @click="dialog=false">确认</div>
     </el-dialog>
  </div>

</template>

<script>
  export default {
    name: "vit",
    data() {
      return {
       Visible:false,
       dialog:false,
       value:'',
       msg:''
      }
    },
    methods:{
      //我的购物车
      car(){
        if(localStorage.phone === "" || localStorage.phone === undefined){
          this.$router.push('/login');
        }else{
          this.$router.push('/joincar');
        }
      },
      //意见反馈
      getIdea(){
        this.$ajax.get("/system/suggest-info",{
          params:{
            content:this.value,
          },
          headers: {
              'token' :localStorage.token
          }}).then(data=>{
          this.Visible=false;
          this.dialog=true;
          this.msg=data.msg;
        })
      },

      //判断登录
      getCenter(){
        this.$ajax.post("/Person/userCentre",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.Visible=true;
          if(data.error_code==40015){
            localStorage.clear();
            this.$router.push('/login');
          }
        })
      }
    },
    mounted(){
      $("#aside-four").click(function() {
        $("body,html").animate({
          scrollTop: 0
        }, "fast");
      });
     
    }
  }
</script>

<style scoped>
  #aside{
    width: 40px;
    height: 250px;
    position: fixed;
    top: 400px;
    right: 20px;
    box-shadow: 0px 1px 4px 2px rgba(0,0,0,.15);
    background: #fff;
  }
  #aside #aside-two{
    width: 100%;
    height: 35px;
    float: left;
    cursor: pointer;
    margin-top: 10px;
  }
  #aside-two .iconfont{
   display: block;
   line-height: 35px;
   width: 100%;
   text-align: center;
   color: #bfbfbf;
   font-size:20px;
  }
  #aside-two #span{
    display: block;
    width: 30px;
    margin-left:8px;
    color: #666;
  }

  #aside #aside-three{
    width: 100%;
    height: 35px;
    float: left;
    cursor: pointer;
  }
  #aside-three .iconfont{
   display: block;
   line-height: 35px;
   width: 100%;
   text-align: center;
   color: #bfbfbf;
   font-size:20px;
  }
  #aside-three #cust{
    position: absolute;
    top: 50px;
    right: 40px;
    width: 200px;
    height: 75px;
    border: 1px solid #eee;
    border-right: 0;
    background: #fff;
    display: none;
    z-index: 999;
    border-radius: 5px;
  }
  #aside-three #cust p{
    width: 100%;
    margin-top: 10px;
    font-size: 12px;
    color: #666;
  }
  #aside-three #cust p mark{
    width: 70px;
    display: inline-block;
    margin-right: 10px;
    margin-left: 15px;
    text-align: left;
    background: #fff;
    color: #333;
    font-size: 14px;
  }
  #aside-three #cust #cust-top{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 200px;
    top: -15px;
    border-style: solid;
    border-color: #fff #fff #fff #eee;
  }
  #aside-three:hover #cust{display: block;}

  #aside #aside-four{
    width: 100%;
    height: 35px;
    float: left;
    cursor: pointer;
  }
  #aside-four .iconfont{
   display: block;
   line-height: 35px;
   width: 100%;
   text-align: center;
   color: #bfbfbf;
   font-size:20px;
  }


  #aside #aside-five{
    width: 100%;
    height: 35px;
    float: left;
    cursor: pointer;
    background: #e57339;
    position: relative;
  }
  #aside-five .iconfont{
   display: block;
   line-height: 35px;
   width: 100%;
   text-align: center;
   color: #bfbfbf;
   font-size:20px;
  }
  #aside-five #app{
    width: 80px;
    height: 95px;
    border: 1px solid #eee;
    border-right: 0;
    position: absolute;
    top: -60px;
    left: -80px;
    display: none;
    background: #fff;
    border-radius: 5px;
  }
  #aside-five #app img{
    width: 50px;
    height: 50px;
    margin-top: 15px;
    margin-left: 15px;
  }
   #aside-five #app p{
     width: 100%;
     font-size: 14px;
     color: #666;
     text-align: center;
   }
   #aside-five:hover #app{display: block;}
   #aside-five #app #app-top{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 79px;
    top: -20px;
    border-style: solid;
    border-color: #e57339 #e57339 #e57339 #fff;
  }

  #aside #aside-six{
    width: 100%;
    height: 35px;
    float: left;
    cursor: pointer;
    position: relative;
  }
  #aside-six span{
    display: block;
    width: 30px;
    margin: 10px 0 0 8px;
    color: #666;
  }

  #btn1{
    width: 120px;
    height: 35px;
    line-height: 35px;
    margin-left: 150px;
    border: 1px solid #e57339;
    border-radius: 25px;
    color: #e57339;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    float: left;
    margin-top: -13px;
  }
  #btn2{
    width: 120px;
    height: 35px;
    line-height: 35px;
    margin-left: 150px;
    border: 1px solid #999;
    border-radius: 25px;
    color: #999;
    text-align: center;
    font-size: 15px;
    cursor: pointer;
    float: left;
    margin-top: -13px;
  }
  #area{
    width:675px;
    height:120px;
    outline:none;
    border: 1px solid #eee;
    font-size: 15px;
    padding: 10px 10px 0 10px;
    box-sizing: border-box;
    margin-top: 15px;
    color: #b5b5b5;
    border-radius: 5px;
    resize:none;
  }
  #title{
    text-align:left;
    font-size:14px;
    color: #666;
  }
  #title::before{
    content: '*';
    color: #ff0000;
    display: inline-block;
    margin-right:3px;
  }

  #btn{
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
    margin: 20px auto;
  }

</style>


