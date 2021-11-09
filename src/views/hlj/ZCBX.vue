<template>
	<div>
	<!-- <el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item>报销审批</el-breadcrumb-item>
	</el-breadcrumb> --><br>
	<div class="all" style="width: 100%;height: 100%;">

		<div class="memorandum" style="margin-top: 20px;display:flex;justify-content: center">
			<el-table :data="empData" border style="width: 1200px;" >
				<el-table-column prop="bgetProposer" label="姓名" width="240">
				</el-table-column>
				<el-table-column prop="bgetMoney" label="报销金额" width="240">
				</el-table-column>
				<el-table-column prop="bgetCause" label="备注" width="240">
				</el-table-column>
				<el-table-column prop="bgetState" label="报销状态" width="240">
				</el-table-column>
				<el-table-column label="操作" align="center">
					<template #default="scope">
						<el-button  type="text" size="small" @click="delWay(scope.row)">报销通过
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
		<el-dialog title="报销审批" v-model="addVisible" width="60%" :before-close="addhandleClose">
			<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
				<div style="display: flex;flex-wrap: wrap;justify-content: space-around;">
					<div style="width: 300px;padding-top: 20px;padding-right: 40px;">
						<el-form-item label="报销金额:">
							<el-input v-model="empForm.otherMoney" disabled></el-input>
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
	</div>
</template>

<script>
	import {
		defineComponent
	} from 'vue'
	import qs from 'qs'
	export default defineComponent({
		data() {
			return {
				empData: [],

				pageInfo: {
					currentPage: 1,
					pagesize: 3,
					total: 0
				},
				empForm2:{
					bgetId:'',
				},
				empForm:{
					otherSubject:'',
					otherMoney:'',
					otherPepo:'',
          otherRemak:''
				},
				addVisible:false,
			}
		},
		methods: {
			addWay() {
				const _this = this

				this.axios.put("http://localhost:8088/updByQka", this.empForm2)
					.then(function(response) {
						_this.axios.post("http://localhost:8088/addOtherBop", _this.empForm)
						.then(function(response) {
						_this.axios.get("http://localhost:8088/selectBgExpenByPrimaryKey", {
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
							_this.addVisible = false;
					}).catch(function(error) {
						console.log(error)
					})
			},
			delWay(row) {
				this.addVisible = true;
				this.empForm2.bgetId = row.bgetId
				this.empForm.otherSubject = row.bgetCause;
				this.empForm.otherMoney = row.bgetMoney;
				this.empForm.otherPepo = row.bgetProposer;

			},

			handleSizeChange(pagesize) {
				var _this = this
				this.pageInfo.pagesize = pagesize
				var ps = qs.stringify(this.pageInfo)
				console.log(ps)
				this.axios.get("http://localhost:8088/selectBgExpenByPrimaryKey", {
						params: this.pageInfo
					})
					.then(function(response) {
						console.log(response.data)
						_this.empData = response.data.list
					}).catch(function(error) {
						console.log(error)
					})
			},
      findUserName(){
        let s=JSON.parse(localStorage.getItem("loginuser"))
        var s1 = s.slice(1,-1);
        this.axios.get("http://localhost:8088/sys/find-userId",{params:{

            listNum:s1

          }})
            .then(v=>{
              this.empForm.otherRemak=v.data.listName
            })
      },
			handleCurrentChange(currentPage) {
				var _this = this
				this.pageInfo.currentPage = currentPage
				var ps = qs.stringify(this.pageInfo) // eslint-disable-line no-unused-vars
				this.axios.get("http://localhost:8088/selectBgExpenByPrimaryKey", {
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
      this.findUserName()
			const _this = this
			this.axios.get("http://localhost:8088/selectBgExpenByPrimaryKey", {
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
