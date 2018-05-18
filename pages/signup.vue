<template>
  <section class="container">
    <div class="content login">
      <h2>ユーザ登録</h2>
      <div class="body">
        <el-alert type="success" title="Registered" v-if="successMessage">
          {{ successMessage }}
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
            <el-button type="primary" icon="el-icon-plus" @click="register">Register</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "signup",
    data() {
      return {
        form: {
          username: '',
          password: ''
        },
        successMessage: '',
        errorMessage: ''
      };
    },
    methods: {
      async register() {
        try {
          let username = await this.$store.dispatch('register', {
            username: this.form.username,
            password: this.form.password
          });
          this.successMessage = username + 'さんの登録が完了しました（仮）:';
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
    background-image: url("/img/signup.png");
    background-size: contain;
  }
</style>
