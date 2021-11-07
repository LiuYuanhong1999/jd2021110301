<template>
  <div class="main">
    <h3>{{op==1?"新增":"修改"}}</h3>
    <el-form :model="form" :rules="rules"
             label-width="120px">
      <el-form-item label="单号" class="post">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="客户名称" class="post">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="post">
<!--        <el-input  v-model="form.id"></el-input >-->
      </el-form-item>
      <el-form-item label="客户地址" class="post">
<!--        <el-input  v-model="form.id"></el-input >-->
      </el-form-item>
      <el-form-item label="QQ" class="post">
<!--        <el-input  v-model="form.id"></el-input >-->
      </el-form-item>
      <el-form-item label="客户编号" class="post">
<!--        <el-input  v-model="form.id"></el-input >-->
      </el-form-item>
      <el-form-item class="all">
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
  },
  methods:{
    //加载参数 判断是修改还是新增
    load(){
      var op=this.$route.params.op;
      if(!op){
        this.cancel();
      }
      console.log(op);
      if(op==2){
        this.form=JSON.parse(this.$route.params.entity);
        console.log(this.form);
      }
      this.op=op;
    },
    //取消
    cancel(){
      this.$router.replace("/order");
    },
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
.main:after{
  content: "";
  display: block;
  clear: both;
  margin-bottom: 10px;
}
.all{
  float: left;
  width: 80%
}
.el-select {
  display: inline;
}
</style>