import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex)
// const resourceHost = 'http://localhost:3000'

import styles from './assets/styles.json';
const defaultColor = "default"

export default new Vuex.Store({
  state: {

    auth: {
      id:null, accessLevel:0, userName:null,
      // id: '2018317024', accessLevel: 3, userName: "김건",
    },
    dbinfo: {},
    mode: 'search', 

    searchArr: [],
    testArr: [
      {
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈1',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 708,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈2',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 709,
        '19_1': 1,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 710,
        '19_1': 2,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 711,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 712,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 713,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 714,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 715,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 716,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 717,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 718,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 719,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 720,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 721,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 722,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 723,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 724,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 725,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 726,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 727,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 728,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 729,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 730,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 731,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 732,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      },{
        room_id: 408,
        room_name: 'A0532B',
        student_name: '이호빈3',
        building: 'A',
        seat: 'B',
        term: 'YY',
        student_number: '2019117029',
        faculty: '공과대학',
        major: '건축공학과',
        phone: '010-9339-0689',
        indate: '2020/02/29',
        student_id: 733,
        '19_1': 0,
        '19_2': 0,
        '19_3': 0,
        '19_4': 0,
        '19_5': 0,
        '19_6': 0,
        '19_7': 0,
        '19_8': 0,
        '19_9': 0,
        '19_10': 0,
        '19_11': 0,
        '19_12': 0,
        '20_1': 0,
        '20_2': 0,
        '20_3': 0
      }
    ],
    search: {
      keyword: '',
      moreinfo: false,
      recordHeight: 66,
      coverBottom: { "height": "100%" },
      loadingState: 0
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

    async DB_INFO (state) {
      console.log('$$$ request ...$mutation/DB_INFO');
      const {data} = await axios.get('db/info');
      state.dbinfo = data;
      console.log('$$$ dbinfo loaded ...$mutation/DB_INFO');
      console.log(data);
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

    //____________ UI METHODS ____________
    CHANGE_THEME (state, {color}) {
      console.log('$$$ request ...$mutation/CHANGE_THEME');
      console.log(color);
      state.theme.applied = styles["colors"][color];
      localStorage.colorConfig = color;
      console.log('$$$ colorCofig updated ...$mutation/CHANGE_THEME');
    },

    indexChangeMode(state, set) {
      state.mode = set;
    },

    searchCoverBottom(state) {
      state.search.coverBottom.height = "calc(100% - " + String(state.searchArr.length * state.search.recordHeight) + "px)";
    },

    searchLoadingState(state, bool){
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