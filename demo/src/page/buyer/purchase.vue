<template>
  <div class="purchase">
    <header>
      <div class="headerContent">
        <div class="info">
          <div class="logo" @click="goHome">
            <img src="../../../static/images/mi-logo.png" alt="">
          </div>
          <div class="title">
            <h2 class="bigTitle">我的购物车</h2>
            <p class="prompt">温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</p>
          </div>
        </div>
        <div class="operation" v-show="isLogin">
          <div class="login">
            <a href="/login">登录</a>
          </div>
          <div class="regits">
            <a href="/regits">注册</a>
          </div>
        </div>
      </div>
    </header>
    <div class="content" v-if = "hasCart">
      <ul class="firstLine">
        <li class="checkBox">
          <el-checkbox :value=allChecked @change="checkBoxChange"></el-checkbox>
          <span>全选</span>
        </li>
        <li class="title">商品名称</li>
        <li class="price">单价</li>
        <li class="count">数量</li>
        <li class="singleMoney">小计</li>
        <li class="operation">操作</li>
      </ul>
      <ul class="item" v-for="(data,index) in purchaseData">
        <li class="checkBox">
          <el-checkbox :value=data.obj.checked @change="changeSingleItem(index)"></el-checkbox>
        </li>
        <li id="title">
          <img :src="data.obj.version.imgSrc" alt="">
          <span class="goodName">{{data.obj.title}}</span>
        </li>
        <li class="price">
          <span >{{data.obj.version.preferential == '无'? data.obj.version.price:data.obj.version.preferential |coin}}</span>
          <span class="preferential" v-if="data.obj.version.preferential !== '无'">{{data.obj.version.price|coin}}</span>
        </li>
        <li class="block">
          <p class="describle" @click="change(index,'describle')">-</p>
          <!-- <p class="count">{{data.obj.count}}</p> -->
          <el-input class="count" @input="changeSingleCount($event,index)" v-model=data.obj.count></el-input>
          <p class="plus" @click="change(index,'plus')">+</p>
        </li>
        <li class="singleMoney">
          <span>
            {{data.obj.version.preferential == '无'? data.obj.count*data.obj.version.price:data.obj.count*data.obj.version.preferential|coin }}
          </span>
        </li>
        <li class="operation">
          <p @click="open(index)">x</p>
        </li>
      </ul>
    </div>
    <ul class="total" v-if = "hasCart">
      <li class="continute">
        <p @click="goHome">继续购物</p>
      </li>
      <li class="cartTotal">
        <span>共<i>{{purchaseData.length}}</i>件商品，已选择<i>{{getCheckCount}}</i>件</span>
      </li>
      <li class="pay" @click="goCost">
        <p>去结算</p>
      </li>
      <li class="totalPrice">
        <span>合计: <i>{{cartTotalMoney}}</i> 元</span>
      </li>
    </ul>
    <div class="noCart" v-if = "noCart">
       <div class="noCartImg">
         <img src="../../../static/images/cart-empty.png" alt="">
       </div>
       <div class="info">
         <p class="title">您的购物车还是空的!</p>
         <a class="btn" href="/" >马上去购物</a>
       </div>
    </div>
    <mi-footer class="footer" />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import footer from "../../components/buyer/footer.vue"
