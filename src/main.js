// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.scss'

import store from '@/store/store.js'


Vue.config.productionTip = false

//添加全局路由守卫
//to 即将要去的地方 from从哪里去的 next 进行下一步
//判断有没有token 有就下一步 没有就判断是不是去登录 是去登录就下一部  不是去登录就重定向到登录
router.beforeEach((to, from, next) => {
  var token=localStorage.getItem('mytoken')
 if(token){
   next()
 }else{
   if(to.path=='/login'){
     next()
   }else{
    next({ name: 'Login'})
   }
 }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store: store,
  components: { App },
  template: '<App/>'
})



