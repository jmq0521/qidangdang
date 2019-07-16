<template>
  <div id="el-warp">
    <el-container>
      <el-aside width="170px" style="min-height: 600px;">
        <el-menu>
          <el-submenu index="2">
          <template slot="title" height="45px" class="is-active"><i class="iconfont">&#xe60e;</i>财务管理</template>
            <el-menu-item index="2-1" @click="$router.push('/fin')">提现明细</el-menu-item>
            <el-menu-item index="2-2" @click="$router.push('/dep')">财务明细</el-menu-item>
            <el-menu-item index="2-3" @click="$router.push('/srd')">续费记录</el-menu-item>
            <el-menu-item index="2-4" @click="$router.push('/bank')">银行卡信息</el-menu-item>
            <el-menu-item index="2-5" @click="$router.push('/reset')">支付密码设置</el-menu-item>
          </el-submenu>
          <el-submenu index="10" :style="{display:type<=2?'none':'block'}">
            <template slot="title"><i class="iconfont">&#xe6b9;</i>商家管理</template>
            <el-menu-item index="10-1" @click="$router.push('/vitt')">商家信息</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="iconfont">&#xe60e;</i>会员管理</template>
            <el-menu-item index="3-1" @click="$router.push('/list')">会员列表</el-menu-item>
            <!--<el-menu-item index="3-2" @click="$router.push('/sav')">储蓄充值</el-menu-item>-->
            <el-menu-item index="3-3" @click="$router.push('/vou')">兑换券充值</el-menu-item>
            <!--<el-menu-item index="3-4" @click="$router.push('/rea')">储值设置</el-menu-item>-->
            <el-menu-item index="3-5" @click="$router.push('/cou')">兑换券设置</el-menu-item>
            <!--<el-menu-item index="3-6" @click="$router.push('/meb')">会员卡设置</el-menu-item>-->
          </el-submenu>
          <el-submenu index="4">
            <template slot="title" @click="$router.push('/wallet')"><i class="iconfont">&#xe601;</i>自定义商城</template>
            <!-- <el-menu-item index="4-1" @click="$router.push('/wallet')">我的钱包</el-menu-item>
            <el-menu-item index="4-2" @click="$router.push('/fre')">运费设置</el-menu-item>
            <el-menu-item index="4-3" @click="$router.push('/pre')">预售商品</el-menu-item> -->
            <el-menu-item index="4-1" @click="money==1?$router.push('/wallet'):$router.push('/img')">我的钱包</el-menu-item>
            <el-menu-item index="4-2" @click="money==1?$router.push('/fre'):$router.push('/img')">运费设置</el-menu-item>
            <el-menu-item index="4-3" @click="money==1?$router.push('/pre'):$router.push('/img')">预售商品</el-menu-item>
            <el-menu-item index="4-4" @click="$router.push('/conv')">兑换订单</el-menu-item>
            <!-- <el-menu-item index="4-5" @click="$router.push('/local')">本地订单</el-menu-item> -->
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="iconfont">&#xe634;</i>我的小店</template>
            <el-menu-item index="5-1" @click="$router.push('/bas')">基本设置</el-menu-item>
              <!-- <el-menu-item index="5-2" @click="$router.push('/clas')">商品分类</el-menu-item> -->
              <!--<el-menu-item index="5-3" @click="$router.push('/cre')">商品创建</el-menu-item>-->
              <!-- <el-menu-item index="5-4" @click="$router.push('/mag')">商品管理</el-menu-item>
              <el-menu-item index="5-5" @click="$router.push('/mak')">预约订单</el-menu-item> -->
              <!-- <el-menu-item index="5-6" @click="$router.push('/order')">订单列表</el-menu-item> -->
            <el-menu-item index="5-7" @click="$router.push('/load')">下载中心</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="iconfont">&#xe600;</i>B2B商品</template>
            <el-menu-item index="6-1" @click="$router.push('/')">采购商品</el-menu-item>
            <el-menu-item index="6-2" @click="$router.push('/pur')">采购订单</el-menu-item>
            <!--<el-menu-item index="6-3" @click="$router.push('/inv')">B2B库存</el-menu-item>-->
            <el-menu-item index="6-4" @click="$router.push('/pur')">售后/退款</el-menu-item>
          </el-submenu>
          <!-- <el-submenu index="7">
            <template slot="title">大转盘</template>
            <el-menu-item index="7-1" @click="$router.push('/set')">奖品设置</el-menu-item>
            <el-menu-item index="7-2" @click="$router.push('/bea')">获奖名单</el-menu-item>
          </el-submenu> -->
          <el-submenu index="8">
            <template slot="title"><i class="iconfont">&#xe8f6;</i>营销工具</template>
            <!-- <el-menu-item index="8-1" @click="$router.push('/cpu')">资源置换</el-menu-item> -->
            <el-menu-item index="8-2" @click="$router.push('/eig')">独孤九剑</el-menu-item>
          </el-submenu>
          <el-submenu index="9">
            <template slot="title" ><i class="iconfont">&#xe641;</i>统计分析</template>
            <el-menu-item index="9-1" @click="$router.push('/memb')">会员统计</el-menu-item>
            <el-menu-item index="9-2" @click="$router.push('/coi')">兑换券统计</el-menu-item>
            <!-- <el-menu-item index="9-3" @click="$router.push('/sto')">储值统计</el-menu-item> -->
            <!-- <el-menu-item index="9-4" @click="$router.push('/car')">购物券统计</el-menu-item> -->
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>

</template>

<script>
  export default {
    name: "center",
    data(){
      return{
        type:localStorage.type,
        //开通自定义商城状态
        money:'',
      }
    },
    methods:{
       //积分商城的开通
      getOpen(){
        this.$ajax.post("/user/is-integral-store",{},{
          headers: {
            'token' :localStorage.token
          }}).then(data=>{
          this.money=data.data.is_integral_store;
        })
      },
    
    },
    mounted(){
      this.getOpen()
    }
    
  }
</script>

<style scoped>
  #el-warp{
    width: 100%;
    background: #f9f9f9;
  }
  .el-container{
    width: 1200px;
    margin: 0 auto;
    border: none;
    background: #f9f9f9;
  }


  .el-aside{overflow: hidden;color: #333;font-size: 12px;margin-top: 5px;}

  .el-main{padding: 0;overflow: visible;margin-left: 10px;margin-top: -5px;}
  .el-menu{
    border: 1px solid #f5f5f5;
    border-top: none;
    padding-top: 10px;
    padding-bottom: 10px;
    box-sizing: border-box;
  }






  
</style>
