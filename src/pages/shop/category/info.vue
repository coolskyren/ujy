<template>
  <div>
    <el-dialog
      :title="info.isAdd ? '添加角色':'修改角色'"
      @close="cancel"
      :visible.sync="info.isShow"
      width="40%"
    >
      <el-form :model="forminfo" ref="form" :rules="rules" label-width="140px">
        <el-form-item label="上级目录">
          <el-select v-model="forminfo.pid" placeholder="请选择">
            <el-option
              v-for="item in cateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="分类名称" prop="catename">
          <el-input v-model="forminfo.catename" placeholder="请输入名称"></el-input>
        </el-form-item>
        <el-form-item label="添加图片">
          <el-upload
            action
            list-type="picture-card"
            :auto-upload="false"
            :limit="1"
            :on-preview="see"
            :on-change="change"
            :on-remove="remove"
            :file-list="filelist"
          >
            <i slot="default" class="el-icon-plus"></i>
          </el-upload>
          <el-dialog title="查看图片" :visible.sync="dialogVisible" :append-to-body="true">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
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
import { addCate, editCate } from "@/axios";
import { mapGetters, mapActions, mapState } from "vuex";
//创建一个空数据对象，用于弹窗重置
let zero = {
  pid: 0,
  catename: "",
  img: "",
  status: 1,
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
      dialogVisible: false,
      dialogImageUrl: "",
      forminfo: { ...zero },
      rules: {
        catename: [{ required: true, message: "必填！", trigger: "blur" }],
      },
      filelist:[]
    };
  },
  computed: {
    ...mapGetters({
      //辅助函数读取vuex中的Rolelist，用于列表渲染
      cateList: "gory/cateList",
    }),
  },
  created() {},
  mounted() {
    // if (!this.cateList.length) {
    //   this.getRoleList();
    //   this.getUserList();
    // }
    this.getCateList();
    //调取获取列表的行动，使vuex中的Rolelist有值
  },

  methods: {
    see(file) {
      this.dialogVisible = true;
      this.dialogImageUrl = file.url
    },
    change(file,filelist) {
      console.log(file,filelist)
      this.forminfo.img= file.raw
    },
    remove(){
      this.forminfo.img =''
    },
    ...mapActions({
      //发起获取列表的行动
      getCateList: "gory/getCateList",
    }),
    setinfo(val) {
      //接收从父组件传来的list的值
       if(val.img){
          this.filelist = [{
          name:val.catename,
          url:this.$host+val.img09
          }]
        }
      val.children ? delete val.children:''
      zero = { ...val };
      this.forminfo = { ...val };
    },
    async sumbit() {
      
      this.$refs.form.validate(async (valid) => {
        //valid验证成功时候
        if (valid) {
          let res;
          let fd = new FormData();
          for(let k in this.forminfo){
            fd.append(k,this.forminfo[k])
          }
          //创建一个对象res。用于获取当前接口的状态
          if (this.info.isAdd) {
            //如果isAdd是true，调取添加接口
            res = await addCate(fd);
          } else {
            //否则调取修改接口
            res = await editCate(fd);
          }
          if (res.code == 200) {
            //判断当前所调取的接口状态
            this.$message.success(res.msg);
            //返回当前接口的提示信息
            this.info.isShow = false;
            //并且关闭弹窗
            this.getCateList();
            //再次更新vuex中Rolelist数据，用于从新渲染表格
            this.cancel();
            //清空添加或修改结束后的弹窗信息
          } else {
            this.$message.error(res.msg);
            //提示当前接口的错误信息
          }
        }
      });
    },
    reset() {
      
      if(this.info.isAdd){
        this.forminfo = { ...resetZero };
      }else{
         this.setinfo({...zero})
      }
      //用于充值按钮，是表单恢复到弹窗一进来时候的内容
    },
    cancel() {
      this.forminfo = { ...restZero };
      this.filelist = [];
    },
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
