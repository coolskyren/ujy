<template>
  <div>
    <el-dialog :title="info.isAdd ? '添加':'修改'" @close="cancel" :visible.sync="info.isShow" width="40%">
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
        <el-form-item label="菜单类型">
          <el-radio-group v-model="forminfo.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="forminfo.type==2" label="上级目录">
          <el-select v-model="forminfo.pid" placeholder="请选择">
            <el-option label="顶级目录" :value="0"></el-option>
            <el-option
              v-for="item in menuList"
              v-if="item.type==1"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item :label="forminfo.type==1 ?'目录名称':'菜单名称'" prop="title">
          <el-input v-model="forminfo.title" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="图标" prop="icon">
          <el-input v-model="forminfo.icon" placeholder="请输入图标class"></el-input>
        </el-form-item>
        <el-form-item label="菜单地址" v-if="forminfo.type==2" prop="url">
          <el-input v-model="forminfo.url" placeholder="请输入菜单地址"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-switch v-model="forminfo.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label>
          <el-button type="primary" @click="sumbit">提交</el-button>
          <el-button type="warning" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, editMenu } from "@/axios";
import { mapGetters, mapActions, mapState } from "vuex";
//创建一个空数据对象，用于弹窗重置
let zero = {
  pid: 0,
  title: "",
  icon: "",
  type: 1, // 1目录2菜单
  url: "",
  status: 1, // 状态1正常2禁用
};
let restZero = { ...zero };
//复制一个空对象，用于修改后清空整个弹窗
export default {
  props: {
    info: {
      type: Object,
      default() {
        return {
          isAdd: true,
          //判断按钮是添加触发还是修改触发
          isShow: false,
          //控制打开或关闭弹窗
        };
      },
    },
  },
  data() {
    return {
      forminfo: { ...zero },
      rules: {
        title: [{ required: true, message: "必填！", trigger: "blur" }],
        icon: [{ required: true, message: "必填！", trigger: "blur" }],
        url: [{ required: true, message: "必填！", trigger: "blur" }],
      },
    };
  },
  computed: {
    ...mapGetters({
      //辅助函数读取vuex中的menulist，用于列表渲染
      menuList: "menu/menuList",
    }),
  },
  created() {},
  mounted() {
    if(!this.menuList.length){
      this.getMenuList();
    }
    //调取获取列表的行动，使vuex中的menulist有值
  },

  methods: {
    ...mapActions({
      //发起获取列表的行动
      getMenuList: "menu/getMenuList",
    }),
    setinfo(val) {
      //将数据赋值给表格
      zero = { ...val };
      this.forminfo = { ...val };
    },
    async sumbit() {
      //表单验证:validate方法用于验证表单
      this.$refs.form.validate(async (valid) => {
        //valid验证成功时候
        if (valid) {
          let res;
          //创建一个对象res。用于获取当前接口的状态
          if (this.info.isAdd) {
            //如果isAdd是true，调取添加接口
            res = await addMenu(this.forminfo);
          } else {
            //否则调取修改接口
            res = await editMenu(this.forminfo);
          }
          if (res.code == 200) {
            //判断当前所调取的接口状态
            this.$message.success(res.msg);
            //返回当前接口的提示信息
            this.info.isShow = false;
            //并且关闭弹窗
            this.getMenuList();
            //再次更新vuex中menulist数据，用于从新渲染表格
            this.cancel()
            //清空添加或修改结束后的弹窗信息
          } else {
            this.$message.error(res.msg);
            //提示当前接口的错误信息
          }
        }
      });
    },
    reset() {
      this.forminfo = { ...zero };
      //用于充值按钮，是表单恢复到弹窗一进来时候的内容
    },
    cancel(){
        this.forminfo = { ...restZero };
      }
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
