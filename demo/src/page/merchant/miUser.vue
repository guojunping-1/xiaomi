<template>
  <div class="userList">
    <el-table :data="isListUrl" style="width: 100%">
      <el-table-column prop="id" label="id" width="180" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="username" label="用户名" width="180" align="center">
      </el-table-column>
      <el-table-column prop="count" label="账户" align="center">
      </el-table-column>
      <el-table-column prop="phone" label="手机号" align="center">
      </el-table-column>
      <el-table-column prop="emial" label="邮箱" align="center">
      </el-table-column>
    </el-table>
    <!-- 分页 -->
      <my-page :listUrl= getpage :countUrl= totalcount />
  </div>
</template>
<script>
  /*import config from "../../../configs.js"*/
  import {mapGetters} from "vuex"
export default {
  data() {
    return {
      // userList: [],
      // 一个页面都多少行数据，来自config
      // singlePageNum:1,
      // 计算总行数
      // totalMsg:0,
      // 当前在第几页
      // pageNo:0,
      getpage:"api/back/merchants/getPage",
      totalcount:"api/back/merchants/totalCount"
    }
  },
  async created() {
    // this.singlePageNum = config.page
    // this.getMerchants();
    // this.getTotalCount();
  },
  methods:{
    // currentPage(val){
    //      this.pageNo = val-1;
    //      this.getMerchants();
    // },
    // async getMerchants(){
    //         let count = await this.axios("api/back/merchants/getPage",{
    //         params:{
    //             pageNo:(this.pageNo)*(this.singlePageNum),
    //             singlePageNum:this.singlePageNum
    //         }
    //       });
    //       this.userList = count.data;
    // },
    // async getTotalCount(){
    //       let totalCount = await this.axios("api/back/merchants/totalCount")
    //       let total = totalCount.data[0].count;
    //       this.totalMsg = total;
    // }
  },
  computed:{
      ...mapGetters(["isListUrl"])
  }
}

</script>
<style lang="less" scoped>
.userList {
  width: 80%;
  margin-left: 250px;
  margin-top: 100px;
}
.page{
  margin-top: 100px;
}
</style>
