<template>
<div id="room-list">

<div id="list"></div>

<RoomRecord />

</div>
</template>



<script>
import RoomRecord from '@/components/admin/RoomRecord'
import { mapState, mapMutations } from 'vuex';


export default {
  name: "RoomList",
  components: {RoomRecord},
  props: [

  ],
  data() { return {

  }},
  computed: {
    ...mapState(['admin', 'roomList', 'studentList', 'searchArr', 'roomTest', 'studentTest', 'testArr'])
  },
  methods: {
    ...mapMutations(['LOAD_ROOM_LIST'])
  },
  created() {
    if(this.roomList.length === 0){
      this.LOAD_ROOM_LIST();
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
#room-list {
  position: absolute; top: 83px; left: -20px;
  width: calc(100% + 40px);
  height: calc(100% - 83px);
  overflow-x: hidden;
  overflow-y: auto;

  background-color: rgba(0, 140, 255, 0.534);
}
#list {
  position: absolute; top: 0; left: 20px;
  width: calc(100% - 40px);
  height: 100%;

  background-color: aquamarine;
}





</style>