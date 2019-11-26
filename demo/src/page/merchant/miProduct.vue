<template>
  <div class="table">
    <el-row>
      <el-button class="add" type="primary" @click="addProductList">产品添加</el-button>
    </el-row>
    <el-table v-loading="isLoading" :data="isListUrl" style="width: 100%" @row-click="currentIndex">
      <el-table-column prop="id" label="id" width="180" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="title" label="标题" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="des" label="描述" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="category" label="类别" align="center" header-align="center">
      </el-table-column>      
      <el-table-column prop="type" label="版本" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="carousel" label="是否轮播" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="inventory" label="库存" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="preferential" label="优惠活动" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="price" label="价格" align="center" header-align="center">
      </el-table-column>
      <el-table-column prop="imgSrc" label="图片" min-width="20%" align="center" header-align="center" width="180">
        <!-- 图片的显示 -->
        <template slot-scope="scope">
          <img :src="scope.row.imgSrc" min-width="70" height="70" />
        </template>
      <!-- 操作 -->
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="open(scope.$index, scope.row)" type="text" size="small">删除</el-button>
          <el-button type="text" size="small" @click="dialogFormVisible">编辑</el-button>
          <el-button type="text" size="small" @click="addVersion">添加版本</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 提示框 -->
    <el-dialog :title="titles" :visible.sync="alertShow" :modal="true">
      <el-form :model="editMsg">
        <el-form-item label="标题">
          <el-input v-model="editMsg.title" autocomplete="off" :disabled="isDisabled"></el-input>
        </el-form-item>
        <el-form-item label="描述" >
          <el-input type="textarea" :rows="7" resize="none" :disabled="isDisabled" v-model="editMsg.des" autocomplete="autoComplete"></el-input>
        </el-form-item>
          <!-- 下拉选框 -->
         <el-form-item label="类别">
          <el-select v-model="editMsg.category" placeholder="请选择类名" :disabled="isDisabled">
            <el-option
              v-for="category in cate[0]"
              :key="category.categoryName"
              :label="category.categoryName"
              :value="category.categoryName">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- checkbox -->
          <el-checkbox :disabled="isCheckBoxDisabled" v-model="editMsg.checked" true-label="1" false-label="-1" :border=true class="checkBox" @change="isChecked">是否轮播</el-checkbox>

        <el-form-item label="版本">
          <el-input :disabled="isCheckBoxDisabled" v-model="editMsg.type" autocomplete="autoComplete"></el-input>
        </el-form-item>
        <el-form-item label="库存">
          <el-input v-model="editMsg.inventory" autocomplete="autoComplete"></el-input>
        </el-form-item>        
        <el-form-item label="优惠活动">
          <el-input v-model="editMsg.preferential" autocomplete="autoComplete"></el-input>
        </el-form-item>
        <el-form-item label="价格">
          <el-input v-model="editMsg.price" autocomplete="autoComplete"></el-input>
        </el-form-item>
        <el-form-item label="图片">
        </el-form-item>
        <el-upload class="upload-demo" action="string" :http-request="upload" list-type="picture">
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="alertShow = false">取 消</el-button>
        <el-button type="primary" @click="alertShow = false;edit()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页 -->
          <my-page :listUrl= getpage :countUrl= totalcount />
  </div>
</template>

