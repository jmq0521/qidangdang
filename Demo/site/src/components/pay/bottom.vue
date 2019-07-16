<template>
    <div id="bottom-warp">
      <div id="bottom">
        <div id="bottom-left">
          <h5>客户服务</h5>
          <a id="box1" href="tencent://AddContact/?fromId=45&fromSubId=1&subcmd=all&uin=3617715353&website=www.oicqzone.com">
            <i class="iconfont">&#xe731;</i>
            <p>在线客服</p>
          </a>
          <div id="box2" @click="getCenter()">
            <i class="iconfont">&#xe61d;</i>
            <p>用户反馈</p>
          </div>

        </div>
        <div id="bottom-center">
          <h5>关于企铛铛</h5>
          <p>为用户提供一款精品B2B企业礼品采购平台，秉承严谨的态度，从源头把控商品选区，为企业提供优质商品。</p>
        </div>
        <div id="bottom-right">
          <h5>扫码下载企铛铛APP</h5>
          <img src="../../image/app.png" class="img"/>
        </div>
      </div>
      <el-dialog
        :visible.sync="Visible"
        :modal-append-to-body="false"
        style="text-align: center"
        title="意见反馈"
        :show-close="false"
        top="300px"
        width="715px">
        <p id="title">请在此提出您的宝贵意见：</p>
        <textarea v-model="value" id="area" placeholder="(⊙o⊙)请详细描述您遇到的问题，有助于我们快速定位并解决处理，或留下您的宝贝意见或建议，我们会认真进行评估！"></textarea>
        <span slot="footer" class="dialog-footer">
          <div id="btn3" type="primary" @click=" getIdea()">提交</div>
          <div id="btn4" @click="Visible=false" type="primary">取消</div>
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
        <p  id="title1">
          {{msg}}
        </p>
        <span>
          <div id="btn"  @click="dialog=false">确认</div>
        </span>
     </el-dialog>
    </div>
</template>

<script>
  export default {
    name: "bottom",
    data() {
      return {
       Visible:false,
       dialog:false,
       value:'',
       msg:''
      }
    },
     methods:{

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
          this.msg=data.msg;
          this.dialog=true;
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
  }
</script>

<style scoped>
  #bottom-warp{width: 100%;float: left;border-top: 1px solid #f5f5f5;margin-top: 50px;}
  #bottom{
    width: 1100px;
    height: 295px;
    margin: 0 auto;
    padding-top: 55px;
    padding-bottom: 55px;
    box-sizing: border-box;
  }
  #bottom #bottom-left{
    width: 375px;
    height: 100%;
    border-right: 1px solid #f5f5f5;
    padding-left: 95px;
    padding-right: 95px;
    box-sizing: border-box;
    float: left;
  }
  #bottom-left h5{
    width: 100%;
    font-size: 18px;
    color: #333;
    text-align: center;
    font-weight: normal;
  }
  #bottom-left #box1{
    width: 80px;
    height: 100px;
    float: left;
    border: 1px solid #d8d8d8;
    margin-top:30px; 
    cursor: pointer;
  }
  #bottom-left #box1 i{
    width: 100%;
    display: block;
    text-align: center;
    color: #666;
    font-size: 20px;
    margin-top: 20px;
  }
  #bottom-left #box1 p{
    width: 100%;
    display: block;
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 15px;
    
  }



  #bottom-left #box2{
    width: 80px;
    height: 100px;
    float: left;
    border: 1px solid #d8d8d8;
    margin-top:30px; 
    margin-left: 20px;
    cursor: pointer;
  }
 #bottom-left #box2 i{
    width: 100%;
    display: block;
    text-align: center;
    color: #666;
    font-size: 20px;
    margin-top: 20px;
  }
  #bottom-left #box2 p{
    width: 100%;
    display: block;
    text-align: center;
    color: #666;
    font-size: 14px;
    margin-top: 15px;
    
  }





   #bottom #bottom-center{
    width: 360px;
    height: 100%;
    border-right: 1px solid #f5f5f5;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    float: left;
  }
  #bottom-center h5{
    width: 100%;
    font-size: 18px;
    color: #333;
    text-align: center;
    font-weight: normal;
  }
  #bottom-center p{
    width: 100%;
    font-size: 14px;
    color: #666;
    margin-top: 50px;
    line-height: 20px;
  }

  #bottom #bottom-right{
    width: 360px;
    height: 100%;
    padding-left: 30px;
    padding-right: 30px;
    box-sizing: border-box;
    float: left;
  }
  #bottom-right h5{
    width: 100%;
    font-size: 18px;
    color: #333;
    text-align: center;
    font-weight: normal;
  }
  #bottom-right img{
    width: 100px;
    height: 100px;
    margin-top: 30px;
    margin-left: 100px;
  }


  #btn3{
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
  #btn4{
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


  #btn1{
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
  #btn2{
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
