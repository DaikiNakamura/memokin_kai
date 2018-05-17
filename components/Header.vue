<template>
  <div class="header flex">
    <div class="header__logo flex">
      <div class="header__logo__image"></div>
      <h1 class="header__logo__text appFont">メモキン</h1>
    </div>
    <div class="header__navigation">
      <el-menu :default-active="activeIndex" mode="horizontal" :router="true">
        <el-menu-item index="/" class="header__menu appFont">トップ</el-menu-item>
        <el-menu-item index="kintai" class="header__menu appFont">キンタイ</el-menu-item>
        <el-menu-item index="setting" class="header__menu appFont">セッテイ</el-menu-item>
      </el-menu>
    </div>
  </div>
</template>

<script>

  export default {
    name: "Header",
    data() {
      return {
        activeIndex: '/'
      };
    }
  }
</script>

<style scoped>
  .header {
    justify-content: flex-start;
  }

  .header__logo {
    width: 200px;
    height: 80px;
  }
  .header__logo__image {
    width: 80px;
    height: 80px;
    background-image: url("/img/logo.png");
    background-size: contain;
  }
  .header__logo__text {
    width: 120px;
    font-size: 3em;
    color: #1C8C42;
  }

  .header__navigation {
    margin-left: 50px;
  }
  .header__menu {
    font-size: 2em;
    color: #000;
  }
  .el-menu-item.is-active {
    border-bottom: 2px solid #008E49;
  }
</style>
