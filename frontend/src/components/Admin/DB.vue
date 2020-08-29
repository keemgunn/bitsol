<template>
<div id="db">

  <Sidecar />

  <div id="content">

    <DBoption 
      :scope="scope"
      :optionBox="optionBox"
      @toggle="toggle"
    />

    <transition name="appear"><RoomList
      v-if="scope === 'room'"
    /></transition>

    <transition name="appear"><StudentList
      v-if="scope === 'student'"
    /></transition>


  </div>

  

</div>
</template>



<script>
import Sidecar from '@/components/admin/Sidecar'
import DBoption from '@/components/admin/DBoption'
import RoomList from '@/components/admin/RoomList'
import StudentList from '@/components/admin/StudentList'
import { mapState, mapMutations } from 'vuex'

export default {
  name: "DB",
  components: { Sidecar, DBoption, RoomList, StudentList },
  props: [
    
  ],
  data() { return {
    scope: 'room',
    optionBox: false,
  }},
  computed: {
    ...mapState(['admin'])
  },
  methods: {
    toggle(target, set){
      this[target] = set;
    },
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
#db {
  z-index: 10;
  position: absolute; top: 0; left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
}
#content {
  position: relative; top: 0; left: 0;
  width: calc(100vw - 120px);
    min-width: 490px;
    max-width: 710px;
  // background-color: rgba(235, 142, 30, 0.253);
}






</style>