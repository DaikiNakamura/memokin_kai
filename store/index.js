import Vue from 'vue'
import Vuex from 'vuex'
const crypto = require("crypto");

Vue.use(Vuex)

// window.fetch() のためのポリフィル
require('whatwg-fetch')

const store = () => new Vuex.Store({

  state: {
    authUser: null
  },

  mutations: {
    SET_USER: function (state, user) {
      state.authUser = user
    }
  },

  actions: {
    // initialize
    nuxtServerInit ({ commit }, { req }) {
      if (req.session && req.session.authUser) {
        commit('SET_USER', req.session.authUser)
      }
    },

    // ---  auth Actions --->
    async register({commit}, { username, password}) {
      const sha512 = crypto.createHash('sha512');
      sha512.update(password);
      let pass = sha512.digest('hex');
      console.log(pass);
      let res = await fetch('/auth/register', {
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
    async login ({ commit }, { username, password }) {
      const sha512 = crypto.createHash('sha512');
      sha512.update(password);
      let pass = sha512.digest('hex');
      console.log(pass);
      let res = await fetch('/auth/login', {
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
        throw new Error('Bad credentials')
      }

      let authUser = await res.json();
      commit('SET_USER', authUser);
      return authUser;
    },
    async logout ({ commit }) {
      await fetch('/auth/logout', {
        credentials: 'same-origin',
        method: 'POST'
      });

      commit('SET_USER', null);
    }
  }
})

export default store
