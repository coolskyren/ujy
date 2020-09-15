import Vue from 'vue'
import Vuex from "vuex"

Vue.use(Vuex)

import menu from './moduless/menu.js'
import role from './moduless/role.js'
import user from './moduless/user.js'
import gory from './moduless/category.js'

let store = new Vuex.Store({
    state:{
        iscollapse:false //控制是否隐藏侧边栏
    },
    getters:{

    },
    mutations:{
        Toggle(state){
            state.iscollapse = !state.iscollapse
        }
    },
    actions:{

    },
    modules:{
        menu,role,user,gory
    }
})
export default store