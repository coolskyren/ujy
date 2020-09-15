import { getUser,getCount,login } from "@/axios/index"
let userinfo = localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")):{}
import {Message} from 'element-ui'
import router from '@/router'
export default {
    namespaced: true,
    state: {
        userList: [],
        size:1,
        page:1,
        total:0,//总条数
        userinfo:userinfo
    },
    getters: {
        userList: state => state.userList,
        size: state => state.size,
        page: state => state.page,
        total: state => state.total,
        menus: state => state.userinfo.menus,
        menus_url: state => state.userinfo.menus_url,
        username: state => state.userinfo.username
    },
    mutations: {
        UserList(state, data) {
            state.userList = data
        },
        setPage(state,data){
            state.page = data;
        },
        setSize(state, data){
            state.size = data;
        },
        setTotal(state, data) {
            state.total = data;
        },
        setUserinfo(state,data){
            // 存入本地存储是为了实现持久化！
            localStorage.setItem("userinfo",JSON.stringify(data))
            // 存入vuex是为了各组件方便直接拿取数据
            state.userinfo = data;
        },
        QUIT(state){
            localStorage.removeItem('userinfo');
            state.userinfo = {};
            router.push("/login")
        }
        
    },
    actions: {
        //发起一个行动，请求列表的数据
        async getUserList({ commit,dispatch,state }) {
            let res = await getUser(state.size,state.page);
            commit('UserList', res)
            dispatch('getUserTotal')
        },
        // 获取管理员的总数
        async getUserTotal({ commit}){
            let res = await getCount();
            commit('setTotal',res)
        },
        getSetPage({ commit,dispatch }, data){
            commit('setPage',data)
            dispatch('getUserList')
        },
        getSetSize({ commit, dispatch},data){
            commit('setSize', data)
            dispatch('getUserList')
        },
        async login({commit},data){
            let res = await login(data);
            if(res.code==200){
                commit('setUserinfo',res.list)
                Message.success('登录成功') 
                router.push("/") // 跳转到后台首页
            }else{
                Message.error(res.msg) 
            }
        }
    }
};

