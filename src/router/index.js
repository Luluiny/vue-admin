import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'

import User from '@/views/user/User.vue'
import Right from '@/views/right/Right.vue'
import Role from '@/views/right/Role.vue'


import Good from '@/views/good/Goods.vue'

import Param from '@/views/good/Params.vue'

import Categorie from '@/views/good/Categorys.vue'

import List from '@/views/good/List.vue'

import Add from '@/views/good/Add.vue'

import Report from '@/views/report/Report.vue'

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.use(ElementUI)
Vue.use(Router)

export default new Router({
  routes: [
    { path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
       { path: 'users',
       name: 'User',
       component: User
      },
      { path: 'roles',
       name: 'Role',
       component: Role
      },
      { path: 'rights',
       name: 'Right',
       component: Right
      },
      { path: 'goods',
       name: 'Good',
       component: Good,
       redirect:{path:'goods/list'},
       children:[
            { path: 'list',
            name: 'List',
            component: List
          },
          { path: 'add',
            name: 'Add',
            component: Add
          }
       ]
      },
      { path: 'categories',
       name: 'Categorie',
       component: Categorie
      },
      { path: 'params',
       name: 'Param',
       component: Param
      },
      // { path: 'orders',
      //  name: 'Order',
      //  component: Order
      // },
      { path: 'reports',
       name: 'Report',
       component: Report
      }
      ]
    }
  ]
})
