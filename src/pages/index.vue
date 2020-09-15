<template>
  <div class="main">
    <el-container>
      <el-header height="100px" style="padding:0">
        <top />
      </el-header>
      <el-container>
        <el-aside :width="iscollapse ? '0px' : '200px'">
          <left />
        </el-aside>
        <el-main hight="100%">
          <router-view />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import left from "@/pages/layout/left";
import top from "@/pages/layout/top";
import { mapState } from "vuex";
export default {
  data() {
    return {};
  },
  created() {},
  methods: {},
  computed: {
    ...mapState(["iscollapse"]),
  },
  components: {
    left,
    top,
  },
};
</script>

<style lang="" scoped>
.main {
  width: 100vw;
  height: 100vh;
}
</style>
