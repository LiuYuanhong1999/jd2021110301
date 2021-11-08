<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="add" size="mini">新增</el-button>
      <el-button type="primary" @click="load" size="mini">刷新</el-button>
    </div>
    <el-container>
      <el-header height="40px">
        <el-form size="mini" :model="search" inline>
          <el-form-item label="单号：">
            <el-input v-model="search.orderId"></el-input>
          </el-form-item>
          <el-form-item label="客户名称：">
            <el-input v-model="search.coustomerName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini" @click="load">确定</el-button>
            <!--          <el-form-item size="mini">高级</el-form-item>-->
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table :data="tableData.slice((pageno-1)*pageSize,pageno*pageSize)" style="width: 100%">
          <el-table-column type="selection" width="55"/>
          <el-table-column label="操作" width="200px">
            <template #default="scope">
              <el-button type="text" size="mini">删除</el-button>
              <el-button type="text" size="mini" @click="settlement(scope.row)">交割</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="orderId" label="单号" width="130"/>
          <el-table-column prop="orderTime" :formatter="time" label="销售日期" width="140"/>
          <el-table-column prop="sellCoustomer.cusName" label="客户名称" width="120"/>
          <el-table-column prop="sellCoustomer.cusCellphone" label="电话号码" width="120"/>
          <el-table-column prop="sellCoustomer.cusPost" label="客户地址" width="120"/>
          <el-table-column prop="sellCoustomer.cusQq" label="QQ" width="120"/>
          <el-table-column prop="sellCoustomer.cusNo" label="客户编号" width="120"/>
          <el-table-column prop="sellCoustomer.ggCoustomertype.ctName" label="客户类别" width="120"/>
          <el-table-column prop="orderBill" label="发票类型" :formatter="ordeBill" width="120"/>
          <el-table-column prop="orderBuytype" label="购买方式" :formatter="orderBuytype" width="120"/>
          <el-table-column prop="orderBillno" label="发票号" width="120"/>
          <el-table-column prop="clInventory.ggFactory.factoryName" label="厂商名称" width="120"/>
          <el-table-column prop="clInventory.ggBrand.brandName." label="汽车品牌" width="120"/>
          <el-table-column prop="clInventory.ggDesign.designName" label="汽车款式" width="120"/>
          <el-table-column prop="clInventory.ggColor.colorName" label="颜色" width="120"/>
          <el-table-column prop="clInventory.storageCard" label="车牌号码" width="120"/>
          <el-table-column prop="orderPrice" label="销售价格" width="120"/>
          <el-table-column prop="orderLet" label="交易让利" width="120"/>
          <el-table-column prop="orderTotal" label="成交金额" width="120"/>
          <el-table-column prop="orderPricing" label="预售定金" width="120"/>
          <el-table-column prop="orderFordate" label="交车日期" :formatter="time" width="180"/>
          <el-table-column prop="orderPost" label="交车地点" width="180"/>
          <el-table-column prop="orderForcar" label="交车人" width="120"/>
          <el-table-column prop="orderGetcar" label="领车人" width="120"/>
          <el-table-column prop="orderState" :formatter="orderState" label="状态" width="120"/>
        </el-table>
        <el-pagination background  hide-on-single-page @current-change="handChange" layout="prev, pager, next" :page-size="pageSize" :total="tableData.length">
        </el-pagination>
      </el-main>
    </el-container>
    <el-dialog v-model="dialogVisible" title="详情">
      <el-descriptions
          class="margin-top"
          :column="2"
          :size="mini"
          border >
        <el-descriptions-item label="姓名：">
          张三
        </el-descriptions-item>
        <el-descriptions-item label="金额">
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="年龄">
          Suzhou
        </el-descriptions-item>
        <el-descriptions-item label="就读学校">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="家庭住址">
          株洲市茶陵县MM村MM组EE户
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //表格数据
      tableData: [],
      dialogVisible:false,//详情弹出
      grid:{//详情实体类

      },
      search:{},//搜索框
      pageSize:2,
      pageno:1,
    }
  },
  methods:{
    settlement(val){
      this.$router.push({
        name:'settlementadd',
        params:{
          op:2,
          entity:JSON.stringify(val)
        }
      })
    },
    //新增转跳页面 进行新增
    add(){
      this.$router.push({
        name:'orderAdd',
        params:{
          op:1,//判断是新增还是修改 1代表新增 2代表修改
        }
      })
    },
    load(){//加载所有数据
      this.search.orderState=1;
      this.axios.post("http://localhost:8088/order/show",this.search).then(v=>{
        if(v.status==200 && v.data!=null){
          this.tableData=v.data;
          console.log("v",v)
        }
      })
    },
    //查询详情
    look(){
      this.dialogVisible=true;
    },
    //当前页
    handChange(val){
      this.pageno=val;
    },
    //orderState状态
    orderState:function(row,column,state,index){
      if(state==1) return "待交割";
      if(state==2) return "欠款中";
      if(state==3) return "完成";
    },
    //orderBuytype购买方式
    orderBuytype(row,column,state,index){
      if(state==0) return "全款购买";
      if(state==1) return "分期购买"
    },
    //发票类型
    ordeBill(row,column,state,index){
      if(state==1) return "普通发票"
      if(state==2) return "增值税发票"
    },
    //时间
    time(row,column,state,index){
      return this.formatDate(state)
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
  }
}
</script>

<style scoped>
/deep/.el-descriptions__label.is-bordered-label {
  font-weight: 700;
  color: #909399;
  background: #ffffff;
}
.el-pagination {
  white-space: nowrap;
  padding: 2px 5px;
  margin-top: 10px;
  color: #303133;
  font-weight: 700;
  text-align: center;
}

.top {
  background-color: #fff;
  line-height: 35px;
  height: 35px;
  padding: 0 20px;
}

.el.header {
  margin: 5px 0px;

}

.el-main {
  background-color: #fff;
  padding: 10px;
  min-height: 400px;
}

.el-form-item--mini.el-form-item {
  margin-top: 5px;
}


</style>
