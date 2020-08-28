import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)
// const resourceHost = 'http://localhost:3000'

import styles from './assets/styles.json';
const defaultColor = "default";
const DBoptions = {
  showEmpty: false,
  showForeign: false
};

export default new Vuex.Store({
  state: {

    auth: {
      id:null, accessLevel:0, userName:null,
      // id: '2018317024', accessLevel: 3, userName: "김건",
    },
    dbinfo: {},
    mode: 'search', 
     // search  admin

    studentList: [],
    searchArr: [],
    search: {
      keyword: '',
      moreinfo: false,
      recordHeight: 66,
      coverBottom: { "height": "100%" },
      loadingState: 0
    },
    
    adminArr:[],
    admin: {
      modal: 'db',
        // index  db  refg  user
      db: {
        options: DBoptions,
        optionKeys: Object.keys(DBoptions),
        keyword:'',
      }
    },
    
    theme: {
      applied: styles["colors"][defaultColor],
      colorKeys: Object.keys(styles.colors),
      colors: styles.colors
    },

    alert: null,

  },
  getters: {

  },
  mutations: {

    //___________ AUTHENTICATION METHODS _______
    async LOGIN (state, {data}) {
      console.log('$$$ request ...$mutation/LOGIN');
      state.auth.id = data.id;
      localStorage.id = data.id;
      state.auth.userName = data.config.userName;
      localStorage.userName = data.config.userName;
      state.theme.applied = styles["colors"][data.config.colorConfig];
      localStorage.colorConfig = data.config.colorConfig;
      console.log('$$$ state loaded ...$mutation/LOGIN');

      const verification = await axios.post('/auth/verify', {id:data.id});
      state.auth.accessLevel = verification.data.accessLevel;
      console.log('$$$ access verified ...$mutation/LOGIN');
    },

    VERIFIED (state, {data}) {
      console.log("$$$ request ...$mutation/VERIFIED");
      console.log(data);
      state.auth.accessLevel = data.accessLevel;
    },



    RECOVER (state) {
      console.log('$$$ request ...$mutation/RECOVER');
      state.auth.id = localStorage.id;
      state.auth.userName = localStorage.userName;
      state.theme.applied = styles["colors"][localStorage.colorConfig];
    },

    LOGOUT (state) {
      console.log('$$$ request ...$mutation/LOGOUT');
      state.auth.accessLevel = 0;
      state.auth.id = null;
      state.auth.userName = null;
      state.theme.applied = styles["colors"][defaultColor];
      delete localStorage.id ;
      delete localStorage.userName ;
      localStorage.colorConfig = defaultColor;
    },


    //______________ DB METHODS ____________

    async DB_INFO (state) {
      console.log('$$$ request ...$mutation/DB_INFO');
      let {data} = await axios.get('db/info');
      state.dbinfo = data;
      console.log('$$$ dbinfo loaded ...$mutation/DB_INFO');
      console.log(data);
    },

    async DB_COMMIT (state) {
      console.log('$$$ request ... $mutation/DB_COMMIT');
      let {data} = await axios.get('db/info/commit');
      state.info.commit = data.commit;
    },







    //____________ SEARCH METHODS ___________
    async LOAD_STUDENT_LIST (state) {
      console.log('$$$ request ...$mutation/LOAD_STUDENT_LIST');
      let {data} = await axios.get('/db/student-list');
      state.studentList = data.arg;
    },




    //____________ ADMIN METHODS ____________
    async LOAD_ROOM_LIST (state) {
      console.log('$$$ request ...$mutation/LOAD_ROOM_LIST');
      let {data} = await axios.get('/db/admin/all-room');
      state.adminArr = data.arg;
    },







    //____________ UI METHODS ____________
    CHANGE_THEME (state, {color}) {
      console.log('$$$ request ...$mutation/CHANGE_THEME');
      console.log(color);
      state.theme.applied = styles["colors"][color];
      localStorage.colorConfig = color;
      axios.post('/auth/theme/change', {id: localStorage.id, color});
      console.log('$$$ colorCofig updated ...$mutation/CHANGE_THEME');
    },
    TOGGLE(state, {target, set}) {
      state[target] = set;
    },

    searchCoverBottom(state) {
      state.search.coverBottom.height = "calc(100% - " + String(state.searchArr.length * state.search.recordHeight) + "px)";
    },

    searchLoadingState(state, bool){
      console.log('loading: ', bool);
      state.search.loadingState = bool
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


  }
})