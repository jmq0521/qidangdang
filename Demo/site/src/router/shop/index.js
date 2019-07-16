import ShopIndex from "@/components/shopindex/index"
import List from "@/components/list/index"
import Li from "@/components/li/index"
import Pay from "@/components/pay/payup"
import Sale from "@/components/sale/index"
import Band from "@/components/band/index"
export default[
  {
    path: '/pay',
    name: 'shopindex',
    meta: {
      title: '企铛铛'
    },
    component: ShopIndex
  },
  {
    path: '/lis',
    name: 'list',
    meta: {
      title: '企铛铛'
    },
    component: List
  },
  {
    path: '/li',
    name: 'li',
    meta: {
      title: '企铛铛',
      keepAlive: true  // 通过此字段判断是否需要缓存当前组件  
    },
    component: Li,
  },
  {
    path: '/',
    name: 'pay',
    meta: {
      title: '企铛铛',
    },
    component: Pay
  },
  {
    path: '/sale',
    name: 'sale',
    meta: {
      title: '销量排行',
      keepAlive: true,
    },
    component: Sale,
  },
  {
    path: '/band',
    name: 'band',
    meta: {
      title: '新品排行',
      keepAlive: true,
    },
    component: Band
  },
]

