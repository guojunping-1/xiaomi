import cookie from 'js-cookie'
export default {
  state: {
    // 保存登录者的id，默认-1
    login: -1,
    // 判断点击登录之后是跳转到首页还是商品页
    isGood: -1,
    // 保存地址
    address: [],
    // 保存购物车数据
    cart: [],
    isPurchase:false
  },
  mutations: {
    // 登陆后为用户设置相应的cookie
    Mlogin(state, params) {
      state.login = params.obj;
      cookie.set('loginUserName', state.login, { expires: 1 });
    },
    // 在created的方法中不断获取cookie使得刷新后依旧能够获取到cookie
    getLogin(state) {
      state.login = cookie.get("loginUserName");
    },
    // 登出，清除cookie
    doLogOut(state) {
      cookie.remove("loginUserName");
      state.login = "-1";
    },
    // 判断nav的登录跳转
    isGood(state, params) {
      state.isGood = params.obj;
    },
    // 关于地址的保存
    // 添加地址
    addPlace(state, obj) {
      state.address = [];
      localStorage.removeItem("address");
      state.address.push(obj);
      localStorage.setItem("address", JSON.stringify(state.address));
    },
    // 得到地址
    getAddress(state) {
      let address = localStorage.getItem("address")
      state.address = JSON.parse(address);
    },
    // 清除地址
    clearAddress(state) {
      state.address = [];
      localStorage.removeItem("address");
    },
    // 关于购物车的保存
    // 添加购物车，如果购物车中已存在商品那么对应的count++，如果不存在那么加入购物车
    addCart(state, obj) {
      obj.obj.count = 1;
      obj.obj.checked = true;
      let versionId = obj.obj.version.id;
      let tag = 1;
      let cart = JSON.parse(localStorage.getItem("cart"));
      for (let i = 0; i < state.cart.length; i++) {
        if (state.cart !== null && state.cart !== undefined && state.cart !== "" && state.cart.length !== 0 &&
          state.cart[i].obj.version.id == versionId) {
          // console.log("等于");
          tag = 0;
          state.cart[i].obj.count++;
          break;
        }
      }
      if (tag == 1) {
        // console.log("为空");
        state.cart.push(obj);
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
      // console.log(state.cart);
    },
    // 获取购物车数据，如果localstorage无数据那么不获取
    getCart(state) {
      let cart = localStorage.getItem("cart");
      if (cart !== "" && cart !== undefined && cart !== null) {
        state.cart = JSON.parse(cart);
      }
    },
    // 清空全部购物车的数据
    clearCart(state) {
      this.cart = [];
      localStorage.removeItem("cart");
    },
    // 依靠传入的下标删除对应下标的商品
    clearSomeCartItem(state, params) {
      // 删除vuex数组对应下标保存的对象用splice
      let index = params.obj;
      state.cart.splice(index,1);
      console.log(state.cart);
      localStorage.setItem("cart", JSON.stringify(state.cart));
      // delet
    },
    // 增加或者减少商品的件数
    changeCount(state, params) {
      let { index, type , event} = params.obj;
      let cart = state.cart;
      if (type == "plus") {
        cart[index].obj.count++;
      } else if (type == "describle") {
        cart[index].obj.count--;
      } else if (type == "atLeastZero"){
        cart[index].obj.count = 1;
      } else if (type == 'setCount'){
        cart[index].obj.count = event;
      }
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // 在addCart中默认商品的checked为true，所以在购物车的详情页面中默认为对应的checkbox勾上，此项为修改对应
    // 商品的checked
    singleCheckBox(state,params){
      let index = params.obj;
      let cart = state.cart;
       cart[index].obj.checked = !cart[index].obj.checked;
      localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    // 修改购物车信息中的checked
    editCartChecked(state,params){
        for(let i=0;i<state.cart.length;i++){
           state.cart[i].obj.checked = params.obj;
        }
        localStorage.setItem("cart", JSON.stringify(state.cart));
    },
    deleteCartChecked(state){
      let cart = state.cart;
          console.log(cart.length)
      for(let i=0;i<cart.length;i++){
          console.log(i)
        if(cart[i].obj.checked){
           cart.splice(i,1);
           i = i-1; 
        }
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  },
  actions: {
    Alogin(ctx, params) {
      ctx.commit("Mlogin", params);
    },
    doLoginCookie(ctx) {
      ctx.commit("getLogin");
    },
    out(ctx) {
      ctx.commit("doLogOut");
    },
    isGood(ctx, params) {
      ctx.commit("isGood", params);
    },
    // 关于地址的保存
    addPlace(ctx, params) {
      ctx.commit("addPlace", params);
    },
    getAddress(ctx) {
      ctx.commit("getAddress");
    },
    clearAddress(ctx) {
      ctx.commit("clearAddress");
    },
    // 关于购物车的保存
    addCart(ctx, params) {
      ctx.commit("addCart", params);
    },
    getCart(ctx) {
      ctx.commit("getCart");
    },
    clearCart(ctx) {
      ctx.commit("clearCart");
    },
    clearSomeCartItem(ctx, params) {
      ctx.commit("clearSomeCartItem", params);
    },
    changeCount(ctx, params) {
      ctx.commit("changeCount", params);
    },
    singleCheckBox(ctx,params){
      ctx.commit("singleCheckBox", params);
    },
    editCartChecked(ctx,params){
      ctx.commit("editCartChecked", params);
    },
    deleteCartChecked(ctx){
      ctx.commit("deleteCartChecked");
    }
  },
  getters: {
    getLogin(state) {
      return state.login;
    },
    isGood(state) {
      return state.isGood;
    },
    address(state) {
      return state.address;
    },
    cart(state) {
      return state.cart;
    }
  }
}
