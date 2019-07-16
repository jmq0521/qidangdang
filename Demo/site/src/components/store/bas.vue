<template>
  <div id="bas">
    <div class="top">
      <a id="a-one">商家设置</a>
      <!-- <a id="a-two">基本设置</a>
      <a id="a-three">商家服务</a> -->
    </div>
    <div id="pane-one">
      <p id="tit" :style="{display:status==2?'block':'none'}">{{content}}</p>
      <form id="one-form">
        <div><mark>*</mark><span>商家名称</span><input type="text" v-model="store_name" autocomplete="off"/></div>
        <div><mark>*</mark><span>负责人名</span><input type="text" v-model="name" :disabled="disabled" autocomplete="off"/></div>
        <div><mark>*</mark><span>手机号</span><input type="text" v-model="phone" :disabled="disabled" autocomplete="off"/></div>
        <div><mark>*</mark><span>商家类别</span>
          <select id="s" v-model="id" @change="getSte(id)" :disabled="disabled">
            <option v-for="item in sele" :value="item.id" :key="item.id" id="options" >{{item.name}}</option>
          </select>
           <select id="ss" :disabled="disabled">
            <option v-for="item in sel" :value="item.id" :key="item.id">{{item.name}}</option>
          </select>
        </div>
        <div><mark>*</mark><span>人均消费</span><input type="text" v-model="consumption_by_persion" :disabled="disabled" autocomplete="off"/></div>
        <div>
          <mark>*</mark>
          <span>营业时间</span>
          <el-time-select
            :disabled="disabled"
            placeholder="起始时间"
            style="margin:-20px 0 0 -10px;width:130px;"
            v-model="startTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00'
            }">
          </el-time-select>
          <el-time-select
            :disabled="disabled"
            placeholder="结束时间"
            style="margin:-20px 0 0 15px;width:120px;"
            v-model="endTime"
            :picker-options="{
              start: '00:00',
              step: '00:15',
              end: '24:00',
            }">
          </el-time-select>
          <a>时间格式：9:00-21:00桌号在营业时间内有效</a>
        </div>
        <div><mark>*</mark><span>联系电话</span><input type="text" v-model="contact_telephone" :disabled="disabled" autocomplete="off"/></div>
        <div><mark>*</mark><span>QQ</span><input type="text" v-model="qq" :disabled="disabled" autocomplete="off"/></div>
        <div><mark>*</mark><span>营业执照</span>
          <form id="p-img" style="position: relative">
            <el-upload
              :disabled="disabled"
              action="http://qddapi.lsybk.com/api/v1/system/uploadImg"
              :headers="{'token':'MTU3ODg3NzM2N7GIfpaG3bmwhtCJqa-GeXE'}"
              list-type="picture-card"
              name="img"
              methods="post"
              :limit="3"
              :file-list="fileList"
              :on-preview="handlePictureCardPreview"
              :on-success="success"
              :on-remove="handleRemove">
              <i class="el-icon-plus"></i>
						</el-upload>
						<el-dialog :visible.sync="dialogVisible"  style="text-align: center">
              <img  height="100%" :src="dialogImageUrl" alt="">
						</el-dialog>
          </form>
          <a style="color:#ff0000">*三张图片必为营业执照与身份证正反面</a>
        </div>
        <div><mark>*</mark><span>商家简介</span>
          <textarea id="p-shop" v-model="store_description_info" ></textarea>
        </div>
        <div><mark>*</mark><span>所在地区</span>
          <select v-model="pro" @change="getCity(pro)" id="s1" :disabled="disabled">
            <option value="">请选择省份</option>
            <option v-for="item in province" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
          </select>
          <select v-model="cit" @change="getDis(cit)" id="s2" :disabled="disabled">
            <option value="">请选择城市</option>
            <option v-for="item in city" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
          </select>
          <select v-model="dist" id="s3" :disabled="disabled">
            <option value="">请选择区县</option>
            <option v-for="item in dis" :value="item.Code" :key="item.Code">{{item.AreaName}}</option>
          </select>
        </div>
        <div><mark>*</mark><span>详细地址</span><input type="text" style="width:285px" v-model="address" :disabled="disabled" autocomplete="off"/></div>
        <!-- <div id="map">
          <mark>*</mark>
          <span>地理坐标</span>
          <div class="baidumap" id="allmap" style="display:none"></div>
          <input type="text" id="lng" v-model="lng" style="margin-left:0;"/>经度<input type="text" id="lat" v-model="lat"/>纬度
        </div> -->
        <!-- <div id="box" @click="addStore()">保存</div> -->
        <el-button id="box" type="primary" :loading="isLoading" @click="addStore()">保存</el-button>
      </form>

      <div id="one-right">
        <el-upload
          action="http://qddapi.lsybk.com/api/v1/system/uploadImg"
          list-type="picture-card"
          name="img"
          methods="post" 
          :headers="{'token':'MTU3ODg3NzM2N7GIfpaG3bmwhtCJqa-GeXE'}"
          :on-success="ImgSuccess"
          :show-file-list="false">
          <img :src="img?img:require('../../image/bas.png')" class="avatar">
        </el-upload>
        <p>此处为您的商家标志，显示在店铺信息栏里，建议尺寸<mark>500*500</mark>像素</p>
      </div>

      <div id="two-right" style="position: relative;">
        <el-upload
          action="http://qddapi.lsybk.com/api/v1/system/uploadImg"
          list-type="picture-card"
          name="img"
          methods="post" 
          :headers="{'token':'MTU3ODg3NzM2N7GIfpaG3bmwhtCJqa-GeXE'}"
          :on-success="ImgSucc"
          :show-file-list="false">
          <img :src="imgs?imgs:require('../../image/bas.png')" class="avatar">
        </el-upload>
        <p>此处为您的店铺招牌，将作为商城背景，建议尺寸<mark>400*80</mark>像素</p>
      </div>
    </div>

    <div id="pane-two">
      <div id="two">
        <h4>餐具税金</h4>
        <div id="two-bottom">
          <p>餐具费用：<mark>0</mark></p>
          <button id="btn">修改</button>
          <p><input type="checkbox" id="check" checked>启用</p>
          <p><input type="checkbox" class="check">关闭</p>
          <div class="btn">保存</div>
        </div>
      </div>
    </div>

    <div id="pane-three">
      <div id="three-left">
        <h4>税率</h4>
        <div id="left-bottom">
          <span>开</span>
          <el-switch
            v-model="value1"
            active-color="#ff4949"
            inactive-color="#13ce66">
          </el-switch>
          <span>关</span>
          <div id="left">
            <p>税率=</p>
            <div id="left-one"><input type="text" value="0"/><div id="one-top"></div><div id="one-down"></div></div>
            <p>%&nbsp;&nbsp;(只能输入整数)</p>
          </div>
          <p id="left-p">订单总额=订单金额+订单金额*(税率+服务费)</p>
          <div id="btn1">保存</div>
        </div>
      </div>
      <div id="three-left">
        <h4>服务费</h4>
        <div id="left-bottom">
          <span>开</span>
          <el-switch
            v-model="value1"
            active-color="#ff4949"
            inactive-color="#13ce66">
          </el-switch>
          <span>关</span>
          <div id="left">
            <p>服务费=</p>
            <div id="left-one"><input type="text" value="0"/><div id="one-top"></div><div id="one-down"></div></div>
            <p>%&nbsp;&nbsp;(只能输入整数)</p>
          </div>
          <p id="left-p">订单总额=订单金额+订单金额*(税率+服务费)</p>
          <div id="btn1">保存</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
      name: "bas",
      data() {
        return {
          value1:false,
          value2:false,
          Visible:false,
          isLoading:false,
          disabled:false,
          dialogVisible: false,
          id:'',
          sele:[],
          sel:[],
          pro:'',
          cit:'',
          dist:'',
          province:[],
          city:[],
          dis:[],
          ImageUrl: '',
          store_name: '',
          consumption_by_persion:"",
          store_start_time:"",
          store_end_time:"",
          startTime:'',
          endTime:'',
          store_description_info:"",
          contact_telephone:"",
          qq:"",
          address:"",
          msg:'',
          img:'',
          imgs:'',
          business_license_one:'',
          business_license_two:'',
          business_license_third:'',
          name:"",
          phone:"",
          lng: '',
          lat: '',
          status:'',
          content:'',
          dialogImageUrl:'',
          Url:'',
          fileList: [],
        }
      },
      methods:{
        handleRemove(file, fileList) {
          console.log(file, fileList);
          this.fileList.shift();
          console.log(this.fileList.length,4566);
        },
        handlePictureCardPreview(file) {
					this.dialogImageUrl = file.url;
					this.dialogVisible = true;
        },
        success(response, file, fileList){
          this.Url = response.data[0].img_url;
          var img = {url: response.data[0].img_url}
          this.fileList.push(img)
          console.log(response)
        },

        ImgSuccess(response, file, fileList){
          this.img =  response.data[0].img_url;
          console.log(response)
        },
        ImgSucc(response, file, fileList){
          this.imgs =  response.data[0].img_url;
          console.log(response)
        },

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

         //百度地图
        // baiduMap:function(){
        //   const _this = this;
        //   var map=new BMap.Map("allmap");
        //   var point=new BMap.Point(_this.lng,_this.lat);
        //   var marker=new BMap.Marker(point);
        //   map.centerAndZoom(point,15);
        //   map.addEventListener("click",function(e){
        //     _this.lng=e.point.lng;
        //     _this.lat=e.point.lat;
        //   map.enableScrollWheelZoom(true),
        //   map.enableContinuousZoom(true),
        //   marker.enableDragging(true),
        //   map.addOverlay(marker)
        //  })
        // },

        handler () {
          let _this = this;   // 设置一个临时变量指向vue实例，因为在百度地图回调里使用this，指向的不是vue实例；
          var geolocation = new BMap.Geolocation();
          geolocation.getCurrentPosition(function(r){
              _this.center = {lng: r.longitude, lat: r.latitude};     // 设置center属性值
              _this.lng=r.longitude;
              _this.lat=r.latitude;
              console.log('center:',_this.lng, _this.lat)    // 如果这里直接使用this是不行的
        },{enableHighAccuracy: true}) },



        //商家设置上传
        addStore(){
          if(localStorage.is_audit==0 || localStorage.is_audit==2){
            var select = document.getElementById("s");
            var select4 = document.getElementById("ss");
            var select1 = document.getElementById("s1");
            var select2 = document.getElementById("s2");
            var select3 = document.getElementById("s3");
            let options = select.options;
            let index = select.selectedIndex;
            let options4 = select4.options;
            let index4 = select4.selectedIndex;
            let options1 = select1.options;
            let index1 = select1.selectedIndex;
            let options2 = select2.options;
            let index2 = select2.selectedIndex;
            let options3 = select3.options;
            let index3 = select3.selectedIndex;
            if(this.imgs==null){
              this.$message({
                message: '缺少店铺招牌信息',
                type: 'warning'
              })
            };
            if(this.fileList.length==3){
              if(this.imgs!=null){
                this.$ajax.post("/user/uploadUserInfo",{
                  store_name:this.store_name,
                  business_license_one:this.fileList[0].url,
                  business_license_two:this.fileList[1].url,
                  business_license_third:this.fileList[2].url,
                  consumption_by_persion:this.consumption_by_persion,
                  one_classify_id:options[index].value,
                  second_classify_id:options4[index4].value,
                  store_start_time:this.startTime,
                  store_end_time:this.endTime,
                  contact_telephone:this.contact_telephone,
                  qq:this.qq,
                  store_description_info:this.store_description_info,
                  province_id:options1[index1].value,
                  city_id:options2[index2].value,
                  county_id:options3[index3].value,
                  address:this.address,
                  longitude:this.lng,
                  latitude:this.lat,
                  principal_phone:this.phone,
                  nick_name:this.name,
                  store_picture_url:this.img,
                  store_img:this.imgs,
                },{
                  headers: {
                    'token' :localStorage.token
                  }}).then(data=>{
                  this.$message({
                    message: data.msg,
                    type: 'warning'
                  }); 
                  if(data.msg=='成功'){
                    this.$message({
                      message: data.msg,
                      type: 'success'
                    });
                    this.$router.push('/')
                  }
                });
              }
            }else{
              this.$message({
                message: '警告哦，必须上传三张图片',
                type: 'warning'
              })
            }   
          }else if(localStorage.is_audit==1){
            this.$ajax.post("/user/update-user-store-ionfo",{
              store_name:this.store_name,
              store_picture_url:this.img,
              store_img:this.imgs,
              store_description_info:this.store_description_info,
            },{
              headers: {
                'token' :localStorage.token
              }}).then(data=>{
              this.$message({
                message: data.msg,
                type: 'success'
              });
            });
          }else if(localStorage.is_audit==3){
            this.$message({
              message: '审核中,不能修改',
              type: 'warning'
            });
          }
        },

        //显示商户信息
        getStore(){
          this.$ajax.post("/user/userStoretInfo",{},{
            headers: {
              'token' :localStorage.token
            }}).then(data=>{
            this.store_name=data.data.store_name;
            this.consumption_by_persion=data.data.consumption_by_persion;
            this.startTime=data.data.store_start_time;
            this.endTime=data.data.store_end_time;
            this.contact_telephone=data.data.contact_telephone;
            this.store_description_info=data.data.store_description_info;
            this.qq=data.data.qq;
            this.address=data.data.address;
            this.img=data.data.store_picture_url;
            this.imgs=data.data.store_img;
            this.business_license_one=data.data.business_license_one;
            this.business_license_two=data.data.business_license_two;
            this.business_license_third=data.data.business_license_third;
            this.phone=data.data.principal_phone;
            this.name=data.data.nick_name;
            this.lng=data.data.longitude;
            this.lat=data.data.latitude;
            this.pro=data.data.province_id;
            this.cit=data.data.city_id;
            this.dist=data.data.county_id;
            this.id= data.data.store_category_id,
            this.status=data.data.status;
            this.content=data.data.refuse_reason;
						console.log(this.fileList.length,4566);
            this.getSte(data.data.store_category_id);
            this.getCity(data.data.province_id);
            this.getDis(data.data.city_id);
						if(this.fileList.length==0){
              if(data.data.business_license_one!=''){
                var img1 = {url: data.data.business_license_one}
                var img2 = {url: data.data.business_license_two};
                var img3 = {url: data.data.business_license_third};
                this.fileList.push(img1,img2,img3);
                if(localStorage.is_audit==1){
                  $('#p-img .el-upload--picture-card').css("display","none");
                }
              }
              console.log(this.fileList.length,45666);
              console.log(this.imgs);
            };
          })
        },  

         //显示商家一级分类
        getSto(){
          this.$ajax.post("/user/userStoretCategory",{}).then(data=>{
            this.sele=data.data;
            // console.log(123,this.sele)
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
        this.getCenter();
        this.getStore();
        this.getSto();
        this.getPro(0);
        this.handler();
        if(localStorage.is_audit==1){
          this.disabled=true;
        }
        $('#a-one').click(function(){
          $(this).css("border-bottom","2px solid #ff0000");
          $('#a-two').css("border-bottom","");
          $('#pane-one').css("display","block"),
          $('#pane-two').css("display","none")
          $('#pane-three').css("display","none")
        });
        $('#a-two').click(function(){
          $(this).css("border-bottom","2px solid #ff0000");
          $('#a-one').css("border-bottom","none");
          $('#a-three').css("border-bottom","");
          $('#pane-two').css("display","block"),
            $('#pane-one').css("display","none")
          $('#pane-three').css("display","none")
        });
        $('#a-three').click(function(){
          $(this).css("border-bottom","2px solid #ff0000");
          $('#a-two').css("border-bottom","");
          $('#pane-three').css("display","block"),
            $('#pane-one').css("display","none"),
            $('#pane-two').css("display","none")
        })

      }
    }
</script>

<style scoped>
.baidumap{
    height:250px;
    width: 450px;
    display: inline-block;
    top: -15px;
  }
  #one-form #map #lng{
    width: 80px;
    margin: 5px 0 0 80px;
  }
  #one-form #map #lat{
    width: 80px;
    margin: 5px 0 0 80px;
  }
  #bas{
    width: 1020px;
    min-height: 640px;
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
    margin-left: 15px;
    cursor: pointer;
  }
  .top #a-two{
    margin-left: 30px;
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    float: left;
    color: #313131;
    cursor: pointer;
  }
  .top #a-three{
    margin-left: 30px;
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    float: left;
    color: #313131;
    cursor: pointer;
  }
  #pane-one{
    width: 100%;
    min-height: 600px;
    float: left;
    background: #fff;
    margin-bottom: 20px;

  }
  #one-form{
    width: 650px;
    float: left;
    min-height: 740px;
    padding-left: 80px;
    box-sizing: border-box;
  }
  #one-form div{
    font-size: 14px;
    color: #313131;
    margin-top: 20px;
    float: left;
  }
  #one-form div mark{color: #ff0000;background: #fff;float: left;margin-top: 4px;margin-right: 5px;}
  #one-form div span{width: 80px;float: left;margin-top:2px}
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
    background: #fff;
    }
  #one-form div:nth-of-type(6) input{width: 92px;}
  #one-form div select{
    color:#b2b2b2;
    width: 140px;
    height:25px;
    font-size: 12px;
    border: 1px solid #d2d2d2;
    border-radius: 3px;
    outline: none;
  }

  #one-form div #s1{width: 114px;}
  #one-form div #s2{width: 114px;}
  #one-form div #s3{width: 114px;}
  #one-form div a{
    font-size: 12px;
    float: left;
    color: #cecece;
    margin-left: 87px;
  }
  #one-form div #p-img{
    width: 350px;
    height: 100px;
    float: left;
    color: #ff0000;
    border: 1px solid #dcdcdc;
    border-radius: 3px;
  }
  #one-form div #p-img button{
    width: 80px;
    height: 25px;
    margin-top: 15px;
    color: #fff;
    margin-left: 25px;
    margin-right: 15px;
    border: 0;
    background: #ff0000;
    font-size: 14px;
  }
  #one-form div #p-shop{
    width: 352px;
    height: 115px;
    float: left;
    padding: 5px 0 0 5px;
    box-sizing: border-box;
    border: 1px solid #dcdcdc;
    border-radius: 3px;
    resize:none;
    outline: none;
    background: #fff;
  }
  #one-form div #p-shop p{font-size: 12px;line-height: 20px;}
  #one-form #box{
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    float: left;
    display: block;
    background: #ff0000;
    text-align: center;
    color: #fff;
    margin: 20px 0 20px 85px;
    border-radius: 2px;
    cursor: pointer;
    border: none;
  }
  #one-right{
    width: 230px;
    height: 280px;
    float: left;
    margin: 25px 0 0 90px;
  }
  #one-right p{font-size: 12px;width: 180px;margin-left:10px}
  #one-right p mark{
    color: #ff0000;
    background: #fff;
  }

  #two-right{
    width: 230px;
    height: 320px;
    float: left;
    margin: 25px 0 0 90px;
  }
  #two-right p{font-size: 12px;width: 190px;margin-left:10px}
  #two-right p mark{
    color: #ff0000;
    background: #fff;
  }










  #pane-two{
    width: 100%;
    height: 600px;
    float: left;
    display: none;
    background: #fff;
    margin-bottom: 20px;
  }
  #pane-two #two{
    width: 395px;
    height: 275px;
    margin: 50px auto;
  }
  #two h4{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    background: #ff0000;
    color: #fff;
  }
  #two #two-bottom{
    width: 99.5%;
    height: 230px;
    border: 1px solid #e5e5e5;
    border-top: 0;
  }
  #two-bottom p:nth-of-type(1){
    font-size: 14px;
    font-weight: bold;
    color: #313131;
    float: left;
    margin: 50px 0 0 115px;
  }
  #two-bottom p:nth-of-type(1) mark{color: #ff0000;background: #fff;}
  #two-bottom #btn{
    width: 40px;
    height: 20px;
    border: 0;
    border: 1px solid #19acf7;
    font-size: 12px;
    color: #19acf7;
    background: #fff;
    margin: 50px 0 0 -50px;
    border-radius: 2px;
  }
  #two-bottom p:nth-of-type(2){
    font-size: 14px;
    font-weight: bold;
    color: #313131;
    float: left;
    margin: 90px 0 0 -90px;
  }
  p:nth-of-type(2) #check{
    width: 15px;
    height: 15px;
  }
  #two-bottom p:nth-of-type(3){
    font-size: 14px;
    font-weight: bold;
    color: #313131;
    float: left;
    margin: 90px 0 0 50px;
  }
  p:nth-of-type(3) .check{
    width: 15px;
    height: 15px;
  }
  #two-bottom .btn{
    width: 160px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    display: block;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    background: #ff0000;
    color: #fff;
    margin: 40px 0 0 120px;
    float: left;
    border: 0;
  }
  #pane-three{
    width: 100%;
    height: 600px;
    float: left;
    display: none;
    background: #fff;
    margin-bottom: 20px;
  }
  #pane-three #three-left{
    width: 300px;
    height: 275px;
    float: left;
    margin: 50px 0 0 140px;
  }
  #three-left h4{
    height: 45px;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    background: #ff0000;
    color: #fff;
  }
  #three-left #left-bottom{
    width: 99.5%;
    height: 230px;
    border: 1px solid #e5e5e5;
    border-top: 0;
  }
  #left-bottom span:nth-of-type(1){
    font-size: 14px;
    font-weight: bold;
    float: left;
    margin: 25px 35px 0 85px;
  }
  #left-bottom span:nth-of-type(2){
    font-size: 14px;
    font-weight: bold;
    float: left;
    margin: 5px 35px 0 85px;
  }
  #left-bottom #left{
    width: 100%;
    margin-top: 25px;
    height: 25px;
    float: left;
    font-size: 12px;
    font-weight: bold;
    padding-left: 45px;
    box-sizing: border-box;
  }
  #left p:nth-of-type(1){float: left;}
  #left #left-one{float: left;margin-top: -5px;}
  #left-one input{
    width: 60px;
    height: 23px;
    line-height: 23px;
    margin-left: 8px;
    margin-right: 8px;
    float: left;
  }
  #left #one-top{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 55px;
    top: 1px;
    border-style: solid;
    border-color: #fff #fff #d2d2d2 #fff;
  }
  #left #one-down{
    width: 0;
    height: 0;
    border-width: 5px;
    position: relative;
    left: 55px;
    top: 2px;
    border-style: solid;
    border-color: #d2d2d2 #fff #fff #fff;
  }
  #left-bottom #left-p{
    margin: 15px 0 0 45px;
    font-size: 12px;
    width: 195px;
    float: left;
    height: 30px;
    color: #686868;
  }
  #left-bottom #btn1{
    width: 160px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    display: block;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    background: #ff0000;
    color: #fff;
    margin: 40px 0 0 70px;
    float: left;
    border: 0;
  }
  #left-bottom #btn2{
    width: 160px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    display: block;
    font-size: 14px;
    font-weight: bold;
    border-radius: 5px;
    background: #ff0000;
    color: #fff;
    margin: 40px 0 0 70px;
    float: left;
    border: 0;
  }
  #tit{
    width: 1000px;
    border-bottom: 1px solid #ff0000;
    color: #ff0000;
    font-size: 12px;
    margin: 10px auto;
  }
</style>
<style>
  .el-upload--picture-card{
    width: 70px;
    height: 70px;
    margin: -10px 0 0 10px;
    line-height: 80px;
  }
  #one-right .el-upload--picture-card{
    width: 180px;
    height: 180px;
    border: 0;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  #one-right .el-upload--picture-card img{
    width: 100%;
    height: 100%;
    border-radius: 50%; 
  }


  #two-right .el-upload--picture-card{
    width: 180px;
    height: 90px;
    border: 0;
    margin-bottom: 10px;
  }
  #two-right .el-upload--picture-card img{
    width: 100%;
    height: 100%;
  }



</style>
