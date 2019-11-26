<template>
  <div class="nav">
    <ul class="nav-left">
      <router-link v-for="(msg,index) in msgs" :to="msg.path" :key="index">{{msg.title}}</router-link>
    </ul>
    <ul class="nav-right">
      <router-link to="/login" v-show="doNotLogin">登录</router-link>
      <router-link to="/myhome/self" v-show="welcome">欢迎回来,{{user}}</router-link>
      <router-link :to="{name:this.address,query:{id:this.a}}" @click.native="logOut" v-show="welcome">退出</router-link>
      <router-link to="/regits" v-show="doNotLogin">注册</router-link>
      <li class="miniCart" @mouseover="enterCart" @mouseleave="leaveCart"  :class="{active:this.MiniCartData.length>0}">
        <a  :class="{active:this.MiniCartData.length>0}">
          <span @click="goPurchase">购物车</span>
          <span>({{this.MiniCartData.length}})</span>
        </a>
        <ul class="ami" v-show="isMiniCartShow">
          <li v-for="(mini,index) in MiniCartData" v-show="hasOwnCart">
            <img :src="mini.obj.version.imgSrc" alt="">
            <p class="title" @click="goGoodDetial(mini.obj.id)">{{mini.obj.title}}</p>
            <span class="price">{{mini.obj.version.preferential == '无'?mini.obj.version.price:mini.obj.version.preferential}}</span>
            <span class="cheng">x</span>
            <span class="count">{{mini.obj.count}}</span>
          </li>
          <li v-show="noOwnCart">还没有购物车</li>
          <li v-show="hasOwnCart">
            <div class="left">
              <p class="count">共件商品</p>
              <div class="price">
                <span class="total">{{MiniTotalMoney}}</span>
                <span class="danwei">元</span>
              </div>
            </div>
            <div class="right">
              <p class="goCart" @click="goPurchase">去购物车结算</p>
            </div>
          </li>
        </ul>
      </li>
      <!--       <li class="nothingClear" v-show="isNothing">
        <p>登陆后添加购物车</p>
      </li> -->
    </ul>
    <!--     <transition enter-active-class='slideInDown' 　leave-active-class='slideOutUp'
      v-on:before-leave="beforeLeave" v-on:after-enter="afterEnter"
     > -->
    <!-- </transition> -->
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import { TweenMax } from "gsap/TweenMax";
export default {
  name: "topNav",
  props: ["isLogin"],
  async created() {
    if (this.isLogin == "-1") {
      this.doNotLogin = true;
    } else if (this.isLogin >= 1) {
      let id = this.isLogin;
      let userName = await this.axios.post("/api/findUserName", {
        id: id
      });
      this.user = userName.data;
      this.welcome = true;
      this.doNotLogin = false;
    }
    this.justice();
    this.getMiniCartData();
  },
  beforeUpdate() {
    this.getMiniCartData();
  },
  data() {
    return {
      doNotLogin: true,
      welcome: false,
      user: "zxj",
      address: "",
      a: "",
      isMiniCartShow: false,
      isLiShow: false,
      isNothing: true,
      MiniCartData: "",
      hasOwnCart: false,
      noOwnCart: true,
      msgs: [{
        "path": "/",
        "title": "小米商城"
      }, {
        "path": "/",
        "title": "MIUI"
      }, {
        "path": "/",
        "title": "云服务"
      }, {
        "path": "/",
        "title": "金融"
      }, {
        "path": "/",
        "title": "有品"
      }, {
        "path": "/",
        "title": "小爱开放平台"
      }, {
        "path": "/",
        "title": "企业团购"
      }, {
        "path": "/",
        "title": "资质证照"
      }, {
        "path": "/",
        "title": "协议规则"
      }, {
        "path": "/",
        "title": "下载App"
      }, {
        "path": "/",
        "title": "select Location"
      }]
    }
  },
  methods: {
    ...mapActions(["out", "getCart"]),
    // beforeLeave(){
    //   // console.log("11")
    //   this.isLiShow = false;
    // },
    // afterEnter(){
    //   // console.log("22")
    //   this.isLiShow = true;
    // },
    goGoodDetial(Id) {
      let params = { id: Id }
      let routeData = this.$router.resolve({
        name: "goodDetial",
        query: params,
        params: { Id }
      });
      window.open(routeData.href, '_blank');
    },
    goPurchase(){
      this.$router.push({
        name:"purchase"
      })
    },
    isCartChildrenShow() {
        if(this.MiniCartData.length>0){
          this.hasOwnCart = true;
          this.noOwnCart = false;
        }else if(this.MiniCartData.length == 0){
          this.hasOwnCart = false;
          this.noOwnCart = true;
        }
    },
    getMiniCartData() {
      this.getCart();
      this.MiniCartData = this.cart;
      this.isCartChildrenShow();
      // console.log(this.MiniCartData) 
    },
    enterCart() {
      if (this.isGood == -1) {
        this.isNothing = true;
        this.isMiniCartShow = false;
      } else if (this.isGood >= 0) {
        this.isMiniCartShow = true;
        this.isNothing = false;
      }
      TweenMax.to(".ami", .6, { opacity: 1, zIndex: 100, display: "block" });
      this.getMiniCartData();
    },
    leaveCart() {
      // this.isMiniCartShow = false;
      // console.log("1111")
      if (this.isGood == -1) {
        this.isNothing = true;
        this.isMiniCartShow = false;
      } else if (this.isGood >= 0) {
        this.isMiniCartShow = true;
        this.isNothing = false;
      }
      TweenMax.to(".ami", .6, { opacity: 0, zIndex: -9999999999, display: "none" });
    },
    logOut() {
      this.$router.go(0);
      this.doNotLogin = true;
      this.welcome = false;
      this.out();
    },
    justice() {
      if (this.isGood == -1) {
        this.address = "home";
      } else if (this.isGood >= 0) {
        this.address = "goodDetial";
        this.a = `${this.isGood}`;
      }
    }
  },
  computed: {
    ...mapGetters(["isGood", "cart"]),
    MiniTotalMoney() {
      let totalMoney = 0;
      for (let i = 0; i < this.MiniCartData.length; i++) {
        if(this.MiniCartData[i].obj.version.preferential == '无'){
            totalMoney += this.MiniCartData[i].obj.count * this.MiniCartData[i].obj.version.price;
        }else{
            totalMoney += this.MiniCartData[i].obj.count * this.MiniCartData[i].obj.version.preferential;
        }
      }
      return totalMoney ;
    }
  },
  filters: {
    coin(val) {
      return val + "元";
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../../static/css/lessFunction.less";
// 关于动画、
// @keyframes move {
//   0% {
//     height: 0;
//     z-index: 0;
//   }

//   100% {
//     height: 100%;
//     z-index: 100;
//     // box-shadow: 0 2px 10px rgba(0,0,0,.15);
//   }
// }

// .slideInDown {
//   animation: move .4s linear;
//   animation-fill-mode: forwards;
//   // animation-delay:1s;
// }

// .slideOutUp {
//   animation: move .4s reverse linear;
//   animation-fill-mode: forwards;
// }



* {
  margin: 0;
  padding: 0
}

ul,
li {
  list-style: none;
}
.active{
  background-color: #ff6700;
  color:white !important;
}
.nav {
  .flex(space-around, row);
  background-color: #333;
  width: 100%;
  height: 40px;
  z-index: 10000;

  .nav-left {
    flex: 7;
    .flex(center, row);
    margin-left: 20px;

    a {
      display: block;
      height: 100%;
      padding-right: 10px;
      font-size: 12px;
      margin-left: 10px;
      border-right: 1px solid rgba(240, 240, 240, .1);
      color: #b0b0b0;

      &:hover {
        color: white;
      }
    }
  }

  .nav-right {
    margin-right: 86px;
    // margin-left: -60px;
    flex: 3;
    .flex(center, row);

    a {
      cursor: pointer;
      padding-right: 10px;
      margin-left: 10px;
      border-right: 1px solid rgba(240, 240, 240, .1);
      font-size: 12px;
      color: #b0b0b0;

      &:hover {
        color: white;
      }
    }

    .miniCart {
      height: 40px;
      line-height: 40px;
      z-index: 200;

      &:hover a {
        color: white;
      }

      .ami {
        position: absolute;
        width: 280px;
        top: 40px;
        background-color: #ffffff;
        right: 0;
        transform: translate(-124px);
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        z-index: 20;
        // background-color: white;
        box-shadow: 0 2px 10px rgba(0, 0, 0, .15);
        opacity: 0;

        li {
          width: 86%;
          height: 80px;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: row;
          border-top: 1px solid #b0b0b0;
          box-sizing: border-box;
          // padding: 10px;
          margin: 10px;
          color: #2c3e50 !important;

          img {
            width: 80px;
            height: 50px;
            margin-right: 10px;
          }

          .title {
            font-size: 14px;
            overflow: hidden;
            width: 100px;
            text-overflow: ellipsis;
            white-space: nowrap;
            cursor: pointer;

            &:hover {
              color: #ff6700;
            }
          }

          .price {
            font-size: 14px;
            margin-top: -34px;
            margin-right: 5px;
          }

          .cheng {
            font-size: 14px;
            margin-top: -34px;
            margin-right: 5px;
          }

          .count {
            font-size: 14px;
            margin-top: -34px;
            margin-right: 5px;
          }

          &:first-child {
            border-top: 0;
          }

          &:last-child {
            box-sizing: content-box;
            height: 70px;
            margin: 0;
            width: 100%;
            background-color: #fafafa !important;
            border-top: 0;
            display: flex;
            justify-content: center;
            flex-direction: row;
            align-items: center;

            .left {
              flex: 1;
              height: 100%;

              .count {
                text-align: left;
                margin-top: 6px;
                margin-left: 20px;
                font-size: 14px;
                color: #b0b0b0;
              }

              .price {
                margin: 0;
                color: #ff6700;
                margin-top: -20px;
                text-align: center;

                .total {
                  font-size: 24px;
                  margin-left: -20px;
                  width: 100px;
                  height: 40px;
                  text-align: center;
                }

                .danwei {
                  font-size: 12px;
                }
              }
            }

            .right {
              flex: 1;

              p {
                width: 120px;
                height: 40px;
                color: #fff;
                line-height: 40px;
                text-align: center;
                background-color: #ff6700;
                cursor: pointer;
                font-size: 14px;
              }
            }
          }
        }
      }
    }


  }

}

</style>
