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
                <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%"
                          @expand-change="expandChange">
                    <el-table-column type="expand">
                        <el-form label-position="left" inline class="demo-table-expand">
                            <el-table :data="tableData2">
                                <el-table-column label="操作">
                                    <template #default="scope">
                                        <el-button type="text" size="mini" @click="dialogVisible=true,updMenu(scope.row)">修改菜单</el-button>
                                    </template>
                                </el-table-column>
                                <el-table-column prop="menuId" label="菜单编号"/>
                                <el-table-column prop="menuName" label="菜单名称"/>
                                <el-table-column prop="menuMethod" label="菜单Method"/>
                                <el-table-column prop="menuUrl" label="菜单地址"/>
                                <el-table-column prop="compoentName" label="菜单文件名"/>
                                <el-table-column prop="compoentPath" label="菜单路径"/>
                                <el-table-column prop="icon" label="菜单图标"/>
                            </el-table>
                        </el-form>
                    </el-table-column>
                    <el-table-column width="55"/>
                    <el-table-column label="操作">
                        <template #default="scope">
                            <el-button type="text" size="mini" @click="dialogVisible=true,updMenu(scope.row)">修改菜单</el-button>
                        </template>
                    </el-table-column>
                    <el-table-column prop="menuId" label="菜单编号"/>
                    <el-table-column prop="menuName" label="菜单名称"/>
                    <el-table-column prop="menuMethod" label="菜单Method"/>
                    <el-table-column prop="menuUrl" label="菜单地址"/>
                    <el-table-column prop="compoentName" label="菜单文件名"/>
                    <el-table-column prop="compoentPath" label="菜单路径"/>
                    <el-table-column prop="icon" label="菜单图标"/>
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


        <el-dialog v-model="dialogVisible" title="编辑菜单">
            <el-row>
                <el-col :span="10">
                    <el-form-item label="">
                        上级菜单：<el-select v-model="sysMenu.menuPid" style="width: 200px">
                        <el-option
                                v-for="provider in tableData3"
                                :key="provider.menuId"
                                :label="provider.menuName"
                                :value="provider.menuId"
                        />
                    </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="">
                        菜单名称：<el-input v-model="sysMenu.menuName" style="width: 200px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="">
                        菜单Method：<el-input v-model="sysMenu.menuMethod" style="width: 200px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="">
                        菜单地址：<el-input v-model="sysMenu.menuUrl" style="width: 200px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="">
                        菜单文件名：<el-input v-model="sysMenu.compoentName" style="width: 200px"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="10">
                    <el-form-item label="">
                        菜单路径：<el-input v-model="sysMenu.compoentPath" style="width: 200px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="10">
                    <el-form-item label="">
                        菜单图标：<el-input v-model="sysMenu.icon" style="width: 200px"></el-input>
                    </el-form-item>
                </el-col>
            </el-row>
            <template #footer>
      <span class="dialog-footer">
          <el-button @click="dialogVisible = false,clearFrom()">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false,addMenu()">确 定</el-button>
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
                tableData2:[],
                tableData3:[],
                currentPage:1, //初始页
                pagesize:10,    //    每页的数据
                dialogVisible:false,//详情弹出
                sysMenu:{
                    menuId:'',
                    menuPid:'',
                    menuName:'',
                    menuMethod:'',
                    menuUrl:'',
                    compoentName:'',
                    compoentPath:'',
                    icon:'',
                }
            }
        },
        methods:{
            clearFrom(){
                this.sysMenu={
                    menuId:'',
                    menuPid:'',
                    menuName:'',
                    menuMethod:'',
                    menuUrl:'',
                    compoentName:'',
                    compoentPath:'',
                    icon:'',
                }
            },

            updMenu(s){
                this.sysMenu={
                    menuId:s.menuId,
                    menuPid:s.menuPid,
                    menuName:s.menuName,
                    menuMethod:s.menuMethod,
                    menuUrl:s.menuUrl,
                    compoentName:s.compoentName,
                    compoentPath:s.compoentPath,
                    icon:s.icon,
                }
            },


            addMenu(){
                this.axios.post("http://localhost:8088/sys/add-menu",this.sysMenu)
                .then(v=>{
                    if (v.data==1){
                        alert("新增成功")
                    }else {
                        alert("修改成功")
                    }
                    this.clearFrom()
                    this.initData()
                })
            },

            expandChange:function (row) {
                this.tableData2=row.children
            },

            initData() {
                this.axios.get("http://localhost:8088/sys/find-menu")
                    .then(v => {
                        this.tableData=v.data
                    })
                this.axios.get("http://localhost:8088/sys/findall-menu")
                    .then(v => {
                        this.tableData3=v.data
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
