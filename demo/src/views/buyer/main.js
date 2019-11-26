// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '../../router/buyer/index.js'
import "../../../static/css/reset.css"
import "../../../static/css/lessFunction.less"
import axios from "axios"
import 'element-ui/lib/theme-chalk/index.css'
import qs from "qs"
import store from "../../store/buyer/index.js"
import animated from 'animate.css'
// 使用animate动画库
Vue.use(animated);
Vue.prototype.axios = axios
Vue.config.productionTip = false
// 拦截器
axios.defaults.baseURL = "http://localhost:10086";
axios.interceptors.request.use(config => {
  if (config.method === "post" && config.data.constructor !== FormData) {
    config.data = qs.stringify(config.data);
  }
  return config;
});

axios.interceptors.response.use(response => {
  // console.log(response)
  // vue.$store.dispatch("setLoadingByAct", { loading: false })
  return response;
});
// 引入饿了吗
import ElementUI from 'element-ui'
Vue.use(ElementUI)
/* eslint-disable no-new */
// 监听全局路由
router.beforeEach((to,from,next)=>{
  if(to.path == '/gooddetial'){
    // Vue.prototype.val = `/gooddetial?id="${}"`
  }
  next();
})
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
}).$mount('#app')    
