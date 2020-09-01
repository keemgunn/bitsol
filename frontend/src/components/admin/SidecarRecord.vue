<template>
<div class="sidecar-record"
:class="{'selection':type==='selection', 'updated':type==='updated'}">

<div v-if="type==='selection'">

  <div class="name">
    {{STUDENT_LIST.student_name}}
  </div>

  <div class="id">
    {{STUDENT_LIST.student_id}}
  </div>

  <div class="room">
    {{ROOM_NAME}}
  </div>

  <div class="num">
    {{STUDENT_LIST.student_number}}
  </div>

  <div class="delete">
    <svg viewBox="0 0 26 26" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>선택 해제</title>
      <polygon transform="translate(13,-5) rotate(45)" fill-rule="nonzero" points="22.8994949 14.4142136 14.4142136 14.4142136 14.4142136 22.8994949 11.5857864 22.8994949 11.5857864 14.4142136 3.10050506 14.4142136 3.10050506 11.5857864 11.5857864 11.5857864 11.5857864 3.10050506 14.4142136 3.10050506 14.4142136 11.5857864 22.8994949 11.5857864"></polygon>
    </svg>
  </div>






</div>






<div v-if="type==='updated'">



</div>


</div>
</template>



<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "SidecarRecord",
  components: { },
  props: ['type', 'index'],
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
    ROOM_NAME: function(){
      if(this.STUDENT_LIST.room_name){
        return this.STUDENT_LIST.room_name
      }else{
        return '퇴실'
      }
    },
    ...mapState(['admin', 'studentList', 'test', 'studentTest'])
  },
  methods: {
    ...mapMutations([])
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
.sidecar-record {
  position: relative;
  width: 100%;
  font-family: 'Nanum Square', sans-serif;
  font-weight: 500;
  letter-spacing: 0;
  // background-color: deepskyblue;
}

.selection {
  height: 59px;
  color: var(--i45);
  border-bottom: 1px solid var(--i30);
  background-color: transparent;
  transition: 200ms;

  .name {
    float: left;
    position: relative; top: 9px; left: 1px;
    font-weight: 700;
    font-size: 15px;
    line-height: 19px;
    // background-color: fuchsia;
  }
  .id {
    float: left;
    position: relative; top: 8px; left: 3px;
    font-size: 13px;
  }
  .room {
    float: left;
    position: relative; top: 10px; left: 7px;
    font-size: 15px;
    line-height: 18px;
  }
  .num {
    position: absolute; bottom: 9px; left: 1px;
    font-size: 13px;
  }
  .delete {
    position: absolute; top: 8px; right: 3px;
    width: 17px;
    height: 17px;
    fill: var(--i45);
  }.delete:hover {

    cursor: pointer;
    fill: var(--i20);
  }
}.selection:hover {
  transition: 300ms;
  color: var(--i30);
  background-color: var(--i98);
}

















.updated {
  height: fit-content;

  .name {
    background-color: darkorchid;
  }


}





</style>