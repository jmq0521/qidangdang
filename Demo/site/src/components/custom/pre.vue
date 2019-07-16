<template>
  <div id="pre">
    <div class="top">
      <h4>预售商品</h4>
    </div>
    <div id="pre-bottom">
      <div id="pre-form">
        <span>储备余额：￥<mark id="mark1">{{money}}</mark></span>
        <div id="btn" @click="$router.push('/rec?price='+money)">充值</div>
        <input type="text" id="txt" v-model="text" placeholder="请输入商品名称" autocomplete="off"/>
        <i class="iconfont" @click="getPreGood()">&#xe752;</i>
        <div class="btn"  @click="$router.push('/sea')">预售区</div>
      </div>
      <ul class="pre-ul">
        <li v-for="(item,index) in pregoodheadlist" :class= "isactive === index ? 'addclass' : '' " @click="getSearch(item.Id,index)">{{item.name}}</li>
      </ul>
      <div id="pre-footer">
        <div id="pre-one">
          综合
          <div id="one-top" @click="getSyn(2)"></div>
          <div id="one-down" @click="getSyn(1)"></div>
        </div>
        <div id="pre-two">
          最新上架
          <div id="two-top" @click="getAway(2)"></div>
          <div id="two-down" @click="getAway(1)"></div>
        </div>
        <div id="pre-three">
          销量
          <div id="three-top" @click="getPro(2)"></div>
          <div id="three-down" @click="getPro(1)"></div>
        </div>
        <div id="pre-four">
          价格
          <div id="four-top" @click="getPri(2)"></div>
          <div id="four-down" @click="getPri(1)"></div>
        </div>
        <div id="pre-img">
          <div class="img" v-for="(item,index) in pregoodlist">
            <input type="checkbox" :style="{display:item.is_select===1?'none':'block'}" :id="'check'+index" name="checkboxs" v-model="checkeds[index]"/>
            <label :for="'check'+index"></label>
            <div id=img>
              <img :src="item.ProImg | imgUrl" width="100px" height="100px" @click="$router.push('/deta?id='+item.ProId);"/>
            </div>
            <p>{{item.ProName}}</p>
            <span style="color: #ff0000">指导兑换：{{item.VipPrice}}</span>
            <span>销量：{{item.prosum}}</span>
            <span style="color: #cfa972">尊享兑换：{{item.EnjoyPrice}}</span>
            <span>库存：{{item.repertory}}</span>
            <a>零售价：{{item.MarketPrice}}</a>
            <div id="box" @click="item.is_select===1?'':$router.push('/deta?id='+item.ProId);" :style="{background:item.is_select===1?'#b2b2b2':'#ff0000'}">{{item.is_select===1?'已预售':'加入'}}</div>
          </div>

          <div id="input">
            <input v-for="(item,index) in pregoodlist" v-if="index=1" type="checkbox" id="checkA" @click="checkAll($event.currentTarget)" v-model="checkeds[index]"/>
            <label for="checkA"></label>
            <span>商品全选</span>
            <div id="but" @click="add()">批量加入预售</div>
          </div>
        </div>
      </div>
      <el-pagination
        style="margin-bottom:20px;margin-top: 10px; float: right; margin-right: 5px"
        background
        layout="prev, pager, next"
        :page-count="total"
        @current-change="getPreGood">
      </el-pagination>
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
  </div>

</template>

