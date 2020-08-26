<template>
<div id="admin-db-header">

  <div id="scope-wrapper">

    <div class="sidegap left"></div>
    
    <div class="scope" 
    :class="{'scope-selected':scope==='room'}"
    @click="scope='room'"
    >호실 목록</div>
    
    <div class="scope"
    :class="{'scope-selected':scope==='student'}"
    @click="scope='student'"
    >전체 학생</div>
    <div class="option-box" 
    :class="{'option-box-extend':option}"
    @click="option=!option">
      <div class="title">
        <div class="title-text">
          표시 옵션
        </div>
        <div class="title-icon">
          <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <title>option</title>
            <g> 
            <polygon points="7 10 12 15 17 10"></polygon>
            </g>
          </svg>
        </div>
      </div>
      <div class="option">
        <div class="option-checkbox">

        </div>
        공실만 표시
      </div>
    </div>


  </div>



</div>
</template>



<script>
export default {
  name: "AdminDbHeader",
  props: [

  ],
  data() { return {

  }},
  computed: {

  },
  methods: {

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



<style lang="scss" scoped> #admin-db-header {
  width: 100%;
  height: 83px;
  background-color: rgba(0, 255, 170, 0.26);
}

#scope-wrapper { // ---------------------------
  width: fit-content;
  height: fit-content;
  float: left;
  user-select: none; -webkit-user-select: none;
}

.scope {
  float: left;
  margin-right: 7px;
  width: 111px;
  height: 29px;
  border: 2px solid var(--i45);
  text-align: center;
  align-content: center;
  font-family: 'Nanum Square', sans-serif;
  font-weight: 600;
  font-size: 16px;
  line-height: 31px;
  color: var(--i45);
  transition: 300ms;
}.scope:hover {
  transition: 200ms;
  cursor: pointer;
  color: var(--i30);
  border: 2px solid var(--i30);
}.scope-selected {
  color: var(--accent03);
  border: 2px solid var(--accent03);
}.scope-selected:hover {
  cursor: default;
  color: var(--accent03);
  border: 2px solid var(--accent03);
}

.option-box {
  display: inline-block;
  width: 80px;
  height: 29px;
  align-content: center;
  border: 2px solid transparent;
  color: var(--i45);
  fill: var(--i45);
  transition: 300ms;
  transition-timing-function: ease-in-out;
  // background-color: rgba(210, 30, 180, 0.425);

  .title {
    position: relative;
    top: 3px;
    width: fit-content;
    height: 24px;
    background-color: rgba(206, 194, 29, 0.377);
    .title-text{
      display: inline-block;
      position: relative;
      bottom: 4px;
      font-family: 'Nanum Square';
      font-weight: 400;
      font-size: 14px;
      text-align: left;
      line-height: 23px;
      // background-color: dodgerblue;
    }
    .title-icon{
      display: inline-block;
      position: relative;
      top: 2px;
      width: 20px;
      height: 20px;
      // background-color: aqua;
    }
  }

  .option {
    position: relative;
    top: 8px;
    width: fit-content;
    height: 24px;
    background-color: rgba(155, 155, 155, 0.541);
    font-family: 'Nanum Square', sans-serif;
    font-size: 14px;
    color: var(--i45);
    fill: var(--i45);
    .option-checkbox{
      display: inline-block;
      width: 24px;
      height: 24px;
      background-color: rgba(255, 0, 255, 0.205);
    }
  }
}.option-box:hover {
  transition: 200ms;
  cursor: pointer;
  color: var(--i30);
  fill: var(--i30);
}.option-box-extend {
  transition: 300ms;
  transition-timing-function: ease-in-out;
  padding-left: 5px;
  width: 136px;
  height: 93px;
  color: var(--i30);
  fill: var(--i30);
  border: 2px solid var(--i30);
}.option-box-extend:hover{
  transition: 300ms;
  transition-timing-function: cubic-bezier(.09,.26,.42,.93);
  cursor: default;
}




#search-wrapper { // ---------------------------
  width: fit-content;
  height: fit-content;
  float: right;
}



.sidegap {
  width: 20px;
  height: 100%;
  background-color: rgb(0, 255, 255);
}.left {
  float: left;
}.right {
  float: right;
}







</style>