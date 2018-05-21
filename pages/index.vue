<template>
  <section class="container">
    <div class="content top__what">
      <h2>ナニコレ？</h2>
      <div class="body">
        <p>勤怠管理をちょっと楽にしてくれるメモアプリ。</p>
      </div>
    </div>
    <div class="content tool" v-if="username">
      <h2>テガルニ</h2>
      <div class="body">
        <el-alert type="success" title="Registered" v-if="successMessage">
          {{ successMessage }}
        </el-alert>
        <el-alert type="error" title="Error" v-if="errorMessage">
          {{ errorMessage }}
        </el-alert>
        <el-form ref="form" size="mini">
          <el-form-item>
            <el-button type="success" icon="el-icon-check" @click="addWorkTime_start">イマキタ！</el-button>
            <el-button type="info" icon="el-icon-close" @click="addWorkTime_end">モウ、カエル！</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </section>
</template>

<script>
  const Moment = require('moment');
  Moment.locale('ja');

  export default {
    data() {
      return {
        successMessage: '',
        errorMessage: ''
      }
    },
    computed: {
      username() {
        if (this.$store.state.authUser) {
          return this.$store.state.authUser.username;
        }
        return null
      }
    },
    methods: {
      async addWorkTime_start() {
        try {
          let todayKintai = await this.getTodayKintai();
          console.log(todayKintai);
          let userSetting = this.$store.state.userSetting;
          await this.$store.dispatch('add_kintai', {
            date: new Moment().format('YYYYMMDD'),
            startTime: this.nowTime(),
            endTime: todayKintai ? todayKintai.endTime : userSetting.endTime ? userSetting.endTime : '17:30',
            breakTime: todayKintai ? todayKintai.breakTime : userSetting.breakTime ? userSetting.breakTime : '01:00',
            memo: todayKintai ? todayKintai.memo : ''
          });
          this.successMessage = '今日の開始時間を更新しました。';
        } catch (e) {
          this.errorMessage = e.message;
        }
      },
      async addWorkTime_end() {
        try {
          let todayKintai = await this.getTodayKintai();
          console.log(todayKintai);
          let userSetting = this.$store.state.userSetting;
          await this.$store.dispatch('add_kintai', {
            date: new Moment().format('YYYYMMDD'),
            startTime: todayKintai ? todayKintai.startTime : userSetting.startTime ? userSetting.startTime : '09:00',
            endTime: this.nowTime(),
            breakTime: todayKintai ? todayKintai.breakTime : userSetting.breakTime ? userSetting.breakTime : '01:00',
            memo: todayKintai ? todayKintai.memo : ''
          });
          this.successMessage = '今日の終了時間を更新しました。';
        } catch (e) {
          this.errorMessage = e.message;
        }
      },
      async getTodayKintai() {
        let monthly_kintai = await this.$store.dispatch('get_kintai', {
          yyyyMm: new Moment().format('YYYYMM'),
        });
        let yyyyMmDd = new Moment().format('YYYYMMDD');
        let todayKintai = monthly_kintai.filter((val) => {
          return val.date === yyyyMmDd
        });
        return todayKintai[0];
      },
      nowTime() {
        let now = new Moment();
        let minute = parseInt(now.format('mm'), 10);
        if (minute < 15) {
          minute = 0;
        } else if (minute < 30) {
          minute = 15;
        } else if (minute < 45) {
          minute = 30;
        } else {
          minute = 45;
        }
        let time = now.format('HH') + ':' + ('00' + minute).slice(-2);
        return time;
      }
    }
  }
</script>

<style scoped>
  .content .body {
    padding: 5px 20px;
  }

  .top__what h2:before {
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url("/img/what_is_memokin.png");
    background-size: contain;
  }

  .tool h2:before {
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url("/img/tool.png");
    background-size: contain;
  }
</style>
