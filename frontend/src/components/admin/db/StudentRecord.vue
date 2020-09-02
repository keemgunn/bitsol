<template>
<div id="student-record">

  <div class="text-name">
    {{STUDENT_LIST["student_name"]}}
  </div>

  <div class="text-id">{{STUDENT_LIST["student_id"]}}</div>

  <div class="text-major">{{STUDENT_LIST["faculty"]}} {{STUDENT_LIST["major"]}} ({{STUDENT_LIST["student_number"]}})</div>

  <div class="text-room" v-if="STUDENT_LIST['room_name']">

    <div class="num">
      {{STUDENT_LIST["room_name"]}}
    </div>

    <div class="room-manage-btn x-text">
      <div class="circle x"></div>
      <div class="icon">
        <svg viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <polygon transform="translate(13,-5) rotate(45)" points="22.8994949 14.4142136 14.4142136 14.4142136 14.4142136 22.8994949 11.5857864 22.8994949 11.5857864 14.4142136 3.10050506 14.4142136 3.10050506 11.5857864 11.5857864 11.5857864 11.5857864 3.10050506 14.4142136 3.10050506 14.4142136 11.5857864 22.8994949 11.5857864"></polygon>
        </svg>
      </div>
      퇴실처리
    </div>

  </div>

  <div class="text-room" v-if="!STUDENT_LIST['room_name']">

    <div class="han">
      퇴실
    </div>

    <div class="room-manage-btn plus-text">
      <div class="circle plus"></div>
      <div class="icon">
        <svg viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <polygon points="22.8994949 14.4142136 14.4142136 14.4142136 14.4142136 22.8994949 11.5857864 22.8994949 11.5857864 14.4142136 3.10050506 14.4142136 3.10050506 11.5857864 11.5857864 11.5857864 11.5857864 3.10050506 14.4142136 3.10050506 14.4142136 11.5857864 22.8994949 11.5857864"></polygon>
        </svg>
      </div>
      호실배정
    </div>

  </div>

  <div class="text-info">입사일: {{STUDENT_LIST["indate"]}}</div>

  <div class="text-info">입사유형: {{STUDENT_LIST["term"]}}</div>

  <br>

  <div class="text-info">전화번호: {{STUDENT_LIST["phone"]}}</div>

  <br>

  <div class="text-info">환불계좌: 이름 은행 000000000000</div>

  <div class="checkbox">
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
  props: ['index'],
  data() { return {

  }},
  computed: {
    STUDENT_LIST: function () {
      if(this.test){
        return this["$store"]["state"]["studentTest"][this.index]
      }else{
        return this["$store"]["state"]["studentList"][this.index]
      }
    },
    ...mapState(['admin', 'studentList', 'test', 'studentTest'])
  },
  methods: {
    ...mapMutations(['SEARCH_student'])
  },
  created() {
  },
  mounted() {

  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
#student-record {
  position: relative; top: 0; left: 0;
  width: calc(100% - 4px);
  height: 122px;
  color: var(--i45);
  background-color: var(--i94);
  border: solid 2px var(--i80);
  // transition: 600ms;
   .checkbox{
    background-color: var(--i80);
  }.checkbox:hover{
    fill: var(--i100);
    background-color: var(--accent01);
  }.delete-btn{
    fill: var(--i70);
  }.delete-btn:hover{
    fill: var(--i20);
  }
  // background-color: rgba(0, 255, 255, 0.445);
}#student-record:hover {
  // transition: 100ms;
  color: var(--i30);
  background-color: var(--i98);
  border: solid 2px var(--i45);
   .checkbox{
    background-color: var(--i70);
  }.checkbox:hover{
    background-color: var(--accent01);
  }.delete-btn{
    fill: var(--i60);
  }.delete-btn:hover{
    fill: var(--i20);
  }
}

.text-name {
  float: left;
  position: relative; top: 10px; left: 13px;
  width: fit-content;
  height: 30px;
  font-family: 'Core Gothic D', sans-serif;
  font-size: 22px;
  letter-spacing: -0.38px;
  // background-color: pink;
}

.text-id {
  float: left;
  position: relative; top: 6px; left: 18px;
  letter-spacing: -0.9px;
  color: var(--i60);
}

.text-room {
  float: left;
  position: relative; top: 7px; left: 30px;
  width: fit-content;
  height: 30px;
  // background-color: whitesmoke;
  .x-text {
  color: transparent;
  }.plus-text {
  color: transparent;
  }
}.text-room:hover{
  .room-manage-btn{
    // transition: 200ms;
    .icon{
      fill: var(--i30);
    }.x{
      background-color: var(--i90);
    }.plus{
      background-color: var(--i90);
    }
  }.x-text{
    color: var(--i30);
  }.plus-text{
    color: var(--i30);
  }
  .room-manage-btn:hover{
    cursor: pointer;
    // transition: 200ms;
    .icon{
      // transition: 150ms;
      fill: var(--accent00);
    }.x{
      // transition: 150ms;
      background-color: var(--alert01);
    }.plus{
      // transition: 150ms;
      background-color: var(--accent01);
    }
  }.x-text:hover{
    color: var(--alert01);
  }.plus-text:hover{
    color: var(--accent01);
  }
}
.num{
  float: left;
  position: relative; top: 0; left: 0;
  width: fit-content;
  height: fit-content;
  font-family: 'Barlow', sans-serif;
  font-weight: 500;
  font-size: 23px;
  letter-spacing: -0.38px;
}
.han{
  float: left;
  position: relative; top: 1px; left: 0;
  width: fit-content;
  height: fit-content;
  font-family: 'Core Gothic D', sans-serif;
  font-weight: 500;
  font-size: 20px;
  padding-top: 3px;
  letter-spacing: -0.38px;
}


.room-manage-btn {
  float: left;
  position: relative; top: 3px; left: 7px;
  width: 80px;
  height: 26px;
  font-family: 'Nanum Square', sans-serif;
  font-weight: 700;
  font-size: 14px;
  text-align: right;
  line-height: 26px;
  // transition: 400ms;
  // background-color: palegoldenrod;
}

.icon {
  pointer-events: none;
  position: absolute; top: 3px; left: 5px;
  width: 18px;
  height: 18px;
  // transition: 400ms;
  fill: transparent;
}.circle {
  position: absolute; top: 1px; left: 3px;
  border-radius: 14px;
  width: 22px;
  height: 22px;
  // transition: 400ms;
  background-color: transparent;
}

.text-major {
  position: absolute; top: 44px; left: 14px;
  width: 92%;
  height: 20px;
  font-family: 'Core Gothic D', sans-serif;
  font-size: 17px;
  letter-spacing: -0.31px;  
  overflow: hidden;
  // background-color: darkturquoise;
}

.text-info {
  float: right;
  position: relative; top: 45px; right: 10px;
  margin-left: 6px;
  font-family: 'Core Gothic D', sans-serif;
  font-size: 15px;
  letter-spacing: -0.31px;
  text-align: right;
}

.checkbox {
  position: absolute; top: 10px; right: 10px;
  width: 20px;
  height: 20px;
  fill: var(--i94);
  // transition: 300ms;
}.checkbox:hover {
  // transition: 150ms;
  cursor: pointer;
}

.delete-btn {
  position: absolute; top: 8px; right: 8px;
  width: 24px;
  height: 24px;
  // transition: 300ms;
  // background-color: rgb(80, 214, 255);
}.delete-btn:hover {
  // transition: 150ms;
  cursor: pointer;
}


</style>