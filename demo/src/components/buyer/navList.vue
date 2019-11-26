<template>
  <div class="navList" @mouseleave="leave">
    <div class="father">
      <a class="logo" href="/">
        <img style="background-color: #ff6700;cursor: pointer;" src="../../../static/images/mi-logo.png" alt="">
      </a>
      <ul class="category">
        <li v-for="(category,index) in childDatas" :key=index @mouseover="enter" @mousemove="move(index)">
          {{category.categoryName}}
        </li>
      </ul>
      <!--         <el-autocomplete class="search" suffix-icon="el-icon-search" popper-class="my-autocomplete" v-model="state" :fetch-suggestions="querySearch" placeholder="请输入内容" @select="handleSelect">
        <i class="el-input__icon" slot="suffix" @click="handleIconClick">
        </i>
        <template slot-scope="{ item }">
          <div class="name">{{ item.value }}</div>
          <span class="addr">{{ item.address }}</span>
        </template>
      </el-autocomplete>   -->
      <div>
      </div>
    </div>
    <div id="child" ref="child">
        <ul v-if="childDatas.length>0" v-show="isShow">
          <li @click="goGoodDetial(childData.id)" v-if="index<6" id="list" ref="list" v-for="(childData,index) in childDatas[i].good" >
            <img :src="childData.goodVersion[0].imgSrc" alt="">
            <p class="title">{{childData.title}}</p>
            <p class="price">{{childData.goodVersion[0].price |coin}}</p>
          </li>
        </ul>
    </div>
  </div>
</template>
<script>
import { TweenMax } from "gsap/TweenMax";
export default {
  name: "navList",
  data() {
    return {
      childDatas: [],
      i: 0,
      isShow: true,
      // isLiShow: false,
    }
  },
  created() {
    this.getChildData();
  },
  methods: {
    goGoodDetial(Id) {
      let params = {id:Id}
      let routeData = this.$router.resolve({
        name: "goodDetial",
        query: params,
        params: {Id}
      });
      window.open(routeData.href, '_blank');

      // this.$router.push({
      //   name:"goodDetial",
      //   params:{
      //     id
      //   }
      // })
    },
    beforeEnter(el) {
      // this.$refs.child.style.zIndex = "100"
    },
    beforeLeave(el) {
      // this.isLiShow = false;
      // // console.log(this.$refs.list)
      // // console.log("y8yyyyyyy")
    },
    afterEnter() {
      // this.isLiShow = true;
    },
    move(index) {
      this.i = index;
      // this.isShow = true;
      // this.$refs.child.style.zIndex = "100"
      
    },
    enter() {
      TweenMax.to("#child", .3, { display: "block" ,height:230,onComplete:function(){
        TweenMax.to("#list", 0, { display: "block" })
      }})
    },
    leave() {
      TweenMax.to("#child", .3, {display: "none", height:0,onStart:function(){
        TweenMax.to("#list",0, { display: "none" })
      }})
    },
    async getChildData() {
      let result = await this.axios("/api/findNavGood");
      this.childDatas = result.data;
    }
  },
  filters: {
    coin(val) {
      return val + "元起"
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../../static/css/lessFunction.less";

.v-enter {
  display: none;
  height: 300px;
}

// 关于动画、
@keyframes move {
  0% {
    height: 0;
    z-index: 0;
  }

  100% {
    height: 100%;
    z-index: 100;
  }
}

.slideInDown {
  animation: move .4s linear;
  animation-fill-mode: forwards;
  // animation-delay:1s;
}

.slideOutUp {
  animation: move .4s reverse linear;
  animation-fill-mode: forwards;
}

.navList {
  height: 100%;
  width: 100%;
  margin: 0 auto;
  // background-color: pink;
  background-color: #ffffff;
  .flex(space-between, column);

  .father {
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    width: 100%;

    .search {
      margin-right: -130px;
    }

    .category {
      height: 100%;
      .flex(space-around, center);

      li {
        margin-left: 40px;
        cursor: pointer;
        height: 100%;
        line-height: 100px;
        font-size: 14px;
        color: #333;

        &:hover {
          color: #FF6700;
        }
      }
    }
  }

  #child {
    width: 100%;
    height: 0;
    z-index: 100;
    // display: none;
    // border-top: 1px solid silver;  
    position: absolute;
    top: 140px;
    left: 0;
    display: none;
    box-shadow: 0px 1px 2px 1px rgba(0, 0, 0, .3);
    ul {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      // .flex(center, row);
      display: flex;
      justify-content: center;
      flex-direction: row;
      align-items: center;
      cursor: pointer;
      background-color: white;


      #list {
        width: 200px;
        cursor: pointer;
        // height: 100%;
        // margin: 0 auto;
        // // margin-left: -300px;
        // width: 200px;
        box-sizing: border-box;
        padding: 10px 12px 0;
        position: relative;
        display: none;
        // position: relative;
        // display: none;


        // border-right: 1px solid silver;
         &:after {
           content: "";
           position: absolute;
           width: 2px;
           height: 100px;
           background-color: #E0E0E0;
           top: 0px;
           left: 200px;
         }

        img {
          margin-top: -10px;
          width: 160px;
          height: 100px;
        }

        .title {
          font-size: 12px;
          margin-top: 20px;
          color: gray;
        }

        .price {
          font-size: 14px;
          margin-top: 10px;
          color: #ff6700;
        }
      }
    }
  }
}

</style>
