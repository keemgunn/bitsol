<template>
<div id="db-option">

  <div class="scope" 
  :class="{'scope-selected':scope === 'room'}"
  @click="scopeChange('room')"
  >호실 목록</div>
      
  <div class="scope"
  :class="{'scope-selected':scope === 'student'}"
  @click="scopeChange('student')"
  >학생 목록</div>

  <div class="scope"
  :class="{'scope-selected':scope === 'worksheet'}"
  @click="scopeChange('worksheet')"
  >DB 관리</div>

  <transition name="appear">
  <div v-if="scope !== 'worksheet'">
  <SearchBox v-if="scope==='room'"
  :scope="scope"/>
  <SearchBox v-if="scope==='student'"
  :scope="scope"/>
  </div></transition>

  <transition name="appear">
  <div v-if="scope !== 'worksheet'" id="count-box">
    {{recordCount}}
  </div></transition>
  
</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import SearchBox from './SearchBox'

export default {
  name: "DBoption",
  components: { SearchBox },
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
      }else if(s === 'student'){
        this.SEARCH_room('');
      }else{
        this.SEARCH_student('');
        this.SEARCH_room('');
      }
      this.admin.db.keyword = '';
      this.$emit('toggle', 'scope', s);
    },
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