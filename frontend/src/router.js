import Vue from 'vue'
import Router from 'vue-router'

import LoginBox from '@/components/LoginBox'
import Students from '@/components/Students'
import HelloWorld from '@/components/HelloWorld'

import store from './store';

Vue.use(Router)

const requireAuth = () => (to, from, next) => {
  if (store.getters.isAuthenticated) return next()
  next('/api/login?returnPath=students')
}

export default new Router({
 mode: 'history',
 base: process.env.BASE_URL,
 routes: [
  {
    path: '/',
    name: 'LoginBox',
    component: LoginBox
  },
  {
    path: '/students',
    name: 'Students',
    component: Students,
    beforeEnter: requireAuth()
  },
  {
    path: '/helloworld',
    name: 'HelloWorld',
    component: HelloWorld
    // 이것 조차 안되네. 싱글 페이지 어플리케이션이라서?
    // SPA에 대해서 더 찾아보기
  }
 ]
})