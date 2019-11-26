<template>
  <div class="cost">
    <header>
      <div class="header">
        <div class="headInfo">
          <img @click="goHome" src="../../../static/images/mi-logo.png" alt="">
          <p class="title">确认订单</p>
        </div>
        <div class="user" v-show = "isLogined">
          <a href="/login" class="userName">登录</a>
          <a href="/regits" class="userOrder">注册</a>
        </div>
        <div class="user" v-show = "hasLogined">
            <router-link to="/myhome" class="userName">{{userName}}</router-link>       	
        	<a href="" class="userOrder">我的订单</a>
        </div>
      </div>
    </header>
    <div class="content">
      <div class="editAddress">
        <h2 class="addressTitle">收货地址</h2>
       <ul class="userAddress" v-if="addressData.length >0" v-for="(address , index) in addressData" :key=index>
          <li class="userName">{{address.contact}}</li>
          <li class="userPhone">{{address.phone}}</li>
          <li>{{address.provience}}</li>
          <li>{{address.city}}</li>
          <li>{{address.district}}</li>
          <li>{{address.detial}}</li>
          <li class="edit" @click="edit">修改</li>
        </ul>
        <ul class="userAddress" v-if="addressData == '' ||addressData == null || addressData == undefined ">
            <li>请填写收货地址</li>
            <li class="edit" @click="edit">填写</li>
        </ul>
      </div>
      <div class="good">
        <h2 class="goodTitle">商品</h2>
        <ul class="goodItem">
          <li class="item" v-if="data.obj.checked == true" v-for="(data,index) in cartData" :key=index>
            <img :src="data.obj.version.imgSrc" alt="">
            <p class="goodTitle">{{data.obj.title}}</p>
            <p class="goodTitle">{{data.obj.version.type}}</p>
            <p class="price">{{data.obj.version.preferential == '无'?data.obj.version.price:data.obj.version.preferential|coin}}
              <i class="count">&nbspx&nbsp{{data.obj.count}}</i>
            </p>
            <div class="money">
              <p class="singleTotalMoney">{{data.obj.version.preferential == '无'?data.obj.count*data.obj.version.price:data.obj.count*data.obj.version.preferential |coin}}</p>
              <p class="singleTotalpreferential" v-if="data.obj.version.preferential !== '无'">{{data.obj.count*data.obj.version.price|coin}}</p>
            </div>
          </li>
        </ul>
      </div>
      <div class="invoice">
        <p class="count">商品件数：<i>{{getTotalCount}} 件</i></p>
        <p class="totalMoney">商品总价：<i>{{getTotalMoney |coin}}</i></p>
        <p class="preferential">优惠活动：<i>{{getPreferential |coin}}</i></p>
        <p class="realityCost">应付总额：<i>{{costTotalMoney}} <i>元</i></i></p>
      </div>
      <div class="placeTheOrder">
        <div class="miniAddress" v-for="(address , index) in addressData" :key=index v-if="addressData.length > 0">
          <span class="myName">{{address.contact}}</span>
          <span class="myPhone">{{address.phone}}</span>
          <span>{{address.provience}}</span>
          <span>{{address.city}}</span>
          <span>{{address.district}}</span>
          <span>{{address.detial}}</span>
        </div>
        <div class="operation" >
          <p class="goCart" @click="goPurchase">返回购物车</p>
          <p class="pay" @click="pay">立即下单</p>
        </div>
      </div>
    </div>
    <mi-select class="select" @change="close" @getProvience="getProvience" @getCity="getCity" @getDistrict="getDistrict" @detialAddress="getdetialAddress" v-show="appear" />
    <mi-footer class="footer" />
  </div>
