<template>
  <div class="main">
    <h3>{{ op == 1 ? "新增" : "修改" }}</h3>
    <el-form :model="form" :rules="rules" label-width="120px">
      <el-form-item label="单号" class="post">
        <el-input v-model="form.orderId" readonly></el-input>
      </el-form-item>
      <el-form-item label="客户名称" class="post">
        <span>{{ form.sellCoustomer != null ? form.sellCoustomer.cusName : '' }}</span>
      </el-form-item>
      <el-form-item label="手机号码" class="post">
        <span>{{ form.sellCoustomer != null ? form.sellCoustomer.cusCellphone : '' }}</span>
      </el-form-item>
      <el-form-item label="客户地址" class="post">
        <span>{{ form.sellCoustomer != null ? form.sellCoustomer.cusPost : '' }}</span>
      </el-form-item>
      <el-form-item label="QQ" class="post">
        <span>{{ form.sellCoustomer != null ? form.sellCoustomer.cusQq : '' }}</span>
      </el-form-item>
      <el-form-item label="客户编号" class="post">
        <span>{{ form.sellCoustomer != null ? form.sellCoustomer.cusNo : '' }}</span>
      </el-form-item>
      <el-form-item label="客户类别" class="post">
        <span>{{ form.sellCoustomer != null ? form.sellCoustomer.ggCoustomertype.ctName : '' }}</span>
      </el-form-item>
      <el-form-item label="发票类型" class="post">
        {{ ordeBills(form.orderBill) }}
      </el-form-item>
      <el-form-item label="发票号" class="post">
        {{ form.orderBillno }}
      </el-form-item>
      <el-form-item label="车辆编号：" class="post">
        {{ form.clInventory != null ? form.clInventory.storageId : '' }}
      </el-form-item>
      <el-form-item label="厂商名称：" class="post">
        <span>{{ form.clInventory != null && form.clInventory.ggFactory!=null ? form.clInventory.ggFactory.factoryName : '' }}</span>
      </el-form-item>
      <el-form-item label="汽车品牌：" class="post">
        <span>{{ form.clInventory != null  && form.clInventory.ggBrand!=null? form.clInventory.ggBrand.brandName : '' }}</span>
      </el-form-item>
      <el-form-item label="汽车款式" class="post">
        <span>{{ form.clInventory != null  && form.clInventory.ggDesign!=null? form.clInventory.ggDesign.designName : '' }}</span>
      </el-form-item>
      <el-form-item label="颜色" class="post">
        <span>{{ form.clInventory != null && form.clInventory.ggColor!=null ? form.clInventory.ggColor.colorName : '' }}</span>
      </el-form-item>
      <el-form-item label="出厂时间" class="post">
        <span>{{ form.clInventory != null ? form.clInventory.storageLeaveTime : '' }}</span>
      </el-form-item>
      <el-form-item label="销售价格" class="post">
        {{ form.orderPrice }}
      </el-form-item>
      <el-form-item label="交易让利" class="post">
        {{ form.orderLet }}
      </el-form-item>
      <el-form-item label="成交金额" class="post">
        {{ form.orderTotal }}
      </el-form-item>
      <el-form-item label="预售定金" class="post">
        {{ form.orderPricing }}
      </el-form-item>
      <el-form-item label="交车日期" class="post">
        {{ formatDate(form.orderFordate) }}
      </el-form-item>
      <el-form-item label="地点" class="post">
        {{ form.orderPost }}
      </el-form-item>
      <el-form-item label="车辆手续" class="post">
        <el-checkbox v-model="form.order_procedure"></el-checkbox>
      </el-form-item>
      <el-form-item label="后付金额" class="post">
        <el-input v-model="form.orderPaylater" @blur="orderPalylater"/>
      </el-form-item>
      <el-form-item label="欠款金额" class="post">
        <el-input v-model="form.orderDebt" readonly/>
      </el-form-item>

        <el-form-item label=交车人 class="post">
          <el-input v-model="form.orderForcar" readonly/>
        </el-form-item>
        <el-form-item label="领车人" class="post">
          <el-input v-model="form.orderGetcar"/>
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
        orderLet: 0,//让利
        orderState: '1'//状态
      },
      //数据验证
      rules: [],
      op: 1,//判断是新增还是修改
    }
  },
  methods: {
    //新增
    onSubmit() {
      let s=JSON.parse(localStorage.getItem("loginuser"))
      var s1 = s.slice(1,-1);
      console.log("当前登入人",s1);
      this.form.listNum=s1;
      var url = "http://localhost:8088/order"
      if (this.op == 2) {
        url = "http://localhost:8088/order/update"
      }
      this.form.orderState=2;
      this.form.order_buytype=1;//分期购买
      if(this.form.orderDebt==0){
        this.form.orderState=3
        this.form.orderBuytype=0;//全款购买
      }
      this.axios.post(url, this.form)
          .then(v => {
            this.cancel();
          })
    },
    //加载参数 判断是修改还是新增
    load() {
      var op = this.$route.params.op;
      if (!op) {
        this.cancel();
        return;
      }
      this.op=op;
      this.form = JSON.parse(this.$route.params.entity);
      let s=JSON.parse(localStorage.getItem("loginuser"))

      var s1 = s.slice(1,-1);
      this.axios.get("http://localhost:8088/sys/find-userId",{params:{
          listNum:s1

        }})
          .then(v=>{
            this.form.orderForcar=v.data.listName
          })
    },
    //取消
    cancel() {
      this.$router.replace("/settlement");
    },
    //根据后付款金额判断欠多少钱
    orderPalylater(){
      this.form.orderDebt=this.form.orderTotal-this.form.orderPaylater-this.form.orderPricing;
    },
    //发票类型
    ordeBills(state,) {
      if (state == 1) return "普通发票"
      if (state == 2) return "增值税发票"
    },
    formatDate: function (value) {
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
