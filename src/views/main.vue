<template>
  <div class="top">
    <el-button type="primary" size="mini">新增</el-button>
    <el-button type="primary" size="mini">删除</el-button>
    <el-button type="primary" size="mini">刷新</el-button>
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
          <!--          <el-form-item size="mini">高级</el-form-item>-->
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini">高级</el-button>
          <!--          <el-form-item size="mini">高级</el-form-item>-->
        </el-form-item>
      </el-form>
    </el-header>
    <el-container>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="Date" width="180"/>
          <el-table-column prop="name" label="Name" width="180"/>
          <el-table-column prop="address" label="Address"/>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </el-main>
    </el-container>
  </el-container>

</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          date: '2016-05-03',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-02',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-04',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
        {
          date: '2016-05-01',
          name: 'Tom',
          address: 'No. 189, Grove St, Los Angeles',
        },
      ],
    }
  }
}
</script>

<style scoped>
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