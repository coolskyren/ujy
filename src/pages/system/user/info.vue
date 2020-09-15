<template>
  <div>
    <el-dialog :title="info.isAdd ? '添加角色':'修改角色'" @close="cancel" :visible.sync="info.isShow" width="40%">
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
    <el-form-item label="管理员角色" prop="roleid">
           <el-select v-model="forminfo.roleid" placeholder="请选择" >
    <el-option
      v-for="item in roleList"
      :key="item.id"
      :label="item.rolename"
      :value="item.id">
    </el-option>
  </el-select>  
      </el-form-item>
        <el-form-item label="管理员名称" prop="username">
          <el-input v-model="forminfo.username" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="管理员密码" prop="password">
          <el-input v-model="forminfo.password" placeholder="请输入密码"></el-input>
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
import { addUser, editUser } from "@/axios";
import { mapGetters, mapActions, mapState } from "vuex";
//创建一个空数据对象，用于弹窗重置
let zero = {
  roleid:'',
  username:'',
  password:'',
  status:1
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
      value:'',
      forminfo: { ...zero },
      rules: {
        roleid: [{ required: true, message: "必填！", trigger: "blur" }],
        username: [{ required: true, message: "必填！", trigger: "blur" }],
      },
      
    };
  },
  computed: {
    ...mapGetters({
      //辅助函数读取vuex中的Rolelist，用于列表渲染
      userList:'user/userList',
      roleList: "role/roleList",
    }),
  },
  created() {},
  mounted() {
    if(!this.userList.length){
      this.getRoleList();
    this.getUserList();
    }
    
    //调取获取列表的行动，使vuex中的Rolelist有值
  },

  methods: {
    ...mapActions({
      //发起获取列表的行动
      getRoleList: "role/getRoleList",
      getUserList: "user/getUserList",
    }),
    setinfo(val) {
      //接收从父组件传来的list的值
      zero = { ...val };
      this.forminfo = { ...val };
    },
    async sumbit() {
      // if(idArr.length){
      //   this.forminfo.menus = idArr
      // }else{
      //   this.$message.warning('请选择权限');
      //   return;
      // }
      //表单验证:validate方法用于验证表单
      this.$refs.form.validate(async (valid) => {
        //valid验证成功时候
        if (valid) {
          let res;
          //创建一个对象res。用于获取当前接口的状态
          if (this.info.isAdd) {
            //如果isAdd是true，调取添加接口
            res = await addUser(this.forminfo);
          } else {
            //否则调取修改接口
            res = await editUser(this.forminfo);
          }
          if (res.code == 200) {
            //判断当前所调取的接口状态
            this.$message.success(res.msg);
            //返回当前接口的提示信息
            this.info.isShow = false;
            //并且关闭弹窗
            this.getUserList();
            //再次更新vuex中Rolelist数据，用于从新渲染表格
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
     this.forminfo = {...resetZero}

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
