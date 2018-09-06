<template>
  <div class="user">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-input placeholder="请输入内容" v-model="searchValue" class="input-with-select search-input" @keyup.native.enter='searchUser'>
      <el-button slot="append" icon="el-icon-search" @click="searchUser"></el-button>
    </el-input>
    <el-button type="success" plain @click="shoudialog">添加数据</el-button>

    <template>
      <el-table :data="userList" border style="width: 100%;margin-top:15px">
        <el-table-column type="index" width="50">
        </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话">
        </el-table-column>
        <!-- 点击这个按钮的时候要获取这个按钮所在行的数据 template可以实现这个操作 
                这里面的slot-scope可以拿到数据 这个属性的scop.row就是我们需要的这一行的对应的数据 -->
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-switch active-color="#13ce66" inactive-color="#ff4949" v-model="scope.row.mg_state">
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" title='编辑' @click="shouEditdialog(scope.row)"></el-button>
            <el-button type="primary" icon="el-icon-share" title='授权角色'></el-button>
            <el-button type="primary" icon="el-icon-delete" title='删除' @click="deleteUserList(scope.row.id)"></el-button>
          </template>
        </el-table-column>
      </el-table>
    </template>

    <el-pagination style="margin-top:15px;background-color:yellowgreen" @size-change="handleSizeChange" @current-change="handleCurrentChange" :page-sizes="[1, 2, 3, 4]" :page-size="pagesize" layout="total, sizes, prev, pager, next, jumper" :total="total">
    </el-pagination>

    <el-dialog title="添加用户" :visible.sync="adddialogFormVisible">
      <el-form :model="addform" :rules='rules' label-width='100px' ref='addform'>
        <el-form-item label="用户名" prop='username'>
          <el-input v-model="addform.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop='password'>
          <el-input v-model="addform.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="addform.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop='mobile'>
          <el-input v-model="addform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="adddialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="adddialogFormconfir('addform')">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="编辑用户" :visible.sync="editdialogFormVisible">
      <el-form :model="editform" :rules='rules' label-width='100px' ref='editform'>
        <el-form-item label="用户名" prop='username'>
          <el-input v-model="editform.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="邮箱" prop='email'>
          <el-input v-model="editform.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop='mobile'>
          <el-input v-model="editform.mobile"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editdialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editdialogFormconfir('editform')">确 定</el-button>
      </div>
    </el-dialog>

  </div>

</template>

<script>
import { getAllUserList, addUser, editUser, deleteUser } from "@/api/index.js";
export default {
  data() {
    return {
      input5: "",
      total: 0,
      pagesize: 2,
      pagenum: 1,
      searchValue: "",
      dialogTableVisible: false,
      adddialogFormVisible: false,
      editdialogFormVisible: false,
      addform: {
        username: "",
        mobile: "",
        password: "",
        email: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      editform: {
        username: "",
        password: "",
        mobile: "",
        email: "",
        id: ""
      },
      formLabelWidth: "120px",
      userList: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请选择密码", trigger: "blur" }],
        email: [{ required: true, message: "请选择邮箱", trigger: "blur" }],
        mobile: [{ required: true, message: "请选择电话号码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //实现删除 删除传入id号 点击之后弹出一个确认框提示是否真的删除
    deleteUserList(id) {
      this.$confirm(`此操作将永久删除id为${id}的用户, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //点击确认之后调用接口
          deleteUser(id).then(res => {
            //console.log(111111111111)
            console.log(res)
            // console.log(111111111111)
            if (res.meta.status === 200) {
              this.$message({
                type: "success",
                message: res.meta.msg,
                duration: 1000
              });
              this.initUserList();
            } else {
              this.$message({
                type: "info",
                message: res.meta.msg
              });
            }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: res.meta.msg
          });
        });
    },
    editdialogFormconfir(formname) {
      this.$refs[formname].validate(vavid => {
        if (vavid) {
          //通过验证时候调用接口
          editUser({
            id: this.editform.id,
            email: this.editform.email,
            mobile: this.editform.mobile
          }).then(res => {
            console.log(res);
            if (res.meta.status == 200) {
              this.$message({
                message: res.meta.msg,
                type: "success"
              });
            }
            this.editdialogFormVisible = false;
            this.initUserList();
          });
        } else {
          //编辑失败
          this.$message.error = "编辑失败";
          return false;
        }
      });
    },
    searchUser() {
      this.initUserList();
    },
    shouEditdialog(row) {
      this.editdialogFormVisible = true;
      console.log(row);
      this.editform.mobile = row.mobile;
      this.editform.password = row.password;
      this.editform.username = row.username;
      this.editform.email = row.email;
      this.editform.id = row.id;
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
      this.pagesize = val;
      this.initUserList();
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.pagenum = val;
      this.initUserList();
    },
    //点击添加用户的按钮显示添加的对话框
    shoudialog() {
      this.adddialogFormVisible = true;
    },
    //实现用户的添加 使用ref获得添加的表单中的值
    adddialogFormconfir(addform) {
      console.log(123);
      //使用ref和rules可以验证用户的输入是否通过 通过之后就直接发送请求
      this.$refs[addform].validate(valid => {
        //验证通过valid的值就是true
        if (valid) {
          addUser(this.addform).then(res => {
            // console.log(11111111111111)
            console.log(res);
            //console.log(11111111111111)
            if (res.meta.status == 201) {
              this.$message({
                message: res.meta.msg,
                type: "success"
              });
              this.initUserList()
              //重置清空对话框
              this.$refs[addform].resetFields()
            } else {
              this.$message.error(res.meta.msg);
            }
          });
        } else {
          //添加失败
          this.$message.error = "数据不合法";
          return false;
        }
      });
      this.adddialogFormVisible = false;
    },
    //加载用户数据会多次改变 把这个加载数据的封装起来 之后每一次改变都要调用
    initUserList() {
      getAllUserList({
        params: {
          query: this.searchValue,
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      }).then(res => {
        //console.log(res.data.users);
        this.userList = res.data.users;
        this.total = res.data.total;
      });
    }
  },
  mounted() {
    this.handleSizeChange(this.pagesize);
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