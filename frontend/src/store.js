import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios' // this.$http ?

Vue.use(Vuex)

// const resourceHost = 'http://localhost:3000'

const enhanceTokens = () => {
  const {accessToken} = localStorage
  if (!accessToken) {
  axios.defaults.headers.common['Authorization'] = accessToken;
  }
}
enhanceTokens()

export default new Vuex.Store({
  state: {
    accessToken: null,
    userKey: "none"
  },
  getters: {
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    } // 현재 무쓸모
  },
  mutations: {
    LOGIN (state, {data, userKey} ) {
      console.log("$$$ mutation:LOGIN ...store.js");
      state.accessToken = data.accessToken;
      state.userKey = userKey;
      localStorage.accessToken = data.accessToken;
      localStorage.userKey = userKey;
    },
    LOGOUT (state) {
      console.log("$$$ mutation:LOGOUT ...store.js");
      state.accessToken = null;
      state.userKey = "none"
      delete localStorage.accessToken;
      delete localStorage.userKey;
    }
  },
  actions: {
    async LOGIN ({commit}, {key, expiresIn}) {
      console.log("$$$ action:LOGIN ...store.js");
      const { data } = await axios.post('/auth/login', { key, expiresIn });
      const userKey = key;
      // LOGIN mutation
      commit('LOGIN', {data, userKey}) ;
      // header set
      axios.defaults.headers.common['Authorization'] = data.accessToken;
    },
    LOGOUT ({commit}) {
      console.log("$$$ action:LOGOUT ...store.js");
      // LOGOUT mutation
      commit('LOGOUT');
      // header set
      axios.defaults.headers.common['Authorization'] = undefined;
    },
  }
})