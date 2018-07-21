<template>
   <div class="supplier">
    <el-table :data="data">
    <el-table-column 
    v-for="(val,key,i) in data[0]"
    :prop="key" :label="key" width="220px">
    </el-table-column>
    </el-table>
    
   </div>
  
</template>

<script>
import http from '../../lib/httpclient';
export default {
    data(){
      return{
          data:[],
          dialogTableVisible: false,
      }  
    },
    mounted(){
        http.post('/supplier').then(res=>{
            this.data = res.data;
            console.log(this.data[0] )
        })
    }
}
</script>
