<template>
<div :class="{'records':1, 'records-expand':moreinfo}">
<div :class="{'content':1, 'content-expand':moreinfo}">

  <div :class="{'room-name':1, 'room-name-expand':moreinfo}">{{record.room_name}}</div>

  <div :class="{'student-name':1, 'student-name-expand':moreinfo}">{{record.student_name}}</div>

  <transition name="refg-units">
  <svg class="pack-icon" v-if="!moreinfo" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>pack</title>
    <path 
    class="unavailable"
    :class="{
    supplement: askUpdate(0),
    available: askAvail(0),
    unavailable: submitCheck
    }"
      d="M8.42738854,10.0002825 C9.45778372,12.9121914 12.2365569,15 15.5,15 C16.7642632,15 17.9557872,14.6866616 19.0010984,14.1334584 L19,19.0006212 C19,19.552906 18.5522847,20.0006212 18,20.0006212 L6,20.0006212 C5.44771525,20.0006212 5,19.552906 5,19.0006212 L5,10 L8.42738854,10.0002825 Z M15.5,2 C18.536,2 21,4.464 21,7.5 C21,10.536 18.536,13 15.5,13 C12.464,13 10,10.536 10,7.5 C10,4.464 12.464,2 15.5,2 Z M18.02,4.665 L14.31,8.375 L12.98,7.045 L12,8.025 L14.31,10.335 L19,5.645 L18.02,4.665 Z M8.866088,3.99975893 C8.31316711,5.04486421 8,6.23608235 8,7.5 C8,7.668127 8.00554132,7.83496762 8.01645118,8.00034907 L5,8 L5,5.0006212 C5,4.44833645 5.44771525,4.0006212 6,4.0006212 L8.866088,3.99975893 Z" id="Combined-Shape" fill="#000000"></path>
  </svg>
  </transition>
  <transition name="refg-units">
  <svg class="pack-icon" v-if="!moreinfo" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <title>pack</title>
    <path 
    class="unavailable"
    :class="{
    supplement: askUpdate(1),
    available: askAvail(1),
    unavailable: submitCheck
    }"
      d="M8.42738854,10.0002825 C9.45778372,12.9121914 12.2365569,15 15.5,15 C16.7642632,15 17.9557872,14.6866616 19.0010984,14.1334584 L19,19.0006212 C19,19.552906 18.5522847,20.0006212 18,20.0006212 L6,20.0006212 C5.44771525,20.0006212 5,19.552906 5,19.0006212 L5,10 L8.42738854,10.0002825 Z M15.5,2 C18.536,2 21,4.464 21,7.5 C21,10.536 18.536,13 15.5,13 C12.464,13 10,10.536 10,7.5 C10,4.464 12.464,2 15.5,2 Z M18.02,4.665 L14.31,8.375 L12.98,7.045 L12,8.025 L14.31,10.335 L19,5.645 L18.02,4.665 Z M8.866088,3.99975893 C8.31316711,5.04486421 8,6.23608235 8,7.5 C8,7.668127 8.00554132,7.83496762 8.01645118,8.00034907 L5,8 L5,5.0006212 C5,4.44833645 5.44771525,4.0006212 6,4.0006212 L8.866088,3.99975893 Z" id="Combined-Shape" fill="#000000"></path>
  </svg>
  </transition>

  <transition name="refg-units">
  <div class="wrapper-adjust" v-if="!moreinfo">
    <div :class="{icon:1, disabled:submitCheck}" @click="minus">
      <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>remove_circle</title>
        <polygon
        points="7 11 7 13 17 13 17 11"></polygon>
      </svg>
    </div>
    <div :class="{icon:1, disabled:submitCheck}" @click="plus">
      <svg viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
        <title>add_circle</title>
        <polygon 
        points="17 13 13 13 13 17 11 17 11 13 7 13 7 11 11 11 11 7 13 7 13 11 17 11"></polygon>
      </svg>
    </div>
  </div>
  </transition>

  <transition name="refg-units">
    <div class="submit"
    v-if="update && !moreinfo"
    :class="{submitted: submitCheck}"
    @click="submit"
    >{{update}}개 지급</div>
  </transition>

  <transition name="major-info">
  <div class="major-expand" v-if="moreinfo">
    <div class="major-text">
    {{record.faculty}}</div>
    <div class="major-text">
    {{record.major}}</div>
    <div class="major-text">
    {{record.student_number}}</div>
  </div>
  </transition>

  <transition name="major-info">
  <div class="info-expand" v-if="moreinfo">
    <div class="info-text-box">
      <div class="info-text-index">입사일:</div>
      <div class="info-text-prop">{{record.indate}}</div>
    </div>
      <div class="new-line"></div>
    <div class="info-text-box">
      <div class="info-text-index">입사 유형:</div>
      <div class="info-text-prop">{{record.term}}</div>
    </div>
      <div class="new-line"></div>
    <div class="info-text-box">
      <div class="info-text-index">전화번호:</div>
      <div class="info-text-prop">{{record.phone}}</div>
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
    <div class="cover-back" v-if="cf0 === cf1"></div>
  </transition>
