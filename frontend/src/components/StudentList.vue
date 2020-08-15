<template>
<div id="stdtlist">

  <div id="deadline"
  v-if="this.$store.state.modal.scopeTab === 'refg'">
    <div id="han">보관팩 기간: </div>
    <div id="date">{{dbinfo.deadline}}</div>
  </div>

  <div id="wrapper-no-result"
  v-if="searchArr.length === 0">
    <div id="no-result"
    v-if="this.keyword == ''">
      호실 또는 이름으로 검색 ...
    </div>
    <div id="no-result"
    v-if="this.keyword !== ''">
      검색 결과가 없습니다 ...
    </div>
  </div>

  <div class="wrpper-result"
  v-if="this.$store.state.modal.scopeTab === 'refg'">
    <div class="content-overflow">
      
      <div class="result"
      :key="record.student_id"
      v-for="record in searchArr">

        <div class="gap-result"></div>
        <div class="cover-result-side"></div>
          <ListRefg 
            :record="record"
            :refgTerm="dbinfo.refgTerm"
            :refgLimit="dbinfo.refgLimit"
          />
        <div class="cover-result-side"></div>
      </div>

      <div id="cover-bottom" :style="coverBottom"></div>

    </div>

    <div class="cover-scroll-bottom"></div>
  </div>

  <div id="wrapper-no-result"
  v-if="searchArr.length !== 0">
  </div>







</div>
</template>

<script>
import ListRefg from '@/components/ListRefg'

export default {
  name: 'StudentList',
  components: {
    ListRefg
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
    ]
  }},
  computed: {
  },
  props: [
    "keyword",
    "searchArr", // from /db/search
    "dbinfo",
    "coverBottom"
  ],
  methods: {

  },
  created() {

  }
}
</script>



<style lang="scss" scoped> #stdtlist {
  display: block;
  width: 100%;
  height: calc(100% - 187px);
  // background-color: khaki;
}

/* --------------- REFG HEADER-------------- */
#deadline { 
  margin-top: 0px;
  padding-left: 20px;
  padding-bottom: 40px;
  height: 35px;
  line-height: 35px;
  user-select: none;
  -webkit-user-select: none;
  background-color: var(--i94);
  // background-color: rgb(145, 199, 145);
}
  #han {
    display: inline-block;
    bottom: 2px;
    font-family: 'Nanum Square';
    font-weight: 800;
    font-size: 21px;
    letter-spacing: 0.31px;
  }
  #date {
    display: inline-block;
    left: 4px;
    font-family: 'Barlow';
    font-weight: 600;
    font-size: 24px;
    letter-spacing: 1.44px;
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
  } @keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }

.wrpper-result {
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
        // background-color: dodgerblue;
      }
      .cover-result-side {
        float: left;
        width: 20px;
        height: 56px;
        background-color: var(--i94);
        // background-color: indianred;
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


</style>
