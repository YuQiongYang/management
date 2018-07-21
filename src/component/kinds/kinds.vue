<template>
<div class="goodslist"> 
     <div class="addPerson">
       <el-row class="demo-autocomplete">
      <el-col :span="12">
        <el-autocomplete
          class="inline-input"
          v-model="state1"
          :fetch-suggestions="querySearch"
          placeholder="请输入关键字"
          @select="handleSelect"
        ></el-autocomplete>
      </el-col>
</el-row>
      <el-button type="danger" @click="deletedGoods">删除</el-button>
    </div>
    <el-table
    ref="multipleTable"
    :data="datalist"
    v-loading="loading2"
    element-loading-text="拼命加载中"
    element-loading-spinner="el-icon-loading"
    element-loading-background="rgba(0, 0, 0, 0.8)"
    tooltip-effect="dark"
    style="width: 100%"
     height="580"
     @row-click="openDetails"
    @selection-change="handleSelectionChange">
    <el-table-column 
      type="selection"
      width="55">
    </el-table-column>
    <el-table-column
      label="产品id"
      width="150"
      show-overflow-tooltip>
      
      <template slot-scope="scope">{{ scope.row.CommodityId }}</template>
    </el-table-column>  
    <el-table-column
      prop="CommodityName"
      label="产品名称"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="PromotionTag"
      label="优惠信息"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="SubTitle"
      label="产品标题"
      width="120"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="MaxLimitCount"
      label="最大购买数"
      width="50"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="OriginalPrice"
      label="原价"
      width="60"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="SellPrice"
      label="优惠价格"
      width="60"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="SmallPic"
      label="图片路径"
      width="200"
      show-overflow-tooltip>
    </el-table-column>
    <el-table-column
      prop="shelfDate"
      label="生产日期"
      width="120"
      >
    </el-table-column>
    <el-table-column
        label="操作"
        width="120">
        <div slot-scope="scope">
        <el-button type="primary" icon="el-icon-edit" @click="dialogFormVisible = true" 
        @click.native.prevent="edit(scope.$index, datalist)" circle></el-button>
        </div>
      </el-table-column>
  </el-table>
<el-dialog :title="title" :visible.sync="dialogFormVisible">
        <el-form :model="form">
           <el-form-item label="id" :label-width="formLabelWidth">
            <el-input v-model="tableName._id"  auto-complete="off" disabled></el-input>
          </el-form-item>
          <el-form-item label="CommodityName" :label-width="formLabelWidth">
            <el-input v-model="tableName.CommodityName" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="PromotionTag" :label-width="formLabelWidth">
            <el-input v-model="tableName.PromotionTag" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="SubTitle" :label-width="formLabelWidth">
            <el-input v-model="tableName.SubTitle" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="MaxLimitCount" :label-width="formLabelWidth">
            <el-input v-model="tableName.MaxLimitCount" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="OriginalPrice" :label-width="formLabelWidth">
            <el-input v-model="tableName.OriginalPrice" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="SellPrice" :label-width="formLabelWidth">
            <el-input v-model="tableName.SellPrice" auto-complete="off"></el-input>
          </el-form-item>
           <el-form-item label="SmallPic" :label-width="formLabelWidth">
            <el-input v-model="tableName.SmallPic" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false"><span @click="cancel">cancel</span></el-button>
    <el-button type="primary" 
    class="reg"
    @click="dialogFormVisible = false"><span @click="editGoods">edit</span></el-button>
  </div>
</el-dialog>
</div>
     
</template>

<script>
import http from "../../lib/httpclient";

export default {
  data() {
    return {
      datalist: [],
      multipleSelection: [],
      loading2: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
      goodslists:[],
       person: [],
       item: {},
       state1: "",
      title: "",
      tableName: "",
      goodsId: [],
      form: {
        name: "",
        password: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    deletedGoods() {
      let className = JSON.parse(window.localStorage.getItem("type")).className;
      if (this.multipleSelection.length > 0) {
        this.$confirm("是否删除此数据？", "注", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(() => {
          http
            .post("/deleteGoods", {
              data: JSON.stringify(this.multipleSelection),
              type: className.slice(23)
            })
            .then(res => {
              if (res.status) {
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
              console.log(res);
            })
            .catch(() => {
              this.$message({
                type: "info",
                message: "已取消删除"
              });
            });
        });
      } else {
        this.$message({
          message: "你还没有选中商品哦",
          type: "warning"
        });
      }
    },
    cancel() {
      this.$message({
        type: "info",
        message: "已取消编辑!"
      });
    },
    openDetails(row) {},
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    edit(i, datas) {
      this.title = datas[i].CommodityName;
      this.tableName = datas[i];
      // console.log(datas[i].CommodityName)
    },
    editGoods() {
      let className = JSON.parse(window.localStorage.getItem("type")).className;
      http
        .post("/updateGoods", {
          updateData: JSON.stringify(this.tableName),
          type: className.slice(23)
        })
        .then(res => {
          console.log(res);
          if (res.status) {
            this.$message({
              type: "success",
              message: "编辑成功!"
            });
          } else {
            this.$message({
              type: "info",
              message: "编辑失败!"
            });
          }
        });
    },
    querySearch(queryString, cb) {
      var goodslists = this.goodslists;
      var results = queryString
        ? goodslists.filter(this.createFilter(queryString))
        : goodslists;
      // 调用 callback 返回建议列表的数据
      // console.log(results);
      cb(results);
    },
    createFilter(queryString) {
      return lists => {
        return (
          lists.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    handleSelect(item) {
      this.item = item;
    },
    search() {
      if (this.state1 == "") {
        this.$message({
          message: "您还没有输入关键字哦！",
          type: "warning"
        });
      } else {
        http
          .post("/cruxSeek", { id: this.item.label, type: "user" })
          .then(res => {
            if (res.status) {
              this.dialogTableVisible = true;
              this.person = res.data;
              // console.log(this.person);
            } else {
              this.$message({
                message: "您还没有输入关键字哦！",
                type: "warning"
              });
            }
          });
      }
    }
  },
  mounted() {
    let type = JSON.parse(window.localStorage.getItem("type"));
    // console.log(type);
    if (type.className.indexOf("fruits") > 0) {
      //   console.log(666);
      http.post("/goodslist").then(res => {
        if (res.status) {
          this.goodslists = res.data.map(item => {
            console.log(item.CommodityName)
            return { value: item.CommodityName, label: item._id };
          });
          this.loading2 = false;
          if (type.type == "全部") {
            this.datalist = res.data;
          } else {
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].CommodityName.indexOf(type.type) > 0) {
                this.datalist.push(res.data[i]);
              }
            }
          }
        }
        // console.log(this.datalist);
      });
    } else if (type.className.indexOf("meat") > 0) {
      http.post("/meat_goodsData").then(res => {
        if (res.status) {
          this.loading2 = false;
          if (type.type == "全部") {
            this.datalist = res.data;
          } else {
            for (let i = 0; i < res.data.length; i++) {
              if (String(res.data[i].CommodityTag) == type.type) {
                this.datalist.push(res.data[i]);
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style lang='scss'>
.addPerson {
  padding: 10px 50px 10px 50px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
  .demo-autocomplete{
    float: right;
    width: 300px; 
  }
  .el-col{
    width: 300px;
    .el-autocomplete{
      width: 100%;
    }
  }
  .el-button{
    float: left;
    margin-left: 10px;
  }

}
.el-form-item {
  margin-bottom: 10px;
}
.el-autocomplete-suggestion{
  top: 120px !important;
}
</style>
