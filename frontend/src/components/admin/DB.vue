<template>
<div id="db">

  <Sidecar />

  <div id="content">
    <DBoption 
      :scope="scope"
      :optionBox="optionBox"
      @toggle="toggle"
    />

    <transition name="appear"><List
      v-if="scope==='room'"
      :scope="scope"
    /></transition>
    <transition name="appear"><List
      v-if="scope==='student'"
      :scope="scope"
    /></transition>

    <div class="cover-scroll-bottom"></div>
  </div>

</div>
</template>



<script>
import Sidecar from './Sidecar'
import DBoption from './db/DBoption'
import List from './db/List'
import { mapState, mapGetters } from 'vuex'

export default {
  name: "DB",
  components: { Sidecar, DBoption, List },
  data() { return {
    scope: 'room',
    optionBox: false,
  }},
  computed: {
    ...mapState(['admin']),
    ...mapGetters(['ROOM_LIST', 'STUDENT_LIST'])
  },
  methods: {
    toggle(target, set){
      this[target] = set;
    },
  },
  created() {
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