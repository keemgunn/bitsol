<template>
<div :class="{'record':1, 'record-expand':search.moreinfo}">
<div :class="{'plate':1, 'plate-expand':search.moreinfo}">

  <div :class="{'room':1, 'room-expand':search.moreinfo}">{{info.room_name}}</div>

  <div :class="{'name':1, 'name-expand':search.moreinfo}">{{info.student_name}}</div>

  <transition name="refg">
  <svg class="pack-icon" v-if="!search.moreinfo" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>pack</title>
    <path class="unavailable"
    :class="{ supplement: askUpdate(0), available: askAvail(0), unavailable: submitCheck }"
    d="M8.42738854,10.0002825 C9.45778372,12.9121914 12.2365569,15 15.5,15 C16.7642632,15 17.9557872,14.6866616 19.0010984,14.1334584 L19,19.0006212 C19,19.552906 18.5522847,20.0006212 18,20.0006212 L6,20.0006212 C5.44771525,20.0006212 5,19.552906 5,19.0006212 L5,10 L8.42738854,10.0002825 Z M15.5,2 C18.536,2 21,4.464 21,7.5 C21,10.536 18.536,13 15.5,13 C12.464,13 10,10.536 10,7.5 C10,4.464 12.464,2 15.5,2 Z M18.02,4.665 L14.31,8.375 L12.98,7.045 L12,8.025 L14.31,10.335 L19,5.645 L18.02,4.665 Z M8.866088,3.99975893 C8.31316711,5.04486421 8,6.23608235 8,7.5 C8,7.668127 8.00554132,7.83496762 8.01645118,8.00034907 L5,8 L5,5.0006212 C5,4.44833645 5.44771525,4.0006212 6,4.0006212 L8.866088,3.99975893 Z" id="Combined-Shape" fill="#000000"></path>
  </svg>
  </transition>

  <transition name="refg">
  <svg class="pack-icon" v-if="!search.moreinfo" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>pack</title>
    <path class="unavailable"
    :class="{ supplement: askUpdate(1), available: askAvail(1), unavailable: submitCheck }"
    d="M8.42738854,10.0002825 C9.45778372,12.9121914 12.2365569,15 15.5,15 C16.7642632,15 17.9557872,14.6866616 19.0010984,14.1334584 L19,19.0006212 C19,19.552906 18.5522847,20.0006212 18,20.0006212 L6,20.0006212 C5.44771525,20.0006212 5,19.552906 5,19.0006212 L5,10 L8.42738854,10.0002825 Z M15.5,2 C18.536,2 21,4.464 21,7.5 C21,10.536 18.536,13 15.5,13 C12.464,13 10,10.536 10,7.5 C10,4.464 12.464,2 15.5,2 Z M18.02,4.665 L14.31,8.375 L12.98,7.045 L12,8.025 L14.31,10.335 L19,5.645 L18.02,4.665 Z M8.866088,3.99975893 C8.31316711,5.04486421 8,6.23608235 8,7.5 C8,7.668127 8.00554132,7.83496762 8.01645118,8.00034907 L5,8 L5,5.0006212 C5,4.44833645 5.44771525,4.0006212 6,4.0006212 L8.866088,3.99975893 Z" id="Combined-Shape" fill="#000000"></path>
  </svg>
  </transition>

  <transition name="refg">
  <div class="wrapper-adjust" v-if="!search.moreinfo">
    <div :class="{icon:1, disabled:submitCheck}" @click="minus">
      <svg viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>remove</title>
        <polygon
        points="11 17 11 20 26 20 26 17"></polygon>
      </svg>
    </div>
    <div :class="{icon:1, disabled:submitCheck}" @click="plus">
      <svg viewBox="0 0 36 36" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>add</title>
        <polygon 
        points="26 20 20 20 20 26 17 26 17 20 11 20 11 17 17 17 17 11 20 11 20 17 26 17"></polygon>
      </svg>
    </div>
  </div>
  </transition>

  <transition name="fade">
  <div class="submit"
    v-if="update && !search.moreinfo"
    :class="{submitted: submitCheck}"
    @click="submit">{{update}}개 지급
  </div>
  </transition>

  <transition name="refg">
  <div class="major" v-if="search.moreinfo">
    <div class="major-text">
    {{info.faculty}}</div>
    <div class="major-text">
    {{info.major}}</div>
    <div class="major-text">
    {{info.student_number}}</div>
  </div>
  </transition>

  <transition name="info">
  <div class="info" v-if="search.moreinfo">
    <div class="info-text-box">
      <div class="info-text-index">입사일:</div>
      <div class="info-text-prop">{{info.indate}}</div>
    </div>
      <div class="new-line"></div>
    <div class="info-text-box">
      <div class="info-text-index">입사 유형:</div>
      <div class="info-text-prop">{{info.term}}</div>
    </div>
      <div class="new-line"></div>
    <div class="info-text-box">
      <div class="info-text-index">전화번호:</div>
      <div class="info-text-prop">{{info.phone}}</div>
    </div>
      <div class="new-line"></div>
    <div class="info-text-box">
      <div class="info-text-index">환불계좌:</div>
      <div class="info-text-prop">명의 은행이름 0000*******</div>
    </div>
  </div>
  </transition>

