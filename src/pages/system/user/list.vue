<template>
  <div>
    <el-table :data="userList" style="width: 100%" row-key="id" :tree-props="{children:'children'}">
      <el-table-column prop="uid" label="uid" align="center"></el-table-column>
      <el-table-column prop="username" label="管理员名称" width="180"></el-table-column>
      <el-table-column prop="rolename" label="管理员角色" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2"></el-switch>
        </template>
      </el-table-column>
          <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="small"  @click="del(scope.row.uid)"  circle icon="el-icon-delete"></el-button>
                </template>
          </el-table-column>
    </el-table>
    <el-pagination
      @size-change="getSetSize"
      @current-change="getSetPage"
      :current-page="page"
      :page-sizes="[1,2,3,4]"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
</template>

<script>
import {  mapActions, mapGetters,mapMutations,mapState } from "vuex";
import { delUser } from "@/axios";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      userList: "user/userList",
      page:"user/page",
      size:"user/size",
      total:'user/total'
    }),
  },
  mounted() {
    if(!this.userList.length){
      this.getUserList();
    }
    // this.getRoleList();
  },
  
  methods: {
    ...mapMutations({
      setPage:'user/setPage'
    }),
    ...mapActions({
      getUserList: "user/getUserList",
      getSetPage:"user/getSetPage",
      getSetSize:"user/getSetSize",
    }),

    edit(val) {
      this.$emit('edit',{...val})
      //获取兄弟组件的edit事件，并且把当前列表的数据输送给父组件
    },
    async del(uid){
      //通过id判断当前要删的内容是所选内容
      this.$confirm('确认删除么？','提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async ()=>{
        let res = await delUser(uid);
        if(res.code == 200){
          this.$message.success(res.msg)
          if(this.userList.length==1&&this.page!=1){
            this.setPage(this.page-1)
          }
          this.getUserList()

        }else{
          this.$message.error(res.msg)
        }
      }).catch(()=>{})
    }
  },
  components: {},
};
</script>

<style lang="" scoped>
</style>
