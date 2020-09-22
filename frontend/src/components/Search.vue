
<template>
<div id="search">
<div class="cover-app-side" :style="{'left':0}"></div>
<div class="cover-app-side" :style="{'right':0}"></div>
<div id="content">

  <div id="option">

    <transition name="fade">
    <Deadline v-if="!search.moreinfo" />
    </transition>

    <ScopeBtn/>
  </div>

  <div id="list-wrapper">
    <div id="list"
    :key="info.student_id"
    v-for="info in searchArr">
      <div class="records">
        <Record :info="info"/>
        <div class="record-cover-bottom"></div>
      </div>
      
    </div>
    <div id="cover-bottom" :style="search.coverBottom"></div>
  </div>
  <div class="cover-scroll-bottom"></div>

  <transition name="no-result">
  <div class="no-result" v-if="!searchArr.length">{{msg}}</div>
  </transition>

</div>
</div>
</template>


<script>
import ScopeBtn from '@/components/search/ScopeBtn';
import Deadline from '@/components/search/Deadline';
import Record from '@/components/search/Record';
import { mapState, mapMutations } from 'vuex';

export default {
  name: "Search",
  components: {
    ScopeBtn, Deadline, Record
  },
  computed: {
    msg: function() {
      if(this.search.keyword === ''){
        return "호실 또는 이름으로 검색..."
      }else{
        return "검색결과가 없습니다..."
      }
    },
    ...mapState(['search', 'searchArr', 'testArr']),
  },
  methods: {
    ...mapMutations(['searchLoadingState',]),
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
  z-index: 10;
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
  width: calc(100vw - 120px);
    min-width: 490px;
    max-width: 710px;
  height: 100%;
  // background-color: rgb(0, 224, 150);
}
.cover-app-side {
  position: absolute; top: 0;
  z-index: 2;
  height: 100vh;
  background-color: var(--i94);
}
@media ( max-width: 4000px ) {
  .cover-app-side {
      width: calc( 50vw - 355px );
  }   
}
@media ( max-width: 830px ) {
  .cover-app-side {
      width: 60px;
  } 
}
@media ( max-width: 610px ) {
  .cover-app-side {
      width: calc( 50vw - 245px );
  } 
}


#option {
  position: absolute; top: 0; left: 0;
  width: 100%;
  height: 86px;
  background-color: var(--i94);
}


#list-wrapper {
  position: absolute; top: 86px; left: -20px;
  width: calc(100% + 40px);
  height: calc(100% - 86px);
  overflow-y: auto;
  overflow-x: hidden;
  // background-color: rgba(119, 119, 119, 0.24);
}

#list {
  position: relative; top: 0; left: 20px;
  width: calc(100vw - 120px);
    min-width: 490px;
    max-width: 710px;
  height: fit-content;
  // background-color: #24deff56;
}

.records {
  position: relative; top: 0; left: 0;
  width: 100%;
  height: fit-content;
  .record-cover-bottom {
    position: relative; top: 0; left: 0;
    width: 100%;
    height: 10px;
    background-color: var(--i94);
    // background-color: rgba(121, 121, 121, 0.247);
  }
}

#cover-bottom {
  width: 100%;
  background-color: var(--i94);
  // background-color: rgba(0, 100, 0, 0.404);
}

.no-result {
  position: absolute; top: 86px; left: 0;
  width: 100%;
  height: 100px;
  font-family: 'Nanum Square', sans-serif;
  font-weight: 200;
  font-size: 35px;
  color: var(--i45);
  font-style: italic;
  letter-spacing: 0.31px;
  user-select: none;
  -webkit-user-select: none;
  // background-color: rgb(122, 216, 153);
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
  margin-bottom: 50px; 
}
.cover-scroll-bottom {
  position: absolute; bottom: 0px; right: -20px;
  float: right;
  width: 5px;
  height: 50px;
  background-color: var(--i94);
}


.no-result-enter {
  opacity: 0;
  transform: translateY(-8px);
} 
.no-result-enter-to {
  opacity: 1;
}
.no-result-enter-active{
  transition: all 200ms;
  transition-delay: 300ms;
}
.no-result-leave {
  opacity: 1;
}
.no-result-leave-to {
  opacity: 0;
}
.no-result-leave-active {
  transition: all 1ms;
}
</style>