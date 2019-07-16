<template>
  <div id="news">
    <div class="top">
      <h4>最新公告-详情</h4>
      <div id="btn" @click="$router.push('/news')">返回</div>
    </div>
    <div id="news-bottom">
      <li v-for="item in newsList" :key="item.id">
        <p v-html="item.ArticleContent" @click="$router.push('/newsList')"></p>
      </li>
    </div>
  </div>
</template>

<script>
    export default {
      name: "new",
      data(){
        return{
          newsList:[],
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
        //显示公告列表
        getNews(){
          this.$ajax.get("/system/articleList",{
            params:{
             category_id:23,
             id:this.$route.query.id
            }}).then(data=>{
            this.newsList=data.data.data;
          })
        }
      },
      mounted(){
        this.getCenter();
        this.getNews();
      }
    }
</script>

<style scoped>
  #news{
    width: 1020px;
    min-height: 600px;
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
  .top #btn{
    width: 65px;
    font-size: 14px;
    height: 25px;
    border-radius: 3px;
    border: 1px solid #ff0000;
    line-height: 23px;
    margin-top: 12px;
    float: right;
    color: #ff0000;
    text-align: center;
    margin-right: 30px;
    cursor: pointer;
  }



  #news #news-bottom{
    width: 100%;
    min-height: 840px;
    margin-top: 10px;
    float: left;
    background: #ffffff;
    margin-bottom: 20px;
  }

  #news-bottom  p{
    line-height: 50px;
    font-size: 14px;
    float: left;
    color: #626262;
    padding-left: 30px;
    box-sizing: border-box;
  }
 
</style>
