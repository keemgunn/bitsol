
<template>
<div id="search">
<div class="cover-app-side" :style="{'left':0}"></div>
<div class="cover-app-side" :style="{'right':0}"></div>
<div id="content">

  <div id="option">
    <Deadline v-if="!search.moreinfo" />
    <ScopeBtn/>
  </div>

  <div id="list">


  </div>











</div>
</div>
</template>


<script>
import ScopeBtn from '@/components/search/ScopeBtn';
import Deadline from '@/components/search/Deadline';
import { mapState, mapMutations } from 'vuex';
// import axios from 'axios';

export default {
  name: "Search",
  components: {
    ScopeBtn, Deadline
  },
  data() { return {

  }},
  computed: {
    ...mapState(['search', 'searchArr']),
  },
  methods: {
    ...mapMutations(['searchLoadingState']),
  },
  created() {

  },
  mounted() {

  },
  beforeUpdate() {
    this.searchLoadingState(1);
  },
  updated() {
    this.searchLoadingState(0);
  }
}
</script>



<style lang="scss" scoped> 
#search {
  position: absolute; top: 180px; left: 0;
  width: 100%;
  height: calc(100% - 180px);
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: none; -webkit-user-select: none;
}
#content {
  position: relative; top: 0; left: 0;
  z-index: 10;
  width: calc(100vw - 120px);
    min-width: 490px;
    max-width: 710px;
  height: 100%;
  // background-color: rgb(0, 224, 150);
}

#option {
  position: absolute; top: 0; left: 0;
  width: 100%;
  height: 86px;
  background-color: var(--i94);
}

#list {
  position: absolute; top: 86px; left: 0;
  width: 100%;
  height: calc(100% - 86px);
  background-color: rgba(255, 0, 191, 0.493);
}





.cover-app-side {
  position: absolute; top: 0;
  z-index: 2;
  height: 100vh;
  background-color: var(--i94);
  // background-color: rgba(78, 78, 78, 0.295);
}
@media ( max-width: 2000px ) {
    .cover-app-side {
        width: calc( 50vw - 340px );
    }   
}
@media ( max-width: 800px ) {
    .cover-app-side {
        width: calc( 10vw );
    } 
}
@media ( max-width: 550px ) {
    .cover-app-side {
        width: calc( 7vw );
    } 
}
</style>