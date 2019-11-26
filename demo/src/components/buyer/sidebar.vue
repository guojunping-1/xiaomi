<template>
  <ul class="sidebar">
    <router-link class="item" v-for="(data,index) in routerData" tag="li" :to="data.path" :key=index>{{data.title}}</router-link>
  </ul>
</template>
<script>
export default {
  name: "sidebar",
  data() {
    return {
      routerData: [
	      { title: "个人中心", path: "/myhome/self" }, 
	      { title: "订单中心", path: "/myhome/order" }, 
	      // { title: "充值中心", path: "/myhome/recharge" }
      ]
    }
  }
}

</script>
<style lang="less" scoped>
  .router-link-active{
  	color: #ff6700;
  }
   .sidebar{
   	   display: flex;
   	   justify-content: center;
   	   flex-direction: column;
   	   align-items: center; 
       // height: 200px;
   	   .item{
   	   	   flex: 1;
   	   	   cursor: pointer;
   	   	   width: 100%;
   	   	   text-align: center;
   	   	   box-sizing: border-box;
   	   	   padding: 15px 100px 15px 0px;
   	   }
   	   &:first-child{
   	   	 padding-top: 50px;
   	   }
   	   &:last-child{
   	   	 padding-bottom: 50px;
   	   }
   }
</style>
