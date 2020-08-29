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

    auth: {
      // id:null, accessLevel:0, userName:null,
      id: '2018317024', accessLevel: 3, userName: "김건",
    },
    mode: 'admin', // search  admin
    dbinfo: {},

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
    
    roomList: null,
    roomTest: [
      { "room_id": 1, "room_name": "A0101A", "building": "A", "floor": "01", "room_number": "01", "seat": "A", "student_name": "임정현", "term": "YY", "student_number": "211160022", "faculty": "소프트웨어융합대학", "major": "컴퓨터정보공학부", "phone": "010-2276-8974", "indate": "2020/02/29", "serial_number": "200102M211160022", "student_id": 726, "19_1": 2, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 2, "room_name": "A0101B", "building": "A", "floor": "01", "room_number": "01", "seat": "B", "student_name": "이대희", "term": "YY", "student_number": "331150018", "faculty": "공과대학", "major": "화학공학과", "phone": "010-8241-8393", "indate": "2020/02/29", "serial_number": "200102M331150018", "student_id": 600, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 3, "room_name": "A0102A", "building": "A", "floor": "01", "room_number": "02", "seat": "A", "student_name": "이동헌", "term": "YY", "student_number": "311150134", "faculty": "공과대학", "major": "건축학과", "phone": "010-8393-0725", "indate": "2020/02/29", "serial_number": "200102M311150134", "student_id": 604, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 4, "room_name": "A0102B", "building": "A", "floor": "01", "room_number": "02", "seat": "B", "student_name": "정원빈", "term": "YY", "student_number": "531150257", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-7229-0246", "indate": "2020/02/29", "serial_number": "200102M531150257", "student_id": 785, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 5, "room_name": "A0103A", "building": "A", "floor": "01", "room_number": "03", "seat": "A", "student_name": "박제영", "term": "YY", "student_number": "211160116", "faculty": "소프트웨어융합대학", "major": "컴퓨터정보공학부", "phone": "010-2257-6289", "indate": "2020/02/29", "serial_number": "200102M211160116", "student_id": 355, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 6, "room_name": "A0103B", "building": "A", "floor": "01", "room_number": "03", "seat": "B", "student_name": "송준홍", "term": "YY", "student_number": "121150060", "faculty": "전자정보공과대학", "major": "전자통신공학과", "phone": "010-3810-5930", "indate": "2020/02/29", "serial_number": "200102M121150060", "student_id": 458, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 7, "room_name": "A0104A", "building": "A", "floor": "01", "room_number": "04", "seat": "A", "student_name": "김승원", "term": "YY", "student_number": "121150010", "faculty": "전자정보공과대학", "major": "전자통신공학과", "phone": "010-8334-4826", "indate": "2020/02/29", "serial_number": "200102M121150010", "student_id": 157, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 8, "room_name": "A0104B", "building": "A", "floor": "01", "room_number": "04", "seat": "B", "student_name": "김현규", "term": "YY", "student_number": "231160032", "faculty": "소프트웨어융합대학", "major": "정보융합학부", "phone": "010-5570-4345", "indate": "2020/02/29", "serial_number": "200102M231160032", "student_id": 228, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 9, "room_name": "A0105A", "building": "A", "floor": "01", "room_number": "05", "seat": "A", "student_name": "정서원", "term": "YY", "student_number": "711150226", "faculty": "경영대학", "major": "경영학부", "phone": "010-2796-8841", "indate": "2020/02/29", "serial_number": "200102M711150226", "student_id": 774, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 10, "room_name": "A0105B", "building": "A", "floor": "01", "room_number": "05", "seat": "B", "student_name": "이준서", "term": "YY", "student_number": "331190019", "faculty": "공과대학", "major": "화학공학과", "phone": "010-8999-7293", "indate": "2020/02/29", "serial_number": "200102M331190019", "student_id": 673, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 11, "room_name": "A0106A", "building": "A", "floor": "01", "room_number": "06", "seat": "A", "student_name": "이승하", "term": "YY", "student_number": "621190002", "faculty": "정책법학대학", "major": "법학부", "phone": "010-3925-1315", "indate": "2020/02/29", "serial_number": "200102M621190002", "student_id": 632, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 12, "room_name": "A0106B", "building": "A", "floor": "01", "room_number": "06", "seat": "B", "student_name": "하성훈", "term": "YY", "student_number": "716110003", "faculty": "경영대학", "major": "경영학부", "phone": "010-8370-4236", "indate": "2020/02/29", "serial_number": "200102M716110003", "student_id": 908, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 13, "room_name": "A0107A", "building": "A", "floor": "01", "room_number": "07", "seat": "A", "student_name": "박정훈", "term": "YY", "student_number": "212290089", "faculty": "소프트웨어융합대학", "major": "컴퓨터정보공학부", "phone": "010-3256-3696", "indate": "2020/02/29", "serial_number": "200102M212290089", "student_id": 354, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 14, "room_name": "A0107B", "building": "A", "floor": "01", "room_number": "07", "seat": "B", "student_name": "박경민", "term": "YY", "student_number": "421150004", "faculty": "자연과학대학", "major": "전자바이오물리학과", "phone": "010-5652-3193", "indate": "2020/02/29", "serial_number": "200102M421150004", "student_id": 299, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 15, "room_name": "A0108A", "building": "A", "floor": "01", "room_number": "08", "seat": "A", "student_name": "권성훈", "term": "YY", "student_number": "711150242", "faculty": "경영대학", "major": "경영학부", "phone": "010-8726-8418", "indate": "2020/02/29", "serial_number": "200102M711150242", "student_id": 56, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 16, "room_name": "A0108B", "building": "A", "floor": "01", "room_number": "08", "seat": "B", "student_name": "문건웅", "term": "YY", "student_number": "141150021", "faculty": "전자정보공과대학", "major": "전기공학과", "phone": "010-7454-9020", "indate": "2020/02/29", "serial_number": "200102M141150021", "student_id": 291, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 17, "room_name": "A0109A", "building": "A", "floor": "01", "room_number": "09", "seat": "A", "student_name": "박종권", "term": "YY", "student_number": "311180014", "faculty": "공과대학", "major": "건축학과", "phone": "010-8556-5139", "indate": "2020/02/29", "serial_number": "200102M311180014", "student_id": 356, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 18, "room_name": "A0109B", "building": "A", "floor": "01", "room_number": "09", "seat": "B", "student_name": "신성민", "term": "YY", "student_number": "211160026", "faculty": "소프트웨어융합대학", "major": "컴퓨터정보공학부", "phone": "010-9009-0158", "indate": "2020/02/29", "serial_number": "200102M211160026", "student_id": 466, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 19, "room_name": "A0110A", "building": "A", "floor": "01", "room_number": "10", "seat": "A", "student_name": "유완승", "term": "YY", "student_number": "111150220", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-5632-2015", "indate": "2020/02/29", "serial_number": "200102M111150220", "student_id": 551, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 20, "room_name": "A0110B", "building": "A", "floor": "01", "room_number": "10", "seat": "B", "student_name": "신승빈", "term": "YY", "student_number": "151260020", "faculty": "전자정보공과대학", "major": "전자재료공학과", "phone": "010-8208-4413", "indate": "2020/02/29", "serial_number": "200102M151260020", "student_id": 467, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 21, "room_name": "A0111A", "building": "A", "floor": "01", "room_number": "11", "seat": "A", "student_name": "박준모", "term": "YY", "student_number": "151170017", "faculty": "전자정보공과대학", "major": "전자재료공학과", "phone": "010-2652-3666", "indate": "2020/02/29", "serial_number": "200102M151170017", "student_id": 360, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 22, "room_name": "A0111B", "building": "A", "floor": "01", "room_number": "11", "seat": "B", "student_name": "조민석", "term": "YY", "student_number": "531150345", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-5648-1030", "indate": "2020/02/29", "serial_number": "200102M531150345", "student_id": 815, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 23, "room_name": "A0112A", "building": "A", "floor": "01", "room_number": "12", "seat": "A", "student_name": "권승훈", "term": "YY", "student_number": "111150252", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-5513-0541", "indate": "2020/02/29", "serial_number": "200102M111150252", "student_id": 61, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 24, "room_name": "A0112B", "building": "A", "floor": "01", "room_number": "12", "seat": "B", "student_name": "배준현", "term": "YY", "student_number": "131150073", "faculty": "전자정보공과대학", "major": "전자융합공학과", "phone": "010-2053-1106", "indate": "2020/02/29", "serial_number": "200102M131150073", "student_id": 392, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 25, "room_name": "A0113A", "building": "A", "floor": "01", "room_number": "13", "seat": "A", "student_name": "박근홍", "term": "YY", "student_number": "321260103", "faculty": "공과대학", "major": "건축공학과", "phone": "010-2861-8445", "indate": "2020/02/29", "serial_number": "200102M321260103", "student_id": 306, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 26, "room_name": "A0113B", "building": "A", "floor": "01", "room_number": "13", "seat": "B", "student_name": "황준우", "term": "YY", "student_number": "141260199", "faculty": "전자정보공과대학", "major": "전기공학과", "phone": "010-9973-6080", "indate": "2020/02/29", "serial_number": "200102M141260199", "student_id": 964, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 27, "room_name": "A0114A", "building": "A", "floor": "01", "room_number": "14", "seat": "A", "student_name": "윤태영", "term": "YY", "student_number": "151260302", "faculty": "전자정보공과대학", "major": "전자재료공학과", "phone": "010-2265-2574", "indate": "2020/02/29", "serial_number": "200102M151260302", "student_id": 580, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 28, "room_name": "A0114B", "building": "A", "floor": "01", "room_number": "14", "seat": "B", "student_name": "김인송", "term": "YY", "student_number": "211250012", "faculty": "소프트웨어융합대학", "major": "컴퓨터정보공학부", "phone": "010-2184-0516", "indate": "2020/02/29", "serial_number": "200102M211250012", "student_id": 185, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 29, "room_name": "A0115A", "building": "A", "floor": "01", "room_number": "15", "seat": "A", "student_name": "허창민", "term": "YY", "student_number": "221150118", "faculty": "소프트웨어융합대학", "major": "소프트웨어학부", "phone": "010-2749-0782", "indate": "2020/02/29", "serial_number": "200102M221150118", "student_id": 934, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 30, "room_name": "A0115B", "building": "A", "floor": "01", "room_number": "15", "seat": "B", "student_name": "임동언", "term": "YY", "student_number": "331260096", "faculty": "공과대학", "major": "화학공학과", "phone": "010-6605-8231", "indate": "2020/02/29", "serial_number": "200102M331260096", "student_id": 715, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 31, "room_name": "A0116A", "building": "A", "floor": "01", "room_number": "16", "seat": "A", "student_name": " 안희범", "term": "YY", "student_number": "711150374", "faculty": "경영대학", "major": "경영학부", "phone": "010-4917-0346", "indate": "2020/02/29", "serial_number": "200102M711150374", "student_id": 1, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 32, "room_name": "A0116B", "building": "A", "floor": "01", "room_number": "16", "seat": "B", "student_name": "윤어진", "term": "YY", "student_number": "551250046", "faculty": "인문사회과학대학", "major": "동북아문화산업학부", "phone": "010-5754-9911", "indate": "2020/02/29", "serial_number": "200102M551250046", "student_id": 572, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 33, "room_name": "A0117A", "building": "A", "floor": "01", "room_number": "17", "seat": "A", "student_name": "정민혁", "term": "YY", "student_number": "551150018", "faculty": "인문사회과학대학", "major": "동북아문화산업학부", "phone": "010-9071-6190", "indate": "2020/02/29", "serial_number": "200102M551150018", "student_id": 773, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 34, "room_name": "A0117B", "building": "A", "floor": "01", "room_number": "17", "seat": "B", "student_name": "황태수", "term": "YY", "student_number": "624290103", "faculty": "정책법학대학", "major": "법학부", "phone": "010-9373-2862", "indate": "2020/02/29", "serial_number": "200102M624290103", "student_id": 965, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 35, "room_name": "A0118A", "building": "A", "floor": "01", "room_number": "18", "seat": "A", "student_name": "박근도", "term": "YY", "student_number": "541150051", "faculty": "인문사회과학대학", "major": "산업심리학과", "phone": "010-2372-8750", "indate": "2020/02/29", "serial_number": "200102M541150051", "student_id": 305, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 36, "room_name": "A0118B", "building": "A", "floor": "01", "room_number": "18", "seat": "B", "student_name": "박진수", "term": "YY", "student_number": "131150003", "faculty": "전자정보공과대학", "major": "전자융합공학과", "phone": "010-5124-5620", "indate": "2020/02/29", "serial_number": "200102M131150003", "student_id": 370, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }, 
      { "room_id": 37, "room_name": "A0119A", "building": "A", "floor": "01", "room_number": "19", "seat": "A", "student_name": "송원대", "term": "YY", "student_number": "531150440", "faculty": "인문사회과학대학", "major": "미디어커뮤니케이션학부", "phone": "010-9519-0395", "indate": "2020/02/29", "serial_number": "200102M531150440", "student_id": 453, "19_1": 0, "19_2": 0, "19_3": 0, "19_4": 0, "19_5": 0, "19_6": 0, "19_7": 0, "19_8": 0, "19_9": 0, "19_10": 0, "19_11": 0, "19_12": 0, "20_1": 0, "20_2": 0, "20_3": 0 }
    ],
    studentList: null,
    studentTest: [
      { "student_id": 1, "student_name": " 안희범", "room_id": 31, "room_name": "A0116A", "building": "A", "room_number": "16", "seat": "A", "term": "YY", "student_number": "711150374", "faculty": "경영대학", "major": "경영학부", "phone": "010-4917-0346", "indate": "2020/02/29", "serial_number": "200102M711150374" }, { "student_id": 2, "student_name": "가조해", "room_id": null, "room_name": null, "building": null, "room_number": null, "seat": null, "term": "LY", "student_number": "M006", "faculty": "대학원생", "major": "", "phone": "", "indate": "2020/02/17", "serial_number": "200103MM006" }, { "student_id": 3, "student_name": "갈삼흠", "room_id": 527, "room_name": "A0703A", "building": "A", "room_number": "03", "seat": "A", "term": "LY", "student_number": "2018202100", "faculty": "학부생", "major": "", "phone": "01023456257", "indate": "2020/02/11", "serial_number": "200103M2018202100" }, { "student_id": 4, "student_name": "갈재함", "room_id": null, "room_name": null, "building": null, "room_number": null, "seat": null, "term": "LY", "student_number": "F018", "faculty": "교환학생", "major": "", "phone": "", "indate": "2020/02/17", "serial_number": "200103FF018" }, { "student_id": 5, "student_name": "강강휘", "room_id": 531, "room_name": "A0705A", "building": "A", "room_number": "05", "seat": "A", "term": "LY", "student_number": "2019001003", "faculty": "어학연수생", "major": "", "phone": "", "indate": "2020/02/11", "serial_number": "200103M2019001003" }, { "student_id": 6, "student_name": "강경대", "room_id": 195, "room_name": "A0312A", "building": "A", "room_number": "12", "seat": "A", "term": "YY", "student_number": "711150004", "faculty": "경영대학", "major": "경영학부", "phone": "010-8512-7825", "indate": "2020/02/29", "serial_number": "200102M711150004" }, { "student_id": 7, "student_name": "강동재", "room_id": 228, "room_name": "A0328B", "building": "A", "room_number": "28", "seat": "B", "term": "YY", "student_number": "711150310", "faculty": "경영대학", "major": "경영학부", "phone": "010-9396-6622", "indate": "2020/02/29", "serial_number": "200102M711150310" }, { "student_id": 8, "student_name": "강동호", "room_id": 159, "room_name": "A0237A", "building": "A", "room_number": "37", "seat": "A", "term": "LY", "student_number": "441280011", "faculty": "생활체육학과", "major": "", "phone": "010-2170-0557", "indate": "2020/02/29", "serial_number": "200105M441280011" }, { "student_id": 9, "student_name": "강민성", "room_id": 48, "room_name": "A0124B", "building": "A", "room_number": "24", "seat": "B", "term": "YY", "student_number": "2015706044", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-6231-4539", "indate": "2020/02/29", "serial_number": "200101M2015706044" }, { "student_id": 10, "student_name": "강민혁", "room_id": 320, "room_name": "A0431B", "building": "A", "room_number": "31", "seat": "B", "term": "YY", "student_number": "2016742046", "faculty": "전자정보공과대학", "major": "전자융합공학과", "phone": "010-2380-5754", "indate": "2020/02/29", "serial_number": "200101M2016742046" }, { "student_id": 11, "student_name": "강성민", "room_id": 199, "room_name": "A0314A", "building": "A", "room_number": "14", "seat": "A", "term": "YY", "student_number": "614290075", "faculty": "정책법학대학", "major": "행정학과", "phone": "010-2902-1278", "indate": "2020/02/29", "serial_number": "200106M614290075" }, { "student_id": 12, "student_name": "강수민", "room_id": 852, "room_name": "B0512B", "building": "B", "room_number": "12", "seat": "B", "term": "YY", "student_number": "331260346", "faculty": "공과대학", "major": "화학공학과", "phone": "010-8796-4454", "indate": "2020/02/29", "serial_number": "200102F331260346" }, { "student_id": 13, "student_name": "강수아", "room_id": 922, "room_name": "B0622B", "building": "B", "room_number": "22", "seat": "B", "term": "YY", "student_number": "2019202037", "faculty": "소프트웨어융합대학", "major": "컴퓨터정보공학부", "phone": "010-9113-3414", "indate": "2020/02/29", "serial_number": "200101F2019202037" }, { "student_id": 14, "student_name": "강순혁", "room_id": 250, "room_name": "A0339B", "building": "A", "room_number": "39", "seat": "B", "term": "YY", "student_number": "161150186", "faculty": "전자정보공과대학", "major": "로봇학부", "phone": "010-3997-9425", "indate": "2020/02/29", "serial_number": "200102M161150186" }, { "student_id": 15, "student_name": "강안", "room_id": 976, "room_name": "B0723B", "building": "B", "room_number": "23", "seat": "B", "term": "LY", "student_number": "21089", "faculty": "신입생", "major": "", "phone": "010-5197-0921", "indate": "2020/02/17", "serial_number": "200103F21089" }, { "student_id": 16, "student_name": "강용준", "room_id": 473, "room_name": "A0621A", "building": "A", "room_number": "21", "seat": "A", "term": "YY", "student_number": "161150080", "faculty": "전자정보공과대학", "major": "로봇학부", "phone": "010-2557-8480", "indate": "2020/02/29", "serial_number": "200102M161150080" }, { "student_id": 17, "student_name": "강윤규", "room_id": 96, "room_name": "A0205B", "building": "A", "room_number": "05", "seat": "B", "term": "YY", "student_number": "2019603043", "faculty": "자연과학대학", "major": "수학과", "phone": "010-5894-4565", "indate": "2020/02/29", "serial_number": "200101M2019603043" }, { "student_id": 18, "student_name": "강자한", "room_id": 543, "room_name": "A0711A", "building": "A", "room_number": "11", "seat": "A", "term": "LY", "student_number": "2017203099", "faculty": "학부생", "major": "", "phone": "010-2988-3883", "indate": "2020/02/11", "serial_number": "200103M2017203099" }, { "student_id": 19, "student_name": "강지수", "room_id": 660, "room_name": "B0112B", "building": "B", "room_number": "12", "seat": "B", "term": "YY", "student_number": "131150121", "faculty": "전자정보공과대학", "major": "전자융합공학과", "phone": "010-7334-9976", "indate": "2020/02/29", "serial_number": "200102F131150121" }, { "student_id": 20, "student_name": "강지은", "room_id": 763, "room_name": "B0318A", "building": "B", "room_number": "18", "seat": "A", "term": "YY", "student_number": "711260502", "faculty": "경영대학", "major": "경영학부", "phone": "010-7168-5505", "indate": "2020/02/29", "serial_number": "200102F711260502" }, { "student_id": 21, "student_name": "강지흔", "room_id": 982, "room_name": "B0726B", "building": "B", "room_number": "26", "seat": "B", "term": "YY", "student_number": "2017321045", "faculty": "인문사회과학대학", "major": "동북아문화산업학부", "phone": "010-3086-5953", "indate": "2020/02/24", "serial_number": "200101F2017321045" }, { "student_id": 22, "student_name": "강철", "room_id": 508, "room_name": "A0638B", "building": "A", "room_number": "38", "seat": "B", "term": "YY", "student_number": "711250044", "faculty": "경영대학", "major": "경영학부", "phone": "010-4841-7315", "indate": "2020/02/29", "serial_number": "200102M711250044" }, { "student_id": 23, "student_name": "강태완", "room_id": 301, "room_name": "A0422A", "building": "A", "room_number": "22", "seat": "A", "term": "YY", "student_number": "2015726021", "faculty": "소프트웨어융합대학", "major": "소프트웨어학부", "phone": "010-2592-6211", "indate": "2020/02/29", "serial_number": "200101M2015726021" }, { "student_id": 24, "student_name": "강태웅", "room_id": 38, "room_name": "A0119B", "building": "A", "room_number": "19", "seat": "B", "term": "YY", "student_number": "211150189", "faculty": "소프트웨어융합대학", "major": "컴퓨터정보공학부", "phone": "010-2313-1184", "indate": "2020/02/29", "serial_number": "200102M211150189" }, { "student_id": 25, "student_name": "강현규", "room_id": 243, "room_name": "A0336A", "building": "A", "room_number": "36", "seat": "A", "term": "YY", "student_number": "2019323002", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-4670-2193", "indate": "2020/02/29", "serial_number": "200101M2019323002" }, { "student_id": 26, "student_name": "강현서", "room_id": 278, "room_name": "A0410B", "building": "A", "room_number": "10", "seat": "B", "term": "YY", "student_number": "716110002", "faculty": "경영대학", "major": "경영학부", "phone": "010-3028-1697", "indate": "2020/02/29", "serial_number": "200102M716110002" }, { "student_id": 27, "student_name": "강현우", "room_id": 189, "room_name": "A0309A", "building": "A", "room_number": "09", "seat": "A", "term": "YY", "student_number": "2019706082", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-2314-6810", "indate": "2020/02/29", "serial_number": "200101M2019706082" }, { "student_id": 28, "student_name": "강현준", "room_id": 277, "room_name": "A0410A", "building": "A", "room_number": "10", "seat": "A", "term": "YY", "student_number": "716110001", "faculty": "경영대학", "major": "경영학부", "phone": "010-2576-1697", "indate": "2020/02/29", "serial_number": "200102M716110001" }, { "student_id": 29, "student_name": "강희주", "room_id": 642, "room_name": "B0103B", "building": "B", "room_number": "03", "seat": "B", "term": "LY", "student_number": "2020381730", "faculty": "일반대학원", "major": "해당없음", "phone": "010-9053-9471", "indate": "2020/02/29", "serial_number": "200104F2020381730" }, { "student_id": 30, "student_name": "강희지", "room_id": 868, "room_name": "B0520B", "building": "B", "room_number": "20", "seat": "B", "term": "YY", "student_number": "2017204026", "faculty": "소프트웨어융합대학", "major": "정보융합학부", "phone": "010-3259-1359", "indate": "2020/02/29", "serial_number": "200101F2017204026" }, { "student_id": 31, "student_name": "계민이", "room_id": null, "room_name": null, "building": null, "room_number": null, "seat": null, "term": "LY", "student_number": "2018508142", "faculty": "학부생", "major": "", "phone": "01021858896", "indate": "2020/02/17", "serial_number": "200103F2018508142" }, { "student_id": 32, "student_name": "고가현", "room_id": 787, "room_name": "B0405A", "building": "B", "room_number": "05", "seat": "A", "term": "YY", "student_number": "2019803021", "faculty": "인문사회과학대학", "major": "미디어영상학부", "phone": "010-5882-2387", "indate": "2020/02/29", "serial_number": "200101F2019803021" }, { "student_id": 33, "student_name": "고건영", "room_id": 407, "room_name": "A0532A", "building": "A", "room_number": "32", "seat": "A", "term": "YY", "student_number": "2019117028", "faculty": "공과대학", "major": "건축공학과", "phone": "010-4032-1026", "indate": "2020/02/29", "serial_number": "200101M2019117028" }, { "student_id": 34, "student_name": "고건우", "room_id": 472, "room_name": "A0620B", "building": "A", "room_number": "20", "seat": "B", "term": "YY", "student_number": "161150014", "faculty": "전자정보공과대학", "major": "로봇학부", "phone": "010-2402-5730", "indate": "2020/02/29", "serial_number": "200102M161150014" }, { "student_id": 35, "student_name": "고김한비", "room_id": 772, "room_name": "B0322B", "building": "B", "room_number": "22", "seat": "B", "term": "YY", "student_number": "624290124", "faculty": "정책법학대학", "major": "법학부", "phone": "010-9123-5928", "indate": "2020/02/29", "serial_number": "200102F624290124" }, { "student_id": 36, "student_name": "고미현", "room_id": 843, "room_name": "B0508A", "building": "B", "room_number": "08", "seat": "A", "term": "YY", "student_number": "2019803068", "faculty": "정책법학대학", "major": "법학부", "phone": "010-5670-3582", "indate": "2020/02/29", "serial_number": "200101F2019803068" }, { "student_id": 37, "student_name": "고민범", "room_id": 316, "room_name": "A0429B", "building": "A", "room_number": "29", "seat": "B", "term": "YY", "student_number": "713290127", "faculty": "경영대학", "major": "경영학부", "phone": "010-4743-2343", "indate": "2020/02/29", "serial_number": "200106M713290127" }, { "student_id": 38, "student_name": "고수아", "room_id": 911, "room_name": "B0617A", "building": "B", "room_number": "17", "seat": "A", "term": "YY", "student_number": "2018802045", "faculty": "정책법학대학", "major": "행정학과", "phone": "010-3324-6837", "indate": "2020/02/29", "serial_number": "200101F2018802045" }, { "student_id": 39, "student_name": "고승관", "room_id": 518, "room_name": "A0643B", "building": "A", "room_number": "43", "seat": "B", "term": "YY", "student_number": "2016706039", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-4245-3187", "indate": "2020/02/29", "serial_number": "200101M2016706039" }, { "student_id": 40, "student_name": "고은아", "room_id": 783, "room_name": "B0403A", "building": "B", "room_number": "03", "seat": "A", "term": "YY", "student_number": "1271014", "faculty": "일반대학원", "major": "해당없음", "phone": "010-8641-6877", "indate": "2020/02/29", "serial_number": "200102F1271014" }, { "student_id": 41, "student_name": "고은정", "room_id": 883, "room_name": "B0603A", "building": "B", "room_number": "03", "seat": "A", "term": "YY", "student_number": "551150002", "faculty": "인문사회과학대학", "major": "동북아문화산업학부", "phone": "010-9004-6105", "indate": "2020/02/29", "serial_number": "200102F551150002" }, { "student_id": 42, "student_name": "고정현", "room_id": 443, "room_name": "A0606A", "building": "A", "room_number": "06", "seat": "A", "term": "YY", "student_number": "111210013", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-3055-8148", "indate": "2020/02/29", "serial_number": "200102M111210013" }, { "student_id": 43, "student_name": "고채린", "room_id": 793, "room_name": "B0408A", "building": "B", "room_number": "08", "seat": "A", "term": "YY", "student_number": "621170028", "faculty": "정책법학대학", "major": "법학부", "phone": "010-3776-4146", "indate": "2020/02/29", "serial_number": "200102F621170028" }, { "student_id": 44, "student_name": "고천예", "room_id": null, "room_name": null, "building": null, "room_number": null, "seat": null, "term": "LY", "student_number": "F016", "faculty": "교환학생", "major": "", "phone": "", "indate": "2020/02/17", "serial_number": "200103FF016" }, { "student_id": 45, "student_name": "고태윤", "room_id": 165, "room_name": "A0240A", "building": "A", "room_number": "40", "seat": "A", "term": "LY", "student_number": "2019609029", "faculty": "생활체육학과", "major": "", "phone": "010-3559-9138", "indate": "2020/02/29", "serial_number": "200105M2019609029" }, { "student_id": 46, "student_name": "고현지", "room_id": 814, "room_name": "B0418B", "building": "B", "room_number": "18", "seat": "B", "term": "YY", "student_number": "624290141", "faculty": "정책법학대학", "major": "법학부", "phone": "010-7531-2721", "indate": "2020/02/29", "serial_number": "200106F624290141" }, { "student_id": 47, "student_name": "공유빈", "room_id": 754, "room_name": "B0313B", "building": "B", "room_number": "13", "seat": "B", "term": "YY", "student_number": "112290236", "faculty": "전자정보공과대학", "major": "전자공학과", "phone": "010-5468-2711", "indate": "2020/02/29", "serial_number": "200102F112290236" }
    ],
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
      console.log('$$$ request ...$mutation/LOAD_ROOM_LIST');
      let {data} = await axios.get('/db/room-list');
      let Arr = []; 
      let obj, name; 
      let count = 0;
      for(var i=0; i < data.arg.length; i++) {
        if(count){ // count: 1
          obj.B = data["arg"][i];
          Arr.push(obj);
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
      state.roomList = Arr;
    },

    async LOAD_STUDENT_LIST (state) {
      console.log('$$$ request ...$mutation/LOAD_STUDENT_LIST');
      let {data} = await axios.get('/db/student-list');
      state.studentList = data.arg;
    },
    
    async SEARCH (state, keyword) {
      console.log('$$$ request ...$mutation/SEARCH');
      state.search.loadingState = 1;
      let {data} = await axios.post('/db/search', {keyword});
      state.searchArr = data.arg;
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