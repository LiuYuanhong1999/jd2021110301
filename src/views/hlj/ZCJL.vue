<template>
	<div>
	<el-breadcrumb separator-class="el-icon-arrow-right">
		<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
		<el-breadcrumb-item>财务报销记录</el-breadcrumb-item>
	</el-breadcrumb><br>
	<div class="all" style="width: 100%;height: 100%;">
		<el-row>
			<el-col :span="23" class="el-center-top-labels" style="border-bottom: 1px solid #e8eaec;">
				<div class="el-select-table-one-s">
					快速检索：<el-select v-model="pageInfo.value" placeholder="请选择" clearable>
						<el-option label="事由" value="事由"></el-option>
						<el-option label="金额" value="金额"></el-option>
					</el-select>
					<el-input v-model="pageInfo.input" clearable class="el-input-one-s"></el-input>
					<el-button @click="selectAllOtherBops" style="background:#337ab7;border-color: #337ab7;color: #fff;">查询</el-button>
				</div>
			</el-col>
		</el-row>

		<div class="memorandum" style="margin-top: 20px;display:flex;justify-content: center">
			<el-table :data="empData" border style="width: 1200px;" >
				<el-table-column prop="otherPepo" label="报销人" width="250">
				</el-table-column>
				<el-table-column prop="otherPaydate" label="日期" width="250">
				</el-table-column>
				<el-table-column prop="otherMoney" label="金额/元" width="250">
				</el-table-column>
				<el-table-column prop="otherSubject" label="事由" width="250">
				</el-table-column>
        <el-table-column prop="otherRemak" label="审核人" width="150">
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
					value: "",
					input: "",
					currentPage: 1,
					pagesize: 3,
					total: 0
				}
			}
		},
		methods: {
			//多条件查询s
			selectAllOtherBops() {
				const _this = this
				this.axios.get("http://localhost:8088/selectAllOtherBop", {
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
				this.axios.get("http://localhost:8088/selectAllOtherBop", {
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
				this.axios.get("http://localhost:8088/selectAllOtherBop", {
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
			this.axios.get("http://localhost:8088/selectAllOtherBop", {
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
