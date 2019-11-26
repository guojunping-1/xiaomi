<template>
  <div class="shop">
    <mi-nav :isLogin=isLogin />
    <div class="navlist" :class="{show:isShow}">
      <mi-navlist class="list" />
    </div>
    <div class="content">
      <div class="login" v-if="isShow">
        <span>为方便您购买，请先登录</span>
        <span>
          <a href="/login">立即登录</a>
        </span>
      </div>
      <div class="center">
        <div class="carousel">
          <div class="block">
            <el-carousel v-if="good.length>0" class="list" height="380px">
              <el-carousel-item v-for="(img,index) in good[0].version" :key="index">
                <img :src="img.imgSrc" alt="">
              </el-carousel-item>
            </el-carousel>
          </div>
        </div>
        <div class="info" v-if="good.length>0">
          <div class="basicInfo" v-for="(basicInfo,index) in good" :key="index">
            <h2 class="title">{{basicInfo.title}}</h2>
            <p class="desc">{{basicInfo.des}}</p>
            <div v-if="map.length>0 && ad.provience !== ''" v-for="ad in map" class="aa" v-show="isAddressShow">
              <span>{{ad.provience}}</span>
              <span>{{ad.city}}</span>
              <span>{{ad.district}}</span>
              <span>{{ad.detial}}</span>
              <span class="bounce" @click="isBounce">修改</span>
            </div>
            <div v-if="map == null || map[0].provience == '' || map[0].city == ''" class="aa" v-show="isAddressShow">
              <span>{{provience}}</span>
              <span>{{city}}</span>
              <span>{{district}}</span>
              <span>{{detial}}</span>
              <span class="bounce" @click="isBounce">修改</span>
            </div>
          </div>
          <div class="selectAddress" v-if="isAppear">
            <mi-select @change="close" @getProvience="getProvience" @getCity="getCity" @getDistrict="getDistrict" @detialAddress="getdetialAddress" @getPhoneNumber="getPhoneNumber" @getContact = "getContact" v-show="appear" />
          </div>
          <div class="type">
            <p :class="{active:key == currentVerison}" @click="type(key)" v-for="(good,key) in good[0].version">{{good.type}}</p>
          </div>
          <ul class="version" v-if="good.length>0">
            <li>
              <div class="money">
                <span v-if="good[0].version[0].preferential !=='无'" class="preferential">{{good[0].version[this.currentVerison].preferential |coin}}</span>
                <span class="price" :class="{throught:good[0].version[0].preferential !=='无'}">{{good[0].version[this.currentVerison].price |coin}}</span>
              </div>
              <p class="inventory">库存：{{good[0].version[this.currentVerison].inventory}}件</p>
            </li>
          </ul>
          <div class="choose">
            <p class="cost" @click="joinCart('cost')">购买</p>
            <p class="like" @click="joinCart('join')">加入购物车</p>
          </div>
        </div>
      </div>
    </div>
    <mi-footer class="footer" />
  </div>
