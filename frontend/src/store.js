import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

import colors from './assets/styles/colors.json';
import test from './test.json';

const defaultColor = "default";``
const DBoptions = {
  showEmpty: false,
  showForeign: false
};
let defIndex= { roomArr: [], studentArr: [] };


// const resourceHost = 'http://localhost:3000'
Vue.use(Vuex)
export default new Vuex.Store({
  state: { //============================
    // test: false, 
    test: true, 
    //-------------------------
    auth: {
      id:null, accessLevel:0, userName:null,
    },
    dbinfo: {},
    versioninfo: {},
    userinfo: {},
    mode: 'admin', // search  admin
    theme: {
      applied: colors[defaultColor],
      colorKeys: Object.keys(colors),
      colors: colors
    },
    
    //-------------------------
    searchArr: [],
    search: {
      keyword: '',
      moreinfo: false,
      recordHeight: 66,
      coverBottom: { "height": "100%" },
      loadingState: 0
    },

    //-------------------------
    admin: {
      modal: 'index',
        // index  db  refg  user
      db: {
        options: DBoptions,
        optionKeys: Object.keys(DBoptions),
        keyword:'',
        roomIndex: [], studentIndex: [],
        roomList: [], studentList: [],
        selected: [],
        updated: []
      },
      loadingState: 0,
      lastRequest: ''
    },
    
    //-------------------------
    alert: null,

  },
  getters: { //============================
    AUTH(state){
      if(state.test){
        return test['authTest']
      }else{
        return state.auth
      }
    },

    ROOM_LIST(state){
      if(state.test){
        return test.roomTest
      }else{
        return state.admin.db.roomList
      }
    },
    STUDENT_LIST(state){
      if(state.test){
        return test.studentTest
      }else{
        return state.admin.db.studentList
      }
    },
    ROOM_INDEX(state){
      if(state.test){
        return test['testIndex']
      }else{
        return state.admin.db.roomIndex
      }
    },
    STUDENT_INDEX(state){
      if(state.test){
        return test['testIndex']
      }else{
        return state.admin.db.studentIndex
      }
    },


  },
  mutations: { //============================

    //___________ AUTHENTICATION METHODS
    async LOGIN (state, {data}) {
      console.log('$$$ request ...$mutation/LOGIN');
      state.auth.id = data.id;
      localStorage.id = data.id;
      state.auth.userName = data.config.userName;
      localStorage.userName = data.config.userName;
      state.theme.applied = colors[data.config.colorConfig];
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
      state.theme.applied = colors[localStorage.colorConfig];
    },

    LOGOUT (state) {
      console.log('$$$ request ...$mutation/LOGOUT');
      state.auth.accessLevel = 0;
      state.auth.id = null;
      state.auth.userName = null;
      state.theme.applied = colors[defaultColor];
      delete localStorage.id ;
      delete localStorage.userName ;
      localStorage.colorConfig = defaultColor;
    },


    //______________ DB METHODS
    async DB_INFO (state) {
      console.log('$$$ request ...$mutation/DB_INFO');
      if(state.test){
        state.dbinfo = test.dbinfo;
      }else{
        let {data} = await axios.get('/db/info');
        state.dbinfo = data;
        console.log('$$$ dbinfo loaded ...$mutation/DB_INFO');
      }
    },

    async VERSION_INFO (state) {
      console.log('$$$ request ...$mutation/VERSION_INFO');
      if(state.test){
        state.versioninfo = test.versioninfo;
      }else{
        let {data} = await axios.get('/db/version-info');
        state.versioninfo = data;
        console.log('$$$ versioninfo loaded ...$mutation/VERSION_INFO');
      }
    },

    async USER_INFO (state) {
      console.log('$$$ request ...$mutation/USER_INFO');
      if(state.test){
        state.userinfo = test.userinfo;
      }else{
        let {data} = await axios.get('/db/user-info');
        state.userinfo = data;
        console.log('$$$ userinfo loaded ...$mutation/USER_INFO');
      }
    },

    async DB_COMMIT (state) {
      console.log('$$$ request ... $mutation/DB_COMMIT');
      let {data} = await axios.get('/db/info/commit');
      state.info.commit = data.commit;
    },

    async LOAD_ROOM_LIST (state) {
      state.admin.loadingState = 1;
      console.log('$$$ request ...$mutation/LOAD_ROOM_LIST');
      let dataArr = []; 
      let obj, name; let count = 0;
      let {data} = await axios.get('/db/room-list');
      for(var i=0; i < data.arg.length; i++){
        if(count){ // count: 1
          obj.B = data["arg"][i];
          dataArr.push(obj);
          count = 0;
        }else{ // count: 0
          name = data["arg"][i]["room_name"];
          name = name.slice(0, -1);
          obj = {
            "name": name,
            "A": data["arg"][i],
            "B": {}
          };
          count = 1;
        }
      } let indexArr = [];
      for(var j=0; j < data.arg.length/2; j++) {
        indexArr.push(j);
      }
      defIndex.roomArr = indexArr;
      state.admin.db.roomIndex = indexArr;
      state.admin.db.roomList = dataArr;
      console.log('...roomList DONE!', state.admin.db.roomList.length);
    },
    
    async LOAD_STUDENT_LIST (state) {
      state.admin.loadingState = 1;
      console.log('$$$ request ...$mutation/LOAD_STUDENT_LIST');
      let indexArr = [];
      let {data} = await axios.get('/db/student-list');
      for(var i=0; i < data.arg.length; i++){
        indexArr.push(i);
      }
      defIndex.studentArr = indexArr;
      state.admin.db.studentIndex = indexArr;
      state.admin.db.studentList = data.arg;
      console.log('...studentList DONE!', state.admin.db.studentList.length);
    },


    //______________ SEARCH METHODS
    async SEARCH (state, keyword) {
      state.search.loadingState = 1;
      console.log('$$$ request ...$mutation/SEARCH');
      let {data} = await axios.post('/db/search', {keyword, account: state.auth.id});
      state.searchArr = data.arg;
    },

    async SEARCH_room (state) {
      state.admin.loadingState = 1;
      if(state.admin.db.keyword === ''){
        console.log('$$$ ALL ROOM LIST ...$mutation/SEARCH_room');
        state.admin.db.roomIndex = defIndex.roomArr;
      }else{
        console.log('$$$ request ...$mutation/SEARCH_room');
        let Arr = [];
        let calc0, calc1, raw;
        let {data} = await axios.post('/db/search/room', {keyword:state.admin.db.keyword, account: state.auth.id});
        for(var j=0; j < data.arg.length; j++){
          raw = (data["arg"][j]["room_id"]);
          calc1 = parseInt(raw/2) + raw%2 - 1;
          if(calc0 !== calc1){
            Arr.push(calc1);
          }calc0 = calc1;
        }
        state.admin.db.roomIndex = Arr;
      }
    },
    
    async SEARCH_student (state) {
      state.admin.loadingState = 1;
      if(state.admin.db.keyword === ''){
        console.log('$$$ ALL STUDENT LIST ...$mutation/SEARCH_student');
        state.admin.db.studentIndex = defIndex.studentArr;
      }else{
        console.log('$$$ request ...$mutation/SEARCH_student');
        let Arr = [];
        let {data} = await axios.post('/db/search/student', {keyword:state.admin.db.keyword, account: state.auth.id});
        for(var i=0; i < data.arg.length; i++){
          Arr.push(data["arg"][i]["student_id"]-1);
        }
        state.admin.db.studentIndex = Arr;
      }
    },



    //____________ UI METHODS
    CHANGE_THEME (state, {color}) {
      console.log('$$$ request ...$mutation/CHANGE_THEME');
      console.log(color);
      state.theme.applied = colors[color];
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
      state.search.loadingState = bool;
      console.log('loading: ', bool);
    },

    adminLoadingState(state, bool){
      state.admin.db.loadingState = bool;
      console.log('loading: ', bool);
    },
    adminStudentSelect(state, student_id){
      console.log("$$$ ad/st-Select: ", student_id);
      if(state.admin.db.selected.includes(student_id)){
        let position = state.admin.db.selected.indexOf(student_id);
        state.admin.db.selected.splice(position, 1);
      }else{
        state.admin.db.selected.push(student_id);
      }
    },

    //_______________________________
    INITIALIZE(state, target){
      if(target === 'admin'){
        state.admin.modal = 'index'
        state.admin.db.options = DBoptions;
        state.admin.db.keyword = '';
        state.admin.db.selected = [];
        state.admin.db.roomIndex = defIndex.roomArr;
        state.admin.db.studentIndex = defIndex.studentArr;
      }
      if(target === 'db'){
        state.admin.db.options = DBoptions;
        state.admin.db.keyword = '';
        state.admin.db.selected = [];
        state.admin.db.roomIndex = defIndex.roomArr;
        state.admin.db.studentIndex = defIndex.roomArr;
      }
      if(target === 'search'){
        state.searchArr = [];
        state.search.keyword = '';
      }
    },

    ALERT (state, msg) {
      console.log(msg);
      state.alert = msg;
    },
    
  },
  actions: { //============================

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