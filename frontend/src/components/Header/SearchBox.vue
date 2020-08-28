<template>
<div id="search-box"><form id="box" 
@submit.prevent autocomplete="off">

  <input
    id = "search-field"
    ref="searchField" 
    placeholder="search..."
    type="text" 
    @input="search.keyword = $event.target.value"
    @keyup="searchStudent()"
  />

  <div id="icon">
    <svg viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>search</title>
      <g id="search">
        <path d="M25.4145707,8.58542931 C29.3924686,12.5633272 29.9654047,18.6567972 27.1333788,23.2441062 L34.5716035,30.6825162 L30.6825162,34.5716035 L23.2441062,27.1333788 C18.6567972,29.9654047 12.5633272,29.3924686 8.58542931,25.4145707 C3.93819024,20.7673316 3.93819024,13.2326684 8.58542931,8.58542931 C13.2326684,3.93819024 20.7673316,3.93819024 25.4145707,8.58542931 Z M12.4745166,12.4745166 C9.97516114,14.9738721 9.97516114,19.0261279 12.4745166,21.5254834 C14.9738721,24.0248389 19.0261279,24.0248389 21.5254834,21.5254834 C24.0248389,19.0261279 24.0248389,14.9738721 21.5254834,12.4745166 C19.0261279,9.97516114 14.9738721,9.97516114 12.4745166,12.4745166 Z" id="Combined-Shape" fill-rule="nonzero"></path>
      </g>
    </svg>
  </div>

  <div id="indicator">
    <div id="load-bar" v-if="search.loadingState === 1"></div>
  </div>

</form>
</div>
</template>


<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "SearchBox",
  data() { return {
  }},
  computed: {
    ...mapState(['search', 'searchArr'])
  },
  methods: {
    searchStudent(){
      this.SEARCH(this.search.keyword);
      this.searchCoverBottom();
    },
    ...mapMutations(['SEARCH', 'searchCoverBottom']),
  },
  mounted() {
    // this.$refs.searchField.focus(); // 이거 하면 창 뜨자마자 자동으로 검색메서드 실행됨
  },
}
</script>



<style lang="scss" scoped> #search-box {
  position: absolute; bottom: 0; left: 0;
  width: 100%;
  height: 80px;
  color: var(--i45);
  // background-color: darkturquoise;
}
#search-box :hover, :focus {
  color: var(--i30);
  ~ #indicator {
    transition: 200ms;
    background-color: var(--i30);
  }
  ~ #icon{
    transition: 200ms;
    fill: var(--i30);
  }
}


#search-field {
  display: block;
  position: absolute; bottom: 7px; left: 0;
  padding: 0;
  margin-top: 6px;
  height: calc(100% - 10px);
  width: calc(100% - 46px);
  border: 0; outline: 0;
  font-family: 'Space Mono', 'Nanum Square', sans-serif;
  font-size: 60px;
  letter-spacing: 0;
  text-align: right;
  color: var(--i30);
  background-color: transparent;
  transition: 500ms;
  &::placeholder {
  color: transparent;
  }
}#search-field:hover {
  transition: 200ms;
  color: var(--i30);
}


#icon { //--------------
  float: right;
  position: absolute; bottom: 9px; right: 4px;
  width: 40px;
  height: 40px;
  transition: 500ms;
  fill: var(--i45);
}


#indicator {
  position: absolute; bottom: 0px; left: 0;
  width: 100%;
  height: 4px;
  background-color: var(--i45);
  transition: 500ms;
}
#load-bar {
  position: absolute; top: 0; left: 0;
  z-index: 20;
  width: 100%;
  height: 100%;
  animation: blink 300ms cubic-bezier(.37,.06,.67,.94) infinite;
  background-color: var(--accent01);
}
@keyframes blink {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

</style>