</div>
</template>

<script>
export default {
  name: 'Records',
  data() { return {
    update: 0,
    submitCheck: false,
    refgLimit00: 2,
    refgTerm00: '19_1',
    cf0: 0,
    cf1: 1
    
  }},
  props: [
    "record",
    "refgTerm",
    "refgLimit",
    "moreinfo"
  ],
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
        //submit method
        console.log("~~~ submitted");
      }else{
        this.alert("already submitted")
      }
    }
  },
  computed: {
    updateLimit: function(){
      return this.refgLimit - this["record"][this.refgTerm]
    },
    updateLimit00: function(){
      return this.refgLimit00 - this["record"][this.refgTerm00]
    },
  },
  created() {

  },
  mounted() {
    this.alert("~~ mounted ~~")
  },
}
</script>



<style lang="scss" scoped> 
// ------------------------------------------------------
// ------------------------------------------------------
.records {
  float: left;
  width: calc(100% - 46px);
  height: 50px;
  padding: 3px;
  transition: 300ms;
  // background-color: darksalmon;
} 
.records:hover {
  background-color: var(--i100);
  transition: 150ms;
}
.content {
  width: 100%;
  height: 50px;
  user-select: none;
  -webkit-user-select: none;
  transition: 300ms;
  color: var(--i45);
  background-color: var(--i94);
} 
.content:hover {
  transition: 150ms;
  color: var(--i30);
  background-color: var(--i98);
}

.records-expand {
  height: 120px;
  background-color: var(--i90);
}
.content-expand {
  height: 120px;
}

// ------------------------------ CONTENTS

.room-name {
  display: inline-block;
  position: relative;
  margin-top: 4px;
  margin-left: 15px;
  cursor: default;

  font-family: 'Barlow', sans-serif;
  font-weight: 400;
  font-size: 32px;
  letter-spacing: 0.84px;
  text-align: center;
  transition: 300ms;
}
.student-name {
  display: inline-block;
  position: relative;
  margin-left: 7px;
  margin-right: 7px;
  bottom: 2px;
  cursor: default;

  font-family: 'Core Gothic D', sans-serif;
  font-weight: 400;
  font-size: 26px;
  letter-spacing: -0.45px;
  text-align: center;
  transition: 300ms;
}
.room-name-expand {
  transition: 300ms;

  margin-top: 7px;
  margin-left: 14px;

  font-weight: 500;
  font-size: 28px;
  letter-spacing: 0.74px;
}
.student-name-expand {
  transition: 300ms;

  margin-left: 3px;

  font-weight: 500;
  font-size: 22px;
  letter-spacing: -0.38px;
}


// ----------------------------- REFG ICON

.pack-icon { 
  display: inline-block;
  position: relative;
  top: 2px;

  width: 27px;
  height: 27px;

  transition: 200ms;
}
  .unavailable {
    transition: 200ms;
    fill: var(--i70);
  }
  .available {
    transition: 200ms;
    fill: var(--i30);
  }
  .supplement {
    transition: 200ms;
    fill: var(--accent02);
  }


// ----------------------------- ADJUST ICON

.wrapper-adjust {
  float: right;
  margin-top: 7px;
  margin-right: 5px;
  width: 88px;
  height: 36px;
  // background-color: rgb(150, 90, 150);
}
.icon {
  display: inline-block;
  margin-right: 8px;
  width: 36px;
  height: 36px;
  clip-path: circle(15px at center);
  fill: var(--i30);
  background-color: var(--i94);
}
  .icon:hover {
    transition: 200ms;
    cursor: pointer;
    background-color: var(--i90);
  }
  .icon:active {
    transition: 200ms;
    cursor: pointer;
    background-color: var(--i80);
  }
