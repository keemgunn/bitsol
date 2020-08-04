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
    userKey: null,
    userName: null,
    colorConfig: "default"
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
      state.userName = data.userName;
      state.colorConfig = data.colorConfig;
      localStorage.accessToken = data.accessToken;
      localStorage.userKey = userKey;
      localStorage.userName = data.userName;
      localStorage.colorConfig = data.colorConfig;
    },
    LOGOUT (state) {
      console.log("$$$ mutation:LOGOUT ...store.js");
      state.accessToken = null;
      state.userKey = null;
      state.userName = null;
      state.colorConfig = "default";
      delete localStorage.accessToken;
      delete localStorage.userKey;
      delete localStorage.userName;
      delete localStorage.colorConfig;
    }
  },
  actions: {
    async LOGIN ({commit}, {key, expiresIn}) {
      console.log("$$$ action:LOGIN ...store.js");
      const { data } = await axios.post('/auth/issue', { key, expiresIn });
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