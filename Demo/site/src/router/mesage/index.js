import Mesage from "@/components/mesage/index"
import Pay from "@/components/pay/payup"
export default[
  {
    path: '/mesage',
    name: 'mesage',
    meta: {
      title: '订单确认'
    },
    component: Mesage
  },
  {
    path: '/payup',
    name: 'payup',
    component: Pay
  },
]

