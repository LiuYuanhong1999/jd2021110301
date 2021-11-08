<template>
  <div>
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
          <el-table-column prop="storageId" label="入库编号" width="120"/>
          <!--      <el-table-column prop="ggBrand.brandName" label="编号" width="80"/>-->
          <el-table-column prop="ggBrand.brandName" label="汽车品牌"/>
          <el-table-column prop="ggDesign.designName" label="汽车款式" width="150"/>
          <el-table-column prop="ggColor.colorName" label="车身颜色"/>
          <el-table-column prop="storageLeaveTime" label="出厂时间" width="120"/>
          <el-table-column prop="storageBegain" label="初登时间" width="120"/>
          <el-table-column prop="storageCard" label="车牌号"/>
          <el-table-column prop="storageMileage" label="行驶里程"/>
          <el-table-column prop="storageDisplacement" label="排量"/>
          <el-table-column prop="storageType" label="燃油种类"/>
          <el-table-column prop="storageDrive" label="是否四轮驱动"/>
          <el-table-column prop="storageEngine" label="发动机"/>
          <el-table-column prop="storageTap" label="档位形式"/>
          <el-table-column prop="storageTransferTimes" label="过户次数"/>
          <el-table-column prop="storagePrcie" label="销售价格"/>
          <el-table-column prop="storageUser" label="操作人"/>
          <el-table-column prop="storageTime" label="入库时间" width="120"/>
          <el-table-column prop="storageState" label="入库类型">
            <template #default="scope">
              <template v-if="scope.row.storageState =='0'">
                  收车入库
              </template>

              <template v-if="scope.row.storageState =='1'">
                初始入库
              </template>
            </template>


          </el-table-column>
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
      this.axios.get("http://localhost:8088/find-clInventoryRecord")
          .then((v) => {
            this.tableDate = v.data;
          })
    },


    //跳转新增
    add(){
      this.$router.push({
        path: '/AddStorage'
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
