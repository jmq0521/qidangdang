<template>
  <div id="sta-warp">
    <div id="sta" v-for="(item,index) in staList" v-if="index<7">
      <div id="sta-top" >
        <h4>{{item.name}}</h4>
        <ul id="sta-ul">
          <li v-for="li in item.child" :key="li.ctcategoryId" @click="$router.push('/li?id='+li.ctcategoryId+'&'+'sub_id='+item.ctcategoryId)">{{li.name}}</li>
          <li @click="$router.push('/li?id='+item.child[0].ctcategoryId+'&'+'sub_id='+item.ctcategoryId)">查看更多&gt;</li>
        </ul>
        <img :src="item.pc_photo | imgUrl"/>
      </div>
      <div id="sta-img">
        <div id="img" v-for="(img,index) in item.data" @click="openShop(img.productId)"  :key="index">
          <div class="img">
           <img :src="img.pro_img | imgUrl"/>
          </div>
          <p><mark>热销</mark>{{img.name}}</p>
          <span id="span1" v-show="show">
            <mark>尊</mark>
            ￥{{img.enjoy_price.substr(0,img.enjoy_price.length-1)}}
            <a>{{img.enjoy_price.substring(img.enjoy_price.length-1)}}</a>
          </span>
          <span id="span2" v-show="show">
            <mark>标</mark>
            ￥{{img.vip_price.substr(0,img.vip_price.length-1)}}
            <a>{{img.vip_price.substring(img.vip_price.length-1)}}</a>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "sta",
      data(){
        return{
         staList:[],
         code:'',
         show:false,
        }
      },
      methods:{
        //个人中心状态值
        getCenter(){
          this.$ajax.post("/Person/userCentre",{},{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.code=data.error_code
          })
        },
        //显示首页楼层的列表
        getShop(){
          this.$ajax.get("v2/index/product-floor",{
            params:{
              limit:8,
              type:'pc'
            }
          }).then(data=>{
            this.staList=data.data;
          })
        },
        //进入详情
        openShop(id){
          if(localStorage.phone == "" || localStorage.phone == undefined){
            this.$router.push('/login')
          }else if(this.code==40015){
            this.$router.push('/login')
          }else{
            this.$router.push('/detail?id='+id)
          }
        }
      },
      mounted(){
        this.getCenter();
        this.getShop();
        if(localStorage.phone == "" || localStorage.phone == undefined){
          this.show=false;
        }else{
          this.show=true;
        };
      }
    }
</script>
  

<style scoped>
  #sta-warp{width: 100%;}
  #sta{
    width: 1100px;
    min-height: 600px;
    margin: 0 auto;
  }
  #sta #sta-top{width: 100%;float: left;margin-top: 60px;height: 360px;}
  #sta-top h4{
    font-size: 24px;
    float: left;
    color: #333;
    font-weight: normal;
    margin-left: 20px;
  }
  #sta-top #sta-ul{float:right;margin-right: 30px;margin-top: 15px;}
  #sta-ul li{
    float:left;
    font-size: 14px;
    margin-left: 13px;
    color: #666;
    cursor: pointer;
  }
  #sta-top img{
    margin-top: 15px;
    width: 100%;
    height: 310px;
  }
  #sta #sta-img{width: 100%;float: left;max-height:720px;}
  #sta-img #img:nth-of-type(1){margin-left: 2px;}
  #sta-img #img:nth-of-type(5){margin-left: 2px;}
  #sta-img #img{
    width: 265px;
    max-height: 350px;
    background: #fff;
    float: left;
    margin: 10px 0 0 10px;
    cursor: pointer;
    font-weight: bold;
  }
  #sta-img #img .img{
    width: 100%;
    height: 265px;
    position: relative;
    background: #fff;
  }
  #sta-img #img:hover{box-shadow: #efefef 0px 0px 2px 2px;}
  #img .img img{
    width: 200px;
    height: 200px;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
  }
  #img p{
    width: 245px;
    height: 36px;
    line-height: 18px;
    margin-top: 10px;
    margin-bottom: 10px;
    margin-left: 10px;
    font-size: 14px;
    color: #333;
    overflow : hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    font-weight: normal;
  }
  #img p mark{
    width: 30px;
    height: 15px;
    text-align: center;
    line-height: 15px;
    display: inline-block;
    border-radius: 3px;
    background: #ff0000;
    color: #fff;
    font-size: 12px;
    margin-right: 5px;
  }
  #img #span1{
    float: left;
    margin-left: 10px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #ff0000;
  }
  #img #span1 mark{
    display: inline-block;
    color: #ff0000;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    border: 1px solid #ff0000;
    background: #fff;
    margin-right: 5px;
    border-radius: 4px;
    font-weight: normal;
  }
  #img #span1 a{
    color: #ff0000;
    margin-left: -4px;
    opacity: 0.4;
  }

  #img #span2{
    float: right;
    margin-right: 10px;
    margin-bottom: 8px;
    font-size: 14px;
    color: #ad946b;
  }
  #img #span2 mark{
    display: inline-block;
    color: #ad946b;
    width: 20px;
    height: 20px;
    line-height: 18px;
    text-align: center;
    font-size: 12px;
    border: 1px solid #ad946b;
    background: #fff;
    margin-right: 5px;
    border-radius: 4px;
    font-weight: normal;
  }
  #img #span2 a{
    color: #ad946b;
    margin-left: -4px;
    opacity: 0.4;
  }
</style>