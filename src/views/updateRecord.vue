<template>
<div>
  <h3>新增或修改</h3>
  <el-form :model="form" :rules="rules"
           label-width="120px">
    <el-form-item label="one" class="post">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="two" class="post">
      <el-input v-model="form.id"></el-input>
    </el-form-item>
    <el-form-item label="three" class="post">
      <el-input  v-model="form.id"></el-input >
    </el-form-item>
    <el-form-item label="four" class="post">
      <el-input  v-model="form.id"></el-input >
    </el-form-item>
    <el-form-item class="post">
      <el-button type="primary" @click="onSubmit">确定</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      //表单绑定的实体类
      form: {},
      //数据验证
      rules: [],

    }
  }
}
</script>

<style scoped>
h3{
  text-align: center;
  margin: 10px 0px;
}
.post{
  width: 40%;
  float: left;
}
</style>