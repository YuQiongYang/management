<template>
    <div class="cart">
        <h1>{{name}}购物车信息</h1>
         <el-table :data="cart">
            <el-table-column 
            v-for="(val,key,i) in cart[0]"
            :property="key" :label="key">
    </el-table-column>
  </el-table>
    </div>
</template>

<script>
import http from "../../lib/httpclient";
export default {
  data() {
    return {
      name: "",
      cart: []
    };
  },
  mounted() {
    let username = window.localStorage.getItem("username");
    console.log(username);
    http.post("/seekbuycart", { username }).then(res => {
      this.name = res.data[0].username;
      this.cart = res.data[0].SpCart;
      console.log(this.cart);
    });
  }
};
</script>

<style lang="scss">
.cart{
    h1{
        text-align: center;
        color: #1ab394;
        margin-bottom: 30px;

    }
}

</style>
