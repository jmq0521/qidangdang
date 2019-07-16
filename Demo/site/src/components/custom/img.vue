<template>
  <div id="fre">
    <img src="../../image/jf.jpg"/>
    <div id="btn"  @click="$router.push('/recc?price='+money)">开通商城</div>
    

  </div>

</template>

<script>
    export default {
      name: "fre",
      data(){
        return{
          money:0.00
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


        //储备金余额
        callBack(){
          this.$ajax.post("/person/customIndex",{},{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              this.money=data.data.userMoney
          })
        }
       
      },
      mounted(){
        this.getCenter();
        this.callBack();
      
      }
    }
</script>

<style scoped>
  #fre{
    width: 1010px;
    min-height: 600px;
    margin-top: 10px;
    margin-bottom: 20px;
    background: #fff;
    padding: 10px;
    overflow: hidden;
    box-shadow: 6px 5px 1px #eee;
    border-radius: 8px;
  }
  #fre img{
    width: 100%;
    height: 100%;
  }
  #fre #btn{
    width: 120px;
    height: 35px;
    line-height: 35px;
    background: #ff9119;
    font-weight: bold;
    text-align: center;
    margin: 10px auto;
    font-size: 16px;
    border-radius: 3px;
    color: #ffffff;
    cursor: pointer;
  }

</style>

