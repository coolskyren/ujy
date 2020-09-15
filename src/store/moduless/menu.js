import { getMenu } from "@/axios/index"
export default {
    namespaced: true,
    state: {
        menuList: []
    },
    getters: {
        menuList: state => state.menuList
        
    },
    mutations: {
        MenuList(state, data) {
            state.menuList = data
        }
        
    },
    actions: {
        //发起一个行动，请求列表的数据
        async getMenuList({ commit }) {
            let res = await getMenu();
            commit('MenuList', res)
        }
    }
};

