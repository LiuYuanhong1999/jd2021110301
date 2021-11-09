<template>
  <div >
    <h3>初始入库</h3>
    <el-form :model="form"  :rules="rules"
             class="from"
             label-width="120px">
      <el-form-item label="入库编号" class="post">
        <el-input v-model="form.storageId" :disabled="true"></el-input>

      </el-form-item>

      <el-form-item label="品牌" class="post">
       <el-select v-model="form.brandId" @change="findDesign(form.brandId)">
         <el-option v-for="i in brand" :key="i.brandId" :label="i.brandName" :value="i.brandId"></el-option>


       </el-select>
      </el-form-item>

      <el-form-item label="款式" class="post">
       <el-select v-model="form.designId">
         <el-option v-for="i in design" :key="i.designId" :label="i.designName" :value="i.designId"></el-option>
       </el-select>
      </el-form-item>

      <el-form-item label="颜色" class="post">
       <el-select v-model="form.colorId" >
         <el-option v-for="i in color" :key="i.colorId" :label="i.colorName" :value="i.colorId"></el-option>
       </el-select>
      </el-form-item>

      <el-form-item label="排量" class="post">
        <el-input v-model="form.storageDisplacement"></el-input>
      </el-form-item>

      <el-form-item label="初登日期" class="post">
        <el-date-picker v-model="form.storageBegain"/>
      </el-form-item>

      <el-form-item label="出厂日期" class="post">
        <el-date-picker v-model="form.storageLeaveTime"/>
      </el-form-item>


      <el-form-item label="车牌号" class="post">
        <el-input v-model="form.storageCard"/>
      </el-form-item>


      <el-form-item label="行驶里程" class="post">
        <el-input v-model="form.storageMileage"/>
      </el-form-item>


      <el-form-item label="燃油种类" class="post">
       <el-input v-model="form.storageType"/>
      </el-form-item>

      <el-form-item label="是否四轮驱动" class="post">
        <el-input v-model="form.storageDrive"/>
      </el-form-item>
      <el-form-item label="发动机" class="post">
        <el-input v-model="form.storageEngine"/>
      </el-form-item>

      <el-form-item label="档位形式" class="post">
       <el-input v-model="form.storageTap"/>
      </el-form-item>


      <el-form-item label="过户次数" class="post">
       <el-input v-model="form.storageTransferTimes"></el-input>
      </el-form-item>

      <el-form-item label="总体评价" class="post">
       <el-input v-model="form.storageLicense"></el-input>
      </el-form-item>




      <el-form-item label="销售价格" class="post">
        <el-input v-model="form.storagePrcie"></el-input>
      </el-form-item>

      <el-form-item label="操作员" class="post">
        <el-input v-model="form.storageUser" :disabled="true"></el-input>
      </el-form-item>
      <el-form-item label="入库时间" class="post">
        <el-date-picker v-model="form.storageTime"></el-date-picker>
      </el-form-item>


      <el-form-item class="post">
        <el-button type="primary" @click="addClStorage(),clearFrom()">确定</el-button>

        <el-button @click="clearFrom(),goBack()">取消</el-button>
        <br/><br/><br/><br/>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
export default {
  data() {
    return {


      //表单
      form: {
        storageId:'',//入库编号
        brandId:'',//品牌编号
        designId:'',//款式编号
        colorId:'',//颜色编号
        storageLeaveTime:'',//出厂时间
        storageVariator:'',//变速器
        storageDisplacement:'',//排量
        storageMileage:'',//行驶里程
        storageBegain:'',//初登时间
        storageCard:"",//车牌
        storageType:"",//燃油种类
        storageDrive:'',//是否四轮驱动
        storageEngine:'',//发动机
        storageTap:'',//档位形式
        storageTransferTimes:'',//过户次数
        storageLicense:'',//行驶证
        storagePrcie:'',//销售价格
        storageUser:'',//操作员
        storageTime: this.randomNumber2(),//入库时间
      },


      //数据验证
      rules: [],


      //品牌信息
      brand:[],

      //颜色信息
      color:[],

      //款式信息
      design:[]
    }
  },
  methods:{
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
    goBack(){
      this.$router.push({
        path: '/Inventory'
      })
    },

    //增加初始入库记录同时入库
    addClStorage(){
      this.axios.post("http://localhost:8088/add-clInitial",this.form)
      this.axios.post("http://localhost:8088/add-clInventory",this.form)
          .then((v) => {
            this.$message("入库成功")
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
      this.form.recordId=''

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
    setTimeDateFmt(month) {
      return 0;
    },

    findUserName(){
      let s=JSON.parse(localStorage.getItem("loginuser"))
      var s1 = s.slice(1,-1);
      this.axios.get("http://localhost:8088/sys/find-userId",{params:{

          listNum:s1

        }})
          .then(v=>{
            this.form.storageUser=v.data.listName
          })
    },



  },
  created() {
    this.findUserName();
    this.form.storageId="KC"+this.randomNumber()
    this.findAll();

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
.from{
  display: block;
  margin-bottom: 20px;
}
</style>
