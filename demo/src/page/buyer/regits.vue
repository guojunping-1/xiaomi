<template lang="html">
  <div class="contianer">
    <div class="regits">
      <h1 class="head">Regits</h1>
      <div class="content">
        <!-- 关于用户名的验证 -->
        <input class="userName" @blur = "isUserNameActive('blur')" @focus="isUserNameActive('focus')" @input="userNameInput" placeholder="请输入用户名"  type="text" v-model="userName">
        <img v-show = "userNameRight" class="userRightImg" src="../../../static/images/right.png" alt="">
        <img v-show = "userNameWrong" class="userWrongImg" src="../../../static/images/worse.png" alt="">
        <!-- 关于邮箱的验证 -->
        <input @input="emialInput" class="emial"  placeholder="请输入邮箱" type="text" v-model="emial" @blur = "isEmialActive('blur')" @focus="isEmialActive('focus')">
        <img v-show = "emialRight" class="emialRightImg" src="../../../static/images/right.png" alt="">
        <img v-show = "emialWrong" class="emialWrongImg" src="../../../static/images/worse.png" alt="">
        <!-- 关于手机号码的验证 -->
        <input class="phone" placeholder="请输入手机号"  type="text" v-model="phone"
          @input="phoneInput" @blur = "isPhoneActive('blur')" @focus="isPhoneActive('focus')">
         <img v-show = "phoneRight" class="phoneRightImg" src="../../../static/images/right.png" alt="">
        <img v-show = "phoneWrong" class="phoneWrongImg" src="../../../static/images/worse.png" alt="">
        <!-- 密码 -->
        <input class="pwd" placeholder="请输入密码"  type="password" v-model="pwd"> 
        <button class="btn" type="text" @click="doRegits">Regits</button>
        <img class="userNameImg" src="../../../static/images/userName.png" alt="">
        <img class="emialImg" src="../../../static/images/emial.png" alt="">
        <img class="phoneImg" src="../../../static/images/phone.png" alt="">
        <img class="pwdImg" src="../../../static/images/pwd.png" alt="">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:"regits",
  data(){
    return{
       count:"",
       pwd:"",
       userName:"",
       phone:"",
       emial:"",
       userNameRight:false,
       userNameWrong:false,
       emialRight:false,
       emialWrong:false,
       phoneRight:false,
       phoneWrong:false
    }
  },
  methods:{
     // 注册操作
     async doRegits(){
        if(this.userName == "" || this.userNameWrong == true){
             this.$alert("用户名有误","提示")
       }else if(this.emial == "" || this.emialWrong == true){
             this.$alert("请输入正确邮箱","提示")
       }else if(this.phone == "" || this. phoneWrong == true){
             this.$alert("请输入正确的手机号码","提示")
       }else if(this.pwd == ""){
             this.$alert("密码不可为空","提示")
       }else{
         // this.phone = this.phone.substr(0, 3) + '****' + this.phone.substr(7);
         let result = await this.axios.post('/api/regits',{
             pwd:this.pwd,
             userName:this.userName,
             phone:this.phone,
             emial:this.emial
         });
        this.$alert(`账号不可更改,您的账号为:${result.data.count}`, "提示", {
          confirmButtonText: '确定',
          callback: action => {
               this.$router.push({
                path:"/login"
               })
          }
        });
       }

    },
    // 实时监听用户名的输入
    async userNameInput(){
          let result = await this.axios.post("/api/getUsrName",{
            userName:this.userName
          });
          result = result.data;
          if(result.state == 1){
             this.userNameRight = true;
             this.userNameWrong = false;
          }else if (result.state == -1){
             this.userNameWrong = true;
             this.userNameRight = false;
          }
    },
    // 监听用户名输入框焦点的获取和失去
    isUserNameActive(type){
        if(type == "focus"){
             if(this.userName == ""){
                this.userNameWrong = true;
                this.userNameRight = false;
             }
        }else if(type = "blur"){
            if(this.userName == ""){
                this.userNameWrong = true;   
                this.userNameRight = false; 
            }
        }
    },
    // 利用正则验证邮箱格式
    emialInput(){
        let emial = this.emial;
        const emailReg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if(emailReg.test(emial)){
            this.emialRight = true;
            this.emialWrong = false;
        }else{
            this.emialWrong = true;
            this.emialRight = false;
        }
    },
    // 监听邮箱input的焦点
    isEmialActive(type){
        if(type == "focus"){
             if(this.emial == ""){
                this.emialWrong = true;
             }
        }else if(type == "blur"){
            if(this.emial == ""){
                this.emialWrong = true;  
            }
        }
    },
    // 关于手机号的验证
    phoneInput(){
        let phone = this.phone;
        let phoneReg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/;
        if(phoneReg.test(phone)){
            this.phoneRight = true;
            this.phoneWrong = false;
        }else{
            this.phoneRight = false;
            this.phoneWrong = true;           
        }
    },
  // 监听手机input的焦点
    isPhoneActive(type){
        if(type == "focus"){
             if(this.phone == ""){
                this.phoneWrong = true;
             }
        }else if(type == "blur"){
            if(this.phone == ""){
                this.phoneWrong = true;  
            }
        }
    }  
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
  background-image: url(../../../static/images/IMG_0296.jpg);
  width: 100%;
  height: 760px;
  background-position:  0 -250px;
  background-size: 100%, 100%;
  background-repeat: no-repeat;
  .regits {
    position: fixed;
    top: 50%;
    margin-top: -200px;
    margin-left: -300px;
    left: 50%;
    width: 600px;
    height: 400px;
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
    	height: 300px;
    	display: flex;
    	justify-content: space-around;
    	align-items: center;
    	flex-direction: column;
    	.userName{
    		width: 320px;
    		height: 30px;
    		outline: none;
    		background-color: rgba(0,0,0,0);
    		border:0px;
    		color: white;
    		border-bottom: 1px solid white;
    		font-size: 20px;
    	}
        .phone{
            width: 320px;
            height: 30px;
            outline: none;
            background-color: rgba(0,0,0,0);
            border:0px;
            color: white;
            border-bottom: 1px solid white;
            font-size: 20px;
        }
        .emial{
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
    	.btn{
            width: 200px;
            height: 30px;
            border-radius: 20px;
            outline: none;
            border: 0px;
            // background-color: rgba(0,0,0,.3);
            background-image: linear-gradient(to right,#e66465, #9198e5);
            color: white;
            font-size: 20px;
            line-height: 0px;
            cursor: pointer;
    	}
    	.userNameImg{
    		width: 22px;
    		height: 22px;
    		position: absolute;
    		top: 16px;
    		left: 100px;
    	}
    	.pwdImg{
    		width: 22px;
    		height: 22px;
    		position: absolute;
    		top: 186px;
    		left: 100px;
    	}
        .countImg{
            width: 22px;
            height: 22px;
            position: absolute;
            top:64px;
            left: 100px;
        }
        .phoneImg{
            width: 22px;
            height: 22px;
            position: absolute;
            top: 130px;
            left: 100px;
        }
        .emialImg{
            width: 22px;
            height: 22px;
            position: absolute;
            top: 74px;
            left: 100px;
        }
        .userRightImg{
            width: 26px;
            height: 26px;
            position: absolute;
            top: 14px;
            left: 470px;
        }
        .userWrongImg{
            width: 24px;
            height: 24px;
            position: absolute;
            top: 14px;
            left: 470px;
        }
        .emialRightImg{
            width: 26px;
            height: 26px;
            position: absolute;
            top: 70px;
            left: 470px;            
        }
        .emialWrongImg{
            width: 24px;
            height: 24px;
            position: absolute;
            top: 70px;
            left: 470px;            
        }
        .phoneRightImg{
            width: 26px;
            height: 26px;
            position: absolute;
            top: 136px;
            left: 470px;  
        }
        .phoneWrongImg{
            width: 24px;
            height: 24px;
            position: absolute;
            top: 136px;
            left: 470px;               
        }
    }
  }
}
// 关于正确和错误图标的样式

</style>
