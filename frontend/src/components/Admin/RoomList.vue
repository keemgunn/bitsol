<template>
<div id="room-list">

<!-- {{roomTest}} -->

{{roomList}}

</div>
</template>



<script>
import { mapState, mapMutations } from 'vuex'


export default {
  name: "RoomList",
  components: { },
  props: [

  ],
  data() { return {

  }},
  computed: {
    ...mapState(['roomList', 'studentList', 'searchArr', 'roomTest', 'studentTest', 'testArr'])
  },
  methods: {
    ...mapMutations(['LOAD_ROOM_LIST'])
  },
  created() {
    if(this.roomList !== null){
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
  position: absolute; top: 83px; left: 0;
  width: 100%;
  height: calc(100% - 83px);
  overflow-x: hidden;
  overflow-y: auto;

  background-color: rgba(0, 140, 255, 0.534);
}





</style>