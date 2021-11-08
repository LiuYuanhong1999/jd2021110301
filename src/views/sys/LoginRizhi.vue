<template>
    <div>
        <div class="top">
        </div>
        <el-container>
            <el-header height="40px">
                <el-form size="mini" inline>
                    <el-form-item label="登录用户：">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="IP地址：">
                        <el-input></el-input>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                    <el-table-column width="55"/>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="text" size="mini" @click="delLogin(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="userList.listName" label="登录用户"/>
                    <el-table-column prop="rizhiIp" label="IP地址"/>
                    <el-table-column prop="rizhiTime" label="登陆时间" :formatter="dateformat"/>
                </el-table>
                <div>
                    <el-pagination
                            @size-change="handleSizeChange"
                            @current-change="handleCurrentChange"
                            :current-page="currentPage"
                            :page-sizes="[5, 10, 20, 40]"
                            :page-size="pagesize"
                            layout="total, sizes, prev, pager, next, jumper"
                            :total="tableData.length">
                    </el-pagination>
                </div>
            </el-main>
        </el-container>

    </div>
</template>

<script>
    import qs from "qs";
    import moment from "moment";
    export default {
        data() {
            return {
                //表格数据
                tableData: [],
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据

            }
        },
        methods:{
            dateformat(row , column){
                const data = row[column.property]
                if (data == undefined){
                    return
                }
                return moment(data).format("yyyy-MM-DD HH:mm:ss");
            },

            delLogin(s){
              this.axios.post("http://localhost:8088/sys/del-loginrizhi",s)
              .then(v => {
                  alert("删除成功")
                  this.initData()
              })
            },

            initData() {
                this.axios.get("http://localhost:8088/sys/find-loginrizhi")
                .then(v => {
                    this.tableData=v.data
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
            this.initData()
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
