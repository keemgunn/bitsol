<template>
<div id="adj-modal">
  <div id="adj-container" v-click-outside="close">
    <div class="header">
      <div class="title">학생정보 수정</div>
      <div class="title _name">- {{STUDENT.student_name}}</div>
      <div class="title _id">{{STUDENT.student_id}}</div>
      <div class="icon" @click="close()">
        <svg viewBox="0 0 22 22" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
          <title>닫기</title>
          <polygon transform="translate(11,-5) rotate(45)" fill-rule="nonzero" points="19.6620581 12.2374369 12.2374369 12.2374369 12.2374369 19.6620581 9.76256313 19.6620581 9.76256313 12.2374369 2.33794193 12.2374369 2.33794193 9.76256313 9.76256313 9.76256313 9.76256313 2.33794193 12.2374369 2.33794193 12.2374369 9.76256313 19.6620581 9.76256313"></polygon>
          </svg>
      </div>
    </div>
    <div class="division"></div>
    <div class="info">
      <div class="_fixed">호실: {{STUDENT.room_name}}</div>
      <div class="_fixed">입주일: {{STUDENT.indate}}</div>
    </div>
    <div class="editable">
      <div class="_prop">학번: </div>
      <div class="_data">{{STUDENT.student_number}}</div>
    </div>
    <div class="editable">
      <div class="_prop">소속 대학:</div>
      <div class="_data">{{isnull(STUDENT.faculty)}}</div>
    </div>
    <div class="editable">
      <div class="_prop">소속 과:</div>
      <div class="_data">{{isnull(STUDENT.major)}}</div>
    </div>
    <div class="editable">
      <div class="_prop">전화번호:</div>
      <div class="_data">{{isnull(STUDENT.phone)}}</div>
    </div>
    <div class="editable">
      <div class="_prop">환불계좌:</div>
      <div class="_data">이름 은행이름 112-124-4124123</div>
    </div>
  </div>
</div>
</template>



<script>
import { mapState, mapGetters, mapMutations } from 'vuex'
import ClickOutside from 'vue-click-outside';

export default {
  name: "Adj",
  components: { },
  props: [ 'index' ],
  data() { return { trigger: 0 }},
  computed: {
    ...mapGetters(['STUDENT_LIST']),
    ...mapState([]),
    STUDENT: function(){
      return this.STUDENT_LIST[this.index]
    },
  },
  methods: {
    ...mapMutations([]),
    isnull(input){
      if(input){
        return input
      }else{
        return '데이터 없음'
      }
    },
    close() {
      // ~~ adjust confirm method
      this.trigger ++;
      if(this.trigger === 2){
        this.trigger = 0
        this.$emit('close');
      }
    },
  },
  created() {

  },
  mounted () {
    // this.popupItem = this.$el
  },
  directives: {
    ClickOutside
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
#adj-modal {
  z-index: 30;
  position: fixed; top: 0; left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: rgba(0, 0, 0, 0.692);
}
#adj-container {
  position: relative; top: 0; left: 0;
  width: 490px;
  height: 280px;
  background-color: var(--i94);

  .header {
    font-family: 'Nanum Square', sans-serif;
    color: var(--i30);
    width: 470px; height: 48px;
    padding-left: 20px;
    // background-color: lightyellow;
  }
  .title{
    display: inline-block;
    margin-top: 12px;
    font-weight: 600;
    font-size: 18px;
    letter-spacing: 0;
    line-height: 30px;
    user-select: none;
    -webkit-user-select: none;
    // background-color: darkturquoise;
  }._name{
    margin-left: 7px;
    font-weight: 800;
    font-size: 16px;
  }._id{ 
    position: relative; bottom: 5px;
    margin-left: 3px;
    font-weight: 400;
    font-size: 12px;
    letter-spacing: 0.18px;
    line-height: 24px; 
  }
  .icon{
    position: absolute; top: 15px; right: 16px;
    width: 22px; height: 22px;
    fill: var(--i45);
  }.icon:hover{
    cursor: pointer;
    fill: var(--i00);
  }

  .division {
    position: absolute; top: 48px; left: 2%;
    font-family: 'Nanum Square', sans-serif;
    width: 96%; height: 2px;
    background-color: var(--i45);
  }

  .info {
    margin: 12px 0px 12px 20px;
    width: fit-content; height: fit-content;
    color: var(--i45);
    // background-color: lavender;
  }._fixed{
    display: inline-block;
    margin-top: 5px;
    margin-right: 10px;
    font-size: 14px;
    font-family: 'Nanum Square', sans-serif;
    font-weight: 600;
  }
  
  .editable{
    margin: 0px 0px 3px 20px;
    width: fit-content;
    color: var(--i30);
    font-family: 'Core Gothic D', sans-serif;
    font-weight: 500;
  }.editable:hover{
    color: var(--i00);
  }
  ._prop{
    display: inline-block;
    font-size: 16px;
    letter-spacing: 0.24px;
    line-height: 30px;
    user-select: none;
    -webkit-user-select: none;
    // background-color: cyan;
  }
  ._data{
    display: inline-block;
    margin-left: 7px;
    min-width: 50px;
    font-size: 14px;
    letter-spacing: 0.21px;
    line-height: 29px;
    background-color: greenyellow;
  }
  






}








</style>