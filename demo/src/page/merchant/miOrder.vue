<template>
    <div class="order">
    	    <el-table
    	      v-if="order.length>0"
		      :data = "order"
		      style="width: 100%"
		      @row-click="currentIndex"
		      >
			      <el-table-column
			        prop="id"
			        label="订单号"
			        width="70"
                    align="center"
			        >
			      </el-table-column>
			      <el-table-column
			        prop="count"
			        label="账号"
			        width="110"
                    align="center"
			        >
			      </el-table-column>			      
			      <el-table-column
			        prop="username"
			        label="昵称"
			        width="120"
                    align="center"
			        >
			      </el-table-column>
			      <el-table-column  label="地址" align="center" width="320">
                      <template slot-scope="scope">
                         <div  v-for="(item ,index) in scope.row.address">
                         	<span>{{item.provience}}</span>
                         	<span>{{item.city}}</span>
                         	<span>{{item.district}}</span>
                         	<span>{{item.detial}}</span>
                         </div>
                      </template>
			      </el-table-column>
			      <el-table-column
			        label="商品" align="center" props="good"
			        >
			        <template slot-scope="scope">
                         <el-table :data="scope.row.good">
                         	<el-table-column  label="标题" align="center">
                         		<template slot-scope="scope">
                         			<span>{{scope.row.obj.title}}</span>
                         		</template>
                         	</el-table-column>
                         	<el-table-column  label="商品图片" align="center">
                         		<template slot-scope="scope">
                         			<img style="width: 100px;height: 60px" :src="scope.row.obj.version.imgSrc" alt="">
                         		</template>
                         	</el-table-column>                         	
                         	<el-table-column  label="商品版本" align="center">
                         		<template slot-scope="scope">
                                    <span>{{scope.row.obj.version.type}}</span>
                           		</template>
                         	</el-table-column>                          	
                         	<el-table-column  label="商品单价" align="center">
                         		<template slot-scope="scope">
                                    <span v-if="scope.row.obj.version.preferential != '无'">{{scope.row.obj.version.preferential |coin}}</span>
                                    <span v-else>{{scope.row.obj.version.price |coin}}</span>
                           		</template>
                         	</el-table-column>
                         	<el-table-column  label="商品件数" align="center">
                         		<template slot-scope="scope">
                                    <span>{{scope.row.obj.count |count}}</span>
                           		</template>
                         	</el-table-column>
                         	<el-table-column  label="小计" align="center">
                         		<template slot-scope="scope">
                                    <span v-if="scope.row.obj.version.preferential != '无'">{{scope.row.obj.version.preferential*scope.row.obj.count |coin}}</span>
                                    <span v-else>{{scope.row.obj.version.price*scope.row.obj.count |coin}}</span>
                           		</template>
                         	</el-table-column>                          	
                         	<el-table-column  label="状态" align="center" width="100">
                         		<template slot-scope="scope">
                                    <span class="confirm" @click="changeState(scope.row,scope.$index)" style="color: #ff6700;">{{scope.row.obj.state}}</span>
                           		</template>
                         	</el-table-column>         	
                         </el-table>
			        </template>
			      </el-table-column>
			      <el-table-column label="总价" width="80">
			      	 <template slot-scope="scope">
			      	 	  <div>
			      	 	  	<span>{{userTotal(scope.$index)|coin}}</span>
			      	 	  </div>
			      	 </template>
			      </el-table-column>
		    </el-table> 
    </div>
</template>

<script>
	export default{
		name:"order",
		created(){
			this.getOrder();
		},
		beforeUpdate(){
			this.getOrder();
		},
        data(){
        	return{
                order:"",
                orderId:""
        	}
        },
        methods:{
        	currentIndex(val){
                this.orderId = val.id;
        	},
        	async getOrder(){
        		let result = await this.axios("/api/back/order");
                this.order = result.data;
        	},
        	changeState(val,index){
                if(val.obj.state == '卖家已发货'){
                    
                }
		        this.$confirm('确定发货?', '提示', {
		          confirmButtonText: '确定',
		          cancelButtonText: '取消',
		          type: 'warning'
		        }).then(() => {
		          this.changeSateInBack(val,index);
		          this.$message({
		            type: 'success',
		            message: '确定!'
		          });
		        }).catch(() => {
		          this.$message({
		            type: 'info',
		            message: '已取消'
		          });          
		        });
        	},
        	async changeSateInBack(val,index){
        		let goodId = val.obj.id;
        		let versionId = val.obj.version.id;
        		await this.axios.post("/api/back/order/changeState",{
        			goodId:goodId,
        			versionId:versionId,
        			orderId:this.orderId
        		})
        	}
        },
        computed:{
        	userTotal(type){
                return function(type){
        		// console.log(type)
                let total = 0;
        		for(let i=0;i<this.order[type].good.length;i++){
        				total += parseInt(this.order[type].good[i].obj.version.price*this.order[type].good[i].obj.count)
        		}
        		return total;
                }
        	}
        },
        filters:{
        	coin(val){
        		return val + "元";
        	},
        	count(val){
        		return val + "件";
        	}
        }
	}
</script>

<style lang="less" scoped>
	.confirm{
		cursor: pointer;
		text-decoration: underline;
	}
   .order{
   	     position: relative;
		  margin-top: 80px;
		  width: 87%;
		  height: 100%;
		  margin-left: 200px;
   }
</style>