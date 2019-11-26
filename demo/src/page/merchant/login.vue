<template>
  <div class="contianer">
    <div class="login">
      <h1 class="head">Login</h1>
      <div class="content">
        <input class="count" type="text" v-model="count">
        <input class="pwd" type="password" v-model="pwd">
        <button style="cursor: pointer;" @click="dologin">login</button>
        <img class="countImg" src="../../../static/images/count.png" alt="">
        <img class="pwdImg" src="../../../static/images/pwd.png" alt="">
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex"
export default {
  name: "login",
  data() {
    return {
      count: "",
      pwd: ""
    }
  },
  methods: {
    ...mapActions(["doLogin"]),
    async dologin() {
      if (this.count == "" || this.count == undefined || this.pwd == "" ||
        this.pwd == undefined) {
        alert("请输入正确的账号和密码");
        return
      }
      let res = await this.axios.post("api/back/doLogin", {
        count: this.count,
        pwd: this.pwd
      });
      let data = res.data.state;
      if (data == 1) {
        alert("登录成功");
        this.doLogin();
        this.$router.replace({
          name: "index"
        })
      } else if (data == -1) {
        alert("登录失败");
        this.count = "";
        this.pwd = "";
      }
    }
  }
}

</script>
<style lang="less" scoped>
.contianer {
  background-image: url(../../../static/images/bg.jpg);
  width: 100%;
  height: 760px;
  -webkit-background-size: 100%, 100%;
  background-size: 100%, 100%;

  .login {
    position: fixed;
    top: 50%;
    margin-top: -150px;
    margin-left: -300px;
    left: 50%;
    width: 600px;
    height: 300px;
    background-color: rgba(0,0,0,.3);
    display: flex;
    justify-content: space-around;
    flex-direction: column;
    align-items: center;
    .head{
    	font-size: 50px;
    	color: white;
    }
    .content{
    	position: relative;
    	width: 100%;
    	height: 200px;
    	display: flex;
    	justify-content: space-around;
    	align-items: center;
    	flex-direction: column;
    	.count{
    		width: 320px;
    		height: 30px;
    		outline: none;
    		background-color: rgba(0,0,0,0);
    		border:0px;
    		color: white;
    		border-bottom: 1px solid white;
    		font-size: 20px;
    	}
    	.pwd{
    		width: 320px;
    		height: 30px;
    		outline: none;
    		background-color: rgba(0,0,0,0);
    		border:0px;
    		color: white;
    		border-bottom: 1px solid white;
    		font-size: 20px;
    	}
    	button{
            width: 200px;
            height: 30px;
            border-radius: 20px;
            outline: none;
            border: 0px;
            // background-color: rgba(0,0,0,.3);
            background-image: linear-gradient(to right,#e66465, #9198e5);
            color: white;
            font-size: 20px;
    	}
    	.countImg{
    		width: 26px;
    		height: 26px;
    		position: absolute;
    		top: 22px;
    		left: 100px;
    	}
    	.pwdImg{
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
