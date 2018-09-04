<template>
    <div class="login">
        <div class="container">
            <img src="../assets/1.jpg" alt="" class="avatar">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"  prefix-icon="myicon myicon-user" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="loginForm.password"  prefix-icon="myicon myicon-key" placeholder="请输入密码"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button style="width:100%"  type="primary" @click="submitForm('loginForm')">立即创建</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>


<script>
//这里使用{}是因为引入的是这个文件中的一个部分 括号中的就是我们想引入的那部分
import { login } from '@/api/index.js'
export default {
  data() {
    return {
      loginForm:{
          username:'',
          password:''
      },
      rules: {
        username: [
          { required: true, message: "请输入活动名称", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请选择活动区域", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(a) {
      this.$refs[a].validate(valid => {
        if (valid) {
          //调用登录函数 发送axios请求 成功之后调用.then
         login(this.loginForm).then((res)=>{
           console.log(res)
           if(res.meta.status==200){
             //给出提示信息
            //  this.$message({
            //    message:res.meta.msg,
            //    type:'success'//直接跳转页面就不用提示了
            //  })
              //登录成功之后设置token保存到本地存储
              localStorage.setItem('mytoken',res.data.token)
             
              //实现跳转
               this.$router.push({name:'Home'})
           }else{
             this.$message({
               message:res.meta.msg,
               type:'error'
             })
           }
         })
        } else {
          console.log("提交错误!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style lang='scss' scoped>
.login {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: #2f4050;

  .container {
    position: absolute;
    left: 0;
    right: 0;
    width: 400px;
    padding: 0px 40px 15px 40px;
    margin: 200px auto;
    background: white;
    .avatar {
      position: relative;
      left: 50%;
      width: 120px;
      height: 120px;
      margin-left: -60px;
      margin-top: -60px;
      box-sizing: border-box;
      border-radius: 50%;
      border: 10px solid #fff;
      box-shadow: 0 1px 5px #ccc;
      overflow: hidden;
    }
    .login-btn {
      width: 100%;
    }
  }
}
</style>
