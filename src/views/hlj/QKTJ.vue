<template>
  <div>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item>客户欠款统计</el-breadcrumb-item>
	</el-breadcrumb><br>
	<div class="all" style="width: 100%;height: 100%;">
		<el-row>
			<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
				<div class="el-select-table-one-s">
					快速检索：<el-select v-model="pageInfo.value" placeholder="请选择" clearable>
						<el-option label="销售单号" value="销售单号"></el-option>
						<el-option label="欠款金额" value="欠款金额"></el-option>
						<el-option label="交车人" value="交车人"></el-option>
						<el-option label="领车人" value="领车人"></el-option>
					</el-select>
					<el-input v-model="pageInfo.input" clearable class="el-input-one-s"></el-input>
					<el-button @click="slelctDebts" style="background:#337ab7;border-color: #337ab7;color: #fff;">查询</el-button>
				</div>
			</el-col>
		</el-row>

		<div class="memorandum" style="margin-top: 20px;display:flex;justify-content: center">
			<el-table :data="empData" border style="width: 1200px;" >
				<el-table-column prop="orderTime" label="销售时间" width="240">
				</el-table-column>
				<el-table-column fixed="left" prop="orderId" label="销售单号" width="240">
				</el-table-column>
				<!-- <el-table-column prop="orderPrice" label="销售价格" width="240">
				</el-table-column> -->
				<!-- <el-table-column prop="orderTotal" label="成交金额" width="240">
				</el-table-column> -->
				<el-table-column prop="orderDebt" label="欠款金额" width="240">
				</el-table-column>
				<!-- <el-table-column prop="orderForcar" label="交车人" width="240">
				</el-table-column> -->
				<el-table-column prop="orderGetcar" label="欠款车主" width="240">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template #default="scope">
						<el-button type="text" size="small" @click="delWay(scope.row)">还款
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

	<el-dialog title="欠款补交" v-model="addVisible" width="60%" :before-close="addhandleClose">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
			<div style="display: flex;flex-wrap: wrap;justify-content: space-around;">
				<div style="width: 300px;padding-top: 20px;padding-right: 40px;">
					<el-form-item label="当前欠款金额:">
						<el-input v-model="orderDebt2"></el-input>
					</el-form-item>
				</div>
				<div style="width: 300px;padding-top: 20px;padding-right: 40px;">
					<el-form-item label="输入还款金额:">
						<el-input @blur="jianfas()" v-model="shuruje"></el-input>
					</el-form-item>
				</div>
				<div style="width: 300px;padding-top: 20px;padding-right: 40px;">
					<el-form-item label="剩余还款金额:">
						<el-input  v-model="jianfa"></el-input>
					</el-form-item>
				</div>
			</div>
			<div style="margin-left: -100px;">
				<el-form-item class="el-form-butt-show-one-s">
					<el-button type="primary" @click="addWay()">确定</el-button>
				</el-form-item>
			</div>
		</el-form>
	</el-dialog>
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
	export default defineComponent({
		data() {
			return {
				shuruje:'',
				shengyuje:'',
				ruleForm: {
					orderId:'',
					orderDebt:'',
					orderGetcar:''
				},
				customerForm:{
					customerId:'',
					customerOutnumber:'',
					customerPaydate:'',
					customerType:'',
					customerMoney:'',
					customerMan:'',
					customerPepo:'',
					customerRemak:''
				},
				addVisible1: false,
				addVisible: false,
				empData: [],
				price:'',
				jianfa:'',
				pageInfo: {
					value: "",
					input: "",
					currentPage: 1,
					pagesize: 3,
					total: 0
				}
			}
		},
		computed:{

		},
		methods: {
			close() {
				for (var key in this.ruleForm) {
					delete this.ruleForm[key];
				}
				this.addVisible1 = false
				this.addVisible = false
				},
			jianfas() {
				var a=this.orderDebt2;
				var b=this.shuruje;
				var c=a-b;
				this.jianfa = c;
				// console.log("aaaaaaaaaaaa"+this.jianfa)
			},
			//还款
			addWay() {
				const _this = this
				this.ruleForm.orderDebt = this.jianfa;
				console.log(this.ruleForm.orderId)
				this.customerForm.customerMoney = this.shuruje;
				this.axios.put("http://localhost:8088/updDebt", this.ruleForm)
					.then(function(response) {
						_this.axios.post("http://localhost:8088/addCustomerRecord", _this.customerForm)
						.then(function(response) {
						_this.axios.get("http://localhost:8088/slelctDebt", {
								params: _this.pageInfo
							})
							.then(function(response) {
								_this.empData = response.data.list
								_this.pageInfo.total = response.data.total
							}).catch(function(error) {
								console.log(error)
							})
						}).catch(function(error) {
								console.log(error)
							})


						_this.close();
						_this.adds();
						//新增还款记录
						// addcustomer(){



					}).catch(function(error) {
						console.log(error)
					})
			},

			addd() {
				ElMessage({
					showClose: true,
					message: '取消还款。'
				});
			},
			adds() {
				ElMessage({
					showClose: true,
					message: '还款成功!',
					type: 'success'
				});
			},
			addhandleClose(done) {
				this.$confirm('确定关闭？')
					.then(_ => {
						done();
						// this.clo();
						this.addd();
					})
					.catch(_ => {});
			},
			delWay(row) {
				this.addVisible = true;
				this.orderDebt2 = row.orderDebt;
				this.ruleForm.orderGetcar = row.orderGetcar;
				this.ruleForm.orderId = row.orderId;
				this.customerForm.customerOutnumber = this.ruleForm.orderId;
				this.customerForm.customerMan = this.ruleForm.orderGetcar;
				console.log(this.ruleForm.orderGetcar);
			},
			//多条件查询
			slelctDebts() {
				const _this = this
				this.axios.get("http://localhost:8088/slelctDebt", {
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
				this.axios.get("http://localhost:8088/slelctDebt", {
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
				this.axios.get("http://localhost:8088/slelctDebt", {
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
			this.axios.get("http://localhost:8088/slelctDebt", {
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
