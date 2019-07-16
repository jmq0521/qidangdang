<template>
  <div id="app">
    <!-- <router-view></router-view> -->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import './iconfont/iconfont.css'
  export default {
    name: 'App',
    data(){
      return{
      }
    },
    methods:{
      
    },
    mounted(){
  
    }
  }
</script>
<style>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
    text-decoration: none;
    /* font-family: "Arial"; */
    font-family: 'PingFang SC';
  }
  /* 表格 */
  .el-table th{background: #f6f6f6;text-align: left;}
  .el-table th > .cell{color: #313131;}
  .el-table--enable-row-transition .el-table__body td{text-align: left;font-size: 12px}






  .el-menu-item.is-active{color: #e57339;background:#fff}
  .el-menu-item:hover{background-color: #fbe4dc;color: #e57339}
  .el-menu-item-group>ul{background: #fff}
  .el-submenu__title.is-active{color: #e57339;background:#fff}
  .el-submenu__title:hover{background-color: #fff;color: #e57339!important}
  .el-submenu .is-active{color: #e57339;}
  .el-submenu.is-active .el-submenu__title {border-bottom: 1px solid #f8f8f8}




  .el-submenu__title i{
    font-size: 13px;
    color: #313131;
    margin-top: -5px;
    margin-left: 5px;
    margin-right: 5px !important;
  }
  



.el-submenu__title{
  height: 45px;
  line-height: 45px;
  padding: 0 0 !important;
  font-size: 13px;
  color: #333;
  box-sizing: border-box;
  border-bottom: 1px solid #f8f8f8;
  width: 120px;
  margin-left: 25px;
} 
.el-submenu .el-submenu__title:last-of-type{border-bottom: none;}
 
.el-submenu__icon-arrow {right: 5px;}


.el-submenu .el-menu-item {
    min-width: 0;
    font-weight: normal;
    height: 40px;
    line-height: 40px;
    padding-left: 50px !important;
}


  /* 日期 */
  .el-input__inner{
    height: 26px;
    line-height: 26px;
    margin: 20px 0 0 10px;
    border: 0;
    border: 1px solid #e5e5e5;
    color: #313131;
    width: 140px;
    font-size: 12px;
    border-radius: 0;
  }
  .el-input--prefix .el-input__inner{padding-left: 10px;padding-right: 10px;color: #000;}
  .el-input__prefix, .el-input__suffix{display: none;}

  .el-date-editor.el-input{width: 140px;}
  .el-input__prefix{left: 12px;top: 10px;}
  .el-submenu .el-menu-item{min-width: 0;font-weight: normal;height: 40px;line-height: 40px;}
  .el-submenu__icon-arrow{margin-top: -6px;}
  .el-input-number__decrease{
    width: 20px;
    height: 22px;
    top: 22px;
    left: 28px;
  }
  .el-input-number__increase{
    width: 20px;
    height: 22px;
    top: 22px;
    right: 16px;
  }
  .el-input-number {line-height: 25px;}
  .el-input-number .el-input__inner{padding-left: 30px;padding-right: 30px;line-height: 30px;}
   
  /* 按钮 */
  .el-button{
    height: 30px;
    min-width: 70px;
    padding: 0;
    padding-left:10px;    
    padding-right:10px;
    box-sizing: border-box;
    line-height: 30px;
    text-align: center;
  }
  /* 弹框 */
  .el-dialog__body{
    max-height:350px;
    overflow: auto;
    padding: 0 20px 25px 20px;
  }
  .el-dialog__footer{height: 60px;}


  /* 上传图片 */
  .el-upload-list--picture-card .el-upload-list__item {
    width: 70px;
    height: 70px;
    margin: -10PX 0px 8px 12px;
  }
  


 
 
  .el-button:focus, .el-button:hover {
    color: #313131;
    border-color: #c6e2ff;
    background-color: #fff;
  }



</style>

