<template>
  <div >
    <h3>增加入库记录</h3>
    <el-form :model="form"  :rules="rules"
             class="from"
             label-width="120px">
      <el-form-item label="入库编号" class="post">
        <el-input v-model="form.storageId" :disabled="true"></el-input>

      </el-form-item>
      <el-form-item label="回访单" class="post">
        <el-select v-model="form.vistId" @change="initDate2(form.vistId)">
          <el-option v-for="item in tableDate" :key="item.vistId" :label="item.vistId" :value="item.vistId"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="品牌" class="post">
        {{assessData[0].clAssess.ggBrand.brandName}}
      </el-form-item>

      <el-form-item label="款式" class="post">
        {{assessData[0].clAssess.ggDesign.designName}}
      </el-form-item>

      <el-form-item label="颜色" class="post">
        {{assessData[0].clAssess.ggColor.colorName}}
      </el-form-item>

      <el-form-item label="排量" class="post">
        {{assessData[0].clAssess.assessDisplacement}}
      </el-form-item>

      <el-form-item label="预售价格:" class="post">
        {{assessData[0].clAssess.clOrders.clRecord.recordPrice}}
      </el-form-item>
      <el-form-item label="初登日期" class="post">
        {{assessData[0].clAssess.assessBegain}}
      </el-form-item>

      <el-form-item label="车牌号" class="post">
        {{assessData[0].clAssess.assessCard}}
      </el-form-item>


      <el-form-item label="行驶里程" class="post">
        {{assessData[0].clAssess.assessMileage}}
      </el-form-item>

      <el-form-item label="联系人" class="post">
        {{assessData[0].clAssess.clOrders.clRecord.contactName}}
      </el-form-item>

      <el-form-item label="手机号码" class="post">
        {{assessData[0].clAssess.clOrders.clRecord.contactPhone}}
      </el-form-item>

      <el-form-item label="邮箱" class="post">
        {{assessData[0].clAssess.clOrders.clRecord.contactEmail}}
      </el-form-item>

      <el-form-item label="燃油种类" class="post">
        {{assessData[0].clAssess.assessType}}
      </el-form-item>

      <el-form-item label="是否四轮驱动" class="post">
        {{assessData[0].clAssess.assessDrive}}
      </el-form-item>
      <el-form-item label="发动机" class="post">
        {{assessData[0].clAssess.assessEngine}}
      </el-form-item>

      <el-form-item label="档位形式" class="post">
        {{assessData[0].clAssess.assessTap}}
      </el-form-item>


      <el-form-item label="过户次数" class="post">
        {{assessData[0].clAssess.assessTransferTimes}}
      </el-form-item>

      <el-form-item label="总体评价" class="post">
        {{assessData[0].clAssess.assessAppraise}}
      </el-form-item>

      <el-form-item label="新车市场价" class="post">
        {{assessData[0].clAssess.assessNewcarPrice}}
      </el-form-item>

      <el-form-item label="评估人报价" class="post">
        {{assessData[0].clAssess.assessOffice}}
      </el-form-item>



      <el-form-item label="定价中心" class="post">
        {{assessData[0].clAssess.assessPrice}}
      </el-form-item>


      <el-form-item label="主评人" class="post">
        {{assessData[0].clAssess.assessUser}}
      </el-form-item>

<!--      <el-form-item label="副评人" class="post">-->
<!--        {{assessData[0].clAssess.assessReview}}-->
<!--      </el-form-item>-->


      <el-form-item label="最终定价" class="post">
       {{assessData[0].vistPrice}}
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

      //回访签约成功信息
      tableDate:[],

      //表单
      form: {
       storageId:'',
        storagePrcie:'',
        storageUser:'',
        storageTime:this.randomNumber2(),
        clReturnVist:{
          vistId:"",
          assessId:'',
          vistState:'',
          vistPrice:'',
          vistTime:"",
          vistNote:"",
          acId:'',
          clAssess: {
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
        }
      },


      //数据验证
      rules: [],

      //归档类型
      clOrdersType:[],

      //评估信息
      assessData:[

        {
          vistId:"",
          assessId:'',
          vistState:'',
          vistPrice:'',
          vistTime:"",
          vistNote:"",
          acId:'',
          clAssess: {
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
        path: '/Storage'
      })
    },

    //增加入库记录同时入库
    addClStorage(){
      this.axios.post("http://localhost:8088/add-inventory",this.form)
      this.axios.post("http://localhost:8088/add-clStorage",this.form)
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

    //初始化查询所有回访签约成功信息信息
    initDate(){
      this.axios.get("http://localhost:8088/findBy-ClStorage")
          .then((v) => {
            this.tableDate = v.data;
          })
    },

    //根据评估号查询具体信息
    initDate2(vistId){
      this.axios.get("http://localhost:8088/findBy-ClStorageRecord",{params:{
          vistId:vistId
        }})
          .then((v) => {
            this.assessData = v.data;
            this.form.clReturnVist=this.assessData[0];
          })
    },
    //初始化查询归档类型
    selectClOrdersType(){

      this.axios.get("http://localhost:8088/find-clOrdersType")
          .then((v) => {
            this.clOrdersType = v.data;
          })
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
