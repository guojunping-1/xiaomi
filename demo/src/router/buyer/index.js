import Vue from 'vue'
import Router from 'vue-router'
import Home from '../../page/buyer/home.vue'
import Regits from "../../page/buyer/regits.vue"
import Login from "../../page//buyer/login.vue"
import Cart from "../../page/buyer/cart.vue"
import goodDetial from "../../page/buyer/goodDetial.vue"
import purchase from "../../page//buyer/purchase.vue"
import cost from "../../page/buyer/cost.vue"
import myhome from "../../page/buyer/myhome.vue"
import order from "../../page/buyer//order.vue"
import recharge from "../../page/buyer/recharge.vue"
import self from "../../page/buyer/self.vue"
import afterCost from "../../page/buyer/afterCost.vue"
const originalPush = Router.prototype.push
Router.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(Router)

export default new Router({
  // linkActiveClass:'active',
  // 更改路由模式为history去除Url中的#
  mode: 'history',
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    }, {
      path: "/regits",
      name: "regits",
      component: Regits
    }, {
      path: "/login",
      name: "login",
      component: Login
    }, {
      path: "/cart",
      name: "cart",
      component: Cart
    }, {
      path: "/gooddetial",
      name: "goodDetial",
      component: goodDetial
    },
    {
      path: "/purchase",
      name: "purchase",
      component: purchase
    }, {
      path: "/cost",
      name: "cost",
      component: cost
    },
    {
      path: "/myhome",
      name: "myHome",
      component: myhome,
      redirect: "/myhome/order",
      children: [{
        path: "order",
        component: order
      }, {
        path: "self",
        component: self
      }, {
        path: "recharge",
        component: recharge
      }]
    },
    {
      path:"/aftercost",
      name:"afterCost",
      component:afterCost
    }
  ]
})
