<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>

        <el-table ref="singleTable" :data="righttable" border style="width: 100%">
            <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column property="authName" label="权限" width="120">
            </el-table-column>
            <el-table-column property="path" label="路径" width="120">
            </el-table-column>
            <el-table-column  label="层级" width="120">
                <template slot-scope="scope">
                    <span>{{ scope.row.level | filtlevel }}</span>
                </template> 
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import { rightList } from "@/api/index.js";
export default {
  data() {
    return {
      righttable: []
    };
  },
  mounted() {
    rightList("list").then(res => {
      //console.log(res)
      this.righttable = res.data;
    });
  },
  filters: {
    filtlevel(level) {
      if (level === "0") {
        return  "一级";
      } else if (level === "1") {
        return "二级";
      } else if (level === "2") {
        return "三级";
      } else {
        return "11111";
      }
    }
  },
  methods: {
    setCurrent(row) {
      this.$refs.singleTable.setCurrentRow(row);
    }
  }
};
</script>

<style scoped>
</style>