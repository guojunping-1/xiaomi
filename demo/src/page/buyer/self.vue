<template>
    <div class="self">
	    <div class="selfContent">
	       <div class="info">
	       	<!-- <img src="../../../static/images/photo.jpg" alt=""> -->
	       	<el-upload
			  class="avatar-uploader"
			  action="http://localhost:10086/api/editImg"
			  :data = {id:userId}
			  :show-file-list="false"
			  :on-success="handleAvatarSuccess"
			  :before-upload="beforeAvatarUpload">
			  <img v-if="this.userData.length>0 && this.userData[0].header !== ''" :src="this.userData[0].header" class="avatar">
			  <img v-else :src="imageUrl" alt="">
			  <!-- <i v-else="imageUrl" class="el-icon-plus avatar-uploader-icon"></i> -->
			</el-upload>
	        <div class="title" v-for="(data,index) in userData">
		       	<p class="userCount">{{data.count}}</p>
	        	<p class="userName">{{data.username}}</p>
		       	<p class="wel">欢迎回来</p>
	        </div>
	       </div>
	       <div class="operation" v-for="(data,index) in userData">
	       	    <p class="emial">绑定邮箱:
	       	    	<i>{{data.emial}}</i>
	       	    	<el-button type="text" class="editInfo" @click="open('emial')">修改</el-button>
	       	    </p>
	       	    <p class="phone">绑定手机:
	       	    	<i>{{data.phone}}</i>
	       	    	<el-button type="text" class="editInfo" @click="open('phone')">修改</el-button>
	       	    </p>
	       	    <p class="emial">修改密码:
	       	    	<el-button  type="text" class="editInfo" @click="open('pwd')">修改</el-button>
	       	    </p>
	       </div>
		</div>
		<div class="recharge">
			<div class="balance">
				<img src="../../../static/images/portal-icon-1.png" alt="">
                <div class="info">
                    <p class="findBalance" @click="query" v-show = "findBalance">余额查询</p>
				    <p class="money" v-if="isQuery">账户余额<i>{{userMoney|coin}}</i></p>
                </div>
			</div>
			<div class="topUp">
				<img src="../../../static/images/portal-icon-4.png" alt="">
				<p @click="recharge">点击充值</p>
			</div>
		</div>
    </div>
