<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="dialogaddVisible=true" size="mini">新增</el-button>
      <!--      <el-button type="primary" size="mini">删除</el-button>-->
      <el-button type="primary" @click="load" size="mini">刷新</el-button>
    </div>
    <el-container>
<!--      <el-header height="40px">
        <el-form size="mini" inline :model="search">
          <el-form-item label="名称：">
            <el-input type="text" v-model="search.ctName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="load" size="mini">确定</el-button>
          </el-form-item>
        </el-form>
      </el-header>-->
      <el-main>
        <el-table :data="tableData.slice((pageno-1)*pageSize,pageno*pageSize)"  style="width: 100%">
          <el-table-column type="selection" width="55"/>
<!--          <el-table-column label="操作" width="70">
            <template #default="scope">
              <el-button type="text" size="mini" @click="update(scope.row)">修改</el-button>
            </template>
          </el-table-column>-->
          <el-table-column prop="logId" label="编号" width="55px"></el-table-column>
          <el-table-column prop="logTime" :formatter="time"  label="日期" />
          <el-table-column prop="sellCoustomer.cusName" label="接待人" />
          <el-table-column prop="logState" :formatter="logState" label="状态" />
          <el-table-column prop="ggArchive.acCause" label="分类归档"/>
          <el-table-column prop="logType" label="沟通类型" />
          <el-table-column prop="logContext" label="沟通内容" show-overflow-tooltip/>

        </el-table>
        <el-pagination background  hide-on-single-page @current-change="handChange" layout="prev, pager, next" :page-size="pageSize" :total="tableData.length">
        </el-pagination>
      </el-main>
    </el-container>
    <!--    <el-dialog v-model="dialogVisible" title="详情">
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
        </el-dialog>-->
    <el-dialog v-model="dialogaddVisible" title="新增">
      <el-form  :model="entity" label-width="100px" :rules="rules">
        <el-form-item label="客户编号">
          <el-input v-model="entity.cusNo" readonly type="text"/>
        </el-form-item>
<!--        <el-form-item label="接待人">
          <el-input v-model="entity.listNum"></el-input>
        </el-form-item>-->
        <el-form-item label="状态">
<!--          <el-input v-model="entity.logState"></el-input>-->
          <el-select v-model="entity.logState">
            <el-option label="交易成功" value="1"></el-option>
            <el-option label="交易失败" value="0"/>
          </el-select>
        </el-form-item>
        <el-form-item label="分类归档">
<!--          <el-input v-model="entity.acId"></el-input>-->
          <el-select v-model="entity.acId">
            <el-option v-for="v in  archives" :label="v.acCause" :value="v.acId"/>
          </el-select>
        </el-form-item>
        <el-form-item label="沟通类型">
          <el-select v-model="entity.logType">
            <el-option label="面聊" value="面聊"></el-option>
            <el-option label="电话聊" value="电话聊"/>
            <el-option label="QQ聊" value="QQ聊"></el-option>
            <el-option label="微信聊" value="微信聊"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="沟通内容">
          <el-input v-model="entity.logContext" type="textarea"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">确定</el-button>
          <el-button @click="resetForm">取消</el-button>
        </el-form-item>
      </el-form>
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
      dialogaddVisible:false,//新增弹出
      entity:{//新增实体类
      },
      rules:{
        logState:[{required:true,message:'状态不能为空',trigger:'blur'}],
        logType:[{required:true,message:'沟通类型不能为空',trigger:'blur'}],
        logContext:[{required:true,message:'沟通内容不能为空',trigger:'blur'}]
      },

      search:{},//搜索框
      pageSize:5,
      pageno:1,
      index:0,//判断是新增还是修改 0代表新增 1代表修改
      archives:[],//归档类型
    }
  },
  methods:{
    //开始修改
    update(val){
      this.index=1;
      this.dialogaddVisible=true;
      this.entity=val;
    },
    //确定新增
    submitForm(){
      let s=JSON.parse(localStorage.getItem("loginuser"))
      var s1 = s.slice(1,-1);
      this.entity.listNum=s1;
      var url="http://localhost:8088/logs";
      if(this.index){
        url="http://localhost:8088/logs/update"
      }
      this.axios.post(url,this.entity)
          .then(v=>{
            if(this.entity.logState==1){
              this.$router.replace("/order")
              return;
            }
            this.resetForm();
            this.load();
            this.index=0;
          })
    },
    loadf(){
      var com=this.$route.params.com;
      if(com==undefined){
        this.$router.replace("/visitorlogsCourstomer");
        return;
      }
      var cc=JSON.parse(com);
      console.log("请输入",com)
      this.entity.cusId=cc.acId;
      this.entity.cusNo=cc.cusNo;
      this.search.cusId=cc.acId;
    },
    //加载所有数据
    load(){
      this.axios.post("http://localhost:8088/logs/show",this.search).then(v=>{
        if(v.status==200 && v.data!=null){
          console.log("v",v);
          this.tableData=v.data;
        }
      })
    },
    //加载所有销售归档原因的数据
    loadGgArchive(){
      this.axios.post("http://localhost:8088/ggarchive/show",{acType:2})
      .then(v=>{
        this.archives=v.data;
      })
    },
    //取消新增
    resetForm(){
      var e={...this.entity}
      this.entity={//新增实体类
        cusNo:e.cusNo,
        cusId:e.cusId
      },
          this.index=0;
      this.dialogaddVisible=false;
    },
    //查询详情
    look(){
      this.dialogVisible=true;
    },
    //当前页
    handChange(val){
      this.pageno=val;
    },
    logState:function(row, column, state, index){
      if(state==0) return "交易失败"
      if(state==1) return "交易成功"
    },
    time:function(row,column,state,index){
      return this.formatDate(state);
    },

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
  },
  mounted() {
    this.loadf();
    this.load();
    this.loadGgArchive();
  }
}
</script>

<style scoped>
.el-select{
  display: inline;
}
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
