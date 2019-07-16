<template>
  <div id="crea">
    <div class="top">
      <a id="a-one">商家信息--创建</a>
      <div id="box" @click="$router.go(-1)">返回</div>
    </div>
    <div id="pane-one">
      <form id="one-form">
        <div><mark>*</mark><span>用户名</span><input type="text" placeholder="请输入手机号" autocomplete="off" v-model="phone"/></div>
        <div><mark>*</mark><span>密码</span><input type="password" placeholder="请输入密码" autocomplete="new-password" v-model="password"/></div>
        <div><mark>*</mark><span>确认密码</span><input type="password" placeholder="请输入确认密码" v-model="rePassword"/></div>
        <div><mark>*</mark><span>商家名称</span><input type="text" placeholder="请输入商家名称" autocomplete="off" v-model="store_name"/></div>
        <div><mark>*</mark><span>负责人</span><input type="text" placeholder="请输入负责人" autocomplete="off" v-model="nick_name"/></div>
        <div><mark>*</mark><span>手机号</span><input type="text" placeholder="请输入负责人手机号" autocomplete="off" v-model="principal_phone"/></div>
        <div><mark>*</mark><span>所属类别</span>
           <select id="s" v-model="id" @change="getSte(id)">
            <option value="">一级分类</option>
            <option v-for="item in sele" :value="item.id" :key="item.id">{{item.name}}</option>
          </select>
           <select id="ss">
            <option value="">二级分类</option>
            <option v-for="item in sel" :value="item.id" :key="item.id">{{item.name}}</option>
          </select>
           <a>选择后将不能再更改,如要更改请咨询客服</a>
        </div>
        <div><mark>*</mark><span>创建类别</span>
          <select id="s4">
            <option v-for="(item,index) in vitNum" :key="index" v-if="type==3?index<2:index<3" :value="item.ID">{{item.Name}}</option>
          </select>
        </div>
        <div><mark>*</mark><span>人均消费</span><input type="text" placeholder="请输入人均消费" autocomplete="off" v-model="money"/></div>
        <div>
          <mark>*</mark>
          <span>营业时间</span>
           <el-time-select
            placeholder="起始时间"
            style="margin:-20px 0 0 -10px;width:125px;"
            v-model="startTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00'
            }">
          </el-time-select>
          <el-time-select
            placeholder="结束时间"
            style="margin:-20px 0 0 15px;width:125px;"
            v-model="endTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00',
            }">
          </el-time-select>
          <a>时间格式：9:00-21:00,非必填,可通知商家自行设置</a>
        </div>
        <div><mark>*</mark><span>所在地区</span>
          <select v-model="pro" @change="getCity(pro)" id="s1">
            <option value="">请选择省份</option>
            <option v-for="item in province" :value="item.Code">{{item.AreaName}}</option>
          </select>
          <select v-model="cit" @change="getDis(cit)" id="s2">
            <option value="">请选择城市</option>
            <option v-for="item in city" :value="item.Code">{{item.AreaName}}</option>
          </select>
          <select v-model="dist" id="s3">
            <option value="">请选择区县</option>
            <option v-for="item in dis" :value="item.Code">{{item.AreaName}}</option>
          </select>
        </div>
        <div><mark>*</mark><span>详细地址</span><input type="text"  placeholder="请输入详细地址" autocomplete="off" v-model="address"/></div>
        <!-- <div id="map" style="display:none">
          <mark>*</mark>
          <span>地理坐标</span>
          <div class="baidumap" id="allmap"></div>
           <input type="text" id="lng" v-model="lng"/>经度<input type="text" id="lat" v-model="lat"/>纬度
        </div> -->
        <div id="box" @click="dialog = true">添加</div>
      </form>
      <el-dialog
        title="提示"
        style="text-align: center"
        :visible.sync="dialog"
        top="300px"
        :show-close="false"
        :close-on-click-modal="false"
        width="430px">
        <div id="btn">
         <div id="btn1" v-for="(item,index) in box" :key="index" @click="Type(item,index)" :class= "isactive === index ? 'addclass' : '' ">{{item.label}}</div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button id="bnt1" type="primary" :loading="Loading"  @click="addStore()" plain>确认</el-button>
          <div id="bnt2" @click="dialog=false">取消</div>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
    export default {
      name: "crea",
      data() {
        return {
          box:[
            {
              value:'1',
              label:'使用赠送名额'
            },
            {
              value:'2',
              label:'使用购买名额'
            }
          ],
          Loading:false,
          isactive : -1,
          dialog:false,
          id:'',
          sele:[],
          sel:[],
          grop:[],
          vitNum:[],
          type:localStorage.type,
          pro:'',
          cit:'',
          dist:'',
          province:[],
          city:[],
          dis:[],
          phone:'',
          password:'',
          rePassword:'',
          store_name:'',
          nick_name:'',
          principal_phone:'',
          startTime:'',
          endTime:'',
          money:'',
          address:'',
          lng:'',
          lat:'',
          select_type:''
        }
      },
      methods:{
        //选择名额类型
        Type(item,index){
          this.select_type=item.value;
          this.isactive=index;
        },
        //获取创建的类别
        getVit(){
          this.$ajax.post("/vitation/inviteNum",{},{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
              this.vitNum=data.data
          })
        },
        //百度地图
        // baiduMap:function(){
        //   const _this = this
        //   var map=new BMap.Map("allmap");
        //   var point=new BMap.Point(_this.lng, _this.lat);
        //   var marker=new BMap.Marker(point);
        //   map.addOverlay(marker);
        //   map.centerAndZoom(point,15);
        //   map.addEventListener("click",function(e){
        //     _this.lng=e.point.lng;
        //     _this.lat=e.point.lat;
        //     console.log(_this.lng+","+_this.lat);
        //   });
        //   map.enableScrollWheelZoom();
        //   map.enableContinuousZoom();
        // },
        handler () {
          let _this = this;   // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
              _this.center = {lng: r.longitude, lat: r.latitude};     // 设置center属性值
              _this.lng=r.longitude;
              _this.lat=r.latitude;
              console.log('center:',_this.lng, _this.lat)    // 如果这里直接使用this是不行的
        },{enableHighAccuracy: true})},


        //手动创建用户
        addStore(){
          this.Loading=true;
          var select = document.getElementById("s");
          var select4 = document.getElementById("ss");
          var select1 = document.getElementById("s1");
          var select2 = document.getElementById("s2");
          var select3 = document.getElementById("s3");
          var select5 = document.getElementById("s4");
        
          let options = select.options;
          let index = select.selectedIndex;

          let options4 = select.options;
          let index4 = select.selectedIndex;

          let options5 = select5.options;
          let index5 = select5.selectedIndex;

          let options1 = select1.options;
          let index1 = select1.selectedIndex;

          let options2 = select2.options;
          let index2 = select2.selectedIndex;

          let options3 = select3.options;
          let index3 = select3.selectedIndex;

          this.$ajax.post("/user/createBaseUser",{
            phone:this.phone,
            password:this.password,
            rePassword:this.rePassword,
            store_name:this.store_name,
            nick_name:this.nick_name,
            principal_phone:this.principal_phone,
            one_classify_id:options[index].value,
            second_classify_id:options4[index4].value,
            consumption_by_persion:this.money,
            store_start_time:this.startTime,
            store_end_time:this.endTime,
            province_id:options1[index1].value,
            city_id:options2[index2].value,
            county_id:options3[index3].value,
            address:this.address,
            longitude:this.lng,
            latitude:this.lat,
            user_type:options5[index5].value,
            select_type:this.select_type,
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.$message({
              message: data.msg,
              type: 'success'
            });
            let timer=setInterval(() => {
              this.Loading=false;
  　　　    }, 2000)
            if(data.msg=='创建成功'){
              this.$router.push("/vitt")
            }
          })
        },
        //显示商家一级分类
        getSto(){
          this.$ajax.post("/user/userStoretCategory",{}).then(data=>{
            this.sele=data.data;
          })
        },
        //显示商家二级分类
        getSte(id){
          this.$ajax.post("/user/userStoretCategoryApi",{
            id
          },{}).then(data=>{
            this.sel=data.data;
          })
        },


        //获取地区的三级联动
        getPro(code){
          this.$ajax.post("/system/getcity",{
           code
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.province=data.data;
          })
        },
        getCity(code){
          this.$ajax.post("/system/getcity",{
            code
          },{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.city=data.data;
          })
        },
        getDis(code){
          this.$ajax.post("/system/getcity",{
              code
            },{
              headers: {
                'token' :localStorage.token
              }}).then(data=>{
              this.dis=data.data;
          })
        }
      },
      mounted(){
        this.getSto();
        this.getPro(0);
        // this.baiduMap();
        this.handler();
        this.getVit();
      }
    }
