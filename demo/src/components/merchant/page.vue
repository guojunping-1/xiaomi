<template>
  <div class="page">
    <el-pagination class="page" background  layout="prev, pager, next" :page-size="singlePageNum" @current-change="currentPage" :total="totalMsg">
    </el-pagination>
  </div>
</template>
<script>
import config from "../../../configs.js"
import { mapActions } from "vuex"
export default {
  props: ["listUrl", "countUrl"],
  data() {
    return {
      singlePageNum: config.page,
      currentIndex: 0,
      totalMsg: 0,
      pageNo:0
    }
  },
  methods: {
    ...mapActions(["addListUrl"]),
    currentPage(val) {
      this.currentIndex = val - 1;
      this.getList();
    },
    async getList() {
      let list = await this.axios(this.listUrl, {
        params: {
          pageNo:(this.currentIndex)*(this.singlePageNum),
          singlePageNum: this.singlePageNum
        }
      });
        this.addListUrl({ obj: list.data });
    },
    async getCount() {
      let result = await this.axios(this.countUrl);
      result = result.data[0].count;
      this.totalMsg = result;
    }
  },
  created() {
    this.getList();
    this.getCount();
    this.singlePageNum = config.page;
  }
}

</script>
<style lang="less" scoped>
.page{
  text-align: center;
}
</style>
