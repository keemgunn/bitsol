<template>
<div id="list-wrapper">

<div v-if="scope==='room'">
  <div id="list"
    v-for="index in INDEX"
    :key="index">
    <RoomRecord :index="index" />
  </div>
</div>

<div v-if="scope==='student'">
  <div id="list"
    v-for="index in INDEX"
    :key="index">
    <StudentRecord :index="index" />
  </div>
</div>

</div>
</template>



<script>
import RoomRecord from './RoomRecord'
import StudentRecord from './StudentRecord'
import { mapState, mapMutations } from 'vuex';


export default {
  name: "List",
  components: {RoomRecord, StudentRecord},
  props: [
    "scope"
  ],
  data() { return {

  }},
  computed: {
    INDEX: function(){
      if(this.test){
        return this["$store"]["state"]["testIndex"]
      }else{
        return this["$store"]["state"]["dbSearch"]
      }      
    },
    ...mapState(['test', 'admin', 'roomList', 'studentList'])
  },
  methods: {
    ...mapMutations(['LOAD_ROOM_LIST', 'LOAD_STUDENT_LIST', 'SEARCH_room', 'SEARCH_student', 'SEARCH_test'])
  },
  created() {
    this.SEARCH_test();

    if(this.scope.room === 'room'){
      if(this.roomList.length === 0){
        this.LOAD_ROOM_LIST();
      }
        this.SEARCH_room(''); 
    }else{
      if(this.studentList.length === 0){
        this.LOAD_STUDENT_LIST();
      }
      this.SEARCH_student('');
    }
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
#list-wrapper {
  position: absolute; top: 83px; left: -20px;
  width: calc(100% + 40px);
  height: calc(100% - 83px);
  overflow-x: hidden;
  overflow-y: auto;

  // background-color: rgba(0, 140, 255, 0.534);
}
#list {
  position: relative; top: 0; left: 20px;
  padding-bottom: 13px;
  width: 710px;
  height: fit-content;

  // background-color: aquamarine;
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
  margin-bottom: 13px; 
}

</style>