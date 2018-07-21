<template>
  <div>
    <div class="addPerson">
      <el-button type="success" @click="dialogFormVisible = true">添加成员</el-button>
    </div>
    <el-table
      :data="data"
      v-loading="loading2"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      element-loading-background="rgba(0, 0, 0, 0.8)"
      style="width: 100%"
      max-height="350">
      <el-table-column
        prop="_id"
        label="ID"
        width="250">  
      </el-table-column>
      <el-table-column
        prop="username"
        label="username"
        width="200">
      </el-table-column>
      <el-table-column
        prop="password"
        label="password"
        width="200">
      </el-table-column>
      <el-table-column
        label="操作"
        width="120">
        <div slot-scope="scope">
          <el-button
            @click.native.prevent="deleteRow(scope.$index, data)"
            type="text"
            size="small">
            删除
          </el-button>
        </div>
      </el-table-column>
    </el-table>

      <el-dialog title="Register" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="username" :label-width="formLabelWidth">
            <el-input v-model="form.name" auto-complete="off"></el-input>
          </el-form-item>
          <el-form-item label="password" :label-width="formLabelWidth">
            <el-input v-model="form.password" auto-complete="off"></el-input>
          </el-form-item>
        </el-form>
      <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">cancel</el-button>
    <el-button type="primary" 
    class="reg"
    @click="dialogFormVisible = false"><span @click="addAdmin">reg</span></el-button>
  </div>
</el-dialog>
  </div>
</template>

<script>
import http from "../../lib/httpclient";
export default {
  methods: {
    deleteRow(index, rows) {
      // rows.splice(index, 1);
      this.$confirm("是否删除此用户？", "注", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(rows[index]);
          http.post("/deleteUser", { id: rows[index]._id }).then(res => {
            console.log(res);
            if (res.status) {
              http.post("/allData").then(res => {
                this.data = res.data;
              });
              this.$message({
                type: "success",
                message: "删除成功!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    addAdmin(){
      http.post('/addAdmin',{username:this.form.name,password:this.form.password}).then((res)=>{
        console.log(res)
        if(res.status){
          this.$message({
          message: '成功添加用户',
          type: 'success'
        });
         this.data.push(res.data.res.data.ops[0]);
          // console.log(this.data)
        }else{
          this.$message.error('该用户已存在');
         
        }
       
      })
    }
  },

  data() {
    return {
      data: [],
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
  mounted() {
    http.post("/allData").then(res => {
      if (res.status) {
        this.data = res.data;
        this.loading2 = false;
      }
    });
  }
};
</script>

<style lang="scss">
section {
  .addPerson {
    padding: 10px 0 10px 50px;
    border-bottom: 1px solid #ccc;
  }
  .el-table {
    padding-left: 50px;
  }
  .reg{
    padding: 0;
    >span{
      >span{
      padding: 12px 20px;
      display: inline-block;
      }
    }
  }
  .el-loading-mask{
    min-width: 350px;
  }
}
</style>
