<template>
  <div class="fillcontain">
    <head-top></head-top>
    <div class="table_container">
      <el-table :data="tableData" highlight-current-row style="width: 100%">
        <el-table-column type="index" label="序号" align="center" width="80"></el-table-column>
        <el-table-column property="customerName" label="用户名" align="center" width="220"></el-table-column>
        <el-table-column property="status" label="用户状态" align="center" width="100"></el-table-column>
        <el-table-column property="email" label="用户邮箱" align="center" width="220"></el-table-column>
        <el-table-column property="createTime" label="创建时间" align="center" width="220"></el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
            <el-button type="text" @click="checkDetail(scope.row.customerId)">查看详情</el-button>
            <el-button type="text" @click="modifyUser(scope.row.customerId)">修改</el-button>
            <el-button
              type="text"
              :disabled="scope.row.deleteButtonHide"
              @click="deleteUser(scope.row.customerId, scope.row.customerName)"
            >删除</el-button>

            <!-- <el-popover ref="deletepopover" placement="top" width="160" v-model="scope.row.visible">
              <p>是否删除用户{{scope.row.customerName}}</p>
              <div style="text-align: center; margin: 0">
                <el-button size="mini" type="text" @click="scope.row.visible = false">取消</el-button>
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteUser(scope.row.customerId, scope.row.customerName)"
                >确定</el-button>
              </div>
            </el-popover>
            <el-button type="text" v-popover:deletepopover>删除</el-button>-->
          </template>
        </el-table-column>
      </el-table>
      <div class="Pagination" style="text-align: left;margin-top: 10px;">
        <el-pagination
          :current-page.sync="currentPage"
          :page-size.sync="pageSize"
          :page-sizes.sync="selectPageSizes"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totalCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import rest from "@/backend/rest";
import customerManagerUrl from "@/backend/customerManagerUrl";
import customerStatus from "@/backend/customerStatus";
import moment from "moment";
import headTop from "@/components/common/headTop";
import session from "@/backend/session";

export default {
  data() {
    return {
      tableData: [
        {
          customerId: "",
          customerName: "yangzhixiong",
          status: -1,
          email: "yangzhixiong@migu.cn",
          createTime: "2019-10-29 14:12:00",
          deleteButtonDisplay: true,
          visible: false
        },
        {
          customerId: "",
          customerName: "yangzhixiong1",
          status: -1,
          email: "yangzhixiong1@migu.cn",
          createTime: "2019-10-29 14:12:00",
          deleteButtonHide: false,
          visible: false
        }
      ],
      pageSize: 10,
      totalCount: 0,
      currentPage: 1,
      selectPageSizes: [10, 20, 30, 50, 100]
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
        this.getUsers();
      } catch (err) {
        console.log("获取数据失败", err);
      }
    },
    handleSizeChange(selectPageSize) {
      this.pageSize = selectPageSize;
      this.getUsers();
    },
    handleCurrentChange(curPage) {
      this.currentPage = curPage;
      this.getUsers();
    },
    getUsers() {
      rest
        .post(customerManagerUrl.customerlist_url_get, {
          pageNo: this.currentPage,
          pageSize: this.pageSize
        })
        .then(
          res => {
            if (res.code == 0) {
              this.totalCount = res.data.totalCount;
              this.tableData = [];
              res.data.customers.forEach(item => {
                const tableData = {};
                tableData.customerId = item.customerId;
                tableData.customerName = item.customerName;
                tableData.status = customerStatus.convert.boolean[item.status];
                tableData.email = item.email;
                tableData.createTime = moment(item.createTime).format(
                  "YYYY-MM-DD HH:mm:ss"
                );
                if (session.getCustomerId() == item.customerId) {
                  tableData.deleteButtonHide = true;
                }
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
    },
    deleteUser(customerId, customerName) {
      this.$confirm("是否确认删除用户" + customerName, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          rest
            .del(customerManagerUrl.deletecustomer_url_delete + customerId)
            .then(
              res => {
                if (res.code == 0) {
                  this.$message({
                    type: "success",
                    message: "删除用户" + customerName + "成功"
                  });

                  this.initData();
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
        })
        .catch(() => {
          //点击取消按钮的操作
        });
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
