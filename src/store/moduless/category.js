import { getCate } from "@/axios/index"
export default {
    namespaced: true,
    state: {
        cateList: []
    },
    getters: {
        cateList: state => state.cateList
        
    },
    mutations: {
        CateList(state, data) {
            state.cateList = data
        }
        
    },
    actions: {
        //发起一个行动，请求列表的数据
        async getCateList({ commit }) {
            let res = await getCate();
            commit('CateList', res)
        }
    }
};

