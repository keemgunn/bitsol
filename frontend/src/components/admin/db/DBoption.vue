<template>
<div id="db-option">

  <div class="scope" 
  :class="{'scope-selected':scope === 'room'}"
  @click="scopeChange('room')"
  >호실 목록</div>
      
  <div class="scope"
  :class="{'scope-selected':scope === 'student'}"
  @click="scopeChange('student')"
  >전체 학생</div>

  <div class="option-box" 
  :class="{'option-box-expand':optionBox}"
  @mouseleave="$emit('toggle', 'optionBox', false)">

    <div class="title" 
    :class="{'title-expand':optionBox, 'title-checked':option}"
    @click="$emit('toggle','optionBox',!optionBox)">
      <div class="title-text">
        표시 옵션 
        <div id="number" v-if="option">({{option}})</div>
      </div>
      <svg class="title-icon" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>option</title>
        <polygon points="7 10 12 15 17 10"></polygon>
      </svg>
    </div>

    <transition name="appear">
    <div class="option-wrapper"
    v-if="optionBox">

      <div class="options"
      :class="{'options-checked':admin.db.options.showEmpty}"
      @click="optionCheck('showEmpty')">
        <div class="opt-checkbox"></div>
        <div class="opt-text">공실만 표시</div>
      </div>

      <div class="options"
      :class="{'options-checked':admin.db.options.showForeign}"
      @click="optionCheck('showForeign')">
        <div class="opt-checkbox"></div>
        <div class="opt-text">외국인 학생</div>
      </div>

    </div></transition>

  </div>

  <div id="search-box">
    <input
    id = "admin-search-field"
    placeholder="검색"
    type="text" 
    @input="admin.db.keyword = $event.target.value"
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
    <div id="border"></div>

  </div>

  <div id="count-box">
    {{recordCount}}
  </div>



</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex'

export default {
  name: "DBoption",
  components: { },
  props: ['scope','optionBox',],
  computed: {
    ...mapState(['admin']),
    ...mapGetters(['ROOM_INDEX', 'STUDENT_INDEX']),
    recordCount: function () {
      if(this.scope === 'room') {
        return '호실: ' + this.ROOM_INDEX.length
      }else{
        return '학생: ' + this.STUDENT_INDEX.length
      }
    },
    option: function () {
      let bool = 0;
      if(this.admin.db.options.showEmpty){
        bool ++ ;
      }
      if(this.admin.db.options.showForeign){
        bool ++ ; 
      }
      return bool
    }
  },
  methods: {
    ...mapMutations(['SEARCH_room', 'SEARCH_student']),
    optionCheck(opt) {
      this["admin"]["db"]["options"][opt] = !this["admin"]["db"]["options"][opt];
    },
    scopeChange(s){
      if(s === 'room'){
        this.SEARCH_student('');
      }else{
        this.SEARCH_room('');
      }
      this.admin.db.keyword = '';
      this.$emit('toggle', 'scope', s);
    },
    searchStudent(){
      if(this.scope === 'room'){
        this.SEARCH_room(this.admin.db.keyword);
      }else{
        this.SEARCH_student(this.admin.db.keyword);
      }
    }
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
#db-option {
  position: relative;
  width: 100%;
  height: 83px;
  user-select: none; -webkit-user-select: none;
  // background-color: rgb(161, 161, 255);
}
.scope { // ================================
  float: left;
  margin-right: 7px;
  width: 111px;
  height: 29px;
  font-family: 'Nanum Square', sans-serif;
  font-weight: 700;
  font-size: 16px;
  text-align: center;
  letter-spacing: 0;
  line-height: 31px;;
  border: solid var(--i45) 2px;
  color: var(--i45);
  transition: 500ms;
}.scope:hover {
  transition: 200ms;
  cursor: pointer;
  border: solid var(--accent01) 2px;
  color: var(--accent01);
}.scope-selected {
  transition: 500ms;
  border: solid var(--accent03) 2px;
  color: var(--accent03);
}.scope-selected:hover {
  transition: 200ms;
  cursor: default;
  border: solid var(--accent03) 2px;
  color: var(--accent03);
}


.option-box { // ================================
z-index: 20;
  position: absolute; top: 0px; left: 244px;
  width: 120px;
  height: 29px;
  border: solid transparent 2px;
  background-color: var(--i94);
  transition: 500ms;
}.option-box:hover {
  transition: 200ms;
  cursor: pointer;
}
.option-box-expand {
  border: solid var(--i45) 2px;
  background-color: var(--i100);
  width: 145px;
  height: 100px;
}

.title { // ---------------------
  position: relative;
  margin-top: 3px;
  margin-left: 5px;
  width: fit-content;
  height: 24px;
  font-family: 'Nanum Square', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0;
  line-height: 25px;
  color: var(--i45);
  fill: var(--i45);
  transition: 500ms;
  // background-color: white;
}.title-text {
  float:left
}.title-icon {
  float: right;
  width: 24px;
  height: 24px;
  // background-color: aqua;
}.title:hover {
  transition: 200ms;
  color: var(--i20);
  fill: var(--i20);
}
.title-expand {
  margin-left: 10px;  
  color: var(--i30);
  fill: var(--i30);
}
.title-checked {
  transition: 200ms;
  color: var(--accent02);
  fill: var(--accent02);
}.title-checked:hover {
  transition: 200ms;
  color: var(--accent03);
  fill: var(--accent03);
}
#number {
  display: inline-block;
  position: relative;
}

.option-wrapper { // ---------------------
  position: absolute; top: 30px; left: 10px;
  width: fit-content;
  height: fit-content;
  // background-color: chartreuse;
}
.options {
  position: relative;
  width: fit-content;
  margin: 4px 0px 5px 5px;
  height: 24px;
  font-family: 'Nanum Square', sans-serif;
  font-weight: 600;
  font-size: 14px;
  letter-spacing: 0;
  transition: 400ms;
}.opt-text {
  float: left;
  margin-top: 5px;
  margin-left: 6px;
  width: fit-content;
  height: 16px;
  color: var(--i45);
  transition: 100ms;
}.opt-checkbox {
  float: left;
  width: 20px;
  height: 20px;
  border: solid 2px var(--i100);
  background-color: var(--i80);
  transition: 100ms;
}.options:hover {
  transition: 200ms;
  .opt-text {
    color: var(--i30);
  }.opt-checkbox {
    border: solid 2px var(--i90);
    background-color: var(--i70);
  }
}
.options-checked {
  transition: 200ms;
  .opt-text {
    color: var(--accent01);
  }.opt-checkbox {
    background-color: var(--accent01);
  }
}.options-checked:hover {
  transition: 200ms;
  .opt-text {
    color: var(--accent01);
  }.opt-checkbox {
    background-color: var(--accent01);
  }
}


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


#count-box {
  position: absolute; left: 0px; bottom: 14px;
  padding-bottom: 3px;
  width: 97px;
  height: fit-content;
  border-bottom: 2px solid var(--i70);
  font-family: 'Barlow';
  font-style: italic;
  font-weight: 600;
  font-size: 17px;
  color: var(--i60);
  letter-spacing: 0;
  transition: 300ms;
}#count-box:hover {
  transition: 300ms;
  color: var(--i45);
  border-bottom: 2px solid var(--i60);
}



</style>