</div>
  <transition name="alert">
    <div class="alert-cover" v-if="cf0 === cf1"></div>
  </transition>
</div>
</template>



<script>
import { mapState } from 'vuex';

export default {
  name: "Record",
  props: [
    "info"
  ],
  data() { return {
    update: 0,
    submitCheck: false,
    cf0: 0, cf1: 1,
  }},
  computed: {
    updateLimit: function(){
      return this.dbinfo.refgLimit - this["info"][this.dbinfo.refgTerm]
    },
    ...mapState(['search', 'dbinfo'])
  },
  methods: {
    askUpdate(i){
      if(this.update && !this.submitCheck){
        if ( this.update - i > 0 ){
          return true;
        }else {
          return false;
        }
      }else {
        return false
      }
    },
    askAvail(i){
      if ( this.updateLimit - i > 0 && !this.submitCheck){
        return true;
      }else {
        return false;
      }
    },
    plus(){
      if(this.update < this.updateLimit && !this.submitCheck) {
        this.update ++
      }else {
        this.alert("~~ exceeded");
      }
    },
    minus(){
      if(this.update > 0 && !this.submitCheck) {
        this.update --
      }else {
        this.alert("~~ less than 0");
      }
    },
    alert(msg){
      console.log(msg);
      this.coverFlow("cf0");
      setTimeout(this.coverFlow, 200, "cf1");
    },coverFlow(obj){
      this[obj] ++ ;
    },
    submit(){
      if(this.submitCheck === false){
        this.submitCheck = true
        //submit method ~~~~~~~


        console.log("~~~ submitted");
      }else{
        this.alert("already submitted")
      }
    },

  },
  created() {

  },
  mounted() {
    this.alert("~~ record mounted ~~");
  },
  beforeUpdate() {
    
  },
  beforeCreate() {
    
  },
}
</script>



<style lang="scss" scoped> 
.record {
  position: relative; top: 0; left: 0;
  width: 100%;
  height: 56px;
  transition: 600ms;
  background-color: darksalmon;
}.record:hover {
  transition: 150ms;
  background-color: var(--i100);
}.record-expand {
  height: 126px;
  background-color: var(--i90);
}
.plate {
  position: relative; top: 3px; left: 3px;
  width: calc(100% - 6px);
  height: 50px;
  color: var(--i45);
  fill: var(--i45);
  background-color: var(--i94);
  transition: 600ms;
}.plate:hover {
  transition: 150ms;
  color: var(--i30);
  fill: var(--i30);
  background-color: var(--i98);
}.plate-expand {
  height: 120px;
}


// ------------------------------------
.room {
  float: left; width: fit-content; height: 40px;
  margin-top: 5px; margin-left: 12px;
  font-family: 'Barlow';
  font-size: 32px;
  letter-spacing: 0.84px;
  line-height: 34px;
  transition: 400ms;
  // background-color: cornflowerblue;
}.room-expand {
  transition: 400ms;
  font-weight: 500;
  font-size: 28px;
  letter-spacing: 0px;
}


// -------------------------------------
.name {
  float: left; width: fit-content; height: 40px;
  margin: 5px 6px 0px 4px;
  font-family: 'Core Gothic D';
  font-size: 26px;
  letter-spacing: -0.45px;
  line-height: 39px;
  transition: 400ms;
  // background-color: darkkhaki;
}.name-expand {
  transform: 400ms;

  font-weight: 500;
  font-size: 22px;
  letter-spacing: -0.5px;
}