.disabled {
  fill: var(--i60);
  background-color: transparent;
}
  .disabled:hover {
    background-color: transparent;
  }
  .disabled:active {
    background-color: transparent;
  }



// ----------------------------- SUBMIT ICON

.submit {
  float: right;
  margin-top: 11px;
  margin-right: 15px;
  width: 72px;
  height: 28px;
  font-family: "Nanum Square";
  font-weight: 800;
  font-size: 13px;
  letter-spacing: 0.19px;
  text-align: center;
  line-height: 29px;
  transition: 200ms;
  color: var(--i20);
  background-color: var(--i94);
}
  .submit:hover {
    transition: 200ms;
    cursor: pointer;
    color: var(--accent00);
    background-color: var(--accent01);
  }
  .submit:active {
    transition: 200ms;
    color: var(--accent00);
    background-color: var(--accent03);
  }
.submitted {
  color: var(--i80);
  background-color: var(--i90);
}
.submitted:hover {
  color: var(--i80);
  background-color: var(--i90);
}


// ----------------------------- MAJOR INFO

.major-expand {
  position: relative;
  left: 14px;
  top: 2px;
  width: 60%;
  height: 60px;
}
.major-expand:hover {
  color: var(--i0);
}
  .major-text {
    display: inline-block;
    margin-right: 3px;
    font-family: 'Core Gothic D';
    font-size: 17px;
    letter-spacing: -0.3px;
  }



// ----------------------------- INFO

.info-expand {
  position: relative;
  float: right;
  bottom: 91px;
  right: 10px;
  width: fit-content;
  height: fit-content;
  vertical-align: middle;
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
  }
  .info-text-box:hover {
    color: var(--i0);
  }
    .info-text-index {
      display: inline-block;
      font-family: 'Core Gothic D';
      font-weight: 400;
      font-size: 15px;
      letter-spacing: -0.26px;
      text-align: right;
    }
    .info-text-prop {
      display: inline-block;
      margin-left: 3px;
      font-family: 'Core Gothic D';
      font-weight: 500;
      font-size: 15px;
      letter-spacing: -0.26px;
      text-align: right;
    }


// ----------------------------- ALERT COVER

.cover-back {
  pointer-events: none;
  position: relative;
  bottom: 100%;
  height: calc(100%);
  width: calc(100%);
  background-color: var(--i100);
  opacity: 0.8;
}

// ----------------------------------- ANIMATION

@keyframes fade-in {
    from { opacity: 0; }
    to { opacity: 1; }
  }
@keyframes fade-out {
    from { opacity: 1; }
    to { opacity: 0; }
  }
@keyframes blink-out {
  0%{opacity: 1;}
  30%{opacity: .2;}
  60%{opacity: .9;}
  90%{opacity: .1;}
  100%{display: none;}
}


.fade-enter-active, .fade-leave-active {
  transition: opacity 300ms;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.major-info-enter {
  opacity: 0;
  transform: translateY(8px);
} 
.major-info-enter-to {
  opacity: 1;
}
.major-info-enter-active{
  transition: all 200ms;
  transition-delay: 300ms;
}
.major-info-leave {
  opacity: 1;
}
.major-info-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
.major-info-leave-active {
  transition: all 300ms;
}


.refg-units-enter {
  opacity: 0;
}
.refg-units-enter-to {
  opacity: 1;
}
.refg-units-enter-active{
  transition: all 200ms;
  transition-delay: 300ms;
}
.refg-units-leave {
  opacity: 1;
}
.refg-units-leave-to {
  opacity: 0;
}
.refg-units-leave-active {
  transition: all 300ms;
}


.change-scope-move {
  transition: transform 500ms;
}


.alert-enter {
  opacity: 0.4;
}.alert-enter-to {
  opacity: 0;
}.alert-enter-active{
  transition: opacity 100ms;
}.alert-leave {
  opacity: 0.7;
}.alert-leave-to  {
  opacity: 0;
}.alert-leave-active {
  transition: opacity 100ms;
}
</style>
