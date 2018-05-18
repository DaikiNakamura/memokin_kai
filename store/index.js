import Vue from 'vue'
import Vuex from 'vuex'

const crypto = require("crypto");

Vue.use(Vuex)

// window.fetch() のためのポリフィル
require('whatwg-fetch')

const store = () => new Vuex.Store({

  state: {
    authUser: null,
    userSetting: {
      name: '',
      department: '',
      place: '',
      startTime: '',
      endTime: '',
      breakTime: ''
    },
    kintaiData: []
  },

  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user;
    },
    SET_USER_SETTING: function (state, setting) {
      state.userSetting = setting;
    },
    SET_KINTAI: function (state, data) {
      state.kintaiData = data;
    },
    ADD_KINTAI: function (state, data) {
      state.kintaiData.push(data);
    }
  },

  actions: {
    // initialize
    nuxtServerInit({commit}, {req}) {
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser);
      }
    },

    // ---  auth Actions --->
    async register({commit}, {username, password}) {
      const sha512 = crypto.createHash('sha512');
      sha512.update(password);
      let pass = sha512.digest('hex');
      let res = await fetch('/api/auth/register', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password: pass
        })
      });

      if (res.status === 409) {
        throw new Error('既に登録済みのユーザーです。');
      }
      return username;
    },
    async login({commit}, {username, password}) {
      const sha512 = crypto.createHash('sha512');
      sha512.update(password);
      let pass = sha512.digest('hex');
      let res = await fetch('/api/auth/login', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username,
          password: pass
        })
      });

      if (res.status === 401) {
        throw new Error('ユーザー認証に失敗しました。');
      }

      let authUser = await res.json();
      commit('SET_USER', authUser);
      return authUser;
    },
    async logout({commit}) {
      await fetch('/api/auth/logout', {
        credentials: 'same-origin',
        method: 'POST'
      });

      commit('SET_USER', null);
    },

    // ---  setting Actions --->
    async get_setting({commit}) {
      let res = await fetch('/api/setting/', {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (res.status === 401) {
        throw new Error('ログインしてください。');
      }

      let setting = await res.json();
      commit('SET_USER_SETTING', setting);
      return setting;
    },
    async save_setting({commit}, {name, department, place, startTime, endTime, breakTime}) {
      let res = await fetch('/api/setting/save', {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          department,
          place,
          startTime,
          endTime,
          breakTime
        })
      });

      if (res.status === 401) {
        throw new Error('ログインしてください。');
      }

      let setting = await res.json();
      commit('SET_USER_SETTING', setting);
      return setting;
    },

    // ---  kintai Actions --->
    async get_kintai({commit}, {yyyyMm}) {
      commit('SET_KINTAI', [
        {
          date: '20180501',
          startTime: '10:00',
          endTime: '19:00',
          breakTime: '01:00',
          memo: 'testData'
        },{
          date: '20180502',
          startTime: '10:00',
          endTime: '19:00',
          breakTime: '01:00',
          memo: 'testData'
        },{
          date: '20180503',
          startTime: '10:00',
          endTime: '19:00',
          breakTime: '01:00',
          memo: 'testData'
        },{
          date: '20180504',
          startTime: '10:00',
          endTime: '19:00',
          breakTime: '01:00',
          memo: 'testData'
        }
      ]);
    },
    async add_kintai({commit}, {date, startTime, endTime, breakTime, memo}) {
      commit('ADD_KINTAI', {
        date,
        startTime,
        endTime,
        breakTime,
        memo
      });
    }
  }
});

export default store