<script>
import { mapGetters ,mapActions} from "vuex";
export default {
  name: "product",
  data() {
    return {
      productLists: [],
      alertShow: false,
      editMsg: {},
      tag: "",
      myFiles: [],
      titles:"",
      cate:[],
      isDisabled:false,
      checked:false,
      isCheckBoxDisabled:false,
      product:"",
      // 分页
      getpage:'api/back/product',
      totalcount:'api/back/product/getCount'
    }
  },
 created() {
     // this.getProductList();
     this.getCategory();
  },
  methods: {
    isChecked(val){
        this.editMsg.checked = val;
    },
    async getCategory(){
      let category = await this.axios("/api/back/category");
      this.cate.push(category.data)
    },
    upload(item) {
      this.myFiles.push(item.file);
    },
     getProductList() {
      this.productLists = this.$store.state.listUrl;
      // let result = await this.axios("/api/back/product");
      // this.productLists = result.data;
      // console.log(result.data)
      // console.log(result.data[0])
    },
    dialogFormVisible() {
      this.tag = "edit";
      this.alertShow = true;
      this.titles = "产品编辑";
      this.isDisabled = false;
      this.isCheckBoxDisabled = false; 
    },
    async currentIndex(val) {
      this.editMsg = val;
    },
    async handleClick(val) {

    },
    addProductList() {
      this.tag = "add";
      this.editMsg = {};
      this.alertShow = true;
      this.titles = "产品添加";
      this.isDisabled = false;
      this.isCheckBoxDisabled = true;
    },
    addVersion() {
      this.tag = "addVersion";
      this.editMsg = this.cate;
      this.titles = "添加版本";
      this.isDisabled = true; 
      this.alertShow = true;
      this.isCheckBoxDisabled = false;
    },
    async edit() {
      // 产品编辑
      if (this.tag == "edit") {
        let formData = new FormData();
        for (let i = 0; i < this.myFiles.length; i++) {
          formData.append("icons", this.myFiles[i])
        }
        formData.append("id", this.editMsg.id);
        formData.append("title", this.editMsg.title);
        formData.append("des", this.editMsg.des);
        formData.append("goodId", this.editMsg.goodId);
        formData.append("price", this.editMsg.price);
        formData.append("inventory", this.editMsg.inventory);
        formData.append("preferential", this.editMsg.preferential);
        formData.append("type", this.editMsg.type);
        if(this.editMsg.checked == undefined||this.editMsg.checked == ""){
             this.editMsg.checked = "-1";            
        }
        formData.append("carousel",this.editMsg.checked);
        await this.axios.post("/api/back/product/edit", formData);
        this.getProductList();
        // 产品添加
      } else if (this.tag == "add") {
        let formData = new FormData();
        for (let i = 0; i < this.myFiles.length; i++) {
          formData.append("icons", this.myFiles[i])
        }
        formData.append("title", this.editMsg.title);
        formData.append("categoryName", this.editMsg.category);
        formData.append("des", this.editMsg.des);
        formData.append("price", this.editMsg.price);
        formData.append("inventory", this.editMsg.inventory);
        formData.append("preferential", this.editMsg.preferential);
        await this.axios.post("/api/back/product/add",formData);
        this.productLists();
        // 添加版本
      } else if (this.tag == "addVersion") {
        let formData = new FormData();
        for (let i = 0; i < this.myFiles.length; i++) {
          formData.append("icons", this.myFiles[i])
        }
        formData.append("id", this.editMsg.id);
        formData.append("title", this.editMsg.title);
        formData.append("categoryName", this.editMsg.category);
        formData.append("des", this.editMsg.des);
        formData.append("goodId", this.editMsg.goodId);
        formData.append("price", this.editMsg.price);
        formData.append("inventory", this.editMsg.inventory);
        formData.append("preferential", this.editMsg.preferential);
        formData.append("type", this.editMsg.type);
        if(this.editMsg.checked == undefined||this.editMsg.checked == ""){
             this.editMsg.checked = "-1";            
        }
        formData.append("carousel",this.editMsg.checked);
        await this.axios.post("/api/back/product/addVersion", formData);
        this.productLists();
      }
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
     async delete(index, val) {
      await this.axios.get("/api/back/product/delete",{params:{
        goodId:val.goodId,
        id:val.id
      }});
      this.getProductList();
    }
  },
  computed: {
    ...mapGetters(["isLoading","isListUrl"])
  }
}

</script>
<style lang="less" scoped>
.checkBox{
  margin-top: 20px;
  margin-bottom: 26px;
}
.table {
  position: relative;
  margin-top: 60px;
  width: 87%;
  height: 100%;
  margin-left: 200px;
  .add {
    margin-left: 10px;
  }
}

</style>
