<template>
  <div>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item>收车付款统计</el-breadcrumb-item>
	</el-breadcrumb><br>
  <div>
	  <el-container>
   <el-main>

        <el-table :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
          <el-table-column prop="clAssess.ggBrand.brandName" label="汽车品牌"/>
          <el-table-column prop="clAssess.ggDesign.designName" label="汽车款式"/>
          <el-table-column prop="clAssess.ggColor.colorName" label="车身颜色"/>
          <el-table-column prop="clAssess.assessCard" label="车牌号"/>
          <el-table-column prop="clAssess.clOrders.clRecord.recordName" label="车主姓名"/>
          <el-table-column prop="vistTime" label="收车日期"/>
          <el-table-column prop="vistPrice" label="需付款金额"/>
		  <el-table-column label="操作" align="center">
		  	<template #default="scope">
		  		<el-button type="text" size="small" @click="delWay(scope.row)">付款
		  		</el-button>
		  	</template>
		  </el-table-column>
        </el-table>

        <!--分页-->
        <div class="fy_div">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDate.length">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
	<el-dialog title="欠款补交" v-model="addVisible" width="60%" :before-close="addhandleClose">
		<el-form :model="FinancePaymentForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<div style="display: flex;flex-wrap: wrap;justify-content: space-around;">
				<!-- <div style="width: 300px;padding-top: 20px;padding-right: 40px;">
					<el-form-item label="未支付金额:">
						<el-input v-model="vistPrice"></el-input>
					</el-form-item>
				</div> -->
				<!-- <div style="width: 300px;padding-top: 20px;padding-right: 40px;">
					<el-form-item label="输入还款金额:">
						<el-input @blur="jianfas()" v-model="shuruje"></el-input>
					</el-form-item>
				</div> -->
				<div style="width: 300px;padding-top: 20px;padding-right: 40px;">
					<el-form-item label="支付金额:">
						<el-input  v-model="FinancePaymentForm.financeMoney" disabled></el-input>
					</el-form-item>
				</div>
			</div>
			<div style="margin-left: -100px;">
				<el-form-item class="el-form-butt-show-one-s">
					<el-button type="primary" @click="addFinancePayments()">确定</el-button>
				</el-form-item>
			</div>
		</el-form>
	</el-dialog>
  </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表格数据
      tableDate: [],

	  addVisible: false,
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
	  FinancePaymentForm:{
		  financePaydate:'',
		  financeCarnumber:'',
		  financeManname:'',
		  financeBrand:'',
		  financePhone:'',
		  financePepo:'',
		  financeMoney:'',
	  },

    }
  },
  methods:{
	  delWay(row) {
	  	this.addVisible = true;
		console.log(row);
	  	this.FinancePaymentForm.financeCarnumber = row.assessId;
	  	this.FinancePaymentForm.financeManname = row.clAssess.clOrders.clRecord.recordName;
		this.FinancePaymentForm.financeBrand = row.clAssess.ggBrand.brandName;
	  	this.FinancePaymentForm.financePhone = row.clAssess.assessCard;
		this.FinancePaymentForm.financeMoney = row.vistPrice;
		console.log(this.FinancePaymentForm.financeMoney);
	  },
	  addFinancePayments(){
		  const _this = this
		  // this.ruleForm.orderDebt = this.jianfa;
		  this.axios.post("http://localhost:8088/addFinancePayment", this.FinancePaymentForm)
		  	.then(function(response) {
				_this.addVisible = false;
		  	}).catch(function(error) {
		  		console.log(error)
		  	})
	  },
	  // delete(row){
		 //  this.tableData.splice(this.tableData.indexOf(row), 1);
	  // },

    initDate(){
      this.axios.get("http://localhost:8088/find-clReturnVist")
          .then((v) => {
            this.tableDate = v.data;
          })
    },





    // 初始页currentPage、初始每页数据数pagesize和数据data
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
  },
  created() {
    this.initDate();
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
