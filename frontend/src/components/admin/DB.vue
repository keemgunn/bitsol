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

    <div class="cover-scroll-bottom"></div>
  </div>

  

</div>
</template>



<script>
import Sidecar from './Sidecar'
import DBoption from './db/DBoption'
import RoomList from './db/RoomList'
import StudentList from './db/StudentList'
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
  width: 710px;
  height: 96%;
  // background-color: rgba(235, 142, 30, 0.253);
}

.cover-scroll-bottom {
  position: absolute; bottom: 0px; right: -20px;
  float: right;
  width: 5px;
  height: 13px;
  background-color: var(--i94);
}
</style>