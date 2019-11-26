<template>
  <div class="home">
    <div class="head">
      <mi-head />
    </div>
    <div class="content">
      <mi-sidebar />
      <div class="content-right">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters ,mapActions} from "vuex"
import sidebar from "../../components/merchant/sidebar.vue"
import head from "../../components/merchant/nav.vue"
export default {
  components: {
    "mi-head": head,
    "mi-sidebar": sidebar
  },
  created() {
    this.checkState()
    if (!this.isLogined) {
      this.$router.replace({
        name: "login"
      })
    }
  },
  computed:{
          ...mapGetters(["isLogined"])
  },
  methods:{
          ...mapActions(["checkState"])
  }
}

</script>
<style lang="less" scoped>
  .content-right{
     width: 1520px;
     height: 100%;
  }
</style>
