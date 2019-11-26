<template>
	<div class="sidebar">
		<router-link 
		v-for="(siderBar,index) in silderBars"
	    :to="siderBar.path" tag="li" :key="index" class="item"
	    >
			<p>
				{{siderBar.title}}
			</p>
		</router-link>
	</div>
</template>

<script>
	export default{
         data(){
			return {
				currentIndex:0,
				silderBars:[
					{"title":"首页","path":"/index/miHome"},
					{"title":"用户管理","path":"/index/miUser"},
					{"title":"订单管理","path":"/index/miOrder"},
					{"title":"物流管理","path":"/index/miExpress"},
					{"title":"产品管理","path":"/index/miProduct"},
					{"title":"库存管理","path":"/index/miSave"},
					{"title":"分类管理","path":"/index/miCategory"},
					{"title":"销售统计","path":"/index/miSell"}
				]
			}
		},
		methods:{
			
		}
	}
</script>

<style lang="less" scoped>
  .router-link-active{
  	background-color: white;
  }
  .active{
  	background-color: white;
  }
  .sidebar{
  	z-index: 100;
  	position: fixed;
  	left: 0;
  	top: 60px;
  	background-color: rgba(0,0,0,0);
  	width: 200px;
  	height: 100%;
  	background-color: skyblue;
  	display: flex;
  	justify-content: flex-start;
  	flex-direction: column;
      .item{
          font-size: 20px;
          box-sizing: border-box;
          padding: 16px;
          cursor: pointer;
          width: 100%;
          text-align: center;
      }
  }
</style>