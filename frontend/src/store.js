import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios' // this.$http ?

Vue.use(Vuex)

// const resourceHost = 'http://localhost:3000'

const enhanceAccessToeken = () => {
  const {accessToken} = localStorage
  if (!accessToken) return
  axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
}
enhanceAccessToeken()

export default new Vuex.Store({
  state: {
    accessToken: null
  },
  getters: {
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    }
  },
  mutations: {
    LOGIN (state, {accessToken}) {
      console.log("$$$ mutation:LOGIN ...store.js");
      state.accessToken = accessToken;
      localStorage.accessToken = accessToken;
    },
    LOGOUT (state) {
      console.log("$$$ mutation:LOGOUT ...store.js");
      state.accessToken = null;
      delete localStorage.accessToken;
    }
  },
  actions: {
    async LOGIN ({commit}, {key, expiresIn}) {
      console.log("$$$ action:LOGIN ...store.js");
      const { data } = await axios.post('/auth/login', { key, expiresIn })
      // LOGIN mutation
      commit('LOGIN', data) 
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