<template>
<div class="admin-record">

<div id="admin-room">{{ROOM.name}}</div>

<div class="AB">
  <div class="adr-text _seat">
    {{ROOM["A"]["seat"]}}
  </div>
  <div class="adr-text">
    {{ROOM["A"]["student_name"]}}
  </div>
  <div class="adr-text _4" v-if="ROOM['A']['student_id']">
    {{ROOM["A"]["faculty"]}} {{ROOM["A"]["major"]}} ({{ROOM["A"]["student_number"]}})
  </div> <br>
  <div class="adr-text _info _4" v-if="ROOM['A']['student_id']">
    입주일: {{ROOM["A"]["indate"]}} / 유형: {{ROOM["A"]["term"]}} / 전화번호: {{ROOM["A"]["phone"]}}
  </div>

  <div class="adr-adj adj-room" @click="popAdj('A')">
    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>정보 수정</title>
      <path d="M3,17.25 L3,21 L6.75,21 L17.81,9.94 L14.06,6.19 L3,17.25 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.13,5.12 L18.88,8.87 L20.71,7.04 Z"></path>
    </svg>
  </div>

  <div class="adr-checkbox cb-room" 
  :class="{ 'none':!ROOM['A']['student_id'],
  'selected':admin.db.selected.includes(ROOM['A']['student_id']-1)}"
  @click="selectStudent('A')">
    <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>선택</title>
      <polygon points="8 15.42 3 10.42 4.41 9.01 8 12.59 15.59 5 17 6.42"></polygon>
    </svg>
  </div>

  <div class="adr-delete" v-if="ROOM['A']['student_id']">
    <svg viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <polygon transform="translate(13,-5) rotate(45)" points="22.8994949 14.4142136 14.4142136 14.4142136 14.4142136 22.8994949 11.5857864 22.8994949 11.5857864 14.4142136 3.10050506 14.4142136 3.10050506 11.5857864 11.5857864 11.5857864 11.5857864 3.10050506 14.4142136 3.10050506 14.4142136 11.5857864 22.8994949 11.5857864"></polygon>
    </svg>
  </div>
</div>


<div class="AB">
  <div class="adr-text _seat">
    {{ROOM["B"]["seat"]}}
  </div>
  <div class="adr-text">
    {{ROOM["B"]["student_name"]}}
  </div>
  <div class="adr-text _4" v-if="ROOM['B']['student_id']">
    {{ROOM["B"]["faculty"]}} {{ROOM["B"]["major"]}} ({{ROOM["B"]["student_number"]}})
  </div> <br>
  <div class="adr-text _info _4" v-if="ROOM['B']['student_id']">
    입주일: {{ROOM["B"]["indate"]}} / 유형: {{ROOM["B"]["term"]}} / 전화번호: {{ROOM["B"]["phone"]}}
  </div>

  <div class="adr-adj adj-room" @click="popAdj('B')">
    <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>정보 수정</title>
      <path d="M3,17.25 L3,21 L6.75,21 L17.81,9.94 L14.06,6.19 L3,17.25 Z M20.71,7.04 C21.1,6.65 21.1,6.02 20.71,5.63 L18.37,3.29 C17.98,2.9 17.35,2.9 16.96,3.29 L15.13,5.12 L18.88,8.87 L20.71,7.04 Z"></path>
    </svg>
  </div>

  <div class="adr-checkbox cb-room"
  :class="{ 'none':!ROOM['B']['student_id'],
  'selected':admin.db.selected.includes(ROOM['B']['student_id']-1)}"
  @click="selectStudent('B')">
    <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>선택</title>
      <polygon points="8 15.42 3 10.42 4.41 9.01 8 12.59 15.59 5 17 6.42"></polygon>
    </svg>
  </div>

  <div class="adr-delete" v-if="ROOM['B']['student_id']">
    <svg viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <polygon transform="translate(13,-5) rotate(45)" points="22.8994949 14.4142136 14.4142136 14.4142136 14.4142136 22.8994949 11.5857864 22.8994949 11.5857864 14.4142136 3.10050506 14.4142136 3.10050506 11.5857864 11.5857864 11.5857864 11.5857864 3.10050506 14.4142136 3.10050506 14.4142136 11.5857864 22.8994949 11.5857864"></polygon>
    </svg>
  </div>
</div>

<div class="division"></div>

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
  props: ['index', 'ROOM'],
  computed: {
    ...mapState(['admin']),
  },
  methods: {
    ...mapMutations(['adminStudentSelect']),
    selectStudent(seat){
      this.adminStudentSelect( this['ROOM'][seat]['student_id'] - 1 );
    },
    popAdj(seat){
      this.adjTargetid = this['ROOM'][seat]['student_id'] - 1;
      this.adjModal = true;
    },
    closeAdj(){
      this.adjModal = false;
      this.adjTargetid = null;
    }
  },
}
</script>