</template>
<script>
import nav from "../../components/buyer/nav.vue";
import navList from "../../components/buyer/navList.vue";
import footer from "../../components/buyer/footer.vue";
import select from "../../components/buyer/select.vue";
import { mapGetters, mapActions } from "vuex"
export default {
  name: "shop",
  components: {
    "mi-nav": nav,
    "mi-navlist": navList,
    "mi-footer": footer,
    "mi-select": select
  },
  created() {
    this.id = this.$route.query.id;
    this.getData();
    this.isLogined();
    this.goGood();
    this.getAddressData();
    this.justice();
  },
  beforeUpdate() {
    this.getAddressData();
  },
  data() {
    return {
      id: "",
      good: [],
      isShow: true,
      isAddressShow: false,
      isLogin: "",
      goodVersion: [],
      currentVerison: 0,
      appear: false,
      isAppear: false,
      // 地址数据
      provience: "",
      city: "",
      district: "",
      detial: "",
      phone:"",
      contact:"",
      map: ""
    }
  },
  methods: {
    ...mapActions(["doLoginCookie", "isGood", "getAddress", "addCart", "getCart"]),
    // 判断地址是否为空
    joinCart(type) {
      // this.getCart();
      // let obj = []; 
      // let selectId = this.good[0].id;
      // currentVerison用来区别我选了数据里的哪个版本
      let goodId = this.currentVerison;
      // 得到全部数据
      // 这里的等于只是把this指向的在内存堆的地址分配给good，之后good的任何操作都会影响 this.good
      // 通过转化字符串再转换成对象能够进行深拷贝
      let good = JSON.stringify(this.good[0]);
      let cloneGood = JSON.parse(good);
      // 因为进入页面时通过Vue router的传递query参数发送请求使得this.good获得数据
      // 但是后端发送的数据在对象中的version key中又包含了这个商品的所有版本
      // 在这里先删除所有的版本，通过for in 遍历深拷贝之后的数据，把version这个key包含的所有版本信息删除
      for (let i in cloneGood) {
        if (i == "version") {
          // console.log(i);
          delete cloneGood[i];
        }
      }
      // console.log(cloneGood)
      // 删除之后，在cloneGood中人为添加一个新的key===> verison ，利用currentIndex甄别用户选择的版本再人为添加到对象中并发送到vuex 的 Actions 中的addcart
      cloneGood.version = this.goodVersion[goodId];
      this.addCart({ obj: cloneGood });
      // type == join时，只加入购物车不跳转到购物车
      if(type == 'join'){
        this.$message("已添加到购物车");
        // type == cost时，加入购物车并跳转到购物车
      }else if(type == 'cost'){
        this.$router.push({
          name:"purchase"
        })
      }
    },
    justice() {
      //       if(this.map[0].city == ""|| this.map[0].provience == ""||this.map[0].district == ""|| this.map[0].detial == ""){
      //     this.provience = "请输入地址";
      // }
     if (this.provience == "" || this.city == "" || this.district == "") {
       this.provience = "请输入地址";
     }
    },
    getdetialAddress(val) {
      this.detial = val;
      // console.log(val)
    },
    getProvience(val) {
      this.provience = val;
      // console.log(val)
    },
    getCity(val) {
      this.city = val;
      // console.log(val)
    },
    getDistrict(val) {
      this.district = val;
      // console.log(val)
    },
    getContact(val){
      this.contact = val;
    },
    getPhone(val){
      this.phone = val;
    },
    // 弹出地址
    isBounce() {
      this.appear = true;
      this.isAppear = true;
    },
    // 关闭地址
    close() {
      this.appear = false;
      this.isAppear = false;
    },
    type(key) {
      this.currentVerison = key;
      // console.log(key)
    },
    goGood() {
      this.isGood({ obj: this.id });
    },
    isLogined() {
      this.doLoginCookie();
      let id = this.getLogin;
      if (id == "-1") {
        this.isLogin = "-1";
        this.isShow = true;
        this.isAddressShow = false;
      } else if (id >= 0) {
        this.isLogin = id;
        this.isShow = false;
        this.isAddressShow = true;
      }
    },
    getAddressData() {
      this.getAddress();
      this.map = this.address;
    },
    async getData() {
      let data = await this.axios.post("/api/getDetial", {
        id: this.id
      });
      this.good = data.data;
      this.goodVersion = data.data[0].version;
    }
  },
  computed: {
    ...mapGetters(["getLogin", "address"])
  },
  filters: {
    coin(val) {
      return val + "元";
    }
  }
}

</script>
<style lang="less" scoped>
* {
  text-align: center;
  margin: 0;
  padding: 0;
}

.active {
  color: #ff6700 !important;
  border: 1px solid #ff6700 !important;
  // background-color: yellow;
}

.throught {
  text-decoration: line-through;
  color: #b0b0b0 !important;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n+1) {
  background-color: #d3dce6;
}

