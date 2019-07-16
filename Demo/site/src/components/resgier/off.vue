<template>
  <div id="off-warp">
    <div id="off">
      <Top></Top>
      <div id="off-bottom">
        <div id="bottom-box">
          <div id="box">
            <h3>关于企铛铛</h3>
            <div id="box-one">
              <h4>专注企业礼品采购</h4>
              <p>企铛铛致力于打造精品B2B礼品共享采购第一平台，免费共享上千家优质产品供应渠道， 所有产品均厂家底价直供、支持B店同款比价、全部实行三包政策，并提供全国8大仓储物流支持，降低库存风险。 </p>
            </div>
            <div id="box-one">
              <h4>六大核心功能|解决企业及实体店面营销瓶颈</h4>
              <p>企铛铛针对市场现状，为企业及实体店面搭建从“优质产品采购、仓储物流、到平台功能定制”的一站式兑换券礼品营销平台。 涵盖：优质产品厂价直购、超低费率扫码支付、自定义兑换券礼品兑换、一线品牌省钱购物、卡券储值系统、预约服务系统六大核心功能。 帮助企业及实体店面升级营销运营模式，让新客户快速变成老客户，增加营业额，全面提升核心竞争力。 </p>
            </div>
            <div id="box-one">
              <h4>合生&nbsp;共生&nbsp;合赢&nbsp;共赢</h4>
              <p>未来三年，全国孵化1000个“互联网+”项目，服务600万个线下采购端，帮助100万个行业精英成就互联网创业梦，携手共同缔造你和我的互联网传奇！ </p>
            </div>

          </div>
        </div>
      </div>
    </div>
    <Foot></Foot>
  </div>

</template>
<script>
  import Foot from "../common/foot"
  import Top from "../common/top"
  export default {
    name: "off",
    components:{
      Top,
      Foot
    }
  }
</script>

<style scoped>
  #off-warp{width: 100%;background: url("../../image/resgier02.png") no-repeat 0 80px;background-size:cover;}
  #off{width: 1200px;margin: 0 auto;}
  #off #off-bottom{width: 1200px;height: 690px;}
  #off-bottom #bottom-box{
    width: 100%;
    height: 590px;
    margin-top: 35px;
    background: #fff;
    float: left;
  }
  #bottom-box #box{
    width: 1085px;
    height: 500px;
    margin: 40px auto;
    background: #fff;
    border: 1px solid #dcdcdc;
    border-radius: 15px;
  }
  #box h3{
    height: 110px;
    line-height: 110px;
    font-size: 22px;
    font-weight: bold;
    color: #313131;
    text-align: center;
  }
  #box #box-one{margin-top: 30px;}
  #box-one h4{
    font-size: 14px;
    font-weight: bold;
    text-indent: 30px;
    color: #313131;
  }
  #box-one p{
    font-size: 14px;
    font-weight: bold;
    margin-left: 30px;
    color: #626262;
    line-height: 20px;
    width: 950px;
  }
</style>
