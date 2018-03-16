<template>
  <div class="l-nav-main m-nav-main">
    <ul class="">
      <li>
        <i class="iconfont icon-recharge"></i>
        <div class="m-nav_item_title">
          收银
        </div>
      </li>
      <li>
        <i class="iconfont icon-shop"></i>
        <div class="m-nav_item_title">
          店铺管理
        </div>
      </li>
      <li>
        <i class="iconfont icon-hanbao"></i>
        <div class="m-nav_item_title">
          商品
        </div>
      </li>
      <li>
        <i class="iconfont icon-vipcard"></i>
        <div class="m-nav_item_title">
          会员
        </div>
      </li>
      <li>
        <i class="iconfont icon-settings"></i>
        <div class="m-nav_item_title">
          统计
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: "leftNav"
};
</script>
<style lang="scss">
.m-nav-main {
  color: #fff;
  font-size: 10px;
  height: 100%;
  background-color: #1d8ce0;
  .iconfont {
    font-size: 24px;
  }
}
.m-nav-main {
  ul {
    padding: 0px;
    margin: 0px;
  }
  li {
    list-style: none;
    text-align: center;
    border-bottom: 1px solid #20a0ff;
    padding: 10px;
  }
}
</style>
