<template>
  <div class="fillcontain">
    <header class="customerdetail_title">用户详情</header>
    <div class="customerdetail">
      <ul>
        <li>
          <span>用户名称:</span>
          <span>{{this.$route.params.customerInfo.customerName}}</span>
        </li>
        <li>
          <span>用户ID:</span>
          <span>{{this.$route.params.customerInfo.customerId}}</span>
        </li>
        <li>
          <span>用户状态:</span>
          <span>{{this.$route.params.customerInfo.status}}</span>
        </li>
        <li>
          <span>创建时间:</span>
          <span>{{this.$route.params.customerInfo.createTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
        </li>
        <li>
          <span>更新时间:</span>
          <span>{{this.$route.params.customerInfo.updateTime | dateformat('YYYY-MM-DD HH:mm:ss')}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<style lang="less">
@import "../../style/mixin";
.data_section {
  padding: 20px;
  margin-bottom: 40px;
  .section_title {
    text-align: center;
    font-size: 30px;
    margin-bottom: 10px;
  }
  .data_list {
    text-align: center;
    font-size: 14px;
    color: #666;
    border-radius: 6px;
    background: #e5e9f2;
    .data_num {
      color: #333;
      font-size: 26px;
    }
    .head {
      border-radius: 6px;
      font-size: 22px;
      padding: 4px 0;
      color: #fff;
      display: inline-block;
    }
  }
  .today_head {
    background: #ff9800;
  }
  .all_head {
    background: #20a0ff;
  }
}
.wan {
  .sc(16px, #333);
}
</style>