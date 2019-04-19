<template>
  <div class="login">
    <div class="login-form">
      <el-form label-position="right" label-width="80px" :model="formObj">
        <el-form-item label="用户名">
          <el-input v-model="formObj.name"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input v-model="formObj.password"></el-input>
        </el-form-item>
        <el-form-item label="重复密码" v-if="isRegistered">
          <el-input v-model="formObj.passwordAgain"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submit('ruleForm')">{{leftText}}</el-button>
          <el-button type="primary" @click="registered">{{rightText}}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      leftText: "登陆",
      rightText: "注册",
      isRegistered: false,
      formObj: {
        name: "",
        password: "",
        passwordAgain: ""
      }
    };
  },
  methods: {
    submit() {},
    reset() {},
    registered() {
      this.isRegistered = !this.isRegistered;
      if (this.isRegistered) {
        this.leftText = "注册";
        this.rightText = "返回";
      } else {
        this.leftText = "登陆";
        this.rightText = "注册";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.login {
  width: 100vw;
  display: flex;
  justify-content: center;
  .login-form {
    width: 50vw;
  }
}
</style>
