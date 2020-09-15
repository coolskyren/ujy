import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
Vue.use(Router)
// 这段代码为了解决 element-ui 同路由强制跳转到同路由报错问题，原因是 element-ui和路由的版本冲突！
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

let router = new Router({
  routes: [
    {
      path: '/login',
      component: () => import('@/pages/login'),
      meta: {
        title: '登录'
      }
    },
    {
      path: '/',
      component: () => import('@/pages/index'),
      meta: {
        title: 'ujy后台管理系统'
      },
      redirect:'/index',
      children: [
        {
          path: '/index',
          component: () => import('@/pages/layout'),
          meta: {
            title: '首页'
          }
        },
        {
          path: '/menu',
          component: () => import('@/pages/system/menu'),
          meta: {
            title: '菜单管理'
          }
        },
        {
          path: '/role',
          component: () => import('@/pages/system/role'),
          meta: {
            title: '角色管理'
          }
        },
        {
          path: '/user',
          component: () => import('@/pages/system/user'),
          meta: {
            title: '管理员管理'
          }
        },
        {
          path: '/banner',
          component: () => import('@/pages/shop/banner'),
          meta: {
            title: '轮播图管理'
          }
        },
        {
          path: '/category',
          component: () => import('@/pages/shop/category'),
          meta: {
            title: '商品分离'
          }
        },
        {
          path: '/goods',
          component: () => import('@/pages/shop/goods'),
          meta: {
            title: '商品管理'
          }
        },
        {
          path: '/member',
          component: () => import('@/pages/shop/member'),
          meta: {
            title: '会员管理'
          }
        },
        {
          path: '/seckill',
          component: () => import('@/pages/shop/seckill'),
          meta: {
            title: '秒杀管理'
          }
        },
        {
          path: '/specs',
          component: () => import('@/pages/shop/specs'),
          meta: {
            title: '商品规格'
          }
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if(to.path==('/login')){
    document.title = to.meta.title
    next()
  }else{
    if(localStorage.getItem("userinfo")){
      let whiteList = store.getters['user/menus_url']
      whiteList.push('/index')
      if(whiteList.includes(to.path)){
        document.title = to.meta.title
      next()
      }else{
        alert('没有权限')
      }
    }else{
      next('/login')
    }
  }
})

export default router;