<template>
  <div class="home">
    <div class="topNav">
      <top-nav :isLogin=isLogin />
    </div>
    <div class="content">
      <nav-list class="list" />
      <carousel />
      <hot />
    </div>
    <div class="good">
      <div class="goodList">
        <skill />
        <mi-phone />
        <mi-appliances />
        <mi-smart />
        <mi-collocation />
        <mi-parts />
        <mi-about />
      </div>
        <mi-footer />
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex"
import topNav from "../../components/buyer/nav.vue"
import navList from "../../components/buyer/navList.vue"
import carousel from "../../components/buyer/carousel.vue"
import hot from "../../components/buyer/hot.vue"
import skill from "../../components/buyer/skill.vue"
import phone from "../../components//buyer/phone.vue"
import appliances from "../../components/buyer/appliances.vue"
import smart from "../../components/buyer/smart.vue"
import collocation from "../../components/buyer/collocation.vue"
import parts from "../../components/buyer/parts.vue"
import about from "../../components/buyer/about.vue"
import footer from "../../components/buyer/footer.vue"
export default {
  components: {
    "top-nav": topNav,
    "nav-list": navList,
    "carousel": carousel,
    "hot": hot,
    "skill":skill,
    "mi-phone":phone,
    "mi-appliances":appliances,
    "mi-smart":smart,
    "mi-collocation":collocation,
    "mi-parts":parts,
    "mi-about":about,
    "mi-footer":footer
  },
  data() {
    return {
      isLogin: ""
    }
  },
  methods: {
    ...mapActions(["doLoginCookie"])
  },
  created() {
    this.doLoginCookie();
    if (this.getLogin <0) {
      this.isLogin = "-1";
    } else if (this.getLogin >= 0) {
      this.isLogin = this.getLogin;
    }
  },
  computed: {
    ...mapGetters(["getLogin"])
  },
  watch:{
    $route(to,from){
      console.log(to,from)
    }
  }
}

</script>
<style lang="less" scoped>
.content {
  width: 80%;
  height: 100%;
  text-align: center;
  margin: 0 auto;
}

.good {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
  margin-top: 20px;

  .goodList {
    width: 80%;
    height: 100%;
    margin: 0 auto;
  }
}

</style>
