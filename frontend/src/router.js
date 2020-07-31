import Vue from 'vue'
import Router from 'vue-router'

import LoginBox from '@/components/LoginBox'
import Students from '@/components/Students'

Vue.use(Router)

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
    component: Students
  }
 ]
})