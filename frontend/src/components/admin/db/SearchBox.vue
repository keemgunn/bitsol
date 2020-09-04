<template>
<div>

<div v-if="scope === 'room'">
<form id="search-box" 
@submit.prevent autocomplete="off">
  <input
  id = "admin-search-field"
  placeholder="검색"
  type="text" 
  @input="admin.db.keyword = $event.target.value"
  @keyup="SEARCH_room()"
  />
  <div id="icon">
    <svg viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>search</title>
      <g id="search">
        <path d="M25.4145707,8.58542931 C29.3924686,12.5633272 29.9654047,18.6567972 27.1333788,23.2441062 L34.5716035,30.6825162 L30.6825162,34.5716035 L23.2441062,27.1333788 C18.6567972,29.9654047 12.5633272,29.3924686 8.58542931,25.4145707 C3.93819024,20.7673316 3.93819024,13.2326684 8.58542931,8.58542931 C13.2326684,3.93819024 20.7673316,3.93819024 25.4145707,8.58542931 Z M12.4745166,12.4745166 C9.97516114,14.9738721 9.97516114,19.0261279 12.4745166,21.5254834 C14.9738721,24.0248389 19.0261279,24.0248389 21.5254834,21.5254834 C24.0248389,19.0261279 24.0248389,14.9738721 21.5254834,12.4745166 C19.0261279,9.97516114 14.9738721,9.97516114 12.4745166,12.4745166 Z" id="Combined-Shape" fill-rule="nonzero"></path>
      </g>
    </svg>
  </div>
  <div id="border"></div>
</form></div>

<div v-if="scope === 'student'">
<form id="search-box" 
@submit.prevent autocomplete="off">
  <input
  id = "admin-search-field"
  placeholder="검색"
  type="text" 
  @input="admin.db.keyword = $event.target.value"
  @keyup="SEARCH_student()"
  />
  <div id="icon">
    <svg viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>search</title>
      <g id="search">
        <path d="M25.4145707,8.58542931 C29.3924686,12.5633272 29.9654047,18.6567972 27.1333788,23.2441062 L34.5716035,30.6825162 L30.6825162,34.5716035 L23.2441062,27.1333788 C18.6567972,29.9654047 12.5633272,29.3924686 8.58542931,25.4145707 C3.93819024,20.7673316 3.93819024,13.2326684 8.58542931,8.58542931 C13.2326684,3.93819024 20.7673316,3.93819024 25.4145707,8.58542931 Z M12.4745166,12.4745166 C9.97516114,14.9738721 9.97516114,19.0261279 12.4745166,21.5254834 C14.9738721,24.0248389 19.0261279,24.0248389 21.5254834,21.5254834 C24.0248389,19.0261279 24.0248389,14.9738721 21.5254834,12.4745166 C19.0261279,9.97516114 14.9738721,9.97516114 12.4745166,12.4745166 Z" id="Combined-Shape" fill-rule="nonzero"></path>
      </g>
    </svg>
  </div>
  <div id="border"></div>
</form></div>

</div>
</template>



<script>
import { mapState, mapMutations } from 'vuex';


export default {
  name: "SearchBox",
  components: { },
  props: [ 'scope' ],
  computed: {
    ...mapState(['admin'])
  },
  methods: {
    ...mapMutations(['SEARCH_room', 'SEARCH_student'])
  }
}
</script>



<style lang="scss" scoped> 
#search-box {
  position: relative;
  float: right;
  margin-top: 2px;
  width: 153px;
  height: 30px;
  color: var(--i45);
  fill: var(--i45);
  // background-color: darkseagreen;
}
#search-box :hover, :focus {
  color: var(--i30);
  ~ #border {
    transition: 200ms;
    background-color: var(--i30);
  }
  ~ #indicator {
    transition: 200ms;
    background-color: var(--i30);
  }
  ~ #icon{
    transition: 200ms;
    fill: var(--i30);
  }
}
#admin-search-field {
  display: block;
  position: absolute; bottom: 2px; right: 28px;
  padding: 0;
  margin-top: 6px;
  height: calc(100%);
  width: calc(100% - 26px);
  border: 0; outline: 0;
  font-family: 'Space Mono', 'Nanum Square', sans-serif;
  font-weight: 400;
  font-size: 18px;
  letter-spacing: 0;
  text-align: right;
  color: var(--i30);
  background-color: transparent;
  transition: 500ms;
  &::placeholder {
  color: var(--i60);
  font-size: 15px;
  }
}#admin-search-field:hover {
  transition: 200ms;
  color: var(--i30);
}
#border {
  position: absolute; bottom: 0; left: 0;
  width: 100%;
  height: 2px;
  background-color: var(--i45);
}
#icon {
  position: absolute; bottom: 3px; right: 0px;
  width: 23px;
  height: 23px;
  transition: 200ms;
}





</style>