import Vue from 'vue'
import Router from 'vue-router'
import login from '../../page/merchant/login.vue'
import index from "../../page/merchant/index.vue"
import miHome from "../../page/merchant/miHome.vue"
import miUser from "../../page/merchant/miUser.vue"
import miOrder from "../../page/merchant/miOrder.vue"
import miExpress from "../../page/merchant/miExpress.vue"
import miProduct from "../../page/merchant/miProduct.vue"
import miSave from "../../page/merchant/miSave.vue"
import miSell from "../../page/merchant/miSell.vue"
import miCategory from "../../page/merchant/miCategory.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },{
    	path:"/index",
    	name:"index",
    	component:index,
      redirect:"/index/miHome",
      children:[
          {
            path:"miHome",component:miHome
          },{
            path:"miUser",component:miUser
          },{
            path:"miOrder",component:miOrder
          },{
            path:"miExpress",component:miExpress
          },{
            path:"miProduct",component:miProduct
          },{
            path:"miSave",component:miSave
          },{
            path:"miSell",component:miSell
          },{
            path:"miCategory",component:miCategory
          }
      ]
    }
  ]
})
