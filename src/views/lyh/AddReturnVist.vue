<template>
  <div >
    <h3>客户回访</h3>
    <el-form :model="form"  :rules="rules"
             class="from"
             label-width="120px">
      <el-form-item label="回访编号" class="post">
        <el-input v-model="form.vistId"></el-input>

      </el-form-item>

      <el-form-item label="车主" class="post">
        <el-select v-model="form.assessId" @change="initDate2(form.assessId)">
          <el-option v-for="item in tableDate" :key="item.assessId" :label="item.clOrders.clRecord.recordName" :value="item.assessId"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="品牌" class="post">
        {{assessData[0].ggBrand.brandName}}
      </el-form-item>

      <el-form-item label="款式" class="post">
        {{assessData[0].ggDesign.designName}}
      </el-form-item>

      <el-form-item label="颜色" class="post">
        {{assessData[0].ggColor.colorName}}
      </el-form-item>

      <el-form-item label="排量" class="post">
        {{assessData[0].assessDisplacement}}
      </el-form-item>

      <el-form-item label="预售价格:" class="post">
       {{assessData[0].clOrders.clRecord.recordPrice}}
      </el-form-item>
      <el-form-item label="初登日期" class="post">
        {{assessData[0].assessBegain}}
      </el-form-item>

      <el-form-item label="车牌号" class="post">
       {{assessData[0].assessCard}}
      </el-form-item>


      <el-form-item label="行驶里程" class="post">
      {{assessData[0].assessMileage}}
      </el-form-item>

      <el-form-item label="联系人" class="post">
       {{assessData[0].clOrders.clRecord.contactName}}
      </el-form-item>

      <el-form-item label="手机号码" class="post">
        {{assessData[0].clOrders.clRecord.contactPhone}}
      </el-form-item>

      <el-form-item label="邮箱" class="post">
       {{assessData[0].clOrders.clRecord.contactEmail}}
      </el-form-item>

      <el-form-item label="燃油种类" class="post">
       {{assessData[0].assessType}}
      </el-form-item>

      <el-form-item label="是否四轮驱动" class="post">
        {{assessData[0].assessDrive}}
      </el-form-item>
      <el-form-item label="发动机" class="post">
       {{assessData[0].assessEngine}}
      </el-form-item>

      <el-form-item label="档位形式" class="post">
      {{assessData[0].assessTap}}
      </el-form-item>


      <el-form-item label="过户次数" class="post">
       {{assessData[0].assessTransferTimes}}
      </el-form-item>

      <el-form-item label="总体评价" class="post">
      {{assessData[0].assessAppraise}}
      </el-form-item>

      <el-form-item label="新车市场价" class="post">
       {{assessData[0].assessNewcarPrice}}
      </el-form-item>

      <el-form-item label="评估人报价" class="post">
        {{assessData[0].assessOffice}}
      </el-form-item>



      <el-form-item label="定价中心" class="post">
        {{assessData[0].assessPrice}}
      </el-form-item>


      <el-form-item label="主评人" class="post">
       {{assessData[0].assessUser}}
      </el-form-item>

      <el-form-item label="副评人" class="post">
        {{assessData[0].assessReview}}
      </el-form-item>


      <el-form-item label="最终定价" class="post">
        <el-input v-model="form.vistPrice"></el-input>
      </el-form-item>

      <el-form-item label="评估状态" class="post">
        <el-select v-model="form.vistState">
          <el-option v-for="item in vistStates" :key="item.id" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="回访时间" class="post">
        <el-date-picker v-model="form.vistTime"></el-date-picker>
      </el-form-item>

      <el-form-item label="归档类型" class="post">
        <el-select v-model="form.acId">
          <el-option v-for="item in clOrdersType" :key="item.acId" :label="item.acCause" :value="item.acId"></el-option>
        </el-select>
      </el-form-item>


      <el-form-item class="post">
        <el-button type="primary" @click="addClReturnVist(),clearFrom()">确定</el-button>

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

      //回访初始信息
      tableDate:[],

      //表单
      form: {
          vistId:'',//回访编号
          assessId:'',//评估编号
          vistState:'',//评估状态
          vistPrice:'',//最终成交价格
          vistTime:'',//回访时间
          vistNote:'',//备注
      },


      //数据验证
      rules: [],

      //归档类型
      clOrdersType:[],

      //评估信息
      assessData:[

        {
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
          clOrders:{
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
            }




          },

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

      //
      vistStates:[
        {
          id:0,
          name:'等待签约'
        },{
        id:1,
          name: '签约成功',
        },
        {
          id:2,
          name: '签约失败'
        },
      ]

    }
  },
  methods:{

    goBack(){
      this.$router.push({
        path: '/ReturnVist'
      })
    },

    //增加评估记录
    addClReturnVist(){
      this.axios.post("http://localhost:8088/add-clReturnVist",this.form)
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

    //初始化查询所有评估信息
    initDate(){

      this.axios.get("http://localhost:8088/find-clAssess")
          .then((v) => {
            this.tableDate = v.data;
          })
    },

  //根据评估号查询具体信息
    initDate2(assessId){
      this.axios.get("http://localhost:8088/findBy-clAssessId",{params:{
        assessId:assessId
        }})
          .then((v) => {
            this.assessData = v.data;
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
    this.findAll();
    this.initDate();
      this.selectClOrdersType();
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
