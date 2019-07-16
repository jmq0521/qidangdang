import Subpay from "@/components/sub/index"
import Wechat from "@/components/sub/wechat"
export default[
  {
    path: '/subpay',
    name: 'subpay',
    meta: {
      title: '订单支付'
    },
    component: Subpay
  },
  {
    path: '/wechat',
    name: 'wechat',
    meta: {
      title: '微信支付'
    },
    component: Wechat
  }
]

