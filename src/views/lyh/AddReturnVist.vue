<template>
  <div >
    <h3>车辆评估</h3>
    <el-form :model="form"  :rules="rules"
             class="from"
             label-width="120px">
      <el-form-item label="评估编号" class="post">
        <el-input v-model="form.assessId"></el-input>

      </el-form-item>

      <el-form-item label="联系人" class="post">
        <el-select v-model="form.ordersId" @change="initDate(form.ordersId)">
          <el-option v-for="item in tableDate" :key="item.ordersId" :label="item.clRecord.contactName" :value="item.clRecord.ordersId"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="手机号码" class="post">
        {{tableDate[0].clRecord.contactPhone}}
      </el-form-item>

      <el-form-item label="邮箱" class="post">
        {{tableDate[0].clRecord.contactEmail}}
      </el-form-item>

      <el-form-item label="车主姓名" class="post">
        {{tableDate[0].clRecord.recordName}}
      </el-form-item>



      <el-form-item label="汽车品牌:" class="post">
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
        <el-date-picker v-model="form.assessLeaveTime"></el-date-picker>
      </el-form-item>

      <el-form-item label="变速器" class="post">
        <el-input v-model="form.assessVariator"></el-input>
      </el-form-item>

      <el-form-item label="排量" class="post">
        <el-input v-model="form.assessDisplacement"></el-input>
      </el-form-item>

      <el-form-item label="行驶里程" class="post">
        <el-input v-model="form.assessMileage"></el-input>
      </el-form-item>

      <el-form-item label="初登时间" class="post">
        <el-date-picker v-model="form.assessBegain"></el-date-picker>
      </el-form-item>

      <el-form-item label="车牌号" class="post">
        <el-input v-model="form.assessCard"></el-input>
      </el-form-item>
      <el-form-item label="燃油种类" class="post">
        <el-input v-model="form.assessType"></el-input>
      </el-form-item>

      <el-form-item label="是否四轮驱动" class="post">
        <el-input v-model="form.assessDrive"></el-input>
      </el-form-item>


      <el-form-item label="发动机" class="post">
        <el-input v-model="form.assessEngine"></el-input>
      </el-form-item>

      <el-form-item label="档位形式" class="post">
        <el-input v-model="form.assessTap"></el-input>
      </el-form-item>

      <el-form-item label="过户次数" class="post">
        <el-input v-model="form.assessTransferTimes"></el-input>
      </el-form-item>

      <el-form-item label="行驶证" class="post">
        <el-input v-model="form.assessLicense"></el-input>
      </el-form-item>

      <el-form-item label="总体评价" class="post">
        <el-input v-model="form.assessAppraise"></el-input>
      </el-form-item>

      <el-form-item label="新车市场价" class="post">
        <el-input v-model="form.assessNewcarPrice"></el-input>
      </el-form-item>

      <el-form-item label="评估人报价" class="post">
        <el-input v-model="form.assessOffice"></el-input>
      </el-form-item>

      <el-form-item label="定价中心" class="post">
        <el-input v-model="form.assessPrice"></el-input>
      </el-form-item>

      <el-form-item label="最终定价" class="post">
        <el-input v-model="form.assessFinalPrice"></el-input>
      </el-form-item>

      <el-form-item label="预售价格" class="post">
        {{tableDate[0].clRecord.recordPrice}}
      </el-form-item>

      <el-form-item label="评估人" class="post">
        <el-input v-model="form.assessUser"></el-input>
      </el-form-item>


      <el-form-item label="复评人" class="post">
        <el-input v-model="form.assessReview"></el-input>
      </el-form-item>




      <el-form-item label="咨询时间" class="post">
        {{tableDate[0].clRecord.recordTime}}
      </el-form-item>

      <el-form-item label="咨询方式" class="post">
        {{tableDate[0].clRecord.recordWay}}
      </el-form-item>

      <el-form-item label="预约日期" class="post">
        {{tableDate[0].ordersTime}}
      </el-form-item>


      <el-form-item label="接待人" class="post">
        {{tableDate[0].ordersUser}}
      </el-form-item>


      <el-form-item label="评估方式" class="post">
        {{tableDate[0].ordersMethdo}}
      </el-form-item>







      <el-form-item class="post">
        <el-button type="primary" @click="addClAssess(),clearFrom()">确定</el-button>

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

      //登记信息
      tableDate:[
        {
          ordersId:'',
          recordId:'',
          ordersTime:'',
          ordersUser:'',
          ordersState:'',
          acId:'',
          ordersNote:'',
          ordersType:'',
          ordersMethdo:'',

          clRecord: {
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
          }

        }

      ],


      form: {
        assessId:'',//评估编号
        ordersId: '',//预约编号
        assessCard:'',//车牌号
        assessType:'',//燃油种类
        assessDrive:'',//是否四轮驱动
        assessEngine:'',//发动机
        assessTap:'',//档位形式
        assessTransferTimes:'',//过户次数
        assessLicense:'',//行驶证,
        assessAppraise:'',//总体评价
        assessNewcarPrice:'',//新车市场价
        assessOffice:"",//评估人报价
        assessUser:'',//评估人
        assessPrice:'',//定价中心
        assessFinalPrice:'',//最终定价
        assessReview:"",//复核人员
        assessNote:'',//备注
        factoryId:"",//厂商编号
        brandId:'',//品牌编号
        designId:'',//款式编号
        colorId:'',//颜色编号
        assessVariator:'',//变速器
        assessDisplacement:'',//排量
        assessMileage:'',//行驶里程
        assessBegain:"",//初登时间
        assessLeaveTime:'',//出厂时间
      },


      //数据验证
      rules: [],

      //汽车品牌
      brand:[],
      //汽车款式
      design:[],
      //汽车颜色
      color:[],

      //归档类型
      clOrdersType:[],






    }
  },
  methods:{

    goBack(){
      this.$router.push({
        path: '/Assess'
      })
    },

    //增加评估记录
    addClAssess(){
      this.axios.post("http://localhost:8088/add-clAssess",this.form)
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
      this.form.recordId=''

    },

    //初始化查询所有已预约用户信息
    //如果选择联系人那么就会查询该条预约信息
    initDate(ordersId){

      this.axios.get("http://localhost:8088/find-clOrdersState",{
        params:{
          ordersId:ordersId
        }
      })
          .then((v) => {
            this.tableDate = v.data;
          })
    },



  },
  created() {
    this.findAll();
    this.initDate();

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