.show {
  box-shadow: 0px 5px 5px rgba(0, 0, 0, 0.07);
  border-bottom: 1px solid #e0e0e0;
}

.navlist {

  // z-index: 100px;

  .list {
    width: 80%;
    margin: 0 auto;
  }
}

.content {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  height: 100%;

  .login {
    flex: 1;
    z-index: 10;
    line-height: 50px;
    background-color: #f7f7f7;
    width: 100%;

    a {
      color: #ff6700;
    }
  }

  .center {
    box-sizing: border-box;
    flex: 9;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: row;
    margin-top: 30px;

    .carousel {
      margin-top: 30px;
      flex: 1;
      box-sizing: border-box;
      width: 560px;
      height: 100%;

      img {
        width: 100%;
        height: 100%;
        // background-size: 100%, 100%;
      }
    }

    .info {
      flex: 1;
      width: 80%;
      height: 100%;
      z-index: 80;

      .basicInfo {
        width: 80%;

        .title {
          // margin-top: 26px;
          font-size: 24px;
          font-weight: normal;
          color: #212121;
          text-align: left;
        }

        .desc {
          font-size: 14px;
          color: #b0b0b0;
          text-align: left;
          margin-top: 10px;
          letter-spacing: 2px;
          text-indent: 6px;
          box-sizing: border-box;
          padding: 10px 0 10px 0;
          border-bottom: 1px solid #e0e0e0;
        }

        .aa {
          margin-top: 30px;
          width: 100%;
          box-sizing: border-box;
          padding: 30px 20px 30px;
          text-align: left;
          border: 1px solid #e0e0e0;
          background-color: #fafafa;
          position: relative;

          .bounce {
            cursor: pointer;
            color: #ff6700;

          }
        }

        .selectAddress {
          width: 500px;
          height: 250px;
          // background-color: pink;
          position: absolute;
          z-index: 100;
          top: 250px;
        }
      }

      .type {
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: flex-start;
        width: 80%;
        margin-top: 20px;

        p {
          width: 298px;
          height: 42px;
          line-height: 42px;
          font-size: 16px;
          overflow: hidden;
          font-weight: 400;
          color: #b0b0b0;
          border: 1px solid #b0b0b0;
          margin: 10px 0 10px 0;
          cursor: pointer;
        }
      }

      .version {
        margin-top: 20px;
        flex: 7;
        width: 50%;

        li {
          display: flex;
          justify-content: center;
          align-items: flex-start;
          flex-direction: column;
          background-color: #fafafa;
          border: 1px solid #e0e0e0;
          box-sizing: border-box;
          padding: 10px;
          span {
            &:nth-child(1) {
              font-size: 24px;
              color: #ff6700;
            }

            &:nth-child(2) {
              font-size: 14px;
            }
          }

          p {
            margin-top: 20px;
          }
        }
      }

      .choose {
        text-align: left;
        display: flex;
        margin-left: -10px;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        cursor: pointer;
        width: 80%;
        margin-top: 20px;
        margin-bottom: 50px;
        p {
          margin: 10px;

          &:nth-child(1) {
            width: 300px;
            height: 54px;
            text-align: center;
            line-height: 54px;
            color: #fff;
            background-color: #ff6700;
            font-size: 16px;
            transition: background-color .4s;

            &:hover {
              background-color: #f25807;
            }
          }

          &:nth-child(2) {
            width: 142px;
            height: 54px;
            background-color: #b0b0b0;
            color: #fff;
            text-align: center;
            line-height: 54px;
            transition: background-color .4s;

            &:hover {
              background-color: #757575;
            }
          }
        }
      }
    }
  }
}

</style>
<style>
.el-carousel__arrow--left {
  left: 16px;
}

.el-carousel {
  width: 580px;
  height: 380px;
}

.el-carousel {
  margin: 0 auto;
}


</style>
