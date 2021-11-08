<template>
  <div>
    <div class="top">
      <el-button type="primary" size="mini" @click="dialogVisible=true">新增</el-button>
    </div>
    <el-container>
      <el-header height="40px">
        <el-form size="mini" inline>
          <el-form-item label="角色组：">
<!--            <el-select v-model="chaUser.jsId" style="width: 200px">-->
<!--              <el-option-->
<!--                      v-for="provider in tableData2"-->
<!--                      :key="provider.jsId"-->
<!--                      :label="provider.jsName"-->
<!--                      :value="provider.jsId"-->
<!--              />-->
<!--            </el-select>-->
          </el-form-item>
          <el-form-item label="用户名：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="所属部门：">
            <el-select v-model="UserList.orgId" style="width: 200px">
              <el-option
                      v-for="provider in tableData3"
                      :key="provider.orgId"
                      :label="provider.orgName"
                      :value="provider.orgId"
              />
            </el-select>
          </el-form-item>
          <el-form-item label="性别：">
            <el-select v-model="UserList.listSex" style="width: 200px">
              <el-option
                      v-for="provider in tableData4"
                      :key="provider.value"
                      :label="provider.label"
                      :value="provider.value"
              />
            </el-select>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
          <el-table-column width="55"/>
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="text" size="mini" @click="zhuXiao(scope.row)">注销</el-button>
              <el-button type="text" size="mini" @click="dialogVisible=true,updateUser(scope.row)">修改</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="userJuese.jsName" label="角色组"/>
          <el-table-column prop="userList.userName" label="用户名"/>
          <el-table-column prop="userList.listName" label="姓名" width="80px"/>
          <el-table-column label="性别">
            <template  #default="scope">
              <template v-if="scope.row.userList.listSex =='1'">
                男
              </template>
              <template v-if="scope.row.userList.listSex =='2'">
                女
              </template>
            </template>
          </el-table-column>
          <el-table-column prop="userList.listOld" label="年龄" width="80px"/>
          <el-table-column prop="userList.listCard" label="身份证号" width="150px"/>
          <el-table-column prop="userList.listNum" label="编号" width="100px"/>
          <el-table-column prop="userList.sysOrg.orgName" label="部门"/>
          <el-table-column prop="userList.listSalary" label="工资"/>
          <el-table-column prop="userList.listIpone" label="联系电话"/>
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
    <el-dialog v-model="dialogVisible" title="新增用户">
      <el-row>
        <el-col :span="10">
          <el-form-item label="">
            角色组：<el-select v-model="UserList.sysRoleuser.roldId" style="width: 200px">
            <el-option
                    v-for="provider in tableData2"
                    :key="provider.jsId"
                    :label="provider.jsName"
                    :value="provider.jsId"
            />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="">
            所属部门：<el-select v-model="UserList.orgId" style="width: 200px">
            <el-option
                    v-for="provider in tableData3"
                    :key="provider.orgId"
                    :label="provider.orgName"
                    :value="provider.orgId"
            />
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="">
            用户名：<el-input v-model="UserList.userName" style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="">
            密码：<el-input type="password" v-model="UserList.userPaw" style="width: 200px" :disabled="suo"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="">
            性名：<el-input v-model="UserList.listName" style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="">
            电话号码：<el-input v-model="UserList.listIpone" style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="">
            性别：<el-select v-model="UserList.listSex" style="width: 200px">
            <el-option
                    v-for="provider in tableData4"
                    :key="provider.value"
                    :label="provider.label"
                    :value="provider.value"
            />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="">
            年龄：<el-input v-model="UserList.listOld" style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="10">
          <el-form-item label="">
            身份证号：<el-input v-model="UserList.listCard" style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="10">
          <el-form-item label="">
            工资：<el-input v-model="UserList.listSalary" style="width: 200px"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false,clearFrom(),suo=false">取 消</el-button>
        <template v-if="UserList.listNum==''">
          <el-button type="primary" @click="dialogVisible = false,addUser(),suo=false">确 定</el-button>
        </template>
        <template v-if="UserList.listNum!=''">
          <el-button type="primary" @click="dialogVisible = false,xiuUser(),suo=false">修 改</el-button>
        </template>
     </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //表格数据
      tableData: [],
      tableData2: [],
      tableData3: [],
      tableData4:[{
        value: '1',
        label: '男'
      }, {
        value: '2',
        label: '女'
      } ],
      suo:false,
      dialogVisible:false,//详情弹出
      currentPage:1, //初始页
      pagesize:10,    //    每页的数据
      UserList:{
        listNum:'',
        userName:'',
        userPaw:'',
        listName:'',
        listSex:'',
        listOld:'',
        listCard:'',
        listSalary:'',
        listIpone:'',
        listZt:1,
        orgId:'',
        sysRoleuser:{
          sruId:'',
          roldId:'',
          listNum:''
        },
        chaUser:{
          jsId:'',
          userName:'',
          orgId:'',
          listSex:''
        }
      },

    }
  },
  methods:{
    //修改用户信息
    xiuUser(){
      this.axios.post("http://localhost:8088/sys/update-user", this.UserList)
              .then(v => {
                alert("修改成功")
                this.initData()
                this.clearFrom()
              })
    },

    //回显用户信息
    updateUser(s) {
      this.UserList = {
        listNum: s.listNum,
        userName: s.userList.userName,
        userPaw: s.userList.userPaw,
        listName: s.userList.listName,
        listSex: s.userList.listSex,
        listOld: s.userList.listOld,
        listCard: s.userList.listCard,
        listSalary: s.userList.listSalary,
        listIpone: s.userList.listIpone,
        listZt: 1,
        orgId: s.userList.sysOrg.orgId,
        sysRoleuser: {
          sruId: s.sruId,
          roldId: s.roldId,
          listNum: s.listNum
        },
      }
      this.suo=true

    },

    //锁定账号
    suoUser(s){
      s.userList.listZt=2
      this.axios.post("http://localhost:8088/sys/suo-user", s.userList)
              .then(v => {
                alert("锁定成功")
                this.initData()
                this.clearFrom()
              })
    },

    //注销账号
    zhuXiao(s){
      this.axios.post("http://localhost:8088/sys/del-user", s.userList)
              .then(v => {
                alert("注销成功")
                this.initData()
                this.clearFrom()
              })
    },

    clearFrom(){
      this.UserList={
        listNum:'',
        userName:'',
        userPaw:'',
        listName:'',
        listSex:'',
        listOld:'',
        listCard:'',
        listSalary:'',
        listIpone:'',
        listZt:1,
        orgId:'',
        sysRoleuser:{
          sruId:'',
          roldId:'',
          listNum:''
        },
      }
    },

    addUser(){
      //新增用户列表,用户权限
      this.axios.post("http://localhost:8088/sys/add-user",this.UserList)
       .then(v => {
         alert("新增成功")
         this.initData()
         this.clearFrom()
       })
    },

    //查询详情
    look(){
      this.dialogVisible=true;
    },

    //查询用户列表
    initData(){
      this.axios.get("http://localhost:8088/sys/find-userlist")
      .then(v => {
        this.tableData=v.data
        this.initData2()
        this.initData3()
      })
    },

    //查询角色组
    initData2(){
      this.axios.get("http://localhost:8088/sys/find-uj")
              .then(v => {
                this.tableData2=v.data
              })
    },

    //查询部门
    initData3(){
      this.axios.get("http://localhost:8088/sys/find-uo")
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
