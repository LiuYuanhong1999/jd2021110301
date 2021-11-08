<template>
  <div>
    <el-header>
      <el-button type="success" plain size="small" @click="newly()">添加模板</el-button>
      <el-table :data="BgFlow">
        <el-table-column prop="bgfwId" label="序号"/>
        <el-table-column prop="bgfwName" label="流程名称"/>
        <el-table-column prop="" label="步骤设置">
          <template #default="scope">
            <el-button type="primary" plain size="mini" @click="stepstosetthe(scope.row)">步骤设置</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- *****************分页******************* -->
      <el-pagination
          style="text-align: center"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[5, 10, 20, 40]"
          :page-size="pagesize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="BgFlow.length">
      </el-pagination>
    </el-header>

    <!-- ******************新建模板弹窗******************* -->

    <el-dialog title="添加模板" v-model="addtemplate">
      <el-form :model="tainjialiucheng">
        <el-form-item label="流程名称" prop="bgfwName">
          <el-input v-model="tainjialiucheng.bgfwName"/>
        </el-form-item>
      </el-form>
      <template #footer>
				  <span class="dialog-footer">
            <el-button type="info" plain="" @click="additional()">新 增</el-button>
				    <el-button type="info" plain="" @click="addtemplate = false">取 消</el-button>
				  </span>
      </template>
    </el-dialog>

    <!-- ******************新建子节点弹窗******************* -->

    <el-dialog title="步骤设置" v-model="childnode">
      <el-button type="success" plain size="small" @click="shenqing()">新增步骤</el-button>
      <el-table :data="buzhoushezhi">
        <el-table-column prop="bgfnSerial" label="步骤序号"/>
        <el-table-column prop="bgfnDesignation" label="步骤名称"/>
        <el-table-column prop="userList.listName" label="审批人"/>
        <el-table-column prop="" label="管理">
          <template #default="scope">
            <el-button type="primary" plain size="mini" @click="xiugai(scope.row)">修 改</el-button>
            <el-button type="primary" plain size="mini" >删 除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <template #footer>
				  <span class="dialog-footer">
				    <el-button type="info" plain="" @click="childnode = false">取 消</el-button>
				  </span>
      </template>
    </el-dialog>

    <!-- ******************新建子节点步骤弹窗******************* -->

    <el-dialog @close="qingkong" title="步骤" v-model="buzhou">
      <el-form :model="zijiedian">
        <el-form-item prop="bgfnSerial" label="步骤序号" :label-position="labe" label-width="80px">
          <input v-model="zijiedian.bgfnSerial"/>
        </el-form-item>
        <el-form-item prop="bgfnDesignation" label="步骤名称" :label-position="labe" label-width="80px">
          <input v-model="zijiedian.bgfnDesignation"/>
        </el-form-item>
        <el-form-item prop="bgfnApprover" label="审批人" :label-position="labe" label-width="80px">
          <el-select v-model="zijiedian.bgfnApprover" placeholder="请选择审批人">
            <el-option v-for="us in user"
                        :label="us.userList.listName"
                        :value="us.userList.listNum"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <template #footer>
				  <span class="dialog-footer">
				    <el-button type="info" plain="" @click="addbuzhou()">确 定</el-button>
            <el-button type="info" plain="" @click="qingkong()">取 消</el-button>
				  </span>
      </template>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data(){
    return{
      tainjialiucheng:{
        bgfwName:''
      },
      zijiedian:{
        bgfnId:'',
        bgfnSerial:'',
        bgfnDesignation:'',
        bgfnApprover:'',
        bgfnBgflowid:''
      },
      BgFlow:[],
      buzhoushezhi:[],
      user:[],
      addtemplate:false,//新增模板弹窗
      childnode:false,//子节点 步骤设置
      buzhou:false,//字节点步骤新增，修改弹窗
      labe:'right',//对齐form表单
      currentPage:1, //初始页
      pagesize:8,    //    每页的数据
    }
  },
  methods:{
    handleSizeChange: function (size) {
      this.pagesize = size;
      console.log(this.pagesize)  //每页下拉显示数据
    },
    handleCurrentChange: function(currentPage){
      this.currentPage = currentPage;
      console.log(this.currentPage)  //点击第几页
    },
    /*新建流程弹窗*/
    newly(){
      this.addtemplate = true;
    },
    /*查看步骤设置,新增修改步骤弹窗*/
    stepstosetthe(row){
      this.zijiedian.bgfnBgflowid=row.bgfwId
      this.childnode = true;
      this.axios({url:"http://localhost:8088/all-bgFlowEdition",params:{bgfnBgflowid:row.bgfwId}}).then((v)=>{
        this.buzhoushezhi = v.data
      })
    },
    /*添加模板*/
    additional(){
      this.axios.post("http://localhost:8088/add-record",this.tainjialiucheng).then((v)=>{
        this.inquire();
        this.addtemplate =false;
        this.$message({
          message: '新增流程成功',
          type: 'success'
        });
      }).catch(function (){

      })
    },
    /*新增子节点步骤*/
    shenqing(){
      this.buzhou = true;
      this.axios.get("http://localhost:8088/all-user").then(v=>{
        this.user = v.data
      })
    },
    /*修改子节点,获取子节点数据*/
    xiugai(row){
      this.zijiedian.bgfnId = row.bgfnId
      this.zijiedian.bgfnSerial = row.bgfnSerial
      this.zijiedian.bgfnDesignation = row.bgfnDesignation
      this.zijiedian.bgfnApprover = row.bgfnApprover
      this.buzhou =true;
      this.axios.get("http://localhost:8088/all-user").then(v=>{
        this.user = v.data
      })
    },
    /*清空表单*/
    qingkong(){
      this.zijiedian={
        bgfnId:'',
        bgfnSerial:'',
        bgfnDesignation:'',
        bgfnApprover:'',
        bgfnBgflowid:''
      },
      this.buzhou = false;
    },
    /*根据id判断子节点步骤是否存在,存在就修改,不存在就新增*/
    addbuzhou(){
      this.axios.post("http://localhost:8088/add-bgfled",this.zijiedian).then((v)=>{
        //this.stepstosetthe(row.bgfwId);
        this.buzhou = false;
      })
    },
    inquire(){
    /* this.axios({url:"http://localhost:8088/all-bgfwId",params:{bgfwId:bgfwId}}).then((v)=>{
          this.BgFlow = v.data
      }) */
      this.axios.get("http://localhost:8088/all-bgfwId").then(v=>{
        this.BgFlow = v.data
      })
    }
  },
  created() {
    this.inquire()
  }
}
</script>

<style scoped>
 .el-button--success.is-plain {
   color: #67C23A;
   background: #f0f9eb;
   border-color: #c2e7b0;
   margin-bottom: 5px;
 }
</style>