<template>
<div id="student-list">
{{studentList}}


</div>
</template>



<script>
import { mapState, mapMutations } from 'vuex'


export default {
  name: "StudentList",
  components: { },
  props: [

  ],
  data() { return {

  }},
  computed: {
    ...mapState(['roomList', 'studentList', 'searchArr', 'roomTest', 'studentTest', 'testArr' ])
  },
  methods: {
    ...mapMutations(['LOAD_STUDENT_LIST'])
  },
  created() {
    if(this.studentList.length === 0){
      this.LOAD_STUDENT_LIST();
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
#student-list {
  position: relative;
  width: 100%;
  height: calc(100% - 83px);
  overflow-x: hidden;
  overflow-y: auto;

  background-color: rgba(0, 140, 255, 0.534);
}





</style>