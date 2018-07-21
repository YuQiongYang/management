<template>
<div class="allUser">
    <div class="serach">
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
 <span @click="search">
<el-button type="primary" @click="dialogTableVisible = false ; search" icon="el-icon-search">
 搜索</el-button></span>
 <!-- <router-link to="/" @click="quit" >退出登陆</router-link> -->
 <span @click="quit" class="quit_sp" >退出登陆</span>
    </div>

  <el-dialog title="用户信息" :visible.sync="dialogTableVisible">
    <el-table :data="person">
    <el-table-column 
    v-for="(val,key,i) in person[0]"
    :property="key" :label="key" width="100px">
    </el-table-column>
  </el-table>
  <el-button type="primary" @click="cartsList" icon="el-icon-search">
 跳转到用户购物车</el-button>
</el-dialog>
    <el-table
      :data="data"
      v-loading="loading2"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%"
    @selection-change="handleSelectionChange">
      max-height="350">
      <el-table-column
        prop="_id"
        label="ID"
        width="120"
        show-overflow-tooltip>  
      </el-table-column>
      <el-table-column
        prop="username"
        label="username"
       >
      </el-table-column>
      <el-table-column
        prop="password"
        label="password"
        >
      </el-table-column>
      <el-table-column
        prop="address"
        label="address"
       >
      </el-table-column>
      <el-table-column
        prop="balance"
        label="balance"
       >
      </el-table-column>
        <el-table-column
        prop="nick"
        label="nick"
       >
      </el-table-column>
       <el-table-column
        prop="phone"
        label="phone"
       >  
      </el-table-column>
      <el-table-column
        prop="gender"
        label="gender"
       >
      </el-table-column>
      <el-table-column
        prop="youB"
        label="youB"
       >
      </el-table-column>

    </el-table>
  </div>
</template>

<script>
import http from "../../lib/httpclient";

export default {
  data() {
    return {
      data: [],
      goodslists: [],
      item: {},
      person: [],
      state1: "",
      loading2: true,
      dialogTableVisible: false,
      dialogFormVisible: false,
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    quit(){
      this.$confirm('你要走了吗？T_T', '小爱同学：', {
          confirmButtonText: '走走走',
          cancelButtonText: '唉！不走了',
          type: 'warning'
        }).then(() => {
          window.localStorage.clear()
          this.$router.push("/")
    
        })
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
    },
    cartsList() {
      http.post("/seekbuycart", { username: this.state1 }).then(res => {
        if (res.status) {
          window.localStorage.setItem("username", this.state1);
          this.$router.push({path:'/management/clientsDetails'})
        } else {
          this.$message({
            message: "此用户暂时还没有购物信息哦",
            type: "warning"
          });
        }
      });
    }
  },
  mounted() {
    http.post("/Allusers").then(res => {
      if (res.status) {
        this.goodslists = res.data.map(item => {
          return { value: item.username, label: item._id };
        });
        this.loading2 = false;
        this.data = res.data;
      }
      // console.log(this.data);
    });
  }
};
</script>

<style lang="scss">
.allUser {
  .serach {
    padding: 10px 0 10px 50px;
    border-bottom: 1px solid #ccc;
    display: flex;
    .el-input {
      width: 300px;
    }
    button {
      margin-left: 10px;

    }
    .quit_sp{
      margin-left: 20px;
      line-height: 45px;
      color: #333;
      font-weight: 700;
  
}
  }
}
.el-autocomplete-suggestion {
  top: 120px !important;
}
.el-dialog {
  width: 900px;
  overflow: hidden;
  .el-button {
    margin: 20px 0;
    float: right;
  }
}

</style>
