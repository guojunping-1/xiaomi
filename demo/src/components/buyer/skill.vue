<template>
  <div class="skill">
    <div class="intro">
      <h2>小米闪购</h2>
      <div class="allow">
        <el-button-group>
          <el-button @click="btn('prev')" :disabled="isPrevDisabled" type="success" icon="el-icon-arrow-left"></el-button>
          <el-button @click="btn('next')" :disabled="isNextDisabled" type="success"><i class="el-icon-arrow-right el-icon--right"></i></el-button>
        </el-button-group>
      </div>
    </div>
    <div class="main">
      <div class="head">
        <div class="time">
          <span>{{field}}:00</span>
          <span>场</span>
        </div>
        <div class="photo">
          <img src="../../../static/images/flash.png" alt="">
        </div>
        <h2>距离结束还有</h2>
        <div class="current">
          <p class="hour">{{hours}}</p>
          <i class="symbol">:</i>
          <p class="minute">{{minutes}}</p>
          <i class="symbol">:</i>
          <p class="second">{{seconds}}</p>
        </div>
      </div>
      <div class="skillContent" @mouseover="enter" @mouseleave="leave">
        <ul ref="list" class="skillList" v-if="contentData.length>0">
          <li ref="child" class="good" v-if="index<15" v-for="(data,index) in contentData" @click="goGoodDetial(data.id)">
            <img class="goodImg" :src="data.version[0].imgSrc" alt="">
            <span class="goodTitle">{{data.title}}</span>
            <div class="goodDescContent">
              <span class="goodDesc">{{data.des}}</span>
            </div>
            <div class="price">
              <span class="goodPrice">{{data.version[0].price | coin}}</span>
              <span class="goodPreferential" v-if="data.version[0].preferential != '无'">{{data.version[0].preferential | coin}}</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import { TweenMax } from "gsap/TweenMax";