</template>
<script>
import footer from "../../components/buyer/footer.vue"
import select from "../../components/buyer/select.vue"
import { mapGetters, mapActions } from "vuex"
export default {
  name: "cost",
  data() {
    return {
      cartData: "",
      isAppear: false,
      appear: false,
      provience: "",
      city: "",
      district: "",
      detialAddress: "",
      addressData: "",
      userId: "",
      isLogined: false,
      userName: "",
      hasLogined: false
    }
  },
  created() {
    // 调用vuex中getters的方法之前，先调用actions里的getcart将localstorage里的数据保存到vuex中对应的state中，避免刷新后state中保存的数据丢失
    this.getCart();
    this.getData();
    // 先调用vuex中actions对应的得到地址的方法再调用页面中得到地址的方法，确保刷新之后仍然有数据
    this.getAddress();
    this.getAddressData();
    this.getUserId();
    if (this.cartData == "") {
      this.$router.push({
        name: "home"
      })
    }
  },
  beforeUpdate() {
    if (this.cartData == "") {
      this.$router.push({
        name: "home"
      })
    };
    this.getAddress();
    this.getAddressData();
  },
  methods: {
    ...mapActions(["getCart", "getAddress","doLoginCookie","deleteCartChecked"]),
    async pay(){
      let result = await this.axios.post("/api/userData",{
          id:this.userId 
      });
      let balance = result.data[0].balance;
      if( balance - this.costTotalMoney >=0 && balance !== null && balance !== "" && balance !== undefined){
          if(this.costTotalMoney == 0 && this.getTotalMoney == 0 && this.getTotalCount == 0){
             this.$message('您还没有选择商品');
          }else{
            let cartData = [];
            for(let i=0;i<this.cartData.length;i++){
              if(this.cartData[i].obj.checked){
                   this.cartData[i].obj.state = '正在准备中';
                   cartData.push(this.cartData[i]);
              }
            }
            let address = JSON.stringify(this.addressData);
            let good = JSON.stringify(cartData); 
            let formData = new FormData();
            formData.append("address", address);
            formData.append("good", good);
            formData.append("user", this.userId);
            formData.append("money",this.costTotalMoney);
            await this.axios.post("/api/order/create",formData);
            this.getCart();
            this.getData();
            this.deleteCartChecked();
            this.$router.push({
              name:"afterCost"
            })
          }
      }else{
          this.$message('您的余额不足请充值后购买');
      }
    },
    async getUserId() {
      this.doLoginCookie();
      this.userId = this.getLogin;
      if(this.userId == "" || this.userId == undefined || this.userId.length == 0 || this.userId == -1 || this.userId <=0 ){
      	  this.isLogined = true;
      }else if (this.userId>=1){
          let result = await this.axios.post("/api/findUserName",{
          	id:this.getLogin
          });
          this.userName = result.data;
          this.hasLogined = true;
      }
    },
    getAddressData() {
      this.addressData = this.address;
    },
    getProvience(val) {
      this.provience = val;
    },
    getCity(val) {
      this.city = val;
    },
    getDistrict(val) {
      this.district = val;
    },
    getdetialAddress(val) {
      this.detialAddress = val;
    },
    edit() {
      this.isAppear = true;
      this.appear = true;
    },
    close() {
      this.isAppear = false;
      this.appear = false;
    },
    goPurchase() {
      history.back(-1);
    },
    goHome() {
      this.$router.push({
        name: "home"
      })
    },
    getData() {
      this.cartData = this.cart;
    }
  },
  computed: {
    ...mapGetters(["cart", "address", "getLogin"]),
    getSingleTotalMoney() {
      let singleCount = 0;
      for (let i = 0; i < this.cartData.length; i++) {
        singleCount = this.cartData[i].obj.count * this.cartData[i].obj.version.price;
      }
      return singleCount;
    },
    getTotalCount() {
      let totalCount = 0;
      for (let i = 0; i < this.cartData.length; i++) {
        if (this.cartData[i].obj.checked) {
          totalCount += parseInt(this.cartData[i].obj.count);
        }
      }
      return totalCount;
    },
    getTotalMoney() {
      let total = 0;
      for (let i = 0; i < this.cartData.length; i++) {
        if (this.cartData[i].obj.checked) {

            total += this.cartData[i].obj.count * this.cartData[i].obj.version.price;
        }
      }
      return total;
    },
    getPreferential() {
      let preferential = 0;
      for (let i = 0; i < this.cartData.length; i++) {
        if (this.cartData[i].obj.checked && this.cartData[i].obj.version.preferential !== '无') {
          preferential -= (this.cartData[i].obj.version.price - this.cartData[i].obj.version.preferential);
        }
      }
      return preferential;
    },
    costTotalMoney() {
      let totalMoney = 0;
      for (let i = 0; i < this.cartData.length; i++) {
        if (this.cartData[i].obj.checked) {
          if (this.cartData[i].obj.version.preferential == "无") {
            totalMoney += this.cartData[i].obj.version.price * this.cartData[i].obj.count;
          } else {
            totalMoney += this.cartData[i].obj.version.preferential * this.cartData[i].obj.count;
          }
        }
      }
      return totalMoney;
    }
  },
  filters: {
    coin(val) {
      return val + "元";
    }
  },
  components: {
    "mi-footer": footer,
    "mi-select": select
  }
}

