<template>
  <div>
    <el-menu
      class="left"
      background-color="#545c64"
      text-color="#fff"
      router
      active-text-color="#ffd04b"
      :default-active="$route.path"
    >
      <el-menu-item index="/index">
        <i class="el-icon-menu"></i>
        <span slot="title">后台首页</span>
      </el-menu-item>
      <el-submenu v-for="(item,index) in menuList" :key="index" :index="index+''">
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item-group v-for="(v,indexs) in item.children" :key="indexs">
          <el-menu-item :index="v.url">
          <i :class="v.icon"></i>
            {{v.title}}</el-menu-item>
          <!-- <el-menu-item index="/role">角色管理</el-menu-item>
          <el-menu-item index="/user">管理员管理</el-menu-item> -->
        </el-menu-item-group>
      </el-submenu>
      <!-- <el-submenu index="2">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span>商城管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/gategory">分类管理</el-menu-item>
          <el-menu-item index="/specs">规格管理</el-menu-item>
          <el-menu-item index="/goods">商品管理</el-menu-item>
          <el-menu-item index="/member">会员管理</el-menu-item>
          <el-menu-item index="/banner">轮播图管理</el-menu-item>
          <el-menu-item index="/seckill">秒杀管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu> -->
    </el-menu>
  </div>
</template>

<script>
import {mapState,mapGetters,mapActions} from "vuex"
export default {
  data() {
    return {};
  },
  created() {},
  mounted() {
    this.getMenuList()
  },
  computed: {
      ...mapState(['iscollapse']),
      ...mapGetters({
        menuList:'menu/menuList'
      })
  },
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuList",
    }),
  },
  components: {},
};
</script>

<style lang="" scoped>
.left{
    border-right: none;
}
</style>
