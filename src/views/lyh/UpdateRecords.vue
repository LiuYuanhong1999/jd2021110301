<template>
  <div>
    <h3>编辑收车登记</h3>
    <el-form :model="form" :rules="rules"
             label-width="120px">
      <el-form-item label="登记编号" class="post">
        <el-input v-model="form.recordId" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="厂商名称" class="post">
        <el-select v-model="form.factoryId"></el-select>
      </el-form-item>
      <el-form-item label="汽车品牌" class="post">
        <el-select  v-model="form.brandId" @change="findDesign(form.brandId)">
          <el-option v-for="item in brand" :key="item.brandId" :label="item.brandName" :value="item.brandId"></el-option>


        </el-select >
      </el-form-item>
      <el-form-item label="汽车款式" class="post">
        <el-select  v-model="form.designId">
          <el-option v-for="item in design" :key="item.designId" :label="item.designName" :value="item.designId"></el-option>


        </el-select >
      </el-form-item>

      <el-form-item label="汽车颜色" class="post">
        <el-select  v-model="form.colorId">

          <el-option v-for="item in color" :key="item.colorId" :label="item.colorName" :value="item.colorId"></el-option>

        </el-select >
      </el-form-item>


      <el-form-item label="出厂时间" class="post">
        <el-date-picker  v-model="form.recordLeaveTime"></el-date-picker >
      </el-form-item>

      <el-form-item label="变速器" class="post">
        <el-input  v-model="form.recordVariator"></el-input >
      </el-form-item>

      <el-form-item label="排量" class="post">
        <el-input  v-model="form.recordDisplacement"></el-input >
      </el-form-item>

      <el-form-item label="行驶里程" class="post">
        <el-input  v-model="form.recordMileage"></el-input >
      </el-form-item>

      <el-form-item label="初登时间" class="post">
        <el-date-picker  v-model="form.recordBegain"></el-date-picker >
      </el-form-item>

      <el-form-item label="车主姓名" class="post">
        <el-input  v-model="form.recordName"></el-input >
      </el-form-item>

      <el-form-item label="联系人" class="post">
        <el-input  v-model="form.contactName"></el-input >
      </el-form-item>

      <el-form-item label="手机号码" class="post">
        <el-input  v-model="form.contactPhone"></el-input >
      </el-form-item>

      <el-form-item label="邮箱" class="post">
        <el-input  v-model="form.contactEmail"></el-input >
      </el-form-item>

      <el-form-item label="预售价格" class="post">
        <el-input  v-model="form.recordPrice"></el-input >
      </el-form-item>

      <el-form-item label="咨询时间" class="post">
        <el-date-picker  v-model="form.recordTime"></el-date-picker >
      </el-form-item>

      <el-form-item label="备注" class="post">
        <el-input  v-model="form.recordNote"></el-input >
      </el-form-item>

      <el-form-item class="post">
        <el-button type="primary" @click="addClRecord(),clearFrom(),goBack()">确定</el-button>
        <el-button @click="clearFrom(),goBack()">取消</el-button>
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
        recordId:'',
        factoryId:"",
        brandId:'',
        designId:'',
        colorId:'',
        recordLeaveTime:'',
        recordVariator:'',
        recordDisplacement:"",
        recordMileage:'',
        recordBegain:'',
        recordName:'',
        contactName:'',
        contactPhone:"",
        contactEmail:'',
        recordPrice:0,
        recordTime:'',
        recordWay:'',
        recordNote:'',
        ggBrand:{
          brandId:'',
          brandName:''
        },
        ggDesign:{
          designId: '',
          designName:'',
          brandId:'',
        },
        ggColor:{
          colorId:'',
          colorName:'',
        }
      },
      //数据验证
      rules: [],

      //汽车品牌
      brand:[],
      //汽车款式
      design:[],
      //汽车颜色
      color:[],
    }
  },
  methods:{
    goBack(){
      this.$router.push({
        path: '/Record'
      })
    },
    addClRecord(){
      this.axios.post("http://localhost:8088/add-clRecord",this.form)
          .then((v) => {
            this.$message("编辑成功")
          })
    },
    //颜色，品牌初始化查询
    findAll(){
      this.axios.get("http://localhost:8088/find-clGgBrand")
          .then((v) => {
            this.brand = v.data;
          })
      this.axios.get("http://localhost:8088/find-clColor")
          .then((v) => {
            this.color = v.data;
          })
    },
    //根据品牌查询款式
    findDesign(brandId){

      this.axios.get("http://localhost:8088/find-clGgDesign",{params:{
          brandId:brandId
        }
      })
          .then((v) => {
            this.design = v.data;
          })
    },
    //清空表单
    clearFrom(){
      this.form.recordId='',
          this.form.factoryId="",
          this.form.brandId='',
          this.form.designId='',
          this.form.colorId='',
          this.form.recordLeaveTime='',
          this.form.recordVariator='',
          this.form.recordDisplacement="",
          this.form.recordMileage='',
          this.form.recordBegain='',
          this.form.recordName='',
          this.form.contactName='',
          this.form.contactPhone="",
          this.form.contactEmail='',
          this.form.recordPrice=0,
          this.form.recordTime='',
          this.form.recordWay='',
          this.form.recordNote=''
    },
  },
  created() {
    this.form=JSON.parse(this.$route.query.value)

    this.findAll()
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
