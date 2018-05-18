<template>
  <section class="container">
    <div class="content login">
      <h2>ログイン</h2>
      <div class="body">
        <el-alert type="info" title="Info">
          利用するにはログインが必要です。
        </el-alert>
        <el-alert type="error" title="Error" v-if="errorMessage">
          {{ errorMessage }}
        </el-alert>
        <el-form ref="form" :model="form" label-width="90px" size="mini">
          <el-form-item label="ユーザー">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="パスワード">
            <el-input v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="login">Login</el-button>
            <nuxt-link to="/signup"><el-button type="warning" icon="el-icon-upload2">Sign Up</el-button></nuxt-link>
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
          username: '',
          password: ''
        },
        errorMessage: ''
      };
    },
    methods: {
      async login() {
        try {
          let authUser = await this.$store.dispatch('login', {
            username: this.form.username,
            password: this.form.password
          });
          if(authUser) {
            this.$router.replace({ path: '/' });
          }
        } catch (e) {
            this.errorMessage = e.message;
        }
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

  .login button {
    margin-right: 10px;
  }

</style>
