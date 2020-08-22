import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)
// const resourceHost = 'http://localhost:3000'

import styles from './assets/styles.json';

export default new Vuex.Store({
  state: {
    id: null,
    accessLevel:0,
      // accessLevel: 1,
    userName: null,
      // userName: "김건",
      
      modal: {
        display: 'App',
        scopeTab: 'search-list',
        // scopeTab: 'admin',
      },
      
    colorConfig: "default",
    colors: styles.colors,
    colorKeys: Object.keys(styles.colors),
  },
  getters: {

  },
  mutations: {

    //___________ AUTHENTICATION METHODS _______
    async LOGIN (state, {data}) {
      console.log('$$$ request ...$mutation/LOGIN');
      console.log(data);

      state.id = data.id;
      localStorage.id = data.id;
      state.userName = data.config.userName;
      localStorage.userName = data.config.userName;
      state.colorConfig = data.config.colorConfig;
      localStorage.colorConfig = data.config.colorConfig;
      console.log('$$$ state loaded ...$mutation/LOGIN');

      const verification = await axios.post('/auth/verify', {id:data.id});
      state.accessLevel = verification.data.accessLevel;
      console.log('$$$ access verified ...$mutation/LOGIN');
    },


    VERIFIED (state, {data}) {
      console.log("$$$ mutation:VERIFIED ...$store");
      console.log(data);
      state.accessLevel = data.accessLevel;
    },
    LOGOUT (state) {
      state.accessLevel = 0;
      state.id = null;
      state.userName = null;
      state.colorConfig = "default";
      delete localStorage.id ;
      delete localStorage.userName ;
      localStorage.colorConfig = 'default';
    },
    SET_MODAL (state, {data}) {
      console.log("$$$ mutation:LOAD_CONFIG ...$store");
      state["modal"][data.property] = data.state;
    }
  },
  actions: {

    //___________ AUTHENTICATION METHODS _______
    async LOGIN ({commit}, identity) {
      console.log("$$$ request ...$action/LOGIN");
      let {data} = await axios.post('auth/login', identity);
      console.log(data);
      if (data.accessToken) {
        console.log("$$$ token issued ...$action/LOGIN");
        axios.defaults.headers.common['Authorization'] = data.accessToken;
        commit('LOGIN', {data});
      }else{
        console.log("$$$ something wrong ...$action/LOGIN");
      }
    },


    async VERIFY ({commit}) {
      console.log("$$$ action:VERIFY ...$store");
      let id = localStorage.id;
      const {data} = await axios.post('/auth/verify', {id});
      commit('VERIFIED', {data});
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