<template>
    <div class="user">
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-input placeholder="请输入内容" v-model="input5" class="input-with-select search-input">
            <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button type="success" plain>成功按钮</el-button>

        <template>
            <el-table :data="tableData" border style="width: 100%">
                <el-table-column type="index" width="50">
                </el-table-column>
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
                <el-table-column prop="name" label="姓名" width="180">
                </el-table-column>
                <el-table-column prop="address" label="地址">
                </el-table-column>
                <!-- 点击这个按钮的时候要获取这个按钮所在行的数据 template可以实现这个操作 
                这里面的slot-scope可以拿到数据 这个属性的scop.row就是我们需要的这一行的对应的数据 -->
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch active-color="#13ce66" inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" title='编辑'  @click="switchedit(scope)"></el-button>
                        <el-button type="primary" icon="el-icon-share" title='删除'></el-button>
                        <el-button type="primary" icon="el-icon-delete" title='授权角色'></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </template>

    </div>

</template>

<script>
import { getAllUserList } from "@/api/index.js";
export default {
  data() {
    return {
      input5: "",

      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  methods: {
      switchedit(a){
          console.log(a)
          
      }
  },
  mounted() {
    getAllUserList({
      params: {
        query: 1,
        pagenum: 10,
        pagesize: 1
      }
    }).then(res => {
      console.log(res);
    });
  }
};
</script>

<style lang='scss' scoped>
.user {
  .search-input {
    width: 300px;
  }
}
</style>