<template>
<div id="room-list">

<div id="list"
  v-for="index in testIndex"
  :key="index"
  >
  <RoomRecord :index="index" />
</div>


<div class="cover-scroll-bottom"></div>
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
    ...mapState(['admin', 'roomList', 'roomTest', 'dbSearch', 'testIndex'])
  },
  methods: {
    ...mapMutations(['LOAD_ROOM_LIST', 'SEARCH_room', 'SEARCH_test'])
  },
  created() {
    if(this.roomList.length === 0){
      this.LOAD_ROOM_LIST();
    }
    this.SEARCH_test();
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
  position: relative; top: 0; left: 20px;
  padding-bottom: 13px;
  width: calc(100vw - 120px);
    min-width: 490px;
    max-width: 710px;
  height: fit-content;

  background-color: aquamarine;
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
  margin-bottom: 0px; 
}
.cover-scroll-bottom {
  position: absolute; bottom: 0px; right: -20px;
  float: right;
  width: 5px;
  height: 50px;
  background-color: var(--i94);
}


</style>