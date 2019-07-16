<template>
  <div id="news">
    <div class="top">
      <h4>最新公告</h4>
    </div>
    <ul id="news-bottom">
      <li v-for="item in newsList" :key="item.id">
        <a v-html="item.ArticleTitle" @click="$router.push('/newslist?id='+item.id)"></a>
        <span></span>
      </li>
    </ul>
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
             category_id:23
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
  #news #news-bottom{
    width: 100%;
    min-height: 840px;
    margin-top: 10px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  #news-bottom li{
    width: 1000px;
    margin-left: 5px;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px dotted #ddd;
  }
  #news-bottom li a{
    line-height: 50px;
    font-size: 14px;
    float: left;
    text-indent: 15px;
    color: #999;
  }
 
</style>
