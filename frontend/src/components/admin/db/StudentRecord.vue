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

</div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "RoomRecord",
  components: { },
  props: ['index', 'STUDENT'],
  computed: {
    ...mapState(['admin', 'studentList', 'test', 'studentTest'])
  },
  methods: {
    ...mapMutations(['adminStudentSelect']),
    selectStudent(){
      this.adminStudentSelect( this['STUDENT']['student_id'] - 1 );
    },
  },
}
</script>