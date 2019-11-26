<template>
  <div class="hot">
    <ul class="recommended">
      <li>
        <img src="../../../static/images/小米秒杀.png" alt="">
        <span>小米秒杀</span>
      </li>
      <li>
        <img src="../../../static/images/企业团购.png" alt="">
        <span>企业团购</span>
      </li>
      <li>
        <img src="../../../static/images/f码通道.png" alt="">
        <span>F码通道</span>
      </li>
      <li>
        <img src="../../../static/images/米粉卡.png" alt="">
        <span>米粉卡</span>
      </li>
      <li>
        <img src="../../../static/images/以旧换新.png" alt="">
        <span>以旧换新</span>
      </li>
      <li>
        <img src="../../../static/images/花费充值.png" alt="">
        <span>话费充值</span>
      </li>
    </ul>
    <ul class="sale">
      <li v-for="(data,index) in hotData" @click="goGoodDetial(data.good[0].id)">
        <img :src="data.imgSrc" alt="">
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "hot",
  created() {
    this.getHot();
  },
  data() {
    return {
      hotData: []
    }
  },
  methods: {
    goGoodDetial(Id) {
      console.log(Id)
      let params = { id: Id }
      let routeData = this.$router.resolve({
        name: "goodDetial",
        query: params,
        params: { Id }
      });
      window.open(routeData.href, '_blank');
    },
    async getHot() {
      let result = await this.axios("/api/hot");
      this.hotData = result.data;
    }
  }
}

</script>
<style lang="less" scoped>
.hot {
  width: 100%;
  height: 170px;
  margin-top: 14px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  .recommended {
    flex: 2;
    height: 100%;
    background-color: skyblue;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    flex-wrap: wrap;
    background-color: #5f5750;

    li {
      width: 33%;
      height: 50%;
      text-align: center;
      line-height: 85px;
      font-size: 12px;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;

      &:hover span {
        color: white;
      }

      img {
        width: 24px;
        height: 24px;
      }

      span {
        height: 30px;
        text-align: center;
        line-height: 30px;
        color: silver;
        transition: color .2s;
      }
    }
  }

  .sale {
    flex: 8;
    // background-color: yellow;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    li {
      flex: 1;
      height: 100%;
      box-sizing: border-box;
      padding-left: 16px;

      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
      }

    }
  }
}

</style>
