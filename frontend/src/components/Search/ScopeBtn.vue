<template>
<div id="scope-btn"
@click="changeScope()">

  <div class="switch">
    <svg :class="{'box':1, 'box-on':search.moreinfo}" viewBox="0 0 30 16" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>학생 정보 보기</title>
      <rect id="Rectangle-Copy" x="0" y="0" width="30" height="16" rx="8"></rect>
    </svg>
    <svg :class="{'btn':1, 'btn-on':search.moreinfo}" viewBox="0 0 12 12" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <title>학생 정보 보기</title>
      <circle id="Oval" cx="6" cy="6" r="6"></circle>
    </svg>
  </div>

  <div class="text" :class="{'text-on':search.moreinfo}">
    학생 정보 보기
  </div>

</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  name: "AdminBtn",
  data() { return {
  }},
  computed: {
    ...mapState(['search'])
  },
  methods: {
    changeScope(){
      if(this.search.moreinfo){
        this.search.moreinfo = false;
        this.search.recordHeight = 146;
        this.searchCoverBottom();
      }else{
        this.search.moreinfo = true;
        this.search.recordHeight = 66;
        this.searchCoverBottom();
      }
    },
    ...mapMutations(['searchCoverBottom']),
  }
}
</script>

<style lang="scss" scoped> #scope-btn {
  position: absolute; top: 24px; right: 0;
  width: fit-content;
  height: 16px;
  transition: 400ms;
  color: var(--i45);
  // background-color: dodgerblue;
}#scope-btn:hover {
  transition: 300ms;
  cursor: pointer;
  color: var(--accent01);

  .text-on{
  color: var(--accent03);
  }
  .box {
    fill: var(--accent01);
  }
  .box-on {
  fill: var(--accent02);
  }
}


.text{
  float: right;
  margin-right: 6px;
  font-family: 'Nanum Square';
  text-align: right;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.21px;
}.text-on{
  transition: 200ms;
  color: var(--accent03);
}


.switch {
  float: right;
  width: 30px;
  height: 16px;
}

.box {
  float: left;
  width: 30px;
  height: 16px;
  fill: var(--i70);
  transition: 300ms;
}.box-on{
  transition: 200ms;
  fill: var(--accent02);
}

.btn {
  position: relative;
  float: left;
  bottom: 14px;
  left: 2px;
  width: 12px;
  height: 12px;
  fill: var(--i94);
  transition: 300ms;
}.btn-on {
  animation-timing-function: ease-in-out;
  transition: 200ms;
  left: 16px;
}

</style>