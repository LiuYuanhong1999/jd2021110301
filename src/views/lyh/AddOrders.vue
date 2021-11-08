<template>
  <div >
    <h3>客户预约</h3>
    <el-form :model="form"  :rules="rules"
             class="from"
             label-width="120px">
      <el-form-item label="收购编号" class="post">
        <el-input v-model="form.ordersId"></el-input>
      </el-form-item>

        <el-form-item label="联系人" class="post">
          <el-select v-model="form.recordId" @change="findBYRecordId(form.recordId)">
            <el-option v-for="item in tableDate" :key="item.recordId" :label="item.contactName" :value="item.recordId"></el-option>
          </el-select>
        </el-form-item>

      <el-form-item label="手机号码" class="post">
       {{tableDate2[0].contactPhone}}
      </el-form-item>

      <el-form-item label="邮箱" class="post">
        {{tableDate2[0].contactEmail}}
      </el-form-item>


      <el-form-item label="汽车品牌:" class="post">
        {{tableDate2[0].ggBrand.brandName}}
      </el-form-item>
      <el-form-item label="汽车款式" class="post">
        {{tableDate2[0].ggDesign.designName}}
      </el-form-item>

      <el-form-item label="汽车颜色" class="post">
       {{tableDate2[0].ggColor.colorName}}
      </el-form-item>


      <el-form-item label="出厂时间" class="post">
      {{tableDate2[0].recordLeaveTime}}
      </el-form-item>

      <el-form-item label="变速器" class="post">
      {{tableDate2[0].recordVariator}}
      </el-form-item>

      <el-form-item label="排量" class="post">
        {{tableDate2[0].recordDisplacement}}
      </el-form-item>

      <el-form-item label="行驶里程" class="post">
        {{tableDate2[0].recordMileage}}
      </el-form-item>

      <el-form-item label="初登时间" class="post">
       {{tableDate2[0].recordBegain}}
      </el-form-item>

      <el-form-item label="车主姓名" class="post">
        {{tableDate2[0].recordName}}
      </el-form-item>


      <el-form-item label="预售价格" class="post">
      {{tableDate2[0].recordPrice}}
      </el-form-item>

      <el-form-item label="咨询时间" class="post">
        {{tableDate2[0].recordTime}}
      </el-form-item>

      <el-form-item label="咨询方式" class="post">
        {{tableDate2[0].recordWay}}
      </el-form-item>

      <el-form-item label="备注" class="post">
        {{tableDate2[0].recordNote}}
      </el-form-item>


      <el-form-item label="预约日期" class="post">
        <el-date-picker v-model="form.ordersTime"></el-date-picker>
      </el-form-item>


      <el-form-item label="接待人" class="post">
       <el-input v-model="form.ordersUser"></el-input>
      </el-form-item>

    提示:如果预约成功，请将状态改为"评估",并填写‘评估时间’和‘评估方式’，如果预约失败，请将状态改为失败
      <el-form-item label="预约" class="post">
        <el-select v-model="form.ordersState">
          <el-option v-for="item in ordersStates" :key="item.id" :label="item.name" :value="item.id"></el-option>



        </el-select>
      </el-form-item>

      <el-form-item label="分类归档" class="post">
        <el-select v-model="form.acId">
          <el-option v-for="item in clOrdersType" :key="item.acId" :label="item.acCause" :value="item.acId"></el-option>

        </el-select>
      </el-form-item>

      <el-form-item label="沟通内容" class="post">
        <el-input v-model="form.ordersNote"></el-input>
      </el-form-item>

      <el-form-item label="预约状态" class="post">
        <el-select v-model="form.ordersType">
          <el-option v-for="item in ordersTypes" :key="item.id" :label="item.name" :value="item.name"></el-option>


        </el-select>
      </el-form-item>

      <el-form-item label="评估方式" class="post">
        <el-select v-model="form.ordersMethdo">
          <el-option v-for="item in ordersMethdos" :key="item.id" :label="item.name" :value="item.id"></el-option>


        </el-select>
      </el-form-item>




      <el-form-item class="post">
        <el-button type="primary" @click="addClOrders(),clearFrom()">确定</el-button>

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
      //表单绑定的实体类
      tableDate:[],

      //登记信息
      tableDate2:[
        {
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
      ],


      form: {
        ordersId:'',//收购编号
        recordId:'',//登记编号
        ordersTime:'',//预约日期
        ordersUser:'张三',//接待人
        ordersState:'',//预约状态
        acId:'',//归档编号
        ordersNote:'',//沟通内容
        ordersType:'',//沟通类型
        ordersMethdo:''//评估方式
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

      //预约
      ordersStates:[
        {
          id:0,
          name: '预约'
        },


        {
          id:1,
          name:'评估'
        },
        {
          id:2,
          name: '失败'
        }
      ],

      //预约状态
      ordersTypes:[
        {
          id:'预约成功',
          name:'预约成功'
        },{
          id:'预约等待',
          name: '预约等待',
        },{
          id:'分类归档',
          name: '分类归档'
        }

      ],

      //评估方式
      ordersMethdos:[
          {
        id:'上门评估',
        name:'上门评估'
      },{
        id:'来店评估',
        name: '来店评估',
      }]
    }
  },
  methods:{

    findBYRecordId(recordId){
      this.axios.get("http://localhost:8088/find-clRecordId",{params:{
        recordId:recordId

        }})
          .then((v) => {
            this.tableDate2 = v.data;
          })
    },

    goBack(){
      this.$router.push({
        path: '/Orders'
      })
    },


    addClOrders(){
      this.axios.post("http://localhost:8088/add-clOrders",this.form)
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

    //初始化查询所有已登记用户信息
    initDate(){
      this.axios.get("http://localhost:8088/find-clRecord")
          .then((v) => {
            this.tableDate = v.data;
          })
    },

    //初始化查询归档类型
    selectClOrdersType(){

      this.axios.get("http://localhost:8088/find-clOrdersType")
          .then((v) => {
            this.clOrdersType = v.data;
          })


    },

  },
  created() {
    this.selectClOrdersType();
    this.initDate();
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
.from{
  display: block;
  margin-bottom: 20px;
}
</style>
