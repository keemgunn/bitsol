import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios' // this.$http ?

Vue.use(Vuex)

// const resourceHost = 'http://localhost:3000'

export default new Vuex.Store({
  state: {
    accessToken: null,
    expiresIn: 0,
    userKey: null,
    accessLevel: 0, // @VERIFIED
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
    ISSUED (state, {data}) {
      console.log("$$$ mutation:ISSUED ...$store");
      console.log(data);
      state.accessToken = data.accessToken;
          localStorage.accessToken = data.accessToken;
      state.expiresIn = data.expiresIn;
          localStorage.expiresIn = data.expiresIn;
      state.userKey = data.userKey;
          localStorage.userKey = data.userKey;
    },
    VERIFIED (state, {data}) {
      console.log("$$$ mutation:VERIFIED ...$store");
      console.log(data);
      state.accessLevel = data.accessLevel;
    },
    LOAD_CONFIG (state, {data}) {
      console.log("$$$ mutation:LOAD_CONFIG ...$store");
      console.log(data);
      state.userName = data.userName;
          localStorage.userName = data.userName;
      state.colorConfig = data.colorConfig;
          localStorage.colorConfig = data.colorConfig;
    },
    LOGOUT (state) {
      state.accessToken = null;
      state.expiresIn = 0;
      state.accessLevel = 0;
      state.userKey = null;
      state.userName = null;
      state.colorConfig = "default";
      delete localStorage.requestPoint;
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
    async ISSUED ({commit}, data) {
      console.log("$$$ action:ISSUED ...$store");
      commit('ISSUED', {data});
    },
    async VERIFY ({commit}) {
      console.log("$$$ action:VERIFY ...$store");
      let requestPoint = localStorage.requestPoint;
      const { data } = await axios.post('/auth/verify', { requestPoint });
      commit('VERIFIED', {data});
    },
    async LOAD_CONFIG ({commit}, key) {
      console.log("$$$ action:GET_CONFIG ...$store");
      const data = await axios.post('/auth/load-config', key);
      commit('LOAD_CONFIG', data);
    },
    LOGOUT ({commit}) {
      console.log("$$$ action:LOGOUT $store");
      axios.post('/auth/logout', {userKey: localStorage.userKey});
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