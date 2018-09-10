import axios from 'axios'
//配置基准路径
const baseURL = 'http://localhost:8888/api/private/v1/'
//设置基准路径
axios.defaults.baseURL=baseURL

//添加一个拦截器（token)
axios.interceptors.request.use(function (config) {
    　　// 在发送请求之前做些什么
    //获取token
    var token=localStorage.getItem('mytoken')
    //写入请求头
    
    if(token){
        config.headers['Authorization'] = token
    }

        return config
    }, function (error) {
    　　// 对请求错误做些什么
    return Promise.reject(error)
    })

//登录 暴露一个函数
export const login=(params)=>{
return axios.post('login',params).then((res)=>{
    return res.data
})
}

//获取所有数据
export const getAllUserList=(pa)=>{
    return axios.get('users',pa).then((res)=>{
        return res.data
    })
}

//添加用户
export const addUser=(pa)=>{
    return axios.post('users',pa).then((res)=>{
        return res.data
    })
}
//编辑
export const editUser=(pa)=>{
return axios.put(`users/${pa.id}`,pa).then((res)=>{
    return res.data
})
}
//删除
export const deleteUser=(id)=>{
    return axios.delete(`users/${id}`).then((res)=>{
        return res.data
    })
}
//修改用户状态 携带在url中 所以可以不用在另外传一个对象
export const changeuserState=(pa)=>{
    return axios.put(`users/${pa.id}/state/${pa.state}`).then((res)=>{
        return res.data
    })
    }
//获取所有角色数据
export const shouRoles=()=>{
    return axios.get(`roles`).then((res)=>{
        return res.data
    })
}
//实现角色授权
export const grantUsers=(pa)=>{
    return axios.put(`users/${pa.id}/role`,{rid:pa.rid}).then((res)=>{
        return res.data
  })
}
//所有权限列表 授权列表
export const rightList=(list)=>{
    return axios.get(`rights/${list}`).then((res)=>{
        return res.data
  })
}
//添加角色
export const addRole=(pa)=>{
    return axios.post('roles',pa).then((res)=>{
        return res.data
    })
}
//删除角色指定权限
export const deleteRole=(roleId,rightId)=>{
    return axios.delete(`roles/${roleId}/rights/${rightId}`).then((res)=>{
        return res.data
    })
}
//给指定的角色添加权限
export const addRoleright=(pa)=>{
    return axios.post(`roles/${pa.role.id}/rights`,{rids: pa.rids}).then((res)=>{
        return res.data
    })
}
//动态生成左边的菜单栏
export const getMenus=()=>{
    return axios.get(`menus`).then((res)=>{
        return res.data
  })
}

//获取商品分类的数据展示
export const getCategory=(type)=>{
    return axios.get(`categories`,{params:{'type':type}}).then((res)=>{
        return res.data
  })
}

//添加分类
export const addCategory=(pa)=>{
    return axios.post(`categories`,pa).then((res)=>{
        return res.data
    })
}