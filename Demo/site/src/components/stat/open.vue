<template>
  <div id="open">
    <div id="top">
      <h4>开通服务</h4>
      <div id="but" @click="$router.go(-1)">返回</div>
    </div>

    <div id="open-table">
      <div id="open-box">
        <div id="bigbox">
          <div id="open1">
            <mark></mark>
            <span>开通服务</span>
            <div id="box1" v-for="(item,index) in vitName" :key="index" :class= "isactive === index ? 'addclass' : '' " @click="Type(item,index)">{{item.Name}}</div>
          
          </div>
          <div id="open2">
            <mark id="mark"></mark>
            <span>开通数量</span>
            <mark id="mark1" @click="num--">-</mark><input type="text" v-model="num" id="input"/><mark id="mark2" @click="num++">+</mark>
          </div>
          <p> <mark></mark>价格：</p>
          <div id="btn" @click="payMoney()">去支付</div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: "open",
    data(){
      return{
        vitName:[],
        type:'',
        isactive : -1,
        num:0,
      }
    },
    methods:{
      Type(item,index){
       this.type=item.ID;
       console.log(this.type);
       this.isactive=index;
      },
      //获取邀请的名额
      getVitName(){
        this.$ajax.post("/vitation/inviteNum",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.vitName=data.data;
          console.log(45454,data.data)
        })
      },
      //购买名额下单
      payMoney(){
        this.$ajax.post("/finance/UserPlacesOrder",{
          type:this.type,
          num:this.num
        },{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
            // console.log(123,num)
            alert(data.msg);
            if(data.msg=='成功'){
              this.$router.push('/gopay')
            }
            
        })
      }
    },
    mounted(){
      this.getVitName();
       $("#open2 #input").bind({
        focus: function() {
          $(this).css("border-color", "");
        }
      })
    }
  }
</script>

<style scoped>
  #open{
    width: 1010px;
    border-top: 5px solid #626262;
    margin-top: 10px;
  }
  #open #top{
    width: 100%;
    height: 50px;
    background: #fff;
  }
  #top h4{
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    text-indent: 30px;
    float: left;
  }
  #top #but{
    width: 80px;
    height: 25px;
    float: right;
    line-height: 25px;
    border: 1px solid #ff0000;
    border-radius: 5px;
    color: #ff0000;
    font-size: 14px;
    text-align: center;
    margin: 10px 30px 0 0;
    cursor: pointer;
  }
  #open #open-table{
    width: 1010px;
    min-height: 740px;
    background: #ffffff;
    margin-top: 5px;
    float: left;
    margin-bottom: 20px;
  }
  #open-table #open-box{
    width: 100%;
    height: 300px;
    margin: 10px 0 0 10px;
  }
  #open-box #bigbox{float: left; width: 100%;}
  #open-box #open1{
    width: 100%;
    height: 30px;
    margin-top: 15px;
  }
  #open1 mark{
    width: 5px;
    height: 20px;
    background: #d5443d;
    display: inline-block;
    float: left;
    margin-left: 18px;
  }
  #open1 span{
    font-size: 14px;
    color: #313131;
    float: left;
    margin-left: 10px;
  }
  .addclass{
    background:#d5443d;
    color: #ffffff;
  }
  #open1 #box1{
    width: 75px;
    height: 20px;
    line-height: 20px;
    margin-left: 15px;
    float: left;
    border: 1px solid #AAAAAA;
    font-size: 12px;
    text-align: center;
    border-radius: 3px;
  }
  #open-box #open2{
    width: 100%;
    height: 30px;
    margin-top: 15px;
  }
  #open2 #mark{
    width: 5px;
    height: 20px;
    background: #d5443d;
    display: inline-block;
    float: left;
    margin-left: 18px;
  }
  #open2 span{
    font-size: 14px;
    color: #313131;
    float: left;
    margin-left: 10px;
  }
  #open2 #mark1{
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border: 1px solid #b2b2b2;
    display: inline-block;
    float: left;
    margin-left: 18px;
  }
  #open2 #mark2{
    width: 20px;
    height: 20px;
    text-align: center;
    line-height: 20px;
    display: inline-block;
    float: left;
    margin-left: 0;
    border: 1px solid #b2b2b2;
  }
  #open2 input{
    width: 50px;
    height: 20px;
    border: 0;
    border-top: 1px solid #b2b2b2;
    border-bottom: 1px solid #b2b2b2;
    float: left;
    text-align: center;
  }
  #open2 mark:nth-of-type(2){
    background: #ffffff;
    font-size: 18px;
    margin: 0 0 0 18px;
    color: #707070;
  }
  #open2 mark:nth-of-type(3){
    background: #ffffff;
    font-size: 18px;
    margin: 0 0 0 18px;
    color: #707070;
  }
  #open-box p{
    width: 100%;
    height: 30px;
    margin-top: 15px;
    text-indent: 10px;
    font-size: 14px;
    color: #313131;
  }
  p mark{
    width: 5px;
    height: 20px;
    background: #d5443d;
    display: inline-block;
    float: left;
    margin-left: 18px;
  }
  #open-box #btn{
    width: 130px;
    height: 25px;
    line-height: 25px;
    text-align: center;
    margin: 15px 0 0 20px;
    font-size: 14px;
    color: #ffffff;
    background: #ff0000;
    border-radius: 3px;
    cursor: pointer;
  }
</style>