<template>
  <div class="phone">
    <div class="head">
      <img src="../../../static/images/手机.png" alt="">
    </div>
    <div class="category">
      <p>手机</p>
    </div>
    <ul class="content">
      <li v-if="i<=4" v-for="(mi,i) in miPhone" @click="goGoodDetial(mi.id)">
        <img :src="mi.version[0].imgSrc" alt="">
        <p class="title">{{mi.title}}</p>
        <p class="desc">{{mi.des}}</p>
        <p class="price">{{mi.version[0].price | coin}}</p>
      </li>
      <li v-if="index<=4" v-for="(red,index) in redMiPhone" @click="goGoodDetial(red.id)">
        <img :src="red.version[0].imgSrc" alt="">
        <p class="title">{{red.title}}</p>
        <p class="desc">{{red.des}}</p>
        <p class="price">{{red.version[0].price | coin}}</p>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "phone",
  data() {
    return {
      miPhone: [],
      redMiPhone: []
    }
  },
  created() {
    this.getPhoneList();
  },
  methods: {
    goGoodDetial(Id) {
      let params = { id: Id }
      let routeData = this.$router.resolve({
        name: "goodDetial",
        query: params,
        params: { Id }
      });
      window.open(routeData.href, '_blank');
    },
    async getPhoneList() {
      let result = await this.axios("/api/getCategory/miPhone");
      let result2 = await this.axios("/api/getCategory/redMiPhone")
      this.miPhone = result.data;
      this.redMiPhone = result2.data;
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
.phone {
  width: 100%;
  height: 100%;
  text-align: center;
  margin-top: 22px;
  display: flex;
  justify-content: center;
  // align-items: center;
  flex-direction: column;

  .head {
    flex: 3;

    img {
      height: 100%;
      width: 100%;
    }

    margin-bottom: 22px;
  }

  .category {
    flex: 1;
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    p {
      text-align: left;
      font-weight: 200;
      line-height: 58px;
      color: #333;
      font-size: 22px;
    }
  }

  .content {
    flex: 6;
    width: 103%;
    height: 628px;
    display: flex;
    justify-content: flex-start;
    // align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    // background-color: pink;

    li {
      width: 18%;
      height: 45%;
      margin: 10px 20px 10px 0px;
      background-color: #ffffff;
      cursor: pointer;
      // border: 1px solid black;
      box-sizing: border-box;
      position: relative;
      transition: all .2s linear;
      top: 0px;

      &:hover {
        box-shadow: 0 15px 30px rgba(0, 0, 0, .1);
        transform: translate3d(0, -2px, 0);
      }

      img {
        width: 160px;
        height: 100px;
        margin-top: 40px;
      }

      .title {
        font-size: 14px;
        font-weight: 400;
        color: #333;
        margin-top: 40px;
      }

      .desc {
        width: 70%;
        margin: 0 auto;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        height: 18px;
        font-size: 12px;
        color: #b0b0b0;
        line-height: 18px;
        margin-top: 6px;
      }

      .price {
        text-align: center;
        color: #ff6700;
        margin-top: 14px;
      }
    }
  }
}

</style>
