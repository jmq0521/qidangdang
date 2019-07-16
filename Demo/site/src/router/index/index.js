import Index from "@/components/index/index"

import Use from "@/components/index/use"
import Code from "@/components/index/code"
import Addre from "@/components/index/addre"
import Address from "@/components/index/address"
import Pat from "@/components/index/pat"

import Center from "@/components/fin/center"
import Bank from "@/components/fin/bank"
import Fin from "@/components/fin/fin"
import Dep from "@/components/fin/dep"
import Srd from "@/components/fin/srd"
import Deposit from "@/components/fin/deposit"
import Reset from "@/components/fin/reset"
import News from "@/components/fin/news"
import Newslist from "@/components/fin/newsList"
import Renew from "@/components/fin/renew"


import Wallet from "@/components/custom/wallet"
import Rec from "@/components/custom/rec"
import Recc from "@/components/custom/recc"
import Fre from "@/components/custom/fre"
import Pre from "@/components/custom/pre"
import Img from "@/components/custom/img"
import Sea from "@/components/custom/sea"
import Recsub from "@/components/custom/recsub"
import Conv from "@/components/custom/conv"
import Local from "@/components/custom/local"

import List from "@/components/member/list"
import Sav from "@/components/member/sav"
import Vou from "@/components/member/vou"
import Rea from "@/components/member/rea"
import Cou from "@/components/member/cou"
import Meb from "@/components/member/meb"

import Bas from "@/components/store/bas"
import Clas from "@/components/store/clas"
import Cre from "@/components/store/cre"
import Mag from "@/components/store/mag"
import Mak from "@/components/store/mak"
import Order from "@/components/store/order"
import Load from "@/components/store/load"

import Pur from "@/components/B2B/pur"
import Inv from "@/components/B2B/inv"

import Set from "@/components/tur/set"
import Bea from "@/components/tur/bea"

import Memb from "@/components/stat/memb"
import Coi from "@/components/stat/coi"
import Sto from "@/components/stat/sto"

import Vitt from "@/components/stat/vitt"
import Num from "@/components/stat/num"
import Crea from "@/components/stat/crea"
import Open from "@/components/stat/open"
import Gopay from "@/components/stat/gopay"
import Tran from "@/components/stat/tran"
import Sub from "@/components/stat/sub"


import Deta from "@/components/detail/deta"

import Cpu from "@/components/mark/cpu"
import Eig from "@/components/mark/eig"


