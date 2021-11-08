<template>
    <div>
        <div class="top">
            <el-button type="primary" size="mini" @click="dialogVisible=true">新增</el-button>
        </div>
        <el-container>
            <el-header height="40px">
                <el-form size="mini" inline>
                    <el-form-item label="角色编号：">
                        <el-input></el-input>
                    </el-form-item>
                    <el-form-item label="角色名称：">
                        <el-input></el-input>
                    </el-form-item>
                </el-form>
            </el-header>
            <el-main>
                <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
                    <el-table-column width="55"/>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="text" size="mini" @click="delJueSe(scope.row.jsId)">删除角色</el-button>
                            <el-button type="text" size="mini" @click="dialogVisible1=true,jueId=scope.row.jsId,findJm(scope.row.jsId)">分配权限</el-button>
                            <el-button type="text" size="mini" @click="dialogVisible=true,updJueSe(scope.row)">修改角色</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="jsId" label="角色编号"/>
                    <el-table-column prop="jsName" label="角色名称"/>
                    <el-table-column prop="jsTime" label="创建时间" :formatter="dateformat"/>
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


        <el-dialog v-model="dialogVisible" title="新增角色组">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="">
                        角色组：<el-input v-model="UserJuese.jsName" style="width: 200px;"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="">
                        创建时间：<el-date-picker v-model="UserJuese.jsTime" type="datetime" disabled placeholder="选择日期时间"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
            <template #footer>
      <span class="dialog-footer">
          <el-button @click="dialogVisible = false,clearFrom()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,addJueSe()">确 定</el-button>
     </span>
            </template>
        </el-dialog>

        <el-dialog v-model="dialogVisible1" title="分配角色权限">
            <el-tree :data="tableData1" node-key="menuId"
                    :props="props" :default-checked-keys="roleFuns"
                    show-checkbox default-expand-all
                     ref="funcTree"
            >
            </el-tree>
            <template #footer>
      <span class="dialog-footer">
          <el-button @click="dialogVisible1 = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible1 = false,addJm()">确 定</el-button>
     </span>
            </template>
        </el-dialog>

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
                tableData1: [],
                roleFuns:[],
                jueId:0,
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                dialogVisible:false,//详情弹出
                dialogVisible1:false,

                UserJuese:{
                    jsId:'',
                    jsName:'',
                    jsTime:new Date()
                },

                props: {
                    id:'menuId',
                    label: 'menuName',
                    children: 'children',
                },


            }
        },
        methods:{
            findJm(s){
                this.axios.get("http://localhost:8088/sys/fun-listrm",{params:{jsId:s}})
                    .then(v => {
                            this.roleFuns=v.data
                    }).catch()
            },

            addJm(){
                var funs = this.$refs.funcTree.getCheckedKeys();
                var grant = JSON.stringify({jsId:this.jueId,funs:funs})
                this.axios.post("http://localhost:8088/sys/add-jm",qs.stringify({grant:grant}))
                    .then(v => {
                        alert("授权成功")
                        this.initData()
                    })
            },

            handleCheckChange(data, checked, indeterminate) {
                console.log(data, checked, indeterminate)
            },

            updJueSe(s){
                this.UserJuese={
                    jsId:s.jsId,
                    jsName:s.jsName,
                    jsTime:s.jsTime
                }
            },

            addJueSe(){
                this.axios.post("http://localhost:8088/sys/add-juese",this.UserJuese)
                    .then(v => {
                        if (v.data==1){
                            alert("新增成功")
                        }else{
                            alert("修改成功")
                        }
                        this.initData()
                        this.clearFrom()
                    })
            },

            clearFrom() {
                this.UserJuese={
                    jsId:'',
                    jsName:'',
                    jsTime:new Date()
                }
            },

            delJueSe(s){
                this.axios.get("http://localhost:8088/sys/del-juese",{params:{jsId:s}})
                .then(v => {
                    alert("删除成功")
                    this.initData()
                })
            },

            dateformat(row , column){
                const data = row[column.property]
                if (data == undefined){
                    return
                }
                return moment(data).format("yyyy-MM-DD HH:mm:ss");
            },

            initData() {
                this.axios.get("http://localhost:8088/sys/find-uj")
                    .then(v => {
                        this.tableData=v.data
                    })

                this.axios.get("http://localhost:8088/sys/find-menu")
                    .then(v => {
                        this.tableData1=v.data
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
