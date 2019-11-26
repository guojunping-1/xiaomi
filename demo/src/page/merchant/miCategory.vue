<template>
  <div class="category">
    <el-row>
      <el-button class="add" type="primary" @click="addCategory()">产品添加</el-button>
    </el-row>
    <el-table  v-loading="isLoading" :data="categoryList" style="width: 100%">
      <el-table-column prop="id" label="id" width="550">
      </el-table-column>
      <el-table-column prop="categoryName" label="类名" width="550">
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="open(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="open2(scope.$index, scope.row)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapGetters} from "vuex"
export default {
  name:"category",
  data() {
    return {
      categoryList: []
    }
  },
  created() {
    this.getCategoryList();
  },
  methods: {
    async getCategoryList() {
      let result = await this.axios("/api/back/category");
      this.categoryList = result.data;
    },
    async delete(index, val) {
      await this.axios.get("/api/back/category/delete", {
        params: {
          id: val.id
        }
      });
      await this.getCategoryList();
    },
    open(index, val) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        this.delete(index, val),
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      });
    },
    async edit(index, val, value) {
      await this.axios.get("/api/back/category/edit", {
        params: {
          id: val.id,
          categoryName: value
        }
      });
      this.getCategoryList();
    },
    open2(index, val) {
      this.$prompt('请输入类名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
      }).then(({ value }) => {
        this.edit(index, val, value)
        this.$message({
          type: 'success',
          message: '输入的类名是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    addCategory() {
      this.$prompt('添加类名', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }).then(({ value }) => {
        this.add(value)
        this.$message({
          type: 'success',
          message: '添加的类名是: ' + value
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    async add(value) {
      await this.axios.get("/api/back/category/add", {
        params: {
          categoryName: value
        }
      });
     await this.getCategoryList();
    }
  },
  computed:{
    ...mapGetters(["isLoading"])
  }

}

</script>
<style lang="less" scoped>
.category {
  margin-top: 100px;
  margin-left: 220px;

  .add {
    z-index: 0;
    position: absolute;
    top: -40px;
    left: -10px;
  }
}

</style>
