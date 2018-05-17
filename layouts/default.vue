<template>
  <el-container>
    <el-header height="80px">
      <Header />
    </el-header>
    <el-main>
      <el-alert
        title="warning"
        type="warning"
        show-icon>
        現在、テスト中です。
      </el-alert>
      <nuxt/>
    </el-main>
  </el-container>
</template>

<style>
  * {
    margin: 0;
    padding: 0;
  }

  .container {
    width: 800px;
  }

  .flex {
    display: -webkit-flex;
    display: -moz-flex;
    display: -ms-flex;
    display: -o-flex;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  @font-face {
    font-family: YokosukaBlock;
    src: url("/font/YokosukaBlock-Regular.otf");
  }
  @font-face {
    font-family: exotic_agent_regular;
    src: url("/font/exotic_agent_regular.ttf");
  }
  .appFont, .el-form-item__label {
    font-family: YokosukaBlock;
  }

  h2 {
    font-family: YokosukaBlock;
    font-size: 2.2em;
  }
</style>

<script>
  import Header from "../components/Header";
  export default {
    components: {Header}
  }
</script>
