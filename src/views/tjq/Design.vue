<template>
  <div>
    <div class="top">
      <el-button type="primary" @click="dialogaddVisible=true" size="mini">新增</el-button>
      <!--      <el-button type="primary" size="mini">删除</el-button>-->
      <el-button type="primary" @click="load" size="mini">刷新</el-button>
    </div>
    <el-container>
      <el-header height="40px">
        <el-form size="mini" inline :model="search">
          <el-form-item label="款式">
            <el-input type="text" v-model="search.designName"/>
          </el-form-item>
          <el-form-item label="厂商名称">
            <el-input type="text" v-model="search.factoryName"/>
          </el-form-item>
          <el-form-item label="品牌：">
            <el-input type="text" v-model="search.brandName"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="load" size="mini">确定</el-button>
          </el-form-item>
        </el-form>
      </el-header>
      <el-main>
        <el-table :data="tableData.slice((pageno-1)*pageSize,pageno*pageSize)"  style="width: 100%">
          <el-table-column type="selection" width="55"/>
          <el-table-column label="操作" width="200px">
            <template #default="scope">
              <!--              <el-button type="text" size="mini">删除</el-button>-->
              <el-button type="text" size="mini" @click="update(scope.row)">修改</el-button>
              <!--              <el-button type="text" @click="look(scope.row)" size="mini" >查看</el-button>-->
            </template>
          </el-table-column>
          <el-table-column prop="designId" label="编号" width="55px"></el-table-column>
          <el-table-column prop="ggBrand.ggFactory.factoryName" label="厂商名称"  width="120px"/>
          <el-table-column prop="ggBrand.brandName" label="品牌" width="120px" />
          <el-table-column prop="designName" label="款式"/>
        </el-table>
        <el-pagination background  hide-on-single-page @current-change="handChange"
                       layout="prev, pager, next" :page-size="pageSize" :total="tableData.length">
        </el-pagination>
      </el-main>
    </el-container>
    <el-dialog v-model="dialogaddVisible" title="新增">
      <el-form  :model="entity" label-width="100px" >
        <el-form-item label="厂商名称">
          <el-select v-model="entity.factoryId" placeholder="请选择厂商" @change="brandChange">
            <el-option v-for="v in paraup" :label="v.factoryName" :value="v.factoryId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="汽车品牌">
          <el-select v-model="entity.brandId" placeholder="请选择厂商">
            <el-option v-for="v in brands" :label="v.brandName" :value="v.brandId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="entity.designName" type="text"/>
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
        designId:undefined,
        designName:undefined,
        brandId:undefined
      },
      search:{},//搜索框
      pageSize:5,
      pageno:1,
      index:0,//判断是新增还是修改 0代表新增 1代表修改
      paraup:[],//工厂
      brands:[],//品牌
    }
  },
  methods:{
    //随着车辆厂商 的修改进行修改
    brandChange(){
      let $this=this;
      var v=this.paraup.find(function(p){
        return  p.factoryId==$this.entity.factoryId;
      });
      if(v){
        this.brands=[...v.ggBrands];
      }
    },
    loadup(){
      this.axios.get("http://localhost:8088/factory").then(v=>{
        if(v.status==200 && v.data!=null){
          /*this.tableData=v.data;*/
          this.paraup=v.data;
        }
      })
    },
    //开始修改
    update(val){
      this.index=1;
      this.dialogaddVisible=true;
      val.factoryId=val.ggBrand.ggFactory.factoryId
      this.entity={...val};
      this.brandChange();
    },
    //加载所有数据
    load(){
      this.axios.post("http://localhost:8088/design/show",this.search).then(v=>{
        if(v.status==200 && v.data!=null){
          this.tableData=v.data;
        }
      })
    },
    //确定新增
    submitForm(){
      var url="http://localhost:8088/design";
      if(this.index){
        url="http://localhost:8088/design/update"
      }
      console.log("参数",this.entity);
      this.axios.post(url,this.entity)
          .then(v=>{
            this.resetForm();
            this.load();
            this.index=0;
          })
    },
    //取消新增
    resetForm(){
      this.entity={//新增实体类
      }
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
    }
  },
  mounted() {
    this.load();
    this.loadup();
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
