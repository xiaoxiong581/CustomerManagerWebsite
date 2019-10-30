<template>
  <div class="register_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <el-form :model="registerForm" :rules="rules" ref="registerForm">
          <el-form-item prop="userName">
            <el-input v-model="registerForm.userName" placeholder="用户名"></el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input type="email" v-model="registerForm.email" placeholder="邮箱"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="registerForm.password"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="确认密码" v-model="registerForm.againPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="registerCustomer('registerForm')"
              class="register_btn"
            >注册</el-button>
            <li>
              <router-link :to="{name:'login'}">已有账号，请登录</router-link>
            </li>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import { post } from "@/backend/rest";
import { register_url_post } from "@/backend/customerManagerUrl";

export default {
  data() {
    return {
      registerForm: {
        userName: "",
        email: "",
        password: "",
        againPassword: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        email: [
          { required: true, message: "请输入邮箱", trigger: "blur" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    registerCustomer(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          post(register_url_post, {
            customerName: this.registerForm.userName,
            email: this.registerForm.email,
            password: this.registerForm.password
          }).then(
            res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "注册成功"
                });
                this.$router.push({
                  name: "customerdetail",
                  params: { customerInfo: res.data }
                });
              } else {
                this.$message({
                  type: "error",
                  message: res.message
                });
              }
            },
            error => {
              this.$message({
                type: "error",
                message: error
              });
            }
          );
        } else {
          this.$notify.error({
            title: "错误",
            message: "请输入正确的注册信息",
            offset: 100
          });
          return false;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin";
.register_page {
  background-color: #324057;
}
.manage_tip {
  position: absolute;
  width: 100%;
  top: -100px;
  left: 0;
  p {
    font-size: 34px;
    color: #fff;
  }
}
.form_contianer {
  .wh(320px, 300px);
  .ctp(320px, 300px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .register_btn {
    width: 100%;
    font-size: 16px;
  }
}
.tip {
  font-size: 12px;
  color: red;
}
.form-fade-enter-active,
.form-fade-leave-active {
  transition: all 1s;
}
.form-fade-enter,
.form-fade-leave-active {
  transform: translate3d(0, -50px, 0);
  opacity: 0;
}
</style>