</script>
<style scoped>
  #crea{
    width: 1020px;
    min-height: 600px;
    margin-bottom: 20px;
    margin-top: 10px;
  }
  .top{height: 50px;background: #fff;margin-bottom: 10px}
  .top #a-one{
    font-size: 14px;
    line-height: 50px;
    float: left;
    font-weight: bold;
    color: #313131;
    margin-left: 30px;
    cursor: pointer;
  }
  .top #box{
    width: 60px;
    height: 25px;
    float: right;
    line-height: 23px;
    border: 1px solid #ff0000;
    border-radius: 3px;
    color: #ff0000;
    font-size: 14px;
    text-align: center;
    margin: 10px 30px 0 0;
    cursor: pointer;
  }
  #pane-one{
    width: 100%;
    min-height: 700px;
    float: left;
    background: #fff;
    margin-bottom: 20px;
  }
  #one-form{
    width: 800px;
    float: left;
    padding-left: 70px;
    box-sizing: border-box;
  }
  #one-form div{
    font-size: 14px;
    color: #313131;
    margin-top: 20px;
  }
  #one-form div mark{color: #ff0000;background: #ffffff;float: left;margin-top: 4px}
  #one-form div span{width: 80px;display: inline-block;margin-top: 2px;float: left;}
  #one-form div input{
    width: 285px;
    height: 25px;
    text-indent: 5px;
    color:#313131;
    font-size: 12px;
    border-radius: 3px;
    border: 0;
    border: 1px solid #d2d2d2;
    outline: none;
    }
  #one-form div:nth-of-type(10) input{width: 92px;}
  #one-form div select{
    color:#626262;
    width: 230px;
    height:25px;
    font-size: 12px;
    border: 1px solid #d2d2d2;
    border-radius: 3px;
    outline: none;
  }
  #one-form div #s{width: 140px;}
  #one-form div #ss{width: 140px;}
  #one-form div #s3{width: 114px;}
  #one-form div #s1{width: 114px;}
  #one-form div #s2{width: 114px;}
  #one-form div #s3{width: 114px;}
  #one-form div #s4{width: 285px;}
  #one-form div a{
    font-size: 12px;
    display: block;
    color: #cecece;
    display: block;
    margin-left: 87px;
  }
  .baidumap{
    height:300px;
    width: 600px;
    display: inline-block;
    top: -15px;
  }
  #one-form #map #lng{
    width: 80px;
    margin: 5px 0 0 80px;
  }
  #one-form #map #lat{
    width: 80px;
    margin: 5px 0 0 40px;
  }
  #one-form #box{
    width: 80px;
    height: 25px;
    line-height: 25px;
    font-size: 14px;
    float: left;
    display: block;
    border: 1px solid #ff0000;
    text-align: center;
    color: #ff0000;
    margin: 20px 0 20px 85px;
    border-radius: 3px;
    cursor: pointer;
  }
  #btn1{
    width: 120px;
    height: 35px;
    line-height: 35px;
    float: left;
    text-align: center;
    margin-left: 50px;
    margin-top: 20px;
    border-radius: 25px;
    cursor: pointer;
    border: 1px solid #e57339;
  }
  .addclass{background: #e57339;color: #fff;}

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
    float: left;
    margin-top: -13px;
    background: #fff;
  }
  #bnt2{
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
</style>
