import Vue from 'vue'
import Router from 'vue-router'
import Pos from '@/components/page/Pos'

Vue.use(Router)

export default new Router({
  // 这个坑是当你使用了路由之后，在没有后端配合的情况下就手贱打开路由history模式的时候，打包出来的文件也会是一片空白的情况
  // mode: 'history',
  routes: [{
    path: '/',
    name: 'pos',
    component: Pos
  }]
})
