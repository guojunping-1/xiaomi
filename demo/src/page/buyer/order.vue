<template>
  <div class="order">
    <header>
      <h2>我的订单</h2>
      <small>请谨防钓鱼链接或诈骗电话，
        <a href="https://www.mi.com/service/buy/Avoid%20Fraud">了解更多></a>
      </small>
    </header>
    <div class="content">
      <h1 class="noOrder" v-if="noOrder">当前没有交易订单</h1>
      <div class="myOrder">
        <div class="good" v-for="(data , index) in orderData">
          <ul class="item" v-for="(good,index) in data.good">
            <img class="goodImg" style="width: 100px;height: 60px" :src="good.obj.version.imgSrc" alt="">
            <li class="goodTitle">{{good.obj.title}}</li>
            <!-- <li class="goodDesc">{{good.obj.des}}</li> -->
            <li class="goodCount">{{good.obj.count|count}}</li>
            <li class="goodPrice" v-if="good.obj.version.preferential != '无'">{{good.obj.version.preferential*good.obj.count|coin}}
            </li>
            <li class="goodPrice" v-else>{{good.obj.version.price*good.obj.count|coin}}</li>
            <p class="state">{{good.obj.state}}</p>
          </ul>
          <ul class="express" v-for="(address,index) in data.address">
            <li>配送地址:</li>
            <li class="provience">{{address.provience}}</li>
            <li class="city">{{address.city}}</li>
            <li class="district">{{address.district}}</li>
            <li class="detial">{{address.detial}}</li>
            <li class="contact">{{address.contact}}</li>
            <li class="phone">{{address.phone}}</li>
          </ul>
        </div>
      </div>
    </div>
    <el-pagination background layout="prev, pager, next" :total="totalCount" @current-change="changePage" :page-size="singlePage">
    </el-pagination>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import page from "../../components/merchant/page.vue"
import config from "../../../configs"
export default {
  name: "order",
  created() {
    this.getUser();
    // this.getOrder();
    this.getCount();
    this.getList();
  },
  data() {
    return {
      userId: "",
      noOrder: true,
      orderData: "",
      currentPage: 0,
      singlePage: config.page,
      totalCount: 0
    }
  },
  methods: {
    ...mapActions(["doLoginCookie"]),
    changePage(val) {
      this.currentPage = val - 1;
      this.getList();
    },
    async getCount() {
      let result = await this.axios("/api/order/getCount");
      result = result.data[0].count;
      this.totalCount = result;
    },
    async getList() {
      console.log(this.currentPage)
      console.log(this.singlePage)
      let order = await this.axios("/api/order/page", {
        params: {
          pageNo: (this.currentPage) * (this.singlePage),
          singlePageNum: this.singlePage
        }
      });
      this.orderData = order.data;
      if (order.data == null || order.data == "" || order.data == undefined) {
        this.noOrder == true;
      } else {
        this.noOrder = false;
        this.orderData = order.data;
      }
    },
    async getOrder() {
      let order = await this.axios.post("api/order", {
        id: this.userId
      })
      if (order.data == null || order.data == "" || order.data == undefined) {
        this.noOrder == true;
      } else {
        this.noOrder = false;
        this.orderData = order.data;
      }
    },
    getUser() {
      this.doLoginCookie();
      this.userId = this.getLogin;
    }
  },
  computed: {
    ...mapGetters(["getLogin"])
  },
  filters: {
    coin(val) {
      return val + "元";
    },
    count(val) {
      return val + "件";
    }
  },
  components: {
    "mi-page": page
  }
}

</script>
<style lang="less" scoped>
.order {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;

  header {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    flex-direction: row;
    align-items: center;
    box-sizing: border-box;
    padding: 60px 40px 20px 50px;

    h2 {
      font-size: 30px;
      color: #757575;
      font-weight: 400;
    }

    small {
      font-size: 12px;
      color: #757575;
      margin: 16px 0 0 16px;

      a {
        color: #757575;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .content {
    .noOrder {
      font-size: 18px;
      color: #b0b0b0;
      margin-bottom: 280px;
      width: 100%;
      height: 100%;
      text-align: center;
    }

    .myOrder {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      padding: 0 50px;
      width: 956px;
      height: 100%;

      .good {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        flex-wrap: wrap;
        width: 100%;
        border-bottom: 1px solid #b0b0b0;

        &:last-child {
          border: 0px;
        }

        .item {
          display: flex;
          justify-content: space-around;
          flex-direction: row;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          padding: 20px 30px;
          height: 100%;

          .goodDesc {
            width: 200px;
          }

          .goodTitle {
            width: 200px;
            text-align: left;
          }

          .goodPrice {
            width: 100px;
            text-align: left;
          }

          .goodCount {
            width: 50px;
            text-align: left;
          }
        }

        .item>* {
          // margin-right: 100px;
        }

        .express {
          display: flex;
          justify-content: flex-end;
          flex-direction: row;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
          padding: 20px 50px;
        }

        .express>* {
          margin-right: 10px;
        }
      }
    }
  }
}

</style>
