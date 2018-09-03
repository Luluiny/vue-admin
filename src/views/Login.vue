<template>
    <div class="login">
        <div class="container">
            <img src="../assets/1.jpg" alt="" class="avatar">
            <el-form :model="loginForm" :rules="rules" ref="loginForm" class="demo-ruleForm">
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username"  prefix-icon="myicon myicon-user" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password"  prefix-icon="myicon myicon-key" placeholder="请输入密码"></el-input>
                </el-form-item>

                <el-form-item>
                    <el-button style="width:100%"  type="primary" @click="submitForm('loginForm')">立即创建</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>


<script>
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
         console.log(this.$refs.loginForm);
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
