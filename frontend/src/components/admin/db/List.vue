<template>
<div id="list-wrapper">

  <div v-if="scope==='room'">
    <div id="list"
      v-for="index in ROOM_INDEX"
      :key="index">
      <RoomRecord :index="index" :ROOM="ROOM(index)" />
    </div>
  </div>

  <div v-if="scope==='student'">
    <div id="list"
      v-for="index in STUDENT_INDEX"
      :key="index">
      <StudentRecord :index="index" :STUDENT="STUDENT(index)" />
    </div>
  </div>

</div>
</template>


<script>
import RoomRecord from './RoomRecord'
import StudentRecord from './StudentRecord'
import { mapGetters, mapMutations } from 'vuex';

export default {
  name: "List",
  components: { RoomRecord, StudentRecord },
  props: [ "scope" ],
  computed: {
    ...mapGetters(['ROOM_INDEX', 'STUDENT_INDEX', 'ROOM_LIST', 'STUDENT_LIST'])
  },
  methods: {
    ...mapMutations(['adminLoadingState']),
    ROOM(index){
      return this['ROOM_LIST'][index]
    },
    STUDENT(index){
      return this['STUDENT_LIST'][index]
    }
  },
  beforeUpdate() {
    this.adminLoadingState(1);
  },
  updated() {
    this.adminLoadingState(0);
  }
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