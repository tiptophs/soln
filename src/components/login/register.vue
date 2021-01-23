<template>
  <div class="register-container">
    <div class="register">
      <h2 class="register-title">
        <span>注册 soLn</span>
      </h2>

      <div class="register-content">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="70px"
        >
          <el-form-item label="昵称" prop="name">
            <el-input
              type="text"
              v-model="ruleForm.name"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="email"
              v-model="ruleForm.email"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="电话号码" prop="phone">
            <el-input v-model.number="ruleForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="ruleForm.password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="confirm_password">
            <el-input
              type="password"
              v-model="ruleForm.confirm_password"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="toLogin">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { postData } from "@/utils/request.js";

export default {
  data() {
    const pigCheck = (rule, value, callback) => {
      if (!value) {
        callback(new Error("昵称不能为空,汉字/字母/数字"));
      } else {
        const re = /^[\u4E00-\u9FA5A-Za-z0-9_]+$/;
        if (!re.test(value)) {
          callback(new Error("昵称格式错误"));
          return;
        }
        if (!(String(value).length >= 2 && String(value).length <= 10)) {
          callback(new Error("昵称长度错误"));
          return;
        }
        callback();
      }
    };
    const validateEmail = (rule, value, callback) => {
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
    const validatePhone = (rule, value, callback) => {
      if (value) {
        const re = /^1[3-9]\d{9}$/;
        if (!re.test(value)) {
          callback(new Error("手机格式错误"));
          return;
        }
      }
      callback();
    };
    const validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        callback();
      }
    };
    const validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.ruleForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        email: "",
        phone: "",
        password: "",
        confirm_password: "",
      },
      rules: {
        name: [{ validator: pigCheck, trigger: "blur" }],
        email: [{ validator: validateEmail, trigger: "blur" }],
        phone: [{ validator: validatePhone, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        confirm_password: [{ validator: validatePass2, trigger: "blur" }],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 请求数据
          postData("/index/login/register", this.ruleForm).then((data) => {
            if (data.status) {
              this.$message({
                message: "账号创建成功，马上去登陆吧...",
                type: "success",
                duration: 5 * 1000,
              });
              this.$router.push("/login");
            } else {
              this.$message({
                message:
                  data.prompt || "你的请求已经消失在二次元, 请稍后重试...",
                type: "error",
                duration: 5 * 1000,
              });
            }
          });
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /** 登录界面 */
    toLogin() {
      this.$router.push({ name: "login" });
    },
  },
};
</script>

<style scoped>
.register-container {
  width: 100%;
  height: 100%;
  background: url("./source/register.jpg");
  background-size: 100% 100%;
}

.register {
  width: 380px;
  height: 460px;
  border-radius: 4px;
  border: 1px solid #ddd;
  box-sizing: border-box;
  position: absolute;
  right: 240px;
  top: 180px;
  background: #fff;
  padding: 0px 25px 15px 25px;
}

.register-title {
  text-align: right;
  position: relative;
  margin-bottom: 0px;
  color: #606266;
  margin-top: 30px;
}

.register-title span {
  text-align: center;
  border-bottom: 2px solid#909399;
  margin-bottom: 15px;
  display: inline-block;
  width: 120px;
}
</style>
