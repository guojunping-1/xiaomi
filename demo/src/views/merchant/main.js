import Vue from 'vue'
import router from '../../router/merchant/index.js'
import axios from "axios"
import qs from "qs"
import "../../../static/css/reset.css" 
import 'element-ui/lib/theme-chalk/index.css'
import store from "../../store/merchant/index.js"
import App from './App'

axios.defaults.baseURL = "http://localhost:10086";
Vue.prototype.axios = axios
// 拦截器
axios.interceptors.request.use(config => {
  if (config.method === "post" && config.data.constructor !== FormData) {
    config.data = qs.stringify(config.data);
  }
  return config;
});

axios.interceptors.response.use(response => {
  // console.log(response)
  vue.$store.dispatch("setLoadingByAct", { loading: false })
  return response;
});
// 引入ui
import ElementUI from 'element-ui'
Vue.use(ElementUI)
// 引入分页
import page from "../../components/merchant/page.vue"
Vue.component("my-page", page);
Vue.config.productionTip = false
/* eslint-disable no-new */
let vue = new Vue({
  el: '#merchant',
  router,
  store,
  components: { App },
  template: '<App/>'
})
