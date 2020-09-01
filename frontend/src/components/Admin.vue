<template>
<div id="admin">

  <transition name="appear"><DB 
    v-if="admin.modal==='db'"
  /></transition>
















</div>
</template>


<script>
import DB from '@/components/admin/DB'

import { mapState, mapMutations } from 'vuex'

export default {
  name: "Admin",
  components: { DB, },
  props: [
    "adminMenu"
  ],
  data() { return {

    //--------- DB
    scope: "room", //"student"
    option: true,


  }},
  computed: {
    ...mapState(['dbinfo', 'admin', 'roomList', 'studentList'])
  },
  methods: {
    ...mapMutations(['LOAD_ROOM_LIST', 'LOAD_STUDENT_LIST'])
  },
  created() {
    if(this.roomList.length === 0){
      this.LOAD_ROOM_LIST();
    }
    if(this.studentList.length === 0){
      this.LOAD_STUDENT_LIST();
    }
  },
}
</script>

<style lang="scss" scoped> #admin {
  z-index: 10;
  position: absolute; top: 160px; left: 0;
  width: 100vw;
  height: calc(100% - 160px);
  display: flex;
  justify-content: center;
  align-items: center;
  // background-color: deeppink;
}




</style>