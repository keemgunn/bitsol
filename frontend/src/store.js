import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
// import Joi from 'joi';

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
    // test: false, 
    test: true, 

    //============================
    auth: {
      id:null, accessLevel:0, userName:null,
    },
    dbinfo: {},
    mode: 'search', // search  admin
    theme: {
      applied: styles["colors"][defaultColor],
      colorKeys: Object.keys(styles.colors),
      colors: styles.colors
    },
    
    //============================
    searchArr: [],
    search: {
      keyword: '',
      moreinfo: false,
      recordHeight: 66,
      coverBottom: { "height": "100%" },
      loadingState: 0
    },
    
    //============================
    admin: {
      modal: 'index',
        // index  db  refg  user
      db: {
        options: DBoptions,
        optionKeys: Object.keys(DBoptions),
        keyword:'',
        selected: []
      },
      loadingState: 0
    },

     // ---- DB ----
    roomList: [], studentList: [],
    defIndex: { roomArr: [], studentArr: [] },
    roomIndex: [], studentIndex: [],

    //============================
    alert: null,

    
    //============================
    authTest: {
      id: '2018317024', accessLevel: 3, userName: "테스트"
    },
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
    studentTest: [
      { "student_id": 1, "student_name": " 안희범", "room_id": 31, "room_name": "A0116A", "seat": "A", "term": "YY", "student_number": "711150374", "faculty": "경영대학", "major": "경영학부", "phone": "010-4917-0346", "indate": "2020/02/29" }, { "student_id": 2, "student_name": "가조해", "room_id": null, "room_name": null, "seat": null, "term": "LY", "student_number": "M006", "faculty": "대학원생", "major": "", "phone": "", "indate": "2020/02/17" }, { "student_id": 3, "student_name": "갈삼흠", "room_id": 527, "room_name": "A0703A", "seat": "A", "term": "LY", "student_number": "2018202100", "faculty": "학부생", "major": "", "phone": "01023456257", "indate": "2020/02/11" }, { "student_id": 4, "student_name": "갈재함", "room_id": null, "room_name": null, "seat": null, "term": "LY", "student_number": "F018", "faculty": "교환학생", "major": "", "phone": "", "indate": "2020/02/17" }, { "student_id": 5, "student_name": "강강휘", "room_id": 531, "room_name": "A0705A", "seat": "A", "term": "LY", "student_number": "2019001003", "faculty": "어학연수생", "major": "", "phone": "", "indate": "2020/02/11" }, { "student_id": 6, "student_name": "강경대", "room_id": 195, "room_name": "A0312A", "seat": "A", "term": "YY", "student_number": "711150004", "faculty": "경영대학", "major": "경영학부", "phone": "010-8512-7825", "indate": "2020/02/29" }, { "student_id": 7, "student_name": "강동재", "room_id": 228, "room_name": "A0328B", "seat": "B", "term": "YY", "student_number": "711150310", "faculty": "경영대학", "major": "경영학부", "phone": "010-9396-6622", "indate": "2020/02/29" }, { "student_id": 8, "student_name": "강동호", "room_id": 159, "room_name": "A0237A", "seat": "A", "term": "LY", "student_number": "441280011", "faculty": "생활체육학과", "major": "", "phone": "010-2170-0557", "indate": "2020/02/29" }, { "student_id": 9, "student_name": "강민성", "room_id": 48, "room_name": "A0124B", "seat": "B", "term": "YY", "student_number": "2015706044", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-6231-4539", "indate": "2020/02/29" }, { "student_id": 10, "student_name": "강민혁", "room_id": 320, "room_name": "A0431B", "seat": "B", "term": "YY", "student_number": "2016742046", "faculty": "전자정보공과대학", "major": "전자융합공학과", "phone": "010-2380-5754", "indate": "2020/02/29" }, { "student_id": 11, "student_name": "강성민", "room_id": 199, "room_name": "A0314A", "seat": "A", "term": "YY", "student_number": "614290075", "faculty": "정책법학대학", "major": "행정학과", "phone": "010-2902-1278", "indate": "2020/02/29" }, { "student_id": 12, "student_name": "강수민", "room_id": 852, "room_name": "B0512B", "seat": "B", "term": "YY", "student_number": "331260346", "faculty": "공과대학", "major": "화학공학과", "phone": "010-8796-4454", "indate": "2020/02/29" }, { "student_id": 13, "student_name": "강수아", "room_id": 922, "room_name": "B0622B", "seat": "B", "term": "YY", "student_number": "2019202037", "faculty": "소프트웨어융합대학", "major": "컴퓨터정보공학부", "phone": "010-9113-3414", "indate": "2020/02/29" }, { "student_id": 14, "student_name": "강순혁", "room_id": 250, "room_name": "A0339B", "seat": "B", "term": "YY", "student_number": "161150186", "faculty": "전자정보공과대학", "major": "로봇학부", "phone": "010-3997-9425", "indate": "2020/02/29" }, { "student_id": 15, "student_name": "강안", "room_id": 976, "room_name": "B0723B", "seat": "B", "term": "LY", "student_number": "21089", "faculty": "신입생", "major": "", "phone": "010-5197-0921", "indate": "2020/02/17" }, { "student_id": 16, "student_name": "강용준", "room_id": 473, "room_name": "A0621A", "seat": "A", "term": "YY", "student_number": "161150080", "faculty": "전자정보공과대학", "major": "로봇학부", "phone": "010-2557-8480", "indate": "2020/02/29" }, { "student_id": 17, "student_name": "강윤규", "room_id": 96, "room_name": "A0205B", "seat": "B", "term": "YY", "student_number": "2019603043", "faculty": "자연과학대학", "major": "수학과", "phone": "010-5894-4565", "indate": "2020/02/29" }, { "student_id": 18, "student_name": "강자한", "room_id": 543, "room_name": "A0711A", "seat": "A", "term": "LY", "student_number": "2017203099", "faculty": "학부생", "major": "", "phone": "010-2988-3883", "indate": "2020/02/11" }, { "student_id": 19, "student_name": "강지수", "room_id": 660, "room_name": "B0112B", "seat": "B", "term": "YY", "student_number": "131150121", "faculty": "전자정보공과대학", "major": "전자융합공학과", "phone": "010-7334-9976", "indate": "2020/02/29" }, { "student_id": 20, "student_name": "강지은", "room_id": 763, "room_name": "B0318A", "seat": "A", "term": "YY", "student_number": "711260502", "faculty": "경영대학", "major": "경영학부", "phone": "010-7168-5505", "indate": "2020/02/29" }, { "student_id": 21, "student_name": "강지흔", "room_id": 982, "room_name": "B0726B", "seat": "B", "term": "YY", "student_number": "2017321045", "faculty": "인문사회과학대학", "major": "동북아문화산업학부", "phone": "010-3086-5953", "indate": "2020/02/24" }, { "student_id": 22, "student_name": "강철", "room_id": 508, "room_name": "A0638B", "seat": "B", "term": "YY", "student_number": "711250044", "faculty": "경영대학", "major": "경영학부", "phone": "010-4841-7315", "indate": "2020/02/29" }, { "student_id": 23, "student_name": "강태완", "room_id": 301, "room_name": "A0422A", "seat": "A", "term": "YY", "student_number": "2015726021", "faculty": "소프트웨어융합대학", "major": "소프트웨어학부", "phone": "010-2592-6211", "indate": "2020/02/29" }, { "student_id": 24, "student_name": "강태웅", "room_id": 38, "room_name": "A0119B", "seat": "B", "term": "YY", "student_number": "211150189", "faculty": "소프트웨어융합대학", "major": "컴퓨터정보공학부", "phone": "010-2313-1184", "indate": "2020/02/29" }, { "student_id": 25, "student_name": "강현규", "room_id": 243, "room_name": "A0336A", "seat": "A", "term": "YY", "student_number": "2019323002", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-4670-2193", "indate": "2020/02/29" }, { "student_id": 26, "student_name": "강현서", "room_id": 278, "room_name": "A0410B", "seat": "B", "term": "YY", "student_number": "716110002", "faculty": "경영대학", "major": "경영학부", "phone": "010-3028-1697", "indate": "2020/02/29" }, { "student_id": 27, "student_name": "강현우", "room_id": 189, "room_name": "A0309A", "seat": "A", "term": "YY", "student_number": "2019706082", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-2314-6810", "indate": "2020/02/29" }, { "student_id": 28, "student_name": "강현준", "room_id": 277, "room_name": "A0410A", "seat": "A", "term": "YY", "student_number": "716110001", "faculty": "경영대학", "major": "경영학부", "phone": "010-2576-1697", "indate": "2020/02/29" }, { "student_id": 29, "student_name": "강희주", "room_id": 642, "room_name": "B0103B", "seat": "B", "term": "LY", "student_number": "2020381730", "faculty": "일반대학원", "major": "해당없음", "phone": "010-9053-9471", "indate": "2020/02/29" }, { "student_id": 30, "student_name": "강희지", "room_id": 868, "room_name": "B0520B", "seat": "B", "term": "YY", "student_number": "2017204026", "faculty": "소프트웨어융합대학", "major": "정보융합학부", "phone": "010-3259-1359", "indate": "2020/02/29" }, { "student_id": 31, "student_name": "계민이", "room_id": null, "room_name": null, "seat": null, "term": "LY", "student_number": "2018508142", "faculty": "학부생", "major": "", "phone": "01021858896", "indate": "2020/02/17" }, { "student_id": 32, "student_name": "고가현", "room_id": 787, "room_name": "B0405A", "seat": "A", "term": "YY", "student_number": "2019803021", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-5882-2387", "indate": "2020/02/29" }, { "student_id": 33, "student_name": "고건영", "room_id": 407, "room_name": "A0532A", "seat": "A", "term": "YY", "student_number": "2019117028", "faculty": "공과대학", "major": "건축공학과", "phone": "010-4032-1026", "indate": "2020/02/29" }, { "student_id": 34, "student_name": "고건우", "room_id": 472, "room_name": "A0620B", "seat": "B", "term": "YY", "student_number": "161150014", "faculty": "전자정보공과대학", "major": "로봇학부", "phone": "010-2402-5730", "indate": "2020/02/29" }, { "student_id": 35, "student_name": "고김한비", "room_id": 772, "room_name": "B0322B", "seat": "B", "term": "YY", "student_number": "624290124", "faculty": "정책법학대학", "major": "법학부", "phone": "010-9123-5928", "indate": "2020/02/29" }, { "student_id": 36, "student_name": "고미현", "room_id": 843, "room_name": "B0508A", "seat": "A", "term": "YY", "student_number": "2019803068", "faculty": "정책법학대학", "major": "법학부", "phone": "010-5670-3582", "indate": "2020/02/29" }, { "student_id": 37, "student_name": "고민범", "room_id": 316, "room_name": "A0429B", "seat": "B", "term": "YY", "student_number": "713290127", "faculty": "경영대학", "major": "경영학부", "phone": "010-4743-2343", "indate": "2020/02/29" }, { "student_id": 38, "student_name": "고수아", "room_id": 911, "room_name": "B0617A", "seat": "A", "term": "YY", "student_number": "2018802045", "faculty": "정책법학대학", "major": "행정학과", "phone": "010-3324-6837", "indate": "2020/02/29" }, { "student_id": 39, "student_name": "고승관", "room_id": 518, "room_name": "A0643B", "seat": "B", "term": "YY", "student_number": "2016706039", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-4245-3187", "indate": "2020/02/29" }, { "student_id": 40, "student_name": "고은아", "room_id": 783, "room_name": "B0403A", "seat": "A", "term": "YY", "student_number": "1271014", "faculty": "일반대학원", "major": "해당없음", "phone": "010-8641-6877", "indate": "2020/02/29" }, { "student_id": 41, "student_name": "고은정", "room_id": 883, "room_name": "B0603A", "seat": "A", "term": "YY", "student_number": "551150002", "faculty": "인문사회과학대학", "major": "동북아문화산업학부", "phone": "010-9004-6105", "indate": "2020/02/29" }, { "student_id": 42, "student_name": "고정현", "room_id": 443, "room_name": "A0606A", "seat": "A", "term": "YY", "student_number": "111210013", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-3055-8148", "indate": "2020/02/29" }, { "student_id": 43, "student_name": "고채린", "room_id": 793, "room_name": "B0408A", "seat": "A", "term": "YY", "student_number": "621170028", "faculty": "정책법학대학", "major": "법학부", "phone": "010-3776-4146", "indate": "2020/02/29" }, { "student_id": 44, "student_name": "고천예", "room_id": null, "room_name": null, "seat": null, "term": "LY", "student_number": "F016", "faculty": "교환학생", "major": "", "phone": "", "indate": "2020/02/17" }, { "student_id": 45, "student_name": "고태윤", "room_id": 165, "room_name": "A0240A", "seat": "A", "term": "LY", "student_number": "2019609029", "faculty": "생활체육학과", "major": "", "phone": "010-3559-9138", "indate": "2020/02/29" }, { "student_id": 46, "student_name": "고현지", "room_id": 814, "room_name": "B0418B", "seat": "B", "term": "YY", "student_number": "624290141", "faculty": "정책법학대학", "major": "법학부", "phone": "010-7531-2721", "indate": "2020/02/29" }, { "student_id": 47, "student_name": "공유빈", "room_id": 754, "room_name": "B0313B", "seat": "B", "term": "YY", "student_number": "112290236", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-5468-2711", "indate": "2020/02/29" }, { "student_id": 48, "student_name": "공호석", "room_id": 509, "room_name": "A0639A", "seat": "A", "term": "YY", "student_number": "2016321036", "faculty": "인문사회과학대학", "major": "동북아문화산업학부", "phone": "010-4675-8101", "indate": "2020/02/29" }, { "student_id": 49, "student_name": "구본관", "room_id": 221, "room_name": "A0325A", "seat": "A", "term": "YY", "student_number": "221250022", "faculty": "소프트웨어융합대학", "major": "소프트웨어학부", "phone": "010-5621-9737", "indate": "2020/02/29" }, { "student_id": 50, "student_name": "권구현", "room_id": 187, "room_name": "A0308A", "seat": "A", "term": "YY", "student_number": "141190003", "faculty": "전자정보공과대학", "major": "전기공학과", "phone": "010-6433-2150", "indate": "2020/02/29" }, { "student_id": 51, "student_name": "권나연", "room_id": 731, "room_name": "B0302A", "seat": "A", "term": "YY", "student_number": "331150174", "faculty": "공과대학", "major": "화학공학과", "phone": "010-8808-3451", "indate": "2020/02/29" }, { "student_id": 52, "student_name": "권민석", "room_id": 167, "room_name": "A0241A", "seat": "A", "term": "LY", "student_number": "2018609037", "faculty": "생활체육학과", "major": "", "phone": "010-7204-5996", "indate": "2020/02/29" }, { "student_id": 53, "student_name": "권민지", "room_id": 700, "room_name": "B0211B", "seat": "B", "term": "YY", "student_number": "231260249", "faculty": "소프트웨어융합대학", "major": "정보융합학부", "phone": "010-4557-5827", "indate": "2020/02/29" }, { "student_id": 54, "student_name": "권석진", "room_id": 401, "room_name": "A0529A", "seat": "A", "term": "YY", "student_number": "2018742061", "faculty": "전자정보공과대학", "major": "전자융합공학과", "phone": "010-5331-4427", "indate": "2020/02/29" }, { "student_id": 55, "student_name": "권성민", "room_id": 602, "room_name": "A0740B", "seat": "B", "term": "YY", "student_number": "221170034", "faculty": "소프트웨어융합대학", "major": "소프트웨어학부", "phone": "010-6609-0766", "indate": "2020/02/29" }, { "student_id": 56, "student_name": "권성훈", "room_id": 15, "room_name": "A0108A", "seat": "A", "term": "YY", "student_number": "711150242", "faculty": "경영대학", "major": "경영학부", "phone": "010-8726-8418", "indate": "2020/02/29" }, { "student_id": 57, "student_name": "권수빈", "room_id": 641, "room_name": "B0103A", "seat": "A", "term": "LY", "student_number": "2020891430", "faculty": "경영대학", "major": "경영학부", "phone": "010-2478-8275", "indate": "2020/02/29" }, { "student_id": 58, "student_name": "권순영", "room_id": 497, "room_name": "A0633A", "seat": "A", "term": "YY", "student_number": "2015732067", "faculty": "전자정보공과대학", "major": "전기공학과", "phone": "010-8862-2851", "indate": "2020/02/24" }, { "student_id": 59, "student_name": "권순찬", "room_id": 368, "room_name": "A0512B", "seat": "B", "term": "YY", "student_number": "2016802036", "faculty": "정책법학대학", "major": "행정학과", "phone": "010-2265-2760", "indate": "2020/02/29" }, { "student_id": 60, "student_name": "권승완", "room_id": 451, "room_name": "A0610A", "seat": "A", "term": "YY", "student_number": "121150107", "faculty": "전자정보공과대학", "major": "전자통신공학과", "phone": "010-6220-2987", "indate": "2020/02/29" }, { "student_id": 61, "student_name": "권승훈", "room_id": 23, "room_name": "A0112A", "seat": "A", "term": "YY", "student_number": "111150252", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-5513-0541", "indate": "2020/02/29" }, { "student_id": 62, "student_name": "권영월", "room_id": null, "room_name": null, "seat": null, "term": "LY", "student_number": "F022", "faculty": "교환학생", "major": "", "phone": "", "indate": "2020/02/17" }, { "student_id": 63, "student_name": "권윤정", "room_id": 735, "room_name": "B0304A", "seat": "A", "term": "YY", "student_number": "111250061", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-2317-9499", "indate": "2020/02/29" }, { "student_id": 64, "student_name": "권은서", "room_id": 654, "room_name": "B0109B", "seat": "B", "term": "YY", "student_number": "611260034", "faculty": "정책법학대학", "major": "행정학과", "phone": "010-5152-1964", "indate": "2020/02/29" }, { "student_id": 65, "student_name": "권주원", "room_id": 388, "room_name": "A0522B", "seat": "B", "term": "YY", "student_number": "2018110205", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-3343-0351", "indate": "2020/02/29" }, { "student_id": 66, "student_name": "권진호", "room_id": 596, "room_name": "A0737B", "seat": "B", "term": "YY", "student_number": "424290092", "faculty": "자연과학대학", "major": "전자바이오물리학과", "phone": "010-8612-1543", "indate": "2020/02/29" }, { "student_id": 67, "student_name": "권택성", "room_id": 588, "room_name": "A0733B", "seat": "B", "term": "YY", "student_number": "421150049", "faculty": "자연과학대학", "major": "전자바이오물리학과", "phone": "010-2398-1297", "indate": "2020/02/29" }, { "student_id": 68, "student_name": "권형준", "room_id": 581, "room_name": "A0730A", "seat": "A", "term": "YY", "student_number": "2014405023", "faculty": "정책법학대학", "major": "법학부", "phone": "010-4170-8287", "indate": "2020/02/29" }, { "student_id": 69, "student_name": "기승준", "room_id": 377, "room_name": "A0517A", "seat": "A", "term": "YY", "student_number": "2017732071", "faculty": "전자정보공과대학", "major": "전기공학과", "phone": "010-8489-0963", "indate": "2020/02/29" }, { "student_id": 70, "student_name": "길진휘", "room_id": 625, "room_name": "AB107A", "seat": "A", "term": "YY", "student_number": "2018742041", "faculty": "전자정보공과대학", "major": "전자융합공학과", "phone": "010-5474-9089", "indate": "2020/02/29" }, { "student_id": 71, "student_name": "김가은", "room_id": 684, "room_name": "B0203B", "seat": "B", "term": "YY", "student_number": "131150016", "faculty": "전자정보공과대학", "major": "전자융합공학과", "phone": "010-3248-3251", "indate": "2020/02/29" }, { "student_id": 72, "student_name": "김가은", "room_id": 863, "room_name": "B0518A", "seat": "A", "term": "YY", "student_number": "711260115", "faculty": "경영대학", "major": "경영학부", "phone": "010-4064-2563", "indate": "2020/02/29" }, { "student_id": 73, "student_name": "김강민", "room_id": 439, "room_name": "A0604A", "seat": "A", "term": "YY", "student_number": "111150303", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-3104-9416", "indate": "2020/02/29" }, { "student_id": 74, "student_name": "김건", "room_id": 366, "room_name": "A0511B", "seat": "B", "term": "YY", "student_number": "2018317024", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-9362-7935", "indate": "2020/02/24" }, { "student_id": 75, "student_name": "김건동", "room_id": 183, "room_name": "A0306A", "seat": "A", "term": "YY", "student_number": "151150116", "faculty": "전자정보공과대학", "major": "전자재료공학과", "phone": "010-3207-7015", "indate": "2020/02/29" }, { "student_id": 76, "student_name": "김건우", "room_id": 352, "room_name": "A0504B", "seat": "B", "term": "YY", "student_number": "2016734077", "faculty": "전자정보공과대학", "major": "전자재료공학과", "phone": "010-2254-6395", "indate": "2020/02/29" }, { "student_id": 77, "student_name": "김경민", "room_id": 463, "room_name": "A0616A", "seat": "A", "term": "YY", "student_number": "141250030", "faculty": "전자정보공과대학", "major": "전기공학과", "phone": "010-5619-5332", "indate": "2020/02/29" }, { "student_id": 78, "student_name": "김경민", "room_id": 478, "room_name": "A0623B", "seat": "B", "term": "YY", "student_number": "2015114015", "faculty": "공과대학", "major": "화학공학과", "phone": "010-3489-8223", "indate": "2020/02/29" }, { "student_id": 79, "student_name": "김경주", "room_id": 669, "room_name": "B0117A", "seat": "A", "term": "YY", "student_number": "141150025", "faculty": "전자정보공과대학", "major": "전기공학과", "phone": "010-8986-3234", "indate": "2020/02/29" }, { "student_id": 80, "student_name": "김고은", "room_id": 904, "room_name": "B0613B", "seat": "B", "term": "YY", "student_number": "2018605046", "faculty": "자연과학대학", "major": "화학과", "phone": "010-3331-0194", "indate": "2020/02/29" }, { "student_id": 81, "student_name": "김광현", "room_id": 101, "room_name": "A0208A", "seat": "A", "term": "YY", "student_number": "621150105", "faculty": "정책법학대학", "major": "법학부", "phone": "010-2202-4325", "indate": "2020/02/29" }, { "student_id": 82, "student_name": "김광환", "room_id": 63, "room_name": "A0132A", "seat": "A", "term": "YY", "student_number": "E1251002", "faculty": "일반대학원", "major": "해당없음", "phone": "010-9614-9609", "indate": "2020/02/29" }, { "student_id": 83, "student_name": "김기민", "room_id": 813, "room_name": "B0418A", "seat": "A", "term": "YY", "student_number": "531150462", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-9279-8415", "indate": "2020/02/29" }, { "student_id": 84, "student_name": "김기용", "room_id": 113, "room_name": "A0214A", "seat": "A", "term": "YY", "student_number": "321150026", "faculty": "공과대학", "major": "건축공학과", "phone": "010-6635-2915", "indate": "2020/02/29" }, { "student_id": 85, "student_name": "김나은", "room_id": 773, "room_name": "B0323A", "seat": "A", "term": "YY", "student_number": "2019323066", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-3321-8590", "indate": "2020/02/29" }, { "student_id": 86, "student_name": "김나현", "room_id": 882, "room_name": "B0602B", "seat": "B", "term": "YY", "student_number": "151150062", "faculty": "전자정보공과대학", "major": "전자재료공학과", "phone": "010-7195-2953", "indate": "2020/02/29" }, { "student_id": 87, "student_name": "김나현", "room_id": 890, "room_name": "B0606B", "seat": "B", "term": "YY", "student_number": "2017116026", "faculty": "공과대학", "major": "환경공학과", "phone": "010-9370-4261", "indate": "2020/02/29" }, { "student_id": 88, "student_name": "김낙현", "room_id": 349, "room_name": "A0503A", "seat": "A", "term": "YY", "student_number": "2016734006", "faculty": "전자정보공과대학", "major": "전자재료공학과", "phone": "010-8753-2803", "indate": "2020/02/29" }, { "student_id": 89, "student_name": "김남서", "room_id": 324, "room_name": "A0433B", "seat": "B", "term": "YY", "student_number": "624290062", "faculty": "정책법학대학", "major": "법학부", "phone": "010-2400-0623", "indate": "2020/02/29" }, { "student_id": 90, "student_name": "김다리야", "room_id": 943, "room_name": "B0707A", "seat": "A", "term": "LY", "student_number": "2018804033", "faculty": "학부생", "major": "", "phone": "01068699029", "indate": "2020/02/11" }, { "student_id": 91, "student_name": "김다연", "room_id": 652, "room_name": "B0108B", "seat": "B", "term": "YY", "student_number": "231150019", "faculty": "소프트웨어융합대학", "major": "정보융합학부", "phone": "010-9082-5391", "indate": "2020/02/29" }, { "student_id": 92, "student_name": "김다영", "room_id": 664, "room_name": "B0114B", "seat": "B", "term": "YY", "student_number": "321150149", "faculty": "공과대학", "major": "건축공학과", "phone": "010-4921-8706", "indate": "2020/02/29" }, { "student_id": 93, "student_name": "김다은", "room_id": 811, "room_name": "B0417A", "seat": "A", "term": "YY", "student_number": "2019610004", "faculty": "자연과학대학", "major": "전자바이오물리학과", "phone": "010-8914-9434", "indate": "2020/02/29" }, { "student_id": 94, "student_name": "김대환", "room_id": 449, "room_name": "A0609A", "seat": "A", "term": "YY", "student_number": "121150001", "faculty": "전자정보공과대학", "major": "전자통신공학과", "phone": "010-5353-7827", "indate": "2020/02/29" }, { "student_id": 95, "student_name": "김도연", "room_id": 779, "room_name": "B0401A", "seat": "A", "term": "YY", "student_number": "2018803050", "faculty": "정책법학대학", "major": "법학부", "phone": "010-8610-6547", "indate": "2020/02/29" }, { "student_id": 96, "student_name": "김도현", "room_id": 611, "room_name": "A0745A", "seat": "A", "term": "YY", "student_number": "2019605024", "faculty": "자연과학대학", "major": "화학과", "phone": "010-9358-5290", "indate": "2020/02/29" }, { "student_id": 97, "student_name": "김동엽", "room_id": 610, "room_name": "A0744B", "seat": "B", "term": "YY", "student_number": "2019323028", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-7400-7076", "indate": "2020/02/29" }, { "student_id": 98, "student_name": "김동완", "room_id": 404, "room_name": "A0530B", "seat": "B", "term": "YY", "student_number": "2019732001", "faculty": "전자정보공과대학", "major": "전기공학과", "phone": "010-3994-6943", "indate": "2020/02/29" }, { "student_id": 99, "student_name": "김동우", "room_id": 280, "room_name": "A0411B", "seat": "B", "term": "YY", "student_number": "151250017", "faculty": "전자정보공과대학", "major": "전자재료공학과", "phone": "010-5198-6927", "indate": "2020/02/29" }, { "student_id": 100, "student_name": "김동욱", "room_id": 521, "room_name": "A0645A", "seat": "A", "term": "YY", "student_number": "2016707002", "faculty": "전자정보공과대학", "major": "전자통신공학과", "phone": "010-4651-5169", "indate": "2020/02/29" }, { "student_id": 101, "student_name": "김동현", "room_id": 115, "room_name": "A0215A", "seat": "A", "term": "YY", "student_number": "111150234", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-4465-9596", "indate": "2020/02/29" }, { "student_id": 102, "student_name": "김동현", "room_id": 118, "room_name": "A0216B", "seat": "B", "term": "YY", "student_number": "211170015", "faculty": "소프트웨어융합대학", "major": "컴퓨터정보공학부", "phone": "010-2955-3130", "indate": "2020/02/29" }, { "student_id": 103, "student_name": "김동현", "room_id": 400, "room_name": "A0528B", "seat": "B", "term": "YY", "student_number": "2018741024", "faculty": "전자정보공과대학", "major": "로봇학부", "phone": "010-2210-5392", "indate": "2020/02/29" }, { "student_id": 104, "student_name": "김동환", "room_id": 211, "room_name": "A0320A", "seat": "A", "term": "LY", "student_number": "2016508112", "faculty": "경영대학", "major": "경영학부", "phone": "010-3103-7914", "indate": "2020/02/24" }, { "student_id": 105, "student_name": "김동훈", "room_id": 302, "room_name": "A0422B", "seat": "B", "term": "YY", "student_number": "2016732018", "faculty": "전자정보공과대학", "major": "전기공학과", "phone": "010-3529-8905", "indate": "2020/02/29" }, { "student_id": 106, "student_name": "김량현", "room_id": 742, "room_name": "B0307B", "seat": "B", "term": "YY", "student_number": "431150097", "faculty": "자연과학대학", "major": "화학과", "phone": "010-2740-2276", "indate": "2020/02/29" }, { "student_id": 107, "student_name": "김마리나", "room_id": 944, "room_name": "B0707B", "seat": "B", "term": "LY", "student_number": "2018804034", "faculty": "학부생", "major": "", "phone": "01076364515", "indate": "2020/02/11" }, { "student_id": 108, "student_name": "김무성", "room_id": 468, "room_name": "A0618B", "seat": "B", "term": "YY", "student_number": "536110009", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-7410-6176", "indate": "2020/02/29" }
    ],
    roomTest: [
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
      { 
        "name": "A0101", 
        "A": { 
          "room_id": 1, 
          "room_name": "A0101A", 
          "seat": "A", 
          "student_id": 88, 
          "student_name": "임정현", 
          "term": "YY", 
          "student_number": "211160022", 
          "faculty": "소프트웨어융합대학", 
          "major": "컴퓨터정보공학부", 
          "phone": "010-2276-8974", 
          "indate": "2020/02/29" 
        }, 
        "B": { 
          "room_id": 2, 
          "room_name": "A0101B", 
          "seat": "B", 
          "student_id": 88, 
          "student_name": "이대희", 
          "term": "YY", 
          "student_number": "331150018", 
          "faculty": "공과대학", 
          "major": "화학공학과", 
          "phone": "010-8241-8393", 
          "indate": "2020/02/29" 
        }
      },
    ],
    testIndex: [],
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
      let {data} = await axios.get('/db/info');
      state.dbinfo = data;
      console.log('$$$ dbinfo loaded ...$mutation/DB_INFO');
      console.log(data);
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
      }
      let indexArr = [];
      for(var j=0; j < data.arg.length/2; j++) {
        indexArr.push(j);
      }
      state.defIndex.roomArr = indexArr;
      state.roomIndex = indexArr;
      state.roomList = dataArr;
    },

    async LOAD_STUDENT_LIST (state) {
      state.admin.loadingState = 1;
      console.log('$$$ request ...$mutation/LOAD_STUDENT_LIST');
      let indexArr = [];
      let {data} = await axios.get('/db/student-list');
      for(var i=0; i < data.arg.length; i++){
        indexArr.push(i);
      }
      state.defIndex.studentArr = indexArr;
      state.studentIndex = indexArr;
      state.studentList = data.arg;
    },
    

    //______________ SEARCH METHODS ____________

    async SEARCH (state, keyword) {
      state.search.loadingState = 1;
      console.log('$$$ request ...$mutation/SEARCH');
      let {data} = await axios.post('/db/search', {keyword});
      state.searchArr = data.arg;
    },

    async SEARCH_room (state, keyword) {
      state.admin.loadingState = 1;
      if(keyword === ''){
        console.log('$$$ ALL ROOM LIST ...$mutation/SEARCH_room');
        state.roomIndex = state.defIndex.roomArr;
      }else{
        console.log('$$$ request ...$mutation/SEARCH_room');
        let Arr = [];
        let calc0, calc1, raw;
        let {data} = await axios.post('/db/search/room', {keyword});
        for(var j=0; j < data.arg.length; j++){
          raw = (data["arg"][j]["room_id"]);
          calc1 = parseInt(raw/2) + raw%2 - 1;
          if(calc0 !== calc1){
            Arr.push(calc1);
          }calc0 = calc1;
        }
        state.roomIndex = Arr;
      }
    },
    
    async SEARCH_student (state, keyword) {
      state.admin.loadingState = 1;
      if(keyword === ''){
        console.log('$$$ ALL STUDENT LIST ...$mutation/SEARCH_student');
        state.studentIndex = state.defIndex.studentArr;
      }else{
        console.log('$$$ request ...$mutation/SEARCH_room');
        let Arr = [];
        let {data} = await axios.post('/db/search/student', {keyword});
        for(var i=0; i < data.arg.length; i++){
          Arr.push(data["arg"][i]["student_id"]);
        }
        state.studentIndex = Arr;
      }
    },

    SEARCH_test (state) {
      let Arr = [];
      for(var i=0; i<state.roomTest.length; i++){
        Arr.push(i);
      }
      state.testIndex = Arr;
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
      state.search.loadingState = bool;
      console.log('loading: ', bool);
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