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
    }
  },

  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user;
    },
    SET_USER_SETTING: function (state, setting) {
      state.userSetting = setting;
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
    }
  }
});

export default store
