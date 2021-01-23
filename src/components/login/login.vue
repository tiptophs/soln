<!--
 * @Descripttion: 
 * @version: 
 * @Author: tiptop
 * @Date: 2020-07-27 21:34:44
 * @LastEditors: tiptop
 * @LastEditTime: 2020-08-16 22:09:43
-->
<template>
  <div class="login-container">
    <div class="login">
      <h2 class="login-title">
        <span>登入 soLn</span>
      </h2>
      <div class="login-content">
        <el-form
          :label-position="labelPosition"
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="80px"
        >
          <el-form-item label="邮箱" prop="account">
            <el-input
              type="account"
              v-model="ruleForm.account"
              autocomplete="off"
              placeholder="163@qq.com"
            ></el-input>
          </el-form-item>
          <el-form-item label="登入密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >登入</el-button
            >
            <el-button @click="register">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    // 验证字段
    const validateaccount = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入邮箱"));
      } else {
        const re = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/;
        if (!re.test(value)) {
          callback(new Error("邮箱格式错误"));
          return;
        }
        callback();
      }
    };
    // 验证密码
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("输入密码不能为空"));
        return;
      }
      callback();
    };
    return {
      labelPosition: "right",
      ruleForm: {
        account: "",
        password: "",
      },
      // 验证字段
      rules: {
        account: [{ validator: validateaccount, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
      },
    };
  },
  methods: {
    /** 提交数据 */
    submitForm(formName) {
      // eslint-disable-next-line consistent-return
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 请求数据
          this.$store.dispatch("user/login", this.ruleForm).then(
            () => {
              this.$router.push({ path: "/" });
            },
            (data) => {
              this.$message.error(data.prompt);
            }
          );
        }
      });
    },
    /** 进入注册界面 */
    register() {
      this.$router.push({ name: "register" });
    },
  },
};
</script>

<style scoped>
.login-container {
  background: url("./source/login.jpg");
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
}

.login {
  box-sizing: border-box;
  border: 1px solid #ddd;
  width: 460px;
  height: 280px;
  position: absolute;
  right: 240px;
  top: 180px;
  border-radius: 4px;
  background: #fff;
  padding: 0px 25px 15px 25px;
}

.login-title {
  text-align: right;
  position: relative;
  margin-bottom: 0px;
  color: #606266;
  margin-top: 30px;
}

.login-title span {
  text-align: center;
  border-bottom: 2px solid#909399;
  margin-bottom: 15px;
  display: inline-block;
  width: 120px;
}
</style>
