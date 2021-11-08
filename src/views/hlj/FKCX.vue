<template>
  <div>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item>收车付款查询</el-breadcrumb-item>
	</el-breadcrumb><br>
	<div class="all" style="width: 100%;height: 100%;">
		<el-row>
			<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
				<div class="el-select-table-one-s">
					快速检索：<el-select v-model="pageInfo.value" placeholder="请选择" clearable>
						<el-option label="收车编号" value="收车编号"></el-option>
						<el-option label="车主姓名" value="车主姓名"></el-option>
						<el-option label="汽车品牌" value="汽车品牌"></el-option>
						<el-option label="付款金额" value="付款金额"></el-option>
					</el-select>
					<el-input v-model="pageInfo.input" clearable class="el-input-one-s"></el-input>
					<el-button @click="selectAllCustomerRecords" style="background:#337ab7;border-color: #337ab7;color: #fff;">查询</el-button>
				</div>
			</el-col>
		</el-row>

		<div class="memorandum" style="margin-top: 20px;display:flex;justify-content: center">
			<el-table :data="empData" border style="width: 1200px;" >
				<el-table-column prop="financePaydate" label="付款时间" width="240">
				</el-table-column>
				<el-table-column fixed="left" prop="financeCarnumber" label="付款编号" width="240">
				</el-table-column>
				<el-table-column prop="financeManname" label="车主姓名" width="240">
				</el-table-column>
				<el-table-column prop="financeBrand" label="汽车品牌" width="240">
				</el-table-column>
				<el-table-column prop="financePhone" label="车牌号" width="240">
				</el-table-column>
				<el-table-column prop="financePepo" label="付款人" width="240">
				</el-table-column>
				<el-table-column prop="financeMoney" label="付款金额" width="240">
				</el-table-column>
				<el-table-column prop="customerStatic" label="打印状态" width="240">
					<template v-slot="scope">
						<p v-if="scope.row.customerStatic==0">未打印</p>
						<p v-if="scope.row.customerStatic==1">已打印</p>
					</template>
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template #default="scope">
						<el-button v-if="scope.row.cptStatus==1" type="text" size="small" @click="print(scope.row)">打印
						</el-button>
					</template>
				</el-table-column>
			</el-table>
		</div>
		<div class="pagination" style="margin-top: 20px;display:flex;justify-content: center">
			<el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
				:current-page="pageInfo.currentPage" :page-sizes="[3, 6, 9]" :page-size="pageInfo.pagesize"
				layout="total, sizes, prev, pager, next, jumper" :total="pageInfo.total">
			</el-pagination>
		</div>
	</div>
	<!-- <el-dialog title="" v-model="addVisible1" width="40%" :before-close="addhandleClose1">

		<form id="printMe" label-width="100px" class="demo-ruleForm">
			<div style="width: 570px;text-align: center;">
				<h1>客户还款单</h1>
				<p style="text-align: left;margin: 30px 0px 0px 80px;">客户名称：<span
						v-html="tableData2[0].CustomerRecord.customerMan" /></p>
				<p style="text-align: left;margin: 10px 0px 0px 94px;">销售单号：<span
						v-html="tableData2[0].CustomerRecord.customerOutnumber" /></p>
				<p style="text-align: left;margin: 10px 0px 0px 80px;">还款时间：<span
						v-html="tableData2[0].CustomerRecord.customerPaydate" /></p>
				<p style="text-align: left;margin: 10px 0px 0px 94px;">还款金额：<span
						v-html="tableData2[0].CustomerRecord.customerMoney" /></p>
				<p style="text-align: left;margin: 10px 0px 0px 80px;">收款人：<span
						v-html="tableData2[0].CustomerRecord.customerPepo" /></p>
		</form>
		<el-button type="primary" ref="zz" v-show="false" v-print="'printMe'">打印发票</el-button>
		<el-button type="primary" @click="gg()">打印发票</el-button>
	</el-dialog> -->
  </div>
</template>

<script>
	import {
		defineComponent
	} from 'vue'
	import {
		ElMessage
	} from 'element-plus'
	import qs from 'qs'
	// import print from 'vue3-print-nb'
	export default defineComponent({
		// directives: {
		// 	print
		// },
		data() {
			return {
				/*---------------------------------打印---------------------------------*/
				printLoading: true,
				printObj: {
					id: "printMe",
					popTitle: 'good print',
					extraCss: "https://cdn.bootcdn.net/ajax/libs/animate.css/4.1.1/animate.compat.css, https://cdn.bootcdn.net/ajax/libs/hover.css/2.3.1/css/hover-min.css",
					extraHead: '<meta http-equiv="Content-Language"content="zh-cn"/>',
					beforeOpenCallback(vue) {
						vue.printLoading = true
						console.log('打开之前')
					},
					openCallback(vue) {
						vue.printLoading = false
						console.log('执行了打印')
					},
					closeCallback(vue) {
						console.log('关闭了打印工具')
					}
				},

				empData: [],
				//发票内容
				tableData2: [],
				addVisible1: false,
				pageInfo: {
					value: "",
					input: "",
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				pageInfo1: {
					customerid: '',
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
			}
		},
		methods: {
			print(row) {
				this.addVisible1 = true;
				var _this = this
				this.axios.get("http://localhost:8088/selectByKey", {
						params: {
							customerid: row.customerId
						}
					})
					.then(function(response) {
						_this.tableData2 = response.data
					}).catch(function(error) {
						console.log(error)
					})
			},
			updd() {
				ElMessage({
					showClose: true,
					message: '取消打印。'
				});
			},
			addhandleClose1(done) {
				this.$confirm('确定关闭？')
					.then(_ => {
						done();
						// this.clo();
						this.updd();
					})
					.catch(_ => {});
			},
			gg() {
				this.addVisible1 = false;
				this.$refs.zz.$el.click();
			},
			//多条件查询
			selectAllCustomerRecords() {
				const _this = this
				this.axios.get("http://localhost:8088/selectAllFinancePayment", {
						params: this.pageInfo,
					})
					.then(function(response) {
						console.log(response)
						_this.empData = response.data.list
						_this.pageInfo.total = response.data.total
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/selectAllFinancePayment", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.empData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo) // eslint-disable-line no-unused-vars
				this.axios.get("http://localhost:8088/selectAllFinancePayment", {
						params: this.pageInfo
					})
					.then(function(response) {
						_this.empData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			}
		},
		created() {
			const _this = this
			this.axios.get("http://localhost:8088/selectAllFinancePayment", {
				params: this.pageInfo
			}).then(function(
				response) {
				console.log(response)
				_this.empData = response.data.list
				_this.pageInfo.total = response.data.total
			}).catch(function(error) {
				console.log(error)
			})
		}
	});
</script>

<style>
	.el-select .el-input {
		width: 130px;
	}

	.input-with-select .el-input-group__prepend {
		background-color: #fff;
	}

	.addcontent {
		width: 100%;
		height: 400px;
		display: flex;
		justify-content: center;
	}

	.addcontent1 {
		width: 400px;
	}

	.addcontent2 {
		width: 400px;
	}

	.addcontent_line {
		width: 100%;
		height: 65px;
	}

	.textarea {
		height: 155px;
	}

	.upload {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}
	.el-input-one-s{
		width: 300px;
	}
</style>
