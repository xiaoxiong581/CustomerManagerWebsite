<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <p>用户管理系统</p>
        </div>
        <el-form :model="loginForm" :rules="rules" ref="loginForm">
          <el-form-item prop="userName">
            <el-input v-model="loginForm.userName" placeholder="用户名">
              <span>dsfsf</span>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input type="password" placeholder="密码" v-model="loginForm.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="jumpRegister()" class="jump_register_btn">注册</el-button>
            <el-button type="primary" @click="submitForm('loginForm')" class="submit_btn">登陆</el-button>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
import rest from "@/backend/rest";
import customerManagerUrl from "@/backend/customerManagerUrl";
import session from "@/backend/session";

export default {
  data() {
    return {
      loginForm: {
        userName: "",
        password: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  // mounted() {
  //   if (session.isLogin) {
  //     this.$router.push("customer");
  //   }
  // },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          rest.post(customerManagerUrl.login_url_post, {
              userName: this.loginForm.userName,
              password: this.loginForm.password
            })
            .then(
              res => {
                if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: "登录成功"
                  });
                  session.setAuth(res.data.customerId, res.data.token);
                  let redirect = decodeURIComponent(this.$router.currentRoute.query.redirect || '/customer');
                  this.$router.push({path: redirect});
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
            message: "请输入正确的用户名密码",
            offset: 100
          });
          return false;
        }
      });
    },
    jumpRegister() {
      this.$router.push("register");
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../style/mixin";
.login_page {
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
  .wh(320px, 150px);
  .ctp(320px, 150px);
  padding: 25px;
  border-radius: 5px;
  text-align: center;
  background-color: #fff;
  .jump_register_btn {
    width: 40%;
    font-size: 16px;
  }
  .submit_btn {
    width: 40%;
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
