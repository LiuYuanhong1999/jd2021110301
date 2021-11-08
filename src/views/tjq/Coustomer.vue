<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="add" size="mini">新增</el-button>
      <el-button type="primary" @click="load" size="mini">刷新</el-button>
    </div>
    <el-container>
      <el-header height="40px">
        <el-form size="mini" :model="search" inline>
          <el-form-item label="客户编号：">
            <el-input v-model="search.cusNo" ></el-input>
          </el-form-item>
          <el-form-item label="客户名称：">
            <el-input v-model="search.cusName"></el-input>
          </el-form-item>
          <el-form-item label="客户类别：">
            <el-select v-model="search.ctId">
              <el-option v-for="v in courstomerTypes" :label="v.ctName" :value="v.ctId"/>
            </el-select>
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
        <el-table :data="tableData.slice((pageno-1)*pageSize,pageno*pageSize)" style="width: 100%">
          <el-table-column type="selection" width="55"/>
          <el-table-column label="操作" width="200px">
            <template #default="scope">
              <el-button type="text" size="mini"  v-if="scope.row.cusState=='跟踪中'" @click="update(scope.row)">修改</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="cusNo" label="编号" width="120"/>
          <el-table-column prop="cusName" label="客户名称" width="120"/>
          <el-table-column prop="cusCellphone" label="手机号码" width="120"/>
          <el-table-column prop="cusQq" label="qq" width="120"/>
          <el-table-column prop="cusPost" label="客户地址" width="120"/>
          <el-table-column prop="cusCellphone" label="手机号码" width="120"/>
          <el-table-column prop="ggCoustomertype.ctName" label="客户类别" width="120"/>
          <el-table-column prop="ggSource.sourceName" label="信息来源" width="120"/>
          <el-table-column prop="ggFactory.factoryName" label="意向厂商" width="120"/>
          <el-table-column prop="ggBrand.brandName" label="意向品牌" width="120"/>
          <el-table-column prop="ggColors.colorName" label="意向颜色" width="120"/>
          <el-table-column prop="cusFactor" label="考虑因素" width="120"/>
          <el-table-column prop="cusBudget" label="预算" width="120"/>
          <el-table-column prop="cusTime" :formatter="time" label="建档日期" width="140"/>
          <el-table-column prop="listNum" label="客户顾问" width="120"/>
          <el-table-column prop="cusState" label="客户状态" width="120"/>
        </el-table>
        <el-pagination background  hide-on-single-page @current-change="handChange" layout="prev, pager, next" :page-size="pageSize" :total="tableData.length">
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
      courstomerTypes:[],//客户类别
      search:{},//搜索框
      pageSize:5,
      pageno:1,
      details:{},//详情
    }
  },
  methods:{
    //修改客户
    update(val){
      this.$router.push({
        name:'addcoustomer',
        params:{
          op:2,//2代表修改
          entity:JSON.stringify(val)
        }
      })
    },
    //新增客户
    add(){
      this.$router.push({
        name:'addcoustomer',
        params:{
          op:1,//判断是新增还是修改 1代表新增 2代表修改
        }
      })
    },
    load(){//加载所有数据
      this.axios.post("http://localhost:8088/coustomer/show",this.search)
      .then(v=>{
        console.log("v",v)
        this.tableData=v.data;
      })
    },
    //查询详情
    look(val){
      this.details=val;
      this.dialogVisible=true;
    },
    time:function(row, column, state, index){
      return this.formatDate(state);
    },
    //分页，下一页
    handChange(val){
      this.pageno=val;
    },
    //加载客户类别
    loadCourstomerType(){
      this.axios.get("http://localhost:8088/coustomertype")
          .then(v=>{
            console.log("所有的客户类别",v)
            this.courstomerTypes=v.data
          })
    },
    //时间
    formatDate: function(value) {
      var date = new Date(value);
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours();
      var minutes = date.getMinutes();
      var sec = date.getSeconds()
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      if (hours < 10) {
        hours = '0' + hours;
      }
      if (minutes < 10) {
        minutes = '0' + minutes;
      }
      if (sec < 10) {
        sec = '0' + sec;
      }
      return year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + sec;
    },
  },mounted() {
    this.load();
    this.loadCourstomerType();
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
