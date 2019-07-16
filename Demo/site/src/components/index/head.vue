<template>
  <div id="hea-warp">
    <div id="hea">
      <div id="logo">
          <img src="../../image/logo.png" @click="$router.push('/')"/>
      </div>
      <div class="hea-center">
        <ul  id="ul">
          <li @click="$router.push('/use')">用户信息</li>
          <li @click="$router.push('/bank')">账户信息</li>
          <li @click="$router.push('/code')">修改密码</li>
          <li @click="$router.push('/addre')">收货地址</li>
          <!-- <li @click="$router.push('/pat')">支付设置</li> -->
        </ul>
        <div id="txt">系统店铺管理后台</div>
        <div id="hea-right" @click="getCenter()">
          <i class="iconfont">&#xe73d;</i>
          <span>我的购物车</span>
        </div>
        <span id="span">账户设置<i class="iconfont">&#xe62f;</i></span>
      </div>
      
    </div>
  </div>

</template>

<script>
    export default {
      name: "hea",
      data(){
        return{
          carList:[]
        }
      },
      computed:{
        checkNum: function () {
          let num = 0;
          for (let i in this.carList) {
            num+=this.carList[i].ProNum;
          }
          return num;
        }
      },
      methods:{
        getCar() {
          this.$ajax.post("/purchase/carList",{},{
              headers: {
                token: localStorage.token
              }
            }).then(data => {
            this.carList = data.data.access_token.data;
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
            }else{
              this.$router.push('/joincar');
            }
          })
        },
      },
      mounted(){
        this.getCar();
        $('#span,#ul').mouseenter(function(){
          $("#span").css("color","#e57339")
          $("#span i").css("color","#e57339")
          $("#span i").html("&#xe62c;")
          $('#ul').css('display','block')
        });
        $('#span,#ul').mouseleave(function(){
          $("#span").css("color","")
          $("#span i").css("color","")
          $("#span i").html("&#xe62f;")
          $('#ul').css('display','none')
        })
      }
    }
</script>

<style scoped>
  #hea-warp{
    width: 100%;
    height: 70px;
    background: #fff;
    border-top: 5px solid #e57339;
  }
  #hea{
    width: 1200px;
    margin: 0 auto;
    background: #fff;

  }
  #logo{
    width: 169px;
    height: 30px;
    float: left;
    border-right: 1px solid #eee;
    margin-top: 20px;
    cursor: pointer;
  }
  #logo img{
    margin-left: 10px;
    margin-top: -12px;
  }


  .hea-center{
    width: 1030px;
    float: right;
    height: 100%;
    position: relative;
    
  }
  .hea-center #span{
    height: 70px;
    line-height: 70px;
    float: right;
    margin-right: 20px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
  }
  .hea-center #span i{
    font-size: 12px;
    font-weight: normal;
    margin-left: 2px;
    color: #373737;
  }


  .hea-center ul{
    width: 100px;
    height: 140px;
    position: absolute;
    top: 68px;
    right: 325px;
    background: #fff;
    box-shadow: #f5f5f5 0px 0px 2px 2px;
    border-top: 0;
    z-index: 99;
    display: none;
  }
  .hea-center ul li{
    list-style: none;
    float: left;
    font-size: 14px;
    height: 35px;
    line-height: 35px;
    width: 100%;
    text-align: center;
    color: #373737;
    cursor: pointer;
  }
  .hea-center ul li:hover{color: #e57339;}

  #txt{
    height: 70px;
    line-height: 70px;
    font-size: 18px;
    color: #e57339;
    margin-left: 20px;
    float: left;
    font-weight: bold;
  }
  
  #hea-right{
    width: 180px;
    height: 35px;
    margin-top:17px;
    margin-right: 135px;
    border: 1px solid #e57339;
    float: right;
    border-radius: 25px;
    font-size: 14px;
    cursor: pointer;
  }
  #hea-right i{
    font-size: 14px;
    color: #e57339;
    line-height: 35px;
    float: left;
    margin-left: 50px;
  }
  #hea-right span{
    color: #e57339;
    line-height: 35px;
    float: left;
    font-size: 12px;
  }

</style>
