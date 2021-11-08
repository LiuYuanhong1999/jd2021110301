<template>
  <div class="main">
    <h3>{{op==1?"新增":"修改"}}</h3>
    <el-form :model="form" :rules="rules"
             label-width="120px">
      <el-form-item label="客户编号" class="post">
        <el-input v-model="form.cusNo" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户名称" class="post">
        <el-input v-model="form.cusName"></el-input>
      </el-form-item>
      <el-form-item label="手机号码" class="post">
        <el-input  v-model="form.cusCellphone"></el-input >
      </el-form-item>
      <el-form-item label="QQ" class="post">
        <el-input  v-model="form.cusQq"></el-input >
      </el-form-item>
      <el-form-item label="客户地址" class="post">
        <el-input  v-model="form.cusPost"></el-input >
      </el-form-item>
      <el-form-item label="客户类别" class="post">
<!--        <el-input  v-model="form.ctId"></el-input >-->
        <el-select v-model="form.ctId">
          <el-option v-for="v in courstomerTypes" :label="v.ctName" :value="v.ctId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="信息来源" class="post">
<!--        <el-input  v-model="form.sourceId"></el-input >-->
        <el-select v-model="form.sourceId">
          <el-option v-for="v in sources" :label="v.sourceName" :value="v.sourceId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="意向厂商" class="post">
<!--        <el-input  v-model="form.factoryId"></el-input >-->
        <el-select v-model="form.factoryId">
          <el-option v-for="v in factorys" :label="v.factoryName" :value="v.factoryId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="意向品牌" class="post">
<!--        <el-input  v-model="form.brandId"></el-input >-->
        <el-select v-model="form.brandId">
          <el-option v-for="v in brands" :label="v.brandName" :value="v.brandId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="意向颜色" class="post">
<!--        <el-input  v-model="form.ggColor"></el-input >-->
        <el-select v-model="form.ggColor">
          <el-option v-for="v in colors" :label="v.colorName" :value="v.colorId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="考虑因素" class="post">
        <el-input  v-model="form.cusFactor"></el-input >
      </el-form-item>
      <el-form-item label="预算" class="post">
        <el-input  v-model="form.cusBudget"></el-input >
      </el-form-item>
<!--      <el-form-item label="建档日期" class="post">
        <el-input  v-model="form.cusTime"></el-input >
      </el-form-item>-->
      <el-form-item label="销售顾问" class="post">
        <el-input  v-model="form.listNum"></el-input >
      </el-form-item>
      <el-form-item label="备注" class="all">
        <el-input type="textarea" rows="5" v-model="form.cusReamrk"/>
      </el-form-item>
      <br/>
      <el-form-item class="all">
        <el-button type="primary" @click="onSubmit">确定</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单绑定的实体类
      form: {
        cusState:'跟踪中'
      },
      //数据验证
      rules: [],
      op:1,// 1新增 2修改
      courstomerTypes:[],//客户类别
      sources:[],//信息来源
      factorys:[],//汽车厂商
      brands:[],//车辆品牌
      colors:[],//车辆颜色
    }
  },
  methods:{
    //确定新增
    onSubmit(){
      let s=JSON.parse(localStorage.getItem("loginuser"))
      var s1 = s.slice(1,-1);
      this.form.listNum=s1;
      var url="http://localhost:8088/coustomer"
      if(this.op==2){
        url="http://localhost:8088/coustomer/update"
      }
      this.axios.post(url,this.form)
      .then(v=>{
        this.cancel();
      })
    },
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
      this.$router.replace("/coustomer");
    },
    //加载客户类别
    loadCourstomerType(){
      this.axios.get("http://localhost:8088/coustomertype")
      .then(v=>{
        this.courstomerTypes=v.data
      })
    },
    //查询所有信息来源
    loadSource(){
        this.axios.get("http://localhost:8088/source")
        .then(v=>{
          console.log("输出所有的客户信息来源",v)
          this.sources=v.data;
        })
    },
    //查询所有的意向厂商
    loadfactory(){
      this.axios.get("http://localhost:8088/factory/show")
      .then(v=>{
        console.log("输出所有汽车厂商",v);
        this.factorys=v.data;
      })
    },
    //查询所有意向品牌
    loadBrand(){
      this.axios.get("http://localhost:8088/brand")
      .then(v=>{
        console.log("查询所有车辆品牌",v);
        this.brands=v.data;
      })
    },
    //查询所有意向颜色
   loadColor(){
      this.axios.get("http://localhost:8088/color")
      .then(v=>{
          console.log("查询所有意向颜色",v);
          this.colors=v.data;
      })
    }
  },
  mounted() {
    this.load();
    this.loadCourstomerType();
    this.loadfactory();
    this.loadColor();
    this.loadSource()
    this.loadBrand();
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
.main{

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
