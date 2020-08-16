<template>
<div class="records">
<div class="content">

  <div class="room-name">{{record.room_name}}</div>

  <div class="student-name">{{record.student_name}}</div>

  <svg class="pack-icon" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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
  <svg class="pack-icon" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
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

  <div class="wrapper-adjust">
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

  <div class="submit"
  v-if="update"
  :class="{submitted: submitCheck}"
  @click="submit"
  >{{update}}개 지급</div>







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
    "refgLimit"
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
      if ( this.updateLimit00 - i > 0 && !this.submitCheck){
        return true;
      }else {
        return false;
      }
    },
    plus(){
      if(this.update < this.updateLimit00 && !this.submitCheck) {
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
    },
    coverFlow(obj){
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
    .cover-back {
      pointer-events: none;

      position: relative;
      // right: 3px;
      bottom: 100%;
      height: calc(100%);
      width: calc(100%);
      background-color: var(--i100);
      opacity: 0.8;
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


// ------------------------------ CONTENTS

.room-name {
  display: inline-block;
  position: relative;
  margin-top: 4px;
  margin-left: 15px;
  cursor: default;

  font-family: 'Barlow';
  font-weight: 400;
  font-size: 32px;
  letter-spacing: 0.84px;
  text-align: center;
}

.student-name {
  display: inline-block;
  position: relative;
  margin-left: 7px;
  margin-right: 7px;
  bottom: 2px;
  cursor: default;

  font-family: 'Core Gothic D';
  font-weight: 400;
  font-size: 26px;
  letter-spacing: -0.45px;
  text-align: center;
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
    fill: var(--i70);
  }
  .available {
    fill: var(--i30);
  }
  .supplement {
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
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}


.alert-enter {
  opacity: 0.4;
}
.alert-enter-to {
  opacity: 0;
}
.alert-enter-active{
  transition: opacity 100ms;
}
.alert-leave {
  opacity: 0.7;
}
.alert-leave-to  {
  opacity: 0;
}
.alert-leave-active {
  transition: opacity 100ms;
}
</style>
