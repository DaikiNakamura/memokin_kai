<template>
  <section class="container">
    <div class="content form">
      <h2>ニュウリョク</h2>
      <div class="body">
        <el-form ref="form" :model="form" label-width="90px" size="mini">
          <el-form-item label="ヒヅケ">
            <el-date-picker type="date" placeholder="Pick a date" v-model="form.date"
                            :clearable="false" :editable="false" style="width: 100%;"></el-date-picker>
          </el-form-item>
          <el-form-item label="ジカン">
            <el-row>
              <el-col :span="7">
                <el-time-select placeholder="Pick a time" v-model="form.startTime"
                                :picker-options="{start: '00:00', step: '00:15', end: '23:45'}"
                                :clearable="false" :editable="false" style="width: 100%;"></el-time-select>
              </el-col>
              <el-col :span="1" class="separate">
                <span>～</span>
              </el-col>
              <el-col :span="7">
                <el-time-select placeholder="Pick a time" v-model="form.endTime"
                                :picker-options="{start: '00:00', step: '00:15', end: '23:45'}"
                                :clearable="false" :editable="false" style="width: 100%;"></el-time-select>
              </el-col>
              <el-col :span="2" class="separate2">
                <span>&nbsp;</span>
              </el-col>
              <el-col :span="7">
                <el-time-select placeholder="Pick a time" v-model="form.breakTime"
                                :picker-options="{start: '00:00', step: '00:15', end: '03:00'}"
                                :clearable="false" :editable="false" style="width: 100%;"></el-time-select>
              </el-col>
            </el-row>
          </el-form-item>
          <el-form-item label="メモ">
            <el-input v-model="form.memo"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" icon="el-icon-check" @click="addWorkTime">ADD</el-button>
            <el-button type="warning" icon="el-icon-star-off">HOLIDAY</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="content list">
      <h2>イチラン</h2>
      <div class="body">
        <el-table
          :data="kintaiData"
          border
          :header-cell-style="table_header_style"
          :default-sort="{prop: 'date', order: 'ascending'}"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="ヒヅケ"
            :formatter="dateFormatter"
            width="120">
          </el-table-column>
          <el-table-column
            prop="startTime"
            label="カイシ"
            width="90">
          </el-table-column>
          <el-table-column
            prop="endTime"
            label="オワリ"
            width="90">
          </el-table-column>
          <el-table-column
            prop="breakTime"
            label="キュウケイ"
            width="90">
          </el-table-column>
          <el-table-column
            prop="memo"
            label="メモ"
            width="369">
          </el-table-column>
        </el-table>
        <br/>
        <el-form ref="form" :model="form" label-width="0px" size="mini">
          <el-form-item>
            <el-button type="primary" icon="el-icon-message">SHIP!!!</el-button>
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
    name: "kintai",
    fetch({store, redirect}) {
      if (!store.state.authUser) {
        return redirect('/login')
      }
    },
    data() {
      return {
        form: {
          date: '',
          startTime: '',
          endTime: '',
          breakTime: '',
          memo: ''
        },
        // kintaiData: [],
        table_header_style: {
          'background-color': '#1C8C42',
          color: '#000',
          'font-family': 'YokosukaBlock',
          'font-size': '1.5em'
        }
      };
    },
    computed: {
      kintaiData() {
        return this.$store.state.kintaiData;
      }
    },
    watch: {
      'form.date': {
        handler(newDate, oldDate) {
          let newYyyyMm = new Moment(newDate).format('YYYYMM');
          let oldYyyyMm = new Moment(oldDate).format('YYYYMM');
          if (newYyyyMm !== oldYyyyMm) {
            this.getData(newYyyyMm);
          }
        }
      }
    },
    mounted() {
      let today = new Moment();
      this.form.date = today.toDate();
      this.formClear();
      this.getData(today.format('YYYYMM'));
    },
    methods: {
      async formClear() {
        await this.$store.dispatch('get_setting');
        let userSetting = this.$store.state.userSetting;
        this.form.startTime = userSetting.startTime ? userSetting.startTime : '09:00';
        this.form.endTime = userSetting.endTime ? userSetting.endTime : '17:30';
        this.form.breakTime = userSetting.breakTime ? userSetting.breakTime : '01:00';
      },
      async getData(yyyyMm) {
        await this.$store.dispatch('get_kintai', {
          yyyyMm: yyyyMm
        });
      },
      async addWorkTime() {
        await this.$store.dispatch('add_kintai', {
          date: new Moment(this.form.date).format('YYYYMMDD'),
          startTime: this.form.startTime,
          endTime: this.form.endTime,
          breakTime: this.form.breakTime,
          memo: this.form.memo
        });
      },
      dateFormatter(row, column) {
        return new Moment(row.date, 'YYYYMMDD').format('YYYY-MM-DD');
      }
    }
  }
</script>

<style scoped>
  .content .body {
    padding: 5px 20px;
  }

  .separate {
    text-align: center;
  }

  .form h2:before {
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url("/img/today.png");
    background-size: contain;
  }

  .list h2:before {
    content: '';
    display: inline-block;
    width: 50px;
    height: 50px;
    background-image: url("/img/summary.png");
    background-size: contain;
  }
</style>
