// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import './styles/index.scss'

//引入地图
import VueAMap from 'vue-amap';
//使用地图
Vue.use(VueAMap)

// 初始化vue-amap
VueAMap.initAMapApiLoader({
  // 高德的key
  key: '6a204f2b675f32f8849ec4b6b7c21e5c',
  // 插件集合
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 高德 sdk 版本，默认为 1.4.4
  v: '1.4.4'
})

//引入富文本编辑器
import VueQuillEditor from 'vue-quill-editor'
//引入富文本样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
//使用
Vue.use(VueQuillEditor)

//使用echarts图形
import ECharts from 'vue-echarts'
Vue.component('chart', ECharts)

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



