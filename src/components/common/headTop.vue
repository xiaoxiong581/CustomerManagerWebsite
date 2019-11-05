<template>
  <div class="header_container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/customer' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item
        v-for="(item, index) in this.$router.currentRoute.meta.menu"
        :key="index"
      >{{item}}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-dropdown @command="handleCommand" menu-align="start">
      <span class="el-dropdown-link">
        操作
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="logout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
import rest from "@/backend/rest";
import customerManagerUrl from "@/backend/customerManagerUrl";
import session from "@/backend/session";

export default {
  methods: {
    handleCommand(command) {
      if (command == "logout") {
        rest
          .post(customerManagerUrl.logout_url_post, {
            customerId: session.getCustomerId(),
            token: session.getToken()
          })
          .then(
            res => {
              if (res.code == 0) {
                this.$message({
                  type: "success",
                  message: "退出成功"
                });
                session.logout();
                this.$router.push("/login");
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
      }
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
.header_container {
  background-color: #eff2f7;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 20px;
}
.avator {
  .wh(36px, 36px);
  border-radius: 50%;
  margin-right: 37px;
}
.el-dropdown-menu__item {
  text-align: center;
  line-height: 25px;
}
</style>