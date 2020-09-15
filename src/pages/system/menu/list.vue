<template>
  <div>
    <el-table :data="menuList" style="width: 100%" row-key="id" :tree-props="{children:'children'}">
      <el-table-column prop="id" label="ID" align="center"></el-table-column>
      <el-table-column prop="title" label="菜单名称" width="180"></el-table-column>
      <el-table-column prop="url" label="菜单地址" width="180"></el-table-column>
      <el-table-column label="图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="类型">
              <template slot-scope="scope">
                  <el-tag type="success" v-if="scope.row.type==1">目录</el-tag>
                  <el-tag type="warning" v-if="scope.row.type==2">菜单</el-tag>
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
import { delMenu } from "@/axios";
export default {
  data() {
    return {};
  },
  created() {},
  computed: {
    ...mapGetters({
      menuList: "menu/menuList",
    }),
  },
  mounted() {
    if(!this.menuList.length){
      this.getMenuList();
    }
  },
  
  methods: {
    ...mapActions({
      getMenuList: "menu/getMenuList",
    }),
    edit(val) {
      this.$emit('edit',{...val})
      //获取兄弟组件的edit事件，并且把当前弹窗数据输送给弹窗
    },
    async del(id){
      //通过id判断当前要删的内容是所选内容
      this.$confirm('确认删除么？','提示',
      {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async ()=>{
        let res = await delMenu(id);
        if(res.code == 200){
          this.$message.success(res.msg)
          this.getMenuList()
          this.cancel()
        }else{
          this.$message.error(res.msg)
        }
      }).catch(()=>{})
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
