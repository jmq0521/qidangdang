import Vue from 'vue'
import Router from 'vue-router'
import shop from "./shop/index"
import index from "./index/index"
import login from "./login/index"
import resgier from "./resgier/index"
import off from "./off/index"
import forgot from "./forgot/index"
import detail from "./detail/index"
import joincar from "./car/index"
import mesage from "./mesage/index"
import subpay from "./sub/index"

Vue.use(Router)
export default new Router({
  routes: [].concat(shop,index,login,resgier,off,forgot,joincar,mesage,detail,subpay),
})

