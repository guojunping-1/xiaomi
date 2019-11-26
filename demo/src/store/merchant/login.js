import cookie from 'js-cookie'
export default {
  state: {
    logined: false,
    loading:false,
    listUrl:[] 
  },
  mutations: {  
    login(state) {
      state.logined = true;
      cookie.set('loginState', state.logined, { expires: 1 })
    },
    setLoading(state,params){
      state.loading = params.loading;
    },
    logOut(state) {
      state.logined = false;
      cookie.remove('loginState')
    },
    setLogin(state){
       state.logined = cookie.get('loginState')
    },
    addListUrl(state,params){
      state.listUrl = params.obj;
    }
  },
  actions: {
    doLogin(ctx) {
      ctx.commit("login");
    },
    doLoginOut(ctx) {
      ctx.commit("logOut");
    },
    checkState(ctx){
    	ctx.commit("setLogin");
    },
    setLoadingByAct(ctx,params){
      ctx.commit("setLoading",params);
    },
    addListUrl(ctx,params){
       ctx.commit("addListUrl",params);
    }
  },
  getters: {
    isLogined(state) {
      return state.logined;
    },
    isLoading(state){
      return state.loading;
    },
    isListUrl(state){
      return state.listUrl;
    }
  }
}
