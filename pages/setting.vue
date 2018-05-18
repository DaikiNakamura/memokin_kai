<template>
  <section class="container">
    <div class="content setting">
      <h2>セッテイ</h2>
      <div class="body">
        <el-alert type="success" title="Registered" v-if="successMessage">
          {{ successMessage }}
        </el-alert>
        <el-alert type="error" title="Error" v-if="errorMessage">
          {{ errorMessage }}
        </el-alert>
        <el-form ref="form" :model="form" label-width="90px" size="mini">
          <h3>- キホン -</h3>
          <el-form-item label="ナマエ">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-form-item label="ブショ">
            <el-input v-model="form.department"></el-input>
          </el-form-item>
          <el-form-item label="バショ">
            <el-input v-model="form.place"></el-input>
          </el-form-item>
          <h3>- ジカン -</h3>
          <el-form-item label="カイシ">
            <el-time-select placeholder="Pick a time" v-model="form.startTime"
                            :picker-options="{start: '00:00', step: '00:15', end: '23:45'}" style="width: 100%;"></el-time-select>
          </el-form-item>
          <el-form-item label="シュウリョウ">
            <el-time-select placeholder="Pick a time" v-model="form.endTime"
                            :picker-options="{start: '00:00', step: '00:15', end: '23:45'}" style="width: 100%;"></el-time-select>
          </el-form-item>
          <el-form-item label="キュウケイ">
            <el-time-select placeholder="Pick a time" v-model="form.breakTime"
                            :picker-options="{start: '00:00', step: '00:15', end: '03:45'}" style="width: 100%;"></el-time-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-setting" @click="save">Save</el-button>
            <el-button type="danger" icon="el-icon-delete">DELETE (ALL DATA)</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    name: "setting",
    fetch ({ store, redirect }) {
      if (!store.state.authUser) {
        return redirect('/login')
      }
    },
    data() {
      return {
        form: {
          name: '',
          department: '',
          place: '',
          startTime: '',
          endTime: '',
          breakTime: ''
        },
        successMessage: '',
        errorMessage: ''
      }
    },
    async mounted() {
      await this.$store.dispatch('get_setting');
      this.loadSetting();
    },
    methods: {
      async save() {
        try {
          await this.$store.dispatch('save_setting', {
            name: this.form.name,
            department: this.form.department,
            place: this.form.place,
            startTime: this.form.startTime,
            endTime: this.form.endTime,
            breakTime: this.form.breakTime
          });
          this.successMessage = '保存しました。';
          this.loadSetting();
        } catch (e) {
          this.errorMessage = e.message;
        }
      },
      loadSetting() {
        let userSetting = this.$store.state.userSetting;
        this.form.name = userSetting.name;
        this.form.department = userSetting.department;
        this.form.place = userSetting.place;
        this.form.startTime = userSetting.startTime;
        this.form.endTime = userSetting.endTime;
        this.form.breakTime = userSetting.breakTime;
      }
    }
  }
</script>

<style scoped>
  .content .body {
    padding: 5px 20px;
  }

  .setting h2:before {
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url("/img/setting.png");
    background-size: contain;
  }

  .setting h3 {
    font-family: YokosukaBlock;
    font-size: 1.3em;
  }
</style>
