<template>
  <div>
    <div class="top">

      <el-button type="primary" size="mini" @click="add()">新增</el-button>
    </div>
    <el-container>
      <el-header height="40px">
        <el-form size="mini" inline>
          <el-form-item label="名称：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="厂商名称：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item label="厂商名称：">
            <el-input></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">确定</el-button>

          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">高级</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table :data="tableDate.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%">
          <el-table-column type="selection" width="55"/>
          <el-table-column prop="ordersId" label="编号" width="120px"/>
          <el-table-column prop="clRecord.recordId" label="编号" width="120px"/>
          <el-table-column prop="clRecord.ggBrand.brandName" label="汽车品牌"/>
          <el-table-column prop="clRecord.ggDesign.designName" label="汽车款式"/>
          <el-table-column prop="clRecord.ggColor.colorName" label="车身颜色"/>
          <el-table-column prop="clRecord.recordLeaveTime" label="出厂时间" width="120"/>
          <el-table-column prop="clRecord.recordVariator" label="变速器"/>
          <el-table-column prop="clRecord.recordDisplacement" label="排量"/>
          <el-table-column prop="clRecord.recordMileage" label="行驶里程"/>
          <el-table-column prop="clRecord.recordBegain" label="初登时间" width="120"/>
          <el-table-column prop="clRecord.recordName" label="车主姓名"/>
          <el-table-column prop="clRecord.contactName" label="联系人姓名"/>
          <el-table-column prop="clRecord.contactPhone" label="联系人号码" width="120"/>
          <el-table-column prop="clRecord.contactPhone" label="联系人邮箱" width="120"/>
          <el-table-column prop="clRecord.recordPrice" label="预售价格"/>
          <el-table-column prop="clRecord.recordTime" label="咨询时间" width="120"/>
          <el-table-column prop="clRecord.recordWay" label="咨询方式"/>
          <el-table-column prop="ordersState" label="车辆状态">
            <template #default="scope">

              <template v-if="scope.row.ordersState =='1'">
                评估
              </template>

              <template v-if="scope.row.ordersState ==2">
                失败
              </template>

            </template>


          </el-table-column>
          <el-table-column prop="ordersUser" label="接待人"/>
          <el-table-column prop="ordersType" label="预约状态"/>
          <el-table-column prop="ordersTime" label="预约时间" width="120"/>
          <el-table-column prop="ordersMethdo" label="评估方式"/>
          <el-table-column prop="ggArchive.acCause" label="归档原因"/>
        </el-table>

        <!--分页-->
        <div class="fy_div">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[5, 10, 20, 40]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableDate.length">
          </el-pagination>
        </div>
      </el-main>
    </el-container>
    <el-dialog v-model="dialogVisible" title="详情">
      <el-descriptions
          class="margin-top"
          :column="2"
          :size="mini"
          border >
        <el-descriptions-item label="姓名：">
          张三
        </el-descriptions-item>
        <el-descriptions-item label="金额">
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="年龄">
          Suzhou
        </el-descriptions-item>
        <el-descriptions-item label="就读学校">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="家庭住址">
          株洲市茶陵县MM村MM组EE户
        </el-descriptions-item>
      </el-descriptions>
    </el-dialog>

  </div>
</template>

<script>
export default {
  data() {
    return {
      //表格数据
      tableDate: [],
      dialogVisible:false,//详情弹出
      grid:{//详情实体类
      },

      currentPage:1, //初始页
      pagesize:10,    //    每页的数据


    }
  },
  methods:{
    //查询详情
    look(){
      this.dialogVisible=true;
    },
    initDate(){
      this.axios.get("http://localhost:8088/find-clOrders2")
          .then((v) => {
            this.tableDate = v.data;
          })
    },


    //跳转新增
    add(){
      this.$router.push({
        path: '/AddOrders'
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
    this.initDate();
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
