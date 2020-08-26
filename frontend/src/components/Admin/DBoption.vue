<template>
<div id="db-option">

  <div class="scope" 
  :class="{'scope-selected':scope === 'room'}"
  @click="$emit('toggle','scope','room')"
  >호실 목록</div>
      
  <div class="scope"
  :class="{'scope-selected':scope === 'student'}"
  @click="$emit('toggle','scope','student')"
  >전체 학생</div>

  <div class="option-box" 
  :class="{'option-box-expand':optionBox}"
  v-click-outside="onClickOutside">

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

</div>
</template>



<script>
import vClickOutside from 'v-click-outside'
import { mapState } from 'vuex'

export default {
  name: "DBoption",
  components: { },
  props: [
    'scope',
    'optionBox',

  ],
  data() { return {

  }},
  computed: {
    option: function () {
      let bool = 0;
      if(this.admin.db.options.showEmpty){
        bool ++ ;
      }
      if(this.admin.db.options.showForeign){
        bool ++ ; 
      }
      return bool
    },
    ...mapState(['admin'])
  },
  methods: {
    onClickOutside (event) {
      console.log('Clicked outside. Event: ', event);
      this.$emit('toggle','optionBox',false);
    },
    optionCheck(opt) {
      this["admin"]["db"]["options"][opt] = !this["admin"]["db"]["options"][opt];
    }
  },
  directives: {
    clickOutside: vClickOutside.directive
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
  margin: 2px 0px 5px 5px;
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







</style>