<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>商品管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品分类</el-breadcrumb-item>
        </el-breadcrumb>
        <el-button type="success" plain @click="showRole">添加分类</el-button>

        <tree-grid
            :treeStructure="true"
            :columns="columns"
            :data-source="dataSource"
            @deleteCate="deleteCategory"
            @editCate="editCategory"
        >
    </tree-grid>

    <!-- 添加分类对话框 -->
    <el-dialog title="收货地址" :visible.sync="addcategorydialogFormVisible">
        <el-form :model="categoryform" label-width="100px">
            <el-form-item label="活动名称" >
                <el-input v-model="categoryform.cat_name" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
                 <el-cascader
                    :options="categoryList"
                    v-model="selectedOptions"
                    @change="handleChange"
                    :props="propLists">
                 </el-cascader>
            </el-form-item>
        </el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="addcategorydialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="categorydialogconfir">确 定</el-button>
  </div>
</el-dialog>

    </div>
</template>

<script>
import { getCategory,addCategory } from '@/api/index.js'
import TreeGrid from '@/components/TreeGrid/TreeGrid.vue'
export default {
    data () {
        return {
            //使用props进行数据展示
        propLists:{
            //label 是我们要显示的那一个值  children是下一级要中的是那一项
            //  value是现在点的这一项的id 没有这个的话就不知道是点的那一项 只会出现一级
            // 点击下一级的时候 不会出现其他的下一级还会报错 
            label:'cat_name',
            children:'children',
            value:'cat_id'
        },
        categoryList: [],
        selectedOptions: [],
        dataSource: [],
        addcategorydialogFormVisible:false,
        categoryform:{
           cat_pid:'',
           cat_name:'',
           cat_level:''
        },
        columns: [{
        text: '分类名称',
        dataIndex: 'cat_name',
        width: ''
        }, {
        text: '是否有效',
        dataIndex: 'cat_deleted',
        width: ''
        }, {
        text: '排序',
        dataIndex: 'cat_level',
        width: ''
        }]
        }
    },
    //通过conponents 属性可以注入我们想使用的组件
    components: {
      'tree-grid':  TreeGrid
    },
    methods: {
        //级联发生变化的时候触发
        handleChange(value) {
        console.log(value)
      },
        //确认添加分类 
        categorydialogconfir(){
            console.log(this.selectedOptions)
            if(this.selectedOptions.lenght===0){
                this.categoryform.cat_pid=0
                this.categoryform.cat_level=0
            }else if(this.selectedOptions.lenght===1){
                 this.categoryform.cat_level=1
                  this.categoryform.cat_pid=this.selectedOptions[0]
            }else if(this.selectedOptions.lenght===2){
                 this.categoryform.cat_level=2
                 this.categoryform.cat_pid=this.selectedOptions[1]
            }
            addCategory(this.categoryform).then(res=>{
                console.log(res)
                if(res.meta.status===201){
                    this.$message({
                        message:res.meta.msg,
                        type:'success'
                    })
                }else{
                     this.$message({
                        message:res.meta.msg,
                        type:'error'
                    })
                }
                
            })
            this.addcategorydialogFormVisible=false
        },
        deleteCategory(){},
        editCategory(){},
        showRole(){
            this.addcategorydialogFormVisible=true
            //弹出添加分类的这里的数据展示跟页面使用TreeGrid的时候数据展示是一样的
            getCategory(2).then(res=>{
            console.log(res)
            this.dataSource=res.data
        })
        }
    },
    mounted () {
        getCategory(3).then(res=>{
            console.log(res)
            this.categoryList=res.data
        })
    }
}
</script>

<style scoped>
</style>