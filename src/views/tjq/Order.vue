<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="add" size="mini">新增</el-button>
      <el-button type="primary" size="mini">删除</el-button>
      <el-button type="primary" size="mini">刷新</el-button>
    </div>
    <el-container>
      <el-header height="40px">
        <el-form size="mini" :model="search" inline>
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
            <el-button type="primary" size="mini" @click="load">确定</el-button>
            <!--          <el-form-item size="mini">高级</el-form-item>-->
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">高级</el-button>
            <!--          <el-form-item size="mini">高级</el-form-item>-->
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"/>
          <el-table-column label="操作" width="200px">
            <template #default="scope">
              <el-button type="text" size="mini">删除</el-button>
              <el-button type="text" size="mini" >修改</el-button>
              <el-button type="text" @click="look(scope.row)" size="mini" >查看</el-button>
            </template>
          </el-table-column>

          <el-table-column prop="date" label="Date" width="180"/>
          <el-table-column prop="name" label="Name" width="180"/>
          <el-table-column prop="address" label="Address"/>
        </el-table>
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
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
      tableData: [],
      dialogVisible:false,//详情弹出
      grid:{//详情实体类

      },
      search:{},//搜索框
    }
  },
  methods:{
    //新增转跳页面 进行新增
    add(){
      this.$router.push({
        name:'orderAdd',
        params:{
          op:1,//判断是新增还是修改 1代表新增 2代表修改
        }
      })
    },
    load(){//加载所有数据

    },
    //查询详情
    look(){
      this.dialogVisible=true;
    }
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
