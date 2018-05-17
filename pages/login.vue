<template>
  <section class="container">
    <div class="content login">
      <h2>ログイン</h2>
      <div class="body">
        <el-alert type="info">
          利用するにはログインが必要です。
        </el-alert>
        <el-form ref="form" :model="form" label-width="90px" size="mini">
          <el-form-item label="ユーザー">
            <el-input v-model="form.user"></el-input>
          </el-form-item>
          <el-form-item label="パスワード">
            <el-input v-model="form.pass"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="login">Login</el-button>
            <el-button type="warning" icon="el-icon-upload2">Sign Up</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "login",
    data() {
      return {
        form: {
          user: '',
          pass: ''
        }
      };
    },
    methods: {
      login() {
        this.$store.dispatch('login', {
          username: this.form.user,
          password: this.form.pass
        }).then(() => this.$router.replace({ path: '/' }));
      }
    }
  }
</script>

<style scoped>
  .content .body {
    padding: 5px 20px;
  }

  .login h2:before {
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url("/img/setting.png");
    background-size: contain;
  }

</style>
