<template lang="html">
  <div class="contianer">
    <div class="login">
      <h1 class="head">Login</h1>
      <div class="content">
        <input placeholder="请输入手机号或账号" class="count" type="text" v-model="count">
        <input placeholder="请输入密码" class="pwd" type="password" v-model="pwd">
        <button @click="dologin">login</button>
        <img class="countImg" src="../../../static/images/count.png" alt="">
        <img class="pwdImg" src="../../../static/images/pwd.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex"
export default {
  name: "login",
  data() {
    return {
      count: "",
      pwd: ""
    }
  },
  methods: {
    ...mapActions(["Alogin"]),
    async dologin() {
      if (this.count == "" || this.pwd == "") {
        this.$message('请输入正确的账号和密码');
      } else {
        let count = this.count;
        let phoneReg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        let result = "";
        if (phoneReg.test(count)) {
          result = await this.axios.post("/api/login", {
            phone: count,
            pwd: this.pwd
          })
        } else {
          result = await this.axios.post("/api/login", {
            count: count,
            pwd: this.pwd
          })
        }
        if (result.data.state == 1) {
          this.$message(result.data.info);
          // if (this.isGood == -1) {
          //   this.$router.push({
          //     path: "/"
          //   })
          // } else if (this.isGood >= 0) {
          //   // console.log(this.isGood)
          //   this.$router.push({
          //     path: `/gooddetial`,
          //     query: {
          //       id: this.isGood
          //     }
          //   })
          // } 
          let id = result.data.id;
          this.Alogin({ obj: id });
          history.go(-1);
        } else if (result.data.state == -1) {
          this.count = "";
          this.pwd = "";
          this.$message(result.data.info);
        }
      }
    }
  },
  computed: {
    ...mapGetters(["isGood"])
  }
}

</script>
<style lang="less" scoped>
// 修改placeholder样式
input::-webkit-input-placeholder {
  color: white;
  font-size: 14px;
}

input::-moz-input-placeholder {
  color: white;
  font-size: 14px;
}

input::-ms-input-placeholder {
  color: white;
  font-size: 14px;
}

.contianer {
  background-image: url(../../../static/images/DJI_0131.jpg);
  width: 100%;
  height: 760px;
  background-size: 100%, 100%;
  position: fixed;

  .login {
    position: fixed;
    top: 50%;
    margin-top: -150px;
    margin-left: -300px;
    left: 50%;
    width: 600px;
    height: 300px;
    background-color: rgba(0, 0, 0, .3);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;

    .head {
      font-size: 50px;
      color: white;
    }

    .content {
      position: relative;
      width: 100%;
      height: 200px;
      display: flex;
      justify-content: space-around;
      align-items: center;
      flex-direction: column;

      .count {
        width: 320px;
        height: 30px;
        outline: none;
        background-color: rgba(0, 0, 0, 0);
        border: 0px;
        color: white;
        border-bottom: 1px solid white;
        font-size: 20px;
      }

      .pwd {
        width: 320px;
        height: 30px;
        outline: none;
        background-color: rgba(0, 0, 0, 0);
        border: 0px;
        color: white;
        border-bottom: 1px solid white;
        font-size: 20px;
      }

      button {
        width: 200px;
        height: 30px;
        border-radius: 20px;
        outline: none;
        border: 0px;
        // background-color: rgba(0,0,0,.3);
        background-image: linear-gradient(to right, #e66465, #9198e5);
        color: white;
        font-size: 20px;
        cursor: pointer;
      }

      .countImg {
        width: 26px;
        height: 26px;
        position: absolute;
        top: 22px;
        left: 100px;
      }

      .pwdImg {
        width: 26px;
        height: 26px;
        position: absolute;
        top: 90px;
        left: 100px;
      }
    }
  }
}

</style>
