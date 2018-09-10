<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="success" plain @click="showRole">添加数据</el-button>

    <template>
      <el-table :data="roleList" border style="width: 100%;margin-top:15px">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <!-- 第一层循环最靠左边的这一列 然后一共是有3列 进行三次循环每次都是在上一次的一个列中进行 -->
            <el-row v-for="first in scope.row.children" :key="first.id">
              <el-col :span='4'>
                <el-tag closable type="success" @close="deletegrend(scope.row,first.id)">
                  {{first.authName}}
                </el-tag>
                <span class="el-icon-arrow-right" v-if="first.children.length!==0"></span>
              </el-col>
              <el-col :span='20'>
                <el-row v-for="second in first.children" :key="second.id">
                  <el-col :span='4'>
                    <el-tag closable type="info" @close="deletegrend(scope.row,second.id)">
                      {{second.authName}}
                    </el-tag>
                    <span class="el-icon-arrow-right" v-if="second.children.length!==0"></span>
                  </el-col>
                  <el-col :span='20'>

                    <el-tag closable type="warning" v-for="third in second.children" :key="third.id" style="margin-bottom:5px;margin-right:5px" @close="deletegrend(scope.row,third.id)">
                      {{third.authName}}
                    </el-tag>

                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <el-row v-if="scope.row.children.length===0">
              <el-col>
                该角色现在还没有权限 请先添加
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="roleName" label="角色" width="180">
        </el-table-column>
        <el-table-column prop="roleDesc" label="描述" width="180">
        </el-table-column>

        <!-- 点击这个按钮的时候要获取这个按钮所在行的数据 template可以实现这个操作 
                这里面的slot-scope可以拿到数据 这个属性的scop.row就是我们需要的这一行的对应的数据 -->

        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-delete" title='删除'></el-button>
            <el-button type="primary" icon="el-icon-edit" title='编辑'></el-button>
            <el-button type="primary" icon="el-icon-share" title='授权角色' @click="shouaddtrange(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-dialog title="添加角色" :visible.sync="roledialogFormVisible">
      <el-form :model="roleform" :rules='rules' label-width='100px' ref='roleform'>
        <el-form-item label="角色" prop='rolename'>
          <el-input v-model="roleform.rolename"></el-input>
        </el-form-item>
        <el-form-item label="描述" prop='roledesc'>
          <el-input v-model="roleform.roledesc"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roledialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoleconfir('roleform')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="授权角色111" :visible.sync="addroledialogFormVisible">
      <div style="height:300px;overflow:auto">

        <el-tree :data="roletree" show-checkbox :default-expand-all='true' node-key="id" ref="tree" :default-expanded-all='true' :default-checked-keys="checkArr" :props="defaultProps">
        </el-tree>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addroledialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addTrangconfir">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script>
import {
  shouRoles,
  addRole,
  deleteRole,
  rightList,
  addRoleright
} from "@/api/index.js";
export default {
  data() {
    return {
      //当前角色id
      roleid: "",
      roletree: [],
      defaultProps: {
        children: "children",
        label: "authName"
      },
      roleList: [],
      checkArr: [],
      roledialogFormVisible: false,
      addroledialogFormVisible: false,
      roleform: {
        roledesc: "",
        rolename: ""
      },
      rules: {
        //这里
        rolename: [
          { required: true, message: "请输入角色名", trigger: "blur" }
        ],
        roledesc: [
          { required: true, message: "请输入角色描述", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    //实现用户角色授权
    addTrangconfir() {
      // 1.获取了对象数组，我们需要的数据在每个对象的id和pid中
      var nodeArr = this.$refs.tree.getCheckedNodes();
      // 2.遍历数组，获取到每个对象的id和pid,拼接，并返回一个新的字符串存储在数组中
      //   获取的结果是这样的：["105,104,101", "116,104,101", "117,104,101"]
      var idArr = nodeArr.map(value => {
        return value.id + "," + value.pid;
      });
      console.log(idArr);
      //   3.将数组的元素拆分以,连接,得到的结果是这样的：105,104,101,116,104,101,117,104,101
      var strArr = idArr.join(",");
      console.log(strArr);
      //   4.去除重复值：不能直接对字符串去除重复，所以我们要将这个字符串转换为数组，再对数组去除重复值
      var ridsArr = strArr.split(",");
      console.log(ridsArr);
      //   5.去除数组的重复值
      var tempSet = new Set(ridsArr);
      console.log(tempSet);
      var final = Array.from(tempSet);
      console.log(final.join(","));
      //   这个值就是接口中需要的参数
      var rids = final.join(",");
      //   调用接口，为角色授权
      addRoleright({ roleid: this.roleid, rids: rids }).then(res => {
        if (res.meta.status === 200) {
          this.$message({
            message: res.meta.msg,
            type: "success"
          });
          this.initList();
          this.grantdialogTableVisible = false;
          this.$refs.tree.setCheckedKeys([]);
        }
      });
    },
    //实现添加分配角色的显示 同时要渲染树结构的内容
    shouaddtrange(row) {
      console.log(row);

      this.addroledialogFormVisible = true;
      rightList("tree").then(res => {
        //console.log(res);
        this.roletree = res.data;
        //打开之后要选中已经有的 只需要找到最后的一层就可以 最后一层只要有一个选中 前面两层就会自动选中
        //当前的用户的id
        this.roleid = row.id;
        //不写这句重置的 就会导致所有的都是跟权限最多的那个一样了
        this.checkArr.length = 0;

        if (row.children.length > 0) {
          row.children.forEach(first => {
            if (first.children.length > 0) {
              first.children.forEach(second => {
                if (second.children.length > 0) {
                  second.children.forEach(third => {
                    this.checkArr.push(third.id);
                  });
                }
              });
            }
          });
        }
      });
    },
    //删除权限
    deletegrend(row, rightId) {
      deleteRole(row.id, rightId).then(res => {
        //console.log(res);
        if (res.meta.status === 200) {
          row.children = res.data;
          this.$message({
            message: res.meta.msg,
            type: "success"
          });
        } else {
          this.$message({
            message: res.meta.msg,
            type: "error"
          });
        }
      });
    },
    //实现添加角色对话框显示
    showRole() {
      this.roledialogFormVisible = true
    },
    //实现添加角色
    addRoleconfir(roleform) {
      console.log(123)
      var deleteform=this.$refs[roleform]
      this.$refs[roleform].validate(valid => {
        if (valid) {
          //console.log(this.roleform)
          addRole({
            roleName: this.roleform.rolename,
            roleDesc: this.roleform.roledesc
          }).then(res => {
            //console.log(res);
            if (res.meta.status === 201) {
              this.$message({
                message: res.meta.msg,
                type: "success"
              })
              console.log(123123)
              this.roledialogFormVisible = false
              this.initroles()
              deleteform.resetFields()
              // resetFields 对整个表单进行重置，将所有字段值重置为初始值并移除校验结果
              // resetField  不加S的是对单独的表单项进行重置
            } else {
              this.$message({
                message: res.meta.msg,
                type: "error"
              })
            }
          });
        }
      });
    },
    initroles() {
      shouRoles().then(res => {
        //console.log(res)
        this.roleList = res.data
      });
    }
  },
  mounted() {
    this.initroles();
  }
};
</script>

<style scoped>
</style>