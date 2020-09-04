<template>
<div id="room-record">

<div id="room">{{ROOM.name}}</div>

<div class="seat">
  <div class="text-seat">
    {{ROOM["A"]["seat"]}}
  </div>
  <div class="text-name">
    {{ROOM["A"]["student_name"]}}
  </div>
  <div class="text-major" v-if="ROOM['A']['student_id']">
    {{ROOM["A"]["faculty"]}} {{ROOM["A"]["major"]}} ({{ROOM["A"]["student_number"]}})
  </div>

  <div class="text-info" v-if="ROOM['A']['student_id']">
    입주일: {{ROOM["A"]["indate"]}}
  </div>

  <div class="text-info" v-if="ROOM['A']['student_id']">
    유형: {{ROOM["A"]["term"]}}
  </div>

  <div class="text-info" v-if="ROOM['A']['student_id']">
    전화번호: {{ROOM["A"]["phone"]}}
  </div>

  <div class="checkbox" 
  :class="{
    'none':!ROOM['A']['student_id'],
    'selected':admin.db.selected.includes(ROOM['A']['student_id']-1)
  }"
  @click="selectStudent('A')">
    <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>선택</title>
      <polygon points="8 15.42 3 10.42 4.41 9.01 8 12.59 15.59 5 17 6.42"></polygon>
    </svg>
  </div>

  <div class="delete-btn" v-if="ROOM['A']['student_id']">
    <svg viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <polygon transform="translate(13,-5) rotate(45)" points="22.8994949 14.4142136 14.4142136 14.4142136 14.4142136 22.8994949 11.5857864 22.8994949 11.5857864 14.4142136 3.10050506 14.4142136 3.10050506 11.5857864 11.5857864 11.5857864 11.5857864 3.10050506 14.4142136 3.10050506 14.4142136 11.5857864 22.8994949 11.5857864"></polygon>
    </svg>
  </div>

</div>


<div class="seat">
  <div class="text-seat">
    {{ROOM["B"]["seat"]}}
  </div>
  <div class="text-name">
    {{ROOM["B"]["student_name"]}}
  </div>
  <div class="text-major" v-if="ROOM['B']['student_id']">
    {{ROOM["B"]["faculty"]}} {{ROOM["B"]["major"]}} ({{ROOM["B"]["student_number"]}})
  </div>

  <div class="text-info" v-if="ROOM['B']['student_id']">
    입주일: {{ROOM["B"]["indate"]}}
  </div>

  <div class="text-info" v-if="ROOM['B']['student_id']">
    유형: {{ROOM["B"]["term"]}}
  </div>

  <div class="text-info" v-if="ROOM['B']['student_id']">
    전화번호: {{ROOM["B"]["phone"]}}
  </div>

  <div class="checkbox"
  :class="{
    'none':!ROOM['B']['student_id'],
    'selected':admin.db.selected.includes(ROOM['B']['student_id']-1)
  }"
  @click="selectStudent('B')">
    <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>선택</title>
      <polygon points="8 15.42 3 10.42 4.41 9.01 8 12.59 15.59 5 17 6.42"></polygon>
    </svg>
  </div>

  <div class="delete-btn" v-if="ROOM['B']['student_id']">
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
#room-record {
  position: relative; top: 0; left: 0;
  width: calc(100% - 4px);
  height: fit-content;
  background-color: var(--i94);
  border: solid 2px var(--i80);
  // transition: 600ms;
   #room{
    color: var(--i45);
  }.division{
    // transition: 600ms;
    position: absolute; top: 50%; right: 0;
    width: calc(100% - 104px);
    height: 1px;
    background-color: var(--i80);
  }
  // background-color: rgba(0, 255, 255, 0.445);
}#room-record:hover {
  // transition: 100ms;
  background-color: var(--i98);
  border: solid 2px var(--i45);
   #room{
    color: var(--i30);
  }.division{
    // transition: 100ms;
    background-color: var(--i45);
  }
}
#room {
  position: absolute; top: 0; left: 0;
  width: 104px;
  height: 100%;
  padding-left: 9px;
  font-family: 'Barlow', sans-serif;
  font-weight: 500;
  font-size: 30px;
  letter-spacing: 0.79px;
  line-height: 42px;
  // background-color: rgba(52, 113, 226, 0.534);
}

.seat {
  position: relative; left: 104px;
  width: calc(100% - 104px);
  height: 69px;
  color: var(--i45);
  background-color: var(--i94);
  // transition: 300ms;
   .checkbox{
    background-color: var(--i80);
  }.delete-btn{
    fill: var(--i70);
  }.selected {
  background-color: var(--accent01);
  }.none {
    display: none;
  }
}.seat:hover {
  // transition: 100ms;
  color: var(--i30);
  background-color: var(--i98);
   .checkbox{
    background-color: var(--i70);
  }.checkbox:hover{
    background-color: var(--accent01);
  }.selected {
  background-color: var(--accent01);
  }.selected:hover {
  background-color: var(--accent02);
  }.delete-btn{
    fill: var(--i60);
  }.delete-btn:hover{
    fill: var(--i20);
  }.none {
    display: none;
  }
}

.text-seat {
  position: absolute; top: 3px; left: 5px;
  font-family: 'Barlow', sans-serif;
  font-size: 30px;
  letter-spacing: 0.79px;
}

.text-name {
  float: left;
  position: relative; top: 10px; left: 28px;
  font-family: 'Core Gothic D', sans-serif;
  font-size: 22px;
  letter-spacing: -0.38px;
}
.text-info {
  float: left;
  position: relative; top: 15px; left: 28px;
  margin-left: 6px;
  font-family: 'Core Gothic D', sans-serif;
  font-size: 15px;
  letter-spacing: -0.31px;
}



.text-major {
  position: absolute; top: 42px; left: 29px;
  width: 92%;
  height: 20px;
  font-family: 'Core Gothic D', sans-serif;
  font-size: 17px;
  letter-spacing: -0.31px;  
  overflow: hidden;
  // background-color: darkturquoise;
}

.checkbox {
  position: absolute; top: 8px; right: 35px;
  width: 20px;
  height: 20px;
  fill: var(--accent00);
  // transition: 300ms;
}.checkbox:hover {
  // transition: 150ms;
  cursor: pointer;
}


.delete-btn {
  position: absolute; top: 6px; right: 6px;
  width: 24px;
  height: 24px;
  // transition: 300ms;
  // background-color: rgb(80, 214, 255);
}.delete-btn:hover {
  // transition: 150ms;
  cursor: pointer;
}


</style>