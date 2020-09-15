import { getRole } from "@/axios/index"
export default {
    namespaced: true,
    state: {
        roleList: []
    },
    getters: {
        roleList: state => state.roleList
        
    },
    mutations: {
        RoleList(state, data) {
            state.roleList = data
        }
        
    },
    actions: {
        //发起一个行动，请求列表的数据
        async getRoleList({ commit }) {
            let res = await getRole();
            commit('RoleList', res)
        }
    }
};

