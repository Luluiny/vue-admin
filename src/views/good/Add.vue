<template>
    <div>
        <!-- 实现步骤条和tabs标签绑定 让他们的值都是一样的activeName steps是需要num 但是tab是是string
         所以在传值的时候减去一个0 这样类型隐式的转换为num -->
        <el-steps :space="200" :active="activeName-0" finish-status="success">
            <el-step title="已完成"></el-step>
            <el-step title="进行中"></el-step>
            <el-step title="步骤 3"></el-step>
            <el-step title="进行中"></el-step>
            <el-step title="步骤 3"></el-step>
        </el-steps>
        <template>
            <el-form :model="addform" label-width='80px'>
                <el-tabs v-model="activeName" tab-position='left' style='margin-top:20px'>
                    <el-tab-pane label="基本信息" name="0">
                        <el-form-item label="商品名称">
                            <el-input v-model="addform.goods_name"></el-input>
                        </el-form-item>
                        <el-form-item label="商品价格">
                            <el-input v-model="addform.goods_price" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品数量">
                            <el-input v-model="addform.goods_number" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品重量">
                            <el-input v-model="addform.goods_weight" type="number"></el-input>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <el-cascader :options="cateList" v-model="selectedOptions" :props="cateprops">
                            </el-cascader>

                        </el-form-item>
                    </el-tab-pane>
                    <el-tab-pane label="商品参数" name="1">商品参数</el-tab-pane>
                    <el-tab-pane label="商品配送范围" name="2">
                        <div class="amap-wrapper">
                            <el-amap class="amap-box" :vid="'amap-vue'"></el-amap>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="商品图片" name="3">
                        <el-upload class="upload-demo" action="http://localhost:8888/api/private/v1/upload" :on-preview="handlePreview" :on-remove="handleRemove" :on-success="filedone" :file-list="fileList" :before-upload="beforeuploadfile" :headers='setheader()' list-type="picture">
                            <el-button size="small" type="primary">点击上传</el-button>
                            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
                        </el-upload>
                    </el-tab-pane>
                    <el-tab-pane label="富文本" name="4">
                        <quill-editor
                        v-model="content"
                        ref="myQuillEditor"
                        :options="editorOption"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        style="height:300px">
                        </quill-editor>
                    </el-tab-pane>
                </el-tabs>
            </el-form>
        </template>
        <!-- 显示大图的弹出框 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="70%">
            <img :src="imagesrc" alt="">
        </el-dialog>

    </div>
</template>

<script>
import { getCategory } from "@/api/index.js";
export default {
  data() {
    return {
        content: null,
      editorOption: {
          modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block']
          ]
        }
      },
      selectedOptions: [],
      cateprops: {
        children: "children",
        value: "cat_id",
        label: "cat_name"
      },
      cateList: [],
      fileList: [],
      dialogVisible: false,
      imagesrc: "",
      activeName: "",
      addform: {
        goods_name: "",
        goods_cat: "",
        goods_price: "",
        goods_number: "",
        goods_weight: "",
        goods_introduce: "",
        pics: [],
        attrs: []
      }
    };
  },
  methods: {
        onEditorBlur (quill) {
      console.log('editor blur!', quill)
    },
    onEditorFocus (quill) {
      console.log('editor focus!', quill)
    },
    onEditorReady (quill) {
      console.log('editor ready!', quill)
    },
    //文件上传成功时的钩子函数  在文件上传成功的时候就把文件的路径存起来 pics里面
    filedone(response, file, fileList) {
      // console.log(response)
      //console.log(file)
      // console.log(fileList)
      this.addform.pics.push({ pic: response.data.tmp_path });
    },
    //上传文件之前的狗子函数 参数为上传的文件 上传之前就对文件的大小进行判断
    beforeuploadfile(file) {
      //console.log(file)
      if (file.size > 500 * 1024) {
        this.$message({
          message: "文件大小不超过500kb",
          type: "warning"
        });
        return false; //这里应该写在判断里面是因为
      }
    },
    //写入请求头 由于uploads组件自己封装了异步的请求机制 所以我们之前设置的拦截器写入的token是没有效果的
    //还好组件有自己的设置上传请求头的方法 就是headers
    setheader() {
      var token = localStorage.getItem("mytoken");
      return { Authorization: token };
    },
    //实现文件的删除 当上传的图片被删除时触发 我们删除的时候只是删除了在页面的显示在文件中还是会存在 不会删除服务器的文件
    handleRemove(file, fileList) {
      //console.log(file, fileList); //file是删除的那一项 fileList是删除之后剩余的其他文件
      //使用findIndex()函数查找目标元素 找到就返回元素的位置 找不到就返回-1
      //使用find()函数查找目标元素 找到就返回该元素 找不到就返回undefined
      //这两个括号里面都是一个回调函数
      //我们使用file 找到pics里面相同路径的那一项 删掉那一项
      if (!file.response) {
        return;
      }
      var filepath = file.response.data.tmp_path;
      //找到删除的那一项的索引
      var index = this.addform.pics.findIndex(value => {
        return value.pic === filepath;
      });
      this.addform.pics.splice(index, 1);
      console.log(11111111111111111);
      console.log(this.addform.pics);
    },
    //实现预览 我们的图片资源是存储在服务器中 所以要写服务器的路径
    //不在前面写路径的话就会默认请求本地的 但是本地根本就没有那个文件夹
    handlePreview(file) {
      this.imagesrc = "http://localhost:8888/" + file.response.data.tmp_path;
      this.dialogVisible = true;
    }
  },
  mounted() {
    getCategory(3).then(res => {
      // console.log(res)
      this.cateList = res.data;
    })
  },
  computed: {
    editor () {
      return this.$refs.myQuillEditor.quill
    }
  }
};
</script>

<style lang="scss" scoped>
.amap-wrapper {
  width: 500px;
  height: 500px;
}
</style>