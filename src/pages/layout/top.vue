<template>
  <div class="top">
    <div class="logo">
      <el-button v-if="iscollapse" icon="el-icon-s-unfold" @click="Toggle"></el-button>
      <el-button v-else icon="el-icon-s-fold" @click="Toggle"></el-button>
    </div>
    <h3>小U商城后台管理系统</h3>
    <div class="topRight">
      <el-dropdown>
        <span class="el-dropdown-link">
          {{username}}用户您好
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>
            <i class="el-icon-full-screen"></i> 全屏操作
          </el-dropdown-item>
          <el-dropdown-item @click.native="QUIT">
            <i class="el-icon-switch-button"></i> 退出登录
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations,mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    
  },
  computed: {
    ...mapState(["iscollapse"]),
    ...mapGetters({
      username:'user/username'
    })
  },
  methods: {
    ...mapMutations({
      Toggle:"Toggle",
      QUIT:'user/QUIT'
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
h3 {
  font-size: 40px;
}
.top {
  display: flex;
  height: 100%;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
}
.el-dropdown-link {
  font-size: 30px;
}
</style>
