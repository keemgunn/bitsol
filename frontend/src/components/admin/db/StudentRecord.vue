<template>
<div class="admin-record adr-student">

  <div class="adr-text">
    {{STUDENT["student_name"]}}
  </div>
  <div class="adr-text _id">{{STUDENT["student_id"]}}</div>
  <div class="ib" v-if="STUDENT['room_name']">
    <div class="adr-text _room">
      {{STUDENT["room_name"]}}
    </div>
    <div class="adr-btn out">X 퇴실처리</div>
  </div>
  <div class="ib" v-if="!STUDENT['room_name']">
    <div class="adr-text _out">
      퇴실
    </div>
    <div class="adr-btn new">+ 호실배정</div>
  </div>
  <div class="adr-text _des _4">입사일: {{STUDENT["indate"]}} | 입사유형: {{STUDENT["term"]}}</div>
  <br>

  <div class="adr-text _info-student _4">{{STUDENT["faculty"]}} {{STUDENT["major"]}} ({{STUDENT["student_number"]}})<br>전화번호: {{STUDENT["phone"]}} | 환불계좌: 이름 은행 000000000000</div>

  <div class="adr-adj adj-student" @click="popAdj()">
    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>정보 수정</title>
      <path d="M3,17.25 L3,21 L6.75,21 L17.81,9.94 L14.06,6.19 L3,17.25 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.13,5.12 L18.88,8.87 L20.71,7.04 Z"></path>
    </svg>
  </div>

  <div class="adr-checkbox cb-student"
  :class="{ 'none':!STUDENT['student_id'],
  'selected':admin.db.selected.includes(STUDENT['student_id']-1)
  }"
  @click="selectStudent()"
  >
    <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>선택</title>
      <polygon points="8 15.42 3 10.42 4.41 9.01 8 12.59 15.59 5 17 6.42"></polygon>
    </svg>
  </div>

  <transition name="appear"><Adj 
  :index="adjTargetid"
  @close="closeAdj"
  v-if="adjModal"/>
  </transition>

</div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';
import Adj from './Adj'

export default {
  name: "RoomRecord",
  components: { Adj },
  data() { return {
    adjModal: false,  //false
    adjTargetid: null  //null
  }},
  props: ['index', 'STUDENT'],
  computed: {
    ...mapState(['admin'])
  },
  methods: {
    ...mapMutations(['adminStudentSelect']),
    selectStudent(){
      this.adminStudentSelect( this['STUDENT']['student_id'] - 1 );
    },
    popAdj(){
      this.adjTargetid = this['STUDENT']['student_id'] - 1;
      this.adjModal = true;
    },
    closeAdj(){
      this.adjModal = false;
      this.adjTargetid = null;
    }
  },
}
</script>