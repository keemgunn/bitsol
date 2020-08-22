<template>
<div id="search-list">

  <div id="optionBox">
    <transition name="fade">
      <div id="deadline">
        <div id="han" v-if="!moreinfo">보관팩 기간: </div>
        <div id="date" v-if="!moreinfo">{{dbinfo.deadline}} </div>
      </div>
    </transition>
    <div class="moreinfo" @click="toggleInfoScope">
      <div :class="{'moreinfo-des':1, 'moreinfo-des-on':moreinfo }">학생 정보 보기</div>
      <div class="switch">
        <svg :class="{'box':1, 'box-on':moreinfo }" viewBox="0 0 30 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Switch Box</title>
          <g>
            <rect id="Rectangle-Copy" x="0" y="0" width="30" height="16" rx="8"></rect>
          </g>
        </svg>
        <svg :class="{'btn':1, 'btn-on':moreinfo}" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>Oval</title>
          <g>
            <circle id="Oval" cx="6" cy="6" r="6"></circle>
          </g>
        </svg>
      </div>
    </div>

  </div>

  <div id="wrapper-no-result" v-if="searchArr.length === 0">
    <div id="no-result"
    v-if="this.keyword == ''">
      호실 또는 이름으로 검색 ...
    </div>
    <div id="no-result"
    v-if="this.keyword !== ''">
      검색 결과가 없습니다 ...
    </div>
  </div>

  <div class="wrapper-result" v-if="this.$store.state.modal.scopeTab === 'refg' || 'info'">
    <div class="content-overflow">
      <div class="result"
      :key="record.student_id"
      v-for="record in searchArr">
        <div :class="{'gap-result':1, 'gap-result-expand':moreinfo}"></div>
        <div :class="{'cover-result-side':1, 'cover-result-side-expand':moreinfo}"></div>
          <Records 
            :record="record"
            :refgTerm="dbinfo.refgTerm"
            :refgLimit="dbinfo.refgLimit"
            :moreinfo="moreinfo"
            @loading="loading"
          />
        <div :class="{'cover-result-side':1, 'cover-result-side-expand':moreinfo}"></div>
      </div>
      <div id="cover-bottom" :style="coverBottom"></div>
    </div>
    <div class="cover-scroll-bottom"></div>
  </div>

  <div id="wrapper-no-result" v-if="searchArr.length !== 0 && this.$store.state.modal.scopeTab === 'refg'">
  </div>

</div>
</template>




<script>
import Records from '@/components/Records'

export default {
  name: 'SearchList',
  components: {
    Records
  },
  data() { return {
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
    moreinfo: false
  }},
  computed: {
  },
  props: [
    "keyword", // from App
    "searchArr", // from .../db/search
    "dbinfo", // from .../db/info
    "coverBottom" // from App
  ],
  methods: {
    toggleInfoScope(){
      this.moreinfo = !this.moreinfo
      this.$emit('moreinfo', this.moreinfo);
    },
    loading(bool){
      this.$emit('loading', bool);
    }
  },
  created() {

  },
  beforeUpdate() {
    console.log("beforeUpdate /StudentList ----");
    this.loading(1);
  },
  updated() {
    console.log("updated /StudentList ----");
    this.loading(0);
  },
}
</script>



<style lang="scss" scoped> #search-list {
  display: block;
  width: 100%;
  height: calc(100% - 187px);
  // background-color: khaki;
}