export default {
  name: "skill",
  created() {
    this.getHot();
    this.getHour();
    this.getTimeDifferent();
    this.autoPlay('start', this);
    // this.isDisabled();
  },
  data() {
    return {
      contentData: [],
      isPrevDisabled: true,
      isNextDisabled: false,
      index: 0,
      field: "",
      hours: "",
      minutes: "",
      seconds: "",
      Interval: "",

    }
  },
  methods: {
    goGoodDetial(Id){
      let params = {id:Id}
      let routeData = this.$router.resolve({
        name: "goodDetial",
        query: params,
        params: {Id}
      });
      window.open(routeData.href, '_blank');
    },
    async getHot() {
      let result = await this.axios("/api/skillList");
      this.contentData = result.data;
    },
    getHour() {
      let date = new Date();
      let hour = date.getHours();
      this.field = hour;
    },
    getTimeDifferent() {
      setInterval(() => {
        let current = new Date();
        let currentYear = current.getFullYear();
        let currentMonth = current.getMonth() + 1;
        let currentDay = current.getDate();
        let currentHour = current.getHours();
        let currentMinute = current.getMinutes();
        let currentSecond = current.getSeconds();
        let now = current.getTime();
        let future = new Date(currentYear, currentMonth, currentDay, currentHour + 2, 0, 0).getTime();
        let timeDifferent = parseInt((future - now) / 1000);
        let differentHours = parseInt(timeDifferent / 3600 % 24);
        let differentMinutes = parseInt(timeDifferent / 60 % 60);
        let differentSeconds = parseInt(timeDifferent % 60);
        differentHours = differentHours < 10 ? "0" + differentHours : differentHours;
        differentMinutes = differentMinutes < 10 ? "0" + differentMinutes : differentMinutes;
        differentSeconds = differentSeconds < 10 ? "0" + differentSeconds : differentSeconds;
        this.hours = differentHours;
        this.minutes = differentMinutes;
        this.seconds = differentSeconds;
      }, 50);
    },
    enter() {
      this.autoPlay('stop', this);
    },
    leave() {
      this.autoPlay('start', this);
    },
    autoPlay(type, _this) {
      clearInterval(this.Interval);

      if (type == "start") {
        this.Interval = setInterval(() => {
          play();
        }, 3000)
      } else if (type == "stop") {
        clearInterval(this.Interval);
      }

      function play() {
        if (_this.$refs.list == undefined) {
          return
        } else {
          let width = 243 * _this.$refs.child.length - _this.$refs.list.offsetWidth * 2;
          _this.index--;
          if (_this.index == -3) {
            TweenMax.to(".skillList", 1, { left: 0 });
            _this.index = 0;
            _this.isNextDisabled = true;
          } else if (_this.index !== 0) {
            _this.isPrevDisabled = false;
          }
          if (_this.$refs.list.offsetLeft > -width) {
            // _this.$refs.list.style.left = -width;
            TweenMax.to(".skillList", 1, { left: _this.index * _this.$refs.list.offsetWidth });
          }
        }
      };

    },
    btn(type) {
      this.autoPlay('stop', this);
      if (type == "prev") {
        this.index++;
        if (this.index != -2) {
          this.isNextDisabled = false;
        }
        if (this.index == 0) {
          // console.log("0000000000000")
          this.isPrevDisabled = true;
        }
        if (this.index >= 1) {
          this.index = 0;
          // this.isPrevDisabled = true;
        } else {
          TweenMax.to(".skillList", 1, { left: this.index * this.$refs.list.offsetWidth })
        }
      } else if (type == "next") {
        let width = 243 * this.$refs.child.length - this.$refs.list.offsetWidth * 2;
        this.index--;
        if (this.index == -2) {
          this.isNextDisabled = true;
        } else if (this.index !== 0) {
          this.isPrevDisabled = false;
        }
        if (this.$refs.list.offsetLeft > -width) {
          // this.$refs.list.style.left = -width;
          TweenMax.to(".skillList", 1, { left: this.index * this.$refs.list.offsetWidth });
        }
      }
    },
    // isDisabled(){
    //  if(this.i == 0){
    //    this.isPrevDisabled = true;
    //    this.isNextDisabled = false;
    //  }else if(this.i == -2){
    //         this.isNextDisabled = true;
    //         this.isPrevDisabled = false;
    //  }else{
    //          this.isPrevDisabled = false
    //      this.isNextDisabled = false
    //  }
    // },
    // prev() {
    //   // if (this.$refs.list.style.left == "") {
    //   //   this.$refs.list.style.left = 0;
    //   // }
    //   // console.log(this.$refs.list.style.left)
    //   // 依靠child的个数来计算总长度
    //   // console.log(this.$refs.list.offsetLeft)
    //   // console.log(parseInt(this.$refs.list.style.left));
    //   // console.log(this.$refs.list.offsetWidth)
    //   // let width = 243 * this.$refs.child.length;
    //   this.i++;
    //   console.log(this.i)
    //   if (this.i == 0) {
    //     // this.$refs.list.style.left = 0;
    //     // this.i = 0;
    //      this.isPrevDisabled = true;
    //     // console.log(this.i)
    //   } else {
    //     // console.log(this.$refs.list.style.left)
    //     // console.log("....")
    //     TweenMax.to(".skillList", 1, { left: this.i * this.$refs.list.offsetWidth })
    //     console.log(this.$refs.list.offsetWidth)

    //     // console.log(this.$refs.list.offsetWidth);
    //   }


    // },
    // next() {
    //     this.i--;
    //  console.log(this.i)
    //   // if (this.$refs.list.style.left == "") {
    //   //   this.$refs.list.style.left = -243 * this.$refs.child.length;

    //   // } else {
    //   //   console.log(".....")
    //   // }
    //   // // 依靠child的个数来计算总长度
    //   // console.log(width)
    //   // console.log(this.$refs.list.style.left)
    //   //         console.log(this.i)
    //   // console.log(this.i * this.$refs.list.offsetWidth)
    //   // console.log(this.$refs.list.offsetLeft)
    //   let width = 243 * this.$refs.child.length - this.$refs.list.offsetWidth * 2;
    //   if (this.$refs.list.offsetLeft > -width) {
    //     TweenMax.to(".skillList", 1, { left: this.i * this.$refs.list.offsetWidth });
    //      this.isPrevDisabled = false;
    //     // console.log(this.i)
    //   }else if(this.i >= -2){
    //       this.$refs.list.left = -width+1000;
    //       this.i = 0;
    //      this.isNextDisabled = true;
    //   }
    //   // console.log(width)
    //   // console.log((parseInt(this.$refs.list.style.left)-this.$refs.list.offsetWidth))
    //   // console.log(this.$refs.child.length+2)
    //   // console.log((parseInt(this.$refs.list.style.left)-this.$refs.list.offsetWidth))
    //   // console.log(this.$refs.list.offsetWidth)
    //   // if ((parseInt(this.$refs.list.style.left)-this.$refs.list.offsetWidth) < -width) {
    //   //   this.$refs.list.style.left = width;
    //   // } else {
    //   // this.i--;
    //   // console.log(this.i)
    //   // console.log(this.$refs.child.length)
    //   // console.log(-parseInt(this.$refs.child.length%4))
    //   // console.log( -parseInt(this.$refs.child.length/4))
    //   // console.log(this.i)
    //   // if(this.$refs.child.length%4 !== 0){
    //   //     if(this.i == -parseInt(this.$refs.child.length/4)-1){
    //   //   this.i--;
    //   //   // console.log(this.$refs.child.length%4)
    //   //     let res = this.$refs.child.length%4;
    //   //     res = res*243
    //   //     TweenMax.to(".skillList", 1, { left: ((this.i+1) * this.$refs.list.offsetWidth)-243});
    //     // console.log("11")
    //     }else if(this.i > -parseInt(this.$refs.child.length/4)){
    //      this.i--;
    //      // console.log(this.i)
    //      TweenMax.to(".skillList", 1, { left: this.i * this.$refs.list.offsetWidth});
    //      // console.log("22")
    //     }
    // }else if(this.i <= -parseInt(this.$refs.child.length/4)){
    //          console.log("....")
    // }else{
    //  this.i--;
    //  TweenMax.to(".skillList", 1, { left: this.i * this.$refs.list.offsetWidth});

    //      // console.log("33")
    // }

    // console.log(this.$refs.list.offsetWidth);
    // }
  },
  filters: {
    coin(val) {
      return val + "元";
    }
  }
}