export default {
  name: "purchase",
  components:{
  	"mi-footer":footer
  },
  data() {
    return {
      purchaseData: [],
      input: 1,
      isLogin: false,
      isIndeterminate: false,
      allChecked: "",
      clickCount: 0,
      getCheckCount: 0,
      hasCart: false,
      noCart: true
    }
  },
  created() {
  	this.doLoginCookie();
    this.getCart();
    this.getPurchaseData();
    this.getCheck();
    if (this.getLogin > 0) {
      this.isLogin = false;
    } else if (this.getLogin <= 0 || this.getLogin == undefined) {
      this.isLogin = true;
    }
    this.isAllchecked();
  },
  beforeUpdate() {
    this.getPurchaseData();
    this.getCheck();
  },
  methods: {
    ...mapActions(["getCart", "changeCount", "clearSomeCartItem", "singleCheckBox", "editCartChecked","doLoginCookie"]),
    changeSingleCount(event,index){
       let reg = /^[1-9]\d*$/;
       let result = reg.test(event);
       if(result){
        let params = {index:index,event:event,type:'setCount'};
        this.changeCount({obj:params});
       }else{
        this.$message("请输入从1开始的正整数");
        let params = {index:index,event:event,type:'atLeastZero'};
        this.changeCount({obj:params});
       }
    },
    goHome(){
      this.$router.push({
        name:"home"
      })
    },
    goCost(){
      if(this.cartTotalMoney == 0){
          this.$message('您还没有选择商品');
      }else{
          this.$router.push({
            name:"cost"
          })
      }
    },
    goHome(){
    	this.$router.push({
    		name:"home"
    	})
    },
    getCheck() {
      let count = 0;
      let tag = 0;
      for (let i = 0; i < this.purchaseData.length; i++) {
        if (this.purchaseData[i].obj.checked) {
          count++;
          tag = 1;
          this.getCheckCount = count;
        }
      }
      if(tag == 0){
      	this.getCheckCount = 0;
      }
    },
    checkBoxChange(val) {
      if (val) {
        this.editCartChecked({ obj: true });
        this.allChecked = true;
      } else {
        this.editCartChecked({ obj: false });
        this.allChecked = false;
      }
    },
    changeSingleItem(index) {
      this.singleCheckBox({ obj: index });
      this.isAllchecked();
    },
    isAllchecked() {
      let tag = 0;
      for (let i = 0; i < this.purchaseData.length; i++) {
        if (this.purchaseData[i].obj.checked == false) {
          this.allChecked = false;
          tag = 1;
        }
      }
      if (tag == 0) {
        this.allChecked = true;
      }
    },
    getPurchaseData() {
      this.purchaseData = this.cart;
      if(this.purchaseData.length == 0 || this.purchaseData == "" || this.purchaseData == undefined || this.purchaseData == null){
        this.hasCart = false;
        this.noCart = true;
      }else{
        this.hasCart = true;
        this.noCart = false;
      }
    },
    deleteSomeOne(index) {
      this.clearSomeCartItem({ obj: index });
    },
    open(index) {
      this.$confirm('确定删除吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteSomeOne(index)
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    change(index, type) {
      let obj = { index, type };
      if (type == 'describle') {
        if (this.purchaseData[index].obj.count <= 1) {
          return;
        } else {
          this.changeCount({ obj: obj });
        }
      } else if (type == 'plus') {
        this.changeCount({ obj: obj });
      }
    }
  },
  computed: {
    ...mapGetters(["cart", "getLogin"]),
    cartTotalMoney(){
    	let total = 0;
    	for(let i=0;i<this.purchaseData.length;i++){
    		if(this.purchaseData[i].obj.checked){
          if(this.purchaseData[i].obj.version.preferential !=='无'){
            total += this.purchaseData[i].obj.count*this.purchaseData[i].obj.version.preferential;
          }else {
            total += this.purchaseData[i].obj.count*this.purchaseData[i].obj.version.price;
          }
    		}
    	}
    	return total;
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
.purchase {
  background-color: #f5f5f5;
  height: 1000px;

  header {
    width: 100%;
    border-bottom: 2px solid #ff6700;
    background-color: #fff;

    .headerContent {
      width: 80%;
      box-sizing: border-box;
      margin: 26px auto;
      padding-bottom: 50px;

      .info {
        float: left;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: row;

        .logo {
          width: 93px;
          height: 48px;
          text-align: left;
          cursor: pointer;

          img {
            width: 48px;
            height: 48px;
            background-color: #ff6700;
          }
        }

        .title {
          display: flex;
          justify-content: center;
          align-items: flex-end;
          flex-direction: row;

          .bigTitle {
            font-size: 28px;
            color: #424242;

          }

          .prompt {
            font-size: 12px;
            color: #757575;
            margin-left: 10px;
            font-weight: 300;
          }
        }
      }

      .operation {
        margin-top: 26px;
        width: 80px;
        height: 100%;
        float: right;
        display: flex;
        justify-content: center;
        align-items: flex-end;
        flex-direction: row;
        font-size: 12px;
        text-align: center;

        .login {
          box-sizing: border-box;
          // padding-right: 5px;
          height: 100%;
          width: 100%;

          a {
            display: block;
            color: #757575;
            font-weight: 300;
          }

          margin-right: 5px;
          border-right: 1px solid #757575;
        }

        .regits {
          color: #757575;
          width: 80%;
          height: 100%;
          font-weight: 300;
        }
      }
    }
  }

  .content {
    width: 80%;
    margin: 30px auto;
    background-color: #ffffff;

    .firstLine {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: row;
      box-sizing: border-box;
      padding: 20px 0;
      color: #424242;
      // font-size: 14px;
      font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;

      .title {
        width: 300px;
        text-align: center;
      }

      .count {
        width: 200px;
        text-align: center;
      }
    }

    .item {
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: row;
      padding: 30px 0;
      border-top: 1px solid silver;

      .checkBox {
        margin-left: -0px;
      }

      .block {
        // width: 200px;
        text-align: center;
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        height: 100%;
        font-size: 20px;
        border: 1px solid silver;
        // margin-left: -20px;

        * {
          width: 30px;
          height: 30px;
          // margin: 10px;
          line-height: 30px;
          // border: 1px solid #ff6700;
          cursor: pointer;
        }

        .plus {
          &:hover {
            background-color: #e0e0e0;
          }
        }

        .describle {
          &:hover {
            background-color: #e0e0e0;
          }
        }

        .count {
          width: 50px;
          height: 30px;
          border: 0;
          input{
            padding-left: 0;
            padding-right: 0;
            height: 30px;
          }
        }
      }

      #title {
        width: 300px;
        height: 60px;
        display: flex;
        justify-content: flex-start;
        flex-direction: row;
        align-items: center;

        img {
          width: 100px;
          height: 60px;
        }

        .goodName {
          line-height: 60px;
          margin-left: 30px;
        }
      }

      .price {
        margin-left: -44px;
        width: 160px;
        text-align: center;
        .preferential{
          font-size: 12px;
          color: #b0b0b0;
          text-decoration: line-through;
        }
      }

      .singleMoney {
        margin-right: 0;
        color: #ff6700;
      }

      .operation {
        p {
          cursor: pointer;
          width: 20px;
          height: 20px;
          text-align: center;
          line-height: 20px;
          transition: all .3s;
          border-radius: 100%;

          &:hover {
            border-radius: 100%;
            background-color: #e53935;
          }
        }
      }
    }
  }

  .total {
    background-color: #fff;
    width: 80%;
    margin: 0 auto;
    height: 60px;
    box-sizing: border-box;
    padding: 20px 0px;
    margin-bottom: 50px;

    .continute {
      color: #757575;
      font-size: 14px;
      width: 80px;
      text-align: center;
      border-right: 1px solid #e0e0e0;
      float: left;
      line-height: 20px;
      cursor: pointer;
      transition: all .2s;
      &:hover{
      	color: #ff6700;
      }
    }

    .cartTotal {
      color: #757575;
      font-size: 14px;
      float: left;
      line-height: 20px;
      margin-left: 16px;

      i {
        color: #ff6700;
      }
    }

    .totalPrice {
      color: #ff6700;
      font-size: 14px;
      float: right;
      line-height: 10px;

      i {
        font-size: 40px;
        margin-left: 16px;
      }
    }

    .pay {
      float: right;
      width: 200px;
      height: 60px;
      margin-top: -20px;
      line-height: 60px;
      text-align: center;
      background-color: #ff6700;
      font-size: 20px;
      color: #fff;
      margin-left: 66px;
      cursor: pointer;
      transition: all .3s;
      &:hover{
      	background-color: #f25807;
      }
    }
  }
  .noCart{
    width: 80%;
    margin: 100px auto;
    display: flex;
    justify-content: center;
    flex-direction: row;
    align-items: center;
    img{}
    .info{
      .title{
        font-size: 36px;
        color: #b0b0b0;
      }
      .btn{
        width: 172px;
        height: 50px;
        margin: 20px auto;
        margin-bottom: -40px;
        background-color: #ff6700;
        color: #fff;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
        transition: all .3s;
        display: block;
        &:hover{
          background-color: #f25807;
        }
      }
    }
  }
  .footer{
    text-align: center;
  }
}

</style>
<style>
.el-checkbox__inner {
  width: 20px;
  height: 20px;
}

.el-checkbox__inner:hover {
  border-color: #ff6700;
}

.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  border: 1px solid #ff6700;
  background-color: #ff6700;
}

.el-checkbox__inner::after {
  top: 50%;
  left: 50%;
  margin-top: -4px;
  margin-left: -2px;
}

.el-input__inner {
  width: 50px;
  height: 30px;
  border: 0;
  text-align: center;
  padding: 0;
}

* {
  font: 14px/1.5 "Helvetica Neue", Helvetica, Arial, "Microsoft Yahei", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei", sans-serif;
}

</style>
