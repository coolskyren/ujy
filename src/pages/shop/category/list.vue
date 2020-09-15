<template>
  <div>
    <el-table :data="roleList" style="width: 100%" row-key="id" :tree-props="{children:'children'}">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="rolename" label="分类名称" width="180"></el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="2"></el-switch>
        </template>
      </el-table-column>
          <el-table-column label="修改">
                <template slot-scope="scope">
                    <el-button type="primary" size="small" @click="edit(scope.row)" circle icon="el-icon-edit"></el-button>
                    <el-button type="danger" size="small"  @click="del(scope.row.id)"  circle icon="el-icon-delete"></el-button>
                </template>
          </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {  mapActions, mapGetters,mapState } from "vuex";
import { delRole } from "@/axios";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      roleList: "role/roleList",
    }),
  },
  mounted() {
    if(!this.roleList.length){
      this.getRoleList();
    }
    // this.getRoleList();
  },
  
  methods: {
    ...mapActions({
      getRoleList: "role/getRoleList",
    }),
    edit(val) {
      this.$emit('edit',{...val})
      //获取兄弟组件的edit事件，并且把当前列表的数据输送给父组件
    },
    async del(id){
      //通过id判断当前要删的内容是所选内容
      this.$confirm('确认删除么？','提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async ()=>{
        let res = await delRole(id);
        if(res.code == 200){
          this.$message.success(res.msg)
          this.getRoleList()

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
