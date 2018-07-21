<template>
    <div class="kinds">
        <div v-for="(val,key,i) in data" class="all_kinds" >
            <div class="total">
            <el-tag type="danger">{{key}}</el-tag>

            </div>
            <div class="shops">
              <el-tag type="success" v-for="(item,i) in val" :class="key">
              <router-link to="/management/kinds" @click.native="goKinds($event)">{{item.name}} </router-link></el-tag>    
            </div>

        </div>
    </div>
</template>

<script>
import http from "../../lib/httpclient";
import $ from 'jquery';

export default {
  data() {
    return {
      data: {}
    };
  },
  methods:{
      goKinds(e){
          console.log($(e.target).parent().hasClass('fruits'))
        let className = $(e.target).parent().attr('class')
        let type = $(e.target).text().trim();
        let kindsData = {type:type,className:className};
        window.localStorage.clear('type');
        window.localStorage.setItem('type',JSON.stringify(kindsData))
      }
  },
  mounted() {
    http.post("/kinds").then(res => {
      this.data = res.data[0];
      console.log(res);
    });
  }
};
</script>

<style lang="scss">
.kinds {
  width: 100%;
  .all_kinds {
    margin-bottom: 20px;
    border-bottom: 1px solid #ddd;
    padding: 20px 0;
    .total {
      width: 100%;
      display: flex;
      justify-content: center;
      margin-bottom: 10px;
    }
    .shops {
      display: flex;
      padding: 10px 0;
      justify-content: space-around;
      flex-wrap: wrap;
      span {
        display: block;
        padding: 0;
        a {
          display: block;
          width: 100%;
          height: 100%;
          padding: 0 10px;
        }
      }
    }
  }
}
</style>
