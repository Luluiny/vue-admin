<template>
    <div class="home">
        <el-container>

            <el-aside width="auto">
                <div class="logo"></div>
                <el-menu class="el-menu-admin" :router='true' :unique-opened='true' :collapse='isCollapse' @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-submenu :index="item.id+''" v-for="item in menusList" :key="item.id"> 
                        <template slot="title"> 
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index="'/'+subitem.path" v-for="subitem in item.children" :key="subitem.id">
                            <i class="el-icon-location"></i>
                            <span>{{subitem.authName}}</span>
                        </el-menu-item>
                    </el-submenu>




                </el-menu>
            </el-aside>
            <el-container>
                <el-header>
                    <span class="toggle-btn myicon myicon-menu" @click='isCollapse = !isCollapse'></span>
                    <span class="system-title">用户管理系统</span>
                    <div>
                    <span class="welcome">{{$store.state.username ? $store.state.username : $store.getters.username}} :你好</span>
                     <el-button type="text" @click='logout'>退出</el-button>
                     </div>
                </el-header>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
import { getMenus } from "@/api/index.js";
export default {
  data() {
    return {
      isCollapse: false,
      menusList: []
    };
  },
  mounted() {
    getMenus().then(res => {
       // console.log(res)
        
      this.menusList = res.data;
    });
  },
  methods: {
    handleOpen(key, keyPath) {
      //console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      //console.log(key, keyPath);
    },
    logout(){
        localStorage.removeItem('mytoken')
        this.$router.push('login')
    }
  }
};
</script>

<style lang='scss' >
.home {
  height: 100%;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #545c64;
  }
  .logo {
    height: 60px;
    background: url(../assets/logo.png);
    background-size: cover;
    background-color: #fff;
  }
  .toggle-btn {
    padding: 0 15px;
    margin-left: -20px;
    font-size: 36px;
    color: white;
    cursor: pointer;
    line-height: 60px;
    &:hover {
      background-color: #4292cf;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>