<template>
  <div class="fillcontain">
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column property="customerName" label="用户名" width="220"></el-table-column>
        <el-table-column property="status" label="用户状态" width="220"></el-table-column>
        <el-table-column property="email" label="用户邮箱" width="220"></el-table-column>
        <el-table-column property="createTime" label="创建时间" width="220"></el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="count"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { post } from "@/backend/rest";
import { customerlist_url_get } from "@/backend/customerManagerUrl";
import moment from 'moment'

export default {
  data() {
    return {
      tableData: [
        {
          customerName: "yangzhixiong",
          status: -1,
          email: "yangzhixiong@migu.cn",
          createTime: "2019-10-29 14:12:00"
        },
        {
          customerName: "yangzhixiong1",
          status: -1,
          email: "yangzhixiong1@migu.cn",
          createTime: "2019-10-29 14:12:00"
        }
      ],
      currentRow: null,
      pageSize: 10,
      count: 0,
      currentPage: 1
    };
  },
  created() {
    this.initData();
  },
  methods: {
    initData() {
      try {
        this.getUsers();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getUsers();
    },
    getUsers() {
      post(customerlist_url_get, {
        pageNo: this.currentPage,
        pageSize: this.pageSize
      }).then(
        res => {
          if (res.code == 0) {
            this.count = res.data.totalCount;
            this.tableData = [];
            res.data.customers.forEach(item => {
              const tableData = {};
              tableData.customerName = item.customerName;
              tableData.status = item.status;
              tableData.email = item.email;
              tableData.createTime = moment(item.createTime).format('YYYY-MM-DD HH:mm:ss');
              this.tableData.push(tableData);
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
    }
  }
};
</script>

<style lang="less">
@import "../../style/mixin";
.table_container {
  padding: 20px;
}
</style>