export default[
  {
    path: '/index',
    name: 'index',
    component: Index,
    children:[
      {
        path: '/index',
        meta: {
          title: '系统店铺管理后台',
        },
        name: 'center',
        component: Center
      },
      {
        path: '/renew',
        meta: {
          title: '升级支付'
        },
        name: 'renew',
        component: Renew
      },
      {
        path: '/use',
        name: 'use',
        meta: {
          title: '个人信息'
        },
        component: Use
      },
      {
        path: '/code',
        name: 'code',
        meta: {
          title: '修改密码'
        },
        component: Code
      },
      {
        path: '/addre',
        name: 'addre',
        meta: {
          title: '选择收货地址'
        },
        component: Addre
      },
      {
        path: '/address',
        name: 'address',
        component: Address
      },
      {
        path: '/pat',
        name: 'pat',
        component: Pat
      },
      {
        path: '/bank',
        name: 'bank',
        meta: {
          title: '我的银行卡'
        },
        component: Bank
      },
      {
        path: '/fin',
        name: 'fin',
        meta: {
          title: '提现明细'
        },
        component: Fin
      },
      {
        path: '/dep',
        name: 'dep',
        meta: {
          title: '财务明细'
        },
        component: Dep
      },
      {
        path: '/reset',
        name: 'reset',
        meta: {
          title: '重设提现密码'
        },
        component: Reset
      },
      {
        path: '/news',
        name: 'news',
        meta: {
          title: '公告列表'
        },
        component: News
      },
      {
        path: '/newsList',
        name: 'newsList',
        meta: {
          title: '公告详情'
        },
        component: Newslist
      },
      {
        path: '/srd',
        name: 'srd',
        meta: {
          title: '续费列表'
        },
        component: Srd
      },
      {
        path: '/deposit',
        name: 'deposit',
        meta: {
          title: '提现申请'
        },
        component: Deposit
      },
      {
        path: '/wallet',
        name: 'wallet',
        meta: {
          title: '我的钱包'
        },
        component: Wallet
      },
      {
        path: '/rec',
        name: 'rec',
        meta: {
          title: '保证金充值'
        },
        component: Rec
      },
      {
        path: '/recc',
        name: 'recc',
        meta: {
          title: '预选产品开通升级'
        },
        component: Recc
      },
      {
        path: '/fre',
        name: 'fre',
        meta: {
          title: '运费设置'
        },
        component: Fre
      },
      {
        path: '/pre',
        name: 'pre',
        meta: {
          title: '预售选货'
        },
        component: Pre
      },
      {
        path: '/img',
        name: 'img',
        meta: {
          title: '开通自定义商城'
        },
        component: Img
      },
      {
        path: '/recsub',
        name: 'recsub',
        meta: {
          title: '线下付款'
        },
        component: Recsub
      },
      {
        path: '/sea',
        name: 'sea',
        meta: {
          title: '商家-我预选的商品'
        },
        component: Sea
      },
      {
        path: '/conv',
        name: 'conv',
        meta: {
          title: '商家-预选订单'
        },
        component: Conv
      },
      {
        path: '/local',
        name: 'local',
        meta: {
          title: '兑换券订单'
        },
        component: Local
      },
      {
        path: '/list',
        name: 'list',
        meta: {
          title: '系统店铺-会员管理'
        },
        component: List
      },
      {
        path: '/sav',
        name: 'sav',
        component: Sav
      },
      {
        path: '/vou',
        name: 'vou',
        meta: {
          title: '系统店铺-会员充券'
        },
        component: Vou
      },
      {
        path: '/rea',
        name: 'rea',
        component: Rea
      },
      {
        path: '/cou',
        name: 'cou',
        meta: {
          title: '系统店铺-兑换券设置'
        },
        component: Cou
      },
      {
        path: '/meb',
        name: 'meb',
        component: Meb
      },
      {
        path: '/bas',
        name: 'bas',
        meta: {
          title: '系统店铺-店铺设置'
        },
        component: Bas
      },
      {
        path: '/clas',
        name: 'clas',
        component: Clas
      },
      {
        path: '/cre',
        name: 'cre',
        component: Cre
      },
      {
        path: '/mag',
        name: 'mag',
        component: Mag
      },
      {
        path: '/mak',
        name: 'mak',
        component: Mak
      },
      {
        path: '/order',
        name: 'order',
        component: Order
      },
      {
        path: '/load',
        name: 'load',
        meta: {
          title: '系统店铺-下载二维码'
        },
        component: Load
      },
      {
        path: '/pur',
        name: 'pur',
        meta: {
          title: '选货订单'
        },
        component: Pur
      },
      {
        path: '/inv',
        name: 'inv',
        component: Inv
      },
      {
        path: '/set',
        name: 'set',
        meta: {
          title: '幸运大转盘'
        },
        component: Set
      },
      {
        path: '/bea',
        name: 'bea',
        meta: {
          title: '获奖名单'
        },
        component: Bea
      },
      {
        path: '/memb',
        name: 'memb',
        meta: {
          title: '会员统计'
        },
        component: Memb
      },
      {
        path: '/coi',
        name: 'coi',
        meta: {
          title: '兑换券统计'
        },
        component: Coi
      },
      {
        path: '/sto',
        name: 'sto',
        component: Sto
      },
      {
        path: '/vitt',
        name: 'vitt',
        meta: {
          title: '商户信息'
        },
        component: Vitt
      },
      {
        path: '/num',
        name: 'num',
        meta: {
          title: '名额管理'
        },
        component: Num
      },
      {
        path: '/crea',
        name: 'crea',
        meta: {
          title: '添加店铺'
        },
        component: Crea
      },
      {
        path: '/open',
        name: 'open',
        component: Open
      },
      {
        path: '/gopay',
        name: 'gopay',
        meta: {
          title: '保证金充值支付'
        },
        component: Gopay
      },
      {
        path: '/tran',
        name: 'tran',
        meta: {
          title: '购买名额'
        },
        component: Tran
      },
      {
        path: '/sub',
        name: 'sub',
        meta: {
          title: '线下付款'
        },
        component: Sub
      },
      {
        path: '/deta',
        name: 'deta',
        meta: {
          title: '提交预售预选区'
        },
        component: Deta
      },
      {
        path: '/cpu',
        name: 'cpu',
        component: Cpu
      },
      {
        path: '/eig',
        name: 'eig',
        meta: {
          title: '营销独孤九剑'
        },
        component: Eig
      },
    ]
  }
]
