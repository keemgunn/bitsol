<template>
<div id="admin">

  <transition name="appear">
  <div v-if="admin.modal==='index'">
    {{dbinfo}}
  </div></transition>

  <transition name="appear"><DB 
    v-if="admin.modal==='db'"
  /></transition>
















</div>
</template>


<script>
import DB from '@/components/admin/DB'

import { mapState, mapGetters, mapMutations } from 'vuex'

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
    ...mapState(['dbinfo', 'admin']),
    ...mapGetters(['ROOM_LIST', 'STUDENT_LIST'])
  },
  methods: {
    ...mapMutations(['LOAD_ROOM_LIST', 'LOAD_STUDENT_LIST'])
  },
  created() {
    if(this.ROOM_LIST.length === 0){
      this.LOAD_ROOM_LIST();
    }
    if(this.STUDENT_LIST.length === 0){
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