</script>
<style lang="less" scoped>
.cost {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;

  header {
    width: 100%;
    height: 100%;
    background-color: #fff;
    border-bottom: 2px solid #ff6700;

    .header {
      width: 80%;
      height: 100%;
      box-sizing: border-box;
      padding: 26px 0;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      flex-direction: row;
      align-items: center;

      .headInfo {
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;

        img {
          background-color: #ff6700;
          cursor: pointer;
        }

        .title {
          font-size: 28px;
          margin-left: 36px;
          color: #424242;
        }
      }

      .user {
        font-size: 12px;
        
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        // color: #b0b0b0;
        a{
        	color: #757575;
        	          &:hover {
            color: #ff6700;
          }
        }
        .userName {
          transition: all .3s;
          cursor: pointer;
        
          &:hover {
            color: #ff6700;
          }
        }

        .userOrder {
          box-sizing: border-box;
          padding-left: 4px;
          border-left: 1px solid silver;
          margin-left: 8px;
          cursor: pointer;
        }
      }
    }
  }

  .content {
    width: 80%;
    margin: 30px auto;
    background-color: #fff;

    .editAddress {
      box-sizing: border-box;
      padding: 30px;

      .addressTitle {
        font-size: 18px;
        color: #333;
      }

      .userAddress {
        margin-top: 20px;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
        color: #757575;

        .name {
          font-size: 18px;
          color: #333;
        }

        .edit {
          cursor: pointer;
          transition: all .3s;

          &:hover {
            color: #ff6700;
          }
        }

      }

      .userAddress>* {
        margin-right: 20px;
        box-sizing: border-box;
        padding: 10px;
      }
    }

    .good {
      .goodTitle {
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        padding: 30px;
        font-size: 18px;
      }

      .goodItem {
        margin-left: 30px;
        border-top: 1px solid silver;
        border-bottom: 1px solid silver;
        width: 95%;

        .item {
          display: flex;
          justify-content: space-around;
          flex-direction: row;
          align-items: center;

          img {
            width: 80px;
            height: 40px;
          }

          .goodTitle {
            font-size: 14px;
            width: 300px;
            color: #424242;
          }

          .price {
            display: flex;
            width: 100px;
            height: 100%;
            justify-content: center;
            flex-direction: row;
            align-items: center;
          }

          .money {
            width: 200px;
            text-align: center;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: row;

            .singleTotalMoney {
              font-size: 16px;
              // width: 100px;
              color: #ff6700;
            }

            .singleTotalpreferential {
              // width: 100px;
              color: #b0b0b0;
              font-size: 12px;
              text-decoration: line-through;
            }
          }
        }
      }
    }

    .invoice {
      color: #757575;
      width: 100%;
      box-sizing: border-box;
      padding: 30px;
      text-align: right;

      .realityCost {
        i {
          font-size: 30px;
        }
      }

      p {
        margin: 10px;
        margin-right: 0px;

        i {
          color: #ff6700;

          i {
            font-size: 14px !important;
          }
        }
      }
    }

    .placeTheOrder {
      width: 96%;
      // display: flex;
      // justify-content: space-between;
      // flex-direction: row;
      // align-items: center;
      border-top: 1px solid silver;
      margin: 0 auto;
      box-sizing: border-box;
      padding: 30px;
      height: 100px;

      .miniAddress {
         float: left;
        // color: #b0b0b0;
        span{
        	margin: 0 5px;
        }
        .myName {}

        .myPhone {}

        .miniAddress {}
      }

      .operation {
      	float: right;
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        color: #fff;
        text-align: center;
        line-height: 40px;

        .goCart {
          width: 160px;
          height: 40px;
          background-color: #ff6700;
          cursor: pointer;

          &:hover {
            background-color: #f25807;
          }
        }

        .pay {
          width: 160px;
          height: 40px;
          background-color: #ff6700;
          margin-left: 54px;
          cursor: pointer;

          &:hover {
            background-color: #f25807;
          }
        }
      }
    }
  }

  .select {
    // background-color: orange;
    // .address{
    // 	width: 30%!important;
    // 	height: 30%!important;
    // }
  }

  .footer {
    margin-top: 70px;
    text-align: center;
  }
}

</style>
