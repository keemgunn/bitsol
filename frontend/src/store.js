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
    expiresIn: 0,
    userKey: null,
    userName: null,
    colorConfig: "default",
    modal: {
      display: 'refg'
    }
  },
  getters: {
    isAuthenticated (state) {
      state.accessToken = state.accessToken || localStorage.accessToken
      return state.accessToken
    } // 현재 무쓸모
  },
  mutations: {
    ISSUE (state, {data}) {
      console.log("$$$ mutation:ISSUE ...$store");
      state.accessToken = data.accessToken;
        localStorage.accessToken = data.accessToken;
      state.expiresIn = data.expiresIn;
        localStorage.expiresIn = data.expiresIn;
      state.userKey = data.userKey;
        localStorage.userKey = data.userKey;
    },
    LOAD_CONFIG (state, {data}) {
      console.log("$$$ mutation:LOAD_CONFIG ...$store");
      state.userName = data.userName;
        localStorage.userName = data.userName;
      state.colorConfig = data.colorConfig;
        localStorage.colorConfig = data.colorConfig;
    },
    LOGOUT (state) {
      state.accessToken = null;
      state.expiresIn = 0;
      state.userKey = null;
      state.userName = null;
      state.colorConfig = "default";
      delete localStorage.accessToken;
      delete localStorage.expiresIn;
      delete localStorage.userKey;
      delete localStorage.userName;
      delete localStorage.colorConfig;
    },
    SET_MODAL (state, {data}) {
      console.log("$$$ mutation:LOAD_CONFIG ...$store");
      state["modal"][data.property] = data.state;
    }
  },
  actions: {
    async ISSUE ({commit}, {key, expiresIn}) {
      console.log("$$$ action:ISSUE ...$store");
      const { data } = await axios.post('auth/issue', { key, expiresIn });
      commit('ISSUE', {data});
      axios.defaults.headers.common['Authorization'] = data.accessToken;
    },
    async LOAD_CONFIG ({commit}, {key}) {
      console.log("$$$ action:GET_CONFIG ...$store");
      const { data } = await axios.post('auth/load-config', { key });
      commit('LOAD_CONFIG', {data});
    },
    LOGOUT ({commit}) {
      console.log("$$$ action:LOGOUT $store");
      axios.defaults.headers.common['Authorization'] = undefined;
      commit('LOGOUT');
    },
    SET_MODAL ({commit}, {property, state}) {
      console.log("$$$ action:SET_MODAL ...$store");
      let data = {property, state};
      commit('SET_MODAL', {data});
    }
  }
})