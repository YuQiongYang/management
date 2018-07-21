<template>
    <div class="login ">
       <form>
            <div class="form-group">
                <label for="username">User</label>
                <input type="text" class="form-control" id="username" v-model="user" placeholder="user">
            </div>
            <div class="form-group">
                <label for="password">Password</label>
                <input type="password" class="form-control" id="password" v-model="psd" placeholder="Password">
            </div>
            <input type ="button" class="btn btn-default" value="login" @click="login">
          </form>
    </div>                                 
</template>

<script>
// import bootstrap from 'bootstrap';
import http from "../../lib/httpclient";

export default {
  data() {
    return {
      user: "",
      psd: ""
    };
  },
  methods: {
    login() {
      http
        .post("/admin", {
          username: this.user,
          password: this.psd
        })
        .then(res => {
          if (res.status) {
            this.$router.push("/management/clients");
            window.localStorage.setItem('management',res.message);
          } else {
            this.$message.error("用户名或密码错误");
          }
        });
    }
  },
  mounted() {}
};
</script>


<style lang="scss">
html,
body {
  height: 100%;
  #yiguo {
    height: 100%;
  }
}
.login {
  width: 100%;
  height: 100%;
  position: relative;
  form {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 400px;
    height: 400px;
    padding: 30px;
    border: 1px solid #ddd;
    box-shadow: 10px 10px 20px pink;
  }
}
</style>