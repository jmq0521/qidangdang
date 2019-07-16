import Det from "@/components/detail/det"
import Dett from "@/components/detail/dett"
import Detail from "@/components/detail/detail"
import Detai from "@/components/detail/detai"
export default[
  {
    path: '/det',
    name: 'det',
    meta: {
      title: 'B2B-订单详情',
    },
    component: Det
  },
  {
    path: '/dett',
    name: 'dett',
    meta: {
      title: 'B2B-订单详情'
    },
    component: Dett
  },
  {
    path: '/detail',
    name: 'detail',
    meta: {
      title: '提交预选区',
    },
    component: Detail,
  },
  {
    path: '/detai',
    name: 'detai',
    component: Detai
  }
]

