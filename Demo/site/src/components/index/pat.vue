<template>
  <div id="pat">
    <div class="top">
      <h4>支付设置</h4>
    </div>
    <form id="pat-bottom">
      <div id="bottom">
        <span>微信支付</span>
        <div id="box">
          <p>你必须向微信公众平台提交企业以及银行账户资料，审核并签约后才能使用微信支付功能。</p>
          <p style="color: #19acf7">申请及详情查看这里</p>
          <p>微信支付的接口说明如下：</p>
          <p>JS API网页支付参数</p>
          <p>支付授权目录：https://www.qidangdang.com/order/weixinPay</p>
        </div>
      </div>
      <div><span>公众号(AppId)</span><mark>*</mark><input type="text" /></div>
      <div><span>支付商户号(Mch_Id)</span><mark>*</mark><input type="text" /></div>
      <div><span>支付密钥(APIKEY)</span><mark>*</mark><input type="text" />
        <a>服务商的APIKEY，并不是子商户的APIKEY</a>
      </div>
      <div><span>APPSECRTE</span><mark>*</mark><input type="text" /></div>

      <div><span>CERT证书文件</span><mark>*</mark><input type="file" />
        <a><mark>未上传</mark> 下载证书 cert.zip 中的apiclient_key.pem 文件</a>
      </div>
      <div><span>LEY密钥文件</span><mark>*</mark><input type="file" />
        <a><mark>未上传</mark> 下载证书 cert.zip 中的apiclient_key.pem 文件</a>
      </div>
      <div><span>ROOT文件</span><mark>*</mark><input type="file" />
        <a><mark>未上传</mark> 下载证书 cert.zip 中的rootca.pem 文件，新下载证书无需上传此文件！</a>
      </div>
      <div id="btn">保存</div>
    </form>
  </div>
</template>

<script>
  export default {
    name: "us",
  }
</script>

<style scoped>
  #pat{
    width: 1010px;
    height: 600px;
    margin-bottom: 20px;
    border-top: 5px solid #626262;
    margin-top: 10px;
  }
  .top{height: 50px;background: #ffffff;}
  .top h4{
    text-indent: 30px;
    font-size: 14px;
    line-height: 50px;
    float: left;
    color: #313131;
  }
  #pat #pat-bottom{
    width: 100%;
    height: 755px;
    margin-top: 5px;
    float: left;
    background: #ffffff;
    margin-bottom: 20px;
  }
  #pat-bottom #bottom{width: 100%;height: 160px;}
  #pat-bottom #bottom span{
    font-size: 14px;
    width: 170px;
    text-align: right;
    color: #616161;
    font-weight: bold;
    float: left;
    margin: -10px 0 0 10px;
  }
  #pat-bottom #bottom #box{
    width: 715px;
    height: 160px;
    background: #fffde3;
    float: left;
    margin: -10px 0 0 20px;
  }
  #bottom #box p{
    font-size: 14px;
    margin-top: 5px;
    text-indent: 20px;
  }
  #pat-bottom div{
    font-size: 14px;
    color: #616161;
    margin-top: 25px;
  }
  #pat-bottom div span{width: 170px;line-height:30px;display: inline-block;font-weight: bold;text-align: right;float: left;}
  #pat-bottom div mark{color: #ff0000;background: #ffffff;float: left;margin-top: 8px}
  #pat-bottom div input{width: 200px;height: 30px;margin-left: 25px;}
  #pat-bottom div a{
    font-size: 12px;
    display: block;
    color: #626262;
    margin: 5px 0 0 200px;
  }
  #pat-bottom div a mark{margin: 0px 5px 0 0;}
  #pat-bottom #btn{
    width: 120px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    float: left;
    display: block;
    background: #ff0000;
    text-align: center;
    color: #ffffff;
    margin: 20px 0 20px 195px;
    border-radius: 5px;
    cursor: pointer;
  }
</style>