<script>
    export default {
      name: "pro",
      data(){
        return{
          Sible:false,
          pregoodlist:[],
          pregoodheadlist:[],
          text:'',
          total: 1,
          limit: 12,
          page: 1,
          btnType: true,
          checkeds:'',
          isactive:-1,
          money:'',
          type:''
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

        checkAll(event){
          if (event.checked) {
            for (let i = 0; i < this.checkeds.length; i++) {
              this.checkeds[i]=true;
            }
          } else {
            for (let i = 0; i < this.checkeds.length; i++) {
              this.checkeds[i]=false;
            }
          }
        },
        //保证金余额
        getMoney(){
          this.$ajax.post("/person/customIndex",{},{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              this.money=data.data.userMoney;
          })
        },
        //显示预售区商品列表
        getPreGood(page){
          this.$ajax.post("/person/presellGood",{
            page,
            search:this.text,
            limit:this.limit,
            category:this.type
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              this.pregoodlist=data.data.data;
              this.checkeds=new Array(data.data.data.length);
              this.total=data.data.last_page;
          })
        },
        //根据状态搜索
        getSearch(category,index){
          this.type=category,
          this.isactive=index,
          this.getPreGood();
        },

        //显示预售区商品列表综合搜索功能
        getSyn(synthesize){
          this.$ajax.post("/person/presellGood",{
            limit:this.limit,
            synthesize
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.pregoodlist=data.data.data;
          })
        },

        //显示预售区价格搜索功能
        getPri(price){
          this.$ajax.post("/person/presellGood",{
            limit:this.limit,
            price
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.pregoodlist=data.data.data;
          })
        },

        //显示预售区商品列表最新上架搜索功能
        getAway(putaway){
          this.$ajax.post("/person/presellGood",{
            limit:this.limit,
            putaway
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.pregoodlist=data.data.data;
          })
        },

        //显示预售区商品列表销量搜索功能
        getPro(pronum){
          this.$ajax.post("/person/presellGood",{
              limit:this.limit,
              pronum
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.pregoodlist=data.data.data;
          })
        },

        //显示预售区商品列表的表头
        getPreGoodHead(){
          this.$ajax.post("/person/presellGoodHead",{},{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.pregoodheadlist=data.data.category;
           })
        },
        
        //批量加入预售区
        add(){
          for(let i in this.pregoodlist) {
            if(this.checkeds[i]) 
              this.$ajax.post("/person/selectPreSell", {
                goodIds:this.pregoodlist[i].ProId,
                type:1
                }, {
                  headers: {
                    'token': localStorage.token
                  }
                }).then(data=>{
                  this.$router.push('/sea');
                })
            }
        }
      },
      mounted(){
        this.getCenter();
        this.getPreGood(this.page);
        this.getPreGoodHead();
        this.getMoney();


        $('#one-top').mouseenter(function(){
          $(this).css("border-color","#fff #fff #ff0000 #fff")
        });
        $('#one-top').mouseleave(function(){
          $(this).css("border-color","#fff #fff #d2d2d2 #fff")
        });
        $('#one-down').mouseenter(function(){
          $(this).css("border-color","#ff0000 #fff #fff #fff")
        });
        $('#one-down').mouseleave(function(){
          $(this).css("border-color","#d2d2d2 #fff #fff #fff")
        });
        $('#two-top').mouseenter(function(){
          $(this).css("border-color","#fff #fff #ff0000 #fff")
        });
        $('#two-top').mouseleave(function(){
          $(this).css("border-color","#fff #fff #d2d2d2 #fff")
        });
        $('#two-down').mouseenter(function(){
          $(this).css("border-color","#ff0000 #fff #fff #fff")
        });
        $('#two-down').mouseleave(function(){
          $(this).css("border-color","#d2d2d2 #fff #fff #fff")
        });

        $('#three-top').mouseenter(function(){
          $(this).css("border-color","#fff #fff #ff0000 #fff")
        });
        $('#three-top').mouseleave(function(){
          $(this).css("border-color","#fff #fff #d2d2d2 #fff")
        });
        $('#three-down').mouseenter(function(){
          $(this).css("border-color","#ff0000 #fff #fff #fff")
        });
        $('#three-down').mouseleave(function(){
          $(this).css("border-color","#d2d2d2 #fff #fff #fff")
        });

         $('#four-top').mouseenter(function(){
          $(this).css("border-color","#fff #fff #ff0000 #fff")
        });
        $('#four-top').mouseleave(function(){
          $(this).css("border-color","#fff #fff #d2d2d2 #fff")
        });
        $('#four-down').mouseenter(function(){
          $(this).css("border-color","#ff0000 #fff #fff #fff")
        });
        $('#four-down').mouseleave(function(){
          $(this).css("border-color","#d2d2d2 #fff #fff #fff")
        });
      }
    }
</script>

<style scoped>
  .addclass{color: #ff0000 !important;}
  #pre{
    width: 1020px;
    height: 600px;
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
  #pre #pre-bottom{
    width: 100%;
    min-height: 570px;
    margin-top: 10px;
    margin-bottom: 20px;
    float: left;
    background: #fff;
  }
  #pre-bottom #pre-form{
    width: 1000px;
    height: 60px;
    margin: 10px auto 0;
    background: #f6f6f6;
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
    padding-left: 15px;
    box-sizing: border-box;
    color: #313131;
  }
  #pre-form span{
    font-size: 14px;
    color: #ff0000;
    float: left;
    line-height: 60px;
  }
  #pre-form span mark{
    font-size: 14px;
    display: inline-block;
    color: #ff0000;
    background: #f6f6f6;
  }
  #pre-form #btn{
    width: 50px;
    height: 25px;
    line-height: 23px;
    text-align: center;
    margin: 18px 0 0 25px;
    border: 0;
    color: #ff0000;
    border: 1px solid #ff0000;
    border-radius: 2px;
    float: left;
    font-size: 14px;
    cursor: pointer;
    font-weight: normal;
  }
  #pre-form #txt{
    width: 210px;
    height: 25px;
    margin-left: 390px;
    border: 0;
    border: 1px solid #ec652b;
    float: left;
    margin-top: 18px;
    text-indent: 10px;
    font-size: 12px;
    color: #626262;
    outline: none;
  }
  .iconfont{
    width: 50px;
    height: 25px;
    line-height: 25px;
    float: left;
    color: #ffffff;
    margin-top: 18px;
    border: 0;
    background: #ec652b;
    text-align: center;
    border-radius: 0;
    cursor: pointer;
  }
  #pre-form .btn{
    width: 60px;
    height: 25px;
    line-height: 24px;
    text-align: center;
    margin: 18px 0 0 25px;
    border: 0;
    color: #ff5900;
    background: #f6f6f6;
    border-radius: 2px;
    font-size: 14px;
    border: 1px solid #ff5900;
    float: left;
    cursor: pointer;
    font-weight: normal;
  }
  #pre-bottom .pre-ul{
    width: 1000px;
    margin: 5px auto;
    height: 45px;
    line-height: 45px;
    background: #f6f6f6;
    border-bottom: 1px solid #ff0000;
  }
  .pre-ul li{
    width: 95px;
    float: left;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    text-align: center;
    color: #313131;
  }
  #pre-footer{
    width: 980px;
    min-height: 500px;
    margin: 5px auto;
  }
  #pre-footer #pre-one{
    width: 60px;
    height: 25px;
    line-height: 25px;
    margin: 20px 0 0 15px;
    float: left;
    border: 1px solid #d2d2d2;
    font-size: 12px;
    text-indent: 10px;
    color: #7d7d7d;
    cursor: pointer;
  }
  #pre-one #one-top{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 40px;
    top: -23px;
    border-style: solid;
    border-color: #ffffff #ffffff #d2d2d2 #ffffff ;
  }
  #pre-one #one-down{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 40px;
    top: -22px;
    border-style: solid;
    border-color: #d2d2d2 #ffffff #ffffff  #ffffff ;
  }
  #pre-footer #pre-two{
    width: 80px;
    height: 25px;
    line-height: 25px;
    margin: 20px 0 0 20px;
    float: left;
    border: 1px solid #d2d2d2;
    font-size: 12px;
    text-indent: 10px;
    color: #7d7d7d;
    cursor: pointer;
  }
  #pre-two #two-top{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 65px;
    top: -23px;
    border-style: solid;
    border-color: #ffffff #ffffff #d2d2d2 #ffffff ;
  }
  #pre-two #two-down{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 65px;
    top: -22px;
    border-style: solid;
    border-color: #d2d2d2 #ffffff #ffffff  #ffffff ;
  }
  #pre-footer #pre-three{
    width: 60px;
    height: 25px;
    line-height: 25px;
    margin: 20px 0 0 20px;
    float: left;
    border: 1px solid #d2d2d2;
    font-size: 12px;
    text-indent: 10px;
    color: #7d7d7d;
    cursor: pointer;
  }
  #pre-three #three-top{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 40px;
    top: -23px;
    border-style: solid;
    border-color: #ffffff #ffffff #d2d2d2 #ffffff ;
  }
  #pre-three #three-down{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 40px;
    top: -22px;
    border-style: solid;
    border-color: #d2d2d2 #ffffff #ffffff  #ffffff ;
  }
  #pre-footer #pre-four{
    width: 60px;
    height: 25px;
    line-height: 25px;
    margin: 20px 0 0 20px;
    float: left;
    border: 1px solid #d2d2d2;
    font-size: 12px;
    text-indent: 10px;
    color: #7d7d7d;
    cursor: pointer;
  }
  #pre-four #four-top{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 40px;
    top: -23px;
    border-style: solid;
    border-color: #ffffff #ffffff #d2d2d2 #ffffff ;
  }
  #pre-four #four-down{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 40px;
    top: -22px;
    border-style: solid;
    border-color: #d2d2d2 #fff #fff  #fff;
  }
  #pre-footer #pre-img{
    width: 100%;
    min-height: 500px;
    float: left;
    margin-top: 10px;
  }
  #pre-img .img{
    width: 226px;
    height: 280px;
    border: 1px solid #e5e5e5;
    float: left;
    margin: 20px 0 0 15px;
    cursor: pointer;
    position: relative;
  }
  .img input{
    position: absolute;
    top: 10px;
    left: 5px; 
  }
  .img #img{height: 120px;width: 100%;position: relative;margin-top: 22px;}
  #img img{
    width: 120px;
    height: 120px;
    position: absolute;  
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;  
    margin: auto;
  }
  .img p{
    font-size: 12px;
    color: #686868;
    font-weight: bold;
    margin-left: 20px;
    margin-top: 10px;
    width: 140px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 6px;
  }
  .img span{
    float: left;
    margin: 5px 0 0 20px;
    font-weight: bold;
    font-size: 12px;
    color: #626262;
  }
  .img a{float: left;margin: 15px 0 0 20px;color: #626262;font-size: 12px;text-decoration:line-through;}
  .img #box{
    width: 55px;
    height: 20px;
    line-height: 20px;
    float: left;
    margin: 13px 0 0 40px;
    font-size: 12px;
    color: #ffffff;
    text-align: center;
  }
  #pre-img #input{
    width: 100%;
    height: 50px;
    float: left;
  }
  #input input:nth-of-type(1){
    display: block;
  }
  #input input{
    width: 15px;
    height: 15px;
    margin: 18px 0 0 15px;
    float: left;
    display: none;
  }
   #input span{
    margin: 15px 0 0 15px;
    float: left;
    font-size: 14px;
    font-weight: bold;
    color: #313131;
  }
  #input #but{
    width: 115px;
    height: 30px;
    line-height: 30px;
    float: left;
    margin: 10px 0 0 40px;
    background: #ff0000;
    border-radius: 2px;
    font-size: 12px;
    color: #fff;
    text-align: center;
    cursor: pointer;
  }
  #pre-img .img:hover{border-color: #ff0000;}

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
