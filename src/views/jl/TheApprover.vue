<template>
  <div>
    <el-header>
      <el-button type="success" plain size="small" @click="shenqing()">申请流程</el-button>
      <el-tabs type="border-card">
        <el-tab-pane label="待审核流程">
            <el-main>
              <el-table :data="daiban">
                <el-table-column prop="bgapId" label="流程编号"/>
                <el-table-column prop="bgFlow.bgfwName" label="流程名称">
                  <template #default="scope">
                    <el-button type="primary" plain size="mini" @click="chakan()">报销单</el-button>
                  </template>
                </el-table-column>
                <el-table-column prop="bgFlowEdition.bgfnDesignation" label="当前节点" />
                <el-table-column prop="bgapResult" label="审批结果">
                  <template #default="scope">
                    {{scope.row.bgapResult == 0? '待审批':'审核中'}}
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
                  :total="daiban.length">
              </el-pagination>
            </el-main>
        </el-tab-pane>

<!-- *************************************分割线***************************************** -->

        <el-tab-pane label="已审核流程">
          <el-main>
            <el-table :data="daiban1">
              <el-table-column prop="bgapId" label="流程编号"/>
              <el-table-column prop="bgFlow.bgfwName" label="流程名称">
                <template #default="scope">
                  <el-button type="primary" plain size="mini" @click="chakan()">报销单</el-button>
                </template>
              </el-table-column>
              <el-table-column prop="bgFlowEdition.bgfnDesignation" label="当前节点" />
              <el-table-column prop="bgapResult" label="审批结果">
                <template #default="scope">
                  {{scope.row.bgapResult == 0? '待审批':'审核中'}}
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
                :total="daiban1">
            </el-pagination>
          </el-main>
        </el-tab-pane>
      </el-tabs>
    </el-header>

      <!-- *****************新增流程弹窗********************* -->

      <el-dialog title="流程选择" v-model="lcpopup">
        <el-table :data="xzlc">
          <el-table-column prop="bgfwId" label="流程序号"/>
          <el-table-column prop="bgfwName" label="流程名称"/>
          <el-table-column prop="" label="流程步骤">
            <template #default="scope">
              <el-button type="success" plain size="mini" @click="qjpopup()">选择</el-button>
              <el-button type="primary" plain size="mini" @click="xilcpopub(scope.row)">查看流程步骤</el-button>
            </template>
          </el-table-column>
        </el-table>
        <template #footer>
				  <span class="dialog-footer">
				    <el-button type="info" plain="" @click="lcpopup = false">取 消</el-button>
				  </span>
        </template>
      </el-dialog>

      <!-- ******************流程子节弹窗******************* -->

      <el-dialog title="流程步骤" v-model="lczjpropup">
        <el-table :data="zijiedian">
          <el-table-column prop="bgfnSerial" label="流程序号"/>
          <el-table-column prop="bgfnDesignation" label="流程名称"/>
        </el-table>
        <template #footer>
				  <span class="dialog-footer">
				    <el-button type="info" plain="" @click="lczjpropup = false">取 消</el-button>
				  </span>
        </template>
      </el-dialog>

    <!-- ******************报销单弹窗******************* -->

      <el-dialog title="报销单" v-model="baoxiao">
        <el-form :model="bxdan">
          <el-form-item prop="bgetProposer" label="申请人" :label-position="labe" label-width="80px">
            <input v-model="bxdan.bgetProposer" />
          </el-form-item>
          <el-form-item prop="bgetMoney" label="报销金额" :label-position="labe" label-width="80px">
            <input v-model="bxdan.bgetMoney"/>
          </el-form-item>
          <el-form-item prop="bgetCause" label="备注" :label-position="labe" label-width="80px">
            <input v-model="bxdan.bgetCause"/>
          </el-form-item>
          <el-form-item prop="bgetTime" label="申请时间" :label-position="labe" label-width="80px">
            <el-date-picker v-model="bxdan.bgetTime" type="datetime" placeholder="选择日期"/>
          </el-form-item>
        </el-form>
        <template #footer>
				  <span class="dialog-footer">
				    <el-button type="info" plain="" @click="addbaoxiao()">确 定</el-button>
            <el-button type="info" plain="" @click="baoxiao = false">取 消</el-button>
				  </span>
        </template>
      </el-dialog>

      <el-dialog title="请假单" v-model="qingjia">
        <el-form>
          <el-form-item prop="" label="申请人" :label-position="labe" label-width="80px">
            <input />
          </el-form-item>
          <el-form-item prop="" label="部门" :label-position="labe" label-width="80px">
            <input />
          </el-form-item>
          <el-form-item prop="" label="报销金额" :label-position="labe" label-width="80px">
            <input />
          </el-form-item>
          <el-form-item prop="" label="备注" :label-position="labe" label-width="80px">
            <input />
          </el-form-item>
          <el-form-item prop="" label="申请时间" :label-position="labe" label-width="80px">
            <el-date-picker v-model="sj" type="date" placeholder="选择日期"/>
          </el-form-item>
        </el-form>
        <template #footer>
				  <span class="dialog-footer">
				    <el-button type="info" plain="" @click="addqingjia()">确 定</el-button>
            <el-button type="info" plain="" @click="qingjia = false">取 消</el-button>
				  </span>
        </template>
      </el-dialog>
  </div>
</template>

<script>
export default {
  data(){
    return{
      daiban:[],
      daiban1:[],
      xzlc:[],
      bxdan:{
        bgetId:'',
        bgetProposer:'',
        bgetMoney:'',
        bgetInvoice:'',
        bgetCause:'',
        bgetTime:'',
        bgetState:'',
      },
      lcpopup:false,//新增流程弹窗
      lczjpropup:false,//流程子节弹窗
      baoxiao:false,//报销单弹窗
      qingjia:false,//请假单弹窗
      zijiedian:[],
      labe:'right',//对齐form表单
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
    /*点击新增流程申请打开流程弹窗，从里面选择要申请的流程*/
    shenqing(){
      this.lcpopup = true;
      this.axios.get("http://localhost:8088/all-bgfwId").then(v=>{
        this.xzlc = v.data
      })
    },
    /*点击查看流程子节审批步骤*/
    xilcpopub(row){
      this.lczjpropup = true;
      this.axios({url:"http://localhost:8088/all-bgFlowEdition",params:{bgfnBgflowid:row.bgfwId}}).then((v)=>{
        this.zijiedian = v.data
      })
    },
    /*点击选择按钮，进入请假单或者报销单*/
    qjpopup(){
      this.baoxiao = true;
    },
    /*新增报销单*/
    addbaoxiao(){
      this.axios.post("http://localhost:8088/add-bgexpe",this.bxdan).then((v)=>{
        this.baoxiao = false
      }).catch(function (){

      })
    },
    /*新增请假单*/
    addqingjia(){

    },
    /*查看流程名称*/
    chakan(row){
      this.baoxiao = true;
      //this.axios.post("http://localhost:8088/select-bgexpen",params:{bgExpenseAccount:row.})
    },
    /*查看流程审批,待审批的*/
    show(){
      this.axios.post("http://localhost:8088/select-bgapr").then((v)=>{
        this.daiban = v.data
      })
      this.axios.post("http://localhost:8088/select-bgapr1").then((v)=>{
        this.daiban1 = v.data
      })
    }
  },
  created() {
    this.show()
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