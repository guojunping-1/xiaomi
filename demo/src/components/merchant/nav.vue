<template>
  <div class="nav">
    <div class="logo">
      <img src="../../../static/images/100339_52770043.jpg" alt="">
      <p>商场后端管理页面</p>
    </div>
    <div class="logOut">
      <p @click="logOut">退出</p>
    </div>
  </div>
</template>
<script>
import {mapActions} from "vuex"
export default {
  name: 'HelloWorld',
    methods:{
      ...mapActions(["doLoginOut"]),
      logOut() {
        let isLogOut = confirm("是否退出?");
        if(isLogOut){
            this.doLoginOut();
            this.$router.replace({
              name: "login"
            })    
        }
      }
    }
  } 

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
*{margin: 0;padding: 0}
.nav {
    position: fixed;
    top: 0px;
    width: 100%;
    height: 60px;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
    background-color: skyblue;
    z-index: 100;
       .logo {
         display: flex;
         justify-content: flex-start;
         flex-direction: row;
         align-items: center;
            img {
                 width: 200px;
                 height: 60px;
            }
            p {
                font-size: 20px;
                text-align: center;
                line-height: 60px;
                margin-left: 10px;
            }
       }
       .logOut{
           margin-right: 50px;
           line-height: 60px;
           cursor: pointer;
           p{
                 &:hover{
                    color: red;
                 }      
           }
       }
}

</style>
