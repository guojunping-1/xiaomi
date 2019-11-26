<template>
  <div class="afterCost">
  	<mi-nav :isLogin=userId />
    <header>
      <div class="info">
      	      <img src="../../../static/images/afterCost.png" alt="">
              <p class="title">您的订单已经提交，我们会尽快安排发货</p>
      </div>
      <a href="/" class="continuate">继续购物</a>
      <div class="logo">
      	      <img src="../../../static/images/快递.png" alt="">
      </div>
    </header>
    <div class="content">
      <p class="a">您可能还喜欢</p>
      <ul class="recomded">
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
    <mi-footer />
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
import footer from "../../components/buyer/footer.vue"
import nav from "../../components/buyer/nav.vue"
export default {
  name: "afterCost",
  created() {
    this.getdata();
    this.isLogined();
  },
  data() {
    return {
      miPhone: "",
      redMiPhone: "",
      userId:""
    }
  },
  methods: {
  	...mapActions(["doLoginCookie"]),
  	isLogined(){
  		this.doLoginCookie();
  		this.userId = this.getLogin;
  	},
  	 goGoodDetial(Id) {
      let params = { id: Id }
      let routeData = this.$router.resolve({
        name: "goodDetial",
        query: params,
        params: { Id }
      });
      window.open(routeData.href, '_blank');
    },
    async getdata() {
      let result = await this.axios("/api/getCategory/miPhone");
      let result2 = await this.axios("/api/getCategory/redMiPhone")
      this.miPhone = result.data;
      this.redMiPhone = result2.data;
    }
  },
  computed: {
      ...mapGetters(["getLogin"])
  },
  filters: {
    coin(val) {
      return val + "元";
    }
  },
  components: {
    "mi-footer": footer,
    "mi-nav": nav
  }
}

</script>
<style lang="less" scoped>
.afterCost {
  width: 100%;
  height: 100%;

  header {
  	width: 80%;
  	margin: 0 auto;
  	.info{
  		box-sizing: border-box;
  		padding: 70px 50px;
  		display: flex;
  		justify-content: flex-start;
  		flex-direction: row;
  		align-items: center;
	  	img{
	  		width: 60px;
	  		height: 60px;
	  		margin-right: 20px;
	  	}
        .title{
            font-size: 20px;
        }
  	}
  	.logo{
  		img{
  			display: block;
  			margin: 0 auto;
  		}
  	}
  }
  .continuate{
  		box-sizing: border-box;
  		padding: 0px 50px;
  		font-size: 20px;
  		cursor: pointer;
  		transition: all .3s;
  		width: 180px;
  		color: #2C3E50;
  		&:hover{
  			color: #ff6700;
  		}  
  }
  .content {
      background-color: #f5f5f5;
    .a {
    	width: 100%;
    	height: 50px;
         font-size: 30px;
         color: #b0b0b0;
         text-align: center;
         display: flex;
         align-items: flex-end;
         justify-content: center;
    }

    .recomded {
      text-align: center;
      margin: 50px auto;
      width: 1215px;
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
        margin: 10px 12px 10px 12px;
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
}

</style>
