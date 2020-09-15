import axios from "axios"
import router from "@/router"
let $axios = axios.create({
    baseURL:"/api",
    timeout: 3000
})

$axios.interceptors.request.use(function (config) {
    if (config.url =='/userlogin'){  // 登录请求！
        console.log(config)
        return config;
    }else{
        let userinfo = JSON.parse(localStorage.getItem("userinfo"))
        // 请求头里面携带上token!   具体的字段名要和后端沟通！
        config.headers.authorization = userinfo.token;
        return config;
    }
}, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
});

// 添加响应拦截器
$axios.interceptors.response.use(function (response) {
    if (response.data.code == 403){  // 状态为403表示token过期，需要重新登录！
        router.push('/login')
        return response.data;
    }else{
        return response.data;
    }
}, function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
});
//menu里边的接口
//获取列表
export async function getMenu(){
    let res = await $axios.get('/menulist?istree=1')
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
} 
//添加菜单
export function addMenu(data){
    return  $axios.post("/menuadd",data)
}
//修改菜单
export function editMenu(data) {
    return $axios.post("/menuedit", data)
}
//删除菜单
export function delMenu(id) {
    return $axios.post("/menudelete", {id})
}

//* *********************************************** */
//role中的接口
export async function getRole(){
    let res = await $axios.get('/rolelist')
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
} 
//role中的接口
export async function getInfo(id){
    let res = await $axios.get('/roleinfo')
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
} 
//添加菜单
export function addRole(data){
    return  $axios.post("/roleadd",data)
}
//修改菜单
export function editRole(data) {
    return $axios.post("/roleedit", data)
}
//删除菜单
export function delRole(id) {
    return $axios.post("/roledelete", {id})
}

//* *********************************************** */
//user中的分页接口
export async function getUser(size,page){
    let res = await $axios.get('/userlist',{
        params:{
            page,size
        }
    })
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
} 
//user管理员获取（一条）
export async function getuserInfo(uid){
    let res = await $axios.get('/userinfo')
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
} 
//用于计算分页
export async function getCount(){
    
    let res = await $axios.get('/usercount')
    console.log(res.list[0].total)
    return res.list[0].total
    
} 
//添加菜单
export function addUser(data){
    return  $axios.post("/useradd",data)
}
//修改菜单
export function editUser(data) {
    return $axios.post("/useredit", data)
}
//删除菜单
export function delUser(uid) {
    return $axios.post("/userdelete", {uid})
}
//管理员登录
export function login(data) {
    return $axios.post("/userlogin", data)
}


//* *********************************************** */
//商品分类中的接口
export async function getCate(){
    let res = await $axios.get('/catelist?istree=1')
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
} 
//商品分类中获取一条
export async function getCateInfo(id){
    let res = await $axios.get('/cateinfo')
    if(res.code==200 && res.list){
        return res.list
    }else{
        return [];
    }
} 
//添加菜单
export function addCate(data){
    return  $axios.post("/cateadd",data)
}
//修改菜单
export function editCate(data) {
    return $axios.post("/cateedit", data)
}
//删除菜单
export function delCate(id) {
    return $axios.post("/catedelete", {id})
}


export default $axios