/* --------------- REFG HEADER-------------- */
#optionBox { 
  padding: 10px 0px 40px 0px;
  position: initial;;
  width: 100%;
  height: 35px;
  line-height: 35px;
  user-select: none;
  -webkit-user-select: none;
  background-color: var(--i94);
  background-color: rgba(68, 255, 68, 0.397);

  #deadline {
    float: left;
    margin-left: 20px;
    left: 20px;
    #han { // -------------------------
      display: inline-block;
      position: relative;
      font-family: 'Nanum Square', sans-serif;
      font-weight: 800;
      font-size: 21px;
      letter-spacing: 0.31px;
    }#date {
      display: inline-block;
      position: relative;
      top: 1px;
      left: 3px;
      font-family: 'Barlow', sans-serif;
      font-weight: 600;
      font-size: 23px;
      letter-spacing: 1px;
    }
  }

  .moreinfo {
    float: right;
    width: 122px;
    height: 16px;
    margin-top: 10px;
    margin-right: 20px;
    font-family: 'Nanum Square';
    font-weight: 700;
    font-size: 14px;
    letter-spacing: 0.21px;
    color: var(--i45);
    transition: 200ms;

    .moreinfo-des {
      position: relative;
      bottom: 9px;
      width: 86px;
      height: 16px;
    }.moreinfo-des-on {
      color: var(--accent02);
    }

    .switch {
      position: relative;
      float: right;
      bottom: 16px;
      width: 30px;
      height: 16px;

      .box {
          float: left;
          width: 30px;
          height: 16px;
          fill: var(--i70);
          transition: 200ms;
      }.box-on {
        transition: 200ms;
        fill: var(--accent02);
      }
      .btn {
          position: relative;
          float: left;
          bottom: 14px;
          left: 2px;
          width: 12px;
          height: 12px;
          fill: var(--i94);
          transition: 200ms;
      }.btn-on {
        animation-timing-function: ease-in-out;
        transition: 200ms;
        left: 16px;
      }
    }
  }.moreinfo:hover {
    cursor: pointer;
    color: var(--accent01);
    transition: 200ms;
    .box {
      fill: var(--accent01);
    }.moreinfo-des-on {
      color: var(--accent02);
    }.box-on {
      fill: var(--accent02);
    }
  }
}


/* --------------- SEARCH RESULTS -------------- */
#wrapper-no-result {
  padding-top: 10px;
  padding-left: 20px;
  width: calc(100% - 20px);
  height: 50px;
  font-family: 'Nanum Square';
  font-weight: 200;
  font-size: 35px;
  color: var(--i45);
  font-style: italic;
  letter-spacing: 0.31px;
  user-select: none;
  -webkit-user-select: none;
  background-color: var(--i94);
  // background-color: gold
}
  #no-result {
    opacity: 0;
    animation: fade-in 300ms;
    animation-timing-function: ease-in-out;
    animation-delay: 500ms;
    animation-fill-mode: forwards;
  }

.wrapper-result {
  width: 100%;
  height: calc(100% - 132px);
}
  .content-overflow {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    overflow-x: hidden;
  }
    .result {
      width: calc(100vw - 120px);
      min-width: 490px;
      max-width: 710px;
      height: fit-content;
    }
      .gap-result {
        float: left;
        width: 100%;
        height: 10px;
        background-color: var(--i94);
        transition: 300ms;
        // background-color: dodgerblue;
      } 
        .gap-result-expand {
          transition: 300ms;
          height: 20px;
        }
      .cover-result-side {
        float: left;
        width: 20px;
        height: 56px;
        background-color: var(--i94);
        transition: 300ms;
        // background-color: indianred;
      }
        .cover-result-side-expand {
          transition: 300ms;
          height: 126px;
        }

      // <RECORD HERE> 
  // }
  #cover-bottom {
    float: left;
    width: 100%;
    height: 20px;
    background-color: var(--i94);
    // background-color: darkgreen;
  }

/* --------------- SCROLL -------------- */
/* width */
::-webkit-scrollbar {
  transition: 100ms;
  width: 5px;
  max-height: 70%;
  height: 70%;
}
/* Track */
::-webkit-scrollbar-track {
  background: var(--i70);
  border: 1px solid var(--i94);
}
/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--i45);
}
/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--i30);
}
::-webkit-scrollbar-track-piece:start {
  background: transparent;
  margin-top: 0px;
}
::-webkit-scrollbar-track-piece:end {
  background: transparent;
  margin-bottom: 50px; 
}
.cover-scroll-bottom {
  position: relative;
  right: 0px;
  bottom: 50px;
  float: right;
  width: 5px;
  height: 50px;
  background-color: var(--i94);
}



// ----------------------------------- ANIMATION

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
@keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }

.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

</style>
