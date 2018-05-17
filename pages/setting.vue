<template>
  <section class="container">
    <div class="content setting">
      <h2>セッテイ</h2>
      <div class="body">
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
            <el-button type="primary" icon="el-icon-setting">Save</el-button>
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
        }
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