</template>
<script>
	import {mapActions,mapGetters} from "vuex"
	export default{
		name:"self",
		data(){
			return{
               userId:"",
               userName:"",
               userCount:"",
               userData:"",
               imageUrl:"../../../static/images/photo.jpg",
               userMoney:"",
               isQuery:false,
               findBalance:true
			}
		},
		created(){
            this.getUserName();
            this.getUserData();
		},
		beforeUpdate(){
			this.getUserData();
		},
		methods:{
            ...mapActions(["doLoginCookie"]),
            async topUp(value){
                await this.axios.post("/api/topUp",{
                	money:value,
                	id:this.userId
                });
                this.userMoney = this.userData[0].balance;
            },
            recharge(){
                    this.$prompt('请输入密码', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputType:'password'
			        }).then(({ value }) => {
                       if(this.userData[0].pwd == value){
                       this.$prompt('请输入充值金额', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputPattern:/^[1-9]\d*$/,
			          inputErrorMessage: '输入的金额不得小于0'
			        }).then(({ value }) => {
                          this.topUp(value);
				          this.$message({
				            type: 'success',
				            message: '充值成功'
				          });

			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消输入'
			          });       
			        });
                       }else{
                       	  this.$message('请输入正确密码');
                       }
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消输入'
			          });       
			        });
            },
            query(){
                    this.$prompt('请输入密码', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputType:'password'
			        }).then(({ value }) => {
                       if(this.userData[0].pwd == value){
                          this.getMoney();
				          this.$message({
				            type: 'success',
				            message: '查询余额'
				          });
                       }else{
                       	  this.$message('请输入正确密码');
                       }
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消输入'
			          });       
			        });
            },
            getMoney(){
            	if(this.userData[0].balance == null || this.userData[0].balance == undefined || this.userData[0].balance == ""){
            		this.userData[0].balance = 0;
            	}
            	this.userMoney = this.userData[0].balance;
            	this.isQuery = true;
            	this.findBalance = false;
            },
             handleAvatarSuccess(res, file) {
		        this.imageUrl = URL.createObjectURL(file.raw);
		        this.$message("修改成功");
		      },
		      beforeAvatarUpload(file) {
		        const isJPG = file.type === 'image/jpeg';
		        const isLt2M = file.size / 1024 / 1024 < 2;

		        if (!isJPG) {
		          this.$message.error('上传头像图片只能是 JPG 格式!');
		        }
		        if (!isLt2M) {
		          this.$message.error('上传头像图片大小不能超过 2MB!');
		        }
		        return isJPG && isLt2M;
		      },
             open(type) {
                 if(type == 'emial'){
                    this.$prompt('请输入邮箱', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputPattern: /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/,
			          inputErrorMessage: '邮箱格式不正确'
			        }).then(({ value }) => {
			          this.edit(type,value)
			          this.$message({
			            type: 'success',
			            message: '你的邮箱是: ' + value
			          });
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消输入'
			          });       
			        });
                 }else if (type == 'phone'){
                    this.$prompt('请输入手机', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputPattern: /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/,
			          inputErrorMessage: '手机格式不正确'
			        }).then(({ value }) => {
			          this.edit(type,value)
			          this.$message({
			            type: 'success',
			            message: '你的手机是: ' + value
			          });
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消输入'
			          });       
			        });
                 }else if(type == 'pwd'){
                 	this.$prompt('请输入旧密码', '提示', {
			          confirmButtonText: '确定',
			          cancelButtonText: '取消',
			          inputType:'password'
			        }).then(({ value }) => {
			          if(value == this.userData[0].pwd){
	                    this.$prompt('请输入新密码', '提示', {
				          confirmButtonText: '确定',
				          cancelButtonText: '取消',
				          inputType:'password'
				        }).then(({ value }) => {
				          this.edit(type,value)
				          this.$message({
				            type: 'success',
				            message: '修改成功'
				          });
				        }).catch(() => {
				          this.$message({
				            type: 'info',
				            message: '取消输入'
				          });       
				        });
			          }else if(this.value !== this.userData[0].pwd){
                         this.$message('密码不正确');
			          }
			        }).catch(() => {
			          this.$message({
			            type: 'info',
			            message: '取消输入'
			          });       
			        });
                 }
		      },
		    async edit(type,value){
		    	await this.axios.post("/api/edit",{id:this.userId,type:type,value:value});
		    },
            async getUserName(){
               this.doLoginCookie();
               this.userId = this.getLogin;
            },
            async getUserData(){
            	let result = await this.axios.post("/api/userData",{
            		id:this.userId
            	});
            	this.userData = result.data;
            	for(let i=0;i<this.userData.length;i++){
            		this.userData[i].phone = this.userData[i].phone.substr(0,3) + '****' + this.userData[i].phone.substr(7);
            		this.userData[i].emial = this.userData[i].emial.substr(0,3) + '****' + this.userData[i].emial.substr(7);
            	}
            }
		},
		computed:{
            ...mapGetters(["getLogin"])
		},
		filters:{
			coin(val){
				return val + "元";
			}
		}

	}
</script>
<style lang="less" scoped>
.self{
	display: flex;
	justify-content: center;
	flex-direction: column;
	// align-items: flex-start;
	.selfContent{
		display: flex;
		justify-content: center;
		flex-direction: row;
		align-items: center;
		border-bottom: 10px solid #f5f5f5;	
		.info{
			flex: 1;
			box-sizing: border-box;
			padding: 70px 40px 40px 50px;
			display: flex;
			justify-content: flex-start;
			flex-direction: row;
			align-items: center;
			img{
				width: 150px;
				height: 150px;
				border-radius: 50%;
				padding: 4px;
				border: 1px solid #b0b0b0;
			}
			.title{
				margin-left: 16px;
				.userCount{
					font-size: 24px;
				}
				.userName{
					font-size: 14px;
				}
				.wel{
					font-size: 12px;
					color: #b0b0b0;
				}
			}	
		}
		.operation{
			flex: 1;
            .phone{
            	margin-top: 16px;
            }
            p{
            	.editInfo{
            		margin-left: 10px;
            		transition: all .3s;
            		cursor: pointer;
            		&:hover{
            			color: #ff6700;
            		}
            	}
            }
		}
	}
	.recharge{
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding: 40px 60px;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: row;
		.balance{
            flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: row;
            align-items: center;
            .info{
            	width: 100%;
            	height: 100%;
	            .findBalance{
	            	margin-left: 16px;
	            	transition: all .3s;
	            	cursor: pointer;
	            	&:hover{
	            		color: #ff6700;
	            	}
	            }
	            .money{
	            	margin-left: 16px;
	            	width: 100%;
	            	height: 100%;
	            	i{
	            		margin-left: 10px;
	            	}
	            }
            }
		}
		.topUp{
			flex: 1;
            display: flex;
            justify-content: center;
            flex-direction: row;
            align-items: center;
            p{
            	margin-left: 16px;
            	transition: all .3s;
            	cursor: pointer;
            	&:hover{
            		color: #ff6700;
            	}
            }
		}
	}
}
</style>
<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    border-radius: 50%;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 160px;
    height: 160px;
    line-height: 169px;
    text-align: center;
  }
  .avatar {
    width: 160px;
    height: 160px;
    display: block;
  }
</style>