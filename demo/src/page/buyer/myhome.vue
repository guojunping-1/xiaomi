<template>
	<div class="myHome">
		<header>
			<mi-nav :isLogin=userId />
				<div class="topNav">
					<mi-navList />
				</div>
		</header>
		<div class="contianer">
			<div class="tour">
				<a href="/">首页</a>
				<span class="allow">></span>
				<span class="info">{{path}}</span>
			</div>
            <div class="content">
	            <div class="sidebarContent">
					<mi-sidebar />
				</div>
				<div class="componentContent">
					<router-view></router-view>
				</div>
            </div>
		</div>
        <mi-footer class="footer" />
	</div>
</template>
<script>
	import nav from "../../components/buyer/nav.vue"
	import navList from "../../components/buyer/navList.vue"
	import footer from "../../components/buyer/footer.vue"
	import { mapActions , mapGetters } from "vuex"
	import sidebar from "../../components/buyer/sidebar.vue"
	export default{
		name:"myHome",
		created(){
            this.isLogined();
            this.getPath();
		},
		data(){
			return{
				userId:"",
				path:""
			}
		},
		methods:{
			...mapActions(["doLoginCookie"]),
			isLogined(){
				this.doLoginCookie();
				if(this.getLogin == "" || this.getLogin == null || this.getLogin == undefined){
                	this.$router.push({
                		name:"home"
                	})
                }else{
                    this.userId = this.getLogin;
                }
			},
			getPath(){
				if(this.$route.path == "/myhome/order"){
				    this.path = "订单中心";
				}else if(this.$route.path == "/myhome/recharge"){
                    this.path = "充值中心";
				}else if(this.$route.path == "/myhome/self"){
                    this.path = "个人中心";
				}
			}
		},
		watch:{
             "$route":"getPath"
		},
		computed:{
			...mapGetters(["getLogin"]),
		},
		components: {
			"mi-nav": nav,
			"mi-navList": navList,
			"mi-sidebar": sidebar,
			"mi-footer": footer
		}
	}
</script>
<style lang="less" scoped>
	.myHome{
        	background-color: #f5f5f5;
        	font: 14px/1.5 "Helvetica Neue",Helvetica,Arial,"Microsoft Yahei","Hiragino Sans GB","Heiti SC","WenQuanYi Micro Hei",sans-serif;
        header{
        	background-color: #fff;
        	.topNav{
        		width: 80%;
        		margin: 0 auto;
        	}
        }
        .contianer{
        	width: 100%;
        	height: 100%;
	        margin: 0px auto;
	        display: flex;
	        justify-content: center;
	        flex-direction: column;
	        // align-items: flex-start;
	        .tour{
                width: 80%;
                margin: 0 auto;
                box-sizing: border-box;
                padding: 14px 0px;
                font-size: 12px;
                color: #757575;
                a{
                	color: #757575;
                }
 	        }
	        .content{
	        	width: 80%;
	        	height: 100%;
	        	display: flex;
	        	margin: 0px auto;
	        	justify-content: center;
	        	flex-direction: row;
	        	align-items: flex-start;
	        	.sidebarContent{
	        		flex: 2;
	                background-color: #fff;
	        	}
	        	.componentContent{
	        		flex: 8;
	                background-color: #fff;
	                margin-left: 20px;
	        	}
	        }
        }
        .footer{
        	margin-top: 50px;
        }
	}
</style>