</script>
<style lang="less" scoped>
.skill {
  width: 100%;
  height: 430px;
  // background-color: pink;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .intro {
    flex: 2;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row;

    h2 {
      font-size: 22px;
      font-weight: 200;
      color: #333;
    }

    .allow {
      div {
        button {
          display: inline-block;
          width: 40px;
          height: 25px;
          padding: 3px 5px;
          margin-left: -1px;
          border: 1px solid #e0e0e0;
          font-size: 16px;
          line-height: 16px;
          -webkit-transition: color .5s;
          transition: color .5s;
          color: #b0b0b0;
          text-align: center;
          cursor: pointer;
          border: 1px solid #e0e0e0;
          background-color: transparent;

          &:hover {
            color: #ff6700;
          }

          p {
            color: #b0b0b0;
          }
        }
      }
    }

  }

  .main {
    flex: 9;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;

    .head {
      flex: 2;
      width: 100%;
      height: 100%;
      text-align: center;
      background-color: #f1eded;
      box-sizing: border-box;
      padding-top: 54px;
      position: relative;

      .time {
        color: #ef3a3b;
        font-size: 21px;
        width: 100%;
        position: absolute;
        top: 50px;
      }

      .photo {
        margin: 60px 0px;
      }

      h2 {
        position: absolute;
        bottom: 140px;
        width: 100%;
      }

      .current {
        display: flex;
        justify-content: center;
        flex-direction: row;
        align-items: center;
        width: 100%;
        height: 46px;
        margin: 28px auto 0;
        position: absolute;
        bottom: 66px;

        i {
          width: 15px;
          height: 100%;
          line-height: 46px;
          color: #605751;
          font-size: 28px;
        }
      }

      .current>p {
        width: 46px;
        height: 46px;
        background: #605751;
        color: #fff;
        font-size: 24px;
        line-height: 46px;
      }
    }

    .skillContent {
      position: relative;
      left: 0;
      width: 100%;
      height: 100%;
      flex: 8;
      overflow: hidden;

      .skillList {
        position: relative;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        flex-direction: row;
        flex-wrap: nowrap;
        height: 100%;
        margin-left: 5px;
        left: 0;

        .good {
          width: 336px;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          flex-direction: column;
          flex-wrap: nowrap;
          // background-color: pink;
          background-color: #ffffff;
          margin: 0 4.8px;
          box-sizing: border-box;
          padding: 10px 16px;
          cursor: pointer;
          // border-top: 2px solid pink;

          .goodImg {
            width: 160px;
            height: 100px;
            margin-top: 0px;

          }

          .goodTitle {
            font-size: 14px;
            font-weight: 400;
            color: #212121;
            text-align: center;
            text-overflow: ellipsis;
            overflow: hidden;
            white-space: nowrap;
            margin-top: 30px;
          }

          .goodDescContent {
            width: 200px;
            margin-top: 6px;

            .goodDesc {
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
              text-align: left;
              font-size: 12px;
              text-overflow: ellipsis;
              color: #b0b0b0;
              overflow: hidden;
            }
          }

          .price {
            margin-top: 30px;
            .goodPrice {
              color: #e53935;
              margin-top: 40px;
              font-size: 14px;
              margin-bottom: -40px;
            }

            .goodPreferential {
              color: #b0b0b0;
              font-size: 12px;
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}

</style>
