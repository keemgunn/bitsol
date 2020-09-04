<template>
<div id="room-record">

<div id="room">{{ROOM.name}}</div>

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

  <div class="adr-checkbox" 
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

  <div class="adr-checkbox"
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
</div>
</template>



<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "RoomRecord",
  components: { },
  props: ['index', 'ROOM'],
  computed: {
    ...mapState(['admin']),
  },
  methods: {
    ...mapMutations(['adminStudentSelect']),
    selectStudent(seat){
      this.adminStudentSelect( this['ROOM'][seat]['student_id'] - 1 );
    },
  },
}
</script>



<style lang="scss" scoped> 




</style>