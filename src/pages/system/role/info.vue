<template>
  <div>
    <el-dialog :title="info.isAdd ? '添加角色':'修改角色'" @close="cancel" :visible.sync="info.isShow" width="40%">
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
        <el-form-item label="管理员名称" prop="rolename">
          <el-input v-model="forminfo.rolename" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="角色权限" >
            <el-tree 
                default-expand-all 
                node-key="id" 
                ref="tree" 
                :data="menuList" 
                show-checkbox 
                :props="{children:'children',label:'title'}"
                :check-strictly="checkStrictly"
            ></el-tree>
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
import { addRole, editRole } from "@/axios";
import { mapGetters, mapActions, mapState } from "vuex";
//创建一个空数据对象，用于弹窗重置
let zero = {
  rolename:'',
  menus:'',
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
      forminfo: { ...zero },
      rules: {
        rolename: [{ required: true, message: "必填！", trigger: "blur" }]
      },
      checkStrictly:false   // false表示父子关联！ true表示父子不关联！
    };
  },
  computed: {
    ...mapGetters({
      //辅助函数读取vuex中的Rolelist，用于列表渲染
      menuList:'menu/menuList',
      roleList: "role/roleList",
    }),
  },
  created() {},
  mounted() {
    if(!this.roleList.length){
      this.getRoleList();
    this.getMenuList();
    }
    
    //调取获取列表的行动，使vuex中的Rolelist有值
  },

  methods: {
    ...mapActions({
      //发起获取列表的行动
      getRoleList: "role/getRoleList",
      getMenuList: "menu/getMenuList",
    }),
    setinfo(val) {
      //接收从父组件传来的list的值
      let idArr = val.menus.split(',')
      console.log(idArr)
      if(idArr[0]){
        //判断idArr中是否有值需要修改
        this.checkStrictly = true;
        //先让父子保持不关联状态，让弹窗显示选定节点被选中而不是，全部关联选中。
        // 等到节点渲染完成再做某个事情！ this.$nextTick(()=>{  等到vue把节点渲染完成再做某些事情！ })
      this.$nextTick(()=>{
        this.$refs.tree.setCheckedKeys(idArr)
        //因为refs.tree是其它模块的方法，所以需要渲染完成后才能获取到
        this.checkStrictly = false;  // 又要父子互相关联！
                })
        //树形子节点被选中时，父节点不被选中
      }
      zero = { ...val };
      this.forminfo = { ...val };
    },
    async sumbit() {
      let idArr = this.$refs.tree.getCheckedKeys().concat(this.$refs.tree.getHalfCheckedKeys())
      if(idArr.length){
        this.forminfo.menus = idArr
      }else{
        this.$message.warning('请选择权限');
        return;
      }
      //表单验证:validate方法用于验证表单
      this.$refs.form.validate(async (valid) => {
        //valid验证成功时候
        if (valid) {
          let res;
          //创建一个对象res。用于获取当前接口的状态
          if (this.info.isAdd) {
            //如果isAdd是true，调取添加接口
            res = await addRole(this.forminfo);
          } else {
            //否则调取修改接口
            res = await editRole(this.forminfo);
          }
          if (res.code == 200) {
            //判断当前所调取的接口状态
            this.$message.success(res.msg);
            //返回当前接口的提示信息
            this.info.isShow = false;
            //并且关闭弹窗
            this.getRoleList();
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
      
      //用于充值按钮，是表单恢复到弹窗一进来时候的内容
      if(this.info.isAdd){ // 添加时候的重置！
      this.forminfo = {...resetZero}
      this.$refs.tree.setCheckedKeys([])
      }else{ // 修改时候的重置！
      this.setinfo({...defaultZero})
            }
    },
    cancel(){
      this.$refs.tree.setCheckedKeys([])
        this.forminfo = { ...restZero };
      }
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
