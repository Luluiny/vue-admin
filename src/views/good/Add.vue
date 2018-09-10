<template>
    <div>
        <el-upload class="upload-demo" 
        action="http://localhost:8888/api/private/v1/upload" 
        :on-preview="handlePreview" 
        :on-remove="handleRemove" 
        :file-list="fileList" 
        :headers='setheader()' 
        list-type="picture">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <!-- 显示大图的弹出框 -->
        <el-dialog title="提示" 
            :visible.sync="dialogVisible" 
            width="70%"
            <img :src="imagesrc" alt="">
            >
        </el-dialog>
        
    </div>
</template>

<script>
export default {
  data() {
    return {
      fileList: [],
      dialogVisible:false,
      imagesrc:''
    };
  },
  methods: {
    //写入请求头
    setheader() {
      var token = localStorage.getItem("mytoken");
      return { Authorization: token };
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //实现预览
    handlePreview(file) {
      console.log(file);
    }
  }
};
</script>

<style scoped>
</style>