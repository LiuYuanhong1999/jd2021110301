<template>
  <div class="main">
    <h3>{{ op == 1 ? "新增" : "修改" }}</h3>
    <el-form :model="form" :rules="rules" label-width="120px">
      <el-form-item label="单号"  class="post">
        <el-input v-model="form.orderId" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户名称" class="post">
        <el-select v-model="form.cusId" @change="cusIdChange">
          <el-option v-for="v in coustomers" :label="v.cusName" :value="v.acId"/>
        </el-select>
      </el-form-item>
      <el-form-item label="手机号码" class="post">
        <span>{{coustomer.cusCellphone}}</span>
      </el-form-item>
      <el-form-item label="客户地址" class="post">
          <span>{{coustomer.cusPost}}</span>
      </el-form-item>
      <el-form-item label="QQ" class="post">
        <span>{{coustomer.cusQq}}</span>
      </el-form-item>
      <el-form-item label="客户编号" class="post">
        <span>{{coustomer.cusNo}}</span>
      </el-form-item>
      <el-form-item label="客户类别" class="post">
        <span>{{coustomer.ggCoustomertype!=undefined?coustomer.ggCoustomertype.ctName:''}}</span>
      </el-form-item>
<!--      <el-form-item label="购买方式" class="post">
        <el-input type="text"></el-input>
      </el-form-item>-->
      <el-form-item label="发票类型" class="post">
        <el-select v-model="form.orderBill">
          <el-option label="普通发票" value="1"/>
          <el-option label="增值税发票" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="发票号" class="post">
        <el-input type="text"></el-input>
      </el-form-item>
      <el-form-item label="车辆编号：" class="post">
        <el-select v-model="form.storageId" @change="getCarChange">
          <el-option v-for="v in cars" :label="v.storageId" :value="v.storageId"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="厂商名称：" class="post">
        <span>{{car.ggFactory!=undefined?car.ggFactory.factoryName:''}}</span>
      </el-form-item>
      <el-form-item label="汽车品牌：" class="post">
        <span>{{car.ggBrand!=undefined?car.ggBrand.brandName:''}}</span>
      </el-form-item>
      <el-form-item label="汽车款式" class="post">
        <span>{{car.ggDesign!=undefined?car.ggDesign.designName:''}}</span>
      </el-form-item>
      <el-form-item label="颜色" class="post">
        <span>{{car.ggColor!=undefined?car.ggColor.colorName:''}}</span>
      </el-form-item>
        <el-form-item label="出厂时间" class="post">
          <span>{{car.storageLeaveTime!=undefined?formatDate(car.storageLeaveTime):''}}</span>
        </el-form-item>
        <el-form-item label="销售价格" class="post">
          <el-input type="text" v-model="form.orderPrice" readonly/>
        </el-form-item>
        <el-form-item label="交易让利" class="post">
          <el-input type="text" v-model="form.orderLet" @blur="orderLet"/>
        </el-form-item>
        <el-form-item label="成交金额" class="post">
          <el-input type="text" readonly v-model="form.orderTotal"/>
        </el-form-item>
        <el-form-item label="预售定金" class="post">
          <el-input type="text" v-model="form.orderPricing"/>
        </el-form-item>
      <el-form-item label="交车日期" class="post">
<!--        <el-input type="text" v-model="form.orderFordate"/>-->
        <el-col :span="11">
          <el-date-picker
              :disabled-date="disabledDate"
              v-model="form.orderFordate"
              type="date"
              style="width: 100%"/>
        </el-col>
      </el-form-item>
      <el-form-item label="地点" class="post">
        <el-input type="text" v-model="form.orderPost"/>
      </el-form-item>
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
        orderLet:0,//让利
        orderState:'1'//状态
      },
      //数据验证
      rules: [],
      op:1,//判断是新增还是修改
      coustomers:[],//客户
      coustomer:{},//客户信息
      cars:[],//所有能出库的车
      car:{},//显示当前
    }
  },
  methods: {
    //新增
    onSubmit(){
      var url="http://localhost:8088/order"
      if(this.op==2){
        url="http://localhost:8088/order/update"
      }
      this.axios.post(url,this.form)
          .then(v=>{
            this.cancel();
          })
    },
    loadCar(){
      this.axios.get("http://localhost:8088/order/storage",{
        params:{
          op:0
        }
      }).then(v=>{
        this.cars=v.data;
        console.log("所有汽车",this.cars);
      })
    },
    loadCoustomer(){//客户
      var search={
        cusState:"下单中"
      }
      this.axios.post("http://localhost:8088/coustomer/show",search)
          .then(v=>{
            console.log("v下单中的数据",v);
            this.coustomers=v.data;
          })
    },
    //加载参数 判断是修改还是新增
    load() {
      var op = this.$route.params.op;
      if (!op) {
        this.cancel();
      }
      console.log(op);
      if (op == 2) {
        this.form = JSON.parse(this.$route.params.entity);
        console.log(this.form);
      }
      this.op = op;
    },
    //取消
    cancel() {
      this.$router.replace("/order");
    },
    //失焦事件
    orderLet(){
      this.form.orderTotal=this.form.orderPrice-this.form.orderLet
    },
    //change 库存
    getCarChange(){
      var id=this.form.storageId;
      var storage=this.cars.find(v=>{
        return v.storageId==id;
      })
      this.car=storage;
      this.form.orderPrice=storage.storagePrcie
      console.log("输出选中的当前车",this.car);
    },
    //change时间
    cusIdChange(){
      var id=this.form.cusId;
      var coustomer=this.coustomers.find(v=>{
        return v.acId==id;
      })
      this.coustomer=coustomer;
    },
    disabledDate(time) {
      return time.getTime() <= Date.now()
    },
    formatDate: function(value) {
      var date = new Date(value);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var sec = date.getSeconds()
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + sec;
    },
  },
  mounted() {
    this.load();
    this.loadCoustomer();
    this.loadCar();

  }
}
</script>

<style scoped>
h3 {
  text-align: center;
  margin: 10px 0px;
}

.post {
  width: 40%;
  float: left;
}

.main:after {
  content: "";
  display: block;
  clear: both;
  margin-bottom: 10px;
}

.all {
  float: left;
  width: 80%
}

.el-select {
  display: inline;
}
</style>