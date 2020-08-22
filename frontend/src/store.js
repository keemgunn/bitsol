import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)
// const resourceHost = 'http://localhost:3000'

import styles from './assets/styles.json';

export default new Vuex.Store({
  state: {
    id: null, accessLevel:0, userName: null,
    // id: '2018317024', accessLevel: 1, userName: "김건",
    
      modal: {
        display: 'App',
        scopeTab: 'search-list',
        // scopeTab: 'admin',
      },
      
    colorConfig: "default",
    colors: styles.colors,
    colorKeys: Object.keys(styles.colors),

    alert: null,
  },
  getters: {

  },
  mutations: {
    //___________ AUTHENTICATION METHODS _______
    async LOGIN (state, {data}) {
      console.log('$$$ request ...$mutation/LOGIN');
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
      console.log("$$$ request ...$mutation/VERIFIED");
      console.log(data);
      state.accessLevel = data.accessLevel;
    },

    RECOVER (state) {
      console.log('$$$ request ...$mutation/RECOVER');
      state.id = localStorage.id;
      state.userName = localStorage.userName;
      state.colorConfig = localStorage.colorConfig;
    },

    LOGOUT (state) {
      console.log('$$$ request ...$mutation/LOGOUT');
      state.accessLevel = 0;
      state.id = null;
      state.userName = null;
      state.colorConfig = "default";
      delete localStorage.id ;
      delete localStorage.userName ;
      localStorage.colorConfig = 'default';
    },

    //___________ UI METHODS _______
    SET_MODAL (state, {data}) {
      console.log("$$$ mutation:LOAD_CONFIG ...$store");
      state["modal"][data.property] = data.state;
    },

    CHANGE_THEME (state, {color}) {
      console.log('$$$ request ...$mutation/CHANGE_THEME');
      console.log(color);
      state.colorConfig = color;
      localStorage.colorConfig = color;
      console.log('$$$ colorCofig updated ...$mutation/CHANGE_THEME');
    },

    ALERT (state, msg) {
      console.log(msg);
      state.alert = msg;
    },


  },
  actions: {
    //___________ AUTHENTICATION METHODS _______
    async LOGIN ({commit}, identity) {
      console.log("$$$ request ...$action/LOGIN");
      let {data} = await axios.post('auth/login', identity);
      if (data.accessToken) {
        console.log("$$$ token issued ...$action/LOGIN");
        axios.defaults.headers.common['Authorization'] = data.accessToken;
        commit('LOGIN', {data});
      }else{
        console.log("$$$ something wrong ...$action/LOGIN");
      }
    },

    async VERIFY ({commit}) {
      console.log("$$$ request ...$action/VERIFY");
      const {data} = await axios.post('/auth/verify', {id: localStorage.id});
      if(data.accessLevel){
        console.log('$$$ access verified ...$action/VERIFY');
        commit('VERIFIED', {data});
      }else{
        commit('ALERT', 'VERIFICATION FAILED (401)')
      }
    },

    DEPOSIT () {
      axios.post('/auth/deposit', {id: localStorage.id});
    },

    async RECOVER ({commit}) {
      console.log('$$$ request ...$action/RECOVER');
      const {data} = await axios.post('/auth/recover', {id:localStorage.id});
      if(data.accessToken){
        console.log('$$$ accessToken detected ...$action/RECOVER');
        axios.defaults.headers.common['Authorization'] = data.accessToken;
        commit('RECOVER');
      }else{
        console.log('$$$ no recieved accessToken from deposit object ...$action/RECOVER');
      }
    },

    LOGOUT ({commit}) {
      console.log("$$$ request ...$action/LOGOUT");
      axios.post('/auth/logout', {id: localStorage.id});
      axios.defaults.headers.common['Authorization'] = undefined;
      commit('LOGOUT');
    },


    //___________ UI METHODS _______

    CHANGE_THEME({commit}, {color}) {
      console.log('$$$ request ...$action/CHANGE_THEME');
      commit('CHANGE_THEME', {color});
      this.axios.post('/auth/theme/change', {id: localStorage.id, color:color});
    },

    SET_MODAL ({commit}, {property, state}) {
      console.log("$$$ action:SET_MODAL ...$store");
      let data = {property, state};
      commit('SET_MODAL', {data});
    },



  }
})