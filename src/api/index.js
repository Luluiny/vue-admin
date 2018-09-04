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
    config.headers['Authorization'] = token
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
    return axios.get('users',{params:pa}).then((res)=>{
        return res
    })
}