// -------------------------------------
.pack-icon { 
  float: left;
  margin-top: 11px; margin-left: -1px;
  width: 27px;
  height: 27px;
  transition: 200ms;
}.unavailable {
  transition: 200ms;
  fill: var(--i70);
}.available {
  transition: 200ms;
  fill: var(--i30);
}.supplement {
  transition: 200ms;
  fill: var(--accent02);
}


// -------------------------------------
.wrapper-adjust {
  float: right;
  margin-top: 7px;
  margin-right: 5px;
  width: 88px;
  height: 36px;
  // background-color: rgb(150, 90, 150);
}.icon {
  display: inline-block;
  margin-right: 8px;
  width: 36px;
  height: 36px;
  clip-path: circle(15px at center);
  // fill: var(--i30);
  background-color: var(--i94);
}.icon:hover {
  transition: 200ms;
  cursor: pointer;
  background-color: var(--i90);
}.icon:active {
  transition: 200ms;
  cursor: pointer;
  background-color: var(--i80);
}.disabled {
  fill: var(--i60);
  background-color: transparent;
}.disabled:hover {
  background-color: transparent;
}.disabled:active {
  background-color: transparent;
}


// -------------------------------------
.submit {
  float: right;
  margin-top: 11px; margin-right: 15px;
  width: 72px;
  height: 28px;
  font-family: "Nanum Square";
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.19px;
  text-align: center;
  line-height: 29px;
  transition: 200ms;
  background-color: var(--i94);
}.submit:hover {
  transition: 200ms;
  cursor: pointer;
  color: var(--accent00);
  background-color: var(--accent01);
}.submit:active {
  transition: 200ms;
  color: var(--accent00);
  background-color: var(--accent03);
}.submitted {
  color: var(--i80);
  background-color: var(--i90);
}.submitted:hover {
  color: var(--i80);
  background-color: var(--i90);
}



// ---------------------- more informations -----------

.major {
  position: absolute;
  left: 12px;
  top: 45px;
  width: 60%;
  height: 60px;
  // background-color: aquamarine;
}.major:hover {
  color: var(--i0);
}.major-text {
  display: inline-block;
  margin-right: 3px;
  font-family: 'Core Gothic D';
  font-size: 17px;
  letter-spacing: -0.3px;
}

.info {
  position: absolute;
  bottom: 9px;
  right: 10px;
  width: fit-content;
  height: fit-content;
  vertical-align: middle;
  // background-color: coral;
}
.new-line{
  clear: both;
  position: relative;
}
.info-text-box {
  float: right;
  position: relative;
  width: fit-content;
  margin-bottom: 1px;
}.info-text-box:hover {
  color: var(--i0);
}.info-text-index {
  display: inline-block;
  font-family: 'Core Gothic D';
  font-weight: 400;
  font-size: 15px;
  letter-spacing: -0.26px;
  text-align: right;
}.info-text-prop {
  display: inline-block;
  margin-left: 3px;
  font-family: 'Core Gothic D';
  font-weight: 500;
  font-size: 15px;
  letter-spacing: -0.26px;
  text-align: right;
}



// ---------------------- ALERT -----------

.alert-cover {
  pointer-events: none;
  position: relative;
  bottom: 100%;
  height: calc(100%);
  width: calc(100%);
  background-color: var(--i100);
  opacity: 0.8;
}.alert-enter {
  opacity: 0.5;
}.alert-enter-to {
  opacity: 0;
}.alert-enter-active{
  transition: opacity 100ms;
}.alert-leave {
  opacity: 0.5;
}.alert-leave-to  {
  opacity: 0;
}.alert-leave-active {
  transition: opacity 100ms;
}



// ---------------------- ANIMATION -----------


.refg-enter {
  opacity: 0;
} 
.refg-enter-to {
  opacity: 1;
}
.refg-enter-active{
  transition: all 200ms;
  transition-delay: 300ms;
}
.refg-leave {
  opacity: 1;
}
.refg-leave-to {
  opacity: 0;
}
.refg-leave-active {
  transition: all 300ms;
}


.info-enter {
  opacity: 0;
  transform: translateY(-8px);
} 
.info-enter-to {
  opacity: 1;
}
.info-enter-active{
  transition: all 200ms;
  transition-delay: 300ms;
}
.info-leave {
  opacity: 1;
}
.info-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.info-leave-active {
  transition: all 300ms;
}





</style>