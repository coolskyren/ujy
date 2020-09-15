<template>
 <div> 
<el-button type="primary" @click="add">添加菜单</el-button>
<List @edit = 'edit'></List>
<Info :info='info' ref='dialog'></Info>
 </div>
</template>

<script>
import List from './list'
import Info from './info'
export default {
 data() {
 return {
     info:{
         isAdd:false,
         isShow:false
     }
 };
 },
 created(){},
 mounted(){},
 methods:{
     add(){
         this.info.isAdd = this.info.isShow = true
     },
     edit(val){
         //接受来自字组件的传值
         this.info.isAdd = false
         this.info.isShow = true
         this.$refs.dialog.setinfo(val)
         //将兄弟组件表单的值传给弹窗
     }
 },
 components:{
     List,Info
 }
};
</script>

<style lang="" scoped>

</style>
