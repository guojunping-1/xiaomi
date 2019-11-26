<template>
  <div class="carousel">
    <div class="sidebar" @mouseleave="leave">
      <div class="tour">
        <ul>
          <li @mouseover="enter(index)" v-for="(category,index) in categorys" :key="index" :class="{active:index == current}">
            <div>
              <span>{{category.categoryName}}</span>
              <span>{{category.ontherName}}</span>
            </div>
            <img src="../../../static/images/箭头.png" alt="">
          </li>
        </ul>
      </div>
      <div class="content" v-show="isContentShow">
        <ul v-if="contentData.length>0 && current!=-1">
          <li class="list" v-for="data in contentData[current].good" @click="goGoodDetial(data.id)">
            <img :src=" data.goodVersion[0].imgSrc" alt="">
            <p class="detial">{{data.title}}</p>
          </li>
        </ul>
      </div>
    </div>
    <el-carousel height="460px" arrow="hover">
      <el-carousel-item v-if="item.version.length>0" v-for="(item,index) in carouelList" :key="index" >
        <img class="photo" :src="item.version[0].imgSrc" alt="" @click="goGoodDetial(item.id)">
        <p class="title" @click="goGoodDetial(item.id)">{{item.title}}</p>
        <div class="descConetnt">
          <p class="desc" @click="goGoodDetial(item.id)">{{item.des}}</p>
        </div>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  name: "carousel",
  created() {
    this.getCarousel();
    this.getCategory();
    this.getContentData();
  },
  data() {
    return {
      carouelList: [],
      categorys: [],
      current: -1,
      isContentShow: false,
      contentData: []
    }
  },
  methods: {
    // 获取轮播图片
    goGoodDetial(Id){
      let params = {id:Id}
      let routeData = this.$router.resolve({
        name: "goodDetial",
        query: params,
        params: {Id}
      });
      window.open(routeData.href, '_blank');
    },
    async getCarousel() {
      let result = await this.axios("/api/getCarousel");
      this.carouelList = result.data;
    },
    // 获取类别
    async getCategory() {
      let result = await this.axios("/api/getCarousel/category");
      this.categorys = result.data;
    },
    // 进入sidebar
    enter(index) {
      this.current = index;
      this.isContentShow = true;
    },
    // 离开sidebar
    leave() {
      this.isContentShow = false;
      this.current = -1;
    },
    async getContentData() {
      let result = await this.axios("/api/findNavGood");
      this.contentData = result.data;
    }
  },
  filters: {
    cate(val) {
      return val + "米家"
    }
  }
}

</script>
<style lang="less" scoped>
@import "../../../static/css/lessFunction.less";

.el-carousel__arrow el-carousel__arrow--left {
  position: absolute;
  left: 300px;
}

.active {
  background-color: #ff6700;
}

.el-carousel__indicator {
  background-color: black;
}

.carousel {
  z-index: 0;
  position: relative;
  cursor: pointer;

  .sidebar {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    position: absolute;

    .content {
      flex: 8;
      width: 80%;
      height: 100%;
      background-color: #ffffff;
      right: 0px;
      z-index: 100;
      position: absolute;
      box-shadow: 0 8px 16px rgba(0, 0, 0, .18);

      ul {
        width: 100%;
        height: 100%;

        display: flex;
        justify-content: flex-start;
        // align-items: flex-start;
        align-content: flex-start;
        flex-direction: column;
        flex-wrap: wrap;
        li {
          width: 235px;
          height: 75px;
          box-sizing: border-box;
          padding: 18px 20px;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: row;
          flex-wrap: wrap;

          img {
            width: 40px;
            height: 40px;
          }

          .detial {
            width: 50%;
            color: #333;
            margin-left: 20px;
            text-overflow: ellipsis;
            overflow: hidden;
            font-size: 14px;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }

    .tour {
      position: absolute;
      left: 0px;
      top: 0px;
      height: 100%;
      width: 20%;
      z-index: 120;
      background-color: rgba(105, 101, 101, .6);

      ul {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        box-sizing: border-box;
        padding: 20px 0;

        li {
          position: relative;
          cursor: pointer;
          flex: 1;
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-direction: row;
          cursor: pointer;
          width: 100%;

          div {
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            margin-left: 16px;

            span {
              // margin-left: 60px;
              margin: 0 10px;
              color: #ffffff;
              font-size: 14px;
            }
          }

          img {
            width: 16px;
            height: 16px;
            position: absolute;
            right: 30px;
          }
        }
      }
    }

  }

  .photo {
    width: 100%;
    height: 100%;
  }

  .title {
    position: absolute;
    bottom: 30%;
    right: 5%;
    font-size: 30px;
    color: #ff6700;
    // transform: translate(180%, -50%);
  }

  .descConetnt {
    width: 500px;
    height: 64px;
    position: absolute;
    bottom: 10%;
    right: 5%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;

    /*超出部分文字以...显示*/
    .desc {
      text-align: right;
      font-size: 14px;
      color: #ff6700;
      line-height: 26px;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
  }
}

</style>
<style>
.el-carousel__arrow--left {
  left: 260px;
}
.el-carousel__container{
  width: 100%;
}
</style>
