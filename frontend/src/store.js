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
      state.accessToken = state.accessToken || localStorage.accessToken;
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
    LOGIN ({commit}, {key}) {
      console.log("$$$ action:LOGIN ...store.js");
      return axios.post('/api/login', {key})
        .then(({data}) => { // accessToken 추출
          console.log("access token: ", data.accessToken);
          commit('LOGIN', data) // LOGIN mutation
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.accessToken}`;
        })
    },
    LOGOUT ({commit}) {
      console.log("$$$ action:LOGOUT ...store.js");
      axios.defaults.headers.common['Authorization'] = undefined;
      commit('LOGOUT');
    },
  }
})