<template>
<div id="db-list">
{{roomList}}


</div>
</template>



<script>
import { mapState, mapMutations } from 'vuex'


export default {
  name: "DBlist",
  components: { },
  props: [

  ],
  data() { return {

  }},
  computed: {
    ...mapState(['roomList', 'studentList', 'searchArr'])
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
#db-list {
  position: relative;
  width: 100%;
  height: calc(100% - 83px);
  overflow-x: hidden;
  overflow-y: auto;

  background-color: rgba(0, 140, 255, 0.534);
}





</style>