import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)
// const resourceHost = 'http://localhost:3000'

import styles from './assets/styles.json';

export default new Vuex.Store({
  state: {
    id: null,
accessLevel: 0, // @VERIFIED
userName: null,
    colorConfig: "default",
    modal: {
      display: 'App',
      scopeTab: 'refg'
    },
    colors: styles.colors
  },
  getters: {

  },
  mutations: {
    ISSUED (state, {data}) {
      console.log("$$$ mutation:ISSUED ...$store");
      console.log(data);
      state.id = data.id;
        localStorage.id = data.id;
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
      state.accessLevel = 0;
      state.id = null;
      state.userName = null;
      state.colorConfig = "default";
      delete localStorage.requestPoint;
      delete localStorage.id;
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
      let id = localStorage.id;
      const {data} = await axios.post('/auth/verify', {id});
      commit('VERIFIED', {data});
    },
    async LOAD_CONFIG ({commit}, id) {
      console.log("$$$ action:GET_CONFIG ...$store");
      const data = await axios.post('/auth/load-config', id);
      commit('LOAD_CONFIG', data);
    },
    LOGOUT ({commit}) {
      console.log("$$$ action:LOGOUT $store");
      axios.post('/auth/logout', {id: localStorage.id});
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