import Vue from 'vue'
import Vuex from 'vuex'


// 让vue使用vuex工具来实现组件之间的数据共享
Vue.use(Vuex)


// 存储数据的对象，我们可以将你需要存储的数据在这个state中定义
const state = {
  // 当前登陆的用户名
  username: ''
}
//mutations里面定义着操作State中数据的函数  通过这个函数我们可以自由的操作state中的数据 里面是函数 才会方便操作
//mutations是异步调用 调用的时候用commit 调用函数 
const mutations = {
  //这里面每一个函数都有一个默认值state这个 state就是上面定义的state对象  也可以传递其他的参数  state是第一个
  setusername:(state,value)=>{
    state.username=value
    localStorage.setItem('username',value)
  }
}
//actions里面存储着触发mutations里面的函数的行为 （函数触发器）
//action是异步 调用的时候直接用dispach调用里面的函数 这里是调用setusernameAction
const actions = {
    //触发器 在这里调用其他的函数
    setusernameAction:({commit},value)=>{
      commit('setusername',value)
    }
}
//属性封装 用来获取state里面的数据
const getters = {
 username:(state)=>{
    return localStorage.getItem('username')
 }
}


export default new Vuex.Store({
  strict:true,
  state,
  getters,
  actions,
  mutations
})