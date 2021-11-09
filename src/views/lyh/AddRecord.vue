<template>
  <div>
    <h3>收车登记</h3>
    <el-form :model="form" :rules="rules"
             label-width="120px">
      <el-form-item label="登记编号" class="post">
        <el-input v-model="form.recordId" :disabled="true"></el-input>
      </el-form-item>
<!--      <el-form-item label="厂商名称" class="post">-->
<!--        <el-select v-model="form.factoryId"></el-select>-->
<!--      </el-form-item>-->
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
        <el-select  v-model="form.recordVariator">
        <el-option v-for="i in recordVariators" :key="i.id" :label="i.name" :value="i.id"></el-option>


        </el-select >
      </el-form-item>

      <el-form-item label="排量/升" class="post">
        <el-input  v-model="form.recordDisplacement"></el-input >
      </el-form-item>

      <el-form-item label="行驶里程/公里" class="post">
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

      <el-form-item label="咨询方式" class="post">
        <el-input  v-model="form.recordWay"></el-input >
      </el-form-item>

      <el-form-item class="post">
        <el-button type="primary" @click="addClRecord(),clearFrom()">确定</el-button>
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
        recordTime:this.randomNumber2(),
        recordWay:'',
        recordNote:''
      },
      //数据验证
      rules: [],

      //汽车品牌
      brand:[],
      //汽车款式
      design:[],
      //汽车颜色
      color:[],

      //变速器
      recordVariators:[

        {
          id:'连续手自一体',
          name:'连续手自一体',
        },
        {
          id:'手动',

          name: '手动'
        },
        {
          id:'自动',

          name: '自动'
        }, {
          id:'手自一体式',

          name: '手自一体式'
        }

      ],

    }
  },
  methods:{
    goBack(){
      this.$router.push({
        path: '/Record'
      })
    },
    addClRecord(){
      this.axios.post("http://localhost:8088/add-clRecords",this.form)
          .then((v) => {
           this.$message("登记成功")
            this.goBack();
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

    // 获取当前日期的方法
    randomNumber() {
      const now = new Date()
      let month = now.getMonth() + 1
      let day = now.getDate()
      let hour = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()
      month = this.setTimeDateFmt(month)
      hour = this.setTimeDateFmt(hour)
      minutes = this.setTimeDateFmt(minutes)
      seconds = this.setTimeDateFmt(seconds)
      return now.getFullYear().toString() + month.toString() + day + hour + minutes + seconds + (Math.round(Math.random() * 23 + 100)).toString()
    },

    // 获取当前日期的方法
    randomNumber2() {
      const now = new Date()
      let month = now.getMonth() + 1
      let day = now.getDate()
      let hour = now.getHours()
      let minutes = now.getMinutes()
      let seconds = now.getSeconds()
      month = this.setTimeDateFmt(month)
      hour = this.setTimeDateFmt(hour)
      minutes = this.setTimeDateFmt(minutes)
      seconds = this.setTimeDateFmt(seconds)
      return now
    },


    setTimeDateFmt(month) {
      return 0;
    },

  },
  created() {
    this.form.recordId="SC"+this.randomNumber()
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
