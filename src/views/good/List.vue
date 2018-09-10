<template>
    <div>
        <el-input placeholder="请输入内容" 
        v-model="searchValue" 
        class="input-with-select search-input" 
        @keyup.native.enter='searchUser'>
            <el-button slot="append" 
            icon="el-icon-search" 
            @click="searchUser"></el-button>
        </el-input>
        <el-button type="success" plain @click="$router.push({path:'add'})" >添加数据</el-button>
    </div>
</template>

<script>
export default {
    data () {
        return {
            searchValue:''
        }
    }
}
</script>

<style lang="scss" scoped>
.search-input {
    width: 300px;
  }
</style>