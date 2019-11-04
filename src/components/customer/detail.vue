<template>
  <div class="fillcontain">
    <head-top></head-top>
    <header class="customerdetail_title">用户详情</header>
    <div class="customerdetail">
      <ul>
        <li>
          <span>用户名称：</span>
          <span>{{customerInfo.customerName}}</span>
        </li>
        <li>
          <span>用户ID：</span>
          <span>{{customerInfo.customerId}}</span>
        </li>
        <li>
          <span>邮箱：</span>
          <span>{{customerInfo.email}}</span>
        </li>
        <li>
          <span>用户状态：</span>
          <span>{{customerInfo.status}}</span>
        </li>
        <li>
          <span>创建时间：</span>
          <span>{{customerInfo.createTime}}</span>
        </li>
        <li>
          <span>更新时间：</span>
          <span>{{customerInfo.updateTime}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import rest from "@/backend/rest";
import customerManagerUrl from "@/backend/customerManagerUrl";
import customerStatus from "@/backend/customerStatus";
import session from "@/backend/session";
import moment from "moment";
import headTop from "@/components/common/headTop";

export default {
  data() {
    return {
      customerInfo: {
        customerName: "yangzhixiong",
        customerId: "",
        email: "",
        status: -1,
        email: "yangzhixiong@migu.cn",
        createTime: "2019-10-29 14:12:00",
        updateTime: "2019-10-29 14:12:00"
      }
    };
  },
  components: {
    headTop
  },
  activated() {
    this.initData();
  },
  methods: {
    initData() {
      try {
        this.getCustomerInfo();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    getCustomerInfo() {
      rest
        .get(
          customerManagerUrl.customerlist_url_get +
            "/" +
            session.getCustomerId(),
          null
        )
        .then(
          res => {
            if (res.code == 0) {
              this.customerInfo.customerName = res.data.customerName;
              this.customerInfo.customerId = res.data.customerId;
              this.customerInfo.email = res.data.email;
              this.customerInfo.status =
                customerStatus.convert.boolean[res.data.status];
              this.createTime = moment(res.data.createTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
              this.customerInfo.updateTime = moment(res.data.updateTime).format(
                "YYYY-MM-DD HH:mm:ss"
              );
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
};
</script>

<style lang="less">
@import "../../style/mixin";
.explain_text {
  margin-top: 20px;
  text-align: center;
  font-size: 20px;
  color: #333;
}
.customerdetail {
  width: 60%;
  background-color: #f9fafc;
  min-height: 400px;
  margin: 20px auto 0;
  border-radius: 10px;
  ul > li {
    padding: 20px;
    span {
      color: #666;
    }
  }
}
.customerdetail_title {
  margin-top: 20px;
  .sc(24px, #666);
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  margin-top: 10px;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #20a0ff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  line-height: 120px;
  text-align: center;
}
.avatar {
  width: 120px;
  height: 120px;
  display: block;
}
</style>