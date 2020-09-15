<template>
  <el-row class="login">
    <el-col :span="8" class="inner">
      <h3>小U商场后台管理系统</h3>
      <el-form :model="userinfo" ref="form" :rules="rules">
        <el-input placeholder="请输入账号" v-model="userinfo.username" prop="username">
          <template slot="prepend">
            <i class="el-icon-user"></i>
          </template>
        </el-input>
        <el-input placeholder="请输入密码" v-model="userinfo.password" prop="password" show-password>
          <template slot="prepend">
            <i class="el-icon-suitcase"></i>
          </template>
        </el-input>
        <el-button type="login" @click="submit">立即登录</el-button>
      </el-form>
    </el-col>
  </el-row>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {
      userinfo: {
        username: "admin",
        password: 123123,
      },
      rules: {
        username: [{ required: true, message: "必填！", trigger: "blur" }],
        password: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  computed: {},
  created() {},
  mounted() {},
  methods: {
    ...mapActions({
      login: "user/login",
    }),
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.login(this.userinfo);
        }
      });
    },
  },
  components: {},
};
</script>

<style lang="" scoped>
.login {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/imges/0.jpg");
  background-size: 100% 100%;
  display: flex;
  align-content: center;
  justify-content: center;
}
.inner {
  height: 30%;
  margin-top: 300px;
  background-color: palegoldenrod;
  padding: 0 30px;
}
h3 {
  font-size: 30px;
}
button {
  width: 100%;
}
</style>
